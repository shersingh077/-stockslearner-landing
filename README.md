# StockLearners

StockLearners is a Next.js App Router website for stock-market education in
India. It includes the existing Supabase-backed account, chat and manually
managed VIP flows, plus SEO landing pages, educational guides, trust/legal
pages, consent-gated analytics, an RSS feed and a generated sitemap.

The canonical production domain is `https://stockslearner.online`.

## Stack

- Next.js 16 App Router, React 19 and TypeScript
- Tailwind CSS 4
- Supabase for existing account and application data
- Vercel for hosting

## Run locally

1. Install Node.js and npm.
2. Copy `.env.example` to `.env.local` and fill in the required values.
3. Install dependencies and start the development server:

   ```bash
   npm install
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

To verify a production build locally, run:

```bash
npm run build
npm run start
```

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `SUPABASE_SECRET_KEY` | Yes | Server-side Supabase access; keep private |
| `SESSION_SECRET` | Yes | Server-side signing secret; generate a unique random value |
| `ADMIN_PASSWORD` | Yes | Admin login password |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | No | Google Analytics ID; loads only after consent |
| `NEXT_PUBLIC_META_PIXEL_ID` | No | Meta Pixel ID; loads only after consent |

Never commit `.env.local` or put server secrets in `NEXT_PUBLIC_*` variables.
The Supabase secret key is privileged and must only be used by server code.

## Important routes

- `/` and `/hi` — English and Hindi landing pages
- `/learn` and `/learn/[slug]` — original educational articles
- `/news` — official source directory; no third-party live feed is connected
- `/market-today` — official market-checklist, not a generated quote report
- `/stock` and `/stock/[symbol]` — selected static company references
- `/screener` — selected company directory filter, not a financial ranking
- `/sector` and `/sector/[slug]` — sector explainers and linked companies
- `/ipo` — IPO verification guide with official source links
- `/nifty-levels-tomorrow` — index-level research checklist, no generated levels
- `/watchlist` — browser-local stock bookmarks, not synced to an account
- `/calculators` — SIP, lump-sum, CAGR, brokerage, margin, position-size and
  retirement illustrations
- `/feed.xml`, `/robots.txt`, `/sitemap.xml` — feed and crawler endpoints
- `/about`, `/contact`, `/privacy`, `/terms`, `/disclaimer`, `/refund-policy`
- `/login`, `/register`, `/dashboard`, `/chat`, `/admin` — account areas

The RSS feed contains educational guides, not news. Live quotes, licensed news
feeds, automated market reports, backend-synced watchlists, online payment
processing, email campaigns, lead capture and market alerts are not yet
connected; do not present sample or unverified data as live market information.

## Deploy to Vercel

1. Link this repository to the existing `stockslearner-landing` Vercel project.
2. Add the required environment variables in Vercel Project Settings for the
   Preview and Production environments that need them.
3. Confirm `stockslearner.online` and `www.stockslearner.online` are assigned
   to this project and that HTTPS is active.
4. Deploy through the project's normal Git integration or Vercel CLI.
5. After deployment, check the canonical domain, then submit
   `https://stockslearner.online/sitemap.xml` in Google Search Console.

Configure analytics IDs only if the relevant account is active. Have the draft
privacy, terms and refund notices reviewed against actual operator practices
and applicable law before treating them as final policies.
