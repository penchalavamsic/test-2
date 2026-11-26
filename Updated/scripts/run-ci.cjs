const path = require('path');
const fs = require('fs');
const { spawnSync } = require('child_process');
const root = path.resolve(__dirname, '..');
require('dotenv').config({ path: path.join(root, '.env') });
process.env.CI = 'true';
process.env.PLAYWRIGHT_BROWSER_CHANNEL ||= 'chromium';
process.env.PLAYWRIGHT_WORKERS ||= '1';
process.env.PLAYWRIGHT_RETRIES ||= '0';
process.env.PLAYWRIGHT_EVIDENCE_MODE ||= 'detailed';
const supplied = process.argv.slice(2);
const offline = supplied.includes('--dry-run') || supplied.includes('--list');
if (supplied.includes('--headed')) throw new Error('CI execution is headless; remove --headed');

async function main() {
  const { main: runBatches, parseArgs } = require('./run-batches.cjs');
  const options = parseArgs(supplied);
  if (!offline) {
    const profile = options.profile || process.env.LIMAS_ACCESS_PROFILE || process.env.LIMAS_DEFAULT_ACCESS_PROFILE;
    const profiles = JSON.parse(fs.readFileSync(path.join(root, 'config/access-profiles.json'), 'utf8'));
    const selection = Object.hasOwn(profiles, profile) ? profiles[profile] : undefined;
    if (!selection) throw new Error('CI requires a configured LIMAS_ACCESS_PROFILE or LIMAS_DEFAULT_ACCESS_PROFILE');
    for (const name of ['LIMAS_BASE_URL', selection.usernameEnv, selection.passwordEnv]) {
      if (!process.env[name]) throw new Error(`Missing required CI variable: ${name}`);
    }
    const target = new URL(process.env.LIMAS_BASE_URL);
    if (!['http:', 'https:'].includes(target.protocol) || target.username || target.password) throw new Error('CI application URL must be HTTP(S) without embedded credentials');
  }
  for (const check of [[require.resolve('typescript/bin/tsc'), '--noEmit'], [path.join(__dirname, 'instrument-evidence.cjs'), '--check']]) {
    const checked = spawnSync(process.execPath, check, { cwd: root, env: process.env, stdio: 'inherit', windowsHide: true });
    if (checked.status !== 0) return checked.status ?? 1;
  }
  const args = [...supplied, '--continue-on-failure'];
  if (!supplied.includes('--batch') && !supplied.includes('--all')) args.push('--all');
  return runBatches(args);
}
main().then(code => { process.exitCode = code; }).catch(error => { console.error(error.message); process.exitCode = 1; });
