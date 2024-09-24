import { sql } from "@vercel/postgres";
import scrapeData from "@/app/utils/scrapeData";
export const dynamic = "force-dynamic";

export const runtime = "nodejs";

const HISTORY_PROJECT = process.env.HISTORY_PROJECT;
console.log("HISTORY_PROJECT: ", HISTORY_PROJECT);

export async function GET() {
  if (!HISTORY_PROJECT) return;
  // Add caching layer...
  const data = await scrapeData({ project: HISTORY_PROJECT });

  const { funded } = data;
  console.log("funded: ", funded);
  await sql`INSERT INTO history (timestamp, funded) VALUES (NOW(), ${funded});`;
  console.log(`Recorded ${funded} at ${new Date()}`);
  const response = await sql`SELECT COUNT(*) AS row_count
FROM history;`;
  console.log("count response: ", response);
  return new Response(`Recorded ${funded} at ${new Date()}`);
}
//
