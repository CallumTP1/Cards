"use client";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GAMES, PRODUCTS, type Game } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function ShopClient() {
  const router = useRouter();
  const params = useSearchParams();
  const game = (params.get("game") as Game | null) ?? null;
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("featured");

  const items = useMemo(() => {
    let list = PRODUCTS.filter((p) => (!game || p.game === game) && (p.name + p.set).toLowerCase().includes(q.toLowerCase()));
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [game, q, sort]);

  const setGame = (g: Game | null) => router.push(g ? `/shop?game=${g}` : "/shop");

  return (
    <>
      <div className="toolbar">
        <div className="chips">
          <button className={!game ? "chip on" : "chip"} onClick={() => setGame(null)}>All</button>
          {(Object.keys(GAMES) as Game[]).map((k) => (
            <button key={k} className={game === k ? "chip on" : "chip"} onClick={() => setGame(k)}>{GAMES[k].label}</button>
          ))}
        </div>
        <input className="input" placeholder="Search cards or sets…" value={q} onChange={(e) => setQ(e.target.value)} />
        <select className="input" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="featured">Featured</option>
          <option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option>
        </select>
      </div>
      {items.length === 0 ? <p className="muted">No cards match your search.</p> : (
        <div className="grid grid-4">{items.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      )}
    </>
  );
}
