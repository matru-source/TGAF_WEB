const sharp = require('sharp');
const path = require('path');

async function processPhotos() {
  const amitSrc = 'd:/TGAF_WEB NEW/My assets/Gen/Amit Gautam.png';
  const stellaSrc = 'd:/TGAF_WEB NEW/My assets/Gen/Ikpe, Stella.png';
  const outDir = 'd:/TGAF_WEB NEW/public/img/team';

  // 1. STELLA IKPE
  // Source is 1086 x 1448 with white background.
  // Pad horizontally to square (1478x1478) with top: 30, bottom: 0
  // Shirt reaches cleanly to bottom edge without any artificial gap, and hair has comfortable headroom
  await sharp(stellaSrc)
    .extend({
      top: 30,
      bottom: 0,
      left: Math.floor((1478 - 1086) / 2),
      right: Math.ceil((1478 - 1086) / 2),
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .resize(900, 900)
    .jpeg({ quality: 96 })
    .toFile(path.join(outDir, 'stella-ikpe.jpg'));

  // 2. AMIT GAUTAM
  // Source is 1086 x 1448. Head starts around y=90, chin around y=880, shirt down to y=1448.
  // Sample background edge color around Amit
  const amitImg = sharp(amitSrc);
  const { data: amitRaw, info: amitMeta } = await amitImg.raw().toBuffer({ resolveWithObject: true });
  // Average edge color
  let rSum = 0, gSum = 0, bSum = 0, count = 0;
  for (let y = 0; y < 200; y += 10) {
    const idxL = (y * amitMeta.width + 0) * 3;
    const idxR = (y * amitMeta.width + (amitMeta.width - 1)) * 3;
    rSum += amitRaw[idxL] + amitRaw[idxR];
    gSum += amitRaw[idxL + 1] + amitRaw[idxR + 1];
    bSum += amitRaw[idxL + 2] + amitRaw[idxR + 2];
    count += 2;
  }
  const avgR = Math.round(rSum / count);
  const avgG = Math.round(gSum / count);
  const avgB = Math.round(bSum / count);

  console.log('Amit background avg color:', avgR, avgG, avgB);

  // Extend Amit to square canvas (1528x1528) with slight headroom so shoulders and collar are visible
  await sharp(amitSrc)
    .extend({
      top: 50,
      bottom: 30,
      left: Math.floor((1528 - 1086) / 2),
      right: Math.ceil((1528 - 1086) / 2),
      background: { r: avgR, g: avgG, b: avgB, alpha: 1 }
    })
    .resize(900, 900)
    .jpeg({ quality: 96 })
    .toFile(path.join(outDir, 'amit-gautam.jpg'));

  console.log('Successfully updated stella-ikpe.jpg and amit-gautam.jpg with optimal professional framing.');
}

processPhotos().catch(err => {
  console.error(err);
  process.exit(1);
});
