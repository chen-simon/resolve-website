# Site plan — Resolve

**Resolve** (resolveinteractive.ca) — small indie game studio site. Static, fast, light theme, clean technical base with playful accents.
See [wishlist.md](wishlist.md) for references.

## Stack

| Layer | Choice |
|---|---|
| Framework | Astro (static output, zero JS by default) |
| Package manager | Bun |
| Styling | Plain CSS + custom properties (design tokens), Astro scoped styles |
| Motion | CSS transitions/keyframes; add GSAP/Motion only if needed |
| Content | Markdown content collections (games) |
| Mailing list | Provider-agnostic `MailingList.astro` seam (provider TBD) |
| Repo | GitHub |
| Hosting | Cloudflare (Workers/Pages) via Git integration, auto-deploy on push |
| Domain | Already on Cloudflare — attach as custom domain |

## Pages (launch)

- **Home** — teaser hero for **Star Stations**: logo, "coming soon", mailing list signup.
- **Games** — grid of game cards. Zero games announced yet → shows the teaser card / "coming soon" state.
- **Game detail** (`/games/[slug]`) — generated from markdown. Ready for when the first game is announced.

Later (not launch): About/Team, Press Kit, News, Jobs.

## Structure

```
src/
  layouts/
    Base.astro          # <head>, nav, footer, global CSS
  components/
    Nav.astro
    Footer.astro        # studio email link, copyright
    GameCard.astro
    Teaser.astro        # coming-soon hero block
    MailingList.astro   # signup seam: props in, provider swapped in one place
  content/
    games/
      star-stations.md  # status: teaser
  pages/
    index.astro
    games/index.astro
    games/[slug].astro
  styles/
    tokens.css          # colors, type scale, spacing
    global.css
public/
  fonts/  favicon
src/assets/
  resolve-logo.png      # moved from ./resolve-logo.png
  games/star-stations/
    logo.png            # moved from ./star stations lib logo.png (Astro optimizes images in src/assets)
```

## Game content model (frontmatter)

```yaml
title: string
slug: string
status: teaser | announced | released
tagline: string
keyArt: image
trailer: url (optional)
platforms: [steam, switch, ...]
storeLinks: { steam: url, ... }
mailingList: boolean   # show signup on this game
```

The teaser on Home = the game with `status: teaser`.

## Design direction

- **Base:** nasa.gov-style — white pages, black bands (nav, hero, footer), square corners, strong grid, generous whitespace, heavy grotesk headings + small uppercase labels.
- **Accents:** one red accent (buttons, badges, underlines). Restrained hovers: darker red, red underlines, slight image zoom — no tilting text, no offset shadows.
- **Nav:** simple top bar like Team Hami / Aggro Crab — logo left, links right, collapses to menu on mobile.
- **Fonts:** Inter Tight (headings, body, labels), self-hosted.
- **Resolve logo:** white-on-transparent, single color, bold wordmark in a rounded box. On the light nav it must render dark: use it as a CSS `mask-image` filled with `currentColor`, so one file can be any color (ink on light, white on dark band, accent on hover). An SVG version would be sharper and smaller; PNG works fine meanwhile.
- **Star Stations logo:** white-on-transparent, monochrome, orbit/arrow mark — fits the NASA vibe. Light site needs a **dark "space" band** behind the teaser hero (black, subtle starfield). Rest of site stays light. Logo PNG has lots of padding — crop when moved.
- **Contact:** `/contact/` page + email link in footer (no socials yet). Mailing list only on Star Stations (teaser hero + game page).

## Mailing list seam

`MailingList.astro` takes `{ list, heading }` props and renders one form. Provider config lives in a single place (`src/config.ts`: `action` URL + field name). Until a provider is picked, form shows but posts nowhere (or `mailto:` fallback). Swapping provider = edit config only, no page changes.

## Deploy

1. `git init`, push to GitHub.
2. Cloudflare → Workers & Pages → Import repo. Build `bun run build`, output `dist` (Cloudflare detects `bun.lock` and installs with Bun).
3. Add custom domain in project settings (DNS/SSL automatic).
4. Push = deploy; branches get preview URLs.

## Open decisions

- [ ] Resolve logo as SVG? (nice-to-have; PNG works)
- [ ] Accent color (one bold color for hovers/buttons/badges)
- [ ] Studio email address for footer (e.g. hello@resolveinteractive.ca)
- [ ] Star Stations tagline / one-line pitch for teaser
- [ ] Mailing list provider — deferred, seam in place (Buttondown vs Kit)

## Decided

- Studio: Resolve, resolveinteractive.ca (domain on Cloudflare)
- Launch pages: Home + Games (+ game detail)
- Studio logo: resolve-logo.png (white, recolored via CSS mask)
- First game: Star Stations, status teaser, has logo
- Fonts: Inter Tight + JetBrains Mono
- Light theme, clean base + fun accents
- Footer: email only
