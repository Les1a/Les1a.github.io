/* Run against bundle exec jekyll serve. Requires Playwright + an installed Edge.
 * Output is excluded from the public Jekyll build. No production dependencies.
 */
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const publications = JSON.parse(execFileSync('ruby', ['-rjson', '-ryaml', '-e', 'puts JSON.generate(YAML.load_file("_data/publications.yml"))'], { encoding: 'utf8' })).filter(pub => pub.listed !== false);
const paperCount = publications.length;
const news = JSON.parse(execFileSync('ruby', ['-rjson', '-ryaml', '-e', 'puts JSON.generate(YAML.load_file("_data/news.yml"))'], { encoding: 'utf8' }));
const recentNewsData = news.filter(item => item.archived !== true);
for (const id of ['metastate','r2-dllm','longmamba','lamb','d2gs','editor']) assert.ok(publications.some(p => p.id === id), 'Preserve original work: ' + id);
const base = process.env.HOMEPAGE_URL || 'http://127.0.0.1:4000';
const out = path.resolve('tmp/homepage-review');
fs.mkdirSync(out, { recursive: true });
const report = { browser: '', viewportChecks: [], interactions: [], internalResources: [], projects: [], failures: [] };
function check(name, condition, details) {
  if (!condition) report.failures.push({ name, details });
}
async function checkImages(page) {
  for (const img of await page.locator('.publication img').all()) {
    await img.scrollIntoViewIfNeeded();
    await img.evaluate(e => e.decode());
  }
}
async function anchorVisible(page, id) {
  return page.evaluate(id => ({
    top: document.getElementById(id).getBoundingClientRect().top,
    headerBottom: document.querySelector('.home-header').getBoundingClientRect().bottom,
    hash: location.hash
  }), id);
}
(async () => {
  const browser = await chromium.launch({ headless: true, channel: process.env.BROWSER_CHANNEL || 'msedge' });
  report.browser = browser.version();
  const context = await browser.newContext({ permissions: ['clipboard-read', 'clipboard-write'] });
  await context.addInitScript(() => {
    window.__layoutShift = 0;
    new PerformanceObserver(list => {
      for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__layoutShift += entry.value;
    }).observe({ type: 'layout-shift', buffered: true });
  });
  const page = await context.newPage();
  const errors = [];
  const networkFailures = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('requestfailed', req => networkFailures.push({ url: req.url(), error: req.failure().errorText }));
  for (const width of [1440, 1024, 768, 390, 360]) {
    const height = width < 600 ? 844 : 900;
    await page.setViewportSize({ width, height });
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const firstPaperTop = await page.locator('.publication h3').first().evaluate(e => e.getBoundingClientRect().top);
    await checkImages(page);
    await page.evaluate(() => scrollTo(0, 0));
    const audit = await page.evaluate(() => {
      const images = [...document.querySelectorAll('main img')].map(e => ({
        src: e.getAttribute('src'), naturalWidth: e.naturalWidth,
        width: e.getBoundingClientRect().width, height: e.getBoundingClientRect().height,
        naturalHeight: e.naturalHeight, objectFit: getComputedStyle(e).objectFit
      }));
      const overflowElements = [...document.querySelectorAll('main *')].filter(e => {
        if (!e.getClientRects().length || e.classList.contains('sr-only')) return false;
        const r = e.getBoundingClientRect();
        return r.right > innerWidth + 1 || r.left < -1;
      }).map(e => ({ tag: e.tagName, class: e.className, text: e.textContent.slice(0, 60) }));
      return {
        h1: [...document.querySelectorAll('h1')].map(e => e.textContent),
        papers: document.querySelectorAll('.publication').length,
        authorRows: document.querySelectorAll('.publication-authors, .author-note').length,
        unexpectedEmptyLinks: [...document.querySelectorAll('a')].filter(e => (!e.getAttribute('href') || e.getAttribute('href') === '#') && !e.matches('.publication-resources > a[href=""]')).length,
        overflow: document.documentElement.scrollWidth > innerWidth,
        overflowElements, images, layoutShift: window.__layoutShift,
        fonts: [...document.fonts].map(f => ({family: f.family, status: f.status})).filter(f => f.status === 'loaded')
      };
    });
    check('viewport ' + width, !audit.overflow && !audit.overflowElements.length, audit.overflowElements);
    check('one H1 ' + width, audit.h1.length === 1 && audit.h1[0].trim() === 'Kejing Xia 夏可敬');
    check('all papers without author rows ' + width, audit.papers === paperCount && audit.authorRows === 0);
    check('empty links limited to requested publication resources ' + width, audit.unexpectedEmptyLinks === 0);
    check('images ' + width, audit.images.length === 1 + publications.filter(p => p.image).length && audit.images.every(i => i.naturalWidth > 0 && i.width > 60));
    check('both local fonts loaded ' + width, audit.fonts.some(f => f.family === 'Literata' || f.family === '"Literata"') && audit.fonts.some(f => f.family === '"Hanken Grotesk"' || f.family === 'Hanken Grotesk'));
    check('portrait ratio ' + width, Math.abs(audit.images[0].width / audit.images[0].height - audit.images[0].naturalWidth / audit.images[0].naturalHeight) < .01);
    if (width === 1440) check('first paper title visible within desktop first screen', firstPaperTop < height, firstPaperTop);
    const screenshotName = width === 1440 ? 'desktop' : width === 390 ? 'mobile' : 'viewport-' + width;
    await page.screenshot({ path: path.join(out, screenshotName + '-top.png') });
    await page.locator('.home-nav').getByRole('link', { name: 'Publications', exact: true }).click();
    const anchor = await anchorVisible(page, 'publications');
    check('nav hash ' + width, anchor.hash === '#publications' && anchor.top >= anchor.headerBottom, anchor);
    await page.screenshot({ path: path.join(out, screenshotName + '-publications.png') });
    await page.locator('#metastate summary').focus();
    await page.keyboard.press('Enter');
    check('keyboard BibTeX ' + width, await page.locator('#metastate details').getAttribute('open') !== null);
    check('open BibTeX no horizontal overflow ' + width, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.keyboard.press('Enter');
    if (width === 1440 || width === 390) {
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({ path: path.join(out, (width === 1440 ? 'desktop' : 'mobile') + '-full.png'), fullPage: true });
    }
    report.viewportChecks.push({ width, height, firstPaperTop, anchor, ...audit });
    console.log('Viewport ' + width + ': ' + (!audit.overflow ? 'no overflow' : 'OVERFLOW') + ', ' + audit.images.length + ' loaded images, ' + paperCount + ' publications');
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.keyboard.press('Tab');
  check('skip link receives first focus', await page.locator('.skip-link').evaluate(e => e === document.activeElement));
  await page.keyboard.press('Enter');
  check('skip link focuses main', await page.locator('main').evaluate(e => e === document.activeElement));
  await page.locator('.home-nav').getByRole('link', { name: 'Publications', exact: true }).click();
  await page.locator('.home-nav').getByRole('link', { name: 'Research', exact: true }).click();
  await page.goBack();
  check('browser back restores hash', new URL(page.url()).hash === '#publications');
  await page.reload({ waitUntil: 'networkidle' });
  let anchor = await anchorVisible(page, 'publications');
  check('refresh restores unobscured anchor', anchor.hash === '#publications' && anchor.top >= anchor.headerBottom, anchor);
  await page.goto(base + '/#longmamba', { waitUntil: 'networkidle' });
  anchor = await anchorVisible(page, 'longmamba');
  check('direct paper hash', anchor.hash === '#longmamba' && anchor.top >= anchor.headerBottom, anchor);
  for (const id of ['research-interests', 'research-experience', 'professional-experience', 'competition', 'awards']) {
    await page.goto(base + '/#' + id, { waitUntil: 'domcontentloaded' });
    const a = await anchorVisible(page, id);
    check('legacy anchor ' + id, a.top >= a.headerBottom, a);
  }
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.locator('#metastate summary').click();
  await page.locator('#metastate .copy-citation').click();
  await page.waitForFunction(() => document.querySelector('#metastate .copy-status').textContent === 'Copied.');
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  // Windows clipboard text uses CRLF; compare the content after normalizing line endings.
  const expectedCitation = (await page.locator('#metastate code').textContent()).trim();
  check('real clipboard content', copied.replace(/\r\n/g, '\n') === expectedCitation.replace(/\r\n/g, '\n'));
  for (const detail of await page.locator('.earlier-details').all()) {
    await detail.locator('summary').focus();
    await page.keyboard.press('Enter');
    check('keyboard earlier content', await detail.getAttribute('open') !== null);
  }
  const revisionAudit = await page.evaluate(() => ({
    papers2025: [...[...document.querySelectorAll('.publication-year-group')].find(g => g.querySelector('.publication-year').textContent.trim() === '2025').querySelectorAll('.publication')].map(e => e.id),
    selectedLabels: document.querySelectorAll('.selected-label').length,
    eyebrow: document.querySelector('.eyebrow').textContent.trim(),
    recentNews: [...document.querySelectorAll('#news > .news-list > li')].map(e => e.textContent.trim()),
    archivedNews: document.querySelectorAll('#news .earlier-details .news-list > li').length,
    gtisc: document.querySelector('#gtisc').textContent,
    industryRoles: ['zoom', 'bosch'].map(id => document.querySelector('#' + id + ' .experience-role').textContent.trim()),
    wuhanLink: document.querySelector('#wuhan-research .experience-works a').getAttribute('href'),
    visibleIcons: document.querySelectorAll('svg.home-icon[aria-hidden="true"][focusable="false"]').length
  }));
  check('2025 editorial order', revisionAudit.papers2025.join(',') === 'd2gs,editor,longmamba,lamb', revisionAudit.papers2025);
  check('no Selected labels', revisionAudit.selectedLabels === 0);
  check('institutional eyebrow', revisionAudit.eyebrow === 'Georgia Institute of Technology · GTISC Lab · Atlanta');
  // Recent news follows _data/news.yml: newest first, through LongMamba; archived items stay folded.
  check('recent news through LongMamba', revisionAudit.recentNews.length === recentNewsData.length && revisionAudit.recentNews[0].includes(String(recentNewsData[0].date).replace('-', '.')) && revisionAudit.recentNews.some(t => t.includes('2026.07') && t.includes('was accepted at COLM 2026')) && revisionAudit.recentNews[revisionAudit.recentNews.length - 1].includes('LongMamba') && revisionAudit.archivedNews === news.length - recentNewsData.length, revisionAudit.recentNews);
  check('EDITOR removed from GTISC', !revisionAudit.gtisc.includes('EDITOR') && !revisionAudit.gtisc.includes('prompt inversion'));
  check('industry roles', revisionAudit.industryRoles.every(role => role === 'Research Intern'));
  check('BRS linked directly from Wuhan', revisionAudit.wuhanLink === 'https://www.sciencedirect.com/science/article/abs/pii/S0031320326016109');
  check('BRS omitted from publication list', await page.locator('.publication#brs-e2nerf').count() === 0);
  check('decorative icons hidden from assistive technology', revisionAudit.visibleIcons > 0);
  report.revisions = revisionAudit;
  const metadata = await page.evaluate(() => ({
    titleCount: document.querySelectorAll('title').length,
    descriptionCount: document.querySelectorAll('meta[name="description"]').length,
    canonicalCount: document.querySelectorAll('link[rel="canonical"]').length,
    ogTitleCount: document.querySelectorAll('meta[property="og:title"]').length,
    person: JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent)
  }));
  check('single metadata set', metadata.titleCount === 1 && metadata.descriptionCount === 1 && metadata.canonicalCount === 1 && metadata.ogTitleCount === 1 && metadata.person['@type'] === 'Person');
  report.metadata = metadata;
  for (const pub of publications) {
    if (pub.status === 'Under review') {
      // Submissions without a public version sit in their own section, with no resource links.
      check('under review placement ' + pub.id, await page.locator('#under-review #' + pub.id).count() === 1 && await page.locator('#' + pub.id + ' .publication-resources').count() === 0);
      check('venue and year without status ' + pub.id, (await page.locator('#' + pub.id + ' .publication-meta').textContent()).trim() === pub.venue + ' · ' + pub.year);
      continue;
    }
    for (const [label, field] of [['Paper','paper_url'],['Code','code_url'],['Project','project_url']]) {
      const resource = page.locator('#' + pub.id + ' .publication-resources').getByRole('link', { name: label + ' : ' + pub.short_title, exact: true });
      check('resource entry ' + pub.id + ' / ' + label, await resource.count() === 1 && await resource.getAttribute('href') === (pub[field] || ''));
    }
    // Papers under review have no public record yet, so they carry no BibTeX.
    if (pub.bibtex) check('citation retains author information ' + pub.id, /author\s*=/i.test(await page.locator('#' + pub.id + ' code').textContent()));
    check('venue and year without status ' + pub.id, (await page.locator('#' + pub.id + ' .publication-meta').textContent()).trim() === pub.venue + ' · ' + pub.year);
  }
  const resources = await page.evaluate(() => [...new Set([
    ...[...document.querySelectorAll('a[href]')].map(e => e.href),
    ...[...document.querySelectorAll('img[src],script[src]')].map(e => e.src),
    ...[...document.querySelectorAll('link[rel="stylesheet"],link[rel="preload"],link[rel="icon"]')].map(e => e.href)
  ])].filter(url => new URL(url).origin === location.origin).map(url => url.split('#')[0]));
  for (const url of [...new Set(resources)]) {
    const response = await context.request.get(url);
    check('local resource ' + url, response.ok(), response.status());
    report.internalResources.push({ url, status: response.status() });
  }
  const noJS = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const nj = await noJS.newPage();
  await nj.goto(base, { waitUntil: 'networkidle' });
  check('no JS content', await nj.locator('.publication').count() === paperCount && await nj.locator('.publication-authors, .author-note').count() === 0);
  await nj.locator('.home-nav').getByRole('link', {name:'Publications',exact:true}).click();
  check('no JS navigation', new URL(nj.url()).hash === '#publications');
  await nj.locator('#metastate summary').click();
  check('no JS citation', await nj.locator('#metastate pre').isVisible());
  check('no JS copy button hidden', await nj.locator('.copy-citation:visible').count() === 0);
  await nj.screenshot({path:path.join(out,'mobile-no-javascript.png')});
  await noJS.close();
  const failContext = await browser.newContext();
  await failContext.addInitScript(() => {
    Object.defineProperty(navigator.clipboard, 'writeText', { value: async () => { throw new Error('Clipboard permission denied'); } });
  });
  const fp = await failContext.newPage();
  await fp.goto(base, { waitUntil: 'networkidle' });
  await fp.locator('#metastate summary').click();
  await fp.locator('#metastate .copy-citation').click();
  await fp.waitForFunction(() => document.querySelector('#metastate .copy-status').textContent.includes('manually'));
  check('copy failure leaves selectable citation', await fp.locator('#metastate pre').isVisible());
  await failContext.close();
  const fallbackContext = await browser.newContext({ viewport: {width:360,height:844}, reducedMotion:'reduce' });
  await fallbackContext.route('https://fonts.googleapis.com/**', route => route.abort());
  await fallbackContext.route('https://fonts.gstatic.com/**', route => route.abort());
  await fallbackContext.route('**/assets/fonts/*.woff2', route => route.abort());
  const fallback = await fallbackContext.newPage();
  await fallback.goto(base, {waitUntil:'networkidle'});
  check('font fallback remains readable', await fallback.locator('h1').isVisible() && await fallback.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  check('reduced motion has no forced animation', await fallback.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior === 'auto' && getComputedStyle(document.querySelector('h1')).animationName === 'none'));
  await fallbackContext.close();
  const imageFailure = await browser.newContext();
  await imageFailure.route('**/images/figure-metastate.png', route => route.abort());
  const ip = await imageFailure.newPage();
  await ip.goto(base, {waitUntil:'networkidle'});
  await ip.locator('#metastate').scrollIntoViewIfNeeded();
  await ip.waitForFunction(() => document.querySelector('#metastate').classList.contains('publication-text-only'));
  check('failed image degrades to text', await ip.locator('#metastate-title').isVisible() && !(await ip.locator('#metastate .publication-image').isVisible()));
  await imageFailure.close();
  for (const project of ['/projects/metastate/', '/projects/d2gs/', '/404.html']) {
    for (const width of [1440,390]) {
      await page.setViewportSize({width,height:900});
      const response = await page.goto(base+project, {waitUntil:'networkidle'});
      const audit = await page.evaluate(() => ({title:document.title,h1:[...document.querySelectorAll('h1')].map(e=>e.textContent.trim()),overflow:document.documentElement.scrollWidth>innerWidth,homeStyles:!!document.querySelector('link[href$="/academic-home.css"]')}));
      check('project isolated ' + project, !audit.homeStyles);
      check('project loads ' + project, response.status() === 200);
      check('project overflow ' + project + width, !audit.overflow);
      await page.screenshot({path:path.join(out,project.split('/').filter(Boolean).join('-')+'-'+width+'.png')});
      report.projects.push({project,width,status:response.status(),...audit});
    }
  }
  // WCAG relative luminance for the actual foreground/background CSS tokens.
  const luminance = hex => {
    const c = hex.match(/[a-f0-9]{2}/gi).map(n => parseInt(n,16)/255).map(n => n<=.04045?n/12.92:((n+.055)/1.055)**2.4);
    return c[0]*.2126+c[1]*.7152+c[2]*.0722;
  };
  report.contrast = {};
  // Light and dark (prefers-color-scheme) tokens from academic-home.css, including text on the pale "token" fill.
  for (const [name,fg,bg] of [['body','142034','ffffff'],['secondary','4a576b','ffffff'],['tertiary','5f6c80','ffffff'],['link','1f46b5','ffffff'],['accent','8a5600','ffffff'],['token link','1f46b5','e1e9fb'],['code','142034','f3f5f9'],
    ['dark body','e8edf4','0e1520'],['dark secondary','a9b4c3','0e1520'],['dark tertiary','8f9bad','0e1520'],['dark link','a8c0ff','0e1520'],['dark token link','a8c0ff','1f2f52']]) {
    const a=luminance(fg),b=luminance(bg),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);
    report.contrast[name]=Number(ratio.toFixed(2)); check('contrast '+name,ratio>=4.5);
  }
  report.interactions = ['native hashes, refresh, back, direct paper links','legacy section hashes','keyboard skip link and all details','clipboard success and failure','no-JavaScript content, citations and navigation','font fallback and reduced motion','failed optional image'];
  report.pageErrors = errors;
  report.networkFailures = networkFailures;
  check('no browser script errors',errors.length===0,errors);
  fs.writeFileSync(path.join(out,'validation.json'),JSON.stringify(report,null,2));
  await browser.close();
  console.log(JSON.stringify({browser:report.browser,contrast:report.contrast,failures:report.failures,pageErrors:errors},null,2));
  assert.equal(report.failures.length,0,'See tmp/homepage-review/validation.json');
})().catch(e=>{fs.writeFileSync(path.join(out,'validation.json'),JSON.stringify(report,null,2));console.error(e);process.exit(1)});
