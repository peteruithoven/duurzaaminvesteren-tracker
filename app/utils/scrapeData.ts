"use server";
import * as cheerio from "cheerio";
import { Data } from "../types";

export default async function scrapeData({
  project,
}: {
  project: string;
}): Promise<Data> {
  console.log("scrapeData for project", project);
  const url = `https://www.duurzaaminvesteren.nl/projecten/${project}`;
  const response = await fetch(url);
  const body = await response.text();

  const $ = cheerio.load(body);

  const dtElement = $("dt:contains('Tot nu toe geïnvesteerd')");
  const ddElement = dtElement.next();
  const fundedElement = ddElement.children().first();
  const fundedRaw = fundedElement.text();
  const funded = parseInt(fundedRaw.replace(/[^0-9]/g, ""));
  return {
    funded,
  };
}
