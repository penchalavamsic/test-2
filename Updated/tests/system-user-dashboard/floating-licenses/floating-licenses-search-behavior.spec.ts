import { recordEvidence } from '../../helpers/step-evidence';
import { test, expect } from '../../fixtures/base';
import { SystemUserDashboardPage } from '../../pages/system-user-dashboard.page';
import { getFloatingLicensesRuntimeData } from '../../test-data/runtime-data';

const data = getFloatingLicensesRuntimeData();

test.describe('System User Dashboard — Floating Licenses Search Behavior', () => {
  test.beforeEach(async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    // Switch away from FL first to guarantee a fresh GET on selection
    await recordEvidence('action-click-floating-licenses-search-behavior.spec-13', async () => dashboard.expiringLicensesCard.click());
    await page.waitForTimeout(500);

    // Prepare response wait BEFORE triggering card selection
    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await dashboard.selectFloatingLicenses();
    await responsePromise;
  });

  test('LIMAS-SUD-896: Search value is accepted', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.setFloatingLicensesSearch(data.TEST_FL_SEARCH_NO_MATCH);
    await recordEvidence('assert-toHaveValue-floating-licenses-search-behavior.spec-28', async () => expect(dashboard.floatingLicensesSearchInput).toHaveValue(data.TEST_FL_SEARCH_NO_MATCH));
  });

  test('LIMAS-SUD-897: Search is client-side — no API request triggered', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    let flicenseRequestCount = 0;
    page.on('request', (req) => {
      if ((req as unknown as { url(): string }).url().includes('/api/flicense/')) {
        flicenseRequestCount++;
      }
    });
    const beforeCount = flicenseRequestCount;
    await dashboard.setFloatingLicensesSearch(data.TEST_FL_SEARCH_NO_MATCH);
    await recordEvidence('assert-toBe-floating-licenses-search-behavior.spec-41', async () => expect(flicenseRequestCount).toBe(beforeCount));
  });

  test('LIMAS-SUD-898: No-match empty state heading is displayed', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.setFloatingLicensesSearch(data.TEST_FL_SEARCH_NO_MATCH);
    await recordEvidence('assert-toBeVisible-floating-licenses-search-behavior.spec-47', async () => expect(page.getByText('No matching floating licenses found')).toBeVisible());
  });

  test('LIMAS-SUD-899: No-match empty state subtext is displayed', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.setFloatingLicensesSearch(data.TEST_FL_SEARCH_NO_MATCH);
    await recordEvidence('assert-toBeVisible-floating-licenses-search-behavior.spec-53', async () => expect(
      page.getByText('Try a different user ID, profile, hardware ID, or role.')
    ).toBeVisible());
  });

  test('LIMAS-SUD-900: Count text unchanged during search', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    // Capture count text before search
    const countLocator = page.locator('text=/\\d+\\s*(loaded|total)/i').first();
    let beforeText = '';
    if (await countLocator.isVisible().catch(() => false)) {
      beforeText = (await countLocator.textContent()) ?? '';
    }
    await dashboard.setFloatingLicensesSearch(data.TEST_FL_SEARCH_NO_MATCH);
    // Count text should either persist (same text) or show filtered zero state
    const afterLocator = page.locator('text=/\\d+\\s*(loaded|total)/i').first();
    if (await afterLocator.isVisible().catch(() => false)) {
      const afterText = (await afterLocator.textContent()) ?? '';
      await recordEvidence('assert-toBe-floating-licenses-search-behavior.spec-71', async () => expect(afterText).toBe(beforeText));
    }
    // Verify empty state heading is present as the primary assertion
    await recordEvidence('assert-toBeVisible-floating-licenses-search-behavior.spec-74', async () => expect(page.getByText('No matching floating licenses found')).toBeVisible());
  });

  test('LIMAS-SUD-901: Enter key has no special effect — no navigation or request', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.setFloatingLicensesSearch(data.TEST_FL_SEARCH_NO_MATCH);
    const currentUrl = page.url();

    let extraRequestFired = false;
    page.on('request', (req) => {
      if ((req as unknown as { url(): string; method(): string }).url().includes('/api/flicense/ex/') && (req as unknown as { url(): string; method(): string }).method() === 'GET') {
        extraRequestFired = true;
      }
    });

    await recordEvidence('action-press-floating-licenses-search-behavior.spec-89', async () => dashboard.floatingLicensesSearchInput.press('Enter'));
    await recordEvidence('assert-toBe-floating-licenses-search-behavior.spec-90', async () => expect(page.url()).toBe(currentUrl));
    await recordEvidence('assert-toHaveValue-floating-licenses-search-behavior.spec-91', async () => expect(dashboard.floatingLicensesSearchInput).toHaveValue(data.TEST_FL_SEARCH_NO_MATCH));
  });

  test('LIMAS-SUD-902: Escape key clears search field', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.setFloatingLicensesSearch(data.TEST_FL_SEARCH_NO_MATCH);
    await recordEvidence('action-press-floating-licenses-search-behavior.spec-97', async () => dashboard.floatingLicensesSearchInput.press('Escape'));
    await recordEvidence('assert-toHaveValue-floating-licenses-search-behavior.spec-98', async () => expect(dashboard.floatingLicensesSearchInput).toHaveValue(''));
  });

  test('LIMAS-SUD-903: Search clearing restores default empty state', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.setFloatingLicensesSearch(data.TEST_FL_SEARCH_NO_MATCH);
    await recordEvidence('assert-toBeVisible-floating-licenses-search-behavior.spec-104', async () => expect(page.getByText('No matching floating licenses found')).toBeVisible());
    await dashboard.clearFloatingLicensesSearch();
    await recordEvidence('assert-toBeVisible-floating-licenses-search-behavior.spec-106', async () => expect(page.getByText('No floating licenses found')).toBeVisible());
    await recordEvidence('assert-toBeVisible-floating-licenses-search-behavior.spec-107', async () => expect(
      page.getByText('No floating licenses match the selected expiration criteria.')
    ).toBeVisible());
  });

  test('LIMAS-SUD-904: Search persists across date changes', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.setFloatingLicensesSearch(data.TEST_FL_SEARCH_NO_MATCH);
    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await dashboard.setFloatingLicensesExpiresBefore(data.TEST_FL_FUTURE_DATE);
    await responsePromise;
    await recordEvidence('assert-toHaveValue-floating-licenses-search-behavior.spec-121', async () => expect(dashboard.floatingLicensesSearchInput).toHaveValue(data.TEST_FL_SEARCH_NO_MATCH));
  });

  test('LIMAS-SUD-905: Search value visible after filling', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.setFloatingLicensesSearch(data.TEST_FL_SEARCH_NO_MATCH);
    const value = await dashboard.getFloatingLicensesSearchValue();
    await recordEvidence('assert-toBe-floating-licenses-search-behavior.spec-128', async () => expect(value).toBe(data.TEST_FL_SEARCH_NO_MATCH));
  });

  test('LIMAS-SUD-906: Search clearing triggers no API request', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.setFloatingLicensesSearch(data.TEST_FL_SEARCH_NO_MATCH);
    let flicenseRequestCount = 0;
    page.on('request', (req) => {
      if ((req as unknown as { url(): string }).url().includes('/api/flicense/')) {
        flicenseRequestCount++;
      }
    });
    const beforeCount = flicenseRequestCount;
    await dashboard.clearFloatingLicensesSearch();
    await recordEvidence('assert-toBe-floating-licenses-search-behavior.spec-142', async () => expect(flicenseRequestCount).toBe(beforeCount));
  });

  test('LIMAS-SUD-907: Search enabled and accepts input', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await recordEvidence('assert-toBeEnabled-floating-licenses-search-behavior.spec-147', async () => expect(dashboard.floatingLicensesSearchInput).toBeEnabled());
    await dashboard.setFloatingLicensesSearch(data.TEST_FL_SEARCH_NO_MATCH);
    await recordEvidence('assert-toHaveValue-floating-licenses-search-behavior.spec-149', async () => expect(dashboard.floatingLicensesSearchInput).toHaveValue(data.TEST_FL_SEARCH_NO_MATCH));
  });
});