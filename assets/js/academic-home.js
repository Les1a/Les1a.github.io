/* Optional conveniences; content and navigation work without JavaScript. */
(() => {
  document.querySelectorAll('.copy-citation').forEach((button) => {
    if (!navigator.clipboard || !window.isSecureContext) return;
    button.hidden = false;
    button.addEventListener('click', async () => {
      const citation = button.closest('.citation-body');
      const status = citation.querySelector('.copy-status');
      try {
        await navigator.clipboard.writeText(citation.querySelector('code').textContent.trim());
        status.textContent = 'Copied.';
      } catch (_) {
        status.textContent = 'Copy unavailable. Select the citation above to copy it manually.';
      }
    });
  });
  document.querySelectorAll('.publication-image img').forEach((img) => {
    const removeFigure = () => {
      img.closest('.publication').classList.add('publication-text-only');
      img.parentElement.hidden = true;
    };
    img.addEventListener('error', removeFigure, { once: true });
    if (img.complete && !img.naturalWidth) removeFigure();
  });

  /* Header: show the rule once the page scrolls and reveal the name once the hero title has
     scrolled away. Without JavaScript the header keeps its rule and name. */
  const header = document.querySelector('.home-header');
  if (!header || !('IntersectionObserver' in window)) return;
  header.classList.add('is-enhanced');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 4);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  const title = document.getElementById('home-title');
  if (!title) {
    header.classList.add('is-past-hero');
    return;
  }
  new IntersectionObserver(([entry]) => {
    header.classList.toggle('is-past-hero', !entry.isIntersecting);
  }, { rootMargin: `-${header.offsetHeight}px 0px 0px 0px` }).observe(title);
})();
