import { useSearchParams } from "next/navigation";

const KEY = "minimal";

export default function useMinimal() {
  const searchParams = useSearchParams();
  const value = searchParams.get(KEY);
  return value === "" || value === "true";
}
