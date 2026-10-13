import Link from "next/link";
import { notFound } from "next/navigation";
import { GAMES, PRODUCTS, getProduct, gbp } from "@/lib/products";
import CardArt from "@/components/CardArt";
import AddToCart from "@/components/AddToCart";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const p = getProduct((await params).id);
  return { title: p ? `${p.name} — CardVault` : "Not found" };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const p = getProduct((await params).id);
  if (!p) notFound();
  const g = GAMES[p.game];
  return (
    <div className="container section detail">
      <CardArt product={p} />
      <div>
        <Link href={`/shop?game=${p.game}`} className="tag" style={{ color: g.accent }}>← {g.label}</Link>
        <h1>{p.name}</h1>
        <p className="muted">{p.blurb}</p>
        <dl className="specs">
          <div><dt>Set</dt><dd>{p.set}</dd></div>
          <div><dt>Rarity</dt><dd>{p.rarity}</dd></div>
          <div><dt>Condition</dt><dd>{p.condition}</dd></div>
          <div><dt>Stock</dt><dd>{p.stock}</dd></div>
        </dl>
        <div className="price">{gbp(p.price)}</div>
        <AddToCart id={p.id} stock={p.stock} />
      </div>
    </div>
  );
}
