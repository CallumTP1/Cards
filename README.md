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
