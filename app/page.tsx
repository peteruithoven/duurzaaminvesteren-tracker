import { Suspense } from "react";
import ClientPage from "./page.client";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white p-24 pb-10 text-gray-800">
      <Suspense>
        <ClientPage />
      </Suspense>
      <Toaster />
    </main>
  );
}
