import { useSearchParams } from "next/navigation";

const KEY = "minimal";

export default function useMinimal() {
  const searchParams = useSearchParams();
  const value = searchParams.get(KEY);
  console.log("value: ", value);
  return value === "" || value === "true";
}
