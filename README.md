# aurum-portfolio

Kanak Maheshwari's portfolio — a Next.js 16 site tailored to
`KanakResume-general-final.pdf` (also served from `/public`).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Where the content lives

Everything on the home page is driven by `content/user-data.tsx`:

| Export         | Used by                              |
| -------------- | ------------------------------------ |
| `USER_DATA`    | Navbar, hero greeting, footer, resume link |
| `TAG_LINES`    | Hero headline and sub-text           |
| `TRAITS_PAGE`  | Experience timeline                  |
| `EDUCATION`    | Education cards                      |
| `ACHIEVEMENTS` | Achievements & leadership cards      |
| `PROJECTS`     | Project grid                         |
| `FOOTER_DATA`  | Footer copy, email, socials, artwork |

To update the downloadable resume, replace
`public/KanakResume-general-final.pdf` (or point `USER_DATA.resume` at a new
file).

The profile image is `public/profile/km.png` — swap it for a real photo and
update `IMAGES_PATH.small_profile` if the filename changes.

## Theme

Colours are warm sand + deep teal, defined once in `app/globals.css`:

- `:root` — light theme tokens
- `.dark` — dark theme tokens
- `@theme inline` — exposes the tokens as Tailwind utilities (`bg-bg-*`,
  `text-fg-*`, `bg-accent`, …)

Edit `--accent`, `--background-*`, and `--foreground-*` there to re-skin the
whole site. Decorative artwork lives in `public/backgrounds/`.

## Sections that were removed

The **blog** section and the **System** page were removed by request. Their
code is still in the repo and only the references were commented out:

- `app/page.tsx` — `BlogPreview` import, `getAllPosts()`, and the section
- `components/ui/sections/navbar.tsx` — `/system`, `/blogs` (plus the original
  author's `/cli` and `/voidnote`) nav entries

Uncomment those lines to bring them back. Route files under `app/blogs/` and
`app/system/` were intentionally left untouched.

## Build

```bash
npm run build
npm start
```
