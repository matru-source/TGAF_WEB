const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function processImage() {
  const originalPath = 'D:/TGAF_WEB NEW/My assets/pictures/WhatsApp Image 2026-08-04 at 1.42.00 PM.jpeg';
  const outDir = 'd:/TGAF_WEB NEW/public/img/news';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // 1. Extract pouch from original image (top: 230 to 945)
  const pouchBuffer = await sharp(originalPath)
    .extract({ left: 0, top: 230, width: 540, height: 715 })
    .resize({ height: 680, fit: 'inside' })
    .png()
    .toBuffer();

  const pouchMeta = await sharp(pouchBuffer).metadata();

  // 2. Create 1200x750 (16:10) backdrop
  const svgBackdrop = Buffer.from(`
    <svg width="1200" height="750" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stop-color="#4A180B" stop-opacity="1" />
          <stop offset="60%" stop-color="#230A04" stop-opacity="1" />
          <stop offset="100%" stop-color="#120401" stop-opacity="1" />
        </radialGradient>
      </defs>
      <rect width="1200" height="750" fill="url(#glow)" />
    </svg>
  `);

  const backdrop = await sharp(svgBackdrop).png().toBuffer();

  const left = Math.round((1200 - pouchMeta.width) / 2);
  const top = Math.round((750 - pouchMeta.height) / 2);

  // Composite the pouch in the center of 16:10 frame
  await sharp(backdrop)
    .composite([
      {
        input: pouchBuffer,
        left: left,
        top: top
      }
    ])
    .jpeg({ quality: 92 })
    .toFile(path.join(outDir, 'ose-di-oku-launch.jpg'));

  // Also create a WebP version
  await sharp(path.join(outDir, 'ose-di-oku-launch.jpg'))
    .webp({ quality: 90 })
    .toFile(path.join(outDir, 'ose-di-oku-launch.webp'));

  // Also copy the direct pouch into public/img/news/ose-di-oku-pouch.png
  await sharp(pouchBuffer)
    .png()
    .toFile(path.join(outDir, 'ose-di-oku-pouch.png'));

  console.log('Successfully prepared ose-di-oku news images');
}

processImage().catch(console.error);
