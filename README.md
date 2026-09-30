# Raja Raj Rajeshwar Singh — official website

Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion. English (`/en`) and Hindi (`/hi`).
Built by PRAIB Advisors LLP.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Copy `.env.example` to `.env.local` and fill it in. Without the Gmail variables the enquiry form
only logs in development and returns an error in production.

## Where content lives

All copy is in `src/content/`, each string as `{ en, hi }`. Pages read from these files; nothing is
hard-coded in components.

| File | What it holds |
|---|---|
| `profile.ts` | Raja Raj Rajeshwar Singh's own verified facts |
| `heritage.ts` | Jhandi Raj family history (ancestors, kept separate from his own record) |
| `journey.ts` | His roles, his father's record, dated milestones |
| `publicLife.ts` | Public work, regional issues, community and faith |
| `media.ts` | Photos. Add videos, speeches, press, documents here |
| `updates.ts` | News. While empty, Updates is hidden everywhere and out of the sitemap |
| `assistant.ts` | The only passages the on-site assistant may answer from |
| `ui.ts` | Interface strings, navigation labels, form text |
| `legal.ts` | Privacy and Terms text |

Social links: `src/lib/site.ts`. No phone number is published; add one there only once it has been approved for publication.

## Adding material

- **Photos or videos:** put files under `public/images/...` and add an entry to `media.ts` with
  alt text, caption, date, event and location. Category filters appear automatically once more
  than one category has items.
- **An update:** add an entry to `updates.ts`. The nav item, home section, list page, detail page,
  sitemap and Article structured data switch on by themselves.
- **Assistant:** add or edit an entry in `assistant.ts`. It never calls an AI model, so it cannot say
  anything that is not written there.
