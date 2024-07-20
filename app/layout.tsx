import { Analytics } from "@vercel/analytics/react";
import { Montserrat } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const font = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Duurzaaminvesteren.nl tracker",
  description: "Keep an eye on your project on Duurzaaminvesteren.nl",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
