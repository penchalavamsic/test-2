import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';

const PROFILE = resolveProfileName();

test.describe('User & License Hub — Search & Filter Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const hub = new UserLicenseHubPage(page);
    await hub.openUserLicenseHub();
    await hub.waitForHubLoad();
  });

  test('LIMAS-SUD-1037: Filter dialog has role dialog', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    await hub.openUserFilters();
    const dialog = hub.getFilterDialog();
    await recordEvidence('assert-toBeVisible-user-license-hub-search-filter-accessibility.spec-24', async () => expect(dialog).toBeVisible());

    await recordEvidence('assert-toHaveAttribute-user-license-hub-search-filter-accessibility.spec-26', async () => expect(dialog).toHaveAttribute('role', 'dialog'));

    const heading = dialog.getByRole('heading');
    await recordEvidence('assert-toBeVisible-user-license-hub-search-filter-accessibility.spec-29', async () => expect(heading).toBeVisible());

    await recordEvidence('assert-toHaveAttribute-user-license-hub-search-filter-accessibility.spec-31', async () => expect(hub.userFiltersButton).toHaveAttribute('aria-haspopup', 'dialog'));
  });

  test('LIMAS-SUD-1038: Group combobox and options accessible', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    await hub.openUserFilters();
    const dialog = hub.getFilterDialog();

    const combobox = dialog.getByRole('combobox');
    await recordEvidence('assert-toBeVisible-user-license-hub-search-filter-accessibility.spec-41', async () => expect(combobox).toBeVisible());

    const listbox = dialog.getByRole('listbox', { name: 'Suggestions' });
    await recordEvidence('assert-toBeVisible-user-license-hub-search-filter-accessibility.spec-44', async () => expect(listbox).toBeVisible());

    const options = listbox.getByRole('option');
    const optionCount = await options.count();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-search-filter-accessibility.spec-48', async () => expect(optionCount).toBeGreaterThan(0));

    const groupEl = listbox.getByRole('group');
    await recordEvidence('assert-toBeVisible-user-license-hub-search-filter-accessibility.spec-51', async () => expect(groupEl).toBeVisible());

    const clearBtn = dialog.getByRole('button', { name: 'Clear' });
    await recordEvidence('assert-toBeVisible-user-license-hub-search-filter-accessibility.spec-54', async () => expect(clearBtn).toBeVisible());

    const selectBtn = dialog.getByRole('button', { name: 'Select' });
    await recordEvidence('assert-toBeVisible-user-license-hub-search-filter-accessibility.spec-57', async () => expect(selectBtn).toBeVisible());

    const hasAccessibleName = await hub.getUserSearchInputLocator().evaluate(
      (el) => {
        const input = el as HTMLInputElement;
        return (input.labels && input.labels.length > 0) ||
          input.hasAttribute('aria-label') ||
          input.hasAttribute('aria-labelledby');
      }
    );
    await recordEvidence('assert-toBe-user-license-hub-search-filter-accessibility.spec-67', async () => expect(hasAccessibleName).toBe(false));
  });
});