# Samuel Burke — Digital CV

A responsive, accessible, static portfolio for communications and marketing opportunities. Built with HTML, CSS, and a small progressive-enhancement script. No framework, install step, or build dependencies.

## Editing

- `index.html`: biography, impact stories, career history, and contact links.
- `styles.css`: responsive layout, colour palette, typography, and print styles.
- `script.js`: copyright year, print expansion, and redirects for legacy Carrd section links.
- `assets/`: original portrait, downloadable CV, and SVG favicon.

Open `index.html` in a browser to preview. All site content, contact links, navigation, and career disclosures work without JavaScript. Google Fonts supplies DM Sans and Instrument Serif, with system font fallbacks.

## Deployment

In this repository's **Settings → Pages**, set **Source** to **GitHub Actions**. The included workflow publishes only the public website files on every push to `main`. The initial project URL is `https://samky8.github.io/digitalCV/`.

## Move samuelburke.ca from Carrd

1. Verify the redesigned site at the GitHub Pages URL before changing DNS.
2. In GitHub account **Settings → Pages**, verify ownership of `samuelburke.ca` using the TXT record GitHub provides.
3. In the repository's **Settings → Pages**, set the custom domain to `samuelburke.ca` and save it **before** changing the domain's DNS.
4. At the existing DNS provider, replace Carrd's website A records for `@` with these four GitHub Pages addresses:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
5. Set `www` as a CNAME to `samky8.github.io` (no repository path). Replace conflicting website records, including any old AAAA records. Preserve email MX records and other unrelated records.
6. Wait for GitHub's DNS check and certificate provisioning, then enable **Enforce HTTPS**. Verify both `samuelburke.ca` and `www.samuelburke.ca`, the CV download, and email link. DNS propagation can take up to 24 hours.
7. Retire Carrd hosting only after those checks succeed. Domain registration can stay with its current registrar.

The Actions deployment does not require a CNAME file; configure the custom domain in repository settings. Canonical and social metadata already target `https://samuelburke.ca/`.

Official instructions: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## Content provenance and review

Content and impact numbers were adapted from the owner's existing `samuelburke.ca` site on October 21, 2026. The portrait and January 2026 PDF were copied from the owner's public site and linked Dropbox file. The LinkedIn URL was corrected by removing the old `/target_blank` suffix.

Before treating the career history as newly updated, confirm the roles marked Present, the GCTools ambassador entry, the French language profile, and the downloadable PDF. Training is described as professional development rather than claiming current certification validity. No client testimonials or additional performance results were invented.

## Accessibility and functionality

Includes semantic landmarks, a skip link, visible keyboard focus, native keyboard-operable details/summary career disclosures, portrait alt text, responsive layouts, reduced-motion support, and print styles that expand career details. There is no contact-form backend; contact buttons open an email composer.
