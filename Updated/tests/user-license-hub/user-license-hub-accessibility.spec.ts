import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';

const PROFILE = resolveProfileName();

test.describe('User & License Hub — Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const hub = new UserLicenseHubPage(page);
    await hub.openUserLicenseHub();
    await hub.waitForHubLoad();
  });

  test('LIMAS-SUD-972: Search inputs lack accessible names', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    for (const input of [hub.userSearchInput, hub.hardwareSearchInput]) {
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');

      await recordEvidence('assert-toBeNull-user-license-hub-accessibility.spec-27', async () => expect(id).toBeNull());
      await recordEvidence('assert-toBeNull-user-license-hub-accessibility.spec-28', async () => expect(ariaLabel).toBeNull());
      await recordEvidence('assert-toBeNull-user-license-hub-accessibility.spec-29', async () => expect(ariaLabelledBy).toBeNull());
    }
  });

  test('LIMAS-SUD-973: Search inputs named only by placeholder', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    for (const input of [hub.userSearchInput, hub.hardwareSearchInput]) {
      const labelCount = await input.evaluate(
        (el) => (el as HTMLInputElement).labels?.length ?? 0
      );
      await recordEvidence('assert-toBe-user-license-hub-accessibility.spec-40', async () => expect(labelCount).toBe(0));

      const placeholder = await input.getAttribute('placeholder');
      await recordEvidence('assert-toBeGreaterThan-user-license-hub-accessibility.spec-43', async () => expect(placeholder?.length).toBeGreaterThan(0));

      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      await recordEvidence('assert-toBeNull-user-license-hub-accessibility.spec-47', async () => expect(ariaLabel).toBeNull());
      await recordEvidence('assert-toBeNull-user-license-hub-accessibility.spec-48', async () => expect(ariaLabelledBy).toBeNull());
    }
  });

  test('LIMAS-SUD-974: Page has exactly one h1 and no h2 page headings', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const h1Count = await page.locator('h1').count();
    await recordEvidence('assert-toBe-user-license-hub-accessibility.spec-56', async () => expect(h1Count).toBe(1));

    const h2Count = await page.locator('main h2').count();
    await recordEvidence('assert-toBe-user-license-hub-accessibility.spec-59', async () => expect(h2Count).toBe(0));
  });

  test('LIMAS-SUD-975: Filter buttons communicate expanded state and dialog popup', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    for (const btn of [hub.userFiltersButton, hub.licenseFiltersButton]) {
      await recordEvidence('assert-toHaveAttribute-user-license-hub-accessibility.spec-66', async () => expect(btn).toHaveAttribute('aria-haspopup', 'dialog'));
      await recordEvidence('assert-toHaveAttribute-user-license-hub-accessibility.spec-67', async () => expect(btn).toHaveAttribute('aria-expanded', 'false'));
    }
  });
});