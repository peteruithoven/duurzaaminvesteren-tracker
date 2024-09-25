"use server";

import { sql } from "@vercel/postgres";
import { HistoryItem } from "../types";

export default async function getHistory(project: string) {
  console.log("getHistory");
  const response = await sql`SELECT * FROM history WHERE project = ${project};`;

  console.log(" last response row: ", response.rows[response.rows.length - 1]);
  return response.rows as HistoryItem[];
}
