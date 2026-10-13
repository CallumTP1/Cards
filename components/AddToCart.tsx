"use client";
import { useState } from "react";
import { useCart } from "@/lib/cart";

export default function AddToCart({ id, stock }: { id: string; stock: number }) {
  const { add, lines } = useCart();
  const [done, setDone] = useState(false);
  const inCart = lines[id] ?? 0;
  const maxed = inCart >= stock;
  return (
    <button
      className="btn btn-primary"
      disabled={maxed}
      onClick={() => {
        add(id);
        setDone(true);
        setTimeout(() => setDone(false), 1200);
      }}
    >
      {maxed ? "Max in cart" : done ? "Added ✓" : "Add to cart"}
    </button>
  );
}
