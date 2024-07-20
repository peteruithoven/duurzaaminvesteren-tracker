import { Suspense } from "react";
import ClientPage from "./page.client";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-green-100 p-12 text-green-700 antialiased lg:p-24">
      <div className="shadow-3xl flex flex-wrap gap-2 rounded-lg bg-white p-4">
        <Suspense>
          <ClientPage />
        </Suspense>
      </div>
      <Toaster />
    </main>
  );
}
