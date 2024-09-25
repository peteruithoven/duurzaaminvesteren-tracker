import { sql } from "@vercel/postgres";
import scrapeData from "@/app/utils/scrapeData";
export const dynamic = "force-dynamic";

export const runtime = "nodejs";
export const revalidate = 0;

const project = process.env.HISTORY_PROJECT;
console.log("project: ", project);

export async function GET() {
  if (!project) return;
  // TODO Add caching layer...
  const data = await scrapeData({ project });
  const { funded } = data;

  const result =
    await sql`INSERT INTO history (timestamp, funded, project) VALUES (NOW(), ${funded}, ${project}) RETURNING *;`;
  console.log("Inserted row:", result.rows[0]);

  return Response.json({ row: result.rows[0] });
}
//
