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

  return {
    funded: scrapeFunded($),
    minAmount: scrapeAmount(getMinStartElement($)),
    minProgress: scrapeProgress(getMinStartElement($)),
    minStrokeDasharray: scrapeStrokeDasharray(getMinStartElement($)),
    targetAmount: scrapeAmount(getTargetStartElement($)),
    targetProgress: scrapeProgress(getTargetStartElement($)),
    targetStrokeDasharray: scrapeStrokeDasharray(getTargetStartElement($)),
  };
}

function scrapeFunded($: cheerio.CheerioAPI): number {
  const dtElement = $("dt:contains('Tot nu toe geïnvesteerd')");
  const ddElement = dtElement.next();
  const fundedElement = ddElement.children().first();
  const fundedRaw = fundedElement.text();
  const funded = parseInt(fundedRaw.replace(/[^0-9]/g, ""));
  return funded;
}

function getMinStartElement($: cheerio.CheerioAPI) {
  return $(`dt:contains('Voortgang minimaal bedrag')`);
}

function getTargetStartElement($: cheerio.CheerioAPI) {
  return $(`dt:contains(' Voortgang streefbedrag')`);
}

function scrapeAmount(startElement: cheerio.Cheerio<cheerio.Element>): number {
  const valueRaw = startElement.next().text();
  const value = parseInt(valueRaw.replace(/[^0-9]/g, ""));
  return value;
}

function scrapeProgress(
  startElement: cheerio.Cheerio<cheerio.Element>,
): string {
  return startElement.prev().text().trim();
}

function scrapeStrokeDasharray(
  startElement: cheerio.Cheerio<cheerio.Element>,
): string {
  return (
    startElement
      .prev()
      .find("path[stroke-dasharray]")
      .attr("stroke-dasharray") || ""
  );
}
