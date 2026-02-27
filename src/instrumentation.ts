export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { ensureDataFiles } = await import("@/lib/seed");
    await ensureDataFiles();
  }
}
