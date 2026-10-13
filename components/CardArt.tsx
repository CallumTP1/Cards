import { GAMES, type Product } from "@/lib/products";

// Generated card artwork (no copyrighted images) — swap for real photos via <Image> when you have them.
export default function CardArt({ product }: { product: Product }) {
  const g = GAMES[product.game];
  return (
    <div className="card-art" style={{ ["--from" as string]: g.from, ["--to" as string]: g.to }}>
      <div className="card-art-inner">
        <span className="card-art-set">{product.set}</span>
        <span className="card-art-name">{product.name}</span>
        <span className="card-art-rarity">{product.rarity}</span>
      </div>
      <div className="card-shine" />
    </div>
  );
}
