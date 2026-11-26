import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-349: Partial Segment Entry Leaves Value Empty', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-349-expiring-partial-input-leaves-value-empty.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    try {
      await dashboard.stepExpiresBeforeFirstSegment();
      await recordEvidence('assert-toHaveValue-LIMAS-SUD-349-expiring-partial-input-leaves-value-empty.spec-15', async () => expect(dashboard.expiresBeforeInput).toHaveValue(''));
      await recordEvidence('assert-toBe-LIMAS-SUD-349-expiring-partial-input-leaves-value-empty.spec-16', async () => expect(await dashboard.isExpiresBeforeBadInput()).toBe(true));
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
