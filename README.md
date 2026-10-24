# Kejing Xia's Academic Website

Source for [les1a.github.io](https://les1a.github.io/), built with Jekyll and hosted on GitHub Pages.

## Local development

Install Ruby and Bundler, then run:

```sh
bundle install
bundle exec jekyll serve --host 127.0.0.1 --port 4000
```

Open [localhost:4000](http://127.0.0.1:4000/). To build the site without starting a server:

```sh
JEKYLL_ENV=production bundle exec jekyll build
```

## Content and structure

| Content | Source |
| --- | --- |
| Biography and research areas | `_pages/about.md` |
| Publications and submissions | `_data/publications.yml` |
| News | `_data/news.yml` |
| Experience | `_data/experience.yml` |
| Education and honors | `_data/home.yml` |
| Navigation | `_data/navigation.yml` |
| Contact information and site settings | `_config.yml` |
| Homepage layout, styles and scripts | `_layouts/academic-home.html`, `_includes/home/`, `assets/` |
| Research project pages | `projects/` |
| Published CV | `assets/3_CV.pdf` |
| Editable CV source | `docs/cv/kejing_xia_cv.typ` |
| CV institution marks and attribution | `docs/cv/organizations/` |

Publication IDs are used by research, news and experience links. Entries are ordered by `order`, and manuscripts under review show their status on each card. `listed: false` keeps a record available to experience and news links while omitting it from the publication list.

Edit the Typst CV source and regenerate its PDF with the command at the top of the source file. The CV uses Latin Modern Roman and the Font Awesome fonts in `assets/webfonts/`. Keep the PDF in sync with the source. The `docs/` directory is excluded from the generated website.

## Browser checks

With Node.js 20 or newer and the local Jekyll server running:

```sh
npm ci
npx playwright install chromium
npm test
```

`HOMEPAGE_URL` changes the server address. `BROWSER_CHANNEL` optionally selects an installed browser, such as `msedge`. Screenshots and test reports are written to the ignored `tmp/` directory.

## Attribution

The site originated from [AcademicPages](https://github.com/academicpages/academicpages.github.io); its MIT license is retained in `LICENSE`. Font licenses are included beside the font files. The D²GS project page retains its original template attribution and CC BY-SA notice, and uses [Bulma](licenses/bulma-MIT.txt) and [bulma-carousel](licenses/bulma-carousel-MIT.txt).
