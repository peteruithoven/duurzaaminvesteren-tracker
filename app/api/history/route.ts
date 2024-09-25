import { sql } from "@vercel/postgres";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const project = searchParams.get("project");
  console.log("project: ", project);
  if (!project) {
    return Response.json({ error: "No project specified" }, { status: 400 });
  }

  const response = await sql`SELECT * FROM history;`;

  return Response.json({ data: response.rows });
}
