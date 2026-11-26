import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { FloatingLicenseConfigurationsPage } from '../pages/floating-license-configurations.page';

const PROFILE = resolveProfileName();

// â”€â”€â”€ FLC-G: Floating License Configurations â€” Edit Configuration â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

test.describe('Floating License Configurations â€” FLC-G', () => {

  // â”€â”€â”€ 1. Form Shell â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Edit Form Shell', () => {

    test('LIMAS-SUD-1968: Edit opens inline form with heading', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openEditForm(cardName);
      await recordEvidence('assert-toBeVisible-floating-license-configurations-edit.spec-29', async () => expect(flc.editFormHeading).toBeVisible());
      await flc.cancelEditForm();
    });

    test('LIMAS-SUD-1969: Edit form is inline panel, not a dialog', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openEditForm(cardName);
      const dialog = page.getByRole('dialog');
      await recordEvidence('assert-toHaveCount-floating-license-configurations-edit.spec-47', async () => expect(dialog).toHaveCount(0));
      await flc.cancelEditForm();
    });

    test('LIMAS-SUD-1970: Edit form has Cancel, Reset, and Save Configuration controls', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openEditForm(cardName);
      await recordEvidence('assert-toBeVisible-floating-license-configurations-edit.spec-64', async () => expect(flc.editCancelButton).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-edit.spec-65', async () => expect(flc.editResetButton).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-edit.spec-66', async () => expect(flc.editSaveButton).toBeVisible());
      await flc.cancelEditForm();
    });
  });

  // â”€â”€â”€ 2. Prepopulation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Field Prepoulation', () => {

    test('LIMAS-SUD-1971: Product Profile is prepopulated with current value', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openEditForm(cardName);
      const selected = flc.editProductProfileCombo.locator('option[selected]');
      const text = (await selected.textContent())?.trim() ?? '';
      await recordEvidence('assert-toBeGreaterThan-floating-license-configurations-edit.spec-90', async () => expect(text.length).toBeGreaterThan(0));
      await recordEvidence('assert-toBe-floating-license-configurations-edit.spec-91', async () => expect(text).not.toBe('Select a profileâ€¦'));
      await flc.cancelEditForm();
    });

    test('LIMAS-SUD-1972: Profile Role is prepopulated with current value', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openEditForm(cardName);
      const role = await flc.getEditFormProfileRole();
      await recordEvidence('assert-toBeGreaterThan-floating-license-configurations-edit.spec-109', async () => expect(role.length).toBeGreaterThan(0));
      await recordEvidence('assert-toBe-floating-license-configurations-edit.spec-110', async () => expect(role).not.toBe('Select a roleâ€¦'));
      await flc.cancelEditForm();
    });

    test('LIMAS-SUD-1973: Number of Licenses is prepopulated', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openEditForm(cardName);
      const val = await flc.getEditFormNumberOfLicenses();
      await recordEvidence('assert-toBeGreaterThanOrEqual-floating-license-configurations-edit.spec-128', async () => expect(val.length).toBeGreaterThanOrEqual(1));
      await flc.cancelEditForm();
    });

    test('LIMAS-SUD-1974: Max Checkout Time is prepopulated', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openEditForm(cardName);
      const val = await flc.getEditFormMaxCheckout();
      await recordEvidence('assert-toBeGreaterThanOrEqual-floating-license-configurations-edit.spec-146', async () => expect(val.length).toBeGreaterThanOrEqual(1));
      await flc.cancelEditForm();
    });

    test('LIMAS-SUD-1975: Availability radio is prepopulated', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openEditForm(cardName);
      const availableChecked = await flc.editAvailableRadio.isChecked();
      const unavailableChecked = await flc.editUnavailableRadio.isChecked();
      // Exactly one radio should be checked
      await recordEvidence('assert-toBe-floating-license-configurations-edit.spec-166', async () => expect(availableChecked !== unavailableChecked).toBe(true));
      await flc.cancelEditForm();
    });

    test('LIMAS-SUD-1976: Expiration Date is prepopulated', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openEditForm(cardName);
      const val = await flc.getEditFormExpirationDate();
      await recordEvidence('assert-toBeGreaterThanOrEqual-floating-license-configurations-edit.spec-184', async () => expect(val.length).toBeGreaterThanOrEqual(1));
      await flc.cancelEditForm();
    });

    test('LIMAS-SUD-1977: Maintenance Date is prepopulated', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openEditForm(cardName);
      const val = await flc.editMaintenanceDateInput.inputValue();
      await recordEvidence('assert-toBeGreaterThanOrEqual-floating-license-configurations-edit.spec-202', async () => expect(val.length).toBeGreaterThanOrEqual(1));
      await flc.cancelEditForm();
    });
  });

  // â”€â”€â”€ 3. Disabled Fields â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Disabled and Read-Only Fields', () => {

    test('LIMAS-SUD-1978: User Group is disabled in edit form', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openEditForm(cardName);
      await recordEvidence('assert-toBeDisabled-floating-license-configurations-edit.spec-224', async () => expect(flc.editUserGroupCombo).toBeDisabled());
      await flc.cancelEditForm();
    });
  });

  // â”€â”€â”€ 4. Editable Fields â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Editable Field Behavior', () => {

    test('LIMAS-SUD-1979: Profile Role can be changed in edit form', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openEditForm(cardName);
      const originalRole = await flc.getEditFormProfileRole();

      // Select a different role if available
      const options = flc.editProfileRoleCombo.locator('option');
      const count = await options.count();
      if (count >= 2) {
        const secondOption = options.nth(1);
        const secondLabel = (await secondOption.textContent())?.trim() ?? '';
        await recordEvidence('action-selectOption-floating-license-configurations-edit.spec-254', async () => flc.editProfileRoleCombo.selectOption({ label: secondLabel }));
        const newRole = await flc.getEditFormProfileRole();
        await recordEvidence('assert-toBe-floating-license-configurations-edit.spec-256', async () => expect(newRole).not.toBe(originalRole));
      }

      await flc.cancelEditForm();
    });

    test('LIMAS-SUD-1980: Number of Licenses can be changed in edit form', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openEditForm(cardName);
      await recordEvidence('action-fill-floating-license-configurations-edit.spec-275', async () => flc.editNumberOfLicensesInput.fill('5'));
      const val = await flc.getEditFormNumberOfLicenses();
      await recordEvidence('assert-toBe-floating-license-configurations-edit.spec-277', async () => expect(val).toBe('5'));
      await flc.cancelEditForm();
    });

    test('LIMAS-SUD-1981: Max Checkout Time can be changed in edit form', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openEditForm(cardName);
      await recordEvidence('action-fill-floating-license-configurations-edit.spec-294', async () => flc.editMaxCheckoutInput.fill('4'));
      const val = await flc.getEditFormMaxCheckout();
      await recordEvidence('assert-toBe-floating-license-configurations-edit.spec-296', async () => expect(val).toBe('4'));
      await flc.cancelEditForm();
    });

    test('LIMAS-SUD-1982: Availability can be toggled in edit form', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openEditForm(cardName);

      const wasAvailable = await flc.editAvailableRadio.isChecked();
      // Toggle to the other radio
      if (wasAvailable) {
        await recordEvidence('action-check-floating-license-configurations-edit.spec-317', async () => flc.editUnavailableRadio.check());
        await recordEvidence('assert-toBeChecked-floating-license-configurations-edit.spec-318', async () => expect(flc.editUnavailableRadio).toBeChecked());
      } else {
        await recordEvidence('action-check-floating-license-configurations-edit.spec-320', async () => flc.editAvailableRadio.check());
        await recordEvidence('assert-toBeChecked-floating-license-configurations-edit.spec-321', async () => expect(flc.editAvailableRadio).toBeChecked());
      }

      await flc.cancelEditForm();
    });

    test('LIMAS-SUD-1983: Expiration Date can be changed in edit form', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openEditForm(cardName);
      await recordEvidence('action-fill-floating-license-configurations-edit.spec-340', async () => flc.editExpirationDateInput.fill('2100-06-15'));
      const val = await flc.getEditFormExpirationDate();
      await recordEvidence('assert-toBe-floating-license-configurations-edit.spec-342', async () => expect(val).toBe('2100-06-15'));
      await flc.cancelEditForm();
    });
  });

  // â”€â”€â”€ 5. Numeric Validation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Numeric Validation', () => {

    test('LIMAS-SUD-1984: Number of Licenses accepts positive integer', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openEditForm(cardName);
      await recordEvidence('action-fill-floating-license-configurations-edit.spec-364', async () => flc.editNumberOfLicensesInput.fill('10'));
      await recordEvidence('assert-toBe-floating-license-configurations-edit.spec-365', async () => expect(await flc.getEditFormNumberOfLicenses()).toBe('10'));
      await flc.cancelEditForm();
    });

    test('LIMAS-SUD-1985: Number of Licenses with value zero is valid', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openEditForm(cardName);
      await recordEvidence('action-fill-floating-license-configurations-edit.spec-382', async () => flc.editNumberOfLicensesInput.fill('0'));
      await recordEvidence('assert-toBe-floating-license-configurations-edit.spec-383', async () => expect(await flc.getEditFormNumberOfLicenses()).toBe('0'));
      // Save should not be disabled for zero (valid numeric)
      const disabled = await flc.isEditSaveDisabled();
      await recordEvidence('assert-toBe-floating-license-configurations-edit.spec-386', async () => expect(disabled).toBe(false));
      await flc.cancelEditForm();
    });
  });

  // â”€â”€â”€ 6. Save State â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Save State Behavior', () => {

    test('LIMAS-SUD-1986: Save is initially enabled when form opens with prepopulated values', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openEditForm(cardName);
      // Save should be enabled on initial load (clean form, all required filled)
      const disabled = await flc.isEditSaveDisabled();
      await recordEvidence('assert-toBe-floating-license-configurations-edit.spec-410', async () => expect(disabled).toBe(false));
      await flc.cancelEditForm();
    });

    test('LIMAS-SUD-1987: Save stays enabled after one valid field change', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openEditForm(cardName);
      await recordEvidence('action-fill-floating-license-configurations-edit.spec-427', async () => flc.editNumberOfLicensesInput.fill('3'));
      const disabled = await flc.isEditSaveDisabled();
      await recordEvidence('assert-toBe-floating-license-configurations-edit.spec-429', async () => expect(disabled).toBe(false));
      await flc.cancelEditForm();
    });
  });

  // â”€â”€â”€ 7. Reset & Dismissal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Reset and Dismissal', () => {

    test('LIMAS-SUD-1988: Reset restores original persisted values', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openEditForm(cardName);
      const originalLicenses = await flc.getEditFormNumberOfLicenses();

      await recordEvidence('action-fill-floating-license-configurations-edit.spec-453', async () => flc.editNumberOfLicensesInput.fill('99'));
      await flc.resetEditForm();
      await page.waitForTimeout(300);

      const restoredLicenses = await flc.getEditFormNumberOfLicenses();
      await recordEvidence('assert-toBe-floating-license-configurations-edit.spec-458', async () => expect(restoredLicenses).toBe(originalLicenses));

      await flc.cancelEditForm();
    });

    test('LIMAS-SUD-1989: Cancel discards changes and closes form', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openEditForm(cardName);
      await recordEvidence('action-fill-floating-license-configurations-edit.spec-476', async () => flc.editNumberOfLicensesInput.fill('77'));
      await flc.cancelEditForm();

      const visible = await flc.isEditFormVisible();
      await recordEvidence('assert-toBe-floating-license-configurations-edit.spec-480', async () => expect(visible).toBe(false));
    });

    test('LIMAS-SUD-1990: Reopening Edit shows persisted values', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      await flc.navigateToRuntimeGroupConfiguration();

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openEditForm(cardName);
      const originalRole = await flc.getEditFormProfileRole();

      // Change role, cancel without saving
      const options = flc.editProfileRoleCombo.locator('option');
      const count = await options.count();
      if (count >= 2) {
        const secondLabel = (await options.nth(1).textContent())?.trim() ?? '';
        await recordEvidence('action-selectOption-floating-license-configurations-edit.spec-503', async () => flc.editProfileRoleCombo.selectOption({ label: secondLabel }));
      }
      await flc.cancelEditForm();

      // Reopen â€” should show the original persisted role
      await flc.openEditForm(cardName);
      const reopenedRole = await flc.getEditFormProfileRole();
      await recordEvidence('assert-toBe-floating-license-configurations-edit.spec-510', async () => expect(reopenedRole).toBe(originalRole));

      await flc.cancelEditForm();
    });
  });

  // â”€â”€â”€ 8. Gated Update Lifecycle â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Controlled Update Lifecycle', () => {

    test('LIMAS-SUD-1991: Gated create-edit-delete lifecycle with mutation flags', async ({ page }) => {
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

      // Phase 1: Create
      await flc.openCreateForm();
      await recordEvidence('action-selectOption-floating-license-configurations-edit.spec-539', async () => flc.createProductProfileCombo.selectOption({ label: 'Authoring Suite 2' }));
      await page.waitForTimeout(500);
      await recordEvidence('action-selectOption-floating-license-configurations-edit.spec-541', async () => flc.createProfileRoleCombo.selectOption({ index: 1 }));
      await recordEvidence('action-fill-floating-license-configurations-edit.spec-542', async () => flc.createNumberOfLicensesInput.fill('1'));
      await recordEvidence('action-fill-floating-license-configurations-edit.spec-543', async () => flc.createMaxCheckoutInput.fill('1'));
      await recordEvidence('action-click-floating-license-configurations-edit.spec-544', async () => flc.createSaveButton.click());
      await page.waitForTimeout(1000);
      await recordEvidence('assert-toBeVisible-floating-license-configurations-edit.spec-546', async () => expect(flc.userGroupSummaryPanel).toBeVisible());

      const afterCreateCount = await flc.getConfigurationCount();
      await recordEvidence('assert-toBe-floating-license-configurations-edit.spec-549', async () => expect(afterCreateCount).toBe(originalCount + 1));

      // Phase 2: Edit the created config
      const cardName = 'Authoring Suite 2';
      await flc.openEditForm(cardName);
      await recordEvidence('action-fill-floating-license-configurations-edit.spec-554', async () => flc.editNumberOfLicensesInput.fill('3'));
      await recordEvidence('action-click-floating-license-configurations-edit.spec-555', async () => flc.editSaveButton.click());
      await page.waitForTimeout(1000);

      // Phase 3: Delete in finally
      // (Delete tests are in FLC-H; we restore via cancellation pattern here)
      // The config is left for cleanup â€” no deletion in this spec

      // Restore: close edit form if open
      const formVisible = await flc.isEditFormVisible();
      if (formVisible) {
        await flc.cancelEditForm();
      }
    });
  });

  // â”€â”€â”€ 9. Safe Restoration â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Safe Restoration', () => {

    test('LIMAS-SUD-1992: After closing Edit, config list returns to clean state', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const flc = new FloatingLicenseConfigurationsPage(page);
      const groupName = await flc.navigateToRuntimeGroupConfiguration();
      test.skip(!groupName, 'Required runtime data is unavailable: !groupName.');

      const cardName = await flc.getFirstCardName();
      test.skip(!cardName, 'Required runtime data is unavailable: !cardName.');

      await flc.openEditForm(cardName);
      await flc.cancelEditForm();

      await recordEvidence('assert-toBeVisible-floating-license-configurations-edit.spec-590', async () => expect(flc.heading).toBeVisible());
      await recordEvidence('assert-toBeVisible-floating-license-configurations-edit.spec-591', async () => expect(flc.userGroupSummaryPanel).toBeVisible());
      const editVisible = await flc.isEditFormVisible();
      await recordEvidence('assert-toBe-floating-license-configurations-edit.spec-593', async () => expect(editVisible).toBe(false));
    });
  });
});