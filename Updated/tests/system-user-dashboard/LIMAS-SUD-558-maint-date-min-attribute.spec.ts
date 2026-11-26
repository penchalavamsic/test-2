import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Extend Dialog Maintenance and Sync', () => {
  test('LIMAS-SUD-558: New Maintenance Date Has Min Attribute', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-558-maint-date-min-attribute.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();
    const baseline = await flow.captureSearchBaseline();
    const card = dashboard.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER);
    const extendBtn = dashboard.getRecordExtendButton(card);
    await recordEvidence('action-click-LIMAS-SUD-558-maint-date-min-attribute.spec-15', async () => extendBtn.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-558-maint-date-min-attribute.spec-16', async () => expect(dashboard.extendLicenseDialog).toBeVisible());

    try {
      const min = await dashboard.getExtendDialogMaintenanceDateInput().getAttribute('min');
      await recordEvidence('assert-toBeTruthy-LIMAS-SUD-558-maint-date-min-attribute.spec-20', async () => expect(min).toBeTruthy());
      await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-558-maint-date-min-attribute.spec-21', async () => expect((min ?? '').length).toBeGreaterThan(0));
    } finally {
      await flow.clearAllExtensionInputs();
      await dashboard.closeExtendDialog();
      await recordEvidence('assert-toBeVisible-LIMAS-SUD-558-maint-date-min-attribute.spec-25', async () => expect(dashboard.extendLicenseDialog).not.toBeVisible());
      await flow.restoreDefaultFilterState();
    }
  });
});
