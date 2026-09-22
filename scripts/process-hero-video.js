const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const SOURCE_VIDEO = 'D:/TGAF_WEB NEW/My assets/Gen/video/BLUE BG VID.mp4';
const POSTER_OUTPUT = path.join(__dirname, '../public/img/hero-chili-plant-poster.png');
const WEBM_OUTPUT = path.join(__dirname, '../public/video/hero-chili-plant.webm');
const MP4_OUTPUT = path.join(__dirname, '../public/video/hero-chili-plant.mp4');

const WIDTH = 880;
const HEIGHT = 720;
const FPS = 30;

// Natural cycle: from 0.55s to 8.25s (7.7s natural forward sway)
const START_TIME = '00:00:00.55';
const END_TIME = '00:00:08.25';
// 24 frames overlap (0.8s smooth micro-dissolve between matching positions)
const OVERLAP_FRAMES = 24;

const T_LOW = 15;
const T_HIGH = 45;

const FRAME_BYTES_IN = WIDTH * HEIGHT * 3;
const FRAME_BYTES_OUT = WIDTH * HEIGHT * 4;

const rawAlpha = new Uint8Array(WIDTH * HEIGHT);
const erodedAlpha = new Uint8Array(WIDTH * HEIGHT);

function processFrameBuffer(rawRgb, outRgba) {
  for (let i = 0; i < WIDTH * HEIGHT; i++) {
    const sIdx = i * 3;
    const r = rawRgb[sIdx];
    const g = rawRgb[sIdx + 1];
    const b = rawRgb[sIdx + 2];

    const maxRG = Math.max(r, g);
    const diff = b - maxRG;

    if (diff >= T_HIGH) {
      rawAlpha[i] = 0;
    } else if (diff <= T_LOW) {
      rawAlpha[i] = 255;
    } else {
      const t = (diff - T_LOW) / (T_HIGH - T_LOW);
      rawAlpha[i] = Math.round(255 * (1 - t * t * (3 - 2 * t)));
    }
  }

  for (let y = 0; y < HEIGHT; y++) {
    const rowOffset = y * WIDTH;
    for (let x = 0; x < WIDTH; x++) {
      const idx = rowOffset + x;
      let minA = rawAlpha[idx];
      if (x > 0 && rawAlpha[idx - 1] < minA) minA = rawAlpha[idx - 1];
      if (x < WIDTH - 1 && rawAlpha[idx + 1] < minA) minA = rawAlpha[idx + 1];
      if (y > 0 && rawAlpha[idx - WIDTH] < minA) minA = rawAlpha[idx - WIDTH];
      if (y < HEIGHT - 1 && rawAlpha[idx + WIDTH] < minA) minA = rawAlpha[idx + WIDTH];
      erodedAlpha[idx] = minA;
    }
  }

  for (let i = 0; i < WIDTH * HEIGHT; i++) {
    const sIdx = i * 3;
    const dIdx = i * 4;

    let r = rawRgb[sIdx];
    let g = rawRgb[sIdx + 1];
    let b = rawRgb[sIdx + 2];
    const a = erodedAlpha[i];

    const isFlower = (r > 160 && g > 160 && Math.abs(r - g) < 40 && b > 130);

    if (!isFlower) {
      if (g > r) {
        const maxAllowedBlue = Math.round(0.48 * g + 0.20 * r);
        if (b > maxAllowedBlue) b = maxAllowedBlue;
      } else {
        const maxAllowedBlue = Math.round(0.45 * r);
        if (b > maxAllowedBlue) b = maxAllowedBlue;
      }
    } else {
      const maxRG = Math.max(r, g);
      if (b > maxRG) b = maxRG;
    }

    outRgba[dIdx] = r;
    outRgba[dIdx + 1] = g;
    outRgba[dIdx + 2] = b;
    outRgba[dIdx + 3] = a;
  }
}

