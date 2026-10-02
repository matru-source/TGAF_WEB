const sharp = require('sharp');

async function makeNewsBanner() {
  const width = 1200;
  const height = 750;

  // Resize hot-peppe sachet to fit nicely within height ~ 600px
  const sachet = await sharp('public/Product/hero-hot-peppe-studio.png')
    .resize({ height: 600, fit: 'inside' })
    .toBuffer({ resolveWithObject: true });

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
      <ellipse cx="${width / 2 + 15}" cy="${height / 2 + 270}" rx="230" ry="32" fill="rgba(30,15,5,0.14)" />
    </svg>
  `;

  const bgBuffer = await sharp(Buffer.from(bgSvg)).png().toBuffer();

  const left = Math.round((width - sachet.info.width) / 2);
  const top = Math.round((height - sachet.info.height) / 2) - 15;

  await sharp(bgBuffer)
    .composite([
      { input: sachet.data, left, top }
    ])
    .jpeg({ quality: 94 })
    .toFile('public/img/news/retail-spice-range-launch.jpg');

  console.log('Successfully created public/img/news/retail-spice-range-launch.jpg!');
}

makeNewsBanner().catch(console.error);
