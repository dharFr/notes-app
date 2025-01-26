import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

async function generateIcons() {
  const svgPath = path.join(process.cwd(), 'public/icons/icon.svg');
  const sizes = [192, 512];

  try {
    const svgBuffer = await fs.readFile(svgPath);

    for (const size of sizes) {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(path.join(process.cwd(), `public/icons/icon-${size}x${size}.png`));
    }

    console.log('Icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons(); 