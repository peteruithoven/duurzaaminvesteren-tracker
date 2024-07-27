import { ReactNode } from "react";

export default function CustomToast({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-2 rounded-lg bg-green-700 p-4 text-white shadow-lg">
      {children}
    </div>
  );
}
