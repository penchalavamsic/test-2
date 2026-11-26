import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Record Fields', () => {
  test('LIMAS-SUD-239: should have no aria-label or aria-labelledby on processed record cards', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    const firstUserLabel = page.getByText('User').first();
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-239-processed-record-no-accessible-name.spec-12', async () => expect(firstUserLabel).toBeVisible());

    const firstCard = firstUserLabel.locator('..').locator('..');

    const ariaLabel = await firstCard.evaluate(el => el.getAttribute('aria-label'));
    const ariaLabelledBy = await firstCard.evaluate(el => el.getAttribute('aria-labelledby'));

    await recordEvidence('assert-toBeFalsy-LIMAS-SUD-239-processed-record-no-accessible-name.spec-19', async () => expect(ariaLabel).toBeFalsy());
    await recordEvidence('assert-toBeFalsy-LIMAS-SUD-239-processed-record-no-accessible-name.spec-20', async () => expect(ariaLabelledBy).toBeFalsy());
  });
});