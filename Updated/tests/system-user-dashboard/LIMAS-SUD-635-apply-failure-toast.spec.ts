import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Extend Dialog Apply Extension', () => {
  test('LIMAS-SUD-635: Failure Toast Appears When Extension Fails', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-635-apply-failure-toast.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);
    // Read original dates before the modal hides the background from accessibility locators.
    const originalExpDate = await flow.readOriginalExpirationDate(card);
    const originalMaintDate = await flow.readOriginalMaintenanceDate(card);
    await recordEvidence('action-click-LIMAS-SUD-635-apply-failure-toast.spec-15', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-635-apply-failure-toast.spec-16', async () => expect(dashboard.extendLicenseDialog).toBeVisible());


    try {
      test.info().annotations.push({ type: 'simulation', description: 'Browser-route HTTP 500; extension PUT is intercepted and does not change server data.' });
      let intercepted = 0;
      await page.route(/\/api\/users(?:\?|$)/, async route => {
        if (route.request().method() === 'PUT') {
          intercepted++;
          await route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ message: 'Controlled test failure' }) });
        } else await route.continue();
      });
      await recordEvidence('action-fill-date-for-controlled-failure', () => dashboard.getExtendDialogExpirationDateInput().fill(baseline.data.TEST_EXTENSION_FUTURE_DATE));
      const responsePromise = page.waitForResponse(response => response.request().method() === 'PUT' && new URL(response.url()).pathname.endsWith('/api/users'));
      await recordEvidence('action-apply-controlled-failure', () => dashboard.getExtendDialogApplyButton().click());
      const response = await responsePromise;
      await recordEvidence('assert-controlled-failure-response', async () => { expect(response.status()).toBe(500); expect(intercepted).toBe(1); });
      await recordEvidence('assert-failure-toast-visible', () => expect(page.getByText('Update failed', { exact: true })).toBeVisible());
      await recordEvidence('assert-dialog-retained-on-failure', () => expect(dashboard.extendLicenseDialog).toBeVisible());
    } finally {
      await page.unroute(/\/api\/users(?:\?|$)/);
      if (await dashboard.extendLicenseDialog.isVisible().catch(() => false)) {
        await flow.clearAllExtensionInputs();
        await dashboard.closeExtendDialog();
      }
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-635-apply-failure-toast.spec-31', async () => expect(dashboard.extendLicenseDialog).not.toBeVisible());
      await flow.restoreDefaultFilterState();
    }
  });
});
