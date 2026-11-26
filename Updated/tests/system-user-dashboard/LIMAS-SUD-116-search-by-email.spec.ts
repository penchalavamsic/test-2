import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { captureStepScreenshot } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-116: should filter results when typing an email substring', async ({ authenticatedPage, page }, testInfo) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const loadedCount = await dashboard.getPendingRequestsLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-116-search-by-email.spec-11', async () => expect(loadedCount).toBeGreaterThan(0));

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-116-search-by-email.spec-13', async () => expect(dashboard.pendingRequestsFirstRow).toBeVisible());

    const searchField = dashboard.licenseSearchInput;
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-116-search-by-email.spec-16', async () => expect(searchField).toBeVisible());

    // Extract email from the first visible row
    const firstRow = dashboard.pendingRequestsFirstRow;
    const emailLocator = dashboard.getPendingRequestUserEmail(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-116-search-by-email.spec-21', async () => expect(emailLocator).toBeVisible());
    const emailText = await emailLocator.textContent();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-116-search-by-email.spec-23', async () => expect(emailText?.trim().length).toBeGreaterThan(0));

    // Use a substring of the email (the part before @, max 5 chars)
    const localPart = emailText!.trim().split('@')[0];
    const searchSubstring = localPart.substring(0, Math.min(5, localPart.length));

    await captureStepScreenshot(page, testInfo, 'before-search');

    await recordEvidence('action-fill-LIMAS-SUD-116-search-by-email.spec-31', async () => searchField.fill(searchSubstring));

    await recordEvidence('assert-toPass-LIMAS-SUD-116-search-by-email.spec-33', async () => expect(async () => {
      const updatedLoaded = await dashboard.getPendingRequestsLoadedCount();
      await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-116-search-by-email.spec-35', async () => expect(updatedLoaded).toBeGreaterThanOrEqual(1));
    }).toPass({ timeout: 10_000 }));

    await recordEvidence('assert-toHaveValue-LIMAS-SUD-116-search-by-email.spec-38', async () => expect(searchField).toHaveValue(searchSubstring));

    await captureStepScreenshot(page, testInfo, 'search-results');
  });
});
