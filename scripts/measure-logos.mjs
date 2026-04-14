/**
 * Measures logo dimensions and pixel density for PINF + density compensation.
 * Run once when logos change: node scripts/measure-logos.mjs
 *
 * Based on the algorithm from sanity.io/blog/the-logo-soup-problem:
 *  1. Content detection — find actual logo bounds, ignore padding
 *  2. Density — ratio of filled pixels to total area
 *
 * Output: JSON suitable for pasting into the homepage frontmatter.
 */

import sharp from "sharp";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const LOGOS_DIR = "public/logos";
const ANALYSIS_SIZE = 64; // downscale to this for fast pixel analysis

async function measureLogo(filePath) {
  // Render to raw RGBA at a small size for fast analysis
  const { data, info } = await sharp(filePath)
    .resize(ANALYSIS_SIZE, ANALYSIS_SIZE, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = info.width * info.height;
  let filled = 0;
  let totalAlpha = 0;

  // Content bounding box
  let minX = info.width, maxX = 0, minY = info.height, maxY = 0;

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * 4;
      const alpha = data[i + 3];
      if (alpha > 10) {
        filled++;
        totalAlpha += alpha;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const avgAlpha = filled > 0 ? totalAlpha / (filled * 255) : 0;
  const density = (filled / pixels) * avgAlpha;

  // Content dimensions (from bounding box)
  const contentW = maxX - minX + 1;
  const contentH = maxY - minY + 1;
  const ratio = contentW / contentH;

  // Original dimensions for reference
  const meta = await sharp(filePath).metadata();

  return {
    file: filePath.replace(LOGOS_DIR + "/", ""),
    original: `${meta.width}x${meta.height}`,
    contentRatio: Math.round(ratio * 100) / 100,
    density: Math.round(density * 1000) / 1000,
    filled: `${Math.round((filled / pixels) * 100)}%`,
  };
}

const files = readdirSync(LOGOS_DIR).filter(
  (f) => f.endsWith(".png") || f.endsWith(".svg") || f.endsWith(".webp")
);

const results = await Promise.all(
  files.map((f) => measureLogo(join(LOGOS_DIR, f)))
);

// Split into client logos and award badges
const awards = results.filter((r) =>
  ["red-dot", "if-design", "german-design", "european-design", "good-design", "awwwards", "ecommerce"].some((a) =>
    r.file.includes(a)
  )
);
const clients = results.filter((r) => !awards.includes(r));

console.log("\n=== AWARD BADGES ===");
console.table(awards);
console.log("\n=== CLIENT LOGOS ===");
console.table(clients);

// Output as a TypeScript-ready map
console.log("\n// Paste into homepage frontmatter:");
console.log("const logoDensity: Record<string, { w: number; h: number; d: number }> = {");
for (const r of results) {
  const [w, h] = r.original.split("x").map(Number);
  console.log(`  "/logos/${r.file}": { w: ${w || "?"}, h: ${h || "?"}, d: ${r.density} },`);
}
console.log("};");
