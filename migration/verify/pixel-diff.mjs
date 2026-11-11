import { promises as fs } from 'node:fs';
import path from 'node:path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { projectRoot, readBaseline } from '../../scripts/lib/baseline.mjs';

const verify = path.join(projectRoot, 'migration/verify');
const suffix = process.env.VERIFY_SUFFIX || '';
const log = path.join(verify, `pixel-results${suffix}.log`);
await fs.writeFile(log, '');
for (const width of [360, 768, 1440]) for (const page of await readBaseline()) {
  const relative = page.relative.replace(/\.html$/, '.png');
  const oldFile = path.join(verify, `screenshots-old${suffix}`, String(width), relative);
  const newFile = path.join(verify, `screenshots-new${suffix}`, String(width), relative);
  const old = PNG.sync.read(await fs.readFile(oldFile));
  const newer = PNG.sync.read(await fs.readFile(newFile));
  const canvasWidth = Math.max(old.width, newer.width), height = Math.max(old.height, newer.height);
  const a = new PNG({ width: canvasWidth, height }), b = new PNG({ width: canvasWidth, height });
  a.data.fill(255); b.data.fill(255);
  PNG.bitblt(old, a, 0, 0, old.width, old.height, 0, 0);
  PNG.bitblt(newer, b, 0, 0, newer.width, newer.height, 0, 0);
  const diff = new PNG({ width: canvasWidth, height });
  const pixels = pixelmatch(a.data, b.data, diff.data, canvasWidth, height, { threshold: 0.1, includeAA: true, diffMask: true });
  let exactPixels = 0, left = canvasWidth, right = -1, top = height, bottom = -1;
  const bands = new Map();
  for (let i = 0; i < a.data.length; i += 4) {
    if (a.data[i] !== b.data[i] || a.data[i + 1] !== b.data[i + 1] || a.data[i + 2] !== b.data[i + 2] || a.data[i + 3] !== b.data[i + 3]) exactPixels++;
    if (!diff.data[i + 3]) continue;
    const pixel = i / 4, y = Math.floor(pixel / canvasWidth), x = pixel % canvasWidth;
    left = Math.min(left, x); right = Math.max(right, x); top = Math.min(top, y); bottom = Math.max(bottom, y);
    const band = Math.floor(y / 900); bands.set(band, (bands.get(band) || 0) + 1);
  }
  const output = path.join(verify, `diffs${suffix}`, String(width), relative);
  await fs.mkdir(path.dirname(output), { recursive: true });
  await fs.writeFile(output, PNG.sync.write(diff));
  const result = { route: page.route, width, oldHeight: old.height, newHeight: newer.height, canvasWidth, canvasHeight: height, pixels, exactPixels, total: canvasWidth * height, percent: pixels / (canvasWidth * height) * 100, exactPercent: exactPixels / (canvasWidth * height) * 100, flagged: pixels / (canvasWidth * height) > .001, boundingBox: pixels ? { left, top, right, bottom } : null, bands: [...bands].sort((a, b) => b[1] - a[1]).slice(0, 5), diff: path.relative(projectRoot, output) };
  await fs.appendFile(log, JSON.stringify(result) + '\n');
  console.log(width, page.route, result.percent.toFixed(6) + '%', `${old.height}->${newer.height}`, result.flagged ? 'FLAG' : '');
}
