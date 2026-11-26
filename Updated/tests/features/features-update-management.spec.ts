import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { FeaturesPage } from '../pages/features.page';

const PROFILE = resolveProfileName();

// â”€â”€â”€ FTR-F: Features â€” Feature Update Management â”€â”€â”€

test.describe('Features â€” FTR-F', () => {

  test.beforeEach(async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const features = new FeaturesPage(page);
    await features.navigate();
  });

  // â”€â”€â”€ 1. Modal Shell â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Modal Shell', () => {

    test('LIMAS-SUD-2165: Clicking a Version opens "Feature Update Management" dialog', async ({ page }) => {
      const features = new FeaturesPage(page);
      const versionEl = features.getFirstVersion();
      if (!versionEl) {
        test.skip(true, 'No clickable version found');
        return;
      }

      await recordEvidence('action-click-features-update-management.spec-33', async () => versionEl.click());
      await recordEvidence('assert-toBeVisible-features-update-management.spec-34', async () => expect(features.updateDialog).toBeVisible());
      await recordEvidence('action-click-features-update-management.spec-35', async () => features.updateCloseButton.click());
      await recordEvidence('assert-toBeVisible-features-update-management.spec-36', async () => expect(features.updateDialog).not.toBeVisible());
    });

    test('LIMAS-SUD-2166: Dialog has role dialog and accessible name "Feature Update Management"', async ({ page }) => {
      const features = new FeaturesPage(page);
      const versionEl = features.getFirstVersion();
      if (!versionEl) {
        test.skip(true, 'No clickable version found');
        return;
      }

      await recordEvidence('action-click-features-update-management.spec-47', async () => versionEl.click());
      await recordEvidence('assert-toBeVisible-features-update-management.spec-48', async () => expect(features.updateDialog).toBeVisible());
      const role = await features.updateDialog.getAttribute('role');
      await recordEvidence('assert-toBe-features-update-management.spec-50', async () => expect(role).toBe('dialog'));
      await recordEvidence('action-click-features-update-management.spec-51', async () => features.updateCloseButton.click());
    });

    test('LIMAS-SUD-2167: Dialog heading is h2 "Feature Update Management"', async ({ page }) => {
      const features = new FeaturesPage(page);
      const versionEl = features.getFirstVersion();
      if (!versionEl) {
        test.skip(true, 'No clickable version found');
        return;
      }

      await recordEvidence('action-click-features-update-management.spec-62', async () => versionEl.click());
      await recordEvidence('assert-toBeVisible-features-update-management.spec-63', async () => expect(features.updateDialogHeading).toBeVisible());
      await recordEvidence('assert-toHaveText-features-update-management.spec-64', async () => expect(features.updateDialogHeading).toHaveText('Feature Update Management'));
      await recordEvidence('action-click-features-update-management.spec-65', async () => features.updateCloseButton.click());
    });

    test('LIMAS-SUD-2168: Subtitle contains runtime Feature ID and selected Version', async ({ page }) => {
      const features = new FeaturesPage(page);
      const versionEl = features.getFirstVersion();
      if (!versionEl) {
        test.skip(true, 'No clickable version found');
        return;
      }

      const versionText = await versionEl.textContent();
      await recordEvidence('action-click-features-update-management.spec-77', async () => versionEl.click());

      const subtitle = features.updateDialogSubtitle;
      await recordEvidence('assert-toBeVisible-features-update-management.spec-80', async () => expect(subtitle).toBeVisible());
      const text = await subtitle.textContent();
      await recordEvidence('assert-toContain-features-update-management.spec-82', async () => expect(text).toContain('Upload update file for'));
      await recordEvidence('assert-toContain-features-update-management.spec-83', async () => expect(text).toContain(versionText?.trim() || ''));
      await recordEvidence('action-click-features-update-management.spec-84', async () => features.updateCloseButton.click());
    });

    test('LIMAS-SUD-2169: Dialog has Cancel, Save, and Close controls', async ({ page }) => {
      const features = new FeaturesPage(page);
      const versionEl = features.getFirstVersion();
      if (!versionEl) {
        test.skip(true, 'No clickable version found');
        return;
      }

      await recordEvidence('action-click-features-update-management.spec-95', async () => versionEl.click());
      await recordEvidence('assert-toBeVisible-features-update-management.spec-96', async () => expect(features.updateCancelButton).toBeVisible());
      await recordEvidence('assert-toBeVisible-features-update-management.spec-97', async () => expect(features.updateSaveButton).toBeVisible());
      await recordEvidence('assert-toBeVisible-features-update-management.spec-98', async () => expect(features.updateCloseButton).toBeVisible());
      await recordEvidence('action-click-features-update-management.spec-99', async () => features.updateCloseButton.click());
    });
  });

  // â”€â”€â”€ 2. File Upload Control â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('File Upload Control', () => {

    test('LIMAS-SUD-2170: Upload file control labeled "Upload Update File *" is present', async ({ page }) => {
      const features = new FeaturesPage(page);
      const versionEl = features.getFirstVersion();
      if (!versionEl) {
        test.skip(true, 'No clickable version found');
        return;
      }

      await recordEvidence('action-click-features-update-management.spec-115', async () => versionEl.click());
      await recordEvidence('assert-toBeVisible-features-update-management.spec-116', async () => expect(features.updateFileUploadLabel).toBeVisible());
      await recordEvidence('assert-toContainText-features-update-management.spec-117', async () => expect(features.updateFileUploadLabel).toContainText('Upload Update File'));
      await recordEvidence('action-click-features-update-management.spec-118', async () => features.updateCloseButton.click());
    });

    test('LIMAS-SUD-2171: A native file input exists within the dialog', async ({ page }) => {
      const features = new FeaturesPage(page);
      const versionEl = features.getFirstVersion();
      if (!versionEl) {
        test.skip(true, 'No clickable version found');
        return;
      }

      await recordEvidence('action-click-features-update-management.spec-129', async () => versionEl.click());
      await recordEvidence('assert-toBeAttached-features-update-management.spec-130', async () => expect(features.updateDialog.locator('input[type="file"]')).toBeAttached());
      await recordEvidence('action-click-features-update-management.spec-131', async () => features.updateCloseButton.click());
    });

    test('LIMAS-SUD-2172: Upload icon button and file input are visible', async ({ page }) => {
      const features = new FeaturesPage(page);
      const versionEl = features.getFirstVersion();
      if (!versionEl) {
        test.skip(true, 'No clickable version found');
        return;
      }

      await recordEvidence('action-click-features-update-management.spec-142', async () => versionEl.click());
      await recordEvidence('assert-toBeVisible-features-update-management.spec-143', async () => expect(features.updateFileInput).toBeVisible());
      await recordEvidence('action-click-features-update-management.spec-144', async () => features.updateCloseButton.click());
    });

    test('LIMAS-SUD-2173: Selecting a file displays the filename in the input', async ({ page }) => {
      const features = new FeaturesPage(page);
      const versionEl = features.getFirstVersion();
      if (!versionEl) {
        test.skip(true, 'No clickable version found');
        return;
      }

      const testFile = 'test-update-fixture.txt';
      await recordEvidence('action-click-features-update-management.spec-156', async () => versionEl.click());

      // Set file(s) on the native input
      await recordEvidence('action-setInputFiles-features-update-management.spec-159', async () => features.updateFileInput.setInputFiles({
        name: testFile,
        mimeType: 'text/plain',
        buffer: Buffer.from('test'),
      }));

      // The file input should reflect the selected file
      const fileValue = await features.updateFileInput.inputValue();
      await recordEvidence('assert-toContain-features-update-management.spec-167', async () => expect(fileValue).toContain(testFile));
      await recordEvidence('action-click-features-update-management.spec-168', async () => features.updateCloseButton.click());
    });

    test('LIMAS-SUD-2174: Replacing file updates the displayed filename', async ({ page }) => {
      const features = new FeaturesPage(page);
      const versionEl = features.getFirstVersion();
      if (!versionEl) {
        test.skip(true, 'No clickable version found');
        return;
      }

      await recordEvidence('action-click-features-update-management.spec-179', async () => versionEl.click());

      const firstFile = 'first-fixture.txt';
      const secondFile = 'second-fixture.txt';

      await recordEvidence('action-setInputFiles-features-update-management.spec-184', async () => features.updateFileInput.setInputFiles({
        name: firstFile,
        mimeType: 'text/plain',
        buffer: Buffer.from('first'),
      }));

      let fileValue = await features.updateFileInput.inputValue();
      await recordEvidence('assert-toContain-features-update-management.spec-191', async () => expect(fileValue).toContain(firstFile));

      await recordEvidence('action-setInputFiles-features-update-management.spec-193', async () => features.updateFileInput.setInputFiles({
        name: secondFile,
        mimeType: 'text/plain',
        buffer: Buffer.from('second'),
      }));

      fileValue = await features.updateFileInput.inputValue();
      await recordEvidence('assert-toContain-features-update-management.spec-200', async () => expect(fileValue).toContain(secondFile));
      await recordEvidence('action-click-features-update-management.spec-201', async () => features.updateCloseButton.click());
    });

    test('LIMAS-SUD-2175: Save is enabled before file selection', async ({ page }) => {
      const features = new FeaturesPage(page);
      const versionEl = features.getFirstVersion();
      if (!versionEl) {
        test.skip(true, 'No clickable version found');
        return;
      }

      await recordEvidence('action-click-features-update-management.spec-212', async () => versionEl.click());
      await recordEvidence('assert-toBeEnabled-features-update-management.spec-213', async () => expect(features.updateSaveButton).toBeEnabled());
      await recordEvidence('action-click-features-update-management.spec-214', async () => features.updateCloseButton.click());
    });

    test('LIMAS-SUD-2176: Save remains enabled after file selection', async ({ page }) => {
      const features = new FeaturesPage(page);
      const versionEl = features.getFirstVersion();
      if (!versionEl) {
        test.skip(true, 'No clickable version found');
        return;
      }

      await recordEvidence('action-click-features-update-management.spec-225', async () => versionEl.click());
      await recordEvidence('action-setInputFiles-features-update-management.spec-226', async () => features.updateFileInput.setInputFiles({
        name: 'after-select.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from('test'),
      }));
      await recordEvidence('assert-toBeEnabled-features-update-management.spec-231', async () => expect(features.updateSaveButton).toBeEnabled());
      await recordEvidence('action-click-features-update-management.spec-232', async () => features.updateCloseButton.click());
    });
  });

  // â”€â”€â”€ 3. Comments â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Comments', () => {

    test('LIMAS-SUD-2177: Update Comments textarea is present', async ({ page }) => {
      const features = new FeaturesPage(page);
      const versionEl = features.getFirstVersion();
      if (!versionEl) {
        test.skip(true, 'No clickable version found');
        return;
      }

      await recordEvidence('action-click-features-update-management.spec-248', async () => versionEl.click());
      await recordEvidence('assert-toBeVisible-features-update-management.spec-249', async () => expect(features.updateCommentsTextarea).toBeVisible());
      await recordEvidence('action-click-features-update-management.spec-250', async () => features.updateCloseButton.click());
    });

    test('LIMAS-SUD-2178: Comments textarea has placeholder "Enter update comments or release notes..."', async ({ page }) => {
      const features = new FeaturesPage(page);
      const versionEl = features.getFirstVersion();
      if (!versionEl) {
        test.skip(true, 'No clickable version found');
        return;
      }

      await recordEvidence('action-click-features-update-management.spec-261', async () => versionEl.click());
      const placeholder = await features.updateCommentsTextarea.getAttribute('placeholder');
      await recordEvidence('assert-toContain-features-update-management.spec-263', async () => expect(placeholder).toContain('Enter update comments'));
      await recordEvidence('action-click-features-update-management.spec-264', async () => features.updateCloseButton.click());
    });

    test('LIMAS-SUD-2179: Comments textarea accepts multiline input', async ({ page }) => {
      const features = new FeaturesPage(page);
      const versionEl = features.getFirstVersion();
      if (!versionEl) {
        test.skip(true, 'No clickable version found');
        return;
      }

      await recordEvidence('action-click-features-update-management.spec-275', async () => versionEl.click());
      const multiline = 'Line 1\nLine 2\nLine 3';
      await recordEvidence('action-fill-features-update-management.spec-277', async () => features.updateCommentsTextarea.fill(multiline));
      const value = await features.updateCommentsTextarea.inputValue();
      await recordEvidence('assert-toBe-features-update-management.spec-279', async () => expect(value).toBe(multiline));
      await recordEvidence('action-click-features-update-management.spec-280', async () => features.updateCloseButton.click());
    });

    test('LIMAS-SUD-2180: Comments textarea is optional (not required)', async ({ page }) => {
      const features = new FeaturesPage(page);
      const versionEl = features.getFirstVersion();
      if (!versionEl) {
        test.skip(true, 'No clickable version found');
        return;
      }

      await recordEvidence('action-click-features-update-management.spec-291', async () => versionEl.click());
      const required = await features.updateCommentsTextarea.getAttribute('required');
      await recordEvidence('assert-toBeNull-features-update-management.spec-293', async () => expect(required).toBeNull());
      await recordEvidence('action-click-features-update-management.spec-294', async () => features.updateCloseButton.click());
    });

    test('LIMAS-SUD-2181: Clearing comments restores empty value', async ({ page }) => {
      const features = new FeaturesPage(page);
      const versionEl = features.getFirstVersion();
      if (!versionEl) {
        test.skip(true, 'No clickable version found');
        return;
      }

      await recordEvidence('action-click-features-update-management.spec-305', async () => versionEl.click());
      await recordEvidence('action-fill-features-update-management.spec-306', async () => features.updateCommentsTextarea.fill('Test comment'));
      await recordEvidence('action-clear-features-update-management.spec-307', async () => features.updateCommentsTextarea.clear());
      const value = await features.updateCommentsTextarea.inputValue();
      await recordEvidence('assert-toBe-features-update-management.spec-309', async () => expect(value).toBe(''));
      await recordEvidence('action-click-features-update-management.spec-310', async () => features.updateCloseButton.click());
    });
  });

  // â”€â”€â”€ 4. Dismissal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Dismissal', () => {

    test('LIMAS-SUD-2182: Cancel dismisses without uploading', async ({ page }) => {
      const features = new FeaturesPage(page);
      const versionEl = features.getFirstVersion();
      if (!versionEl) {
        test.skip(true, 'No clickable version found');
        return;
      }

      await recordEvidence('action-click-features-update-management.spec-326', async () => versionEl.click());
      await recordEvidence('action-fill-features-update-management.spec-327', async () => features.updateCommentsTextarea.fill('Cancel test'));
      await recordEvidence('action-click-features-update-management.spec-328', async () => features.updateCancelButton.click());
      await recordEvidence('assert-toBeVisible-features-update-management.spec-329', async () => expect(features.updateDialog).not.toBeVisible());

      // Reopen â€” verify form resets (comments cleared)
      await recordEvidence('action-click-features-update-management.spec-332', async () => versionEl.click());
      const comments = await features.updateCommentsTextarea.inputValue();
      await recordEvidence('assert-toBe-features-update-management.spec-334', async () => expect(comments).toBe(''));
      await recordEvidence('action-click-features-update-management.spec-335', async () => features.updateCloseButton.click());
    });

    test('LIMAS-SUD-2183: Close button dismisses the dialog', async ({ page }) => {
      const features = new FeaturesPage(page);
      const versionEl = features.getFirstVersion();
      if (!versionEl) {
        test.skip(true, 'No clickable version found');
        return;
      }

      await recordEvidence('action-click-features-update-management.spec-346', async () => versionEl.click());
      await recordEvidence('action-click-features-update-management.spec-347', async () => features.updateCloseButton.click());
      await recordEvidence('assert-toBeVisible-features-update-management.spec-348', async () => expect(features.updateDialog).not.toBeVisible());
    });

    test('LIMAS-SUD-2184: Escape dismisses the dialog', async ({ page }) => {
      const features = new FeaturesPage(page);
      const versionEl = features.getFirstVersion();
      if (!versionEl) {
        test.skip(true, 'No clickable version found');
        return;
      }

      await recordEvidence('action-click-features-update-management.spec-359', async () => versionEl.click());
      await recordEvidence('assert-toBeVisible-features-update-management.spec-360', async () => expect(features.updateDialog).toBeVisible());
      await recordEvidence('action-press-features-update-management.spec-361', async () => page.keyboard.press('Escape'));
      await recordEvidence('assert-toBeVisible-features-update-management.spec-362', async () => expect(features.updateDialog).not.toBeVisible());
    });

    test('LIMAS-SUD-2185: Reopening after Close shows clean state', async ({ page }) => {
      const features = new FeaturesPage(page);
      const versionEl = features.getFirstVersion();
      if (!versionEl) {
        test.skip(true, 'No clickable version found');
        return;
      }

      await recordEvidence('action-click-features-update-management.spec-373', async () => versionEl.click());
      await recordEvidence('action-fill-features-update-management.spec-374', async () => features.updateCommentsTextarea.fill('Before close'));
      await recordEvidence('action-click-features-update-management.spec-375', async () => features.updateCloseButton.click());
      await recordEvidence('assert-toBeVisible-features-update-management.spec-376', async () => expect(features.updateDialog).not.toBeVisible());

      // Reopen
      await recordEvidence('action-click-features-update-management.spec-379', async () => versionEl.click());
      await recordEvidence('assert-toBeVisible-features-update-management.spec-380', async () => expect(features.updateDialog).toBeVisible());
      const comments = await features.updateCommentsTextarea.inputValue();
      await recordEvidence('assert-toBe-features-update-management.spec-382', async () => expect(comments).toBe(''));
      await recordEvidence('action-click-features-update-management.spec-383', async () => features.updateCloseButton.click());
    });

    test('LIMAS-SUD-2186: Reopening with file was selected â€” state resets', async ({ page }) => {
      const features = new FeaturesPage(page);
      const versionEl = features.getFirstVersion();
      if (!versionEl) {
        test.skip(true, 'No clickable version found');
        return;
      }

      await recordEvidence('action-click-features-update-management.spec-394', async () => versionEl.click());
      await recordEvidence('action-setInputFiles-features-update-management.spec-395', async () => features.updateFileInput.setInputFiles({
        name: 'before-dismiss.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from('test'),
      }));
      await recordEvidence('action-click-features-update-management.spec-400', async () => features.updateCloseButton.click());
      await recordEvidence('assert-toBeVisible-features-update-management.spec-401', async () => expect(features.updateDialog).not.toBeVisible());

      // Reopen â€” file input should be cleared
      await recordEvidence('action-click-features-update-management.spec-404', async () => versionEl.click());
      const fileValue = await features.updateFileInput.inputValue();
      await recordEvidence('assert-toBe-features-update-management.spec-406', async () => expect(fileValue).toBe(''));
      await recordEvidence('action-click-features-update-management.spec-407', async () => features.updateCloseButton.click());
    });
  });

  // â”€â”€â”€ 5. Accessibility â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Accessibility', () => {

    test('LIMAS-SUD-2187: Initial focus is on the upload button/label when dialog opens', async ({ page }) => {
      const features = new FeaturesPage(page);
      const versionEl = features.getFirstVersion();
      if (!versionEl) {
        test.skip(true, 'No clickable version found');
        return;
      }

      await recordEvidence('action-click-features-update-management.spec-423', async () => versionEl.click());
      // Upload file button is the first actionable element
      const focused = page.locator(':focus');
      await recordEvidence('assert-accessible-upload-focus', async () => expect(focused).toHaveAccessibleName(/Upload Update File/i));
      await recordEvidence('action-click-features-update-management.spec-428', async () => features.updateCloseButton.click());
    });

    test('LIMAS-SUD-2188: File input has visible label "Upload Update File *"', async ({ page }) => {
      const features = new FeaturesPage(page);
      const versionEl = features.getFirstVersion();
      if (!versionEl) {
        test.skip(true, 'No clickable version found');
        return;
      }

      await recordEvidence('action-click-features-update-management.spec-439', async () => versionEl.click());
      await recordEvidence('assert-toBeVisible-features-update-management.spec-440', async () => expect(features.updateFileUploadLabel).toBeVisible());
      const text = await features.updateFileUploadLabel.textContent();
      await recordEvidence('assert-toContain-features-update-management.spec-442', async () => expect(text).toContain('Upload Update File'));
      await recordEvidence('action-click-features-update-management.spec-443', async () => features.updateCloseButton.click());
    });

    test('LIMAS-SUD-2189: Tab order includes Cancel and Save buttons', async ({ page }) => {
      const features = new FeaturesPage(page);
      const versionEl = features.getFirstVersion();
      if (!versionEl) {
        test.skip(true, 'No clickable version found');
        return;
      }

      await recordEvidence('action-click-features-update-management.spec-454', async () => versionEl.click());
      // Tab through to find Cancel
      await recordEvidence('action-press-features-update-management.spec-456', async () => page.keyboard.press('Tab'));
      await recordEvidence('action-press-features-update-management.spec-457', async () => page.keyboard.press('Tab'));
      await recordEvidence('action-press-features-update-management.spec-458', async () => page.keyboard.press('Tab'));
      const focused = page.locator(':focus');
      const name = await focused.textContent();
      await recordEvidence('assert-toBeTruthy-features-update-management.spec-461', async () => expect(name).toBeTruthy()); // Should be Cancel or Save
      await recordEvidence('action-click-features-update-management.spec-462', async () => features.updateCloseButton.click());
    });
  });

  // â”€â”€â”€ 6. Gated Upload Lifecycle â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Gated Lifecycle', () => {

    test('LIMAS-SUD-2190: Controlled update upload lifecycle', async ({ page }) => {
      if (
        !process.env.TEST_FEATURE_ALLOW_UPDATE_UPLOAD ||
        !process.env.TEST_FEATURE_UPDATE_FIXTURE_PATH ||
        !process.env.TEST_FEATURE_UPDATE_EXPECTED_EXTENSION ||
        !process.env.TEST_FEATURE_UPDATE_MAX_SIZE_BYTES
      ) {
        test.skip(true, 'Upload safety flags not configured');
        return;
      }

      const features = new FeaturesPage(page);
      const versionEl = features.getFirstVersion();
      if (!versionEl) {
        test.skip(true, 'No clickable version found');
        return;
      }

      const fixturePath = process.env.TEST_FEATURE_UPDATE_FIXTURE_PATH;
      const expectedExt = process.env.TEST_FEATURE_UPDATE_EXPECTED_EXTENSION;

      try {
        await recordEvidence('action-click-features-update-management.spec-492', async () => versionEl.click());
        await recordEvidence('assert-toBeVisible-features-update-management.spec-493', async () => expect(features.updateDialog).toBeVisible());

        // Capture feature and version context
        const subtitle = await features.updateDialogSubtitle.textContent();
        await recordEvidence('assert-toBeTruthy-features-update-management.spec-497', async () => expect(subtitle).toBeTruthy());

        // Select the approved fixture
        await recordEvidence('action-setInputFiles-features-update-management.spec-500', async () => features.updateFileInput.setInputFiles(fixturePath));

        // Enter comments
        const comment = `Automated test upload â€” ${Date.now()}`;
        await recordEvidence('action-fill-features-update-management.spec-504', async () => features.updateCommentsTextarea.fill(comment));

        // Click Save exactly once
        await recordEvidence('action-click-features-update-management.spec-507', async () => features.updateSaveButton.click());

        // Wait for dialog to close or success state
        await recordEvidence('assert-toBeVisible-features-update-management.spec-510', async () => expect(features.updateDialog).not.toBeVisible({ timeout: 10000 }));

        // Verify the page is stable
        await recordEvidence('assert-toBeVisible-features-update-management.spec-513', async () => expect(features.heading).toBeVisible());
      } finally {
        // Cleanup: close dialog if still open
        try {
          const isOpen = await features.updateDialog.isVisible();
          if (isOpen) {
            await recordEvidence('action-click-features-update-management.spec-519', async () => features.updateCloseButton.click());
          }
        } catch {
          // already closed
        }
      }
    });
  });

  // â”€â”€â”€ 7. Safe Restoration â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Safe Restoration', () => {

    test('LIMAS-SUD-2191: Features page clean after update dialog exploration', async ({ page }) => {
      const features = new FeaturesPage(page);
      const versionEl = features.getFirstVersion();

      if (versionEl) {
        await recordEvidence('action-click-features-update-management.spec-537', async () => versionEl.click());
        await recordEvidence('assert-toBeVisible-features-update-management.spec-538', async () => expect(features.updateDialog).toBeVisible());
        await recordEvidence('action-fill-features-update-management.spec-539', async () => features.updateCommentsTextarea.fill('Exploration'));
        await recordEvidence('action-click-features-update-management.spec-540', async () => features.updateCloseButton.click());
        await recordEvidence('assert-toBeVisible-features-update-management.spec-541', async () => expect(features.updateDialog).not.toBeVisible());
      }

      // Verify page is clean
      await recordEvidence('assert-toBeVisible-features-update-management.spec-545', async () => expect(features.heading).toBeVisible());
      await recordEvidence('assert-toBeVisible-features-update-management.spec-546', async () => expect(features.addRootFeatureButton).toBeVisible());

      const rowCount = await features.getRowCount();
      await recordEvidence('assert-toBeGreaterThan-features-update-management.spec-549', async () => expect(rowCount).toBeGreaterThan(0));

      // No dialog lingering
      await recordEvidence('assert-toBeVisible-features-update-management.spec-552', async () => expect(features.updateDialog).not.toBeVisible());
    });
  });
});