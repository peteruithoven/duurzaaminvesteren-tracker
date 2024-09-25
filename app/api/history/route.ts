import toCsv from "@/app/utils/toCsv";
import { sql } from "@vercel/postgres";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const project = searchParams.get("project");
  const type = searchParams.get("type");
  console.log("project: ", project);
  if (!project) {
    return Response.json({ error: "No project specified" }, { status: 400 });
  }

  try {
    const response =
      await sql`SELECT * FROM history WHERE project = ${project};`;

    const data = response.rows;

    if (type === "csv") {
      const csvData = await toCsv(response.rows);
      return new Response(csvData, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="${project}.csv"`,
        },
      });
    } else {
      return Response.json({ data });
    }
  } catch (error) {
    console.log("error: ", error);
    return Response.json({ error: error }, { status: 400 });
  }
}
