import { readFileSync } from "node:fs";

const topics = ["portfolio", "etf-flows", "fund-flows", "policy", "macro", "sentiment", "ucits", "offices", "eltif"];

function fail(message) {
  console.error(message);
  process.exit(1);
}

const edition = JSON.parse(readFileSync("edition.json", "utf8"));
if (!/^\d{4}-\d{2}-\d{2}$/.test(edition.date)) fail("edition.date");
if (!edition.headline || !edition.deck || !edition.lede) fail("edition copy");
if (!Array.isArray(edition.stats) || edition.stats.length !== 4) fail("edition.stats");
if (!Array.isArray(edition.topics) || edition.topics.length !== topics.length) fail("edition.topics");
for (const id of topics) {
  const topic = edition.topics.find((item) => item.id === id);
  if (!topic) fail(`missing topic ${id}`);
  if (!Array.isArray(topic.paragraphs) || topic.paragraphs.length < 2) fail(`paragraphs ${id}`);
  if (!Array.isArray(topic.sources) || topic.sources.length < 2) fail(`sources ${id}`);
  for (const source of topic.sources) {
    if (!String(source.href).startsWith("https://")) fail(`href ${id}`);
  }
}

const desks = JSON.parse(readFileSync("desks.json", "utf8"));
for (const key of ["familyReports", "jpmAllocation", "allocationCompare", "eltifFacts", "privateFlows"]) {
  if (!Array.isArray(desks[key]) || desks[key].length < 1) fail(`desks.${key}`);
}
if (!Array.isArray(desks.etfWeeks) || desks.etfWeeks.length < 3) fail("desks.etfWeeks");
if (!Array.isArray(desks.combinedWeeks) || desks.combinedWeeks.length < 3) fail("desks.combinedWeeks");
if (!Array.isArray(desks.fundSplit) || desks.fundSplit.length < 3) fail("desks.fundSplit");
const weight = desks.jpmAllocation.reduce((sum, slice) => sum + Number(slice.weight), 0);
if (weight < 99 || weight > 101) fail(`jpm allocation sums to ${weight}`);
console.log(`ok ${edition.date}`);
