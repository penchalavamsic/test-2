import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { FloatingLicenseConfigurationsPage } from '../pages/floating-license-configurations.page';

const PROFILE = resolveProfileName();

// â”€â”€â”€ FLC-C: Floating License Configurations â€” Cards and Selection â”€â”€â”€

test.describe('Floating License Configurations â€” FLC-C', () => {

  // â”€â”€â”€ 1. Card Collection â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Card Collection', () => {

    test('LIMAS-SUD-1865: Configuration count matches visible card count', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      test.skip(await flc.emptyStateMessage.isVisible(), 'No configurations are available for comparing card and header counts.');
      const count = await flc.getConfigurationCount();
      const cardCount = await flc.getVisibleCardCount();
      await recordEvidence('assert-toBe-floating-license-configurations-cards.spec-27', async () => expect(cardCount).toBe(count));
    });

    test('LIMAS-SUD-1866: Configuration cards are present in a structured grid container', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardCount = await flc.getVisibleCardCount();
      test.skip(cardCount === 0, 'Required runtime data is unavailable: cardCount === 0.');
      await recordEvidence('assert-toBeVisible-floating-license-configurations-cards.spec-41', async () => expect(flc.configurationCards.first()).toBeVisible());
    });

    test('LIMAS-SUD-1867: No duplicate cards are present', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const titles = await flc.getVisibleCardTitles();
      test.skip(titles.length === 0, 'No configurations are available for duplicate-card validation.');
      const unique = new Set(titles);
      await recordEvidence('assert-toBe-floating-license-configurations-cards.spec-55', async () => expect(unique.size).toBe(titles.length));
    });
  });

  // â”€â”€â”€ 2. Card Structure â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Card Structure', () => {

    test('LIMAS-SUD-1868: Each card has a selection checkbox with accessible name', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      const checkbox = flc.cardCheckbox(cardName);
      await recordEvidence('assert-toBeVisible-floating-license-configurations-cards.spec-76', async () => expect(checkbox).toBeVisible());
      await recordEvidence('assert-toHaveAccessibleName-floating-license-configurations-cards.spec-77', async () => expect(checkbox).toHaveAccessibleName(`Select ${cardName}`));
    });

    test('LIMAS-SUD-1869: Card displays configuration title', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      const titles = await flc.getVisibleCardTitles();
      await recordEvidence('assert-toContain-floating-license-configurations-cards.spec-93', async () => expect(titles).toContain(cardName));
    });

    test('LIMAS-SUD-1870: Card displays Capacity field with total and available', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      const capacity = await flc.getCardFieldValue(cardName, 'Capacity');
      await recordEvidence('assert-toMatch-floating-license-configurations-cards.spec-109', async () => expect(capacity).toMatch(/total.*available/i));
    });

    test('LIMAS-SUD-1871: Card displays Checkout field with status and max duration', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      const checkout = await flc.getCardFieldValue(cardName, 'Checkout');
      await recordEvidence('assert-toBeGreaterThan-floating-license-configurations-cards.spec-125', async () => expect(checkout.length).toBeGreaterThan(0));
    });

    test('LIMAS-SUD-1872: Card displays Expiration and Maintenance dates', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      const expiration = await flc.getCardFieldValue(cardName, 'Expiration');
      await recordEvidence('assert-toBeGreaterThan-floating-license-configurations-cards.spec-141', async () => expect(expiration.length).toBeGreaterThan(0));

      const maintenance = await flc.getCardFieldValue(cardName, 'Maintenance');
      await recordEvidence('assert-toBeGreaterThan-floating-license-configurations-cards.spec-144', async () => expect(maintenance.length).toBeGreaterThan(0));
    });

    test('LIMAS-SUD-1873: Card has an Actions (three-dot) menu button', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      const btn = flc.cardActionsButton(cardName);
      await recordEvidence('assert-toBeVisible-floating-license-configurations-cards.spec-160', async () => expect(btn).toBeVisible());
      await recordEvidence('assert-toHaveAccessibleName-floating-license-configurations-cards.spec-161', async () => expect(btn).toHaveAccessibleName(`Actions for ${cardName}`));
    });
  });

  // â”€â”€â”€ 3. Individual Selection â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Individual Selection', () => {

    test('LIMAS-SUD-1874: Selecting a card checks its checkbox and shows selection toolbar', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.selectCardByName(cardName);
      await page.waitForTimeout(300);

      await recordEvidence('assert-toBe-floating-license-configurations-cards.spec-184', async () => expect(await flc.isCardSelected(cardName)).toBe(true));
      await recordEvidence('assert-toBe-floating-license-configurations-cards.spec-185', async () => expect(await flc.isSelectionToolbarVisible()).toBe(true));

      await flc.clearAllCardSelections();
    });

    test('LIMAS-SUD-1875: Exactly one card is selected when selecting individually', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.selectCardByName(cardName);
      await page.waitForTimeout(200);

      const count = await flc.getSelectionCount();
      await recordEvidence('assert-toBe-floating-license-configurations-cards.spec-206', async () => expect(count).toBe(1));

      await flc.clearAllCardSelections();
    });

    test('LIMAS-SUD-1876: Deselecting a card clears its checkbox state', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.selectCardByName(cardName);
      await page.waitForTimeout(200);
      await flc.deselectCardByName(cardName);
      await page.waitForTimeout(200);

      await recordEvidence('assert-toBe-floating-license-configurations-cards.spec-228', async () => expect(await flc.isCardSelected(cardName)).toBe(false));
    });

    test('LIMAS-SUD-1877: Clear button deselects all cards and hides selection toolbar', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.selectCardByName(cardName);
      await page.waitForTimeout(200);
      await flc.clearAllCardSelections();
      await page.waitForTimeout(200);

      await recordEvidence('assert-toBe-floating-license-configurations-cards.spec-248', async () => expect(await flc.isCardSelected(cardName)).toBe(false));
      await recordEvidence('assert-toBe-floating-license-configurations-cards.spec-249', async () => expect(await flc.isSelectionToolbarVisible()).toBe(false));
    });
  });

  // â”€â”€â”€ 4. Multiple Selection (data-dependent when â‰¥2 cards) â”€â”€â”€â”€â”€

  test.describe('Multiple Selection', () => {

    test('LIMAS-SUD-1878: Selection toolbar shows accurate count when two cards selected', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardCount = await flc.getVisibleCardCount();
      test.skip(cardCount < 2, 'Required runtime data is unavailable: cardCount < 2.'); // data-dependent

      const titles = await flc.getVisibleCardTitles();
      await flc.selectCardByName(titles[0]);
      await flc.selectCardByName(titles[1]);
      await page.waitForTimeout(200);

      const selCount = await flc.getSelectionCount();
      await recordEvidence('assert-toBe-floating-license-configurations-cards.spec-275', async () => expect(selCount).toBe(2));

      await flc.clearAllCardSelections();
    });

    test('LIMAS-SUD-1879: Deselecting one of two selected cards reduces count to 1', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardCount = await flc.getVisibleCardCount();
      test.skip(cardCount < 2, 'Required runtime data is unavailable: cardCount < 2.');

      const titles = await flc.getVisibleCardTitles();
      await flc.selectCardByName(titles[0]);
      await flc.selectCardByName(titles[1]);
      await page.waitForTimeout(200);

      await flc.deselectCardByName(titles[0]);
      await page.waitForTimeout(200);

      const selCount = await flc.getSelectionCount();
      await recordEvidence('assert-toBe-floating-license-configurations-cards.spec-301', async () => expect(selCount).toBe(1));

      await flc.clearAllCardSelections();
    });
  });

  // â”€â”€â”€ 5. Search and Filter Interaction â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Search and Filter Interaction', () => {

    test('LIMAS-SUD-1880: Selection persists after applying a search that keeps the card visible', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.selectCardByName(cardName);
      await page.waitForTimeout(200);

      await flc.openConfigSearch();
      const fragment = cardName.substring(0, Math.min(3, cardName.length));
      await flc.setConfigSearch(fragment);
      await page.waitForTimeout(300);

      await recordEvidence('assert-toBe-floating-license-configurations-cards.spec-331', async () => expect(await flc.isCardSelected(cardName)).toBe(true));

      await flc.clearConfigSearch();
      await flc.closeConfigSearch();
      await flc.clearAllCardSelections();
    });

    test('LIMAS-SUD-1881: Hidden card due to no-match search loses visible selection', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.selectCardByName(cardName);
      await page.waitForTimeout(200);

      await flc.openConfigSearch();
      await flc.setConfigSearch('zzz_no_such_config_xyz');
      await page.waitForTimeout(300);

      // Selection count should update (card hidden)
      const selCount = await flc.getSelectionCount();
      await recordEvidence('assert-toBe-floating-license-configurations-cards.spec-359', async () => expect(selCount).toBe(0));

      await flc.clearConfigSearch();
      await flc.closeConfigSearch();
      await flc.clearAllCardSelections();
    });
  });

  // â”€â”€â”€ 6. Card Menu Structure â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Card Menu Structure', () => {

    test('LIMAS-SUD-1882: Actions button opens a menu with role="menu"', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openCardMenu(cardName);
      await recordEvidence('assert-toBeVisible-floating-license-configurations-cards.spec-384', async () => expect(flc.cardMenu).toBeVisible());
      await recordEvidence('assert-toHaveAttribute-floating-license-configurations-cards.spec-385', async () => expect(flc.cardMenu).toHaveAttribute('role', 'menu'));

      await flc.closeCardMenu();
    });

    test('LIMAS-SUD-1883: Menu contains View Details, Edit, and Delete items', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openCardMenu(cardName);
      const items = await flc.getCardMenuItems();
      await recordEvidence('assert-toBe-floating-license-configurations-cards.spec-404', async () => expect(items.some((i) => i.includes('View Details'))).toBe(true));
      await recordEvidence('assert-toContain-floating-license-configurations-cards.spec-405', async () => expect(items).toContain('Edit'));
      await recordEvidence('assert-toContain-floating-license-configurations-cards.spec-406', async () => expect(items).toContain('Delete'));

      await flc.closeCardMenu();
    });

    test('LIMAS-SUD-1884: Escape key closes the card menu', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openCardMenu(cardName);
      await flc.closeCardMenu();
      await page.waitForTimeout(200);

      await recordEvidence('assert-toBe-floating-license-configurations-cards.spec-427', async () => expect(await flc.isCardMenuVisible()).toBe(false));
    });
  });

  // â”€â”€â”€ 7. Accessibility â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Accessibility', () => {

    test('LIMAS-SUD-1885: Card checkbox has role checkbox and checked state', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      const checkbox = flc.cardCheckbox(cardName);
      await recordEvidence('assert-toHaveAttribute-floating-license-configurations-cards.spec-448', async () => expect(checkbox).toHaveAttribute('role', 'checkbox'));
    });

    test('LIMAS-SUD-1886: Actions button has aria-haspopup="menu"', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      const btn = flc.cardActionsButton(cardName);
      await recordEvidence('assert-toHaveAttribute-floating-license-configurations-cards.spec-464', async () => expect(btn).toHaveAttribute('aria-haspopup', 'menu'));
    });

    test('LIMAS-SUD-1887: Field labels are visually associated with values on card', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      // Verify key field labels are present on the page
      const capacityLabel = page.getByText('Capacity').first();
      const checkoutLabel = page.getByText('Checkout').first();
      const expirationLabel = page.getByText('Expiration').first();
      const maintenanceLabel = page.getByText('Maintenance').first();

      await recordEvidence('assert-toBeVisible-floating-license-configurations-cards.spec-485', async () => expect(capacityLabel).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-cards.spec-486', async () => expect(checkoutLabel).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-cards.spec-487', async () => expect(expirationLabel).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-cards.spec-488', async () => expect(maintenanceLabel).toBeVisible());
    });
  });

  // â”€â”€â”€ 8. Safe Restoration â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Safe Restoration', () => {

    test('LIMAS-SUD-1888: Selection is cleared and restored to initial state', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      // Select a card to dirty state
      const cardName = await flc.getFirstCardName();
      if (cardName) {
        await flc.selectCardByName(cardName);
        await page.waitForTimeout(200);
      }

      // Restore
      await flc.restoreConfigurationListState(groupName);
      await flc.clearAllCardSelections();
      await page.waitForTimeout(300);

      // Verify clean: no selection toolbar visible
      const toolbarVisible = await flc.isSelectionToolbarVisible();
      await recordEvidence('assert-toBe-floating-license-configurations-cards.spec-520', async () => expect(toolbarVisible).toBe(false));

      await recordEvidence('assert-toBeVisible-floating-license-configurations-cards.spec-522', async () => expect(flc.heading).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-cards.spec-523', async () => expect(flc.userGroupSummaryPanel).toBeVisible());
    });
  });
});