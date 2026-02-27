import { promises as fs } from "fs";
import path from "path";

// Render persistent disk mount point, fallback to local ./data for dev
const dataDir = process.env.DATA_DIR || path.join(process.cwd(), "data");

export async function readJSON<T>(filename: string): Promise<T> {
  const filePath = path.join(dataDir, filename);
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

export async function writeJSON<T>(filename: string, data: T): Promise<void> {
  const filePath = path.join(dataDir, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function appendJSON<T extends { id: string }>(
  filename: string,
  item: Omit<T, "id"> & { id?: string }
): Promise<T> {
  const items = await readJSON<T[]>(filename);
  const newItem = {
    ...item,
    id: item.id || String(Date.now()),
  } as T;
  items.push(newItem);
  await writeJSON(filename, items);
  return newItem;
}

export async function updateJSON<T extends { id: string }>(
  filename: string,
  id: string,
  partial: Partial<T>
): Promise<T | null> {
  const items = await readJSON<T[]>(filename);
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return null;
  items[index] = { ...items[index], ...partial, id };
  await writeJSON(filename, items);
  return items[index];
}

export async function deleteJSON<T extends { id: string }>(
  filename: string,
  id: string
): Promise<boolean> {
  const items = await readJSON<T[]>(filename);
  const filtered = items.filter((item) => item.id !== id);
  if (filtered.length === items.length) return false;
  await writeJSON(filename, filtered);
  return true;
}
