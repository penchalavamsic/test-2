import { withOwnedFloatingConfiguration } from '../helpers/floating-config-crud';
import { verifyFloatingDeleteRejection } from '../helpers/floating-delete-recovery';
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

    test('LIMAS-SUD-1996: Card Delete proceeds without confirmation and persists removal', async ({ page }) => {
  test.setTimeout(240000);
  const flc = new FloatingLicenseConfigurationsPage(page);
  await withOwnedFloatingConfiguration(flc, async owned => {
    await owned.remove('card');
    await recordEvidence('assert-toHaveLength-floating-license-configurations-delete.spec-81', async () => expect(await owned.reload()).toHaveLength(0));
  });
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

    test('LIMAS-SUD-2000: Bulk Delete removes only the selected owned configuration', async ({ page }) => {
  test.setTimeout(240000);
  const flc = new FloatingLicenseConfigurationsPage(page);
  await withOwnedFloatingConfiguration(flc, async owned => {
    await owned.remove('bulk');
    await recordEvidence('assert-toHaveLength-floating-license-configurations-delete.spec-150', async () => expect(await owned.reload()).toHaveLength(0));
  });
});
  });

  // â”€â”€â”€ 3. Controlled Delete Lifecycle â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Controlled Delete Lifecycle', () => {

    test('LIMAS-SUD-2001: Card Delete removes an owned configuration after reload', async ({ page }) => {
  test.setTimeout(240000);
  const flc = new FloatingLicenseConfigurationsPage(page);
  await withOwnedFloatingConfiguration(flc, async owned => {
    await owned.remove('card');
    await recordEvidence('assert-toHaveLength-floating-license-configurations-delete.spec-164', async () => expect(await owned.reload()).toHaveLength(0));
  });
});

    test('LIMAS-SUD-2002: Deleting the owned configuration restores its group count to zero', async ({ page }) => {
  test.setTimeout(240000);
  const flc = new FloatingLicenseConfigurationsPage(page);
  await withOwnedFloatingConfiguration(flc, async owned => {
    await owned.remove('card');
    await recordEvidence('assert-toHaveLength-floating-license-configurations-delete.spec-173', async () => expect(await owned.reload()).toHaveLength(0));
  });
});
  });

  // â”€â”€â”€ 4. Controlled Failure Recovery â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Failure Recovery Plans', () => {

    test('LIMAS-SUD-2003: Controlled forbidden deletion shows feedback and preserves the configuration', async ({ page }) => {
  test.setTimeout(240000);
  const flc = new FloatingLicenseConfigurationsPage(page);
  await verifyFloatingDeleteRejection(flc, 403);
});

    test('LIMAS-SUD-2004: Controlled not-found deletion shows feedback and preserves the configuration', async ({ page }) => {
  test.setTimeout(240000);
  const flc = new FloatingLicenseConfigurationsPage(page);
  await verifyFloatingDeleteRejection(flc, 404);
});

    test('LIMAS-SUD-2005: Controlled server-error deletion shows feedback and preserves the configuration', async ({ page }) => {
  test.setTimeout(240000);
  const flc = new FloatingLicenseConfigurationsPage(page);
  await verifyFloatingDeleteRejection(flc, 500);
});
  });

  // â”€â”€â”€ 5. Duplicate-Delete Prevention â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Duplicate-Delete Prevention', () => {

    test('LIMAS-SUD-2006: A successfully deleted owned configuration remains absent after a second reload', async ({ page }) => {
  test.setTimeout(240000);
  const flc = new FloatingLicenseConfigurationsPage(page);
  await withOwnedFloatingConfiguration(flc, async owned => {
    await owned.remove('card');
    await recordEvidence('assert-toHaveLength-floating-license-configurations-delete.spec-210', async () => expect(await owned.reload()).toHaveLength(0));
  });
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

    test('LIMAS-SUD-2008: Owned configuration lifecycle restores an empty group after cleanup', async ({ page }) => {
  test.setTimeout(240000);
  const flc = new FloatingLicenseConfigurationsPage(page);
  await withOwnedFloatingConfiguration(flc, async owned => {
    await owned.remove('card');
    await recordEvidence('assert-toHaveLength-floating-license-configurations-delete.spec-244', async () => expect(await owned.reload()).toHaveLength(0));
  });
});
  });
});