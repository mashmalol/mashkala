#!/usr/bin/env node
/**
 * Imports the second wave of product photos (the art-can collection).
 *
 * Usage:
 *   node scripts/import-new-batch.mjs [source-folder] [output-folder]
 *
 * The mapping from source filename to catalogue id lives in
 * `scripts/new-product-map.json`, so order changes in the source folder are
 * harmless. Missing files are skipped with a warning.
 */
import { readFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const [, , sourceArg = "products", outArg = "public/images/products"] = process.argv;
const map = JSON.parse(await readFile("scripts/new-product-map.json", "utf8"));

await mkdir(outArg, { recursive: true });
let imported = 0;
const missing = [];

for (const { file, id } of map) {
  const source = path.join(sourceArg, file);
  if (!existsSync(source)) {
    missing.push(file);
    continue;
  }
  await sharp(source)
    .resize(780, 1170, { fit: "contain", background: "#f0f0f0" })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(outArg, `${id}.jpg`));
  imported++;
}

console.log(`Imported ${imported}/${map.length} images into ${outArg}.`);
if (missing.length) console.warn(`Missing sources: ${missing.join(", ")}`);
