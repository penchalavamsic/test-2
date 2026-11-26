import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-121: Search keyboard focus', () => {
  test('should focus the search field when pressing Tab from a preceding element', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-121-search-keyboard-focus.spec-9', async () => expect(dashboard.pendingRequestsTab).toBeVisible());
    await recordEvidence('action-click-LIMAS-SUD-121-search-keyboard-focus.spec-10', async () => dashboard.pendingRequestsTab.click());

    const searchField = page.getByPlaceholder('Search license requests...');
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-121-search-keyboard-focus.spec-13', async () => expect(searchField).toBeVisible());

    // The last summary button is the preceding focusable control; headings are not focusable.
    await recordEvidence('action-focus-LIMAS-SUD-121-search-keyboard-focus.spec-16', async () => dashboard.floatingLicensesCard.focus());
    await recordEvidence('assert-toBeFocused-LIMAS-SUD-121-search-keyboard-focus.spec-17', async () => expect(dashboard.floatingLicensesCard).toBeFocused());

    // Tab to move focus to the next focusable element (search field)
    await recordEvidence('action-press-LIMAS-SUD-121-search-keyboard-focus.spec-20', async () => page.keyboard.press('Tab'));
    await recordEvidence('assert-toBeFocused-LIMAS-SUD-121-search-keyboard-focus.spec-21', async () => expect(searchField).toBeFocused());
  });
});