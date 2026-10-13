import { supabase } from "./supabase";

export interface OrderItem { id: string; name: string; qty: number; price: number }
export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "paid" | "shipped" | "cancelled";
  created_at: string;
}

export const orderRef = (id: string) => "CV-" + id.slice(0, 8).toUpperCase();

export async function fetchOrders(limit?: number): Promise<{ orders: Order[]; error?: string }> {
  const sb = supabase();
  if (!sb) return { orders: [], error: "Accounts aren't configured yet." };
  let q = sb.from("orders").select("id, items, total, status, created_at").order("created_at", { ascending: false });
  if (limit) q = q.limit(limit);
  const { data, error } = await q;
  if (error) {
    const missing = /relation .* does not exist|schema cache|Could not find the table/i.test(error.message);
    return { orders: [], error: missing ? "setup" : error.message };
  }
  return { orders: (data ?? []) as Order[] };
}

export async function placeOrder(items: OrderItem[], total: number) {
  const sb = supabase();
  if (!sb) return { error: "Accounts aren't configured yet." };
  const { error } = await sb.from("orders").insert({ items, total: Math.round(total * 100) / 100 });
  return { error: error?.message };
}
