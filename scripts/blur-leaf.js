const sharp = require('sharp');
const path = require('path');

async function createSoftBlurredLeaf() {
  const inputPath = path.join(__dirname, '../public/img/home-sec-2-backup.png');
  const outputPath = path.join(__dirname, '../public/img/home-sec-2.png');

  const metadata = await sharp(inputPath).metadata();
  const { width, height } = metadata;

  // Center of overlapping leaf is around x=1385, y=605
  // We composite a soft feathered cream blur vignette over that exact region
  const svgOverlay = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="leafBlurGrad" cx="72%" cy="73%" r="16%" fx="70%" fy="73%">
          <stop offset="0%" stop-color="#FAF4EB" stop-opacity="0.98" />
          <stop offset="50%" stop-color="#FAF4EB" stop-opacity="0.85" />
          <stop offset="78%" stop-color="#FAF4EB" stop-opacity="0.45" />
          <stop offset="100%" stop-color="#FAF4EB" stop-opacity="0" />
        </radialGradient>
        <filter id="featherBlur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>
      <!-- Soft feathered oval seamlessly dissolving the overlapping leaf into the cream canvas -->
      <ellipse cx="1390" cy="610" rx="130" ry="110" fill="url(#leafBlurGrad)" filter="url(#featherBlur)" />
      <ellipse cx="1350" cy="610" rx="85" ry="90" fill="#FAF4EB" opacity="0.92" filter="url(#featherBlur)" />
    </svg>
  `);

  await sharp(inputPath)
    .composite([{ input: svgOverlay, top: 0, left: 0 }])
    .png({ quality: 95 })
    .toFile(outputPath);

  console.log('Successfully blurred overlapping leaf with wide feather in home-sec-2.png');
}

createSoftBlurredLeaf().catch(err => {
  console.error(err);
  process.exit(1);
});
