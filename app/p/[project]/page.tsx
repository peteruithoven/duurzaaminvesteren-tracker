import ClientPage from "./page.client";

export default function Page({ params }: { params: { project: string } }) {
  return <ClientPage project={params.project} />;
}
