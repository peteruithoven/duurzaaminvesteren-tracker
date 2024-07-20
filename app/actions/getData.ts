"use server";
import { kv } from "@vercel/kv";
import scrapeData from "../utils/scrapeData";
import { DBData } from "../types";

// refresh every 5 minutes
const REFRESH_INTERVAL = 1000 * 60 * 5;

function shouldRefresh({ now, dbData }: { now: Date; dbData: DBData }) {
  if (!dbData) return true;

  const storedTime = new Date(dbData.time);
  const diffTime = now.valueOf() - storedTime.valueOf();
  console.log("  diffTime: ", diffTime);
  if (diffTime > REFRESH_INTERVAL) return true;

  return false;
}

export default async function getData({ project }: { project: string }) {
  if (!project) throw Error("project is required");
  console.log("getData for project: ", project);

  const now = new Date();
  const dbData = (await kv.get(project)) as DBData;

  if (shouldRefresh({ now, dbData })) {
    console.log("  refresh data");
    const data =
      project === "demo"
        ? {
            funded: dbData?.funded < 100000 ? dbData?.funded + 100 : 0,
          }
        : await scrapeData({ project });
    const newDBData: DBData = {
      ...data,
      time: now.toISOString(),
    };
    await kv.set(project, newDBData);
    return data;
  }

  console.log("  return existing data");
  const { time, ...data } = dbData;
  return data;
}
