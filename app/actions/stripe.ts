"use server";

import type { Stripe } from "stripe";

import { headers } from "next/headers";

import { CURRENCY } from "@/config";
import { formatAmountForStripe } from "@/utils/stripe-helpers";
import { stripe } from "@/lib/stripe";

export async function createCheckoutSession(
  data: FormData
): Promise<{ client_secret: string | null; url: string | null }> {
  const origin: string = headers().get("origin") as string;

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "pay",
      customer_email: "demo.stripe@gmail.com",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: CURRENCY,
            product_data: {
              name: "Buy tokens",
            },
            unit_amount: formatAmountForStripe(
              Number(data.get("cost") as string),
              CURRENCY
            ),
          },
        },
      ],
      success_url: `${origin}/billing/result-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/billing/result-error`,
    });

  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  };
}
