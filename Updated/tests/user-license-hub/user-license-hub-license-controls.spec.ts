import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';

const PROFILE = resolveProfileName();

test.describe('User & License Hub — License Controls', () => {
  test.beforeEach(async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const hub = new UserLicenseHubPage(page);
    await hub.openUserLicenseHub();
    await hub.waitForHubLoad();
  });

  test('LIMAS-SUD-954: Hardware ID search input is visible', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await recordEvidence('assert-toBeVisible-user-license-hub-license-controls.spec-21', async () => expect(hub.hardwareSearchInput).toBeVisible());
  });

  test('LIMAS-SUD-955: Hardware ID search input has type text', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await recordEvidence('assert-toHaveAttribute-user-license-hub-license-controls.spec-26', async () => expect(hub.hardwareSearchInput).toHaveJSProperty('type', 'text'));
  });

  test('LIMAS-SUD-956: Hardware ID search input has correct placeholder', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await recordEvidence('assert-toHaveAttribute-user-license-hub-license-controls.spec-31', async () => expect(hub.hardwareSearchInput).toHaveAttribute(
      'placeholder',
      'Search by Hardware ID (comma separated)'
    ));
  });

  test('LIMAS-SUD-957: Hardware ID search input has empty initial value', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await recordEvidence('assert-toHaveValue-user-license-hub-license-controls.spec-39', async () => expect(hub.hardwareSearchInput).toHaveValue(''));
  });

  test('LIMAS-SUD-958: Hardware ID search input is enabled', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await recordEvidence('assert-toBeEnabled-user-license-hub-license-controls.spec-44', async () => expect(hub.hardwareSearchInput).toBeEnabled());
  });

  test('LIMAS-SUD-959: License Filters button is visible', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await recordEvidence('assert-toBeVisible-user-license-hub-license-controls.spec-49', async () => expect(hub.licenseFiltersButton).toBeVisible());
  });

  test('LIMAS-SUD-960: License Filters button has aria-expanded="false"', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await recordEvidence('assert-toHaveAttribute-user-license-hub-license-controls.spec-54', async () => expect(hub.licenseFiltersButton).toHaveAttribute('aria-expanded', 'false'));
  });

  test('LIMAS-SUD-961: License Filters button has aria-haspopup="dialog"', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await recordEvidence('assert-toHaveAttribute-user-license-hub-license-controls.spec-59', async () => expect(hub.licenseFiltersButton).toHaveAttribute('aria-haspopup', 'dialog'));
  });

  test('LIMAS-SUD-962: Download and Email buttons are visible and disabled', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await recordEvidence('assert-toBeVisible-user-license-hub-license-controls.spec-64', async () => expect(hub.downloadButton).toBeVisible());
    await recordEvidence('assert-toBeVisible-user-license-hub-license-controls.spec-65', async () => expect(hub.emailButton).toBeVisible());

    const downloadDisabled = await hub.downloadButton.evaluate(
      (el) => (el as HTMLButtonElement).disabled || el.getAttribute('aria-disabled') === 'true'
    );
    await recordEvidence('assert-toBe-user-license-hub-license-controls.spec-70', async () => expect(downloadDisabled).toBe(true));

    const emailDisabled = await hub.emailButton.evaluate(
      (el) => (el as HTMLButtonElement).disabled || el.getAttribute('aria-disabled') === 'true'
    );
    await recordEvidence('assert-toBe-user-license-hub-license-controls.spec-75', async () => expect(emailDisabled).toBe(true));
  });

  test('LIMAS-SUD-963: Add License button is visible and disabled', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await recordEvidence('assert-toBeVisible-user-license-hub-license-controls.spec-80', async () => expect(hub.addLicenseButton).toBeVisible());

    const disabled = await hub.addLicenseButton.evaluate(
      (el) => (el as HTMLButtonElement).disabled || el.getAttribute('aria-disabled') === 'true'
    );
    await recordEvidence('assert-toBe-user-license-hub-license-controls.spec-85', async () => expect(disabled).toBe(true));
  });
});