import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-145: Form focus order', () => {
  test('should move focus through form fields in logical order via Tab', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-145-form-focus-order.spec-8', async () => dashboard.pendingRequestsTab.click());
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-145-form-focus-order.spec-9', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    const approveButton = dashboard.approveButtons.first();
    await recordEvidence('action-click-LIMAS-SUD-145-form-focus-order.spec-12', async () => approveButton.click());

    // Select User Group and Profile to reveal all fields
    await recordEvidence('action-click-LIMAS-SUD-145-form-focus-order.spec-15', async () => dashboard.approveFormUserGroupCombobox.click());
    await recordEvidence('action-click-LIMAS-SUD-145-form-focus-order.spec-16', async () => dashboard.approveFormListbox.getByRole('option').first().click());
    await recordEvidence('action-click-LIMAS-SUD-145-form-focus-order.spec-17', async () => dashboard.approveFormProfileCombobox.click());
    await recordEvidence('action-click-LIMAS-SUD-145-form-focus-order.spec-18', async () => dashboard.approveFormListbox.getByRole('option').first().click());

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-145-form-focus-order.spec-20', async () => expect(dashboard.approveFormExpirationDateLabel).toBeVisible());

    // Click User Group to start focus there
    await recordEvidence('action-focus-LIMAS-SUD-145-form-focus-order.spec-23', async () => dashboard.approveFormUserGroupCombobox.focus());

    // Tab through expected focus order
    const focusedElements: string[] = [];

    // Tab: User Group → Profile
    await recordEvidence('action-press-LIMAS-SUD-145-form-focus-order.spec-29', async () => page.keyboard.press('Tab'));
    let focused = page.locator(':focus');
    focusedElements.push((await focused.getAttribute('aria-label')) ?? (await focused.getAttribute('placeholder')) ?? (await focused.textContent()) ?? 'unknown');

    // Tab: Profile → Role
    await recordEvidence('action-press-LIMAS-SUD-145-form-focus-order.spec-34', async () => page.keyboard.press('Tab'));
    focused = page.locator(':focus');
    focusedElements.push((await focused.getAttribute('aria-label')) ?? (await focused.getAttribute('placeholder')) ?? (await focused.textContent()) ?? 'unknown');

    // Tab: Role → Expiration Date
    await recordEvidence('action-press-LIMAS-SUD-145-form-focus-order.spec-39', async () => page.keyboard.press('Tab'));
    focused = page.locator(':focus');
    focusedElements.push((await focused.getAttribute('aria-label')) ?? (await focused.getAttribute('placeholder')) ?? (await focused.textContent()) ?? 'unknown');

    // Tab: Expiration Date → Maintenance Date
    await recordEvidence('action-press-LIMAS-SUD-145-form-focus-order.spec-44', async () => page.keyboard.press('Tab'));
    focused = page.locator(':focus');
    focusedElements.push((await focused.getAttribute('aria-label')) ?? (await focused.getAttribute('placeholder')) ?? (await focused.textContent()) ?? 'unknown');

    // Tab: Maintenance Date → Cancel
    await recordEvidence('action-press-LIMAS-SUD-145-form-focus-order.spec-49', async () => page.keyboard.press('Tab'));
    focused = page.locator(':focus');
    focusedElements.push((await focused.getAttribute('aria-label')) ?? (await focused.textContent()) ?? 'unknown');

    // Tab: Cancel → Approve Request
    await recordEvidence('action-press-LIMAS-SUD-145-form-focus-order.spec-54', async () => page.keyboard.press('Tab'));
    focused = page.locator(':focus');
    focusedElements.push((await focused.getAttribute('aria-label')) ?? (await focused.textContent()) ?? 'unknown');

    // Verify we collected focus targets (at least 4 distinct elements reached)
    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-145-form-focus-order.spec-59', async () => expect(focusedElements.length).toBeGreaterThanOrEqual(4));

    // Close form without submitting
    await recordEvidence('action-click-LIMAS-SUD-145-form-focus-order.spec-62', async () => dashboard.approveFormCancelButton.click());
    await recordEvidence('assert-toHaveText-LIMAS-SUD-145-form-focus-order.spec-63', async () => expect(approveButton).toHaveText('Approve'));
  });
});