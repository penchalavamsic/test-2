import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';

const PROFILE = resolveProfileName();

test.describe('User & License Hub — User Filters Dialog', () => {
  test.beforeEach(async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const hub = new UserLicenseHubPage(page);
    await hub.openUserLicenseHub();
    await hub.waitForHubLoad();
  });

  test('LIMAS-SUD-1024: Filters button opens dialog', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    await recordEvidence('assert-toHaveAttribute-user-license-hub-user-filters-dialog.spec-22', async () => expect(hub.userFiltersButton).toHaveAttribute('aria-expanded', 'false'));

    await hub.openUserFilters();

    await recordEvidence('assert-toBeVisible-user-license-hub-user-filters-dialog.spec-26', async () => expect(hub.getFilterDialog()).toBeVisible());
    await recordEvidence('assert-toHaveAttribute-user-license-hub-user-filters-dialog.spec-27', async () => expect(hub.userFiltersButton).toHaveAttribute('aria-expanded', 'true'));
  });

  test('LIMAS-SUD-1025: Dialog has correct heading', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    await hub.openUserFilters();
    await recordEvidence('assert-toBeVisible-user-license-hub-user-filters-dialog.spec-34', async () => expect(hub.getFilterDialog()).toBeVisible());

    const heading = await hub.getFilterDialogHeading();
    await recordEvidence('assert-toBe-user-license-hub-user-filters-dialog.spec-37', async () => expect(heading).toBe('Filter Users'));

    const h4 = hub.getFilterDialog().getByRole('heading', { level: 4 });
    await recordEvidence('assert-toBeVisible-user-license-hub-user-filters-dialog.spec-40', async () => expect(h4).toBeVisible());
  });

  test('LIMAS-SUD-1026: Escape dismisses dialog', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    await hub.openUserFilters();
    await recordEvidence('assert-toBeVisible-user-license-hub-user-filters-dialog.spec-47', async () => expect(hub.getFilterDialog()).toBeVisible());
    await recordEvidence('assert-toHaveAttribute-user-license-hub-user-filters-dialog.spec-48', async () => expect(hub.userFiltersButton).toHaveAttribute('aria-expanded', 'true'));

    await hub.closeUserFilters();

    await recordEvidence('assert-toBeVisible-user-license-hub-user-filters-dialog.spec-52', async () => expect(hub.getFilterDialog()).not.toBeVisible());
    await recordEvidence('assert-toHaveAttribute-user-license-hub-user-filters-dialog.spec-53', async () => expect(hub.userFiltersButton).toHaveAttribute('aria-expanded', 'false'));

    const badge = await hub.getFiltersBadgeCount();
    await recordEvidence('assert-toBe-user-license-hub-user-filters-dialog.spec-56', async () => expect(badge).toBe(0));
  });

  test('LIMAS-SUD-1027: Outside click dismisses without apply', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    await hub.openUserFilters();
    await recordEvidence('assert-toBeVisible-user-license-hub-user-filters-dialog.spec-63', async () => expect(hub.getFilterDialog()).toBeVisible());

    const groups = await hub.getGroupOptionTexts();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-user-filters-dialog.spec-66', async () => expect(groups.length).toBeGreaterThan(1));
    const targetGroup = groups.find((g) => g !== 'All Groups');
    await recordEvidence('assert-toBeTruthy-user-license-hub-user-filters-dialog.spec-68', async () => expect(targetGroup).toBeTruthy());

    await hub.selectGroupOption(targetGroup!);

    await recordEvidence('action-click-user-license-hub-user-filters-dialog.spec-72', async () => hub.heading.click());

    await recordEvidence('assert-toBeVisible-user-license-hub-user-filters-dialog.spec-74', async () => expect(hub.getFilterDialog()).not.toBeVisible());

    const badge = await hub.getFiltersBadgeCount();
    await recordEvidence('assert-toBe-user-license-hub-user-filters-dialog.spec-77', async () => expect(badge).toBe(0));
  });

  test('LIMAS-SUD-1028: Dialog contains User Group section', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    await hub.openUserFilters();
    const dialog = hub.getFilterDialog();
    await recordEvidence('assert-toBeVisible-user-license-hub-user-filters-dialog.spec-85', async () => expect(dialog).toBeVisible());

    const combobox = dialog.getByRole('combobox');
    await recordEvidence('assert-toBeVisible-user-license-hub-user-filters-dialog.spec-88', async () => expect(combobox).toBeVisible());

    const listbox = dialog.getByRole('listbox', { name: 'Suggestions' });
    await recordEvidence('assert-toBeVisible-user-license-hub-user-filters-dialog.spec-91', async () => expect(listbox).toBeVisible());

    const groupWrapper = listbox.getByRole('group');
    await recordEvidence('assert-toBeVisible-user-license-hub-user-filters-dialog.spec-94', async () => expect(groupWrapper).toBeVisible());

    const firstOption = listbox.getByRole('option').first();
    const firstText = await firstOption.textContent();
    await recordEvidence('assert-toBe-user-license-hub-user-filters-dialog.spec-98', async () => expect(firstText?.trim()).toBe('All Groups'));

    await recordEvidence('assert-toBeVisible-user-license-hub-user-filters-dialog.spec-100', async () => expect(dialog.getByRole('button', { name: 'Clear' })).toBeVisible());
    await recordEvidence('assert-toBeVisible-user-license-hub-user-filters-dialog.spec-101', async () => expect(dialog.getByRole('button', { name: 'Select' })).toBeVisible());
  });
});