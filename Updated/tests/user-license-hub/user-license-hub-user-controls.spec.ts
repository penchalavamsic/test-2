import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';

const PROFILE = resolveProfileName();

test.describe('User & License Hub — User Controls', () => {
  test.beforeEach(async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const hub = new UserLicenseHubPage(page);
    await hub.openUserLicenseHub();
    await hub.waitForHubLoad();
  });

  test('LIMAS-SUD-933: User search input is visible', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await recordEvidence('assert-toBeVisible-user-license-hub-user-controls.spec-21', async () => expect(hub.userSearchInput).toBeVisible());
  });

  test('LIMAS-SUD-934: User search input has type text', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await recordEvidence('assert-toHaveAttribute-user-license-hub-user-controls.spec-26', async () => expect(hub.userSearchInput).toHaveJSProperty('type', 'text'));
  });

  test('LIMAS-SUD-935: User search input has correct placeholder', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await recordEvidence('assert-toHaveAttribute-user-license-hub-user-controls.spec-31', async () => expect(hub.userSearchInput).toHaveAttribute('placeholder', 'Search by Name or Email'));
  });

  test('LIMAS-SUD-936: User search input has empty initial value', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await recordEvidence('assert-toHaveValue-user-license-hub-user-controls.spec-36', async () => expect(hub.userSearchInput).toHaveValue(''));
  });

  test('LIMAS-SUD-937: User search input is enabled', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await recordEvidence('assert-toBeEnabled-user-license-hub-user-controls.spec-41', async () => expect(hub.userSearchInput).toBeEnabled());
  });

  test('LIMAS-SUD-938: User Filters button is visible', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await recordEvidence('assert-toBeVisible-user-license-hub-user-controls.spec-46', async () => expect(hub.userFiltersButton).toBeVisible());
  });

  test('LIMAS-SUD-939: User Filters button has aria-expanded="false"', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await recordEvidence('assert-toHaveAttribute-user-license-hub-user-controls.spec-51', async () => expect(hub.userFiltersButton).toHaveAttribute('aria-expanded', 'false'));
  });

  test('LIMAS-SUD-940: User Filters button has aria-haspopup="dialog"', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await recordEvidence('assert-toHaveAttribute-user-license-hub-user-controls.spec-56', async () => expect(hub.userFiltersButton).toHaveAttribute('aria-haspopup', 'dialog'));
  });

  test('LIMAS-SUD-941: Add User button is visible and enabled', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await recordEvidence('assert-toBeVisible-user-license-hub-user-controls.spec-61', async () => expect(hub.addUserButton).toBeVisible());
    await recordEvidence('assert-toBeEnabled-user-license-hub-user-controls.spec-62', async () => expect(hub.addUserButton).toBeEnabled());
  });
});