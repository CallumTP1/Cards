import Link from "next/link";
import { GAMES, gbp, type Product } from "@/lib/products";
import CardArt from "./CardArt";
import AddToCart from "./AddToCart";

export default function ProductCard({ product, list = false }: { product: Product; list?: boolean }) {
  const g = GAMES[product.game];
  return (
    <article className={list ? "product product-list" : "product"}>
      <Link href={`/product/${product.id}`} aria-label={product.name} className="product-art">
        <CardArt product={product} />
      </Link>
      <div className="product-body">
        <span className="tag" style={{ color: g.accent }}>{g.label}</span>
        <h3><Link href={`/product/${product.id}`}>{product.name}</Link></h3>
        <p className="muted">{product.set} · {product.condition}</p>
        <p className={product.stock <= 2 ? "stock low" : "stock"}>{product.stock <= 2 ? `Only ${product.stock} left` : "In stock"}</p>
        <div className="product-foot">
          <strong>{gbp(product.price)}</strong>
          <AddToCart id={product.id} stock={product.stock} />
        </div>
      </div>
    </article>
  );
}
