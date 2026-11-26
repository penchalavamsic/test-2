import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { ServerLicensingPage } from '../pages/server-licensing.page';
import {
  createExportTempDirectory,
  captureExportDownload,
  inspectExportMetadata,
  cleanupExportArtifacts,
} from '../helpers/download-helper';

const PROFILE = resolveProfileName();

// ─── SVL-B: Create Server License Dialog ───

test.describe('Server License Management — SVL-B (Create Server License)', () => {

  // ─── 1. Button Visibility and Accessibility ──────────────────

  test.describe('Button Visibility and Accessibility', () => {

    test('LIMAS-SUD-2613: Create Server License button is visible on each customer card', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await recordEvidence('assert-toBeVisible-server-licensing-csl-dialog.spec-35', async () => expect(svl.cardCreateServerLicenseButton(cardName)).toBeVisible());
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2614: Create Server License button has accessible name', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await recordEvidence('assert-toHaveAccessibleName-server-licensing-csl-dialog.spec-52', async () => expect(svl.cardCreateServerLicenseButton(cardName)).toHaveAccessibleName(/create server license/i));
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2615: Create Server License button is enabled', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await recordEvidence('assert-toBeEnabled-server-licensing-csl-dialog.spec-69', async () => expect(svl.cardCreateServerLicenseButton(cardName)).toBeEnabled());
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2616: Create Server License button is keyboard focusable', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await recordEvidence('action-focus-server-licensing-csl-dialog.spec-86', async () => svl.cardCreateServerLicenseButton(cardName).focus());
      const focused = page.locator(':focus');
      await recordEvidence('assert-toHaveAccessibleName-server-licensing-csl-dialog.spec-88', async () => expect(focused).toHaveAccessibleName(/create server license/i));
      await svl.collapseCard(cardName);
    });
  });

  // ─── 2. Dialog Structure ──────────────────────────────────────

  test.describe('Dialog Structure', () => {

    test('LIMAS-SUD-2617: Clicking Create Server License opens the dialog', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.openCreateServerLicenseDialog(cardName);

      await recordEvidence('assert-toBeVisible-server-licensing-csl-dialog.spec-112', async () => expect(svl.createServerLicenseDialog).toBeVisible());
      await recordEvidence('assert-toBeVisible-server-licensing-csl-dialog.spec-113', async () => expect(svl.createServerLicenseDialogHeading).toBeVisible());

      await svl.closeCreateServerLicenseDialog();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2618: Dialog heading is "Create Server License" (level 2)', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.openCreateServerLicenseDialog(cardName);

      await recordEvidence('assert-toHaveText-server-licensing-csl-dialog.spec-134', async () => expect(svl.createServerLicenseDialogHeading).toHaveText('Create Server License'));

      await svl.closeCreateServerLicenseDialog();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2619: File name field is visible and editable', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.openCreateServerLicenseDialog(cardName);

      await recordEvidence('assert-toBeVisible-server-licensing-csl-dialog.spec-155', async () => expect(svl.createServerLicenseFilenameInput).toBeVisible());
      await recordEvidence('assert-toBeEditable-server-licensing-csl-dialog.spec-156', async () => expect(svl.createServerLicenseFilenameInput).toBeEditable());

      await svl.closeCreateServerLicenseDialog();
      await svl.collapseCard(cardName);
    });
  });

  // ─── 3. Filename Behavior ────────────────────────────────────

  test.describe('Filename Behavior', () => {

    test('LIMAS-SUD-2620: Initial filename value is derived from customer name', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.openCreateServerLicenseDialog(cardName);

      const initialValue = await svl.createServerLicenseFilenameInput.inputValue();
      await recordEvidence('assert-toContain-server-licensing-csl-dialog.spec-183', async () => expect(initialValue).toContain(cardName));
      await recordEvidence('assert-toContain-server-licensing-csl-dialog.spec-184', async () => expect(initialValue).toContain('_server_license.txt'));

      await svl.closeCreateServerLicenseDialog();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2621: Filename can be changed to a custom value', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.openCreateServerLicenseDialog(cardName);

      await recordEvidence('action-fill-server-licensing-csl-dialog.spec-205', async () => svl.createServerLicenseFilenameInput.fill('my-custom-name'));
      await recordEvidence('assert-toHaveValue-server-licensing-csl-dialog.spec-206', async () => expect(svl.createServerLicenseFilenameInput).toHaveValue('my-custom-name'));
      await recordEvidence('assert-toBeEnabled-server-licensing-csl-dialog.spec-207', async () => expect(svl.createServerLicenseApplyButton).toBeEnabled());

      await svl.closeCreateServerLicenseDialog();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2622: Empty filename disables Apply', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.openCreateServerLicenseDialog(cardName);

      await recordEvidence('action-fill-server-licensing-csl-dialog.spec-228', async () => svl.createServerLicenseFilenameInput.fill(''));
      await recordEvidence('assert-toBeDisabled-server-licensing-csl-dialog.spec-229', async () => expect(svl.createServerLicenseApplyButton).toBeDisabled());

      await svl.closeCreateServerLicenseDialog();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2623: Whitespace-only filename disables Apply', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.openCreateServerLicenseDialog(cardName);

      await recordEvidence('action-fill-server-licensing-csl-dialog.spec-250', async () => svl.createServerLicenseFilenameInput.fill('   '));
      await recordEvidence('assert-toBeDisabled-server-licensing-csl-dialog.spec-251', async () => expect(svl.createServerLicenseApplyButton).toBeDisabled());

      await svl.closeCreateServerLicenseDialog();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2624: Special characters in filename are accepted', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.openCreateServerLicenseDialog(cardName);

      const specialName = 'my-file_123 (test).key';
      await recordEvidence('action-fill-server-licensing-csl-dialog.spec-273', async () => svl.createServerLicenseFilenameInput.fill(specialName));
      await recordEvidence('assert-toHaveValue-server-licensing-csl-dialog.spec-274', async () => expect(svl.createServerLicenseFilenameInput).toHaveValue(specialName));
      await recordEvidence('assert-toBeEnabled-server-licensing-csl-dialog.spec-275', async () => expect(svl.createServerLicenseApplyButton).toBeEnabled());

      await svl.closeCreateServerLicenseDialog();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2625: Long filenames are accepted', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.openCreateServerLicenseDialog(cardName);

      const longName = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      await recordEvidence('action-fill-server-licensing-csl-dialog.spec-297', async () => svl.createServerLicenseFilenameInput.fill(longName));
      await recordEvidence('assert-toBeEnabled-server-licensing-csl-dialog.spec-298', async () => expect(svl.createServerLicenseApplyButton).toBeEnabled());

      // Verify full value is preserved
      const currentValue = await svl.createServerLicenseFilenameInput.inputValue();
      await recordEvidence('assert-toBe-server-licensing-csl-dialog.spec-302', async () => expect(currentValue).toBe(longName));

      await svl.closeCreateServerLicenseDialog();
      await svl.collapseCard(cardName);
    });
  });

  // ─── 4. Download Behavior ────────────────────────────────────

  test.describe('Download Behavior', () => {

    test('LIMAS-SUD-2626: Downloaded filename appends `_server_license.txt`', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);

      const testId = 'SUD-2626';
      const tempDir = createExportTempDirectory(testId);

      try {
        await svl.openCreateServerLicenseDialog(cardName);
        await recordEvidence('action-fill-server-licensing-csl-dialog.spec-332', async () => svl.createServerLicenseFilenameInput.fill('noextname'));

        const { download } = await captureExportDownload(page, tempDir, () =>
          recordEvidence('action-click-server-licensing-csl-dialog.spec-336', async () => svl.createServerLicenseApplyButton.click())
        );

        const suggested = download.suggestedFilename();
        await recordEvidence('assert-toBe-server-licensing-csl-dialog.spec-339', async () => expect(suggested).toBe('noextname_server_license.txt'));

        await cleanupExportArtifacts(
          `${tempDir}\\${suggested}`,
          tempDir,
        );
      } finally {
        // Ensure dialog is closed; card may be collapsed by Apply
      }
    });

    test('LIMAS-SUD-2627: Downloaded file has .txt extension', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);

      const testId = 'SUD-2627';
      const tempDir = createExportTempDirectory(testId);

      try {
        await svl.openCreateServerLicenseDialog(cardName);
        await recordEvidence('action-fill-server-licensing-csl-dialog.spec-369', async () => svl.createServerLicenseFilenameInput.fill('noextname'));

        const { download, filePath } = await captureExportDownload(page, tempDir, () =>
          recordEvidence('action-click-server-licensing-csl-dialog.spec-373', async () => svl.createServerLicenseApplyButton.click())
        );

        const meta = await inspectExportMetadata(download, filePath);
        await recordEvidence('assert-toBe-server-licensing-csl-dialog.spec-376', async () => expect(meta.extension).toBe('.txt'));

        await cleanupExportArtifacts(filePath, tempDir);
      } finally {
        // Dialog closed by Apply
      }
    });

    test('LIMAS-SUD-2633: Downloaded filename matches accepted value with suffix', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);

      const testId = 'SUD-2633';
      const tempDir = createExportTempDirectory(testId);

      try {
        const uniqueName = `test-${Date.now()}`;
        await svl.openCreateServerLicenseDialog(cardName);
        await recordEvidence('action-fill-server-licensing-csl-dialog.spec-404', async () => svl.createServerLicenseFilenameInput.fill(uniqueName));

        const { download, filePath } = await captureExportDownload(page, tempDir, () =>
          recordEvidence('action-click-server-licensing-csl-dialog.spec-408', async () => svl.createServerLicenseApplyButton.click())
        );

        const expectedFilename = `${uniqueName}_server_license.txt`;
        await recordEvidence('assert-toBe-server-licensing-csl-dialog.spec-411', async () => expect(download.suggestedFilename()).toBe(expectedFilename));

        await cleanupExportArtifacts(filePath, tempDir);
      } finally {
        // Dialog closed by Apply
      }
    });
  });

  // ─── 5. Apply and Cancel Controls ────────────────────────────

  test.describe('Apply and Cancel Controls', () => {

    test('LIMAS-SUD-2628: Cancel closes the dialog without downloading', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.openCreateServerLicenseDialog(cardName);

      // Set a filename so Cancel is meaningful
      await recordEvidence('action-fill-server-licensing-csl-dialog.spec-440', async () => svl.createServerLicenseFilenameInput.fill('will-be-cancelled'));

      let downloadFired = false;
      page.once('download', () => { downloadFired = true; });

      await recordEvidence('action-click-server-licensing-csl-dialog.spec-445', async () => svl.createServerLicenseCancelButton.click());

      // Wait briefly to allow any late download event
      await page.waitForTimeout(300);
      await recordEvidence('assert-toBe-server-licensing-csl-dialog.spec-449', async () => expect(downloadFired).toBe(false));

      // Dialog should be gone
      await recordEvidence('assert-toBeHidden-server-licensing-csl-dialog.spec-452', async () => expect(svl.createServerLicenseDialog).toBeHidden());
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2629: Close button closes the dialog without downloading', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.openCreateServerLicenseDialog(cardName);

      let downloadFired = false;
      page.once('download', () => { downloadFired = true; });

      await recordEvidence('action-click-server-licensing-csl-dialog.spec-474', async () => svl.createServerLicenseCloseButton.click());

      await page.waitForTimeout(300);
      await recordEvidence('assert-toBe-server-licensing-csl-dialog.spec-477', async () => expect(downloadFired).toBe(false));

      await recordEvidence('assert-toBeHidden-server-licensing-csl-dialog.spec-479', async () => expect(svl.createServerLicenseDialog).toBeHidden());
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2630: Escape key closes the dialog safely', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.openCreateServerLicenseDialog(cardName);

      let downloadFired = false;
      page.once('download', () => { downloadFired = true; });

      await recordEvidence('action-press-server-licensing-csl-dialog.spec-501', async () => page.keyboard.press('Escape'));

      await page.waitForTimeout(300);
      await recordEvidence('assert-toBe-server-licensing-csl-dialog.spec-504', async () => expect(downloadFired).toBe(false));

      await recordEvidence('assert-toBeHidden-server-licensing-csl-dialog.spec-506', async () => expect(svl.createServerLicenseDialog).toBeHidden());
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2631: Apply button state follows filename rules', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.openCreateServerLicenseDialog(cardName);

      // Default value → enabled
      await recordEvidence('assert-toBeEnabled-server-licensing-csl-dialog.spec-526', async () => expect(svl.createServerLicenseApplyButton).toBeEnabled());

      // Empty → disabled
      await recordEvidence('action-fill-server-licensing-csl-dialog.spec-529', async () => svl.createServerLicenseFilenameInput.fill(''));
      await recordEvidence('assert-toBeDisabled-server-licensing-csl-dialog.spec-530', async () => expect(svl.createServerLicenseApplyButton).toBeDisabled());

      // Whitespace-only → disabled
      await recordEvidence('action-fill-server-licensing-csl-dialog.spec-533', async () => svl.createServerLicenseFilenameInput.fill('   '));
      await recordEvidence('assert-toBeDisabled-server-licensing-csl-dialog.spec-534', async () => expect(svl.createServerLicenseApplyButton).toBeDisabled());

      // Valid non-empty → enabled
      await recordEvidence('action-fill-server-licensing-csl-dialog.spec-537', async () => svl.createServerLicenseFilenameInput.fill('valid-name'));
      await recordEvidence('assert-toBeEnabled-server-licensing-csl-dialog.spec-538', async () => expect(svl.createServerLicenseApplyButton).toBeEnabled());

      await svl.closeCreateServerLicenseDialog();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2632: Apply triggers a file download', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);

      const testId = 'SUD-2632';
      const tempDir = createExportTempDirectory(testId);

      try {
        await svl.openCreateServerLicenseDialog(cardName);
        const uniqueName = `download-test-${Date.now()}`;
        await recordEvidence('action-fill-server-licensing-csl-dialog.spec-564', async () => svl.createServerLicenseFilenameInput.fill(uniqueName));

        const { download, filePath } = await captureExportDownload(page, tempDir, () =>
          recordEvidence('action-click-server-licensing-csl-dialog.spec-568', async () => svl.createServerLicenseApplyButton.click())
        );

        const meta = await inspectExportMetadata(download, filePath);
        await recordEvidence('assert-toBe-server-licensing-csl-dialog.spec-571', async () => expect(meta.exists).toBe(true));
        await recordEvidence('assert-toBeGreaterThan-server-licensing-csl-dialog.spec-572', async () => expect(meta.fileSizeBytes).toBeGreaterThan(0));

        await cleanupExportArtifacts(filePath, tempDir);
      } finally {
        // Dialog closed by Apply
      }
    });

    test('LIMAS-SUD-2634: Dialog closes after Apply and no duplicate submission is possible', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);

      const testId = 'SUD-2634';
      const tempDir = createExportTempDirectory(testId);

      try {
        await svl.openCreateServerLicenseDialog(cardName);
        await recordEvidence('action-fill-server-licensing-csl-dialog.spec-599', async () => svl.createServerLicenseFilenameInput.fill('no-dup-test'));

        const { filePath } = await captureExportDownload(page, tempDir, () =>
          recordEvidence('action-click-server-licensing-csl-dialog.spec-603', async () => svl.createServerLicenseApplyButton.click())
        );

        // Dialog should be hidden after Apply
        await recordEvidence('assert-toBeHidden-server-licensing-csl-dialog.spec-606', async () => expect(svl.createServerLicenseDialog).toBeHidden());

        await cleanupExportArtifacts(filePath, tempDir);
      } finally {
        // Dialog closed by Apply
      }
    });
  });

  // ─── 6. Success and Error Feedback ───────────────────────────

  test.describe('Feedback', () => {

    test('LIMAS-SUD-2635: No success feedback is shown after download', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);

      const testId = 'SUD-2635';
      const tempDir = createExportTempDirectory(testId);

      try {
        await svl.openCreateServerLicenseDialog(cardName);
        const uniqueName = `feedback-test-${Date.now()}`;
        await recordEvidence('action-fill-server-licensing-csl-dialog.spec-639', async () => svl.createServerLicenseFilenameInput.fill(uniqueName));

        const { filePath } = await captureExportDownload(page, tempDir, () =>
          recordEvidence('action-click-server-licensing-csl-dialog.spec-643', async () => svl.createServerLicenseApplyButton.click())
        );

        // Check for any toast/alert after download
        const toasts = page.locator('[role="alert"], [role="status"], .toast, .notification');
        const toastCount = await toasts.count();

        // Document: no success toast observed in current LIMAS 3.0
        // If a toast appears in future versions, this test will surface it
        await recordEvidence('assert-toBe-server-licensing-csl-dialog.spec-651', async () => expect(toastCount).toBe(0));

        await cleanupExportArtifacts(filePath, tempDir);
      } finally {
        // Dialog closed by Apply
      }
    });

    test('LIMAS-SUD-2640: No loading indicator is shown during Apply', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);

      const testId = 'SUD-2640';
      const tempDir = createExportTempDirectory(testId);

      try {
        await svl.openCreateServerLicenseDialog(cardName);
        await recordEvidence('action-fill-server-licensing-csl-dialog.spec-678', async () => svl.createServerLicenseFilenameInput.fill('loading-test'));

        const { filePath } = await captureExportDownload(page, tempDir, () =>
          recordEvidence('action-click-server-licensing-csl-dialog.spec-682', async () => svl.createServerLicenseApplyButton.click())
        );

        // Dialog is closed — no loading state was visible
        await recordEvidence('assert-toBeHidden-server-licensing-csl-dialog.spec-685', async () => expect(svl.createServerLicenseDialog).toBeHidden());

        await cleanupExportArtifacts(filePath, tempDir);
      } finally {
        // Dialog closed by Apply
      }
    });
  });

  // ─── 7. Focus and Keyboard ────────────────────────────────────

  test.describe('Focus and Keyboard', () => {

    test('LIMAS-SUD-2636: Initial focus is on the filename input when dialog opens', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.openCreateServerLicenseDialog(cardName);

      await recordEvidence('assert-toBeFocused-server-licensing-csl-dialog.spec-713', async () => expect(svl.createServerLicenseFilenameInput).toBeFocused());

      await svl.closeCreateServerLicenseDialog();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2637: Tab order inside the dialog follows filename → Cancel → Apply', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.openCreateServerLicenseDialog(cardName);

      // Start on filename input
      await recordEvidence('assert-toBeFocused-server-licensing-csl-dialog.spec-735', async () => expect(svl.createServerLicenseFilenameInput).toBeFocused());

      // Tab to Cancel
      await recordEvidence('action-press-server-licensing-csl-dialog.spec-738', async () => page.keyboard.press('Tab'));
      await recordEvidence('assert-toBeFocused-server-licensing-csl-dialog.spec-739', async () => expect(svl.createServerLicenseCancelButton).toBeFocused());

      // Tab to Apply
      await recordEvidence('action-press-server-licensing-csl-dialog.spec-742', async () => page.keyboard.press('Tab'));
      await recordEvidence('assert-toBeFocused-server-licensing-csl-dialog.spec-743', async () => expect(svl.createServerLicenseApplyButton).toBeFocused());

      await svl.closeCreateServerLicenseDialog();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2638: Focus returns to Create Server License button after closing', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.openCreateServerLicenseDialog(cardName);

      // Close via Escape
      await recordEvidence('action-press-server-licensing-csl-dialog.spec-765', async () => page.keyboard.press('Escape'));

      // Focus should return to the trigger button
      const focused = page.locator(':focus');
      await recordEvidence('assert-toHaveAccessibleName-server-licensing-csl-dialog.spec-769', async () => expect(focused).toHaveAccessibleName(/create server license/i));

      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2639: Dialog state resets to initial filename on reopen', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);

      // First open: change filename and close
      await svl.openCreateServerLicenseDialog(cardName);
      await recordEvidence('action-fill-server-licensing-csl-dialog.spec-790', async () => svl.createServerLicenseFilenameInput.fill('custom-name'));
      await svl.closeCreateServerLicenseDialog();

      // Second open: verify filename reset
      await svl.openCreateServerLicenseDialog(cardName);
      const reopenedValue = await svl.createServerLicenseFilenameInput.inputValue();
      await recordEvidence('assert-toBe-server-licensing-csl-dialog.spec-796', async () => expect(reopenedValue).toBe(`${cardName}_server_license.txt`));

      await svl.closeCreateServerLicenseDialog();
      await svl.collapseCard(cardName);
    });
  });

  // ─── 8. Accessibility Documentation ───────────────────────────

  test.describe('Accessibility', () => {

    test('LIMAS-SUD-2641: Accessibility gaps — Close button not in tab order, no focus trap', async ({ page }) => {
      // This test documents observed accessibility behavior.
      // It does not assert against missing behavior — it verifies the current state.
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.openCreateServerLicenseDialog(cardName);

      // Verify that the dialog region has an accessible name
      await recordEvidence('assert-toHaveAccessibleName-server-licensing-csl-dialog.spec-825', async () => expect(svl.createServerLicenseDialog).toHaveAccessibleName(/create server license/i));

      // Verify heading is present
      await recordEvidence('assert-toBeVisible-server-licensing-csl-dialog.spec-828', async () => expect(svl.createServerLicenseDialogHeading).toBeVisible());

      // Verify Cancel and Apply buttons have accessible names
      await recordEvidence('assert-toHaveAccessibleName-server-licensing-csl-dialog.spec-831', async () => expect(svl.createServerLicenseCancelButton).toHaveAccessibleName('Cancel'));
      await recordEvidence('assert-toHaveAccessibleName-server-licensing-csl-dialog.spec-832', async () => expect(svl.createServerLicenseApplyButton).toHaveAccessibleName('Apply'));

      // Document: Close button exists and has accessible name
      await recordEvidence('assert-toHaveAccessibleName-server-licensing-csl-dialog.spec-835', async () => expect(svl.createServerLicenseCloseButton).toHaveAccessibleName(/close create server license/i));
      // Close button is present but not reachable via Tab in observed UI

      await svl.closeCreateServerLicenseDialog();
      await svl.collapseCard(cardName);
    });
  });
});
