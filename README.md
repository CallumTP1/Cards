# CardVault

Storefront for Pokémon, Magic: The Gathering and Yu-Gi-Oh! cards. Next.js (App Router) + TypeScript.

```bash
npm install
npm run dev     # http://localhost:3000
```

- Edit stock in `lib/products.ts`.
- Cart is stored in the browser (localStorage). Checkout is a placeholder — wire up Stripe Checkout to take payments.
- Deploy: import this repo at vercel.com/new (no config needed).
