import { Analytics } from "@vercel/analytics/react";
import { Montserrat } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const font = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

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
      <body className={[font.variable, "font-sans"].join(" ")}>
        <main className="flex min-h-screen flex-col items-center bg-green-100 p-12 text-green-700 antialiased lg:p-24">
          <div className="flex flex-wrap gap-2 rounded-lg bg-white p-4 shadow-3xl">
            {children}
          </div>
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 1000 * 60,
            }}
          />
        </main>
        <Analytics />
      </body>
    </html>
  );
}
