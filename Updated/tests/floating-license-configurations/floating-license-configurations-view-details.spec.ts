import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { FloatingLicenseConfigurationsPage } from '../pages/floating-license-configurations.page';

const PROFILE = resolveProfileName();

// â”€â”€â”€ FLC-F: Floating License Configurations â€” View Details â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

test.describe('Floating License Configurations â€” FLC-F', () => {

  // â”€â”€â”€ 1. Menu Item â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('View Details Menu Item', () => {

    test('LIMAS-SUD-1946: View Details menu item is visible in the three-dot menu', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openCardMenu(cardName);
      await recordEvidence('assert-toBeVisible-floating-license-configurations-view-details.spec-29', async () => expect(flc.viewDetailsMenu).toBeVisible());
      await flc.closeCardMenu();
    });

    test('LIMAS-SUD-1947: View Details menu item has accessible name', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openCardMenu(cardName);
      const label = await flc.viewDetailsMenu.getAttribute('aria-label');
      await recordEvidence('assert-toContain-floating-license-configurations-view-details.spec-47', async () => expect(label).toContain('View details'));
      await flc.closeCardMenu();
    });

    test('LIMAS-SUD-1948: View Details menu item can be activated by keyboard Enter', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openCardMenu(cardName);
      await recordEvidence('action-focus-floating-license-configurations-view-details.spec-64', async () => flc.viewDetailsMenu.focus());
      await recordEvidence('action-press-floating-license-configurations-view-details.spec-65', async () => page.keyboard.press('Enter'));
      await flc.detailsPanel(cardName).waitFor();

      await flc.closeViewDetailsByButton(cardName);
    });
  });

  // â”€â”€â”€ 2. Details Panel Shell â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Details Panel Structure', () => {

    test('LIMAS-SUD-1949: View Details opens an inline region panel, not a dialog', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openViewDetails(cardName);

      await recordEvidence('assert-toBeVisible-floating-license-configurations-view-details.spec-90', async () => expect(flc.detailsPanel(cardName)).toBeVisible());
      const dialog = page.getByRole('dialog');
      await recordEvidence('assert-toHaveCount-floating-license-configurations-view-details.spec-92', async () => expect(dialog).toHaveCount(0));

      await flc.closeViewDetailsByButton(cardName);
    });

    test('LIMAS-SUD-1950: Details panel has a Configuration Details heading', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openViewDetails(cardName);
      await recordEvidence('assert-toBeVisible-floating-license-configurations-view-details.spec-110', async () => expect(flc.detailsPanelHeading).toBeVisible());
      await flc.closeViewDetailsByButton(cardName);
    });

    test('LIMAS-SUD-1951: Details panel has a close button with accessible name', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openViewDetails(cardName);
      const closeBtn = flc.detailsCloseButton(cardName);
      await recordEvidence('assert-toBeVisible-floating-license-configurations-view-details.spec-128', async () => expect(closeBtn).toBeVisible());
      const label = await closeBtn.getAttribute('aria-label');
      await recordEvidence('assert-toContain-floating-license-configurations-view-details.spec-130', async () => expect(label).toContain('Close details'));
      await flc.closeViewDetailsByButton(cardName);
    });

    test('LIMAS-SUD-1952: Details panel region has accessible name matching card', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openViewDetails(cardName);
      const label = await flc.detailsPanel(cardName).getAttribute('aria-label');
      await recordEvidence('assert-toContain-floating-license-configurations-view-details.spec-148', async () => expect(label).toContain(cardName));
      await flc.closeViewDetailsByButton(cardName);
    });
  });

  // â”€â”€â”€ 3. Fields â€” Configuration Identity â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Configuration Identity Fields', () => {

    test('LIMAS-SUD-1953: Product Profile field is displayed in details', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openViewDetails(cardName);
      const val = await flc.getDetailsFieldValue('Product Profile');
      await recordEvidence('assert-toBeGreaterThan-floating-license-configurations-view-details.spec-171', async () => expect(val.length).toBeGreaterThan(0));
      await flc.closeViewDetailsByButton(cardName);
    });

    test('LIMAS-SUD-1954: Profile Role field is displayed in details', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openViewDetails(cardName);
      const val = await flc.getDetailsFieldValue('Profile Role');
      await recordEvidence('assert-toBeGreaterThan-floating-license-configurations-view-details.spec-189', async () => expect(val.length).toBeGreaterThan(0));
      await flc.closeViewDetailsByButton(cardName);
    });

    test('LIMAS-SUD-1955: User Group field is displayed in details', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openViewDetails(cardName);
      const val = await flc.getDetailsFieldValue('User Group');
      await recordEvidence('assert-toBeGreaterThan-floating-license-configurations-view-details.spec-207', async () => expect(val.length).toBeGreaterThan(0));
      await flc.closeViewDetailsByButton(cardName);
    });
  });

  // â”€â”€â”€ 4. Fields â€” Capacity & Checkout â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Capacity and Checkout Fields', () => {

    test('LIMAS-SUD-1956: Total Licenses, Occupied, and Available fields are displayed', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openViewDetails(cardName);

      await recordEvidence('assert-toBeVisible-floating-license-configurations-view-details.spec-230', async () => expect(page.getByText('Total Licenses')).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-view-details.spec-231', async () => expect(page.getByText('Occupied')).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-view-details.spec-232', async () => expect(page.getByText('Available', { exact: true })).toBeVisible());

      await flc.closeViewDetailsByButton(cardName);
    });

    test('LIMAS-SUD-1957: Checkout field displays availability status', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openViewDetails(cardName);
      const val = await flc.getDetailsFieldValue('Checkout');
      await recordEvidence('assert-toBeGreaterThan-floating-license-configurations-view-details.spec-251', async () => expect(val.length).toBeGreaterThan(0));
      await flc.closeViewDetailsByButton(cardName);
    });

    test('LIMAS-SUD-1958: Max Checkout Time field is displayed with unit', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openViewDetails(cardName);
      const val = await flc.getDetailsFieldValue('Max Checkout Time');
      await recordEvidence('assert-toBeGreaterThan-floating-license-configurations-view-details.spec-269', async () => expect(val.length).toBeGreaterThan(0));
      await flc.closeViewDetailsByButton(cardName);
    });
  });

  // â”€â”€â”€ 5. Fields â€” Dates â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Date Fields', () => {

    test('LIMAS-SUD-1959: Expiration date is displayed in details', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openViewDetails(cardName);
      const val = await flc.getDetailsFieldValue('Expiration');
      await recordEvidence('assert-toBeGreaterThan-floating-license-configurations-view-details.spec-292', async () => expect(val.length).toBeGreaterThan(0));
      await flc.closeViewDetailsByButton(cardName);
    });

    test('LIMAS-SUD-1960: Maintenance date is displayed in details', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openViewDetails(cardName);
      const val = await flc.getDetailsFieldValue('Maintenance');
      await recordEvidence('assert-toBeGreaterThan-floating-license-configurations-view-details.spec-310', async () => expect(val.length).toBeGreaterThan(0));
      await flc.closeViewDetailsByButton(cardName);
    });
  });

  // â”€â”€â”€ 6. Fields â€” Audit â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Audit Fields', () => {

    test('LIMAS-SUD-1961: Created date is displayed in details', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openViewDetails(cardName);
      const val = await flc.getDetailsFieldValue('Created');
      await recordEvidence('assert-toBeGreaterThan-floating-license-configurations-view-details.spec-333', async () => expect(val.length).toBeGreaterThan(0));
      await flc.closeViewDetailsByButton(cardName);
    });

    test('LIMAS-SUD-1962: Last Modified date is displayed in details', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openViewDetails(cardName);
      const val = await flc.getDetailsFieldValue('Last Modified');
      await recordEvidence('assert-toBeGreaterThan-floating-license-configurations-view-details.spec-351', async () => expect(val.length).toBeGreaterThan(0));
      await flc.closeViewDetailsByButton(cardName);
    });

    test('LIMAS-SUD-1963: Created by field is displayed in details', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openViewDetails(cardName);
      const val = await flc.getDetailsFieldValue('Created by');
      await recordEvidence('assert-toBeGreaterThan-floating-license-configurations-view-details.spec-369', async () => expect(val.length).toBeGreaterThan(0));
      await flc.closeViewDetailsByButton(cardName);
    });
  });

  // â”€â”€â”€ 7. System IDs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('System ID Fields', () => {

    test('LIMAS-SUD-1964: Configuration ID, Version ID, and System User ID are displayed', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openViewDetails(cardName);

      await recordEvidence('assert-toBeVisible-floating-license-configurations-view-details.spec-392', async () => expect(flc.detailsConfigurationId).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-view-details.spec-393', async () => expect(flc.detailsVersionId).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-view-details.spec-394', async () => expect(flc.detailsSystemUserId).toBeVisible());

      await flc.closeViewDetailsByButton(cardName);
    });
  });

  // â”€â”€â”€ 8. Feature Note â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Feature Information', () => {

    test('LIMAS-SUD-1965: Feature information note is displayed when features are unavailable', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openViewDetails(cardName);
      await recordEvidence('assert-toBeVisible-floating-license-configurations-view-details.spec-417', async () => expect(flc.detailsFeatureNote).toBeVisible());
      await flc.closeViewDetailsByButton(cardName);
    });
  });

  // â”€â”€â”€ 9. Dismissal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Panel Dismissal', () => {

    test('LIMAS-SUD-1966: Close button dismisses the details panel', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openViewDetails(cardName);
      await flc.closeViewDetailsByButton(cardName);

      const visible = await flc.isDetailsPanelVisible(cardName);
      await recordEvidence('assert-toBe-floating-license-configurations-view-details.spec-442', async () => expect(visible).toBe(false));
    });
  });

  // â”€â”€â”€ 10. Safe Restoration â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Safe Restoration', () => {

    test('LIMAS-SUD-1967: After closing details, config list returns to clean state', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openViewDetails(cardName);
      await flc.closeViewDetailsByButton(cardName);

      // Verify clean state: heading visible, no details visible
      await recordEvidence('assert-toBeVisible-floating-license-configurations-view-details.spec-467', async () => expect(flc.heading).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-view-details.spec-468', async () => expect(flc.userGroupSummaryPanel).toBeVisible());
      const detailsVisible = await flc.isDetailsPanelVisible(cardName);
      await recordEvidence('assert-toBe-floating-license-configurations-view-details.spec-470', async () => expect(detailsVisible).toBe(false));
    });
  });
});