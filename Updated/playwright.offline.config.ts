import { defineConfig } from '@playwright/test';
const offlineRunDir = process.env.PLAYWRIGHT_OFFLINE_RUN_DIR || 'temp/framework-audit';
export default defineConfig({
  testDir: './framework-tests', testMatch: /offline\.spec\.ts/,
  outputDir: `${offlineRunDir}/offline-results`,
  timeout: 30000, workers: 1, retries: 0,
  reporter: [['list'], ['html', { outputFolder: `${offlineRunDir}/offline-report`, open: 'never' }], ['json', { outputFile: `${offlineRunDir}/offline-results.json` }]],
  use: { channel: process.env.PLAYWRIGHT_BROWSER_CHANNEL || 'msedge', headless: true, trace: 'on', video: 'on', screenshot: 'only-on-failure' },
});
