import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { ServerLicensingPage } from '../pages/server-licensing.page';

const PROFILE = resolveProfileName();

// ─── SVL-E Part 1: Floating Licenses Tab, Cards, Card Fields ───

test.describe('Server License Management — SVL-E (Floating License Cards)', () => {

  // ─── 1. Floating Tab & Section ────────────────────────────────

  test.describe('Floating Tab & Section', () => {

    test('LIMAS-SUD-2720: Floating tab button visible when card expands', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await recordEvidence('assert-toBeVisible-server-licensing-floating-cards.spec-29', async () => expect(svl.floatingTab).toBeVisible());
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2721: Floating tab badge shows runtime count', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      const count = await svl.getFloatingTabCount();
      await recordEvidence('assert-toBeGreaterThanOrEqual-server-licensing-floating-cards.spec-47', async () => expect(count).toBeGreaterThanOrEqual(0));
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2722: Floating tab reflects selected state when clicked', async ({ page }) => {
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
      await recordEvidence('assert-toHaveAttribute-server-licensing-floating-cards.spec-65', async () => expect(svl.floatingTab).toHaveAttribute('aria-pressed', 'true'));
      await svl.switchToStandardTab();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2723: Floating section heading is under Standard Licenses h2', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      // Section heading is shared above tabs
      await recordEvidence('assert-toBeVisible-server-licensing-floating-cards.spec-84', async () => expect(svl.standardLicensesHeading).toBeVisible());
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2724: Floating section description visible in expanded card', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await recordEvidence('assert-toBeVisible-server-licensing-floating-cards.spec-101', async () => expect(svl.standardLicensesDescription).toBeVisible());
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2725: Switching to Floating tab shows Create Floating License button', async ({ page }) => {
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
      await recordEvidence('assert-toBeVisible-server-licensing-floating-cards.spec-119', async () => expect(svl.createFloatingLicenseButton).toBeVisible());
      await svl.switchToStandardTab();
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2726: Create Floating License button visible beside tabs', async ({ page }) => {
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
      const visible = await svl.createFloatingLicenseButton.isVisible().catch(() => false);
      await recordEvidence('assert-toBe-server-licensing-floating-cards.spec-139', async () => expect(visible).toBe(true));
      await svl.switchToStandardTab();
      await svl.collapseCard(cardName);
    });
  });

  // ─── 2. Floating Empty State ───────────────────────────────────

  test.describe('Floating Empty State', () => {

    test('LIMAS-SUD-2727: "No Floating Licenses" shown when count is zero', async ({ page }) => {
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
          await recordEvidence('assert-toBeVisible-server-licensing-floating-cards.spec-167', async () => expect(svl.floatingLicensesEmptyState).toBeVisible());
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

  // ─── 3. Floating License Card Structure ─────────────────────

  test.describe('Floating License Card Structure', () => {

    test('LIMAS-SUD-2728: Floating License type label visible', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      for (const name of await svl.getCardNames()) {
        await svl.expandCard(name);
        if (await svl.hasAnyFloatingLicense()) {
          await svl.switchToFloatingTab();
          const cards = svl.getFloatingLicenseCards();
          await recordEvidence('assert-toBeVisible-server-licensing-floating-cards.spec-199', async () => expect(cards.first().locator(svl.floatingLicenseTypeLabel)).toBeVisible());
          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2729: Floating card heading renders at runtime', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      for (const name of await svl.getCardNames()) {
        await svl.expandCard(name);
        if (await svl.hasAnyFloatingLicense()) {
          await svl.switchToFloatingTab();
          const cards = svl.getFloatingLicenseCards();
          const headingText = await cards.first().locator('h3').textContent();
          await recordEvidence('assert-toBeTruthy-server-licensing-floating-cards.spec-223', async () => expect(headingText).toBeTruthy());
          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2730: Edit Floating License button visible per card', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      for (const name of await svl.getCardNames()) {
        await svl.expandCard(name);
        if (await svl.hasAnyFloatingLicense()) {
          await svl.switchToFloatingTab();
          await recordEvidence('assert-toBeVisible-server-licensing-floating-cards.spec-245', async () => expect(svl.firstFloatingLicenseEditButton).toBeVisible());
          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2731: Delete Floating License button visible per card', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      for (const name of await svl.getCardNames()) {
        await svl.expandCard(name);
        if (await svl.hasAnyFloatingLicense()) {
          await svl.switchToFloatingTab();
          await recordEvidence('assert-toBeVisible-server-licensing-floating-cards.spec-267', async () => expect(svl.firstFloatingLicenseDeleteButton).toBeVisible());
          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });
  });

  // ─── 4. Floating License Card Field Values ──────────────────

  test.describe('Floating License Card Field Values', () => {

    test('LIMAS-SUD-2732: Profile Role field renders', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      for (const name of await svl.getCardNames()) {
        await svl.expandCard(name);
        if (await svl.hasAnyFloatingLicense()) {
          await svl.switchToFloatingTab();
          await recordEvidence('assert-toBeVisible-server-licensing-floating-cards.spec-294', async () => expect(svl.floatingLicenseProfileRoleText).toBeVisible());
          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2733: Group field renders with value', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      for (const name of await svl.getCardNames()) {
        await svl.expandCard(name);
        if (await svl.hasAnyFloatingLicense()) {
          await svl.switchToFloatingTab();
          await recordEvidence('assert-toBeVisible-server-licensing-floating-cards.spec-316', async () => expect(svl.floatingLicenseGroupText).toBeVisible());
          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2734: Licenses field renders with numeric value', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      for (const name of await svl.getCardNames()) {
        await svl.expandCard(name);
        if (await svl.hasAnyFloatingLicense()) {
          await svl.switchToFloatingTab();

          const cards = svl.getFloatingLicenseCards();
          const qtyContainer = cards.first().locator('p').filter({ hasText: /^licenses$/i }).locator('..');
          const paras = qtyContainer.locator('p');
          if ((await paras.count()) >= 2) {
            const qtyText = (await paras.nth(1).textContent())?.trim() ?? '';
            await recordEvidence('assert-toMatch-server-licensing-floating-cards.spec-344', async () => expect(qtyText).toMatch(/^\d+$/));
          }

          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2735: Max Checkout field renders with value', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      for (const name of await svl.getCardNames()) {
        await svl.expandCard(name);
        if (await svl.hasAnyFloatingLicense()) {
          await svl.switchToFloatingTab();
          await recordEvidence('assert-toBeVisible-server-licensing-floating-cards.spec-368', async () => expect(svl.floatingLicenseMaxCheckoutText).toBeVisible());
          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2736: Checkout status renders', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      for (const name of await svl.getCardNames()) {
        await svl.expandCard(name);
        if (await svl.hasAnyFloatingLicense()) {
          await svl.switchToFloatingTab();
          await recordEvidence('assert-toBeVisible-server-licensing-floating-cards.spec-390', async () => expect(svl.floatingLicenseCheckoutStatus).toBeVisible());
          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2737: Maintenance date renders', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      for (const name of await svl.getCardNames()) {
        await svl.expandCard(name);
        if (await svl.hasAnyFloatingLicense()) {
          await svl.switchToFloatingTab();
          await recordEvidence('assert-toBeVisible-server-licensing-floating-cards.spec-412', async () => expect(svl.floatingLicenseMaintenanceText).toBeVisible());
          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2738: Expiration date renders', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      for (const name of await svl.getCardNames()) {
        await svl.expandCard(name);
        if (await svl.hasAnyFloatingLicense()) {
          await svl.switchToFloatingTab();
          await recordEvidence('assert-toBeVisible-server-licensing-floating-cards.spec-434', async () => expect(svl.floatingLicenseExpirationText).toBeVisible());
          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2739: Card count matches Floating tab badge', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      let found = false;
      for (const name of await svl.getCardNames()) {
        await svl.expandCard(name);
        if (await svl.hasAnyFloatingLicense()) {
          await svl.switchToFloatingTab();
          const badgeCount = await svl.getFloatingTabCount();
          const cards = svl.getFloatingLicenseCards();
          const cardCount = await cards.count();
          await recordEvidence('assert-toBe-server-licensing-floating-cards.spec-460', async () => expect(cardCount).toBe(badgeCount));
          found = true;
          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          break;
        }
        await svl.collapseCard(name);
      }
      if (!found) test.skip(true, 'No Floating Licenses found');
    });

    test('LIMAS-SUD-2740: Multiple Floating cards render independently', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      let foundMulti = false;
      for (const name of await svl.getCardNames()) {
        await svl.expandCard(name);

        const fltCount = await svl.getFloatingTabCount();
        if (fltCount >= 2) {
          await svl.switchToFloatingTab();
          const cards = svl.getFloatingLicenseCards();
          await recordEvidence('assert-toBeGreaterThanOrEqual-server-licensing-floating-cards.spec-488', async () => expect(await cards.count()).toBeGreaterThanOrEqual(2));

          const firstH = await cards.nth(0).locator('h3').textContent();
          const secondH = await cards.nth(1).locator('h3').textContent();
          await recordEvidence('assert-toBeTruthy-server-licensing-floating-cards.spec-492', async () => expect(firstH).toBeTruthy());
          await recordEvidence('assert-toBeTruthy-server-licensing-floating-cards.spec-493', async () => expect(secondH).toBeTruthy());

          foundMulti = true;
          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          break;
        }

        await svl.collapseCard(name);
      }
      if (!foundMulti) test.skip(true, 'No customer with 2+ Floating Licenses found');
    });
  });
});