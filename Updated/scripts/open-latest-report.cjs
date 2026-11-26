const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const root = path.resolve(__dirname, '..');
const latest = path.join(root, 'test-runs/latest.json');
if (!fs.existsSync(latest)) {
  console.error('No batch report yet. Run npm run test:batch with a batch name.');
  process.exitCode = 1;
} else {
  const { runDir } = JSON.parse(fs.readFileSync(latest, 'utf8'));
  const result = spawnSync(process.execPath, [require.resolve('@playwright/test/cli'), 'show-report', path.resolve(root, runDir, 'html-report')], { stdio: 'inherit', windowsHide: true });
  process.exitCode = result.status ?? 1;
}
