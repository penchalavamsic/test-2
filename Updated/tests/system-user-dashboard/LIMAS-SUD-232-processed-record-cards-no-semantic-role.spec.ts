import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Record Fields', () => {
  test('LIMAS-SUD-232: should have no [role="listitem"] or [role="row"] on processed record cards', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    // Verify cards are present
    const userLabels = page.getByText('User');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-232-processed-record-cards-no-semantic-role.spec-13', async () => expect(userLabels.first()).toBeVisible());

    // Locate a card container and verify it has no semantic list or row role
    const firstCard = userLabels.first().locator('..').locator('..');

    const listItem = firstCard.locator('[role="listitem"]');
    await recordEvidence('assert-toHaveCount-LIMAS-SUD-232-processed-record-cards-no-semantic-role.spec-19', async () => expect(listItem).toHaveCount(0));

    const row = firstCard.locator('[role="row"]');
    await recordEvidence('assert-toHaveCount-LIMAS-SUD-232-processed-record-cards-no-semantic-role.spec-22', async () => expect(row).toHaveCount(0));
  });
});