async function generateAll() {
  console.log('Decoding forward frames with optical flow at 30fps...');
  const ffmpegIn = spawn('ffmpeg', [
    '-v', 'error',
    '-ss', START_TIME,
    '-to', END_TIME,
    '-i', SOURCE_VIDEO,
    '-vf', `crop=${WIDTH}:${HEIGHT}:400:0,minterpolate=fps=${FPS}:mi_mode=mci:mc_mode=aobmc:me_mode=bidir`,
    '-f', 'rawvideo',
    '-pix_fmt', 'rgb24',
    '-'
  ]);

  let inBuffer = Buffer.alloc(0);
  const rawFrames = [];

  ffmpegIn.stdout.on('data', chunk => {
    inBuffer = Buffer.concat([inBuffer, chunk]);
    while (inBuffer.length >= FRAME_BYTES_IN) {
      rawFrames.push(Buffer.from(inBuffer.subarray(0, FRAME_BYTES_IN)));
      inBuffer = inBuffer.subarray(FRAME_BYTES_IN);
    }
  });

  await new Promise((resolve, reject) => {
    ffmpegIn.on('close', code => code === 0 ? resolve() : reject(new Error(`Input decode failed ${code}`)));
  });

  console.log(`Read ${rawFrames.length} forward frames. Processing seamless crossfade loop...`);

  // Build seamless loop:
  // The tail frames (last OVERLAP_FRAMES) crossfade into the head frames (first OVERLAP_FRAMES)
  const totalOut = rawFrames.length - OVERLAP_FRAMES;
  const processedRgbaFrames = [];

  for (let i = 0; i < totalOut; i++) {
    let currentRaw;
    if (i < totalOut - OVERLAP_FRAMES) {
      currentRaw = rawFrames[i];
    } else {
      const transIdx = i - (totalOut - OVERLAP_FRAMES);
      const progress = (transIdx + 1) / OVERLAP_FRAMES;
      const blend = progress * progress * (3 - 2 * progress); // smooth Hermite

      const head = rawFrames[transIdx];
      const tail = rawFrames[rawFrames.length - OVERLAP_FRAMES + transIdx];

      const blended = Buffer.alloc(FRAME_BYTES_IN);
      for (let j = 0; j < FRAME_BYTES_IN; j++) {
        blended[j] = Math.round(tail[j] * (1 - blend) + head[j] * blend);
      }
      currentRaw = blended;
    }

    const outRgba = Buffer.alloc(FRAME_BYTES_OUT);
    processFrameBuffer(currentRaw, outRgba);
    processedRgbaFrames.push(outRgba);
  }

  console.log(`Total output frames to encode: ${processedRgbaFrames.length} (~${(processedRgbaFrames.length / FPS).toFixed(1)}s)`);

  // 1. Poster from Frame 0
  console.log('Saving poster image...');
  await sharp(processedRgbaFrames[0], { raw: { width: WIDTH, height: HEIGHT, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(POSTER_OUTPUT);
  console.log('Poster saved:', POSTER_OUTPUT);

  // 2. Encode WebM VP9 with native alpha
  console.log('Encoding WebM VP9...');
  await new Promise((resolve, reject) => {
    const ffmpegWebM = spawn('ffmpeg', [
      '-v', 'error',
      '-f', 'rawvideo',
      '-pix_fmt', 'rgba',
      '-s', `${WIDTH}x${HEIGHT}`,
      '-r', `${FPS}`,
      '-i', '-',
      '-c:v', 'libvpx-vp9',
      '-pix_fmt', 'yuva420p',
      '-b:v', '0',
      '-crf', '24',
      '-g', `${FPS}`,
      '-cpu-used', '2',
      '-auto-alt-ref', '0',
      '-row-mt', '1',
      '-y',
      WEBM_OUTPUT
    ]);

    ffmpegWebM.stderr.on('data', d => console.error('WebM err:', d.toString()));
    for (const frame of processedRgbaFrames) {
      ffmpegWebM.stdin.write(frame);
    }
    ffmpegWebM.stdin.end();
    ffmpegWebM.on('close', code => code === 0 ? resolve() : reject(new Error(`WebM failed ${code}`)));
  });
  console.log('WebM encoded successfully:', WEBM_OUTPUT);

  // 3. Encode MP4 fallback
  console.log('Encoding MP4 fallback...');
  await new Promise((resolve, reject) => {
    const ffmpegMP4 = spawn('ffmpeg', [
      '-v', 'error',
      '-f', 'rawvideo',
      '-pix_fmt', 'rgb24',
      '-s', `${WIDTH}x${HEIGHT}`,
      '-r', `${FPS}`,
      '-i', '-',
      '-c:v', 'libx264',
      '-preset', 'fast',
      '-crf', '19',
      '-g', `${FPS}`,
      '-pix_fmt', 'yuv420p',
      '-movflags', '+faststart',
      '-y',
      MP4_OUTPUT
    ]);

    const bgR = 13, bgG = 30, bgB = 19;
    const outRgb = Buffer.alloc(FRAME_BYTES_IN);

    for (const frame of processedRgbaFrames) {
      for (let i = 0; i < WIDTH * HEIGHT; i++) {
        const sIdx = i * 4;
        const dIdx = i * 3;
        const r = frame[sIdx];
        const g = frame[sIdx + 1];
        const b = frame[sIdx + 2];
        const a = frame[sIdx + 3] / 255;

        outRgb[dIdx] = Math.round(r * a + bgR * (1 - a));
        outRgb[dIdx + 1] = Math.round(g * a + bgG * (1 - a));
        outRgb[dIdx + 2] = Math.round(b * a + bgB * (1 - a));
      }
      ffmpegMP4.stdin.write(outRgb);
    }
    ffmpegMP4.stdin.end();
    ffmpegMP4.on('close', code => code === 0 ? resolve() : reject(new Error(`MP4 failed ${code}`)));
  });
  console.log('MP4 fallback encoded successfully:', MP4_OUTPUT);
}

generateAll().catch(err => {
  console.error('Pipeline error:', err);
  process.exit(1);
});
