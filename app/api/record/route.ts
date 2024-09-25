import { sql } from "@vercel/postgres";
import getData from "@/app/actions/getData";

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

  const data = await getData({ project });
  const { funded } = data;

  const result =
    await sql`INSERT INTO history (timestamp, funded, project) VALUES (NOW(), ${funded}, ${project}) RETURNING *;`;
  console.log("Inserted row:", result.rows[0]);

  return Response.json({ row: result.rows[0] });
}
