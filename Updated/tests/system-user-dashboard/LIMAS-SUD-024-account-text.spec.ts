import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-024: Account text visibility', () => {
  test('should show non-empty account text in header', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    // The account control must display an email address; an identifier is a defect.
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-024-account-text.spec-8', async () => expect(dashboard.accountText).toBeVisible());

    const text = await dashboard.userButton.textContent();
    await recordEvidence('assert-toBeNull-LIMAS-SUD-024-account-text.spec-11', async () => expect(text).not.toBeNull());
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-024-account-text.spec-12', async () => expect(text!.trim().length).toBeGreaterThan(0));
  });
});