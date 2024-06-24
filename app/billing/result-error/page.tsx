import Link from "next/link";

export default function ResultErrorPage() {
  return (
    <div>
      <h2 className="text-red-500 font-bold text-xl">ERROR!</h2>
      <p>Failed to add tokens. Please try again.</p>
      <Link href="/billing" className="mt-10">
        <button className="checkout-style-background">OK</button>
      </Link>
    </div>
  );
}
