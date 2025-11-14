import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Artwork {
  id: string;
  era: string;
  title: string;
  artist: string;
  year: string;
  description: string;
  image: string;
  slug?: string;
}

const slugify = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

const inputPath = path.join(__dirname, "../data/data.json");
const outputPath = path.join(__dirname, "../data/artworks-with-slugs.json");

const raw = fs.readFileSync(inputPath, "utf8");
const artworks: Artwork[] = JSON.parse(raw);

const updated = artworks.map((artwork) => ({
  ...artwork,
  slug: slugify(artwork.title),
}));

fs.writeFileSync(outputPath, JSON.stringify(updated, null, 2), "utf8");

console.log("Slugs added successfully!");
