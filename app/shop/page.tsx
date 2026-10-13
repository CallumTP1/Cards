import { Suspense } from "react";
import ShopClient from "./ShopClient";

export const metadata = { title: "Shop — CardVault" };

export default function Shop() {
  return (
    <div className="container section">
      <h1>Shop</h1>
      <Suspense><ShopClient /></Suspense>
    </div>
  );
}
