import { createServer } from "http";
import next from "next";
import { join } from "path";
import { existsSync, readdirSync } from "fs";

// Always use production mode when deployed
const app = next({ dev: false });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

// Debug logging to help troubleshoot
console.log("Current working directory:", process.cwd());
console.log("Directory contents:", readdirSync(process.cwd()));

// Look for the Next.js build directory in various locations
const possibleNextDirs = [
  join(process.cwd(), ".next"),
  join(process.cwd(), "standalone", ".next"),
  join(process.cwd(), ".next/standalone"),
];

let foundNextDir = null;
for (const dir of possibleNextDirs) {
  if (existsSync(dir)) {
    console.log(`Found Next.js build directory at: ${dir}`);
    foundNextDir = dir;
    break;
  }
}

if (!foundNextDir) {
  console.error("ERROR: Could not find Next.js build directory.");
  console.error(
    "Please ensure 'next build' runs successfully before starting the server."
  );
}

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      handle(req, res);
    }).listen(port, "0.0.0.0", (err) => {
      if (err) throw err;
      console.log(`> Ready on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error preparing Next.js app:", err);
    process.exit(1);
  });
