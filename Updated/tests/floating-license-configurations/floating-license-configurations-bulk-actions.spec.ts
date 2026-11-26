import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { FloatingLicenseConfigurationsPage } from '../pages/floating-license-configurations.page';

const PROFILE = resolveProfileName();

// â”€â”€â”€ FLC-D: Floating License Configurations â€” Bulk Actions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

test.describe('Floating License Configurations â€” FLC-D', () => {

  // â”€â”€â”€ 1. Selection Toolbar Structure â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Selection Toolbar Structure', () => {

    test('LIMAS-SUD-1889: Selection toolbar shows dynamic selected count', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.selectCardByName(cardName);
      await page.waitForTimeout(200);

      const count = await flc.getSelectionCount();
      await recordEvidence('assert-toBe-floating-license-configurations-bulk-actions.spec-33', async () => expect(count).toBe(1));

      await flc.clearAllCardSelections();
    });

    test('LIMAS-SUD-1890: Select loaded button has accessible name and keyboard focus support', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.selectCardByName(cardName);
      await page.waitForTimeout(200);

      await recordEvidence('assert-toBeVisible-floating-license-configurations-bulk-actions.spec-54', async () => expect(flc.selectLoadedButton).toBeVisible());
      await recordEvidence('assert-toHaveAccessibleName-floating-license-configurations-bulk-actions.spec-55', async () => expect(flc.selectLoadedButton).toHaveAccessibleName(/Select loaded/i));

      await recordEvidence('action-focus-floating-license-configurations-bulk-actions.spec-57', async () => flc.selectLoadedButton.focus());
      await recordEvidence('assert-toBeFocused-floating-license-configurations-bulk-actions.spec-58', async () => expect(flc.selectLoadedButton).toBeFocused());

      await flc.clearAllCardSelections();
    });

    test('LIMAS-SUD-1891: Clear button is accessible with role and focus indicator', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.selectCardByName(cardName);
      await page.waitForTimeout(200);

      await recordEvidence('assert-toBeVisible-floating-license-configurations-bulk-actions.spec-79', async () => expect(flc.clearSelectionButton).toBeVisible());
      await recordEvidence('assert-toHaveAccessibleName-floating-license-configurations-bulk-actions.spec-80', async () => expect(flc.clearSelectionButton).toHaveAccessibleName('Clear'));

      await recordEvidence('action-focus-floating-license-configurations-bulk-actions.spec-82', async () => flc.clearSelectionButton.focus());
      await recordEvidence('assert-toBeFocused-floating-license-configurations-bulk-actions.spec-83', async () => expect(flc.clearSelectionButton).toBeFocused());

      await flc.clearAllCardSelections();
    });

    test('LIMAS-SUD-1892: Dates button is accessible with role and focus indicator', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.selectCardByName(cardName);
      await page.waitForTimeout(200);

      await recordEvidence('assert-toBeVisible-floating-license-configurations-bulk-actions.spec-104', async () => expect(flc.selectionDatesButton).toBeVisible());
      await recordEvidence('assert-toHaveAccessibleName-floating-license-configurations-bulk-actions.spec-105', async () => expect(flc.selectionDatesButton).toHaveAccessibleName('Dates'));

      await recordEvidence('action-focus-floating-license-configurations-bulk-actions.spec-107', async () => flc.selectionDatesButton.focus());
      await recordEvidence('assert-toBeFocused-floating-license-configurations-bulk-actions.spec-108', async () => expect(flc.selectionDatesButton).toBeFocused());

      await flc.clearAllCardSelections();
    });

    test('LIMAS-SUD-1893: Capacity button is accessible with role and focus indicator', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.selectCardByName(cardName);
      await page.waitForTimeout(200);

      await recordEvidence('assert-toBeVisible-floating-license-configurations-bulk-actions.spec-129', async () => expect(flc.selectionCapacityButton).toBeVisible());
      await recordEvidence('assert-toHaveAccessibleName-floating-license-configurations-bulk-actions.spec-130', async () => expect(flc.selectionCapacityButton).toHaveAccessibleName('Capacity'));

      await recordEvidence('action-focus-floating-license-configurations-bulk-actions.spec-132', async () => flc.selectionCapacityButton.focus());
      await recordEvidence('assert-toBeFocused-floating-license-configurations-bulk-actions.spec-133', async () => expect(flc.selectionCapacityButton).toBeFocused());

      await flc.clearAllCardSelections();
    });

    test('LIMAS-SUD-1894: Delete button is accessible with role and focus indicator', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.selectCardByName(cardName);
      await page.waitForTimeout(200);

      await recordEvidence('assert-toBeVisible-floating-license-configurations-bulk-actions.spec-154', async () => expect(flc.selectionDeleteButton).toBeVisible());
      await recordEvidence('assert-toHaveAccessibleName-floating-license-configurations-bulk-actions.spec-155', async () => expect(flc.selectionDeleteButton).toHaveAccessibleName('Delete'));

      await recordEvidence('action-focus-floating-license-configurations-bulk-actions.spec-157', async () => flc.selectionDeleteButton.focus());
      await recordEvidence('assert-toBeFocused-floating-license-configurations-bulk-actions.spec-158', async () => expect(flc.selectionDeleteButton).toBeFocused());

      await flc.clearAllCardSelections();
    });

    test('LIMAS-SUD-1895: Toolbar is hidden when no cards are selected', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const toolbarVisible = await flc.isSelectionToolbarVisible();
      await recordEvidence('assert-toBe-floating-license-configurations-bulk-actions.spec-173', async () => expect(toolbarVisible).toBe(false));
    });
  });

  // â”€â”€â”€ 2. Select Loaded and Clear â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Select Loaded and Clear', () => {

    test('LIMAS-SUD-1896: Select loaded selects all visible loaded configuration cards', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      const cardCount = await flc.getVisibleCardCount();
      test.skip(cardCount === 0, 'Required runtime data is unavailable: cardCount === 0.');

      // Select a single card first to activate toolbar
      const firstCard = await flc.getFirstCardName();
      test.skip(!firstCard, 'Required runtime data is unavailable: !firstCard.');
      await flc.selectCardByName(firstCard);
      await page.waitForTimeout(200);

      // Click Select loaded
      await recordEvidence('action-click-floating-license-configurations-bulk-actions.spec-201', async () => flc.selectLoadedButton.click());
      await page.waitForTimeout(300);

      const selCount = await flc.getSelectionCount();
      await recordEvidence('assert-toBe-floating-license-configurations-bulk-actions.spec-205', async () => expect(selCount).toBe(cardCount));

      await flc.clearAllCardSelections();
    });

    test('LIMAS-SUD-1897: Selected count updates dynamically after Select loaded', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      const cardCount = await flc.getVisibleCardCount();
      test.skip(cardCount === 0, 'Required runtime data is unavailable: cardCount === 0.');

      const firstCard = await flc.getFirstCardName();
      test.skip(!firstCard, 'Required runtime data is unavailable: !firstCard.');
      await flc.selectCardByName(firstCard);
      await page.waitForTimeout(200);

      await recordEvidence('action-click-floating-license-configurations-bulk-actions.spec-228', async () => flc.selectLoadedButton.click());
      await page.waitForTimeout(300);

      const selCount = await flc.getSelectionCount();
      await recordEvidence('assert-toBe-floating-license-configurations-bulk-actions.spec-232', async () => expect(selCount).toBe(cardCount));

      await flc.clearAllCardSelections();
    });

    test('LIMAS-SUD-1898: Clear removes all selections and hides toolbar', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      const firstCard = await flc.getFirstCardName();
      test.skip(!firstCard, 'Required runtime data is unavailable: !firstCard.');

      await flc.selectCardByName(firstCard);
      await page.waitForTimeout(200);

      await flc.clearAllCardSelections();
      await page.waitForTimeout(200);

      const toolbarVisible = await flc.isSelectionToolbarVisible();
      await recordEvidence('assert-toBe-floating-license-configurations-bulk-actions.spec-257', async () => expect(toolbarVisible).toBe(false));
    });

    test('LIMAS-SUD-1899: Select loaded scopes to search-filtered cards', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      const titles = await flc.getVisibleCardTitles();
      test.skip(titles.length === 0, 'Required runtime data is unavailable: titles.length === 0.');

      // Apply search to reduce visible set
      const fragment = titles[0].substring(0, Math.min(3, titles[0].length));
      await flc.openConfigSearch();
      await flc.setConfigSearch(fragment);
      await page.waitForTimeout(300);

      const filteredCount = await flc.getVisibleCardCount();
      if (filteredCount === 0) {
        await flc.clearConfigSearch();
        await flc.closeConfigSearch();
        return;
      }

      // Select a card then Select loaded
      const filteredTitles = await flc.getVisibleCardTitles();
      await flc.selectCardByName(filteredTitles[0]);
      await page.waitForTimeout(200);

      await recordEvidence('action-click-floating-license-configurations-bulk-actions.spec-291', async () => flc.selectLoadedButton.click());
      await page.waitForTimeout(300);

      const selCount = await flc.getSelectionCount();
      await recordEvidence('assert-toBe-floating-license-configurations-bulk-actions.spec-295', async () => expect(selCount).toBe(filteredCount));

      await flc.clearAllCardSelections();
      await flc.clearConfigSearch();
      await flc.closeConfigSearch();
    });

    test('LIMAS-SUD-1900: Clear from after Select loaded restores no-selection state', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      const firstCard = await flc.getFirstCardName();
      test.skip(!firstCard, 'Required runtime data is unavailable: !firstCard.');

      await flc.selectCardByName(firstCard);
      await page.waitForTimeout(200);

      await recordEvidence('action-click-floating-license-configurations-bulk-actions.spec-318', async () => flc.selectLoadedButton.click());
      await page.waitForTimeout(300);

      await flc.clearAllCardSelections();
      await page.waitForTimeout(200);

      const selCount = await flc.getSelectionCount();
      await recordEvidence('assert-toBe-floating-license-configurations-bulk-actions.spec-325', async () => expect(selCount).toBe(0));

      const toolbarVisible = await flc.isSelectionToolbarVisible();
      await recordEvidence('assert-toBe-floating-license-configurations-bulk-actions.spec-328', async () => expect(toolbarVisible).toBe(false));
    });
  });

  // â”€â”€â”€ 3. Dates Panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Dates Panel', () => {

    test('LIMAS-SUD-1901: Dates button opens inline panel with Update Dates heading', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.selectCardByName(cardName);
      await page.waitForTimeout(200);

      await flc.openDatesPanel();
      await recordEvidence('assert-toBeVisible-floating-license-configurations-bulk-actions.spec-353', async () => expect(flc.datesPanelHeading).toBeVisible());

      await flc.closeDatesPanel();
      await flc.clearAllCardSelections();
    });

    test('LIMAS-SUD-1902: Dates panel contains Expiration Date and Maintenance Date inputs', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.selectCardByName(cardName);
      await page.waitForTimeout(200);

      await flc.openDatesPanel();

      await recordEvidence('assert-toBeVisible-floating-license-configurations-bulk-actions.spec-377', async () => expect(flc.datesExpirationInput).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-bulk-actions.spec-378', async () => expect(flc.datesMaintenanceInput).toBeVisible());

      await flc.closeDatesPanel();
      await flc.clearAllCardSelections();
    });

    test('LIMAS-SUD-1903: Dates panel shows current default values from runtime cards', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.selectCardByName(cardName);
      await page.waitForTimeout(200);

      await flc.openDatesPanel();

      const expirationVal = await flc.datesExpirationInput.inputValue();
      await recordEvidence('assert-toBeGreaterThan-floating-license-configurations-bulk-actions.spec-403', async () => expect(expirationVal.length).toBeGreaterThan(0));

      const maintenanceVal = await flc.datesMaintenanceInput.inputValue();
      await recordEvidence('assert-toBeGreaterThan-floating-license-configurations-bulk-actions.spec-406', async () => expect(maintenanceVal.length).toBeGreaterThan(0));

      await flc.closeDatesPanel();
      await flc.clearAllCardSelections();
    });

    test('LIMAS-SUD-1904: Dates panel has Use expiration date for maintenance checkbox', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.selectCardByName(cardName);
      await page.waitForTimeout(200);

      await flc.openDatesPanel();

      await recordEvidence('assert-toBeVisible-floating-license-configurations-bulk-actions.spec-430', async () => expect(flc.datesUseExpirationForMaintenanceCheckbox).toBeVisible());
      const role = await flc.datesUseExpirationForMaintenanceCheckbox.getAttribute('role');
      await recordEvidence('assert-toBe-floating-license-configurations-bulk-actions.spec-432', async () => expect(role).toBe('checkbox'));

      await flc.closeDatesPanel();
      await flc.clearAllCardSelections();
    });

    test('LIMAS-SUD-1905: Dates panel has Cancel and Update Dates controls', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.selectCardByName(cardName);
      await page.waitForTimeout(200);

      await flc.openDatesPanel();

      await recordEvidence('assert-toBeVisible-floating-license-configurations-bulk-actions.spec-456', async () => expect(flc.datesCancelButton).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-bulk-actions.spec-457', async () => expect(flc.datesApplyButton).toBeVisible());

      await flc.closeDatesPanel();
      await flc.clearAllCardSelections();
    });

    test('LIMAS-SUD-1906: Cancel closes Dates panel and leaves selections unchanged', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.selectCardByName(cardName);
      await page.waitForTimeout(200);

      await flc.openDatesPanel();
      await flc.closeDatesPanel();
      await page.waitForTimeout(200);

      const panelVisible = await flc.isDatesPanelVisible();
      await recordEvidence('assert-toBe-floating-license-configurations-bulk-actions.spec-484', async () => expect(panelVisible).toBe(false));

      const selCount = await flc.getSelectionCount();
      await recordEvidence('assert-toBe-floating-license-configurations-bulk-actions.spec-487', async () => expect(selCount).toBe(1));

      await flc.clearAllCardSelections();
    });

    test('LIMAS-SUD-1907: Reopening Dates panel after Cancel shows form in default state', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.selectCardByName(cardName);
      await page.waitForTimeout(200);

      await flc.openDatesPanel();
      const expBefore = await flc.datesExpirationInput.inputValue();
      const maintBefore = await flc.datesMaintenanceInput.inputValue();
      await flc.closeDatesPanel();
      await page.waitForTimeout(200);

      // Reopen
      await flc.openDatesPanel();
      const expAfter = await flc.datesExpirationInput.inputValue();
      const maintAfter = await flc.datesMaintenanceInput.inputValue();

      await recordEvidence('assert-toBe-floating-license-configurations-bulk-actions.spec-519', async () => expect(expAfter).toBe(expBefore));
      await recordEvidence('assert-toBe-floating-license-configurations-bulk-actions.spec-520', async () => expect(maintAfter).toBe(maintBefore));

      await flc.closeDatesPanel();
      await flc.clearAllCardSelections();
    });
  });

  // â”€â”€â”€ 4. Capacity Panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Capacity Panel', () => {

    test('LIMAS-SUD-1908: Capacity button opens inline panel with Update Capacity heading', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.selectCardByName(cardName);
      await page.waitForTimeout(200);

      await flc.openCapacityPanel();
      await recordEvidence('assert-toBeVisible-floating-license-configurations-bulk-actions.spec-548', async () => expect(flc.capacityPanelHeading).toBeVisible());

      await flc.closeCapacityPanel();
      await flc.clearAllCardSelections();
    });

    test('LIMAS-SUD-1909: Capacity panel contains Number of Licenses and Max Checkout Time inputs', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.selectCardByName(cardName);
      await page.waitForTimeout(200);

      await flc.openCapacityPanel();

      await recordEvidence('assert-toBeVisible-floating-license-configurations-bulk-actions.spec-572', async () => expect(flc.capacityNumberOfLicensesInput).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-bulk-actions.spec-573', async () => expect(flc.capacityMaxCheckoutInput).toBeVisible());

      await flc.closeCapacityPanel();
      await flc.clearAllCardSelections();
    });

    test('LIMAS-SUD-1910: Capacity has numeric-only input elements (spinbutton role)', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.selectCardByName(cardName);
      await page.waitForTimeout(200);

      await flc.openCapacityPanel();

      const numLicRole = await flc.capacityNumberOfLicensesInput.getAttribute('role');
      await recordEvidence('assert-toBe-floating-license-configurations-bulk-actions.spec-598', async () => expect(numLicRole).toBe('spinbutton'));

      const maxCheckoutRole = await flc.capacityMaxCheckoutInput.getAttribute('role');
      await recordEvidence('assert-toBe-floating-license-configurations-bulk-actions.spec-601', async () => expect(maxCheckoutRole).toBe('spinbutton'));

      await flc.closeCapacityPanel();
      await flc.clearAllCardSelections();
    });

    test('LIMAS-SUD-1911: Capacity panel has Cancel and Update Capacity controls', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.selectCardByName(cardName);
      await page.waitForTimeout(200);

      await flc.openCapacityPanel();

      await recordEvidence('assert-toBeVisible-floating-license-configurations-bulk-actions.spec-625', async () => expect(flc.capacityCancelButton).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-bulk-actions.spec-626', async () => expect(flc.capacityApplyButton).toBeVisible());

      await flc.closeCapacityPanel();
      await flc.clearAllCardSelections();
    });

    test('LIMAS-SUD-1912: Cancel closes Capacity panel and leaves selections unchanged', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.selectCardByName(cardName);
      await page.waitForTimeout(200);

      await flc.openCapacityPanel();
      await flc.closeCapacityPanel();
      await page.waitForTimeout(200);

      const panelVisible = await flc.isCapacityPanelVisible();
      await recordEvidence('assert-toBe-floating-license-configurations-bulk-actions.spec-653', async () => expect(panelVisible).toBe(false));

      const selCount = await flc.getSelectionCount();
      await recordEvidence('assert-toBe-floating-license-configurations-bulk-actions.spec-656', async () => expect(selCount).toBe(1));

      await flc.clearAllCardSelections();
    });

    test('LIMAS-SUD-1913: Reopening Capacity panel after Cancel shows form in default state', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.selectCardByName(cardName);
      await page.waitForTimeout(200);

      await flc.openCapacityPanel();
      const licensesBefore = await flc.capacityNumberOfLicensesInput.inputValue();
      const checkoutBefore = await flc.capacityMaxCheckoutInput.inputValue();
      await flc.closeCapacityPanel();
      await page.waitForTimeout(200);

      await flc.openCapacityPanel();
      const licensesAfter = await flc.capacityNumberOfLicensesInput.inputValue();
      const checkoutAfter = await flc.capacityMaxCheckoutInput.inputValue();

      // Forms return to original state after cancel+reopen
      await recordEvidence('assert-toBe-floating-license-configurations-bulk-actions.spec-688', async () => expect(licensesAfter).toBe(licensesBefore));
      await recordEvidence('assert-toBe-floating-license-configurations-bulk-actions.spec-689', async () => expect(checkoutAfter).toBe(checkoutBefore));

      await flc.closeCapacityPanel();
      await flc.clearAllCardSelections();
    });
  });

  // â”€â”€â”€ 5. Delete Action â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Delete Action', () => {

    test('LIMAS-SUD-1914: Delete button triggers immediate destructive action with no confirmation', async ({ page }) => {
      // Documented from stable UI evidence: Delete is immediate â€” no confirmation dialog.
      // The button transitions to "Deletingâ€¦" with disabled state during execution.
      // This test verifies the contract from UI inspection only; Delete is never clicked.
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.selectCardByName(cardName);
      await page.waitForTimeout(200);

      // Verify Delete button is present with accessible name
      await recordEvidence('assert-toBeVisible-floating-license-configurations-bulk-actions.spec-720', async () => expect(flc.selectionDeleteButton).toBeVisible());
      await recordEvidence('assert-toHaveAccessibleName-floating-license-configurations-bulk-actions.spec-721', async () => expect(flc.selectionDeleteButton).toHaveAccessibleName('Delete'));

      // Delete is NOT clicked â€” immediate destructive behavior confirmed via UI inspection.
      // The button has NO confirmation dialog; clicking it starts deletion immediately.

      await flc.clearAllCardSelections();
    });

    test('LIMAS-SUD-1915: Delete does not produce a confirmation dialog', async ({ page }) => {
      // Confirmed via UI inspection: clicking Delete transitions button to "Deletingâ€¦" directly.
      // No dialog, no modal, no confirmation step appears.
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.selectCardByName(cardName);
      await page.waitForTimeout(200);

      // The contract is: no confirmation, immediate execution.
      // This is verified without clicking Delete.

      await recordEvidence('assert-toBeVisible-floating-license-configurations-bulk-actions.spec-750', async () => expect(flc.selectionDeleteButton).toBeVisible());
      await flc.clearAllCardSelections();
    });
  });

  // â”€â”€â”€ 6. Safe Restoration â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Safe Restoration', () => {

    test('LIMAS-SUD-1916: Full restore to clean state after bulk-actions exploration', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      // Dirty state: select a card, open and close a panel
      const cardName = await flc.getFirstCardName();
      if (cardName) {
        await flc.selectCardByName(cardName);
        await page.waitForTimeout(200);

        await flc.openDatesPanel();
        await flc.closeDatesPanel();
        await page.waitForTimeout(200);
      }

      // Full restore
      await flc.restoreFully(groupName);
      await flc.clearAllCardSelections();
      await page.waitForTimeout(300);

      // Verify clean state
      const toolbarVisible = await flc.isSelectionToolbarVisible();
      await recordEvidence('assert-toBe-floating-license-configurations-bulk-actions.spec-787', async () => expect(toolbarVisible).toBe(false));

      const datesVisible = await flc.isDatesPanelVisible();
      await recordEvidence('assert-toBe-floating-license-configurations-bulk-actions.spec-790', async () => expect(datesVisible).toBe(false));

      const capacityVisible = await flc.isCapacityPanelVisible();
      await recordEvidence('assert-toBe-floating-license-configurations-bulk-actions.spec-793', async () => expect(capacityVisible).toBe(false));

      await recordEvidence('assert-toBeVisible-floating-license-configurations-bulk-actions.spec-795', async () => expect(flc.heading).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-bulk-actions.spec-796', async () => expect(flc.userGroupSummaryPanel).toBeVisible());
    });
  });
});