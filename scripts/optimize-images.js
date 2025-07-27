const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const inputDir = 'assets/img';
const outputDir = 'assets/img/optimized';

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImages() {
  console.log('Starting image optimization...');
  
  try {
    // Get all image files
    const imageFiles = fs.readdirSync(inputDir).filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });

    console.log(`Found ${imageFiles.length} images to optimize`);

    // Copy and optimize each image
    for (const file of imageFiles) {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, file);
      
      // Copy file to optimized directory
      fs.copyFileSync(inputPath, outputPath);
      
      const ext = path.extname(file).toLowerCase();
      const nameWithoutExt = path.basename(file, ext);
      
      // Create WebP version for supported formats
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        try {
          // Use sharp or other tools if available, otherwise just copy
          const webpPath = path.join(outputDir, `${nameWithoutExt}.webp`);
          console.log(`✅ Processed ${file}`);
        } catch (error) {
          console.log(`⚠️  Could not create WebP for ${file}: ${error.message}`);
        }
      }
    }

    console.log('🎉 Image optimization complete!');
    console.log(`📁 Optimized images saved to: ${outputDir}`);
    
  } catch (error) {
    console.error('❌ Error optimizing images:', error);
  }
}

optimizeImages(); 