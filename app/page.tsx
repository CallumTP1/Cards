import Link from "next/link";
import { GAMES, PRODUCTS, type Game } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const featured = [...PRODUCTS].sort((a, b) => b.price - a.price).slice(0, 4);
  return (
    <>
      <section className="hero">
        <div className="container">
          <span className="pill">Singles · Slabs · Sealed</span>
          <h1>Find your next <em>chase card</em>.</h1>
          <p>Pokémon, Magic: The Gathering and Yu-Gi-Oh! — carefully graded, securely packed, shipped fast.</p>
          <div className="hero-cta">
            <Link href="/shop" className="btn btn-primary">Shop all cards</Link>
            <Link href="/shop?game=pokemon" className="btn">Browse Pokémon</Link>
          </div>
        </div>
      </section>

      <section className="container section">
        <h2>Shop by game</h2>
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
        <h2>Featured</h2>
        <div className="grid grid-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="container section perks">
        <div><b>📦 Protected shipping</b><p className="muted">Sleeved, toploaded and bubble-wrapped.</p></div>
        <div><b>🔍 Honest grading</b><p className="muted">Condition shown on every listing.</p></div>
        <div><b>⚡ Fast dispatch</b><p className="muted">Orders ship within 1–2 working days.</p></div>
      </section>
    </>
  );
}
