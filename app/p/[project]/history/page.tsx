import getHistory from "@/app/actions/getHistory";
import ClientPage from "./page.client";

export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export default async function Page({
  params,
}: {
  params: { project: string };
}) {
  console.log("HistoryPage");
  const data = await getHistory(params.project);

  return <ClientPage data={data} />;
}
