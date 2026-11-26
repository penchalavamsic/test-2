import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-081: should have complete data in every visible row', async ({ authenticatedPage, page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const loadedCount = await dashboard.getPendingRequestsLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-081-row-data-complete.spec-10', async () => expect(loadedCount).toBeGreaterThan(0));

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-081-row-data-complete.spec-12', async () => expect(dashboard.pendingRequestsFirstRow).toBeVisible());

    const rows = dashboard.pendingRequestsDataRows;
    const count = await rows.count();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-081-row-data-complete.spec-16', async () => expect(count).toBeGreaterThan(0));

    const datePattern = /^\d{1,2}\s+[A-Z][a-z]{2,3}\s+\d{4}$/;

    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);

      const nameParagraph = dashboard.getPendingRequestUserName(row);
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-081-row-data-complete.spec-24', async () => expect(nameParagraph).toBeVisible());
      await recordEvidence('assert-toBeEmpty-LIMAS-SUD-081-row-data-complete.spec-25', async () => expect(nameParagraph).not.toBeEmpty());

      const emailParagraph = dashboard.getPendingRequestUserEmail(row);
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-081-row-data-complete.spec-28', async () => expect(emailParagraph).toBeVisible());
      const emailText = ((await emailParagraph.textContent()) ?? '').trim();
      await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-081-row-data-complete.spec-30', async () => expect(emailText.length).toBeGreaterThan(0));
      await recordEvidence('assert-toContain-LIMAS-SUD-081-row-data-complete.spec-31', async () => expect(emailText).toContain('@'));

      const featureNameParagraph = dashboard.getPendingRequestFeatureName(row);
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-081-row-data-complete.spec-34', async () => expect(featureNameParagraph).toBeVisible());
      await recordEvidence('assert-toBeEmpty-LIMAS-SUD-081-row-data-complete.spec-35', async () => expect(featureNameParagraph).not.toBeEmpty());

      const versionParagraph = dashboard.getPendingRequestFeatureVersion(row);
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-081-row-data-complete.spec-38', async () => expect(versionParagraph).toBeVisible());
      const versionText = (await versionParagraph.textContent()) ?? '';
      await recordEvidence('assert-toMatch-LIMAS-SUD-081-row-data-complete.spec-40', async () => expect(versionText).toMatch(/Version\s+\d+\.\d+\.\d+/));

      const hwIdParagraph = dashboard.getPendingRequestHardwareId(row);
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-081-row-data-complete.spec-43', async () => expect(hwIdParagraph).toBeVisible());
      const hwIdText = ((await hwIdParagraph.textContent()) ?? '').trim();
      await recordEvidence('assert-toMatch-LIMAS-SUD-081-row-data-complete.spec-45', async () => expect(hwIdText).toMatch(/^-?\d+$/));

      const dateParagraph = dashboard.getPendingRequestCreatedDate(row);
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-081-row-data-complete.spec-48', async () => expect(dateParagraph).toBeVisible());
      const dateText = ((await dateParagraph.textContent()) ?? '').trim();
      await recordEvidence('assert-toMatch-LIMAS-SUD-081-row-data-complete.spec-50', async () => expect(dateText).toMatch(datePattern));

      const approveButton = dashboard.getPendingRequestApproveButton(row);
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-081-row-data-complete.spec-53', async () => expect(approveButton).toBeVisible());

      const deleteButton = dashboard.getPendingRequestDeleteButton(row);
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-081-row-data-complete.spec-56', async () => expect(deleteButton).toBeVisible());
    }
  });
});
