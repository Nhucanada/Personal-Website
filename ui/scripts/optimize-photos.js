const fs = require('fs/promises');
const path = require('path');
const { execFile } = require('child_process');
const { promisify } = require('util');
const sharp = require('sharp');

const execFileAsync = promisify(execFile);

const PHOTOS_ROOT = path.resolve(__dirname, '../public/photos');
const OUTPUT_ROOT = path.join(PHOTOS_ROOT, 'optimized');
const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const HEIC_EXTENSIONS = new Set(['.heic', '.heif']);
const LANDSCAPE_SHORT_EDGE = 900;
const PORTRAIT_SHORT_EDGE = 1000;

const convertHeicToJpeg = async (heicPath) => {
  const jpegPath = heicPath.replace(/\.[^.]+$/, '.jpg');
  await execFileAsync('sips', ['-s', 'format', 'jpeg', heicPath, '--out', jpegPath]);
  await fs.unlink(heicPath);
  console.log(`[heic→jpg] ${path.relative(PHOTOS_ROOT, heicPath)} -> ${path.relative(PHOTOS_ROOT, jpegPath)}`);
  return jpegPath;
};

const getAllPhotoFiles = async (directoryPath) => {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === 'optimized') {
        continue;
      }

      const nestedFiles = await getAllPhotoFiles(absolutePath);
      files.push(...nestedFiles);
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    if (HEIC_EXTENSIONS.has(extension)) {
      const converted = await convertHeicToJpeg(absolutePath);
      files.push(converted);
    } else if (SUPPORTED_EXTENSIONS.has(extension)) {
      files.push(absolutePath);
    }
  }

  return files;
};

const getResizeOptions = (width, height) => {
  const isLandscape = width >= height;
  const shortEdgeTarget = isLandscape ? LANDSCAPE_SHORT_EDGE : PORTRAIT_SHORT_EDGE;

  return isLandscape
    ? { height: shortEdgeTarget, fit: 'inside', withoutEnlargement: true }
    : { width: shortEdgeTarget, fit: 'inside', withoutEnlargement: true };
};

const optimizePhoto = async (sourcePath) => {
  const relativePath = path.relative(PHOTOS_ROOT, sourcePath);
  const outputRelativePath = relativePath.replace(/\.[^.]+$/, '.webp');
  const outputPath = path.join(OUTPUT_ROOT, outputRelativePath);

  const image = sharp(sourcePath).rotate();
  const metadata = await image.metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error(`Unable to read dimensions for ${relativePath}`);
  }

  const resizeOptions = getResizeOptions(metadata.width, metadata.height);

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await image
    .resize(resizeOptions)
    .webp({ quality: 80, effort: 6 })
    .toFile(outputPath);

  return { source: relativePath, output: path.relative(PHOTOS_ROOT, outputPath) };
};

const run = async () => {
  await fs.rm(OUTPUT_ROOT, { recursive: true, force: true });

  const photoFiles = await getAllPhotoFiles(PHOTOS_ROOT);
  if (photoFiles.length === 0) {
    console.log('No source photos found.');
    return;
  }

  let optimizedCount = 0;

  for (const photoFile of photoFiles) {
    const { source, output } = await optimizePhoto(photoFile);
    optimizedCount += 1;
    console.log(`[optimized] ${source} -> ${output}`);
  }

  console.log(`Done. Optimized ${optimizedCount} photo(s).`);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
