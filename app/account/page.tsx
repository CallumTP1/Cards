"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

export default function Account() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  useEffect(() => { if (!loading && !user) router.replace("/login"); }, [loading, user, router]);
  if (loading || !user) return <div className="container section"><p className="muted">Loading…</p></div>;

  return (
    <div className="container section">
      <h1>Hi{user.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ""} 👋</h1>
      <p className="muted">{user.email}</p>
      <div className="cart-total" style={{ gap: "1rem", justifyContent: "flex-start" }}>
        <Link href="/shop" className="btn">Keep shopping</Link>
        <button className="btn" onClick={async () => { await signOut(); router.push("/"); }}>Log out</button>
      </div>
    </div>
  );
}
