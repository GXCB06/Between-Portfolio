import "server-only";

import fs from "fs";
import path from "path";
import type {
  PortfolioCategory,
  PortfolioCategoryKey,
  PortfolioItem,
} from "@/lib/portfolio-types";

const CATEGORY_CONFIG: Record<
  PortfolioCategoryKey,
  { label: string; folder: string }
> = {
  portfolio: {
    label: "Portfolio",
    folder: "Portfolio-slides-for-showcasing",
  },
  highSchool: {
    label: "High School",
    folder: "portfolio-slides-for-showcaing-(highschool)",
  },
  cu109Sem1: {
    label: "CU109 / 1st",
    folder: "portfolio-slides-for-showcaing-(cu109-1st)",
  },
  cu109Sem2: {
    label: "CU109 / 2nd",
    folder: "portfolio-slides-for-showcaing-(cu109-2nd)",
  },
};

const IMAGE_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".bmp",
  ".avif",
]);

function titleFromFilename(filename: string) {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/\s*\(\d+\)/, "")
    .replace(/[-_]/g, " ")
    .trim();
}

function isImageFile(filename: string) {
  const extension = path.extname(filename).toLowerCase();
  return IMAGE_EXTENSIONS.has(extension);
}

function readImageFiles(dirPath: string): string[] {
  if (!fs.existsSync(dirPath)) return [];

  return fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && isImageFile(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function syncFolderToPublic(sourceDir: string, publicDir: string) {
  if (!fs.existsSync(sourceDir)) return;

  fs.mkdirSync(publicDir, { recursive: true });

  const sourceFiles = readImageFiles(sourceDir);
  const sourceSet = new Set(sourceFiles);

  for (const file of sourceFiles) {
    fs.copyFileSync(
      path.join(sourceDir, file),
      path.join(publicDir, file)
    );
  }

  for (const entry of fs.readdirSync(publicDir, { withFileTypes: true })) {
    if (entry.isFile() && !sourceSet.has(entry.name)) {
      fs.unlinkSync(path.join(publicDir, entry.name));
    }
  }
}

function buildCategory(
  key: PortfolioCategoryKey,
  pngRoot: string,
  publicRoot: string
): PortfolioCategory {
  const { label, folder } = CATEGORY_CONFIG[key];
  const sourceDir = path.join(pngRoot, folder);
  const publicDir = path.join(publicRoot, folder);

  syncFolderToPublic(sourceDir, publicDir);

  const files = readImageFiles(sourceDir);
  const publicUrlBase = `/assets/${folder}`;

  const items: PortfolioItem[] = files.map((file) => ({
    id: `${key}-${file}`,
    title: titleFromFilename(file),
    image: `${publicUrlBase}/${encodeURI(file)}`,
    alt: `${label} — ${titleFromFilename(file)}`,
  }));

  return { key, label, folder, items };
}

export function syncProjectAssets() {
  const projectRoot = process.cwd();
  const pngRoot = path.join(projectRoot, "png");
  const publicRoot = path.join(projectRoot, "public", "assets");

  syncFolderToPublic(
    path.join(pngRoot, "currently-looking-for-card-png"),
    path.join(publicRoot, "currently-looking-for-card-png")
  );
}

export function getPortfolioCategories(): PortfolioCategory[] {
  const projectRoot = process.cwd();
  const pngRoot = path.join(projectRoot, "png");
  const publicRoot = path.join(projectRoot, "public", "assets");

  syncProjectAssets();

  const keys = Object.keys(CATEGORY_CONFIG) as PortfolioCategoryKey[];

  return keys.map((key) => buildCategory(key, pngRoot, publicRoot));
}

export function getPortfolioCategoryMap(): Record<
  PortfolioCategoryKey,
  PortfolioCategory
> {
  const categories = getPortfolioCategories();

  return {
    portfolio: categories.find((category) => category.key === "portfolio")!,
    highSchool: categories.find((category) => category.key === "highSchool")!,
    cu109Sem1: categories.find((category) => category.key === "cu109Sem1")!,
    cu109Sem2: categories.find((category) => category.key === "cu109Sem2")!,
  };
}
