import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-352: Clearing Partial Entry Resets Field', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-352-expiring-partial-input-clear-resets-field.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    try {
      await dashboard.stepExpiresBeforeFirstSegment();
      await flow.clearExpiresBeforeDate();
      await recordEvidence('assert-toBe-LIMAS-SUD-352-expiring-partial-input-clear-resets-field.spec-16', async () => expect(await dashboard.isExpiresBeforeBadInput()).toBe(false));
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
