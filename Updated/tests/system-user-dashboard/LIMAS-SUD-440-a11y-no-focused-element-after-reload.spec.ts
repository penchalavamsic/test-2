import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { countUniqueRecords } from '../test-data/runtime-data';

test.describe('System User Dashboard - Expiring Licenses Large Result Set', () => {
  test('LIMAS-SUD-440: No Element Is Focused After Filter Round-Trip Reload', async ({ page, authenticatedPage }) => {
    await recordEvidence('assert-toContain-LIMAS-SUD-440-a11y-no-focused-element-after-reload.spec-8', async () => expect(authenticatedPage.url).toContain('/system-user-dashboard'));
    const flow = new ExpiringLicensesFlow(page);
    const dashboard = new SystemUserDashboardPage(page);

    await flow.prepareExpiringSection();

    try {
      await flow.selectMaintenanceFilter();
      await dashboard.verifyFilterResultsUpdated();
      await flow.selectExpirationFilter();
      await dashboard.verifyFilterResultsUpdated();
      const activeTag = await page.evaluate(() => document.activeElement?.tagName);
      await recordEvidence('assert-toBe-LIMAS-SUD-440-a11y-no-focused-element-after-reload.spec-20', async () => expect(activeTag).toBe('BODY'));
    } finally {
      await flow.restoreExpiringSearchState();
    }
  });
});
