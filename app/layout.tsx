import type { Metadata } from "next";

import Link from "next/link";

import "../styles.css";

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header>
            <div className="header-content">
              <h1>
                <span className="light">CV App</span>
                <br />
                Demo Stripe 🔒💸
              </h1>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
