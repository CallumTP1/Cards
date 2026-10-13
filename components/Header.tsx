"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";

const NAV = [
  { label: "Pokémon", href: "/shop?game=pokemon" },
  { label: "Magic: The Gathering", href: "/shop?game=mtg" },
  { label: "Yu-Gi-Oh!", href: "/shop?game=yugioh" },
  { label: "Sealed Product", href: "/shop?type=sealed" },
  { label: "Singles", href: "/shop?type=single" },
  { label: "All Cards", href: "/shop" },
];

export default function Header() {
  const { count } = useCart();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [q, setQ] = useState("");

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="container topbar-in">
          <span>Free UK delivery on orders over £50</span>
          <span className="topbar-mid">★ Condition-checked by hand ★</span>
          <span>Dispatched in 1–2 working days</span>
        </div>
      </div>

      <div className="container mainbar">
        <Link href="/" className="logo">◆ Card<span>Vault</span></Link>
        <form
          className="search"
          onSubmit={(e) => { e.preventDefault(); router.push(q.trim() ? `/shop?q=${encodeURIComponent(q.trim())}` : "/shop"); }}
        >
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the store" aria-label="Search the store" />
          <button aria-label="Search">⌕</button>
        </form>
        <div className="actions">
          {user && !loading
            ? <Link href="/account">👤 Account</Link>
            : <><Link href="/login">👤 Log in</Link><Link href="/signup" className="btn btn-primary btn-sm">Sign up</Link></>}
          <Link href="/cart" className="cart-link">🛒 Cart<b>{count}</b></Link>
        </div>
      </div>

      <nav className="catnav">
        <div className="container catnav-in">
          {NAV.map((n) => <Link key={n.label} href={n.href}>{n.label}</Link>)}
        </div>
      </nav>
    </header>
  );
}
