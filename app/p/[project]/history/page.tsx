import getHistory from "@/app/actions/getHistory";
import ClientPage from "./page.client";

export default async function Page({
  params,
}: {
  params: { project: string };
}) {
  const data = await getHistory(params.project);

  return <ClientPage data={data} />;
}
