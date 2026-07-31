import fs from "fs/promises";
import { PATHS } from "./config.mjs";

async function main() {
  const raw = await fs.readFile(PATHS.heroes, "utf8");
  const heroes = JSON.parse(raw);

  console.log(`Loaded ${heroes.length} heroes.`);

  for (const hero of heroes) {
    console.log(`• ${hero.name}`);
  }
}

main().catch(console.error);