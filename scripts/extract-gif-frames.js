// One-off utility: splits an animated GIF into a numbered WebP frame
// sequence for the HeroBanner canvas scrubber.
//
// Usage: node scripts/extract-gif-frames.js [input.gif] [outDir] [quality]
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

async function main() {
  const input =
    process.argv[2] || path.join("public", "source-gif", "hero-source.gif");
  const outDir = process.argv[3] || path.join("public", "hero-frames");
  const quality = Number(process.argv[4] || 90);

  const meta = await sharp(input, {
    animated: true,
    limitInputPixels: false,
  }).metadata();

  const { width, pageHeight, pages, channels } = meta;
  if (!pages || !pageHeight) {
    throw new Error("Input is not a multi-frame (animated) image.");
  }

  console.log(
    `Found ${pages} frames, ${width}x${pageHeight}, ${channels} channels.`
  );

  fs.mkdirSync(outDir, { recursive: true });

  // Decode the whole animated strip once (fast) instead of re-decoding
  // the GIF from frame 0 for every single page (slow, O(n^2)).
  const { data } = await sharp(input, {
    animated: true,
    limitInputPixels: false,
  })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const bytesPerRow = width * channels;
  const bytesPerFrame = bytesPerRow * pageHeight;
  const pad = String(pages).length < 4 ? 4 : String(pages).length;

  for (let i = 0; i < pages; i += 1) {
    const frameBuffer = data.subarray(
      i * bytesPerFrame,
      (i + 1) * bytesPerFrame
    );
    const outPath = path.join(
      outDir,
      `frame_${String(i + 1).padStart(pad, "0")}.webp`
    );

    await sharp(frameBuffer, {
      raw: { width, height: pageHeight, channels },
    })
      // Counter the GIF's palette dithering/softness with a mild sharpen.
      .sharpen({ sigma: 1 })
      .webp({ quality })
      .toFile(outPath);

    if ((i + 1) % 50 === 0 || i === pages - 1) {
      console.log(`  ${i + 1}/${pages}`);
    }
  }

  console.log(`Done. Wrote ${pages} frames to ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
