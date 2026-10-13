"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchOrders, type Order } from "@/lib/orders";
import OrderList from "@/components/OrderList";

export default function Orders() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [err, setErr] = useState<string>();
  useEffect(() => { fetchOrders().then((r) => { setOrders(r.orders); setErr(r.error); }); }, []);

  return (
    <>
      <h1>Your orders</h1>
      {err === "setup" ? (
        <p className="notice-box">Orders aren&apos;t switched on yet. Run <code>supabase/schema.sql</code> in the Supabase SQL editor.</p>
      ) : err ? <p className="error">{err}</p>
      : orders === null ? <p className="muted">Loading…</p>
      : orders.length === 0 ? <p className="muted">You haven&apos;t placed any orders yet. <Link href="/shop" className="link">Browse the shop →</Link></p>
      : <OrderList orders={orders} />}
    </>
  );
}
