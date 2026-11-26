import { recordEvidence } from '../../helpers/step-evidence';
import { test, expect } from '../../fixtures/base';
import { SystemUserDashboardPage } from '../../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Floating Licenses Section Shell', () => {
  test('LIMAS-SUD-864: Floating Licenses section heading is h3 with correct text', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      dashboard.selectFloatingLicenses(),
    ]);

    await recordEvidence('assert-toBeVisible-floating-licenses-section-shell.spec-15', async () => expect(dashboard.floatingLicensesSectionHeading).toBeVisible());
    await recordEvidence('assert-toHaveText-floating-licenses-section-shell.spec-16', async () => expect(dashboard.floatingLicensesSectionHeading).toHaveText('Floating Licenses'));
  });

  test('LIMAS-SUD-865: Floating Licenses section description is correct', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      dashboard.selectFloatingLicenses(),
    ]);

    await recordEvidence('assert-toBeVisible-floating-licenses-section-shell.spec-29', async () => expect(dashboard.floatingLicensesSectionSubtitle).toBeVisible());
    await recordEvidence('assert-toHaveText-floating-licenses-section-shell.spec-30', async () => expect(dashboard.floatingLicensesSectionSubtitle).toHaveText(
      'Review active floating licenses approaching expiration.'
    ));
  });

  test('LIMAS-SUD-866: Floating Licenses section appears after card selection', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('assert-toBeVisible-floating-licenses-section-shell.spec-39', async () => expect(dashboard.floatingLicensesCard).toBeVisible());
    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      dashboard.selectFloatingLicenses(),
    ]);

    await recordEvidence('assert-toBeVisible-floating-licenses-section-shell.spec-46', async () => expect(dashboard.floatingLicensesSectionHeading).toBeVisible());
  });
});