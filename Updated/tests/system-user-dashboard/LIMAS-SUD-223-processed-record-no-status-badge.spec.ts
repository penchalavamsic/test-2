import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Record Fields', () => {
  test('LIMAS-SUD-223: should not display "Approved" or "Deleted" status badges on individual processed records', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    // Verify at least one card exists
    const userLabels = page.getByText('User');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-223-processed-record-no-status-badge.spec-13', async () => expect(userLabels.first()).toBeVisible());

    // Locate the first card container and check it has no status text
    const firstCard = userLabels.first().locator('..').locator('..');
    const approvedText = firstCard.getByText('Approved');
    const deletedText = firstCard.getByText('Deleted');

    await recordEvidence('assert-toHaveCount-LIMAS-SUD-223-processed-record-no-status-badge.spec-20', async () => expect(approvedText).toHaveCount(0));
    await recordEvidence('assert-toHaveCount-LIMAS-SUD-223-processed-record-no-status-badge.spec-21', async () => expect(deletedText).toHaveCount(0));
  });
});