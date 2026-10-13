import Link from "next/link";
import { GAMES, gbp, type Product } from "@/lib/products";
import CardArt from "./CardArt";
import AddToCart from "./AddToCart";

export default function ProductCard({ product }: { product: Product }) {
  const g = GAMES[product.game];
  return (
    <article className="product">
      <Link href={`/product/${product.id}`} aria-label={product.name}>
        <CardArt product={product} />
      </Link>
      <div className="product-body">
        <span className="tag" style={{ color: g.accent }}>{g.label}</span>
        <h3><Link href={`/product/${product.id}`}>{product.name}</Link></h3>
        <p className="muted">{product.condition} · {product.stock <= 2 ? `Only ${product.stock} left` : "In stock"}</p>
        <div className="product-foot">
          <strong>{gbp(product.price)}</strong>
          <AddToCart id={product.id} stock={product.stock} />
        </div>
      </div>
    </article>
  );
}
