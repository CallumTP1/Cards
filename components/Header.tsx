"use client";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";

export default function Header() {
  const { count } = useCart();
  const { user, loading } = useAuth();
  return (
    <header className="header">
      <div className="container header-in">
        <Link href="/" className="logo">◆ Card<span>Vault</span></Link>
        <nav>
          <Link href="/shop">All cards</Link>
          <Link href="/shop?game=pokemon">Pokémon</Link>
          <Link href="/shop?game=mtg">Magic</Link>
          <Link href="/shop?game=yugioh">Yu-Gi-Oh!</Link>
        </nav>
        <div className="header-right">
          {!loading && (user
            ? <Link href="/account">Account</Link>
            : <><Link href="/login">Log in</Link><Link href="/signup" className="btn btn-primary btn-sm">Sign up</Link></>)}
        <Link href="/cart" className="cart-link">Cart{count > 0 && <b>{count}</b>}</Link>
        </div>
      </div>
    </header>
  );
}
