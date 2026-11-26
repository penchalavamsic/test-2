import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-156: Card count syncs with table', () => {
  test('should match pending card count with loaded table row count', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    // Extract numeric count from the card text (e.g. "146 Pending")
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-156-card-count-syncs-with-table.spec-10', async () => expect(dashboard.pendingLicenseRequestsCard).toBeVisible());
    const cardText = await dashboard.pendingLicenseRequestsCard.innerText();
    const match = cardText.match(/(\d+)\s*Pending/);
    await recordEvidence('assert-toBeNull-LIMAS-SUD-156-card-count-syncs-with-table.spec-13', async () => expect(match).not.toBeNull());
    const cardCount = parseInt(match![1], 10);

    // Click the card to load the table
    await recordEvidence('action-click-LIMAS-SUD-156-card-count-syncs-with-table.spec-17', async () => dashboard.pendingRequestsTab.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-156-card-count-syncs-with-table.spec-18', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    // The shared DIV-grid locator already excludes the header.
    const allRows = dashboard.licenseRequestRows;
    const totalRows = await allRows.count();
    const dataRowCount = totalRows;
    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-156-card-count-syncs-with-table.spec-24', async () => expect(dataRowCount).toBeGreaterThanOrEqual(0));

    await recordEvidence('assert-toBe-LIMAS-SUD-156-card-count-syncs-with-table.spec-26', async () => expect(dataRowCount).toBe(cardCount));
  });
});
