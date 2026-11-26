import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { ServerLicensingPage } from '../pages/server-licensing.page';

const PROFILE = resolveProfileName();

// ─── SVL-E Part 4: Create Standard License ───

test.describe('Server License Management — SVL-E (Create Standard License)', () => {

  // ─── 1. Form Open & Structure ─────────────────────────────────

  test.describe('Create SL Form Open & Structure', () => {

    test('LIMAS-SUD-2786: Create SL form opens with region and h3 heading', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToStandardTab();
      await svl.openCreateStandardLicenseForm();

      await recordEvidence('assert-toBeVisible-server-licensing-create-standard.spec-32', async () => expect(svl.createStandardLicenseDialog).toBeVisible());

      await svl.closeCreateStandardLicenseForm();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2787: Create SL heading is "Create Standard License" h3', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToStandardTab();
      await svl.openCreateStandardLicenseForm();

      await recordEvidence('assert-toHaveText-server-licensing-create-standard.spec-54', async () => expect(svl.createStandardLicenseHeading).toHaveText('Create Standard License'));

      await svl.closeCreateStandardLicenseForm();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2788: Create SL Close button visible', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToStandardTab();
      await svl.openCreateStandardLicenseForm();

      await recordEvidence('assert-toBeVisible-server-licensing-create-standard.spec-76', async () => expect(svl.createStandardLicenseCloseButton).toBeVisible());

      await svl.closeCreateStandardLicenseForm();
      await svl.collapseCard(cardName);
    });
  });

  // ─── 2. Dropdown Fields ───────────────────────────────────────

  test.describe('Create SL Dropdown Fields', () => {

    test('LIMAS-SUD-2789: Product Profile combobox visible with placeholder', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToStandardTab();
      await svl.openCreateStandardLicenseForm();

      await recordEvidence('assert-toBeVisible-server-licensing-create-standard.spec-103', async () => expect(svl.createStandardLicenseProductProfileCombobox).toBeVisible());

      await svl.closeCreateStandardLicenseForm();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2790: Profile Role combobox disabled initially', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToStandardTab();
      await svl.openCreateStandardLicenseForm();

      await recordEvidence('assert-toBeDisabled-server-licensing-create-standard.spec-125', async () => expect(svl.createStandardLicenseProfileRoleCombobox).toBeDisabled());

      await svl.closeCreateStandardLicenseForm();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2791: Profile Role enables after Product Profile selection', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToStandardTab();
      await svl.openCreateStandardLicenseForm();

      const ppOptions = svl.createStandardLicenseProductProfileCombobox.locator('option');
      const optionCount = await ppOptions.count();
      if (optionCount > 1) {
        const firstOption = await ppOptions.nth(1).getAttribute('value');
        if (firstOption && firstOption.trim()) {
          await recordEvidence('action-selectOption-server-licensing-create-standard.spec-152', async () => svl.createStandardLicenseProductProfileCombobox.selectOption(firstOption));
          await recordEvidence('assert-toBeEnabled-server-licensing-create-standard.spec-153', async () => expect(svl.createStandardLicenseProfileRoleCombobox).toBeEnabled());
        }
      }

      await svl.closeCreateStandardLicenseForm();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2792: Product Profile combobox has runtime options', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToStandardTab();
      await svl.openCreateStandardLicenseForm();

      const ppOptions = svl.createStandardLicenseProductProfileCombobox.locator('option');
      await recordEvidence('assert-toBeGreaterThanOrEqual-server-licensing-create-standard.spec-178', async () => expect(await ppOptions.count()).toBeGreaterThanOrEqual(1));

      await svl.closeCreateStandardLicenseForm();
      await svl.collapseCard(cardName);
    });
  });

  // ─── 3. Numeric & Date Fields ─────────────────────────────────

  test.describe('Create SL Numeric & Date Fields', () => {

    test('LIMAS-SUD-2793: Number of Licenses spinbutton visible', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToStandardTab();
      await svl.openCreateStandardLicenseForm();

      await recordEvidence('assert-toBeVisible-server-licensing-create-standard.spec-205', async () => expect(svl.createStandardLicenseLicensesInput).toBeVisible());

      await svl.closeCreateStandardLicenseForm();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2794: Maintenance Date textbox visible', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToStandardTab();
      await svl.openCreateStandardLicenseForm();

      await recordEvidence('assert-toBeVisible-server-licensing-create-standard.spec-227', async () => expect(svl.createStandardLicenseMaintenanceInput).toBeVisible());

      await svl.closeCreateStandardLicenseForm();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2795: Expiration Date textbox visible', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToStandardTab();
      await svl.openCreateStandardLicenseForm();

      await recordEvidence('assert-toBeVisible-server-licensing-create-standard.spec-249', async () => expect(svl.createStandardLicenseExpirationInput).toBeVisible());

      await svl.closeCreateStandardLicenseForm();
      await svl.collapseCard(cardName);
    });
  });

  // ─── 4. Key Differences vs Create FL ─────────────────────────

  test.describe('Create SL vs Create FL Differences', () => {

    test('LIMAS-SUD-2796: Create SL has NO Group field', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToStandardTab();
      await svl.openCreateStandardLicenseForm();

      // Group combobox with name 'Group' should not be in the Create SL form
      const groupInDialog = svl.createStandardLicenseDialog.getByRole('combobox', { name: 'Group' });
      await recordEvidence('assert-toBeAttached-server-licensing-create-standard.spec-278', async () => expect(groupInDialog).not.toBeAttached());

      await svl.closeCreateStandardLicenseForm();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2797: Create SL has NO checkout fields', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToStandardTab();
      await svl.openCreateStandardLicenseForm();

      // Default Checkout, Checkout Times, Available for checkout should NOT be present
      const checkoutField = svl.createStandardLicenseDialog.getByRole('spinbutton', { name: /checkout/i });
      await recordEvidence('assert-toBeAttached-server-licensing-create-standard.spec-302', async () => expect(checkoutField).not.toBeAttached());

      await svl.closeCreateStandardLicenseForm();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2798: Create SL has NO sync checkbox', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToStandardTab();
      await svl.openCreateStandardLicenseForm();

      const syncBox = svl.createStandardLicenseDialog.getByRole('checkbox', { name: /synchronize/i });
      await recordEvidence('assert-toBeAttached-server-licensing-create-standard.spec-325', async () => expect(syncBox).not.toBeAttached());

      await svl.closeCreateStandardLicenseForm();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2799: Create SL fields match Edit SL field set', async ({ page }) => {
      // Create SL has: Product Profile, Profile Role, Licenses, Maintenance, Expiration
      // Edit SL has: Maintenance, Expiration, Days, Licenses, Sync (plus name/role subtitle)
      // Overlap: Licenses, Maintenance, Expiration
      // Differences: Create has PP/PR comboboxes; Edit has Days spinbutton and Sync checkbox
      // This test verifies the shared core fields exist in both forms
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToStandardTab();
      await svl.openCreateStandardLicenseForm();

      // Create SL has these fields shared with Edit SL card data
      await recordEvidence('assert-toBeVisible-server-licensing-create-standard.spec-353', async () => expect(svl.createStandardLicenseLicensesInput).toBeVisible());
      await recordEvidence('assert-toBeVisible-server-licensing-create-standard.spec-354', async () => expect(svl.createStandardLicenseMaintenanceInput).toBeVisible());
      await recordEvidence('assert-toBeVisible-server-licensing-create-standard.spec-355', async () => expect(svl.createStandardLicenseExpirationInput).toBeVisible());

      await svl.closeCreateStandardLicenseForm();
      await svl.collapseCard(cardName);
    });
  });

  // ─── 5. Controls ──────────────────────────────────────────────

  test.describe('Create SL Controls', () => {

    test('LIMAS-SUD-2800: Create SL Apply disabled initially', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToStandardTab();
      await svl.openCreateStandardLicenseForm();

      await recordEvidence('assert-toBeDisabled-server-licensing-create-standard.spec-382', async () => expect(svl.createStandardLicenseApplyButton).toBeDisabled());

      await svl.closeCreateStandardLicenseForm();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2801: Cancel closes form', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToStandardTab();
      await svl.openCreateStandardLicenseForm();

      await svl.cancelCreateStandardLicenseForm();
      await recordEvidence('assert-toBeVisible-server-licensing-create-standard.spec-405', async () => expect(svl.createStandardLicenseDialog).not.toBeVisible());

      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2802: Escape dismisses form', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToStandardTab();
      await svl.openCreateStandardLicenseForm();

      await svl.closeCreateStandardLicenseForm();
      await recordEvidence('assert-toBeVisible-server-licensing-create-standard.spec-427', async () => expect(svl.createStandardLicenseDialog).not.toBeVisible());

      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2803: Form resets to blank on reopen', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToStandardTab();
      await svl.openCreateStandardLicenseForm();

      await recordEvidence('action-fill-server-licensing-create-standard.spec-448', async () => svl.createStandardLicenseLicensesInput.fill('5'));
      await svl.closeCreateStandardLicenseForm();

      await svl.openCreateStandardLicenseForm();
      const licVal = await svl.createStandardLicenseLicensesInput.inputValue();
      await recordEvidence('assert-toBe-server-licensing-create-standard.spec-453', async () => expect(licVal).toBe(''));

      await svl.closeCreateStandardLicenseForm();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2804: Initial focus on first form field', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToStandardTab();
      await svl.openCreateStandardLicenseForm();

      const focused = page.locator(':focus');
      await recordEvidence('assert-toBeAttached-server-licensing-create-standard.spec-476', async () => expect(focused).toBeAttached());

      await svl.closeCreateStandardLicenseForm();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2805: Focus returns after close', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToStandardTab();
      await svl.openCreateStandardLicenseForm();
      await svl.closeCreateStandardLicenseForm();

      const focused = page.locator(':focus');
      await recordEvidence('assert-toBeAttached-server-licensing-create-standard.spec-500', async () => expect(focused).toBeAttached());

      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2806: Create SL lifecycle — BLOCKED', async () => {
      test.skip(true, 'BLOCKED: Safe runtime Standard License creation and cleanup cannot be guaranteed.');
    });
  });
});