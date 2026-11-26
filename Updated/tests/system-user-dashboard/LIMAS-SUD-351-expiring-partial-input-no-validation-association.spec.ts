import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard - Expiring Licenses Filter and Expires Before', () => {
  test('LIMAS-SUD-351: Partial Entry Shows No Associated Validation Message', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-351-expiring-partial-input-no-validation-association.spec-7', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    try {
      await dashboard.stepExpiresBeforeFirstSegment();
      await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-351-expiring-partial-input-no-validation-association.spec-15', async () => expect(dashboard.expiresBeforeInput).not.toHaveAttribute('aria-invalid', 'true'));
      await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-351-expiring-partial-input-no-validation-association.spec-16', async () => expect(dashboard.expiresBeforeInput).not.toHaveAttribute('aria-describedby', /.+/));
      await recordEvidence('assert-toHaveCount-LIMAS-SUD-351-expiring-partial-input-no-validation-association.spec-17', async () => expect(dashboard.alertMessages).toHaveCount(0));
    } finally {
      await flow.restoreDefaultFilterState();
    }
  });
});
