"use server";
import * as cheerio from "cheerio";

export default async function getData({ project }: { project: string }) {
  if (!project) throw Error("project is required");
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
