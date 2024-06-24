import Link from "next/link";

export default function IndexPage(): JSX.Element {
  return (
    <ul className="card-list">
      <li>
        <Link href="/billing" className="card checkout-style-background">
          <h2 className="bottom">Open billing page</h2>
        </Link>
      </li>
    </ul>
  );
}
