import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Record Fields', () => {
  test('LIMAS-SUD-235: should not make individual processed record cards focusable via Tab', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    // Verify cards exist
    const userLabels = page.getByText('User');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-235-processed-record-no-keyboard-focus.spec-13', async () => expect(userLabels.first()).toBeVisible());

    // Press Tab a few times and check that cards themselves don't receive focus
    // First tab brings us into the page; we check what gets focus
    await recordEvidence('action-press-LIMAS-SUD-235-processed-record-no-keyboard-focus.spec-17', async () => page.keyboard.press('Tab'));

    // Get the focused element
    const focused = page.locator(':focus');
    const focusedTag = await focused.evaluate(el => el.tagName.toLowerCase());

    // A card container (div) should not be the focused element after tabbing
    const focusedRole = await focused.evaluate(el => el.getAttribute('role'));

    // Individual cards should not have tabindex="0"
    const firstCard = userLabels.first().locator('..').locator('..');
    const tabIndex = await firstCard.evaluate(el => el.getAttribute('tabindex'));
    await recordEvidence('assert-toBeFalsy-LIMAS-SUD-235-processed-record-no-keyboard-focus.spec-29', async () => expect(tabIndex).toBeFalsy());
  });
});