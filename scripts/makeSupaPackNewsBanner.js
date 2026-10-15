const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function run() {
  const width = 1200;
  const height = 750;

  // Supa Pack cutout
  const supaPack = await sharp('public/Product/hot-peppe-supa-pack.png')
    .resize({ height: 600, fit: 'inside' })
    .toBuffer({ resolveWithObject: true });

  // 1. Warm cream studio backdrop (matches retail-spice-range-launch-v2.jpg)
  const bgSvg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="grad" cx="50%" cy="46%" r="60%">
          <stop offset="0%" stop-color="#FAF4EB" />
          <stop offset="65%" stop-color="#F0E5D4" />
          <stop offset="100%" stop-color="#E5D7C2" />
        </radialGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#grad)" />
      <ellipse cx="${width / 2 + 10}" cy="${height / 2 + 270}" rx="240" ry="36" fill="rgba(30,15,5,0.18)" />
    </svg>
  `;

  const bgBuffer = await sharp(Buffer.from(bgSvg)).png().toBuffer();
  const left = Math.round((width - supaPack.info.width) / 2);
  const top = Math.round((height - supaPack.info.height) / 2) - 15;

  // Write directly to retail-spice-range-launch-v2.jpg and retail-spice-range-launch.jpg
  await sharp(bgBuffer)
    .composite([{ input: supaPack.data, left, top }])
    .jpeg({ quality: 94 })
    .toFile('public/img/news/retail-spice-range-launch-v2.jpg');

  await sharp(bgBuffer)
    .composite([{ input: supaPack.data, left, top }])
    .jpeg({ quality: 94 })
    .toFile('public/img/news/retail-spice-range-launch.jpg');

  // Also create a WebP version
  await sharp('public/img/news/retail-spice-range-launch-v2.jpg')
    .webp({ quality: 90 })
    .toFile('public/img/news/retail-spice-range-launch-v2.webp');

  console.log('Successfully generated retail-spice-range-launch-v2.jpg with Supa Pack!');
}

run().catch(console.error);
