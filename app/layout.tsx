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
            <div className="container">
              <span>◆ CardVault © {new Date().getFullYear()}</span>
              <span className="muted">Not affiliated with Nintendo, Wizards of the Coast or Konami.</span>
              <Link href="/shop">Shop all</Link>
            </div>
          </footer>
        </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
