import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { envNumber } from './tests/helpers/settings';
import { resolveProfileName, getProfile } from './tests/helpers/auth';

dotenv.config({ path: path.resolve(__dirname, '.env') });
// Inherit this ID in workers so every artifact belongs to the same invocation.
const runId = process.env.PLAYWRIGHT_RUN_ID ||= `${new Date().toISOString().replace(/[:.]/g, '-')}-${process.pid}`;
const runDir = path.resolve(__dirname, 'test-runs', runId);
const detailed = process.env.PLAYWRIGHT_EVIDENCE_MODE !== 'off';
// Optional per-run resource limit, kept with the reports for reproducibility.
const settingsPath = path.join(__dirname, 'test-runs', runId.split(/[\\/]/)[0], 'execution-settings.json');
const runSettings = fs.existsSync(settingsPath) ? JSON.parse(fs.readFileSync(settingsPath, 'utf8')) : {};
const projectWorkers = runSettings.maxWorkersPerProject as number | undefined;
if (runSettings.screenshotMode) process.env.PLAYWRIGHT_SCREENSHOT_MODE = runSettings.screenshotMode;
if (projectWorkers !== undefined && (!Number.isInteger(projectWorkers) || projectWorkers < 1 || projectWorkers > 16)) {
  throw new Error('maxWorkersPerProject must be an integer from 1 to 16');
}

const profile = resolveProfileName();
getProfile(profile);

export default defineConfig({
  testDir: './tests',
  outputDir: process.env.PLAYWRIGHT_OUTPUT_DIR || path.join(runDir, 'test-results'),
  // Tests use isolated contexts; explicitly serial lifecycle groups stay serial.
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: envNumber('PLAYWRIGHT_RETRIES', 0),
  workers: envNumber('PLAYWRIGHT_WORKERS', 1, 1),
  timeout: envNumber('PLAYWRIGHT_TEST_TIMEOUT', 120000, 1),
  expect: { timeout: envNumber('PLAYWRIGHT_EXPECT_TIMEOUT', 30000, 1) },
  reporter: [
    ['list'],
    ['html', { outputFolder: process.env.PLAYWRIGHT_HTML_OUTPUT_DIR || path.join(runDir, 'html-report'), open: 'never' }],
    ['junit', { outputFile: process.env.PLAYWRIGHT_JUNIT_OUTPUT_FILE || path.join(runDir, 'junit.xml') }],
    ['json', { outputFile: process.env.PLAYWRIGHT_JSON_OUTPUT_FILE || path.join(runDir, 'results.json') }],
  ],
  projects: [
    { name: 'auth-setup', testMatch: /auth\.setup\.ts/, timeout: envNumber('LIMAS_AUTH_SETUP_TIMEOUT_MS', 180000, 1) },
    { name: 'auth-smoke', testMatch: /auth-smoke\.spec\.ts/, dependencies: ['auth-setup'],
      use: { storageState: path.resolve(__dirname, '.auth', `${profile}.json`) } },
    // Keep the historical project name used by the batch runner. All functional
    // tabs use the authenticated fixture, so none may also run in default.
    { name: 'system-user-dashboard', workers: projectWorkers, testIgnore: [/auth-smoke\.spec\.ts/, /[\\/]authentication[\\/]/], dependencies: ['auth-smoke'] },
    { name: 'default', testMatch: /[\\/]authentication[\\/].*\.spec\.ts/ },
  ],
  use: {
    baseURL: process.env.LIMAS_BASE_URL,
    trace: { mode: detailed ? 'on' : 'retain-on-failure', sources: runSettings.traceSources !== false },
    screenshot: 'only-on-failure',
    video: detailed ? 'on' : 'retain-on-failure',
    channel: process.env.PLAYWRIGHT_BROWSER_CHANNEL || 'msedge',
    actionTimeout: envNumber('PLAYWRIGHT_ACTION_TIMEOUT_MS', 30000, 1),
    navigationTimeout: envNumber('PLAYWRIGHT_NAVIGATION_TIMEOUT_MS', 60000, 1),
  },
});
