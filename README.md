# CardVault

Storefront for Pokémon, Magic: The Gathering and Yu-Gi-Oh! cards. Next.js (App Router) + TypeScript.

```bash
npm install
npm run dev     # http://localhost:3000
```

- Edit stock in `lib/products.ts`.
- Cart is stored in the browser (localStorage). Checkout is a placeholder — wire up Stripe Checkout to take payments.
- Deploy: import this repo at vercel.com/new (no config needed).

## Customer accounts (Supabase)

1. Create a project at supabase.com.
2. Project Settings → API: copy the Project URL and the `anon` public key.
3. Add them as `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (copy `.env.example` to `.env.local` locally, and add them under Vercel → Settings → Environment Variables).
4. Supabase → Authentication → URL Configuration: set Site URL to your Vercel URL and add `https://YOUR-SITE.vercel.app/**` to Redirect URLs.

Live site: https://cardss-dusky.vercel.app

<!-- redeploy -->

## Orders & account area

Run `supabase/schema.sql` once in Supabase (SQL Editor → New query → paste → Run). This creates the `orders` table with row-level security so each customer only sees their own orders.

Until Stripe is connected, "Place order" saves an order as `pending` ("Awaiting payment"). Don't take real payments from this flow — prices are sent from the browser; use Stripe Checkout with server-side prices first.

## Product photos

Set `image` on a product in `lib/products.ts` (see `ptcg("base1", 4)` for Pokémon card scans). If an image fails to load, generated card art is shown instead.
