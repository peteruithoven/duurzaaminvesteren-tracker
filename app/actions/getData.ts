"use server";
import scrapeData from "../utils/scrapeData";
import { Data, DBData } from "../types";
import formatPercentage from "../utils/formatPercentage";
import redis from "../redis";

// refresh every 5 minutes
const REFRESH_INTERVAL = 1000 * 60 * 5;
// refresh every 5 minutes for demo
const REFRESH_INTERVAL_DEMO = 1000 * 60 * 5;

// const localDB: Record<string, DBData> = {};

function shouldRefresh({
  now,
  dbData,
  isDemo,
}: {
  now: Date;
  dbData: DBData;
  isDemo: boolean;
}) {
  if (!dbData || Object.keys(dbData).length === 0) return true;

  const storedTime = new Date(dbData.time);
  const diffTime = now.valueOf() - storedTime.valueOf();
  console.log("  diffTime: ", diffTime);
  const refreshInterval = isDemo ? REFRESH_INTERVAL_DEMO : REFRESH_INTERVAL;
  if (diffTime > refreshInterval) return true;

  return false;
}

export default async function getData({ project }: { project: string }) {
  if (!project) throw Error("project is required");
  console.log("getData for project: ", project);

  if (!redis.isOpen) await redis.connect();

  const now = new Date();
  // console.log("has localDB[project]: ", localDB[project] ? "yes" : "no");
  // const dbData = localDB[project] || ((await kv.get(project)) as DBData);
  // @ts-ignore
  const dbData = (await redis.hGetAll(project)) as DBData;
  // localDB[project] = dbData;
  const isDemo = project === "demo";

  if (shouldRefresh({ now, dbData, isDemo })) {
    console.log("  refresh data");
    const data = isDemo ? getDemoData(dbData) : await scrapeData({ project });
    const newDBData: DBData = {
      ...data,
      time: now.toISOString(),
    };
    // localDB[project] = newDBData;
    // await kv.set(project, newDBData);
    await redis.hSet(project, newDBData);
    return data;
  }

  console.log("  return existing data");
  const { time, ...data } = dbData;
  return data;
}

function getDemoData({ funded = 0 }: { funded: number }): Data {
  const newFunded = funded < 100000 ? funded + 100 : 0;
  const minAmount = 25000;
  const minProgress = Math.min(newFunded / minAmount, 1);
  const targetAmount = 100000;
  const targetProgress = Math.min(newFunded / targetAmount, 1);
  return {
    funded: newFunded,
    timeLeft:
      "Nog maximaal <strong>1 dag</strong> en <strong>7 uur</strong> om te investeren!",
    minAmount,
    minProgress: formatPercentage(minProgress),
    minStrokeDasharray: getDemoStrokeDasharray(minProgress),
    targetAmount,
    targetProgress: formatPercentage(targetProgress),
    targetStrokeDasharray: getDemoStrokeDasharray(targetProgress),
  };
}

function getDemoStrokeDasharray(percentage: number) {
  const total = 216.77;
  const start = total * percentage;
  return `${start} ${total}`;
}
