"use client";
import { createCheckoutSession } from "@/actions/stripe";
import StripeTestCards from "@/components/StripeTestCards";
import { useEffect, useState } from "react";

export default function DonatePage(): JSX.Element {
  const [loading] = useState<boolean>(false);
  const [token, setToken] = useState(0);
  const [cost, setCost] = useState(0);

  useEffect(() => {
    setCost(token * 0.2);
  }, [token]);

  const formAction = async (data: FormData): Promise<void> => {
    const { url } = await createCheckoutSession(data);

    window.location.assign(url as string);
  };

  return (
    <div className="page-container">
      <h1>Billing Page</h1>
      <form action={formAction}>
        <input type="hidden" name="uiMode" value="hosted" />

        <div className="flex flex-row">
          <div className="mr-10">
            <h4>Purchase More Tokens:</h4>
            <span>One token is equivalent to $0.20. Minimum 5 tokens</span>
            <input
              value={token}
              onChange={(e) => {
                setToken(parseInt(e.target.value));
              }}
              type="number"
              min={5}
              placeholder="Enter quantity here"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            />
          </div>
          <div>
            <h4>Total cost ($):</h4>
            <input
              name="cost"
              value={cost}
              onChange={(e) => {
                setCost(parseInt(e.target.value));
              }}
              type="number"
              min={1}
              placeholder="Total cost"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            />
          </div>
        </div>
        <StripeTestCards />
        <button
          className="checkout-style-background"
          type="submit"
          disabled={loading}
        >
          Top Up
        </button>
      </form>
    </div>
  );
}
