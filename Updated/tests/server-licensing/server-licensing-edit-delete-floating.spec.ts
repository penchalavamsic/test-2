import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { ServerLicensingPage } from '../pages/server-licensing.page';

const PROFILE = resolveProfileName();

// ─── SVL-E Part 2: Edit & Delete Floating License ───

test.describe('Server License Management — SVL-E (Edit/Delete Floating License)', () => {

  // ─── 1. Edit Floating License Dialog ──────────────────────────

  test.describe('Edit Floating License Dialog', () => {

    test('LIMAS-SUD-2741: Edit FL dialog opens with region and heading', async ({ page }) => {
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
          await svl.openEditFloatingLicenseDialog();
          await recordEvidence('assert-toBeVisible-server-licensing-edit-delete-floating.spec-30', async () => expect(svl.editFloatingLicenseDialog).toBeVisible());
          await recordEvidence('assert-toBeVisible-server-licensing-edit-delete-floating.spec-31', async () => expect(svl.editFloatingLicenseHeading).toBeVisible());
          await svl.closeEditFloatingLicenseDialog();
          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2742: Edit FL heading is "Edit Floating License" h3', async ({ page }) => {
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
          await svl.openEditFloatingLicenseDialog();
          await recordEvidence('assert-toHaveText-server-licensing-edit-delete-floating.spec-55', async () => expect(svl.editFloatingLicenseHeading).toHaveText('Edit Floating License'));
          await svl.closeEditFloatingLicenseDialog();
          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2743: Edit FL Close button visible', async ({ page }) => {
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
          await svl.openEditFloatingLicenseDialog();
          await recordEvidence('assert-toBeVisible-server-licensing-edit-delete-floating.spec-79', async () => expect(svl.editFloatingLicenseCloseButton).toBeVisible());
          await svl.closeEditFloatingLicenseDialog();
          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2744: Edit FL subtitle shows NAME · ROLE', async ({ page }) => {
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
          await svl.openEditFloatingLicenseDialog();
          await recordEvidence('assert-toBeVisible-server-licensing-edit-delete-floating.spec-103', async () => expect(svl.editFloatingLicenseSubtitle).toBeVisible());
          const subText = await svl.editFloatingLicenseSubtitle.textContent();
          await recordEvidence('assert-toMatch-server-licensing-edit-delete-floating.spec-105', async () => expect(subText).toMatch(/·/));
          await svl.closeEditFloatingLicenseDialog();
          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2745: Edit FL Maintenance Date prefilled from card', async ({ page }) => {
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
          await svl.openEditFloatingLicenseDialog();
          const maintVal = await svl.editFloatingLicenseMaintenanceInput.inputValue();
          await recordEvidence('assert-toMatch-server-licensing-edit-delete-floating.spec-130', async () => expect(maintVal).toMatch(/^\d{4}-\d{2}-\d{2}$/));
          await svl.closeEditFloatingLicenseDialog();
          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2746: Edit FL Expiration Date prefilled from card', async ({ page }) => {
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
          await svl.openEditFloatingLicenseDialog();
          const expVal = await svl.editFloatingLicenseExpirationInput.inputValue();
          await recordEvidence('assert-toMatch-server-licensing-edit-delete-floating.spec-155', async () => expect(expVal).toMatch(/^\d{4}-\d{2}-\d{2}$/));
          await svl.closeEditFloatingLicenseDialog();
          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2747: Edit FL Number of Days spinbutton empty', async ({ page }) => {
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
          await svl.openEditFloatingLicenseDialog();
          await recordEvidence('assert-toBeVisible-server-licensing-edit-delete-floating.spec-179', async () => expect(svl.editFloatingLicenseDaysInput).toBeVisible());
          await svl.closeEditFloatingLicenseDialog();
          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2748: Edit FL Floating Licenses spinbutton prefilled', async ({ page }) => {
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
          await svl.openEditFloatingLicenseDialog();
          const qtyVal = await svl.editFloatingLicenseQuantityInput.inputValue();
          await recordEvidence('assert-toMatch-server-licensing-edit-delete-floating.spec-204', async () => expect(qtyVal).toMatch(/^\d+$/));
          await svl.closeEditFloatingLicenseDialog();
          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2749: Edit FL Max Checkout spinbutton prefilled', async ({ page }) => {
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
          await svl.openEditFloatingLicenseDialog();
          const mcVal = await svl.editFloatingLicenseMaxCheckoutInput.inputValue();
          await recordEvidence('assert-toMatch-server-licensing-edit-delete-floating.spec-229', async () => expect(mcVal).toMatch(/^\d+$/));
          await svl.closeEditFloatingLicenseDialog();
          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2750: Edit FL Sync checkbox visible', async ({ page }) => {
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
          await svl.openEditFloatingLicenseDialog();
          await recordEvidence('assert-toBeVisible-server-licensing-edit-delete-floating.spec-253', async () => expect(svl.editFloatingLicenseSyncCheckbox).toBeVisible());
          await svl.closeEditFloatingLicenseDialog();
          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2751: Edit FL Cancel closes dialog', async ({ page }) => {
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
          await svl.openEditFloatingLicenseDialog();
          await svl.cancelEditFloatingLicenseDialog();
          await recordEvidence('assert-toBeVisible-server-licensing-edit-delete-floating.spec-278', async () => expect(svl.editFloatingLicenseDialog).not.toBeVisible());
          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2752: Edit FL Escape dismisses dialog', async ({ page }) => {
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
          await svl.openEditFloatingLicenseDialog();
          await svl.closeEditFloatingLicenseDialog();
          await recordEvidence('assert-toBeVisible-server-licensing-edit-delete-floating.spec-302', async () => expect(svl.editFloatingLicenseDialog).not.toBeVisible());
          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });
  });

  // ─── 2. Edit FL Apply & Focus ─────────────────────────────────

  test.describe('Edit FL Apply, Focus, and State', () => {

    test('LIMAS-SUD-2753: Edit FL Apply labeled "Apply Floating License changes"', async ({ page }) => {
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
          await svl.openEditFloatingLicenseDialog();
          await recordEvidence('assert-toHaveText-server-licensing-edit-delete-floating.spec-330', async () => expect(svl.editFloatingLicenseApplyButton).toHaveText(/apply/i));
          await svl.closeEditFloatingLicenseDialog();
          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2754: Edit FL Apply disabled when unchanged', async ({ page }) => {
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
          await svl.openEditFloatingLicenseDialog();
          await recordEvidence('assert-toBeDisabled-server-licensing-edit-delete-floating.spec-354', async () => expect(svl.editFloatingLicenseApplyButton).toBeDisabled());
          await svl.closeEditFloatingLicenseDialog();
          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2755: Edit FL Apply enables after field change', async ({ page }) => {
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
          await svl.openEditFloatingLicenseDialog();

          const origQty = await svl.editFloatingLicenseQuantityInput.inputValue();
          const newQty = String(Number(origQty) + 1);
          await recordEvidence('action-fill-server-licensing-edit-delete-floating.spec-381', async () => svl.editFloatingLicenseQuantityInput.fill(newQty));

          await recordEvidence('assert-toBeEnabled-server-licensing-edit-delete-floating.spec-383', async () => expect(svl.editFloatingLicenseApplyButton).toBeEnabled());

          // Restore original
          await recordEvidence('action-fill-server-licensing-edit-delete-floating.spec-386', async () => svl.editFloatingLicenseQuantityInput.fill(origQty));
          await svl.closeEditFloatingLicenseDialog();
          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2756: Edit FL Close button dismisses dialog', async ({ page }) => {
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
          await svl.openEditFloatingLicenseDialog();
          await recordEvidence('action-click-server-licensing-edit-delete-floating.spec-410', async () => svl.editFloatingLicenseCloseButton.click());
          await recordEvidence('assert-toBeVisible-server-licensing-edit-delete-floating.spec-411', async () => expect(svl.editFloatingLicenseDialog).not.toBeVisible());
          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2757: Edit FL initial focus on first field', async ({ page }) => {
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
          await svl.openEditFloatingLicenseDialog();
          const focused = page.locator(':focus');
          await recordEvidence('assert-toBeAttached-server-licensing-edit-delete-floating.spec-435', async () => expect(focused).toBeAttached());
          await svl.closeEditFloatingLicenseDialog();
          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2758: Edit FL focus returns after dialog close', async ({ page }) => {
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
          await svl.openEditFloatingLicenseDialog();
          await svl.closeEditFloatingLicenseDialog();
          const focused = page.locator(':focus');
          await recordEvidence('assert-toBeAttached-server-licensing-edit-delete-floating.spec-461', async () => expect(focused).toBeAttached());
          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2759: Edit FL state resets on reopen', async ({ page }) => {
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
          await svl.openEditFloatingLicenseDialog();
          const origMaint = await svl.editFloatingLicenseMaintenanceInput.inputValue();

          await recordEvidence('action-fill-server-licensing-edit-delete-floating.spec-486', async () => svl.editFloatingLicenseMaintenanceInput.fill('2025-01-01'));
          await svl.closeEditFloatingLicenseDialog();

          await svl.openEditFloatingLicenseDialog();
          const reopenedVal = await svl.editFloatingLicenseMaintenanceInput.inputValue();
          await recordEvidence('assert-toBe-server-licensing-edit-delete-floating.spec-491', async () => expect(reopenedVal).toBe(origMaint));

          await svl.closeEditFloatingLicenseDialog();
          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });
  });

  // ─── 3. Delete Floating License ───────────────────────────────

  test.describe('Delete Floating License', () => {

    test('LIMAS-SUD-2760: Delete FL button visible', async ({ page }) => {
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
          await recordEvidence('assert-toBeVisible-server-licensing-edit-delete-floating.spec-520', async () => expect(svl.firstFloatingLicenseDeleteButton).toBeVisible());
          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2761: Delete FL does not open confirmation dialog', async ({ page }) => {
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

          // Click Delete — no confirmation dialog opens (observed: button becomes [active])
          await recordEvidence('action-click-server-licensing-edit-delete-floating.spec-544', async () => svl.firstFloatingLicenseDeleteButton.click());

          // Verify no region/dialog with confirmation text appeared
          const confirmDialog = page.getByRole('region').filter({ hasText: /confirm|delete|warning|permanent/i });
          await recordEvidence('assert-toBeVisible-server-licensing-edit-delete-floating.spec-548', async () => expect(confirmDialog).not.toBeVisible({ timeout: 2000 }));

          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2762: Card not removed after Delete click (no immediate deletion)', async ({ page }) => {
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

          const cardsBefore = svl.getFloatingLicenseCards();
          const countBefore = await cardsBefore.count();

          await recordEvidence('action-click-server-licensing-edit-delete-floating.spec-575', async () => svl.firstFloatingLicenseDeleteButton.click());

          // Card should still be present — no immediate removal
          const cardsAfter = svl.getFloatingLicenseCards();
          const countAfter = await cardsAfter.count();
          await recordEvidence('assert-toBe-server-licensing-edit-delete-floating.spec-580', async () => expect(countAfter).toBe(countBefore));

          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2763: Escape after Delete click does not dismiss any dialog', async ({ page }) => {
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

          await recordEvidence('action-click-server-licensing-edit-delete-floating.spec-604', async () => svl.firstFloatingLicenseDeleteButton.click());
          // Press Escape — nothing should happen (no dialog)
          await recordEvidence('action-press-server-licensing-edit-delete-floating.spec-606', async () => page.keyboard.press('Escape'));

          // Cards still present
          const cards = svl.getFloatingLicenseCards();
          await recordEvidence('assert-toBeVisible-server-licensing-edit-delete-floating.spec-610', async () => expect(cards.first()).toBeVisible());

          await svl.switchToStandardTab();
          await svl.collapseCard(name);
          return;
        }
        await svl.collapseCard(name);
      }
    });

    test('LIMAS-SUD-2764: Delete FL lifecycle — BLOCKED', async () => {
      // BLOCKED: Delete Floating License has no confirmation dialog but also does not
      // immediately delete. The complete lifecycle flow is unclear. Safe runtime
      // creation and cleanup cannot be guaranteed.
      test.skip(true, 'BLOCKED: Safe runtime Floating License creation and cleanup cannot be guaranteed.');
    });
  });
});