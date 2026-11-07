import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "app/Ui visuals/images";
const DST = "public/images";

await mkdir(`${DST}/categories`, { recursive: true });
await mkdir(`${DST}/why-us`, { recursive: true });
await mkdir(`${DST}/blog`, { recursive: true });

/** Removes the baked-in AI "transparency checkerboard" and trims to content. */
async function transparent(src) {
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    if (mx - mn < 14) {
      const a = Math.min(1, Math.max(0, (200 - lum) / 20));
      if (a < 1) data[i + 3] = Math.round((data[i + 3] / 255) * a * 255);
    }
  }
  let minX = width, minY = height, maxX = -1, maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] > 10) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  const pad = 6;
  const left = Math.max(0, minX - pad);
  const top = Math.max(0, minY - pad);
  const w = Math.min(width - left, maxX - minX + 1 + pad * 2);
  const h = Math.min(height - top, maxY - minY + 1 + pad * 2);
  return sharp(data, { raw: { width, height, channels: 4 } })
    .extract({ left, top, width: w, height: h })
    .png()
    .toBuffer();
}

async function icon(src, out, size = 256) {
  const trimmed = await transparent(src);
  await sharp(trimmed)
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9 })
    .toFile(out);
  return sharp(out).metadata();
}

// --- Logo / app icon ------------------------------------------------------
const logoTrimmed = await transparent(`${SRC}/logo.png`);

await sharp(logoTrimmed)
  .resize({ height: 220 })
  .png({ compressionLevel: 9 })
  .toFile(`${DST}/logo.png`);

// Square medallion crop for the small header/favicon slots, where the tall
// full lockup would shrink to an illegible sliver.
const logoMeta = await sharp(logoTrimmed).metadata();
const markSide = Math.min(logoMeta.width, logoMeta.height);
const markTop = Math.max(0, Math.round((logoMeta.height - markSide) / 2));
const logoMark = await sharp(logoTrimmed)
  .extract({ left: 0, top: markTop, width: markSide, height: markSide })
  .png()
  .toBuffer();

await sharp(logoMark)
  .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile(`${DST}/logo-mark.png`);

await sharp(logoMark)
  .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile(`${DST}/icon.png`);

// --- Trust badge ----------------------------------------------------------
const badge = await transparent(`${SRC}/e-namad.png`);
await sharp(badge).resize({ height: 600 }).png({ compressionLevel: 9 }).toFile(`${DST}/e-namad.png`);

// --- Why-us icons ---------------------------------------------------------
for (const id of ["shipping", "authenticity", "secure-payment", "support"]) {
  await icon(`${SRC}/why-us/${id}.png`, `${DST}/why-us/${id}.png`, 256);
}

// --- Header frieze --------------------------------------------------------
await sharp(`${SRC}/banner-header.jpg`)
  .extract({ left: 0, top: Math.round((784 - 74) / 2), width: 1168, height: 74 })
  .resize(1920, 96, { fit: "fill" })
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(`${DST}/banner-header.jpg`);

// --- Promo banners --------------------------------------------------------
for (const id of ["promo-1", "promo-2"]) {
  await sharp(`${SRC}/${id}.jpg`)
    .resize(1400, 940, { fit: "cover" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`${DST}/${id}.jpg`);
}

// --- Festival tile (square centre crop) -----------------------------------
await sharp(`${SRC}/festival-tile.jpg`)
  .extract({ left: 0, top: 250, width: 784, height: 784 })
  .resize(600, 600)
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(`${DST}/festival-tile.jpg`);

// --- Category tiles (square crops, keep can + plinth) ---------------------
for (const id of ["classic", "fruit", "cola", "citrus", "art", "gift"]) {
  await sharp(`${SRC}/categories/${id}.jpg`)
    .extract({ left: 0, top: 240, width: 784, height: 784 })
    .resize(600, 600)
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(`${DST}/categories/${id}.jpg`);
}

// --- Blog thumbnails ------------------------------------------------------
for (const id of ["party-guide", "can-collecting", "summer-flavors"]) {
  await sharp(`${SRC}/blog/${id}.jpg`)
    .resize(1200, 800, { fit: "cover" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`${DST}/blog/${id}.jpg`);
}

// --- Open Graph image -----------------------------------------------------
await sharp(`${SRC}/og.jpg`)
  .extract({ left: 0, top: 78, width: 1168, height: 613 })
  .resize(1200, 630)
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(`${DST}/og.jpg`);

const show = async (f) => {
  const m = await sharp(f).metadata();
  console.log(f.padEnd(42), `${m.width}x${m.height}`, m.format, m.hasAlpha ? "alpha" : "");
};
for (const f of [
  "public/images/logo.png",
  "public/images/icon.png",
  "public/images/e-namad.png",
  "public/images/why-us/shipping.png",
  "public/images/banner-header.jpg",
  "public/images/promo-1.jpg",
  "public/images/promo-2.jpg",
  "public/images/festival-tile.jpg",
  "public/images/categories/classic.jpg",
  "public/images/blog/party-guide.jpg",
  "public/images/og.jpg",
]) await show(f);
