import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // Use __dirname when running from our CJS bundle (dist/index.cjs); else cwd (Vercel serverless / dev)
  const distPath =
    typeof __dirname !== "undefined" && __dirname.endsWith("dist")
      ? path.join(__dirname, "public")
      : path.resolve(process.cwd(), "dist", "public");

  if (!fs.existsSync(distPath)) {
    console.warn(`Could not find the build directory: ${distPath}`);
  }

  app.use(express.static(distPath));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}
