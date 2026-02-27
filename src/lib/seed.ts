import { promises as fs } from "fs";
import path from "path";

const dataDir = process.env.DATA_DIR || path.join(process.cwd(), "data");
const seedDir = path.join(process.cwd(), "data");

const files = [
  "shows.json",
  "partners.json",
  "bookings.json",
  "partner-applications.json",
  "show-requests.json",
  "booth-offers.json",
];

export async function ensureDataFiles() {
  await fs.mkdir(dataDir, { recursive: true });

  for (const file of files) {
    const target = path.join(dataDir, file);
    try {
      await fs.access(target);
    } catch {
      // File doesn't exist on persistent disk — copy seed data
      const seed = path.join(seedDir, file);
      try {
        const content = await fs.readFile(seed, "utf-8");
        await fs.writeFile(target, content, "utf-8");
      } catch {
        // No seed file either — create empty array
        await fs.writeFile(target, "[]", "utf-8");
      }
    }
  }
}
