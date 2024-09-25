"use server";

import { sql } from "@vercel/postgres";

export default async function getHistory(project: string) {
  const response = await sql`SELECT * FROM history WHERE project = ${project};`;

  return response.rows;
}
