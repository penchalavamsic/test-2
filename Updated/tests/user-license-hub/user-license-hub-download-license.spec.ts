import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';
import * as fs from 'fs';
import * as path from 'path';

function createTempDownloadDir(): string {
  const dir = test.info().outputPath('downloads');
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function cleanupTempDownloadDir(dir: string): void {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

test.describe('Download Button', () => {
  let hub: UserLicenseHubPage;

  test.beforeEach(async ({ page }) => {
    hub = new UserLicenseHubPage(page);
    await hub.goto();
    await hub.restoreDefaultUserListState();
    await hub.restoreLicensePanelDefaultState();
  });

  test('LIMAS-SUD-1163: Download button visible with accessible name', async () => {
    await recordEvidence('assert-toBeVisible-user-license-hub-download-license.spec-30', async () => expect(hub.downloadButton).toBeVisible());
    await recordEvidence('assert-toHaveAccessibleName-user-license-hub-download-license.spec-31', async () => expect(hub.downloadButton).toHaveAccessibleName(/Download license file/i));
  });

  test('LIMAS-SUD-1193: Download button accessible name and icon semantics', async () => {
    await recordEvidence('assert-toHaveAttribute-user-license-hub-download-license.spec-35', async () => expect(hub.downloadButton).toHaveAttribute('aria-label', /Download/i));
    // Icon should be present as SVG child
    await recordEvidence('assert-toBeVisible-user-license-hub-download-license.spec-37', async () => expect(hub.downloadButton.locator('svg').first()).toBeVisible());
  });

  test('LIMAS-SUD-1192: Download button keyboard focus and Enter activation', async ({ page }) => {
    await hub.applyRuntimeProfileForDownload();
    await hub.selectFirstVisibleUser();
    // Tab to Download button
    await recordEvidence('action-focus-user-license-hub-download-license.spec-44', async () => hub.downloadButton.focus());
    await recordEvidence('assert-toBeFocused-user-license-hub-download-license.spec-45', async () => expect(hub.downloadButton).toBeFocused());
    // Activate with Enter
    const downloadPromise = page.waitForEvent('download', { timeout: 15000 });
    await recordEvidence('action-press-user-license-hub-download-license.spec-48', async () => page.keyboard.press('Enter'));
    const download = await downloadPromise;
    await recordEvidence('assert-toBeTruthy-user-license-hub-download-license.spec-50', async () => expect(download.suggestedFilename).toBeTruthy());
  });

  test('LIMAS-SUD-1194: Download toolbar grouping and scope communication', async () => {
    // All three toolbar buttons in same group
    await recordEvidence('assert-toBeVisible-user-license-hub-download-license.spec-55', async () => expect(hub.downloadButton).toBeVisible());
    await recordEvidence('assert-toBeVisible-user-license-hub-download-license.spec-56', async () => expect(hub.emailButton).toBeVisible());
    await recordEvidence('assert-toBeVisible-user-license-hub-download-license.spec-57', async () => expect(hub.addLicenseButton).toBeVisible());
    // All three share parent container
    const parent = hub.downloadButton.locator('xpath=ancestor::div[1]');
    await recordEvidence('assert-toBeVisible-user-license-hub-download-license.spec-60', async () => expect(parent.getByRole('button', { name: /Send license file by email/i })).toBeVisible());
    await recordEvidence('assert-toBeVisible-user-license-hub-download-license.spec-61', async () => expect(parent.getByRole('button', { name: 'Add License' })).toBeVisible());
  });
});

test.describe('Profile Prerequisite', () => {
  let hub: UserLicenseHubPage;

  test.beforeEach(async ({ page }) => {
    hub = new UserLicenseHubPage(page);
    await hub.goto();
    await hub.restoreDefaultUserListState();
    await hub.restoreLicensePanelDefaultState();
  });

  test.afterEach(async () => {
    await hub.restoreLicensePanelDefaultState();
  });

  test('LIMAS-SUD-1164: Download button disabled when All Profiles active', async () => {
    await recordEvidence('assert-toBeDisabled-user-license-hub-download-license.spec-80', async () => expect(hub.downloadButton).toBeDisabled());
  });

  test('LIMAS-SUD-1165: Download disabled when no user explicitly selected', async () => {
    // Apply a specific Profile but do NOT select a user
    await hub.applySpecificProfileWithoutUserSelection();
    // Download should remain disabled (or enabled only if app auto-selects)
    // Record actual behavior
    const isDisabled = await hub.downloadButton.isDisabled();
    await recordEvidence('assert-toBeDefined-user-license-hub-download-license.spec-89', async () => expect(isDisabled).toBe(true));
  });

  test('LIMAS-SUD-1166: Download enabled after Profile AND user selection', async () => {
    await hub.applyRuntimeProfileForDownload();
    await hub.selectFirstVisibleUser();
    await recordEvidence('assert-toBeEnabled-user-license-hub-download-license.spec-95', async () => expect(hub.downloadButton).toBeEnabled());
  });

  test('LIMAS-SUD-1167: Specific Profile application enables Download', async ({ page }) => {
    await hub.selectFirstVisibleUser();
    // Verify disabled before
    await recordEvidence('assert-toBeDisabled-user-license-hub-download-license.spec-101', async () => expect(hub.downloadButton).toBeDisabled());
    // Apply Profile
    await hub.applyRuntimeProfileForDownload();
    await recordEvidence('assert-toBeEnabled-user-license-hub-download-license.spec-104', async () => expect(hub.downloadButton).toBeEnabled());
  });

  test('LIMAS-SUD-1168: Explicit user selection required for Download', async ({ page }) => {
    // Apply Profile first (without explicit user click)
    await hub.applySpecificProfileWithoutUserSelection();
    // Download may still be disabled without user selection
    const afterProfile = await hub.downloadButton.isDisabled();
    // Now click user card
    await hub.selectFirstVisibleUser();
    const afterUserSelect = await hub.downloadButton.isDisabled();
    // At least after user select, download should be enabled
    expect(afterProfile).toBe(true);
    {
      await recordEvidence('assert-toBe-user-license-hub-download-license.spec-117', async () => expect(afterUserSelect).toBe(false));
    }
  });

  test('LIMAS-SUD-1191: All Profiles cleared restores Download to disabled', async () => {
    await hub.applyRuntimeProfileForDownload();
    await hub.selectFirstVisibleUser();
    await recordEvidence('assert-toBeEnabled-user-license-hub-download-license.spec-124', async () => expect(hub.downloadButton).toBeEnabled());
    // Restore All Profiles
    await hub.restoreAllProfilesFilter();
    await recordEvidence('assert-toBeDisabled-user-license-hub-download-license.spec-127', async () => expect(hub.downloadButton).toBeDisabled());
  });

  test('LIMAS-SUD-1169: Email button disabled in baseline All Profiles state', async () => {
    await recordEvidence('assert-toBeDisabled-user-license-hub-download-license.spec-131', async () => expect(hub.emailButton).toBeDisabled());
  });

  test('LIMAS-SUD-1170: Email button enabled when user selected and Profile applied', async () => {
    await hub.applyRuntimeProfileForDownload();
    await hub.selectFirstVisibleUser();
    await recordEvidence('assert-toBeEnabled-user-license-hub-download-license.spec-137', async () => expect(hub.emailButton).toBeEnabled());
  });

  test('LIMAS-SUD-1171: Email visible but deeper functionality not currently available', async () => {
    await recordEvidence('assert-toBeVisible-user-license-hub-download-license.spec-141', async () => expect(hub.emailButton).toBeVisible());
    await recordEvidence('assert-toHaveAccessibleName-user-license-hub-download-license.spec-142', async () => expect(hub.emailButton).toHaveAccessibleName(/Send license file by email/i));
    // Deeper email functionality is not available — document, don't activate
  });

  test('LIMAS-SUD-1172: Add License button disabled in baseline state', async () => {
    await recordEvidence('assert-toBeDisabled-user-license-hub-download-license.spec-147', async () => expect(hub.addLicenseButton).toBeDisabled());
  });
});

test.describe('Baseline Download', () => {
  let hub: UserLicenseHubPage;
  let tmpDir: string;

  test.beforeEach(async ({ page }) => {
    hub = new UserLicenseHubPage(page);
    await hub.goto();
    await hub.restoreDefaultUserListState();
    await hub.restoreLicensePanelDefaultState();
    await hub.applyRuntimeProfileForDownload();
    await hub.selectFirstVisibleUser();
    tmpDir = createTempDownloadDir();
  });

  test.afterEach(async () => {
    cleanupTempDownloadDir(tmpDir);
    await hub.restoreLicensePanelDefaultState();
    await hub.restoreDefaultUserListState();
  });

  test('LIMAS-SUD-1173: Download sends GET to /api/license/enc/i/{userEmail}', async ({ page }) => {
    const respPromise = page.waitForResponse(
      resp => resp.request().method() === 'GET' && resp.url().includes('/api/license/enc/i/'),
      { timeout: 15000 }
    );
    const downloadPromise = page.waitForEvent('download', { timeout: 15000 });
    await recordEvidence('action-click-user-license-hub-download-license.spec-177', async () => hub.downloadButton.click());
    const resp = await respPromise;
    const download = await downloadPromise;
    await recordEvidence('assert-toBe-user-license-hub-download-license.spec-180', async () => expect(resp.request().method()).toBe('GET'));
    await recordEvidence('assert-toMatch-user-license-hub-download-license.spec-181', async () => expect(resp.url()).toMatch(/\/api\/license\/enc\/i\//));
  });

  test('LIMAS-SUD-1174: Download file is JSON with .xml extension', async ({ page }) => {
    const download = await hub.triggerDownloadAndCapture(page, tmpDir);
    await recordEvidence('assert-toMatch-user-license-hub-download-license.spec-186', async () => expect(download.suggestedFilename).toMatch(/\.xml$/));
    const content = fs.readFileSync(download.filePath, 'utf8');
    await recordEvidence('assert-toThrow-user-license-hub-download-license.spec-188', async () => expect(() => JSON.parse(content)).not.toThrow());
  });

  test('LIMAS-SUD-1175: Download file contains base64-encoded license data', async ({ page }) => {
    const download = await hub.triggerDownloadAndCapture(page, tmpDir);
    const content = fs.readFileSync(download.filePath, 'utf8');
    const parsed = JSON.parse(content);
    await recordEvidence('assert-toHaveProperty-user-license-hub-download-license.spec-195', async () => expect(parsed).toHaveProperty('license'));
    await recordEvidence('assert-toMatch-user-license-hub-download-license.spec-196', async () => expect(parsed.license).toMatch(/^[A-Za-z0-9+/=]+$/));
  });

  test('LIMAS-SUD-1176: Download filename follows pattern license_{userEmail}.xml', async ({ page }) => {
    const download = await hub.triggerDownloadAndCapture(page, tmpDir);
    const filename = download.suggestedFilename;
    await recordEvidence('assert-toMatch-user-license-hub-download-license.spec-202', async () => expect(filename).toMatch(/^license_.+\.xml$/));
    await recordEvidence('assert-toContain-user-license-hub-download-license.spec-203', async () => expect(filename).not.toContain('..'));
    await recordEvidence('assert-toContain-user-license-hub-download-license.spec-204', async () => expect(filename).not.toContain('/'));
    await recordEvidence('assert-toContain-user-license-hub-download-license.spec-205', async () => expect(filename).not.toContain('\\'));
  });

  test('LIMAS-SUD-1177: Download file size is greater than zero', async ({ page }) => {
    const download = await hub.triggerDownloadAndCapture(page, tmpDir);
    const stats = fs.statSync(download.filePath);
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-download-license.spec-211', async () => expect(stats.size).toBeGreaterThan(0));
    const minSize = parseInt(process.env.TEST_ULH_DOWNLOAD_MIN_FILE_SIZE_BYTES || '0', 10);
    if (minSize > 0) await recordEvidence('assert-toBeGreaterThanOrEqual-user-license-hub-download-license.spec-213', async () => expect(stats.size).toBeGreaterThanOrEqual(minSize));
  });

  test('LIMAS-SUD-1178: Download file is valid JSON parseable', async ({ page }) => {
    const download = await hub.triggerDownloadAndCapture(page, tmpDir);
    const content = fs.readFileSync(download.filePath, 'utf8');
    const parsed = JSON.parse(content);
    await recordEvidence('assert-toBe-user-license-hub-download-license.spec-220', async () => expect(typeof parsed).toBe('object'));
  });

  test('LIMAS-SUD-1179: Download file is not an HTML login or error page', async ({ page }) => {
    const download = await hub.triggerDownloadAndCapture(page, tmpDir);
    const content = fs.readFileSync(download.filePath, 'utf8').toLowerCase();
    await recordEvidence('assert-toContain-user-license-hub-download-license.spec-226', async () => expect(content).not.toContain('<!doctype'));
    await recordEvidence('assert-toContain-user-license-hub-download-license.spec-227', async () => expect(content).not.toContain('<html'));
    await recordEvidence('assert-toContain-user-license-hub-download-license.spec-228', async () => expect(content).not.toContain('login'));
    await recordEvidence('assert-toContain-user-license-hub-download-license.spec-229', async () => expect(content).not.toContain('error'));
  });

  test('LIMAS-SUD-1183: Download does not navigate away from users-licenses', async ({ page }) => {
    const downloadPromise = page.waitForEvent('download', { timeout: 15000 });
    await recordEvidence('action-click-user-license-hub-download-license.spec-234', async () => hub.downloadButton.click());
    await downloadPromise;
    await recordEvidence('assert-toContain-user-license-hub-download-license.spec-236', async () => expect(page.url()).toContain('/users-licenses'));
  });

  test('LIMAS-SUD-1184: Download preserves applied Profile after completion', async ({ page }) => {
    const downloadPromise = page.waitForEvent('download', { timeout: 15000 });
    await recordEvidence('action-click-user-license-hub-download-license.spec-241', async () => hub.downloadButton.click());
    await downloadPromise;
    // Filters badge should still show Profile applied
    const filtersText = await hub.licenseFiltersButton.textContent();
    await recordEvidence('assert-toMatch-user-license-hub-download-license.spec-245', async () => expect(filtersText).toMatch(/\d/));
  });

  test('LIMAS-SUD-1185: Download preserves selected user after completion', async ({ page }) => {
    const downloadPromise = page.waitForEvent('download', { timeout: 15000 });
    await recordEvidence('action-click-user-license-hub-download-license.spec-250', async () => hub.downloadButton.click());
    await downloadPromise;
    // User list should still show the selected user's licenses in the panel
    await recordEvidence('assert-toBeVisible-user-license-hub-download-license.spec-253', async () => expect(hub.getVisibleLicenseCards().first()).toBeVisible());
  });

  test('LIMAS-SUD-1186: No POST PUT PATCH DELETE during download', async ({ page }) => {
    const mutations: string[] = [];
    page.on('request', req => {
      if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method())) {
        mutations.push(req.method() + ' ' + req.url());
      }
    });
    const downloadPromise = page.waitForEvent('download', { timeout: 15000 });
    await recordEvidence('action-click-user-license-hub-download-license.spec-264', async () => hub.downloadButton.click());
    await downloadPromise;
    const realMutations = mutations.filter(m => !m.includes('protocol/openid-connect/token'));
    await recordEvidence('assert-toBe-user-license-hub-download-license.spec-267', async () => expect(realMutations.length).toBe(0));
  });

  test('LIMAS-SUD-1187: Downloaded file cleanup after validation', async ({ page }) => {
    const download = await hub.triggerDownloadAndCapture(page, tmpDir);
    await recordEvidence('assert-toBe-user-license-hub-download-license.spec-272', async () => expect(fs.existsSync(download.filePath)).toBe(true));
    fs.unlinkSync(download.filePath);
    await recordEvidence('assert-toBe-user-license-hub-download-license.spec-274', async () => expect(fs.existsSync(download.filePath)).toBe(false));
  });

  test('LIMAS-SUD-1188: Safe restoration after download scenario', async ({ page }) => {
    const downloadPromise = page.waitForEvent('download', { timeout: 15000 });
    await recordEvidence('action-click-user-license-hub-download-license.spec-279', async () => hub.downloadButton.click());
    await downloadPromise;
    await hub.clearLicenseSearch();
    await hub.restoreAllProfilesFilter();
    await hub.closeLicenseFilters();
    await hub.restoreLicensePanelDefaultState();
    await recordEvidence('assert-toHaveValue-user-license-hub-download-license.spec-285', async () => expect(hub.licenseSearchInput).toHaveValue(''));
    await recordEvidence('assert-toBeDisabled-user-license-hub-download-license.spec-286', async () => expect(hub.downloadButton).toBeDisabled());
    await recordEvidence('assert-toBeVisible-user-license-hub-download-license.spec-287', async () => expect(hub.getVisibleLicenseCards().first()).toBeVisible());
  });
});

test.describe('Duplicate Protection', () => {
  let hub: UserLicenseHubPage;
  let tmpDir: string;

  test.beforeEach(async ({ page }) => {
    hub = new UserLicenseHubPage(page);
    await hub.goto();
    await hub.restoreDefaultUserListState();
    await hub.restoreLicensePanelDefaultState();
    await hub.applyRuntimeProfileForDownload();
    await hub.selectFirstVisibleUser();
    tmpDir = createTempDownloadDir();
  });

  test.afterEach(async () => {
    cleanupTempDownloadDir(tmpDir);
    await hub.restoreLicensePanelDefaultState();
  });

  test('LIMAS-SUD-1180: One click produces exactly one download event', async ({ page }) => {
    let downloadCount = 0;
    page.on('download', () => { downloadCount++; });
    const downloaded = page.waitForEvent('download');
    await recordEvidence('action-click-user-license-hub-download-license.spec-313', async () => hub.downloadButton.click());
    await (await downloaded).failure();
    await page.waitForLoadState('networkidle');
    await recordEvidence('assert-toBe-user-license-hub-download-license.spec-315', async () => expect(downloadCount).toBe(1));
  });

  test('LIMAS-SUD-1181: Rapid double-click produces single download', async ({ page }) => {
    let downloadCount = 0;
    page.on('download', () => { downloadCount++; });
    await recordEvidence('action-click-user-license-hub-download-license.spec-321', async () => hub.downloadButton.click());
    await recordEvidence('action-click-user-license-hub-download-license.spec-322', async () => hub.downloadButton.click());
    await page.waitForTimeout(2000);
    await recordEvidence('assert-toBe-user-license-hub-download-license.spec-324', async () => expect(downloadCount).toBe(1));
  });

  test('LIMAS-SUD-1182: Second click after first does not duplicate', async ({ page }) => {
    let downloadCount = 0;
    page.on('download', () => { downloadCount++; });
    await recordEvidence('action-click-user-license-hub-download-license.spec-330', async () => hub.downloadButton.click());
    await page.waitForTimeout(2000);
    await recordEvidence('action-click-user-license-hub-download-license.spec-332', async () => hub.downloadButton.click());
    await page.waitForTimeout(2000);
    await recordEvidence('assert-toBe-user-license-hub-download-license.spec-334', async () => expect(downloadCount).toBe(1));
  });
});

test.describe('Download Scope', () => {
  let hub: UserLicenseHubPage;

  test.beforeEach(async ({ page }) => {
    hub = new UserLicenseHubPage(page);
    await hub.goto();
    await hub.restoreDefaultUserListState();
    await hub.restoreLicensePanelDefaultState();
    await hub.applyRuntimeProfileForDownload();
    await hub.selectFirstVisibleUser();
  });

  test.afterEach(async () => {
    await hub.clearLicenseSearch();
    await hub.restoreAllProfilesFilter();
    await hub.restoreLicensePanelDefaultState();
  });

  test('LIMAS-SUD-1189: HWID search with Profile active and Download enabled', async ({ page }) => {
    const hwId = await hub.getFirstVisibleHardwareId();
    await hub.setLicenseSearch(hwId);
    await hub.waitForUserListResponse();
    await recordEvidence('assert-toBeEnabled-user-license-hub-download-license.spec-360', async () => expect(hub.downloadButton).toBeEnabled());
  });

  test('LIMAS-SUD-1190: No-match HWID with Profile active and Download state', async ({ page }) => {
    const noMatchId = process.env.TEST_ULH_LICENSE_NO_MATCH_HARDWARE_ID || 'zzzNoMatch99999999';
    await hub.setLicenseSearch(noMatchId);
    await hub.waitForUserListResponse();
    const isDisabled = await hub.downloadButton.isDisabled();
    // Record actual behavior — both states are valid
    await recordEvidence('assert-toBeDefined-user-license-hub-download-license.spec-369', async () => expect(isDisabled).toBe(true));
  });
});

test.describe('Download Failures (Planned)', () => {
  // These tests are planned for controlled failure scenarios
  // Plan Status: Reviewed, Script Status: Not Started (requires failure fixtures)
  // Execution Status: Not Run

  test('LIMAS-SUD-1195: Download failure — unauthorized', async () => {
    test.skip(true, 'Requires controlled download-failure fixture');
  });

  test('LIMAS-SUD-1196: Download failure — server error', async () => {
    test.skip(true, 'Requires controlled download-failure fixture');
  });

  test('LIMAS-SUD-1197: Download failure — network interruption', async () => {
    test.skip(true, 'Requires controlled download-failure fixture');
  });

  test('LIMAS-SUD-1198: Download failure — empty file', async () => {
    test.skip(true, 'Requires controlled download-failure fixture');
  });

  test('LIMAS-SUD-1199: Download failure — invalid MIME type', async () => {
    test.skip(true, 'Requires controlled download-failure fixture');
  });

  test('LIMAS-SUD-1200: Download failure — missing filename', async () => {
    test.skip(true, 'Requires controlled download-failure fixture');
  });

  test('LIMAS-SUD-1201: Download failure — corrupted file', async () => {
    test.skip(true, 'Requires controlled download-failure fixture');
  });

  test('LIMAS-SUD-1202: Download failure — browser cancellation', async () => {
    test.skip(true, 'Requires controlled download-failure fixture');
  });
});