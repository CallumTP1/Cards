"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { fetchOrders, type Order } from "@/lib/orders";
import { gbp } from "@/lib/products";
import OrderList from "@/components/OrderList";

export default function Overview() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [err, setErr] = useState<string>();

  useEffect(() => {
    fetchOrders().then((r) => { setOrders(r.orders); setErr(r.error); });
  }, []);

  const name = user?.user_metadata?.full_name?.split(" ")[0];
  const spent = (orders ?? []).filter((o) => o.status !== "cancelled").reduce((s, o) => s + Number(o.total), 0);
  const since = user?.created_at ? new Date(user.created_at).toLocaleDateString("en-GB", { month: "long", year: "numeric" }) : "—";

  return (
    <>
      <h1>Hi{name ? `, ${name}` : ""} 👋</h1>
      <div className="stats">
        <div><span className="muted">Orders</span><b>{orders?.length ?? "–"}</b></div>
        <div><span className="muted">Total ordered</span><b>{orders ? gbp(spent) : "–"}</b></div>
        <div><span className="muted">Member since</span><b>{since}</b></div>
      </div>

      <div className="sechead-row"><h2>Recent orders</h2><Link href="/account/orders" className="link">View all →</Link></div>
      {err === "setup" ? (
        <p className="notice-box">Orders aren&apos;t switched on yet. Run <code>supabase/schema.sql</code> in the Supabase SQL editor.</p>
      ) : err ? (
        <p className="error">{err}</p>
      ) : orders === null ? (
        <p className="muted">Loading…</p>
      ) : orders.length === 0 ? (
        <p className="muted">No orders yet. <Link href="/shop" className="link">Start shopping →</Link></p>
      ) : (
        <OrderList orders={orders.slice(0, 3)} />
      )}
    </>
  );
}
