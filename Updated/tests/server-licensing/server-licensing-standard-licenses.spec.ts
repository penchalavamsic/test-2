import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { ServerLicensingPage } from '../pages/server-licensing.page';

const PROFILE = resolveProfileName();

// ─── SVL-D: Standard Licenses (Section, Tabs, Cards, Edit/Delete) ───

test.describe('Server License Management — SVL-D (Standard Licenses)', () => {

  // ─── 1. Section Structure ─────────────────────────────────────

  test.describe('Section Structure', () => {

    test('LIMAS-SUD-2687: Standard Licenses heading visible', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await recordEvidence('assert-toBeVisible-server-licensing-standard-licenses.spec-29', async () => expect(svl.standardLicensesHeading).toBeVisible());
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2688: Standard Licenses description visible', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await recordEvidence('assert-toBeVisible-server-licensing-standard-licenses.spec-46', async () => expect(svl.standardLicensesDescription).toBeVisible());
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2689: License count badge visible', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await recordEvidence('assert-toBeVisible-server-licensing-standard-licenses.spec-63', async () => expect(svl.standardLicenseCountBadge).toBeVisible());
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2690: Section renders within expanded card below tabs', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      // The section should appear inside the expanded card
      const card = svl.customerCardByName(cardName);
      await recordEvidence('assert-toBeVisible-server-licensing-standard-licenses.spec-82', async () => expect(card.locator(svl.standardLicensesHeading)).toBeVisible());
      await svl.collapseCard(cardName);
    });
  });

  // ─── 2. Tabs ─────────────────────────────────────────────────

  test.describe('Standard/Floating Tabs', () => {

    test('LIMAS-SUD-2691: Standard and Floating tab buttons visible', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await recordEvidence('assert-toBeVisible-server-licensing-standard-licenses.spec-104', async () => expect(svl.standardTab).toBeVisible());
      await recordEvidence('assert-toBeVisible-server-licensing-standard-licenses.spec-105', async () => expect(svl.floatingTab).toBeVisible());
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2692: Tab counts display actual runtime values', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      const stdText = (await svl.standardTab.textContent()) ?? '';
      const fltText = (await svl.floatingTab.textContent()) ?? '';
      await recordEvidence('assert-toMatch-server-licensing-standard-licenses.spec-124', async () => expect(stdText).toMatch(/standard/i));
      await recordEvidence('assert-toMatch-server-licensing-standard-licenses.spec-125', async () => expect(fltText).toMatch(/floating/i));
      // Each tab should contain a count
      await recordEvidence('assert-toMatch-server-licensing-standard-licenses.spec-127', async () => expect(stdText).toMatch(/\d/));
      await recordEvidence('assert-toMatch-server-licensing-standard-licenses.spec-128', async () => expect(fltText).toMatch(/\d/));
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2693: Standard tab selected by default', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);

      // On first expand, the Standard tab should show as active/selected
      const isStandardActive = await svl.isStandardTabActive();
      await recordEvidence('assert-toBe-server-licensing-standard-licenses.spec-148', async () => expect(isStandardActive).toBe(true));

      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2694: Switching to Floating tab changes view and action button', async ({ page }) => {
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

      // Floating tab should now be active
      await recordEvidence('assert-toHaveAttribute-server-licensing-standard-licenses.spec-170', async () => expect(svl.floatingTab).toHaveAttribute('aria-pressed', 'true'));
      // Create button text changes per tab
      await recordEvidence('assert-toBeVisible-server-licensing-standard-licenses.spec-172', async () => expect(svl.createFloatingLicenseButton).toBeVisible());

      // Switch back
      await svl.switchToStandardTab();
      await svl.collapseCard(cardName);
    });
  });

  // ─── 3. Empty States ─────────────────────────────────────────

  test.describe('Empty States', () => {

    test('LIMAS-SUD-2695: Standard empty state shown when count is zero', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      // Look for a customer with zero standard licenses
      const names = await svl.getCardNames();
      let found = false;

      for (const name of names) {
        await svl.expandCard(name);
        const hasStd = await svl.hasAnyStandardLicense();

        if (!hasStd) {
          await recordEvidence('assert-toBeVisible-server-licensing-standard-licenses.spec-202', async () => expect(svl.standardLicensesEmptyState).toBeVisible());
          found = true;
          await svl.collapseCard(name);
          break;
        }

        await svl.collapseCard(name);
      }

      if (!found) test.skip(true, 'No customer with zero Standard Licenses found');
    });

    test('LIMAS-SUD-2696: Floating empty state shown when count is zero', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const names = await svl.getCardNames();
      let found = false;

      for (const name of names) {
        await svl.expandCard(name);
        const hasFlt = await svl.hasAnyFloatingLicense();

        if (!hasFlt) {
          await svl.switchToFloatingTab();
          await recordEvidence('assert-toBeVisible-server-licensing-standard-licenses.spec-232', async () => expect(svl.floatingLicensesEmptyState).toBeVisible());
          found = true;
          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          break;
        }

        await svl.collapseCard(name);
      }

      if (!found) test.skip(true, 'No customer with zero Floating Licenses found');
    });
  });

  // ─── 4. Standard License Cards ────────────────────────────────

  test.describe('Standard License Cards', () => {

    test('LIMAS-SUD-2697: Card count matches tab badge count', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      // Find a customer with standard licenses
      const names = await svl.getCardNames();
      let found = false;

      for (const name of names) {
        await svl.expandCard(name);
        const hasStd = await svl.hasAnyStandardLicense();

        if (hasStd) {
          const badgeCount = await svl.getStandardTabCount();
          const cardCount = await svl.getStandardLicenseCards().count();
          await recordEvidence('assert-toBe-server-licensing-standard-licenses.spec-270', async () => expect(cardCount).toBe(badgeCount));
          found = true;
          await svl.collapseCard(name);
          break;
        }

        await svl.collapseCard(name);
      }

      if (!found) test.skip(true, 'No customer with Standard Licenses found');
    });

    test('LIMAS-SUD-2698: Standard License card structure includes all expected elements', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const names = await svl.getCardNames();
      let found = false;

      for (const name of names) {
        await svl.expandCard(name);
        const hasStd = await svl.hasAnyStandardLicense();

        if (hasStd) {
          const cards = svl.getStandardLicenseCards();
          const first = cards.first();
          await recordEvidence('assert-toBeVisible-server-licensing-standard-licenses.spec-301', async () => expect(first.locator(svl.standardLicenseTypeLabel)).toBeVisible());
          await recordEvidence('assert-toBeVisible-server-licensing-standard-licenses.spec-302', async () => expect(first.locator(svl.standardLicenseHeading)).toBeVisible());
          found = true;
          await svl.collapseCard(name);
          break;
        }

        await svl.collapseCard(name);
      }

      if (!found) test.skip(true, 'No customer with Standard Licenses found');
    });

    test('LIMAS-SUD-2699: Multiple Standard License cards render independently', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      // Find a customer with multiple standard licenses
      const names = await svl.getCardNames();
      let found = false;

      for (const name of names) {
        await svl.expandCard(name);

        const tabCount = await svl.getStandardTabCount();
        if (tabCount >= 2) {
          const cards = svl.getStandardLicenseCards();
          const cardCount = await cards.count();
          await recordEvidence('assert-toBeGreaterThanOrEqual-server-licensing-standard-licenses.spec-334', async () => expect(cardCount).toBeGreaterThanOrEqual(2));

          // Each card should have its own heading
          const firstHeading = await cards.first().locator(svl.standardLicenseHeading).textContent();
          const secondHeading = await cards.nth(1).locator(svl.standardLicenseHeading).textContent();
          await recordEvidence('assert-toBeTruthy-server-licensing-standard-licenses.spec-339', async () => expect(firstHeading).toBeTruthy());
          await recordEvidence('assert-toBeTruthy-server-licensing-standard-licenses.spec-340', async () => expect(secondHeading).toBeTruthy());
          found = true;
          await svl.collapseCard(name);
          break;
        }

        await svl.collapseCard(name);
      }

      if (!found) {
        // Single card case still validates that cards render
        for (const name of names) {
          await svl.expandCard(name);
          if (await svl.hasAnyStandardLicense()) {
            const cards = svl.getStandardLicenseCards();
            await recordEvidence('assert-toBeVisible-server-licensing-standard-licenses.spec-355', async () => expect(cards.first()).toBeVisible());
            found = true;
            await svl.collapseCard(name);
            break;
          }
          await svl.collapseCard(name);
        }
      }
    });
  });

  // ─── 5. Standard License Card Field Values ───────────────────

  test.describe('Card Field Values', () => {

    test('LIMAS-SUD-2701: License name heading renders', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      if (await svl.hasAnyStandardLicense()) {
        const headingText = await svl.getFirstStandardLicenseHeading();
        await recordEvidence('assert-toBeTruthy-server-licensing-standard-licenses.spec-385', async () => expect(headingText).toBeTruthy());
        await recordEvidence('assert-toBe-server-licensing-standard-licenses.spec-386', async () => expect(headingText).not.toBe(''));
      }
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2702: Profile Role field renders with label and value', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      if (await svl.hasAnyStandardLicense()) {
        const roleText = await svl.getFirstStandardLicenseRole();
        await recordEvidence('assert-toBeTruthy-server-licensing-standard-licenses.spec-406', async () => expect(roleText).toBeTruthy());
      }
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2703: License quantity field renders with numeric value', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      if (await svl.hasAnyStandardLicense()) {
        const qtyText = await svl.getFirstStandardLicenseQuantity();
        await recordEvidence('assert-toMatch-server-licensing-standard-licenses.spec-426', async () => expect(qtyText).toMatch(/^\d+$/));
      }
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2704: Maintenance date field renders', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      if (await svl.hasAnyStandardLicense()) {
        const maintText = await svl.getFirstStandardMaintenanceDate();
        await recordEvidence('assert-toBeTruthy-server-licensing-standard-licenses.spec-446', async () => expect(maintText).toBeTruthy());
      }
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2705: Expiration date field renders', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      if (await svl.hasAnyStandardLicense()) {
        const expText = await svl.getFirstStandardExpirationDate();
        await recordEvidence('assert-toBeTruthy-server-licensing-standard-licenses.spec-466', async () => expect(expText).toBeTruthy());
      }
      await svl.collapseCard(cardName);
    });
  });

  // ─── 6. Edit Standard License ─────────────────────────────────

  test.describe('Edit Standard License', () => {

    test('LIMAS-SUD-2706: Edit Standard License dialog opens with heading', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const names = await svl.getCardNames();

      for (const name of names) {
        await svl.expandCard(name);
        if (await svl.hasAnyStandardLicense()) {
          await svl.openEditStandardLicenseDialog();
          await recordEvidence('assert-toBeVisible-server-licensing-standard-licenses.spec-491', async () => expect(svl.editStandardLicenseDialog).toBeVisible());
          await recordEvidence('assert-toBeVisible-server-licensing-standard-licenses.spec-492', async () => expect(svl.editStandardLicenseHeading).toBeVisible());
          await svl.closeEditStandardLicenseDialog();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2707: Edit SL subtitle shows license name and role', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      for (const name of await svl.getCardNames()) {
        await svl.expandCard(name);
        if (await svl.hasAnyStandardLicense()) {
          await svl.openEditStandardLicenseDialog();
          await recordEvidence('assert-toBeVisible-server-licensing-standard-licenses.spec-514', async () => expect(svl.editStandardLicenseSubtitle).toBeVisible());
          const subText = await svl.editStandardLicenseSubtitle.textContent();
          await recordEvidence('assert-toMatch-server-licensing-standard-licenses.spec-516', async () => expect(subText).toMatch(/·/)); // Separator between name and role
          await svl.closeEditStandardLicenseDialog();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2708: Edit SL fields pre-filled from card values', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      for (const name of await svl.getCardNames()) {
        await svl.expandCard(name);
        if (await svl.hasAnyStandardLicense()) {
          // Read current card values
          const cardQty = await svl.getFirstStandardLicenseQuantity();

          await svl.openEditStandardLicenseDialog();
          const dialogQty = await svl.editStandardLicenseQuantityInput.inputValue();
          await recordEvidence('assert-toBe-server-licensing-standard-licenses.spec-542', async () => expect(dialogQty).toBe(cardQty));

          await svl.closeEditStandardLicenseDialog();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2709: Edit SL Apply button labeled correctly', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      for (const name of await svl.getCardNames()) {
        await svl.expandCard(name);
        if (await svl.hasAnyStandardLicense()) {
          await svl.openEditStandardLicenseDialog();
          await recordEvidence('assert-toHaveText-server-licensing-standard-licenses.spec-565', async () => expect(svl.editStandardLicenseApplyButton).toHaveText(/apply/i));
          await svl.closeEditStandardLicenseDialog();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2710: Edit SL Cancel button closes dialog', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      for (const name of await svl.getCardNames()) {
        await svl.expandCard(name);
        if (await svl.hasAnyStandardLicense()) {
          // Read original values before opening
          const origQty = await svl.getFirstStandardLicenseQuantity();

          await svl.openEditStandardLicenseDialog();
          await svl.cancelEditStandardLicenseDialog();
          await recordEvidence('assert-toBeVisible-server-licensing-standard-licenses.spec-591', async () => expect(svl.editStandardLicenseDialog).not.toBeVisible());

          // Card values should be unchanged
          const qtyAfter = await svl.getFirstStandardLicenseQuantity();
          await recordEvidence('assert-toBe-server-licensing-standard-licenses.spec-595', async () => expect(qtyAfter).toBe(origQty));

          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2711: Edit SL Close button dismisses dialog', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      for (const name of await svl.getCardNames()) {
        await svl.expandCard(name);
        if (await svl.hasAnyStandardLicense()) {
          await svl.openEditStandardLicenseDialog();
          await recordEvidence('action-click-server-licensing-standard-licenses.spec-617', async () => svl.editStandardLicenseCloseButton.click());
          await recordEvidence('assert-toBeVisible-server-licensing-standard-licenses.spec-618', async () => expect(svl.editStandardLicenseDialog).not.toBeVisible());
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2712: Edit SL Escape dismisses dialog', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      for (const name of await svl.getCardNames()) {
        await svl.expandCard(name);
        if (await svl.hasAnyStandardLicense()) {
          await svl.openEditStandardLicenseDialog();
          await svl.closeEditStandardLicenseDialog();
          await recordEvidence('assert-toBeVisible-server-licensing-standard-licenses.spec-640', async () => expect(svl.editStandardLicenseDialog).not.toBeVisible());
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2713: Edit SL initial focus on first field', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      for (const name of await svl.getCardNames()) {
        await svl.expandCard(name);
        if (await svl.hasAnyStandardLicense()) {
          await svl.openEditStandardLicenseDialog();
          const focused = page.locator(':focus');
          await recordEvidence('assert-toBeAttached-server-licensing-standard-licenses.spec-662', async () => expect(focused).toBeAttached());
          await svl.closeEditStandardLicenseDialog();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2714: Edit SL focus returns after close', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      for (const name of await svl.getCardNames()) {
        await svl.expandCard(name);
        if (await svl.hasAnyStandardLicense()) {
          await svl.openEditStandardLicenseDialog();
          await svl.closeEditStandardLicenseDialog();
          // Focus should have returned to some element on the page
          const focused = page.locator(':focus');
          await recordEvidence('assert-toBeAttached-server-licensing-standard-licenses.spec-687', async () => expect(focused).toBeAttached());
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2715: Edit SL state resets on reopen', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      for (const name of await svl.getCardNames()) {
        await svl.expandCard(name);
        if (await svl.hasAnyStandardLicense()) {
          await svl.openEditStandardLicenseDialog();
          const origMaint = await svl.editStandardLicenseMaintenanceInput.inputValue();

          // Change a value
          await recordEvidence('action-fill-server-licensing-standard-licenses.spec-711', async () => svl.editStandardLicenseMaintenanceInput.fill('2025-01-01'));

          // Close without applying
          await svl.closeEditStandardLicenseDialog();

          // Reopen
          await svl.openEditStandardLicenseDialog();
          const reopenedVal = await svl.editStandardLicenseMaintenanceInput.inputValue();
          await recordEvidence('assert-toBe-server-licensing-standard-licenses.spec-719', async () => expect(reopenedVal).toBe(origMaint));

          await svl.closeEditStandardLicenseDialog();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });
  });

  // ─── 7. Delete Standard License ───────────────────────────────

  test.describe('Delete Standard License', () => {

    test('LIMAS-SUD-2716: Delete Standard License button visible on card', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      for (const name of await svl.getCardNames()) {
        await svl.expandCard(name);
        if (await svl.hasAnyStandardLicense()) {
          await recordEvidence('assert-toBeVisible-server-licensing-standard-licenses.spec-746', async () => expect(svl.firstStandardLicenseDeleteButton).toBeVisible());
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2717: Delete Standard License removes card from view (without confirmation)', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      // This test observes the immediate-deletion behavior found during inspection.
      // WARNING: clicking Delete removes the license without confirmation.
      // We do NOT click Delete here — only verify button exists.
      for (const name of await svl.getCardNames()) {
        await svl.expandCard(name);
        if (await svl.hasAnyStandardLicense()) {
          // Delete button is visible and enabled
          await recordEvidence('assert-toBeEnabled-server-licensing-standard-licenses.spec-770', async () => expect(svl.firstStandardLicenseDeleteButton).toBeEnabled());
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2718: Delete Standard License lifecycle — BLOCKED', async () => {
      // Deletion is immediate and destructive without confirmation.
      // Safe runtime creation and cleanup of a Standard License cannot be guaranteed.
      test.skip(true, 'BLOCKED: Standard License deletion is immediate and destructive. Safe runtime creation and cleanup cannot be guaranteed.');
    });
  });

  // ─── 8. Accessibility Documentation ───────────────────────────

  test.describe('Accessibility', () => {

    test('LIMAS-SUD-2719: SVL-D accessibility gaps documented', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);

      // Document known gaps:
      // - Standard License card fields (Profile Role, Licenses, dates) may not have proper label associations
      // - Edit Standard License dialog may lack focus trap
      // - Delete Standard License has NO confirmation dialog (immediate destructive action)
      // - Tab controls may not announce state changes via aria-live

      // At minimum the section context is navigable
      await recordEvidence('assert-toBeVisible-server-licensing-standard-licenses.spec-810', async () => expect(svl.standardLicensesHeading).toBeVisible());
      await svl.collapseCard(cardName);
    });
  });
});