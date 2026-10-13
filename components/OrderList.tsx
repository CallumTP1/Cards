import { gbp } from "@/lib/products";
import { orderRef, type Order } from "@/lib/orders";

const LABEL: Record<Order["status"], string> = { pending: "Awaiting payment", paid: "Paid", shipped: "Shipped", cancelled: "Cancelled" };

export default function OrderList({ orders }: { orders: Order[] }) {
  return (
    <div className="orders">
      {orders.map((o) => (
        <article key={o.id} className="order">
          <header>
            <div>
              <b>{orderRef(o.id)}</b>
              <span className="muted"> · {new Date(o.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
            </div>
            <span className={`status status-${o.status}`}>{LABEL[o.status] ?? o.status}</span>
          </header>
          <ul>
            {o.items.map((i) => (
              <li key={i.id}><span>{i.qty} × {i.name}</span><span>{gbp(i.price * i.qty)}</span></li>
            ))}
          </ul>
          <footer><span>Total</span><strong>{gbp(Number(o.total))}</strong></footer>
        </article>
      ))}
    </div>
  );
}
