import type { Metadata } from "next";
import Link from "next/link";
import { CartProvider } from "@/lib/cart";
import { AuthProvider } from "@/lib/auth";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "CardVault — Pokémon, Magic & Yu-Gi-Oh! cards",
  description: "Buy singles and sealed product for Pokémon, Magic: The Gathering and Yu-Gi-Oh!.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <footer className="footer">
            <div className="container footer-in">
              <div><b>◆ CardVault</b><p className="muted">Pokémon, Magic: The Gathering &amp; Yu-Gi-Oh! cards.</p></div>
              <div><b>Shop</b><Link href="/shop?game=pokemon">Pokémon</Link><Link href="/shop?game=mtg">Magic</Link><Link href="/shop?game=yugioh">Yu-Gi-Oh!</Link></div>
              <div><b>Account</b><Link href="/login">Log in</Link><Link href="/signup">Sign up</Link><Link href="/cart">Cart</Link></div>
            </div>
            <div className="container footer-legal">© {new Date().getFullYear()} CardVault. Not affiliated with Nintendo, Wizards of the Coast or Konami.</div>
          </footer>
        </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
