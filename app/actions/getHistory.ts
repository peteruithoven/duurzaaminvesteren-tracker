"use server";

import { sql } from "@vercel/postgres";
import { HistoryItem } from "../types";

export default async function getHistory(project: string) {
  const response = await sql`SELECT * FROM history WHERE project = ${project};`;

  return response.rows as HistoryItem[];
}
