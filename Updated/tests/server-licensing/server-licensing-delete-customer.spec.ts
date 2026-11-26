import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { ServerLicensingPage } from '../pages/server-licensing.page';

const PROFILE = resolveProfileName();

// ─── SVL-D: Delete Customer ───

test.describe('Server License Management — SVL-D (Delete Customer)', () => {

  // ─── 1. Button Visibility, State, and Accessibility ──────────

  test.describe('Button Visibility and Accessibility', () => {

    test('LIMAS-SUD-2674: Delete Customer button is visible on each expanded card', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await recordEvidence('assert-toBeVisible-server-licensing-delete-customer.spec-29', async () => expect(svl.cardDeleteButton(cardName)).toBeVisible());
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2675: Delete Customer button has accessible name', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);
      await recordEvidence('assert-toHaveAccessibleName-server-licensing-delete-customer.spec-46', async () => expect(svl.cardDeleteButton(cardName)).toHaveAccessibleName(/delete customer/i));
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2678: Delete Customer button is enabled when no licenses exist', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      // Discover a card name, expand it, and check tabs for zero counts
      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);

      // Check if this card has zero licenses on both tabs
      const hasStdLicenses = await svl.hasAnyStandardLicense();
      const hasFltLicenses = await svl.hasAnyFloatingLicense();

      if (!hasStdLicenses && !hasFltLicenses) {
        await recordEvidence('assert-toBeEnabled-server-licensing-delete-customer.spec-70', async () => expect(svl.cardDeleteButton(cardName)).toBeEnabled());
      }

      await svl.collapseCard(cardName);
    });
  });

  // ─── 2. Dependency Restriction ────────────────────────────────

  test.describe('Dependency Restriction', () => {

    test('LIMAS-SUD-2676: Delete Customer is disabled when licenses are assigned', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await svl.expandCard(cardName);

      const hasStdLicenses = await svl.hasAnyStandardLicense();
      const hasFltLicenses = await svl.hasAnyFloatingLicense();

      if (hasStdLicenses || hasFltLicenses) {
        // Click Delete Customer — it should become disabled (no dialog)
        await recordEvidence('action-click-server-licensing-delete-customer.spec-100', async () => svl.cardDeleteButton(cardName).click());
        await recordEvidence('assert-toBeDisabled-server-licensing-delete-customer.spec-101', async () => expect(svl.cardDeleteButton(cardName)).toBeDisabled());
        // No confirmation dialog should appear
        await recordEvidence('assert-toBeVisible-server-licensing-delete-customer.spec-103', async () => expect(svl.deleteCustomerDialog).not.toBeVisible());
      }

      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2677: Delete Customer enabled for zero-license customers', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const names = await svl.getCardNames();
      let foundZeroLicense = false;

      for (const name of names) {
        await svl.expandCard(name);

        const hasStd = await svl.hasAnyStandardLicense();
        const hasFlt = await svl.hasAnyFloatingLicense();

        if (!hasStd && !hasFlt) {
          await recordEvidence('assert-toBeEnabled-server-licensing-delete-customer.spec-128', async () => expect(svl.cardDeleteButton(name)).toBeEnabled());
          foundZeroLicense = true;
          await svl.collapseCard(name);
          break;
        }

        await svl.collapseCard(name);
      }

      if (!foundZeroLicense) {
        // No assertion to make — all customers have licenses; skip gracefully
        test.skip(true, 'No zero-license customer found');
      }
    });
  });

  // ─── 3. Confirmation Dialog ───────────────────────────────────

  test.describe('Confirmation Dialog', () => {

    test('LIMAS-SUD-2679: Confirmation dialog opens for zero-license customer', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const names = await svl.getCardNames();
      let opened = false;

      for (const name of names) {
        await svl.expandCard(name);
        const hasStd = await svl.hasAnyStandardLicense();
        const hasFlt = await svl.hasAnyFloatingLicense();

        if (!hasStd && !hasFlt && await svl.cardDeleteButton(name).isEnabled()) {
          await svl.openDeleteCustomerDialog(name);
          await recordEvidence('assert-toBeVisible-server-licensing-delete-customer.spec-167', async () => expect(svl.deleteCustomerDialog).toBeVisible());
          opened = true;
          await svl.closeDeleteCustomerDialog();
          await svl.collapseCard(name);
          break;
        }

        await svl.collapseCard(name);
      }

      if (!opened) {
        test.skip(true, 'No eligible zero-license customer found for confirmation dialog');
      }
    });

    test('LIMAS-SUD-2680: Confirmation dialog has heading', async ({ page }) => {
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
        const hasFlt = await svl.hasAnyFloatingLicense();

        if (!hasStd && !hasFlt && await svl.cardDeleteButton(name).isEnabled()) {
          await svl.openDeleteCustomerDialog(name);
          await recordEvidence('assert-toBeVisible-server-licensing-delete-customer.spec-201', async () => expect(svl.deleteCustomerDialogHeading).toBeVisible());
          found = true;
          await svl.closeDeleteCustomerDialog();
          await svl.collapseCard(name);
          break;
        }

        await svl.collapseCard(name);
      }

      if (!found) test.skip(true, 'No eligible customer');
    });

    test('LIMAS-SUD-2681: Confirmation dialog contains warning text', async ({ page }) => {
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
        const hasFlt = await svl.hasAnyFloatingLicense();

        if (!hasStd && !hasFlt && await svl.cardDeleteButton(name).isEnabled()) {
          await svl.openDeleteCustomerDialog(name);
          await recordEvidence('assert-toBeVisible-server-licensing-delete-customer.spec-233', async () => expect(svl.deleteCustomerWarningText).toBeVisible());
          found = true;
          await svl.closeDeleteCustomerDialog();
          await svl.collapseCard(name);
          break;
        }

        await svl.collapseCard(name);
      }

      if (!found) test.skip(true, 'No eligible customer');
    });

    test('LIMAS-SUD-2682: Cancel button closes dialog without deleting', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const names = await svl.getCardNames();
      let acted = false;

      for (const name of names) {
        await svl.expandCard(name);
        const hasStd = await svl.hasAnyStandardLicense();
        const hasFlt = await svl.hasAnyFloatingLicense();

        if (!hasStd && !hasFlt && await svl.cardDeleteButton(name).isEnabled()) {
          await svl.openDeleteCustomerDialog(name);
          await svl.cancelDeleteCustomerDialog();
          await recordEvidence('assert-toBeVisible-server-licensing-delete-customer.spec-266', async () => expect(svl.deleteCustomerDialog).not.toBeVisible());
          // Customer card should still exist
          await recordEvidence('assert-toBeVisible-server-licensing-delete-customer.spec-268', async () => expect(svl.customerCardByName(name)).toBeVisible());
          acted = true;
          await svl.collapseCard(name);
          break;
        }

        await svl.collapseCard(name);
      }

      if (!acted) test.skip(true, 'No eligible customer');
    });

    test('LIMAS-SUD-2683: Escape key closes dialog without deleting', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const names = await svl.getCardNames();
      let acted = false;

      for (const name of names) {
        await svl.expandCard(name);
        const hasStd = await svl.hasAnyStandardLicense();
        const hasFlt = await svl.hasAnyFloatingLicense();

        if (!hasStd && !hasFlt && await svl.cardDeleteButton(name).isEnabled()) {
          await svl.openDeleteCustomerDialog(name);
          await svl.closeDeleteCustomerDialog();
          await recordEvidence('assert-toBeVisible-server-licensing-delete-customer.spec-300', async () => expect(svl.deleteCustomerDialog).not.toBeVisible());
          await recordEvidence('assert-toBeVisible-server-licensing-delete-customer.spec-301', async () => expect(svl.customerCardByName(name)).toBeVisible());
          acted = true;
          await svl.collapseCard(name);
          break;
        }

        await svl.collapseCard(name);
      }

      if (!acted) test.skip(true, 'No eligible customer');
    });
  });

  // ─── 4. Focus and Keyboard ────────────────────────────────────

  test.describe('Focus and Keyboard', () => {

    test('LIMAS-SUD-2684: Initial focus on reasonable element in confirmation', async ({ page }) => {
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
        const hasFlt = await svl.hasAnyFloatingLicense();

        if (!hasStd && !hasFlt && await svl.cardDeleteButton(name).isEnabled()) {
          await svl.openDeleteCustomerDialog(name);
          const focused = page.locator(':focus');
          await recordEvidence('assert-toBeAttached-server-licensing-delete-customer.spec-338', async () => expect(focused).toBeAttached());
          found = true;
          await svl.closeDeleteCustomerDialog();
          await svl.collapseCard(name);
          break;
        }

        await svl.collapseCard(name);
      }

      if (!found) test.skip(true, 'No eligible customer');
    });

    test('LIMAS-SUD-2685: Focus returns to Delete Customer button after dialog dismisses', async ({ page }) => {
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
        const hasFlt = await svl.hasAnyFloatingLicense();

        if (!hasStd && !hasFlt && await svl.cardDeleteButton(name).isEnabled()) {
          await svl.openDeleteCustomerDialog(name);
          await svl.closeDeleteCustomerDialog();
          await recordEvidence('assert-toBeFocused-server-licensing-delete-customer.spec-371', async () => expect(svl.cardDeleteButton(name)).toBeFocused());
          found = true;
          await svl.collapseCard(name);
          break;
        }

        await svl.collapseCard(name);
      }

      if (!found) test.skip(true, 'No eligible customer');
    });
  });

  // ─── 5. Lifecycle (Blocked) ───────────────────────────────────

  test.describe('Destructive Lifecycle', () => {

    test('LIMAS-SUD-2686: Confirmed deletion lifecycle — BLOCKED', async () => {
      // This test is blocked: safe runtime customer creation and cleanup cannot be guaranteed.
      // Add Customer flow is not in SVL-D scope.
      test.skip(true, 'BLOCKED: Safe runtime customer creation and cleanup cannot be guaranteed. Add Customer flow is not in SVL-D scope.');
    });
  });
});