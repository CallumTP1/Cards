"use client";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

const TABS = [
  { href: "/account", label: "Overview" },
  { href: "/account/orders", label: "Orders" },
  { href: "/account/settings", label: "Settings" },
  { href: "/account/security", label: "Security" },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => { if (!loading && !user) router.replace("/login"); }, [loading, user, router]);
  if (loading || !user) return <div className="container section"><p className="muted">Loading…</p></div>;

  return (
    <div className="container section account">
      <aside className="account-nav">
        <div className="account-who">
          <span className="avatar">{(user.user_metadata?.full_name || user.email || "?").charAt(0).toUpperCase()}</span>
          <div><b>{user.user_metadata?.full_name || "My account"}</b><div className="muted">{user.email}</div></div>
        </div>
        <nav>
          {TABS.map((t) => (
            <Link key={t.href} href={t.href} className={path === t.href ? "on" : ""}>{t.label}</Link>
          ))}
          <button onClick={async () => { await signOut(); router.push("/"); }}>Log out</button>
        </nav>
      </aside>
      <section className="account-main">{children}</section>
    </div>
  );
}
