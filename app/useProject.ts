import { useSearchParams } from "next/navigation";

const PARAM = "project";

export default function useProject() {
  const searchParams = useSearchParams();
  const project = searchParams.get(PARAM)
  return {project}
}
