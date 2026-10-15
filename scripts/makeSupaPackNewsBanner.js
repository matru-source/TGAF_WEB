const sharp = require('sharp');
const path = require('path');

async function run() {
  const width = 1200;
  const height = 750;

  // 1. Trim transparent padding from supa-pack cutout so the pack itself scales to full height
  const trimmedPouchBuffer = await sharp('public/Product/hot-peppe-supa-pack.png')
    .trim()
    .resize({ height: 680, fit: 'inside' })
    .toBuffer({ resolveWithObject: true });

  // 2. Exactly the same dark radial glow backdrop as Ose Di Oku
  const svgBackdrop = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stop-color="#4A180B" stop-opacity="1" />
          <stop offset="60%" stop-color="#230A04" stop-opacity="1" />
          <stop offset="100%" stop-color="#120401" stop-opacity="1" />
        </radialGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#glow)" />
    </svg>
  `);

  const backdrop = await sharp(svgBackdrop).png().toBuffer();

  const left = Math.round((width - trimmedPouchBuffer.info.width) / 2);
  const top = Math.round((height - trimmedPouchBuffer.info.height) / 2);

  // 3. Composite trimmed pouch in center of dark glow frame
  await sharp(backdrop)
    .composite([
      {
        input: trimmedPouchBuffer.data,
        left: left,
        top: top,
      },
    ])
    .jpeg({ quality: 94 })
    .toFile('public/img/news/retail-spice-range-launch-v2.jpg');

  await sharp(backdrop)
    .composite([
      {
        input: trimmedPouchBuffer.data,
        left: left,
        top: top,
      },
    ])
    .jpeg({ quality: 94 })
    .toFile('public/img/news/retail-spice-range-launch.jpg');

  // Also create optimized WebP
  await sharp('public/img/news/retail-spice-range-launch-v2.jpg')
    .webp({ quality: 90 })
    .toFile('public/img/news/retail-spice-range-launch-v2.webp');

  console.log('Successfully generated Supa Pack banner matching Ose Di Oku backdrop and scale!');
}

run().catch(console.error);
