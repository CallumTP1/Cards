"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GAMES, PRODUCTS, type Game } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

const toggle = (set: string[], v: string) => (set.includes(v) ? set.filter((x) => x !== v) : [...set, v]);

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="fgroup" open>
      <summary>{title}</summary>
      <div className="fgroup-body">{children}</div>
    </details>
  );
}

export default function ShopClient() {
  const router = useRouter();
  const params = useSearchParams();
  const game = params.get("game") as Game | null;
  const q = (params.get("q") ?? "").toLowerCase();
  const type = params.get("type"); // single | sealed

  const [inStock, setInStock] = useState(false);
  const [games, setGames] = useState<string[]>([]);
  const [rarities, setRarities] = useState<string[]>([]);
  const [conditions, setConditions] = useState<string[]>([]);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [sort, setSort] = useState("relevance");
  const [perPage, setPerPage] = useState(12);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const scope = useMemo(
    () => PRODUCTS.filter((p) => (!game || p.game === game) && (!type || (type === "sealed") === (p.condition === "Sealed"))),
    [game, type],
  );
  const rarityOptions = useMemo(() => [...new Set(scope.map((p) => p.rarity))].sort(), [scope]);
  const conditionOptions = useMemo(() => [...new Set(scope.map((p) => p.condition))].sort(), [scope]);

  const items = useMemo(() => {
    let list = scope.filter((p) => {
      if (q && !(p.name + " " + p.set + " " + p.rarity).toLowerCase().includes(q)) return false;
      if (inStock && p.stock < 1) return false;
      if (!game && games.length && !games.includes(p.game)) return false;
      if (rarities.length && !rarities.includes(p.rarity)) return false;
      if (conditions.length && !conditions.includes(p.condition)) return false;
      if (min !== "" && p.price < Number(min)) return false;
      if (max !== "" && p.price > Number(max)) return false;
      return true;
    });
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "az") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [scope, q, inStock, games, game, rarities, conditions, min, max, sort]);

  useEffect(() => setPage(1), [game, type, q, inStock, games, rarities, conditions, min, max, sort, perPage]);

  const pages = Math.max(1, Math.ceil(items.length / perPage));
  const shown = items.slice((page - 1) * perPage, page * perPage);

  const reset = () => { setInStock(false); setGames([]); setRarities([]); setConditions([]); setMin(""); setMax(""); };
  const title = q ? `Results for “${params.get("q")}”` : game ? GAMES[game].label : type === "sealed" ? "Sealed Product" : type === "single" ? "Singles" : "All Cards";

  return (
    <>
      <section className="banner">
        <h1>{title}</h1>
        <p className="crumbs"><a href="/">Home</a> / <b>{title}</b></p>
      </section>

      <div className="container shop">
        <button className="btn filter-toggle" onClick={() => setFiltersOpen((o) => !o)}>
          {filtersOpen ? "Hide filters" : "Show filters"}
        </button>

        <aside className={filtersOpen ? "filters open" : "filters"}>
          <h2>Narrow by</h2>
          <Group title="Stock status">
            <label><input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} /> In stock only</label>
          </Group>
          {!game && (
            <Group title="Game">
              {(Object.keys(GAMES) as Game[]).map((k) => (
                <label key={k}><input type="checkbox" checked={games.includes(k)} onChange={() => setGames(toggle(games, k))} /> {GAMES[k].label}</label>
              ))}
            </Group>
          )}
          <Group title="Rarity">
            {rarityOptions.map((r) => (
              <label key={r}><input type="checkbox" checked={rarities.includes(r)} onChange={() => setRarities(toggle(rarities, r))} /> {r}</label>
            ))}
          </Group>
          <Group title="Condition">
            {conditionOptions.map((c) => (
              <label key={c}><input type="checkbox" checked={conditions.includes(c)} onChange={() => setConditions(toggle(conditions, c))} /> {c}</label>
            ))}
          </Group>
          <Group title="Price (£)">
            <div className="range">
              <input className="input" type="number" min="0" placeholder="Min" value={min} onChange={(e) => setMin(e.target.value)} />
              <input className="input" type="number" min="0" placeholder="Max" value={max} onChange={(e) => setMax(e.target.value)} />
            </div>
          </Group>
          <button className="btn btn-sm" onClick={reset}>Clear filters</button>
        </aside>

        <section className="results">
          <div className="resultsbar">
            <span className="muted">{items.length} result{items.length === 1 ? "" : "s"} found</span>
            <div className="resultsbar-r">
              <label>Sort by
                <select className="input" value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="relevance">Relevance</option>
                  <option value="low">Price: low to high</option>
                  <option value="high">Price: high to low</option>
                  <option value="az">Name: A–Z</option>
                </select>
              </label>
              <label>Per page
                <select className="input" value={perPage} onChange={(e) => setPerPage(Number(e.target.value))}>
                  {[12, 24, 48].map((n) => <option key={n}>{n}</option>)}
                </select>
              </label>
              <div className="viewtoggle">
                <button className={view === "grid" ? "on" : ""} onClick={() => setView("grid")} aria-label="Grid view">▦</button>
                <button className={view === "list" ? "on" : ""} onClick={() => setView("list")} aria-label="List view">☰</button>
              </div>
            </div>
          </div>

          {shown.length === 0 ? (
            <p className="muted">No cards match your search. <button className="link linkbtn" onClick={() => { reset(); router.push("/shop"); }}>Clear everything</button></p>
          ) : (
            <div className={view === "grid" ? "grid grid-3p" : "list"}>
              {shown.map((p) => <ProductCard key={p.id} product={p} list={view === "list"} />)}
            </div>
          )}

          {pages > 1 && (
            <div className="pager">
              {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                <button key={n} className={n === page ? "on" : ""} onClick={() => setPage(n)}>{n}</button>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
