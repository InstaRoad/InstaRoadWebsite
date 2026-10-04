# InstaRoad — Honours project website (draft)

Static project website for **InstaRoad** (UCT Computer Science Honours, 2026):
Catherine Li, Kelvin Wei and Jing Yeh, supervised by Patrick Marais and Jonathan Shock.

The site follows the department brief: fully static, relative links only, `index.html` at the
root, a group page plus one page per member, documents as PDF and code as archives.

## Preview

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8765
```

then visit <http://localhost:8765>.

## Structure

```
index.html                  group page (overview, results, sub-projects, dataset, demo, poster, documents)
assets/
  css/bulma.min.css         Bulma 0.9.1 (vendored)
  css/site.css              all custom styles: shared, edit with care
  js/fontawesome.all.min.js Font Awesome 5 icons (vendored, works offline)
  js/site.js                comparison sliders, copy buttons, back-to-top
  img/                      shared figures + favicon
docs/
  proposal.pdf              joint documents (add poster.pdf, dataset datasheet/sample here)
li/   index.html, img/, final-paper.pdf, literature-review.pdf   Catherine
wei/  index.html, img/, final-paper.pdf, literature-review.pdf   Kelvin
yeh/  index.html, img/, final-paper.pdf, literature-review.pdf   Jing
```

Ownership: each member edits only their own folder; the group page and `assets/` are shared,
so coordinate changes there. Always link to `folder/index.html`, never `folder/`, so pages
work when opened from disk.

## Editing a member page

All three member pages use the same sections: header, at-a-glance stats, contribution, goals and
research questions, method, results, findings and limitations, downloads, citation. Copy an existing
block rather than inventing new markup. Useful building blocks in `site.css`:

| Block | Markup |
| --- | --- |
| Figure | `<figure class="figure"><img …><figcaption>…</figcaption></figure>` (`is-medium` / `is-narrow` to limit width) |
| Before/after slider | `<figure class="compare">` (see the teaser in `index.html`): two images of identical size |
| Results table | `<figure class="table-figure">` with a `figcaption` and `table.table.results`; mark cells with `num`, `best`, rows with `is-ours` |
| Numbered steps / RQs | `<ol class="steps">`, `<ol class="rq-list">` |
| Findings | `<ul class="finding-list">` (`is-limits` for the grey variant) |
| Downloads | `<a class="doc" href="…">`; use `<div class="doc is-missing">` until the file exists |
| Draft marker | `<span class="todo">TODO: …</span>` |

Images: export at about 1200–1600 px wide and convert to WebP, e.g. `cwebp -q 85 in.png -o out.webp`.
Always set `width`, `height` and meaningful `alt` text.

## Open TODOs

Every unfinished item is marked visibly on the pages. List them with:

```bash
grep -rn 'class="todo' --include='*.html' .
```

Placeholder external links use the reserved `.invalid` domain, so link checkers flag them:

```bash
grep -rn '\.invalid' --include='*.html' .
```

Main gaps in this draft:

- [ ] Live demo URL and a screenshot or short MP4 (`assets/img/demo-screenshot.webp`)
- [ ] Poster PDF (`docs/poster.pdf`), then switch the placeholder to the commented-out `<iframe>`
- [ ] Dataset: Zenodo DOI, CD:NGI licence check, small sample and datasheet in `docs/`
- [ ] Code archives: `li/li_code.zip`, `wei/wei_code.zip`, `yeh/yeh_code.zip`
- [ ] Reconcile ROSA counts (Kelvin's paper: 1,247 tiles / 65 zones; Jing's paper: 1,254 chips / 60 regions)
- [ ] Confirm which model produced the Johannesburg and Karoo example predictions
- [ ] Each member: check contribution wording, research questions (Kelvin's were paraphrased) and figures
- [ ] Optional: member photos (see the comment in each member header)
- [ ] Confirm acknowledgements and the project abbreviation used in the ZIP name

Content was drafted from the final papers, proposal and literature reviews in the shared drive. The
PDFs in `li/`, `wei/`, `yeh/` and `docs/` are copies of those files. The final papers are large
(10–20 MB); swap in compressed versions if the archive size matters.

## Before submitting

1. Remove every `todo` marker and `.invalid` link.
2. Validate every page with the Nu HTML Checker (<https://validator.w3.org/nu/>) or locally:
   `java -jar vnu.jar --also-check-css --skip-non-html .` (the jar ships in the `vnu-jar` npm package).
3. Check links, for example with `lychee --offline .`.
4. Keep the ZIP lean: compress images, documents as PDF, code as `.zip`.
5. Build the ZIP from inside this folder so `index.html` sits at the top level:

   ```bash
   zip -r ../instaroad_li_wei_yeh.zip . -x '.git/*' '.claude/*' '.nojekyll' 'README.md' '*.DS_Store'
   ```

6. Unzip it into an empty folder and click through every page via `file://`.
7. One member uploads it at <http://projects.cs.uct.ac.za/honsproj/> ("Upload File" next to 2026).
   Re-uploading overwrites the previous file.

## Credits

Layout adapted from the [Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template)
(adapted from [Nerfies](https://nerfies.github.io)), licensed under
[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Uses [Bulma](https://bulma.io) (MIT) and
[Font Awesome Free](https://fontawesome.com) (icons CC BY 4.0, code MIT).
