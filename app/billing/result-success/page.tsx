import type { Stripe } from "stripe";

import { stripe } from "@/lib/stripe";
import Link from "next/link";

export default async function ResultSuccessPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}): Promise<JSX.Element> {
  if (!searchParams.session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.retrieve(searchParams.session_id, {
      expand: ["line_items", "payment_intent"],
    });

  const paymentIntent = checkoutSession.payment_intent as Stripe.PaymentIntent;

  return (
    <div>
      <h2 className="text-green-500 font-bold text-xl">SUCCESS</h2>
      <p>Tokens added successfully!</p>
      <Link href="/billing" className="mt-10">
        <button className="checkout-style-background">OK</button>
      </Link>
      ---
      <h5>RESPONSE</h5>
      <pre>{JSON.stringify(checkoutSession, null, 2)}</pre>
    </div>
  );
}
