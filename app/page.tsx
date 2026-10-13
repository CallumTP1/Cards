import Link from "next/link";
import { GAMES, PRODUCTS, type Game } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const featured = [...PRODUCTS].sort((a, b) => b.price - a.price).slice(0, 4);
  const sealed = PRODUCTS.filter((p) => p.condition === "Sealed").slice(0, 4);
  return (
    <>
      <section className="hero">
        <div className="container hero-in">
          <div>
            <span className="pill">Singles · Slabs · Sealed</span>
            <h1>Find your next <em>chase card</em>.</h1>
            <p>Pokémon, Magic: The Gathering and Yu-Gi-Oh! — carefully graded, securely packed, shipped fast.</p>
            <div className="hero-cta">
              <Link href="/shop" className="btn btn-primary">Shop all cards</Link>
              <Link href="/signup" className="btn btn-ghost">Create an account</Link>
            </div>
          </div>
          <div className="hero-cards" aria-hidden>
            <i style={{ ["--from" as string]: GAMES.pokemon.from, ["--to" as string]: GAMES.pokemon.to }} />
            <i style={{ ["--from" as string]: GAMES.mtg.from, ["--to" as string]: GAMES.mtg.to }} />
            <i style={{ ["--from" as string]: GAMES.yugioh.from, ["--to" as string]: GAMES.yugioh.to }} />
          </div>
        </div>
      </section>

      <section className="container section">
        <h2 className="sechead">Shop by game</h2>
        <div className="grid grid-3">
          {(Object.keys(GAMES) as Game[]).map((k) => (
            <Link key={k} href={`/shop?game=${k}`} className="game-tile" style={{ ["--from" as string]: GAMES[k].from, ["--to" as string]: GAMES[k].to }}>
              <span>{GAMES[k].label}</span>
              <small>{PRODUCTS.filter((p) => p.game === k).length} listings →</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="sechead-row"><h2 className="sechead">Chase cards</h2><Link href="/shop" className="link">View all →</Link></div>
        <div className="grid grid-4">{featured.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </section>

      <section className="container section">
        <div className="sechead-row"><h2 className="sechead">Sealed product</h2><Link href="/shop?type=sealed" className="link">View all →</Link></div>
        <div className="grid grid-4">{sealed.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </section>

      <section className="container section perks">
        <div><b>📦 Protected shipping</b><p className="muted">Sleeved, toploaded and bubble-wrapped.</p></div>
        <div><b>🔍 Honest grading</b><p className="muted">Condition shown on every listing.</p></div>
        <div><b>⚡ Fast dispatch</b><p className="muted">Orders ship within 1–2 working days.</p></div>
      </section>
    </>
  );
}
