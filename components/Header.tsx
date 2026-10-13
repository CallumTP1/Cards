"use client";
import Link from "next/link";
import { useCart } from "@/lib/cart";

export default function Header() {
  const { count } = useCart();
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
        <Link href="/cart" className="cart-link">Cart{count > 0 && <b>{count}</b>}</Link>
      </div>
    </header>
  );
}
