import { sql } from "@vercel/postgres";
import scrapeData from "@/app/utils/scrapeData";
export const dynamic = "force-dynamic";

export const runtime = "nodejs";

const HISTORY_PROJECT = process.env.HISTORY_PROJECT;
console.log("HISTORY_PROJECT: ", HISTORY_PROJECT);

export async function GET() {
  if (!HISTORY_PROJECT) return;
  const data = await scrapeData({ project: HISTORY_PROJECT });

  const { funded } = data;
  console.log("funded: ", funded);
  await sql`INSERT INTO history (timestamp, funded) VALUES (NOW(), ${funded});`;
  return new Response(`Recorded ${funded} at ${new Date()}`);
}
//
