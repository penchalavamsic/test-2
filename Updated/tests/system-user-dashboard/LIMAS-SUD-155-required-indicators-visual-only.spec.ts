import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-155: Required indicators visual only (a11y)', () => {
  test('should document that asterisk required indicators have no aria-required equivalent', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-155-required-indicators-visual-only.spec-8', async () => dashboard.pendingRequestsTab.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-155-required-indicators-visual-only.spec-9', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    const approveButton = dashboard.approveButtons.first();
    await recordEvidence('action-click-LIMAS-SUD-155-required-indicators-visual-only.spec-12', async () => approveButton.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-155-required-indicators-visual-only.spec-13', async () => expect(dashboard.approveFormApproveRequestButton).toBeVisible());

    // Verify User Group label shows asterisk but no aria-required
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-155-required-indicators-visual-only.spec-16', async () => expect(dashboard.approveFormUserGroupLabel).toBeVisible());
    const userGroupText = await dashboard.approveFormUserGroupLabel.textContent();
    await recordEvidence('assert-toContain-LIMAS-SUD-155-required-indicators-visual-only.spec-18', async () => expect(userGroupText).toContain('*'));
    const userGroupRequired = await dashboard.approveFormUserGroupCombobox.getAttribute('aria-required');
    await recordEvidence('assert-toBe-LIMAS-SUD-155-required-indicators-visual-only.spec-20', async () => expect(userGroupRequired).not.toBe('true'));

    // Verify Profile label shows asterisk but no aria-required
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-155-required-indicators-visual-only.spec-23', async () => expect(dashboard.approveFormProfileLabel).toBeVisible());
    const profileText = await dashboard.approveFormProfileLabel.textContent();
    await recordEvidence('assert-toContain-LIMAS-SUD-155-required-indicators-visual-only.spec-25', async () => expect(profileText).toContain('*'));
    const profileRequired = await dashboard.approveFormProfileCombobox.getAttribute('aria-required');
    await recordEvidence('assert-toBe-LIMAS-SUD-155-required-indicators-visual-only.spec-27', async () => expect(profileRequired).not.toBe('true'));

    // Verify Expiration Date label shows asterisk but no aria-required
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-155-required-indicators-visual-only.spec-30', async () => expect(dashboard.approveFormExpirationDateLabel).toBeVisible());
    const expDateText = await dashboard.approveFormExpirationDateLabel.textContent();
    await recordEvidence('assert-toContain-LIMAS-SUD-155-required-indicators-visual-only.spec-32', async () => expect(expDateText).toContain('*'));

    // Close form
    await recordEvidence('action-click-LIMAS-SUD-155-required-indicators-visual-only.spec-35', async () => dashboard.approveFormCancelButton.click());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-155-required-indicators-visual-only.spec-36', async () => expect(approveButton).toHaveText('Approve'));
  });
});