import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generatePngLogos() {
  const publicDir = path.resolve(process.cwd(), 'public');
  const assetsDir = path.resolve(publicDir, 'assets');

  const lightSvg = fs.readFileSync(path.join(publicDir, 'bankplus-logo-light.svg'));
  const darkSvg = fs.readFileSync(path.join(publicDir, 'bankplus-logo-dark.svg'));

  console.log('Generating high-resolution PNG logos (2000 x 416 px)...');

  // 1. Light Logo (Transparent PNG)
  await sharp(lightSvg, { density: 600 })
    .resize(2000, 416, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(publicDir, 'bankplus-logo-light.png'));

  // Also in assets/
  fs.copyFileSync(
    path.join(publicDir, 'bankplus-logo-light.png'),
    path.join(assetsDir, 'bankplus-logo-light.png')
  );
  console.log('Saved bankplus-logo-light.png');

  // 2. Dark Logo (Transparent PNG - with white and cyan lettering for dark backgrounds)
  await sharp(darkSvg, { density: 600 })
    .resize(2000, 416, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(publicDir, 'bankplus-logo-dark.png'));

  // Also in assets/
  fs.copyFileSync(
    path.join(publicDir, 'bankplus-logo-dark.png'),
    path.join(assetsDir, 'bankplus-logo-dark.png')
  );
  console.log('Saved bankplus-logo-dark.png');

  // 3. Also Dark Logo on solid Dark Navy/Slate Background for direct previewing/social sharing
  await sharp(darkSvg, { density: 600 })
    .resize(2000, 416, { fit: 'contain', background: { r: 15, g: 23, b: 42, alpha: 1 } })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(publicDir, 'bankplus-logo-dark-solid.png'));

  console.log('Saved bankplus-logo-dark-solid.png');
  console.log('All PNG logos generated successfully!');
}

generatePngLogos().catch((err) => {
  console.error('Error generating PNG logos:', err);
  process.exit(1);
});
