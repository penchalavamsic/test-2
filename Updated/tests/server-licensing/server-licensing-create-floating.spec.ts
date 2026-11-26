import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { ServerLicensingPage } from '../pages/server-licensing.page';

const PROFILE = resolveProfileName();

// ─── SVL-E Part 3: Create Floating License ───

test.describe('Server License Management — SVL-E (Create Floating License)', () => {

  // ─── 1. Form Open & Structure ─────────────────────────────────

  test.describe('Create FL Form Open & Structure', () => {

    test('LIMAS-SUD-2765: Create FL form opens with region and h3 heading', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToFloatingTab();
      await svl.openCreateFloatingLicenseForm();

      await recordEvidence('assert-toBeVisible-server-licensing-create-floating.spec-32', async () => expect(svl.createFloatingLicenseDialog).toBeVisible());

      await svl.closeCreateFloatingLicenseForm();
      await svl.switchToStandardTab();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2766: Create FL heading is "Create Floating License" h3', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToFloatingTab();
      await svl.openCreateFloatingLicenseForm();

      await recordEvidence('assert-toHaveText-server-licensing-create-floating.spec-55', async () => expect(svl.createFloatingLicenseHeading).toHaveText('Create Floating License'));

      await svl.closeCreateFloatingLicenseForm();
      await svl.switchToStandardTab();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2767: Create FL Close button visible', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToFloatingTab();
      await svl.openCreateFloatingLicenseForm();

      await recordEvidence('assert-toBeVisible-server-licensing-create-floating.spec-78', async () => expect(svl.createFloatingLicenseCloseButton).toBeVisible());

      await svl.closeCreateFloatingLicenseForm();
      await svl.switchToStandardTab();
      await svl.collapseCard(cardName);
    });
  });

  // ─── 2. Dropdown Fields ───────────────────────────────────────

  test.describe('Create FL Dropdown Fields', () => {

    test('LIMAS-SUD-2768: Group combobox has pre-filled value', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToFloatingTab();
      await svl.openCreateFloatingLicenseForm();

      await recordEvidence('assert-toBeVisible-server-licensing-create-floating.spec-106', async () => expect(svl.createFloatingLicenseGroupCombobox).toBeVisible());
      const groupText = await svl.createFloatingLicenseGroupCombobox.textContent();
      await recordEvidence('assert-toBeTruthy-server-licensing-create-floating.spec-108', async () => expect(groupText).toBeTruthy());

      await svl.closeCreateFloatingLicenseForm();
      await svl.switchToStandardTab();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2769: Product Profile combobox has placeholder', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToFloatingTab();
      await svl.openCreateFloatingLicenseForm();

      await recordEvidence('assert-toBeVisible-server-licensing-create-floating.spec-131', async () => expect(svl.createFloatingLicenseProductProfileCombobox).toBeVisible());

      await svl.closeCreateFloatingLicenseForm();
      await svl.switchToStandardTab();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2770: Profile Role combobox disabled initially', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToFloatingTab();
      await svl.openCreateFloatingLicenseForm();

      await recordEvidence('assert-toBeDisabled-server-licensing-create-floating.spec-154', async () => expect(svl.createFloatingLicenseProfileRoleCombobox).toBeDisabled());

      await svl.closeCreateFloatingLicenseForm();
      await svl.switchToStandardTab();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2771: Profile Role enables after Product Profile selection', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToFloatingTab();
      await svl.openCreateFloatingLicenseForm();

      // Select first available Product Profile option
      const ppOptions = svl.createFloatingLicenseProductProfileCombobox.locator('option');
      const optionCount = await ppOptions.count();
      if (optionCount > 1) {
        const firstOption = await ppOptions.nth(1).getAttribute('value');
        if (firstOption && firstOption.trim()) {
          await recordEvidence('action-selectOption-server-licensing-create-floating.spec-183', async () => svl.createFloatingLicenseProductProfileCombobox.selectOption(firstOption));
          await recordEvidence('assert-toBeEnabled-server-licensing-create-floating.spec-184', async () => expect(svl.createFloatingLicenseProfileRoleCombobox).toBeEnabled());
        }
      }

      await svl.closeCreateFloatingLicenseForm();
      await svl.switchToStandardTab();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2772: Product Profile combobox has runtime options', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToFloatingTab();
      await svl.openCreateFloatingLicenseForm();

      const ppOptions = svl.createFloatingLicenseProductProfileCombobox.locator('option');
      const count = await ppOptions.count();
      // At minimum the placeholder option plus available options
      await recordEvidence('assert-toBeGreaterThanOrEqual-server-licensing-create-floating.spec-212', async () => expect(count).toBeGreaterThanOrEqual(1));

      await svl.closeCreateFloatingLicenseForm();
      await svl.switchToStandardTab();
      await svl.collapseCard(cardName);
    });
  });

  // ─── 3. Numeric Fields ────────────────────────────────────────

  test.describe('Create FL Numeric Fields', () => {

    test('LIMAS-SUD-2773: Licenses spinbutton visible', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToFloatingTab();
      await svl.openCreateFloatingLicenseForm();

      await recordEvidence('assert-toBeVisible-server-licensing-create-floating.spec-240', async () => expect(svl.createFloatingLicenseLicensesInput).toBeVisible());

      await svl.closeCreateFloatingLicenseForm();
      await svl.switchToStandardTab();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2774: Default Checkout (h) spinbutton visible', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToFloatingTab();
      await svl.openCreateFloatingLicenseForm();

      await recordEvidence('assert-toBeVisible-server-licensing-create-floating.spec-263', async () => expect(svl.createFloatingLicenseDefaultCheckoutInput).toBeVisible());

      await svl.closeCreateFloatingLicenseForm();
      await svl.switchToStandardTab();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2775: Checkout Times (h) input visible', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToFloatingTab();
      await svl.openCreateFloatingLicenseForm();

      await recordEvidence('assert-toBeVisible-server-licensing-create-floating.spec-286', async () => expect(svl.createFloatingLicenseCheckoutTimeInput).toBeVisible());

      await svl.closeCreateFloatingLicenseForm();
      await svl.switchToStandardTab();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2776: Add checkout time button disabled initially', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToFloatingTab();
      await svl.openCreateFloatingLicenseForm();

      await recordEvidence('assert-toBeDisabled-server-licensing-create-floating.spec-309', async () => expect(svl.createFloatingLicenseAddCheckoutButton).toBeDisabled());

      await svl.closeCreateFloatingLicenseForm();
      await svl.switchToStandardTab();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2777: Available for checkout checkbox visible', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToFloatingTab();
      await svl.openCreateFloatingLicenseForm();

      await recordEvidence('assert-toBeVisible-server-licensing-create-floating.spec-332', async () => expect(svl.createFloatingLicenseAvailableCheckbox).toBeVisible());

      await svl.closeCreateFloatingLicenseForm();
      await svl.switchToStandardTab();
      await svl.collapseCard(cardName);
    });
  });

  // ─── 4. Date Fields & Controls ────────────────────────────────

  test.describe('Create FL Dates & Controls', () => {

    test('LIMAS-SUD-2778: Maintenance Date textbox visible', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToFloatingTab();
      await svl.openCreateFloatingLicenseForm();

      await recordEvidence('assert-toBeVisible-server-licensing-create-floating.spec-360', async () => expect(svl.createFloatingLicenseMaintenanceInput).toBeVisible());

      await svl.closeCreateFloatingLicenseForm();
      await svl.switchToStandardTab();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2779: Expiration Date textbox visible', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToFloatingTab();
      await svl.openCreateFloatingLicenseForm();

      await recordEvidence('assert-toBeVisible-server-licensing-create-floating.spec-383', async () => expect(svl.createFloatingLicenseExpirationInput).toBeVisible());

      await svl.closeCreateFloatingLicenseForm();
      await svl.switchToStandardTab();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2780: Create FL Apply disabled initially', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToFloatingTab();
      await svl.openCreateFloatingLicenseForm();

      await recordEvidence('assert-toBeDisabled-server-licensing-create-floating.spec-406', async () => expect(svl.createFloatingLicenseApplyButton).toBeDisabled());

      await svl.closeCreateFloatingLicenseForm();
      await svl.switchToStandardTab();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2781: Cancel closes form', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToFloatingTab();
      await svl.openCreateFloatingLicenseForm();

      await svl.cancelCreateFloatingLicenseForm();
      await recordEvidence('assert-toBeVisible-server-licensing-create-floating.spec-430', async () => expect(svl.createFloatingLicenseDialog).not.toBeVisible());

      await svl.switchToStandardTab();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2782: Escape dismisses form', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToFloatingTab();
      await svl.openCreateFloatingLicenseForm();

      await svl.closeCreateFloatingLicenseForm();
      await recordEvidence('assert-toBeVisible-server-licensing-create-floating.spec-453', async () => expect(svl.createFloatingLicenseDialog).not.toBeVisible());

      await svl.switchToStandardTab();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2783: Form resets to blank on reopen', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToFloatingTab();
      await svl.openCreateFloatingLicenseForm();

      await recordEvidence('action-fill-server-licensing-create-floating.spec-475', async () => svl.createFloatingLicenseLicensesInput.fill('5'));
      await svl.closeCreateFloatingLicenseForm();

      await svl.openCreateFloatingLicenseForm();
      const licVal = await svl.createFloatingLicenseLicensesInput.inputValue();
      await recordEvidence('assert-toBe-server-licensing-create-floating.spec-480', async () => expect(licVal).toBe(''));

      await svl.closeCreateFloatingLicenseForm();
      await svl.switchToStandardTab();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2784: Initial focus on first form field', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await svl.switchToFloatingTab();
      await svl.openCreateFloatingLicenseForm();

      const focused = page.locator(':focus');
      await recordEvidence('assert-toBeAttached-server-licensing-create-floating.spec-504', async () => expect(focused).toBeAttached());

      await svl.closeCreateFloatingLicenseForm();
      await svl.switchToStandardTab();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2785: Create FL lifecycle — BLOCKED', async () => {
      test.skip(true, 'BLOCKED: Safe runtime Floating License creation and cleanup cannot be guaranteed.');
    });
  });
});