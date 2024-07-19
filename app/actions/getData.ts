"use server";
import { kv } from "@vercel/kv";
import scrapeData from "../utils/scrapeData";
import { StoredData } from "../types";

// refresh every 5 minutes
const REFRESH_INTERVAL = 1000 * 60 * 5;

async function refreshData({ now, project }: { now:Date, project: string }) {
  const data = await scrapeData({ project });
  const storedData:StoredData = {
    ...data,
    time: now.toISOString()
  }
  await kv.set(project, storedData);
  return data;
}

export default async function getData({ project }: { project: string }) {
  if (!project) throw Error("project is required");
  console.log("getData for project: ", project);

  const now = new Date();
  const storedData = await kv.get(project) as StoredData;

  if(!storedData) {
    console.log("  No stored data found");
    return await refreshData({ now, project });
  }

  const storedTime = new Date(storedData.time);
  const diffTime = now.valueOf() - storedTime.valueOf();
  console.log("  diffTime: ", diffTime);

  if(diffTime > REFRESH_INTERVAL) {
    console.log("  Data is older than 5 minutes");
    return await refreshData({ now, project });
  }

  console.log("  return existing data");
  const {time, ...data} = storedData;
  return data;
}
