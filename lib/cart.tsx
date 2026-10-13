"use client";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProduct } from "./products";

type Lines = Record<string, number>;
interface CartCtx {
  lines: Lines;
  count: number;
  total: number;
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
}
const Ctx = createContext<CartCtx | null>(null);
const KEY = "cards-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Lines>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try { setLines(JSON.parse(localStorage.getItem(KEY) || "{}")); } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch {}
  }, [lines, ready]);

  const value = useMemo<CartCtx>(() => {
    const clamp = (id: string, q: number) => Math.max(0, Math.min(q, getProduct(id)?.stock ?? 0));
    return {
      lines,
      count: Object.values(lines).reduce((a, b) => a + b, 0),
      total: Object.entries(lines).reduce((s, [id, q]) => s + (getProduct(id)?.price ?? 0) * q, 0),
      add: (id) => setLines((l) => ({ ...l, [id]: clamp(id, (l[id] ?? 0) + 1) })),
      setQty: (id, qty) =>
        setLines((l) => {
          const { [id]: _, ...rest } = l;
          const q = clamp(id, qty);
          return q > 0 ? { ...rest, [id]: q } : rest;
        }),
      clear: () => setLines({}),
    };
  }, [lines]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
};
