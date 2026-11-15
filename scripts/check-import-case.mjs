// check-import-case.mjs
// Finds imports whose capitalization does not match the real file or folder
// name. Windows ignores case, but Vercel (Linux) does not, so a mismatch
// works on your laptop and fails the deploy.
//
// Run from the project root:  node scripts/check-import-case.mjs

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const src = path.join(root, "src");
const EXTENSIONS = ["", ".jsx", ".js", ".json", ".mjs"];

// all .js / .jsx files under src
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) return walk(full);
    return /\.(jsx?|mjs)$/.test(e.name) ? [full] : [];
  });
}

// Walks a path one segment at a time using the REAL names on disk.
// Returns { exists, wrong: [{typed, real}] } so we can spot case mistakes.
function inspect(target) {
  const parts = path.relative(root, target).split(path.sep);
  let cur = root;
  const wrong = [];
  for (const part of parts) {
    let entries;
    try { entries = fs.readdirSync(cur); } catch { return { exists: false, wrong }; }
    if (entries.includes(part)) { cur = path.join(cur, part); continue; }
    const real = entries.find((e) => e.toLowerCase() === part.toLowerCase());
    if (!real) return { exists: false, wrong };
    wrong.push({ typed: part, real });
    cur = path.join(cur, real);
  }
  return { exists: fs.statSync(cur).isFile(), wrong };
}

const importRe = /(?:from\s+|import\s*\(\s*|import\s+)["']([^"']+)["']/g;
const problems = [];

for (const file of walk(src)) {
  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((line, i) => {
    for (const m of line.matchAll(importRe)) {
      const spec = m[1].split("?")[0]; // drop ?url and similar
      let base;
      if (spec.startsWith("@/")) base = path.join(src, spec.slice(2));
      else if (spec.startsWith("./") || spec.startsWith("../"))
        base = path.resolve(path.dirname(file), spec);
      else continue; // packages and absolute paths are not checked

      const results = EXTENSIONS.map((ext) => inspect(base + ext));
      if (results.some((r) => r.exists && r.wrong.length === 0)) continue; // fine
      const caseHit = results.find((r) => r.exists && r.wrong.length > 0);
      const where = `${path.relative(root, file)}:${i + 1}`;
      if (caseHit) {
        const w = caseHit.wrong.map((x) => `"${x.typed}" should be "${x.real}"`).join(", ");
        problems.push(`CASE     ${where}  import "${spec}": ${w}`);
      } else {
        problems.push(`MISSING  ${where}  import "${spec}" does not resolve to a file`);
      }
    }
  });
}

if (problems.length === 0) {
  console.log("All relative imports match their file names exactly.");
} else {
  console.log(problems.join("\n"));
  console.log(`\n${problems.length} problem(s) found.`);
  process.exit(1);
}
