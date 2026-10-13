"use client";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { getProduct, gbp } from "@/lib/products";

export default function CartPage() {
  const { lines, total, setQty } = useCart();
  const rows = Object.entries(lines).flatMap(([id, qty]) => {
    const p = getProduct(id);
    return p ? [{ p, qty }] : [];
  });

  if (rows.length === 0)
    return (
      <div className="container section">
        <h1>Your cart</h1>
        <p className="muted">It&apos;s empty. <Link href="/shop" className="link">Find some cards →</Link></p>
      </div>
    );

  return (
    <div className="container section">
      <h1>Your cart</h1>
      <div className="cart">
        {rows.map(({ p, qty }) => (
          <div key={p.id} className="cart-row">
            <div>
              <Link href={`/product/${p.id}`}><b>{p.name}</b></Link>
              <div className="muted">{p.set} · {p.condition}</div>
            </div>
            <div className="qty">
              <button onClick={() => setQty(p.id, qty - 1)} aria-label="Decrease">−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(p.id, qty + 1)} aria-label="Increase" disabled={qty >= p.stock}>+</button>
            </div>
            <strong>{gbp(p.price * qty)}</strong>
          </div>
        ))}
        <div className="cart-total">
          <span>Subtotal</span><strong>{gbp(total)}</strong>
        </div>
        <button className="btn btn-primary" onClick={() => alert("Checkout isn't connected yet — add Stripe to take payments.")}>
          Checkout
        </button>
      </div>
    </div>
  );
}
