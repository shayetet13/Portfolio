const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function optimizeImages() {
  const inputPath = "./mern.jpeg";
  const outputDir = "./";

  // Check if original exists
  if (!fs.existsSync(inputPath)) {
    console.error("Original mern.jpeg not found");
    return;
  }

  try {
    // Generate WebP at exact display size (288x144)
    await sharp(inputPath)
      .resize(288, 144, {
        fit: "contain",
        background: { r: 15, g: 23, b: 42, alpha: 1 },
      })
      .webp({
        quality: 85,
        effort: 6,
      })
      .toFile(path.join(outputDir, "mern-optimized.webp"));

    // Generate optimized JPEG at exact display size
    await sharp(inputPath)
      .resize(288, 144, {
        fit: "contain",
        background: { r: 15, g: 23, b: 42, alpha: 1 },
      })
      .jpeg({
        quality: 80,
        progressive: true,
        mozjpeg: true,
      })
      .toFile(path.join(outputDir, "mern-optimized.jpg"));

    // Generate AVIF for modern browsers
    await sharp(inputPath)
      .resize(288, 144, {
        fit: "contain",
        background: { r: 15, g: 23, b: 42, alpha: 1 },
      })
      .avif({
        quality: 75,
        effort: 9,
      })
      .toFile(path.join(outputDir, "mern-optimized.avif"));

    // Generate smaller mobile version (256x128)
    await sharp(inputPath)
      .resize(256, 128, {
        fit: "contain",
        background: { r: 15, g: 23, b: 42, alpha: 1 },
      })
      .webp({
        quality: 80,
        effort: 6,
      })
      .toFile(path.join(outputDir, "mern-mobile.webp"));

    // Generate tiny placeholder (32x16)
    await sharp(inputPath)
      .resize(32, 16, {
        fit: "contain",
        background: { r: 15, g: 23, b: 42, alpha: 1 },
      })
      .blur(2)
      .jpeg({ quality: 30 })
      .toFile(path.join(outputDir, "mern-placeholder.jpg"));

    console.log("✅ All optimized images generated successfully!");

    // Print file sizes
    const files = [
      "mern.jpeg",
      "mern-optimized.webp",
      "mern-optimized.jpg",
      "mern-optimized.avif",
      "mern-mobile.webp",
      "mern-placeholder.jpg",
    ];

    console.log("\n📊 File sizes:");
    files.forEach((file) => {
      if (fs.existsSync(file)) {
        const stats = fs.statSync(file);
        const sizeKB = (stats.size / 1024).toFixed(1);
        console.log(`${file}: ${sizeKB} KB`);
      }
    });
  } catch (error) {
    console.error("Error optimizing images:", error);
  }
}

// Run if called directly
if (require.main === module) {
  optimizeImages();
}

module.exports = { optimizeImages };
