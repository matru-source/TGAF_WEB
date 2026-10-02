const sharp = require('sharp');

async function createDarkBanner() {
  const width = 1200;
  const height = 750;

  // Hot Peppe sachet resized to height ~580px
  const sachet = await sharp('public/Product/hero-hot-peppe-studio.png')
    .resize({ height: 580, fit: 'inside' })
    .toBuffer({ resolveWithObject: true });

  const bgSvg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="spotlight" cx="50%" cy="48%" r="55%">
          <stop offset="0%" stop-color="#30150d" />
          <stop offset="45%" stop-color="#1c0c07" />
          <stop offset="85%" stop-color="#110502" />
          <stop offset="100%" stop-color="#0a0301" />
        </radialGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#spotlight)" />
      <ellipse cx="${width / 2 + 10}" cy="${height / 2 + 265}" rx="240" ry="38" fill="rgba(0,0,0,0.6)" />
    </svg>
  `;

  const bgBuffer = await sharp(Buffer.from(bgSvg)).png().toBuffer();

  const left = Math.round((width - sachet.info.width) / 2);
  const top = Math.round((height - sachet.info.height) / 2) - 15;

  await sharp(bgBuffer)
    .composite([
      { input: sachet.data, left, top }
    ])
    .jpeg({ quality: 95 })
    .toFile('public/img/news/retail-spice-range-dark.jpg');

  console.log('Created dark banner test');
}

createDarkBanner().catch(console.error);
