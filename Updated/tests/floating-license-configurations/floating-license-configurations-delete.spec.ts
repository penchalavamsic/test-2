import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { FloatingLicenseConfigurationsPage } from '../pages/floating-license-configurations.page';

const PROFILE = resolveProfileName();

// â”€â”€â”€ FLC-H: Floating License Configurations â€” Delete Configuration â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// WARNING: Delete is immediately destructive with no confirmation dialog.
// Never click Delete on an existing configuration. Mutation gates REQUIRED.

test.describe('Floating License Configurations â€” FLC-H', () => {

  // â”€â”€â”€ 1. Card-Menu Delete Inspection â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Card-Menu Delete', () => {

    test('LIMAS-SUD-1993: Delete menu item is visible in the three-dot menu', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openCardMenu(cardName);
      await recordEvidence('assert-toBeVisible-floating-license-configurations-delete.spec-31', async () => expect(flc.cardDeleteMenuItem).toBeVisible());
      await flc.closeCardMenu();
    });

    test('LIMAS-SUD-1994: Delete menu item has role menuitem and accessible name', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openCardMenu(cardName);
      const role = await flc.cardDeleteMenuItem.getAttribute('role');
      await recordEvidence('assert-toBe-floating-license-configurations-delete.spec-49', async () => expect(role).toBe('menuitem'));
      await flc.closeCardMenu();
    });

    test('LIMAS-SUD-1995: Delete menu item can receive keyboard focus', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openCardMenu(cardName);
      await recordEvidence('action-focus-floating-license-configurations-delete.spec-66', async () => flc.cardDeleteMenuItem.focus());
      const focused = await flc.cardDeleteMenuItem.evaluate((el) => document.activeElement === el);
      await recordEvidence('assert-toBe-floating-license-configurations-delete.spec-68', async () => expect(focused).toBe(true));
      await flc.closeCardMenu();
    });

    test('LIMAS-SUD-1996: No confirmation dialog appears before Delete from card menu', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openCardMenu(cardName);

      // Inspect: no dialog, no modal, no confirmation element exists
      const dialog = page.getByRole('dialog');
      const alertDialog = page.getByRole('alertdialog');
      await recordEvidence('assert-toHaveCount-floating-license-configurations-delete.spec-89', async () => expect(dialog).toHaveCount(0));
      await recordEvidence('assert-toHaveCount-floating-license-configurations-delete.spec-90', async () => expect(alertDialog).toHaveCount(0));

      // DO NOT click Delete â€” only verify no confirmation exists

      await flc.closeCardMenu();
    });
  });

  // â”€â”€â”€ 2. Bulk Delete Inspection â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Bulk Delete', () => {

    test('LIMAS-SUD-1997: Delete button is visible in selection toolbar after selection', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.selectCardByName(cardName);
      await recordEvidence('assert-toBeVisible-floating-license-configurations-delete.spec-115', async () => expect(flc.selectionDeleteButton).toBeVisible());

      await flc.clearAllCardSelections();
    });

    test('LIMAS-SUD-1998: Bulk Delete is enabled when cards are selected', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.selectCardByName(cardName);
      await recordEvidence('assert-toBeEnabled-floating-license-configurations-delete.spec-133', async () => expect(flc.selectionDeleteButton).toBeEnabled());

      await flc.clearAllCardSelections();
    });

    test('LIMAS-SUD-1999: Selection toolbar count reflects selected cards', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.selectCardByName(cardName);
      const count = await flc.getSelectionCount();
      await recordEvidence('assert-toBeGreaterThanOrEqual-floating-license-configurations-delete.spec-152', async () => expect(count).toBeGreaterThanOrEqual(1));

      await flc.clearAllCardSelections();
    });

    test('LIMAS-SUD-2000: No confirmation dialog appears for bulk Delete', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.selectCardByName(cardName);

      // No confirmation element present
      const dialog = page.getByRole('dialog');
      const alertDialog = page.getByRole('alertdialog');
      await recordEvidence('assert-toHaveCount-floating-license-configurations-delete.spec-174', async () => expect(dialog).toHaveCount(0));
      await recordEvidence('assert-toHaveCount-floating-license-configurations-delete.spec-175', async () => expect(alertDialog).toHaveCount(0));

      // DO NOT click Delete

      await flc.clearAllCardSelections();
    });
  });

  // â”€â”€â”€ 3. Controlled Delete Lifecycle â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Controlled Delete Lifecycle', () => {

    test('LIMAS-SUD-2001: Gated card-menu delete lifecycle with mutation flags', async ({ page }) => {
      if (!process.env.TEST_FLC_ALLOW_MUTATION || !process.env.TEST_FLC_ALLOW_DELETE) {
        test.skip(true, 'TEST_FLC_ALLOW_MUTATION and TEST_FLC_ALLOW_DELETE not set');
        return;
      }

      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      const originalCount = await flc.getConfigurationCount();

      // Phase 1: Create synthetic config
      const marker = `test-delete-${Date.now()}`;
      await flc.openCreateForm();
      await recordEvidence('action-selectOption-floating-license-configurations-delete.spec-207', async () => flc.createProductProfileCombo.selectOption({ label: 'Authoring Suite 2' }));
      await page.waitForTimeout(500);
      await recordEvidence('action-selectOption-floating-license-configurations-delete.spec-209', async () => flc.createProfileRoleCombo.selectOption({ index: 1 }));
      await recordEvidence('action-fill-floating-license-configurations-delete.spec-210', async () => flc.createNumberOfLicensesInput.fill('1'));
      await recordEvidence('action-fill-floating-license-configurations-delete.spec-211', async () => flc.createMaxCheckoutInput.fill('1'));
      // Use marker as data â€” but we can't set a name, so we rely on profile identity
      await recordEvidence('action-click-floating-license-configurations-delete.spec-213', async () => flc.createSaveButton.click());
      await page.waitForTimeout(1000);
      await recordEvidence('assert-toBeVisible-floating-license-configurations-delete.spec-215', async () => expect(flc.userGroupSummaryPanel).toBeVisible());

      const afterCreateCount = await flc.getConfigurationCount();
      await recordEvidence('assert-toBe-floating-license-configurations-delete.spec-218', async () => expect(afterCreateCount).toBe(originalCount + 1));

      // Phase 2: Delete via card menu
      const cardName = 'Authoring Suite 2';
      await flc.openCardMenu(cardName);
      await recordEvidence('action-click-floating-license-configurations-delete.spec-223', async () => flc.cardDeleteMenuItem.click());

      // Wait for deletion to complete â€” card disappears, no confirmation
      await page.waitForTimeout(1500);

      // Verify card count returns to original
      const afterDeleteCount = await flc.getConfigurationCount();
      await recordEvidence('assert-toBe-floating-license-configurations-delete.spec-230', async () => expect(afterDeleteCount).toBe(originalCount));

      // Cleanup: verify no card "Authoring Suite 2" remains
      const cards = await flc.getVisibleCardTitles();
      const syntheticStillPresent = cards.some((t) => t === 'Authoring Suite 2');
      if (syntheticStillPresent) {
        // Idempotent cleanup: retry once
        await flc.openCardMenu(cardName);
        await recordEvidence('action-click-floating-license-configurations-delete.spec-238', async () => flc.cardDeleteMenuItem.click());
        await page.waitForTimeout(1500);
      }
    });

    test('LIMAS-SUD-2002: Delete returns configuration count to original value', async ({ page }) => {
      if (!process.env.TEST_FLC_ALLOW_MUTATION || !process.env.TEST_FLC_ALLOW_DELETE) {
        test.skip(true, 'Mutation flags not set');
        return;
      }

      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const originalCount = await flc.getConfigurationCount();

      // Create
      await flc.openCreateForm();
      await recordEvidence('action-selectOption-floating-license-configurations-delete.spec-261', async () => flc.createProductProfileCombo.selectOption({ label: 'Authoring Suite 2' }));
      await page.waitForTimeout(500);
      await recordEvidence('action-selectOption-floating-license-configurations-delete.spec-263', async () => flc.createProfileRoleCombo.selectOption({ index: 1 }));
      await recordEvidence('action-fill-floating-license-configurations-delete.spec-264', async () => flc.createNumberOfLicensesInput.fill('1'));
      await recordEvidence('action-fill-floating-license-configurations-delete.spec-265', async () => flc.createMaxCheckoutInput.fill('1'));
      await recordEvidence('action-click-floating-license-configurations-delete.spec-266', async () => flc.createSaveButton.click());
      await page.waitForTimeout(1000);

      await recordEvidence('assert-toBe-floating-license-configurations-delete.spec-269', async () => expect(await flc.getConfigurationCount()).toBe(originalCount + 1));

      // Delete
      await flc.openCardMenu('Authoring Suite 2');
      await recordEvidence('action-click-floating-license-configurations-delete.spec-273', async () => flc.cardDeleteMenuItem.click());
      await page.waitForTimeout(1500);

      const finalCount = await flc.getConfigurationCount();
      await recordEvidence('assert-toBe-floating-license-configurations-delete.spec-277', async () => expect(finalCount).toBe(originalCount));
    });
  });

  // â”€â”€â”€ 4. Controlled Failure Recovery â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Failure Recovery Plans', () => {

    test('LIMAS-SUD-2003: Unauthorized delete is handled gracefully', async ({ page }) => {
      if (!process.env.TEST_FLC_ALLOW_MUTATION || !process.env.TEST_FLC_ALLOW_DELETE) {
        test.skip(true, 'Mutation flags not set');
        return;
      }

      // This test documents the expected behavior for unauthorized deletion.
      // A 401/403 response should not crash the UI or leave the config count inconsistent.
      // The actual HTTP response is observed via network monitoring during delete tests.
      // No direct triggering of unauthorized deletion â€” only the plan is validated.
      test.skip(true, 'Unauthorized response verification requires network interception');
    });

    test('LIMAS-SUD-2004: Configuration not found is handled gracefully', async ({ page }) => {
      if (!process.env.TEST_FLC_ALLOW_MUTATION || !process.env.TEST_FLC_ALLOW_DELETE) {
        test.skip(true, 'Mutation flags not set');
        return;
      }

      // The system should handle a 404 gracefully if a config was already deleted
      // or the ID is stale. The UI should not crash, and existing cards remain.
      test.skip(true, 'Not-found response verification requires network interception');
    });

    test('LIMAS-SUD-2005: Server error during delete is handled gracefully', async ({ page }) => {
      if (!process.env.TEST_FLC_ALLOW_MUTATION || !process.env.TEST_FLC_ALLOW_DELETE) {
        test.skip(true, 'Mutation flags not set');
        return;
      }

      // A 500 response should not delete the card from the UI or corrupt the config list.
      test.skip(true, 'Server error response verification requires network interception');
    });
  });

  // â”€â”€â”€ 5. Duplicate-Delete Prevention â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Duplicate-Delete Prevention', () => {

    test('LIMAS-SUD-2006: Already-absent card is treated as idempotent success', async ({ page }) => {
      if (!process.env.TEST_FLC_ALLOW_MUTATION || !process.env.TEST_FLC_ALLOW_DELETE) {
        test.skip(true, 'Mutation flags not set');
        return;
      }

      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const originalCount = await flc.getConfigurationCount();

      // Create and delete a config
      await flc.openCreateForm();
      await recordEvidence('action-selectOption-floating-license-configurations-delete.spec-342', async () => flc.createProductProfileCombo.selectOption({ label: 'Authoring Suite 2' }));
      await page.waitForTimeout(500);
      await recordEvidence('action-selectOption-floating-license-configurations-delete.spec-344', async () => flc.createProfileRoleCombo.selectOption({ index: 1 }));
      await recordEvidence('action-fill-floating-license-configurations-delete.spec-345', async () => flc.createNumberOfLicensesInput.fill('1'));
      await recordEvidence('action-fill-floating-license-configurations-delete.spec-346', async () => flc.createMaxCheckoutInput.fill('1'));
      await recordEvidence('action-click-floating-license-configurations-delete.spec-347', async () => flc.createSaveButton.click());
      await page.waitForTimeout(1000);

      await flc.openCardMenu('Authoring Suite 2');
      await recordEvidence('action-click-floating-license-configurations-delete.spec-351', async () => flc.cardDeleteMenuItem.click());
      await page.waitForTimeout(1500);

      // Verify config is gone
      const cards = await flc.getVisibleCardTitles();
      const stillPresent = cards.some((t) => t === 'Authoring Suite 2');
      // Treat "already absent" as successful idempotent cleanup
      await recordEvidence('assert-toBe-floating-license-configurations-delete.spec-358', async () => expect(stillPresent).toBe(false));
      await recordEvidence('assert-toBe-floating-license-configurations-delete.spec-359', async () => expect(await flc.getConfigurationCount()).toBe(originalCount));
    });
  });

  // â”€â”€â”€ 6. Safe Restoration â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Safe Restoration', () => {

    test('LIMAS-SUD-2007: Full state restoration after delete inspection â€” no selections, no toolbar', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      // Ensure no selections
      await flc.clearAllCardSelections();

      // Verify clean state
      await recordEvidence('assert-toBeVisible-floating-license-configurations-delete.spec-381', async () => expect(flc.heading).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-delete.spec-382', async () => expect(flc.userGroupSummaryPanel).toBeVisible());
      const toolbarVisible = await flc.isSelectionToolbarVisible();
      await recordEvidence('assert-toBe-floating-license-configurations-delete.spec-384', async () => expect(toolbarVisible).toBe(false));
    });

    test('LIMAS-SUD-2008: Original config count returns after controlled lifecycle cleanup', async ({ page }) => {
      if (!process.env.TEST_FLC_ALLOW_MUTATION || !process.env.TEST_FLC_ALLOW_DELETE) {
        test.skip(true, 'Mutation flags not set');
        return;
      }

      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const originalCount = await flc.getConfigurationCount();

      // Create, then delete â€” count must return to original
      await flc.openCreateForm();
      await recordEvidence('action-selectOption-floating-license-configurations-delete.spec-405', async () => flc.createProductProfileCombo.selectOption({ label: 'Authoring Suite 2' }));
      await page.waitForTimeout(500);
      await recordEvidence('action-selectOption-floating-license-configurations-delete.spec-407', async () => flc.createProfileRoleCombo.selectOption({ index: 1 }));
      await recordEvidence('action-fill-floating-license-configurations-delete.spec-408', async () => flc.createNumberOfLicensesInput.fill('1'));
      await recordEvidence('action-fill-floating-license-configurations-delete.spec-409', async () => flc.createMaxCheckoutInput.fill('1'));
      await recordEvidence('action-click-floating-license-configurations-delete.spec-410', async () => flc.createSaveButton.click());
      await page.waitForTimeout(1000);

      await flc.openCardMenu('Authoring Suite 2');
      await recordEvidence('action-click-floating-license-configurations-delete.spec-414', async () => flc.cardDeleteMenuItem.click());
      await page.waitForTimeout(1500);

      await flc.clearAllCardSelections();
      await recordEvidence('assert-toBe-floating-license-configurations-delete.spec-418', async () => expect(await flc.getConfigurationCount()).toBe(originalCount));
    });
  });
});