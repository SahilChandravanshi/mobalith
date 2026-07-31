import fs from "fs/promises";

const FILES = [
  "./public/data/heroes.json",
  "./public/data/items.json",
  "./public/data/emblems.json",
  "./public/data/spells.json",
  "./public/data/meta.json",
  "./public/data/patches.json",
];

async function validate(file) {
  try {
    const raw = await fs.readFile(file, "utf8");
    JSON.parse(raw);
    console.log(`✓ ${file}`);
  } catch (err) {
    console.error(`✗ ${file}`);
    console.error(err.message);
    process.exitCode = 1;
  }
}

for (const file of FILES) {
  await validate(file);
}