import { recordEvidence } from '../../helpers/step-evidence';
import { test, expect } from '../../fixtures/base';
import { SystemUserDashboardPage } from '../../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Floating Licenses Zero State', () => {
  test.beforeEach(async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      dashboard.selectFloatingLicenses(),
    ]);
  });

  test('LIMAS-SUD-885: Zero counts display "0 loaded · 0 total licenses"', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await recordEvidence('assert-toBeVisible-floating-licenses-zero-state.spec-17', async () => expect(dashboard.floatingLicensesCountText).toBeVisible());
    await recordEvidence('assert-toHaveText-floating-licenses-zero-state.spec-18', async () => expect(dashboard.floatingLicensesCountText).toHaveText(/0\s*loaded\s*[·•]\s*0\s*total\s*licenses/i));
  });

  test('LIMAS-SUD-886: Empty state heading and supporting text are displayed', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await recordEvidence('assert-toBeVisible-floating-licenses-zero-state.spec-23', async () => expect(dashboard.floatingLicensesEmptyHeading).toBeVisible());
    await recordEvidence('assert-toBeVisible-floating-licenses-zero-state.spec-24', async () => expect(dashboard.floatingLicensesEmptySubtext).toBeVisible());
    await recordEvidence('assert-toHaveText-floating-licenses-zero-state.spec-25', async () => expect(dashboard.floatingLicensesEmptyHeading).toHaveText('No floating licenses found'));
    await recordEvidence('assert-toHaveText-floating-licenses-zero-state.spec-26', async () => expect(dashboard.floatingLicensesEmptySubtext).toHaveText(
      'No floating licenses match the selected expiration criteria.'
    ));
  });

  test('LIMAS-SUD-887: No action controls in empty state — no pagination, Load More, retry, refresh, or cards', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    const pagination = page.getByRole('navigation');
    await recordEvidence('assert-toHaveCount-floating-licenses-zero-state.spec-34', async () => expect(pagination).toHaveCount(0));
    const loadMore = page.getByRole('button', { name: /Load More/i });
    await recordEvidence('assert-toHaveCount-floating-licenses-zero-state.spec-36', async () => expect(loadMore).toHaveCount(0));
    const retryButton = page.getByRole('button', { name: /Retry|Refresh|Reload/i });
    await recordEvidence('assert-toHaveCount-floating-licenses-zero-state.spec-38', async () => expect(retryButton).toHaveCount(0));
  });
});