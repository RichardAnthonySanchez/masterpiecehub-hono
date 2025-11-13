import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, "../src/static/img");
const outputDir = path.join(__dirname, "../src/static/images-optimized");

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

const validExtensions = [".jpg", ".jpeg", ".png"];

fs.readdirSync(inputDir).forEach((file) => {
  const ext = path.extname(file).toLowerCase();
  if (!validExtensions.includes(ext)) return;

  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, path.parse(file).name + ".jpg");

  sharp(inputPath)
    .resize({ width: 1300, withoutEnlargement: true })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(outputPath)
    .then(() => console.log(`Optimized: ${file}`))
    .catch((err) => console.error(`Error processing ${file}:`, err));
});
