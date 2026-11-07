#!/usr/bin/env node
/**
 * Imports the 29 real can photos into `public/images/products/`.
 *
 * Usage:
 *   node scripts/import-product-images.mjs <source-folder> [output-folder]
 *
 * The source folder must contain exactly 29 image files. They are matched to
 * the catalogue by natural filename order (01.png, 02.png, … or any names that
 * sort the same way the cans were supplied). Matching is by order only, so if
 * your files are named arbitrarily, rename them 01..29 first.
 */

import { readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

/** Catalogue ids in the same order as the supplied product photos. */
const IDS = [
  "limoo",
  "nove",
  "atash",
  "shole",
  "alale",
  "firooze",
  "shaghayegh",
  "arghavan",
  "tala",
  "sabz",
  "sorkh",
  "abi",
  "siah",
  "khande",
  "golshan",
  "sepid",
  "azar",
  "aftab",
  "nasim-classic",
  "yaghut",
  "zarin",
  "samsin",
  "behshinam",
  "khorshid",
  "baran",
  "golbarg",
  "nasim-taze",
  "shabnam",
  "bahar",
];

const IMAGE_RE = /\.(png|jpe?g|webp)$/i;
const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });

const [, , sourceArg, outArg = "public/images/products"] = process.argv;

if (!sourceArg) {
  console.error(
    "Usage: node scripts/import-product-images.mjs <source-folder> [output-folder]",
  );
  process.exit(1);
}

const files = (await readdir(sourceArg))
  .filter((name) => IMAGE_RE.test(name))
  .sort(collator.compare);

if (files.length !== IDS.length) {
  console.error(
    `Expected ${IDS.length} images in ${sourceArg}, found ${files.length}: ${files.join(", ")}`,
  );
  process.exit(1);
}

await mkdir(outArg, { recursive: true });

for (const [index, id] of IDS.entries()) {
  const source = path.join(sourceArg, files[index]);
  const target = path.join(outArg, `${id}.png`);
  const buffer = await sharp(source)
    .resize(780, 1170, { fit: "contain", background: "#f0f0f0" })
    .png({ quality: 90 })
    .toBuffer();
  await writeFile(target, buffer);
  console.log(`${files[index]} -> ${target}`);
}

console.log(`\nImported ${IDS.length} product images into ${outArg}.`);
