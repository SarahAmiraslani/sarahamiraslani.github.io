const fs = require("fs");
const path = require("path");
const imagemin = require("imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");
const imageminWebp = require("imagemin-webp");
const imageminGifsicle = require("imagemin-gifsicle");

const inputDir = "assets/img";
const outputDir = "assets/img/optimized";

// List of large images that need immediate optimization
const largeImages = [
  "profile_pic.jpg", // 6.4MB
  "self.png", // 4.2MB
  "walter-white-cash.png", // 3.2MB
  "solar-wind-animation.gif", // 3.0MB
  "solar-system.jpg", // 3.0MB
  "learn.jpg", // 3.0MB
  "magnetosphere.gif", // 2.4MB
  "f1-lego.jpg", // 2.2MB
  "draw-condition-experiment.png", // 1.9MB
  "copy-condition-experiment.png", // 1.5MB
  "complete-condition-experiment.png", // 1.5MB
  "jason-goodman-Oalh2MojUuk-unsplash.jpg", // 751KB
  "glasses.jpg", // 847KB
  "ergast_db.png", // 917KB
  "drawing-black-holes.png", // 673KB
  "solar-wind-image.png", // 642KB
  "solar-wind-depiction.jpg", // 483KB
  "solar-wind-diagram.jpg", // 425KB
  "f1-pairplot.png", // 437KB
  "fashion.png", // 336KB
  "ctml-diagram.png", // 332KB
  "coronal-origin.png", // 361KB
  "KPCA.png", // 258KB
  "multimedia-learning-diagram.png", // 267KB
  "BB_.jpg", // 472KB
  "ace-launch.jpg", // 698KB
  "previous-experiments.png", // 518KB
  "zettabyte.png", // 845KB
];

async function optimizeLargeImages() {
  console.log("🚀 Starting optimization of large images...");

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let processedCount = 0;

  for (const image of largeImages) {
    const inputPath = path.join(inputDir, image);

    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Skipping ${image} - file not found`);
      continue;
    }

    const originalSize = fs.statSync(inputPath).size;
    totalOriginalSize += originalSize;

    try {
      const ext = path.extname(image).toLowerCase();
      let optimizedFiles = [];

      if (ext === ".jpg" || ext === ".jpeg") {
        // Optimize JPEG
        optimizedFiles = await imagemin([inputPath], {
          destination: outputDir,
          plugins: [
            imageminMozjpeg({
              quality: 75,
              progressive: true,
            }),
          ],
        });

        // Create WebP version
        const webpFiles = await imagemin([inputPath], {
          destination: outputDir,
          plugins: [
            imageminWebp({
              quality: 75,
              method: 6,
            }),
          ],
        });
        optimizedFiles = optimizedFiles.concat(webpFiles);
      } else if (ext === ".png") {
        // Optimize PNG
        optimizedFiles = await imagemin([inputPath], {
          destination: outputDir,
          plugins: [
            imageminPngquant({
              quality: [0.5, 0.7],
              speed: 4,
            }),
          ],
        });

        // Create WebP version
        const webpFiles = await imagemin([inputPath], {
          destination: outputDir,
          plugins: [
            imageminWebp({
              quality: 75,
              method: 6,
            }),
          ],
        });
        optimizedFiles = optimizedFiles.concat(webpFiles);
      } else if (ext === ".gif") {
        // Optimize GIF
        optimizedFiles = await imagemin([inputPath], {
          destination: outputDir,
          plugins: [
            imageminGifsicle({
              optimizationLevel: 3,
            }),
          ],
        });
      }

      if (optimizedFiles.length > 0) {
        const optimizedPath = path.join(outputDir, image);
        if (fs.existsSync(optimizedPath)) {
          const optimizedSize = fs.statSync(optimizedPath).size;
          totalOptimizedSize += optimizedSize;

          const savings = (((originalSize - optimizedSize) / originalSize) * 100).toFixed(1);
          console.log(
            `✅ ${image}: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(optimizedSize / 1024 / 1024).toFixed(2)}MB (${savings}% savings)`
          );
          processedCount++;
        }
      }
    } catch (error) {
      console.error(`❌ Error optimizing ${image}:`, error.message);
    }
  }

  const totalSavings = (((totalOriginalSize - totalOptimizedSize) / totalOriginalSize) * 100).toFixed(1);
  console.log(`\n📊 Summary:`);
  console.log(`   Processed: ${processedCount} images`);
  console.log(`   Total size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB → ${(totalOptimizedSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`   Total savings: ${totalSavings}%`);
  console.log(`   Saved: ${((totalOriginalSize - totalOptimizedSize) / 1024 / 1024).toFixed(2)}MB`);
}

optimizeLargeImages();
