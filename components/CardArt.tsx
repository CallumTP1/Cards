"use client";
import { useState } from "react";
import Image from "next/image";
import { GAMES, type Product } from "@/lib/products";

// Shows the product photo when there is one; otherwise (or if it fails to load) generated card art.
export default function CardArt({ product }: { product: Product }) {
  const [failed, setFailed] = useState(false);
  const g = GAMES[product.game];

  if (product.image && !failed) {
    return (
      <div className="card-photo">
        <Image
          src={product.image}
          alt={`${product.name} — ${product.set}`}
          fill
          sizes="(max-width: 700px) 60vw, 340px"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return (
    <div className="card-art" style={{ ["--from" as string]: g.from, ["--to" as string]: g.to }}>
      <div className="card-art-inner">
        <span className="card-art-set">{product.set}</span>
        <span className="card-art-name">{product.name}</span>
        <span className="card-art-rarity">{product.rarity}</span>
      </div>
      <div className="card-shine" />
    </div>
  );
}
