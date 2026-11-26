import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';

const PROFILE = resolveProfileName();

test.describe('User & License Hub — Navigation and Page Shell', () => {
  test('LIMAS-SUD-926: Sidebar link navigates to User & License Hub', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const hub = new UserLicenseHubPage(page);
    await hub.openUserLicenseHub();

    const url = page.url();
    await recordEvidence('assert-toContain-user-license-hub-navigation-shell.spec-19', async () => expect(url).toContain('/users-licenses'));
  });

  test('LIMAS-SUD-927: User & License Hub route is sanitized /users-licenses', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const hub = new UserLicenseHubPage(page);
    await hub.openUserLicenseHub();

    const url = new URL(page.url());
    await recordEvidence('assert-toMatch-user-license-hub-navigation-shell.spec-32', async () => expect(url.pathname).toMatch(/\/users-licenses\/?$/));
  });

  test('LIMAS-SUD-928: Page heading is "User & License Hub"', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const hub = new UserLicenseHubPage(page);
    await hub.openUserLicenseHub();

    await recordEvidence('assert-toBeVisible-user-license-hub-navigation-shell.spec-44', async () => expect(hub.heading).toBeVisible());
    await recordEvidence('assert-toHaveText-user-license-hub-navigation-shell.spec-45', async () => expect(hub.heading).toHaveText('User & License Hub'));
  });

  test('LIMAS-SUD-929: Heading is level h1', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const hub = new UserLicenseHubPage(page);
    await hub.openUserLicenseHub();

    await recordEvidence('assert-toBeVisible-user-license-hub-navigation-shell.spec-57', async () => expect(hub.heading).toBeVisible());
    await recordEvidence('assert-toHaveAttribute-user-license-hub-navigation-shell.spec-58', async () => expect(hub.heading).toHaveRole('heading'));
    const tagName = await hub.heading.evaluate((el) => el.tagName.toLowerCase());
    await recordEvidence('assert-toBe-user-license-hub-navigation-shell.spec-60', async () => expect(tagName).toBe('h1'));
  });

  test('LIMAS-SUD-930: Main content region is visible', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const hub = new UserLicenseHubPage(page);
    await hub.openUserLicenseHub();

    await recordEvidence('assert-toBeVisible-user-license-hub-navigation-shell.spec-72', async () => expect(hub.mainContent).toBeVisible());
    const tagName = await hub.mainContent.evaluate((el) => el.tagName.toLowerCase());
    await recordEvidence('assert-toBe-user-license-hub-navigation-shell.spec-74', async () => expect(tagName).toBe('main'));
  });

  test('LIMAS-SUD-931: Two-panel layout renders Users and Licenses panels', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const hub = new UserLicenseHubPage(page);
    await hub.openUserLicenseHub();

    await recordEvidence('assert-toBeVisible-user-license-hub-navigation-shell.spec-86', async () => expect(hub.userPanel).toBeVisible());
    await recordEvidence('assert-toBeVisible-user-license-hub-navigation-shell.spec-87', async () => expect(hub.licensePanel).toBeVisible());

    const childCount = await hub.panelGrid.locator(':scope > div').count();
    await recordEvidence('assert-toBeGreaterThanOrEqual-user-license-hub-navigation-shell.spec-90', async () => expect(childCount).toBeGreaterThanOrEqual(2));
  });

  test('LIMAS-SUD-932: Footer is visible', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const hub = new UserLicenseHubPage(page);
    await hub.openUserLicenseHub();

    await recordEvidence('assert-toBeVisible-user-license-hub-navigation-shell.spec-102', async () => expect(hub.footer).toBeVisible());
  });
});