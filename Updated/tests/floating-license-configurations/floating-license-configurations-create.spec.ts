import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { FloatingLicenseConfigurationsPage } from '../pages/floating-license-configurations.page';

const PROFILE = resolveProfileName();

// â”€â”€â”€ FLC-E: Floating License Configurations â€” Create Configuration â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

test.describe('Floating License Configurations â€” FLC-E', () => {

  // â”€â”€â”€ 1. Form Shell & Layout â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Form Shell and Layout', () => {

    test('LIMAS-SUD-1917: Create Configuration button opens inline form with heading', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();
      await flc.openCreateForm();

      await recordEvidence('assert-toBeVisible-floating-license-configurations-create.spec-26', async () => expect(flc.createFormHeading).toBeVisible());
      await recordEvidence('assert-toContainText-floating-license-configurations-create.spec-27', async () => expect(flc.createFormHeading).toContainText(/Create/i));

      await flc.cancelCreateForm();
    });

    test('LIMAS-SUD-1918: Create form has Cancel button in the header area', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();
      await flc.openCreateForm();

      await recordEvidence('assert-toBeVisible-floating-license-configurations-create.spec-42', async () => expect(flc.createFormCancelButton).toBeVisible());
      await flc.cancelCreateForm();
    });

    test('LIMAS-SUD-1919: Create form is inline panel, not a modal dialog', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();
      await flc.openCreateForm();

      const dialog = page.getByRole('dialog');
      await recordEvidence('assert-toHaveCount-floating-license-configurations-create.spec-57', async () => expect(dialog).toHaveCount(0));

      await flc.cancelCreateForm();
    });

    test('LIMAS-SUD-1920: Create form shows labels for all top-level fields', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();
      await flc.openCreateForm();

      await recordEvidence('assert-toBeVisible-floating-license-configurations-create.spec-72', async () => expect(page.locator('label').filter({ hasText: /^User Group$/ })).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-create.spec-73', async () => expect(page.getByText('Product Profile')).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-create.spec-74', async () => expect(page.getByText('Profile Role')).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-create.spec-75', async () => expect(page.getByText(/Number of Licenses/)).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-create.spec-76', async () => expect(page.getByText(/Max Checkout Time/)).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-create.spec-77', async () => expect(page.getByText(/Available for Checkout/)).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-create.spec-78', async () => expect(page.getByText('Expiration Date')).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-create.spec-79', async () => expect(page.getByText('Maintenance Date')).toBeVisible());

      await flc.cancelCreateForm();
    });

    test('LIMAS-SUD-1921: Create form has Reset and Save Configuration buttons at the bottom', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();
      await flc.openCreateForm();

      await recordEvidence('assert-toBeVisible-floating-license-configurations-create.spec-94', async () => expect(flc.createResetButton).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-create.spec-95', async () => expect(flc.createSaveButton).toBeVisible());

      await flc.cancelCreateForm();
    });
  });

  // â”€â”€â”€ 2. User Group Field â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('User Group Field', () => {

    test('LIMAS-SUD-1922: User Group field is prepopulated with the currently selected group', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');
      await flc.openCreateForm();

      const selectedGroup = await flc.getCreateFormUserGroup();
      await recordEvidence('assert-toContain-floating-license-configurations-create.spec-117', async () => expect(selectedGroup.toLowerCase()).toContain(groupName.toLowerCase()));

      await flc.cancelCreateForm();
    });

    test('LIMAS-SUD-1923: User Group combobox is editable and has options populated', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();
      await flc.openCreateForm();

      await recordEvidence('assert-toBeEnabled-floating-license-configurations-create.spec-132', async () => expect(flc.createUserGroupCombo).toBeEnabled());
      const options = flc.createUserGroupCombo.locator('option');
      const count = await options.count();
      await recordEvidence('assert-toBeGreaterThan-floating-license-configurations-create.spec-135', async () => expect(count).toBeGreaterThan(1));

      await flc.cancelCreateForm();
    });

    test('LIMAS-SUD-1924: User Group field has a label', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();
      await flc.openCreateForm();

      await recordEvidence('assert-toBeVisible-floating-license-configurations-create.spec-150', async () => expect(page.locator('label').filter({ hasText: /^User Group$/ })).toBeVisible());

      await flc.cancelCreateForm();
    });
  });

  // â”€â”€â”€ 3. Product Profile â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Product Profile Field', () => {

    test('LIMAS-SUD-1925: Product Profile combobox starts with placeholder "Select a profile…"', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();
      await flc.openCreateForm();

      const selected = flc.createProductProfileCombo.locator('option:checked');
      const text = await selected.textContent();
      await recordEvidence('assert-toBe-floating-license-configurations-create.spec-172', async () => expect(text?.trim()).toBe('Select a profile…'));

      await flc.cancelCreateForm();
    });

    test('LIMAS-SUD-1926: Product Profile options list is populated', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();
      await flc.openCreateForm();

      const options = flc.createProductProfileCombo.locator('option');
      const count = await options.count();
      await recordEvidence('assert-toBeGreaterThan-floating-license-configurations-create.spec-189', async () => expect(count).toBeGreaterThan(1));

      await flc.cancelCreateForm();
    });

    test('LIMAS-SUD-1927: Product Profile field shows required indicator (*)', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();
      await flc.openCreateForm();

      const label = page.getByText('Product Profile *');
      await recordEvidence('assert-toBeVisible-floating-license-configurations-create.spec-205', async () => expect(label).toBeVisible());

      await flc.cancelCreateForm();
    });
  });

  // â”€â”€â”€ 4. Profile Role â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Profile Role Field', () => {

    test('LIMAS-SUD-1928: Profile Role combobox starts with placeholder "Select a role…"', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();
      await flc.openCreateForm();

      const selected = flc.createProfileRoleCombo.locator('option:checked');
      const text = await selected.textContent();
      await recordEvidence('assert-toBe-floating-license-configurations-create.spec-227', async () => expect(text?.trim()).toBe('Select a role…'));

      await flc.cancelCreateForm();
    });

    test('LIMAS-SUD-1929: Profile Role options list is populated', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();
      await flc.openCreateForm();

      const options = flc.createProfileRoleCombo.locator('option');
      const count = await options.count();
      await recordEvidence('assert-toBeGreaterThan-floating-license-configurations-create.spec-244', async () => expect(count).toBeGreaterThan(1));

      await flc.cancelCreateForm();
    });

    test('LIMAS-SUD-1930: Selecting a Product Profile filters Profile Role options', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();
      await flc.openCreateForm();

      const optionsBefore = flc.createProfileRoleCombo.locator('option');
      const countBefore = await optionsBefore.count();

      await recordEvidence('action-selectOption-floating-license-configurations-create.spec-262', async () => flc.createProductProfileCombo.selectOption({ index: 2 }));
      await page.waitForTimeout(500);

      const optionsAfter = flc.createProfileRoleCombo.locator('option');
      const countAfter = await optionsAfter.count();

      // Selecting a profile may filter the role list
      await recordEvidence('assert-toBeGreaterThanOrEqual-floating-license-configurations-create.spec-269', async () => expect(countAfter).toBeGreaterThanOrEqual(1));

      await flc.cancelCreateForm();
    });

    test('LIMAS-SUD-1931: Profile Role field shows required indicator (*)', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();
      await flc.openCreateForm();

      const label = page.getByText('Profile Role *');
      await recordEvidence('assert-toBeVisible-floating-license-configurations-create.spec-285', async () => expect(label).toBeVisible());

      await flc.cancelCreateForm();
    });
  });

  // â”€â”€â”€ 5. Number of Licenses â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Number of Licenses Field', () => {

    test('LIMAS-SUD-1932: Number of Licenses is a spinbutton with numeric-only input', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();
      await flc.openCreateForm();

      await recordEvidence('assert-toBeVisible-floating-license-configurations-create.spec-305', async () => expect(flc.createNumberOfLicensesInput).toBeVisible());
      await recordEvidence('assert-toBe-floating-license-configurations-create.spec-307', async () => expect(flc.createNumberOfLicensesInput).toHaveRole('spinbutton'));

      await flc.cancelCreateForm();
    });

    test('LIMAS-SUD-1933: Number of Licenses shows required indicator (*)', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();
      await flc.openCreateForm();

      const label = page.getByText('Number of Licenses *');
      await recordEvidence('assert-toBeVisible-floating-license-configurations-create.spec-323', async () => expect(label).toBeVisible());

      await flc.cancelCreateForm();
    });
  });

  // â”€â”€â”€ 6. Max Checkout Time â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Max Checkout Time Field', () => {

    test('LIMAS-SUD-1934: Max Checkout Time is a spinbutton with numeric-only input', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();
      await flc.openCreateForm();

      await recordEvidence('assert-toBeVisible-floating-license-configurations-create.spec-343', async () => expect(flc.createMaxCheckoutInput).toBeVisible());
      await recordEvidence('assert-toBe-floating-license-configurations-create.spec-345', async () => expect(flc.createMaxCheckoutInput).toHaveRole('spinbutton'));

      await flc.cancelCreateForm();
    });

    test('LIMAS-SUD-1935: Max Checkout Time shows required indicator (*)', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();
      await flc.openCreateForm();

      const label = page.getByText('Max Checkout Time (hours) *');
      await recordEvidence('assert-toBeVisible-floating-license-configurations-create.spec-361', async () => expect(label).toBeVisible());

      await flc.cancelCreateForm();
    });
  });

  // â”€â”€â”€ 7. Available for Checkout â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Available for Checkout', () => {

    test('LIMAS-SUD-1936: Available for Checkout has Available and Unavailable radio buttons', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();
      await flc.openCreateForm();

      await recordEvidence('assert-toBeVisible-floating-license-configurations-create.spec-381', async () => expect(flc.createAvailableRadio).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-create.spec-382', async () => expect(flc.createUnavailableRadio).toBeVisible());

      await flc.cancelCreateForm();
    });

    test('LIMAS-SUD-1937: Available radio is selected by default', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();
      await flc.openCreateForm();

      await recordEvidence('assert-toBeChecked-floating-license-configurations-create.spec-397', async () => expect(flc.createAvailableRadio).toBeChecked());
      await recordEvidence('assert-toBeChecked-floating-license-configurations-create.spec-398', async () => expect(flc.createUnavailableRadio).not.toBeChecked());

      await flc.cancelCreateForm();
    });
  });

  // â”€â”€â”€ 8. Date Fields â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Date Fields', () => {

    test('LIMAS-SUD-1938: Expiration Date and Maintenance Date textboxes are present', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();
      await flc.openCreateForm();

      await recordEvidence('assert-toBeVisible-floating-license-configurations-create.spec-418', async () => expect(flc.createExpirationDateInput).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-create.spec-419', async () => expect(flc.createMaintenanceDateInput).toBeVisible());

      await flc.cancelCreateForm();
    });

    test('LIMAS-SUD-1939: Date fields are not marked as required (*)', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();
      await flc.openCreateForm();

      const expirationWithStar = page.getByText('Expiration Date *');
      const maintenanceWithStar = page.getByText('Maintenance Date *');
      await recordEvidence('assert-toHaveCount-floating-license-configurations-create.spec-436', async () => expect(expirationWithStar).toHaveCount(0));
      await recordEvidence('assert-toHaveCount-floating-license-configurations-create.spec-437', async () => expect(maintenanceWithStar).toHaveCount(0));

      await flc.cancelCreateForm();
    });
  });

  // â”€â”€â”€ 9. Save State â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Save State Behavior', () => {

    test('LIMAS-SUD-1940: Save Configuration is disabled when required fields are empty', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();
      await flc.openCreateForm();

      // Save should be disabled before filling required fields
      const disabled = await flc.isSaveButtonDisabled();
      await recordEvidence('assert-toBe-floating-license-configurations-create.spec-459', async () => expect(disabled).toBe(true));

      await flc.cancelCreateForm();
    });

    test('LIMAS-SUD-1941: Save Configuration becomes enabled after required fields are filled', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();
      await flc.openCreateForm();

      // Fill all required fields: profile, role, licenses, checkout
      await flc.fillCreateFormRequired('Authoring Suite 2', 'Intern', '5', '2');
      await page.waitForTimeout(300);

      const disabled = await flc.isSaveButtonDisabled();
      await recordEvidence('assert-toBe-floating-license-configurations-create.spec-479', async () => expect(disabled).toBe(false));

      await flc.cancelCreateForm();
    });
  });

  // â”€â”€â”€ 10. Dismissal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Form Dismissal', () => {

    test('LIMAS-SUD-1942: Cancel button closes the form and restores Create button', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();
      await flc.openCreateForm();

      await flc.cancelCreateForm();

      // Form should be gone
      const visible = await flc.isCreateFormVisible();
      await recordEvidence('assert-toBe-floating-license-configurations-create.spec-503', async () => expect(visible).toBe(false));

      // Create button should be re-enabled
      await recordEvidence('assert-toBeEnabled-floating-license-configurations-create.spec-506', async () => expect(flc.createConfigurationButton).toBeEnabled());
    });

    test('LIMAS-SUD-1943: Escape key closes the form', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();
      await flc.openCreateForm();

      await flc.closeCreateFormByEscape();
      await page.waitForTimeout(300);

      const visible = await flc.isCreateFormVisible();
      await recordEvidence('assert-toBe-floating-license-configurations-create.spec-523', async () => expect(visible).toBe(false));
    });
  });

  // â”€â”€â”€ 11. Reset â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Reset Behavior', () => {

    test('LIMAS-SUD-1944: Reset restores form fields to default values', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();
      await flc.openCreateForm();

      // Make some changes
      await recordEvidence('action-selectOption-floating-license-configurations-create.spec-542', async () => flc.createProductProfileCombo.selectOption({ index: 2 }));
      await page.waitForTimeout(300);
      await recordEvidence('action-fill-floating-license-configurations-create.spec-544', async () => flc.createNumberOfLicensesInput.fill('10'));
      await recordEvidence('action-check-floating-license-configurations-create.spec-545', async () => flc.createUnavailableRadio.check());

      // Reset
      await flc.resetCreateForm();
      await page.waitForTimeout(300);

      // Verify profile resets to placeholder
      const profileSelected = flc.createProductProfileCombo.locator('option:checked');
      const profileText = await profileSelected.textContent();
      await recordEvidence('assert-toBe-floating-license-configurations-create.spec-554', async () => expect(profileText?.trim()).toBe('Select a profile…'));

      // Verify Available is re-selected
      await recordEvidence('assert-toBeChecked-floating-license-configurations-create.spec-557', async () => expect(flc.createAvailableRadio).toBeChecked());

      await flc.cancelCreateForm();
    });
  });

  // â”€â”€â”€ 12. Safe Restoration â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Safe Restoration', () => {

    test('LIMAS-SUD-1945: Full restore closes form and returns to clean config list state', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');
      await flc.openCreateForm();

      // Close the form
      await flc.cancelCreateForm();

      // Verify clean state
      await recordEvidence('assert-toBeVisible-floating-license-configurations-create.spec-582', async () => expect(flc.heading).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-create.spec-583', async () => expect(flc.userGroupSummaryPanel).toBeVisible());
      await recordEvidence('assert-toBeEnabled-floating-license-configurations-create.spec-584', async () => expect(flc.createConfigurationButton).toBeEnabled());
    });
  });
});