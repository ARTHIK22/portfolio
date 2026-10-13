// scripts/verify-content.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

console.log('[Content Verification] Starting automated content audit...');

let errors = 0;
let warnings = 0;

function checkPattern(filePath, forbiddenRegex, label) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const matches = content.match(forbiddenRegex);
  if (matches) {
    console.error(`[FAIL] ${label} found in ${path.relative(ROOT, filePath)}: "${matches[0]}"`);
    errors++;
  }
}

// 1. Scan src/data files for placeholder text
const dataDir = path.join(ROOT, 'src/data');
const dataFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.ts') || f.endsWith('.json'));

for (const f of dataFiles) {
  const fp = path.join(dataDir, f);
  checkPattern(fp, /\bTODO\b/i, 'TODO comment/placeholder');
  checkPattern(fp, /lorem ipsum/i, 'Lorem Ipsum dummy text');
  checkPattern(fp, /example\.com/i, 'example.com dummy URL');
  checkPattern(fp, /placeholder/i, 'Placeholder label');
}

// 2. Check github snapshot file
const snapshotPath = path.join(dataDir, 'generated/github-snapshot.json');
if (!fs.existsSync(snapshotPath)) {
  console.error('[FAIL] Missing src/data/generated/github-snapshot.json');
  errors++;
} else {
  const snapshot = JSON.parse(fs.readFileSync(snapshotPath, 'utf-8'));
  console.log(`[PASS] GitHub snapshot verified: ${snapshot.repositories.length} repos found.`);
}

// 3. Check docs/EVIDENCE.md
const evidencePath = path.join(ROOT, 'docs/EVIDENCE.md');
if (!fs.existsSync(evidencePath)) {
  console.error('[FAIL] Missing docs/EVIDENCE.md');
  errors++;
} else {
  console.log('[PASS] docs/EVIDENCE.md exists and is documented.');
}

if (errors === 0) {
  console.log('[SUCCESS] Content audit passed with 0 errors.');
  process.exit(0);
} else {
  console.error(`[ERROR] Content audit failed with ${errors} errors.`);
  process.exit(1);
}
