import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container section">
      <h1>Card not found</h1>
      <Link href="/shop" className="link">Back to the shop →</Link>
    </div>
  );
}
