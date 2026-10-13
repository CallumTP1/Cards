"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { placeOrder } from "@/lib/orders";
import { getProduct, gbp } from "@/lib/products";

export default function CartPage() {
  const { lines, total, setQty, clear } = useCart();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
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
        {error && <p className="error">{error}</p>}
        <button
          className="btn btn-primary"
          disabled={busy || loading}
          onClick={async () => {
            if (!user) return router.push("/login");
            setBusy(true); setError("");
            const { error } = await placeOrder(rows.map(({ p, qty }) => ({ id: p.id, name: p.name, qty, price: p.price })), total);
            setBusy(false);
            if (error) return setError(/does not exist|schema cache/i.test(error) ? "Orders aren't switched on yet (database table missing)." : error);
            clear();
            router.push("/account/orders");
          }}
        >
          {busy ? "Placing order…" : user ? "Place order" : "Log in to check out"}
        </button>
        <p className="muted">Online payment isn&apos;t connected yet — orders are saved as &ldquo;Awaiting payment&rdquo;.</p>
      </div>
    </div>
  );
}
