import { recordEvidence } from '../../helpers/step-evidence';
import { test, expect } from '../../fixtures/base';
import { SystemUserDashboardPage } from '../../pages/system-user-dashboard.page';
import { getFloatingLicensesRuntimeData } from '../../test-data/runtime-data';

const data = getFloatingLicensesRuntimeData();

test.describe('System User Dashboard — Floating Licenses Combined Filters', () => {
  test.beforeEach(async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    // Switch away from FL first to guarantee a fresh GET on selection
    await recordEvidence('action-click-floating-licenses-combined-filters.spec-13', async () => dashboard.expiringLicensesCard.click());
    await page.waitForTimeout(500);

    // Prepare response wait BEFORE triggering card selection
    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await dashboard.selectFloatingLicenses();
    await responsePromise;
  });

  test('LIMAS-SUD-908: Date first then Search — both values persist', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await dashboard.setFloatingLicensesExpiresBefore(data.TEST_FL_FUTURE_DATE);
    await responsePromise;
    await dashboard.setFloatingLicensesSearch(data.TEST_FL_SEARCH_NO_MATCH);

    await recordEvidence('assert-toHaveValue-floating-licenses-combined-filters.spec-35', async () => expect(dashboard.floatingLicensesExpiresBeforeInput).toHaveValue(data.TEST_FL_FUTURE_DATE));
    await recordEvidence('assert-toHaveValue-floating-licenses-combined-filters.spec-36', async () => expect(dashboard.floatingLicensesSearchInput).toHaveValue(data.TEST_FL_SEARCH_NO_MATCH));
    await recordEvidence('assert-toBeVisible-floating-licenses-combined-filters.spec-37', async () => expect(page.getByText('No matching floating licenses found')).toBeVisible());
  });

  test('LIMAS-SUD-909: Search first then Date — Search persists after date GET', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.setFloatingLicensesSearch(data.TEST_FL_SEARCH_NO_MATCH);

    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await dashboard.setFloatingLicensesExpiresBefore(data.TEST_FL_FUTURE_DATE);
    await responsePromise;

    await recordEvidence('assert-toHaveValue-floating-licenses-combined-filters.spec-51', async () => expect(dashboard.floatingLicensesSearchInput).toHaveValue(data.TEST_FL_SEARCH_NO_MATCH));
    await recordEvidence('assert-toHaveValue-floating-licenses-combined-filters.spec-52', async () => expect(dashboard.floatingLicensesExpiresBeforeInput).toHaveValue(data.TEST_FL_FUTURE_DATE));
  });

  test('LIMAS-SUD-910: Date change with populated Search — both persist', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    // Set initial date
    let responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await dashboard.setFloatingLicensesExpiresBefore(data.TEST_FL_FUTURE_DATE);
    await responsePromise;
    await dashboard.setFloatingLicensesSearch(data.TEST_FL_SEARCH_NO_MATCH);

    // Change date
    responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await dashboard.setFloatingLicensesExpiresBefore(data.TEST_FL_CURRENT_DATE);
    await responsePromise;

    await recordEvidence('assert-toHaveValue-floating-licenses-combined-filters.spec-74', async () => expect(dashboard.floatingLicensesExpiresBeforeInput).toHaveValue(data.TEST_FL_CURRENT_DATE));
    await recordEvidence('assert-toHaveValue-floating-licenses-combined-filters.spec-75', async () => expect(dashboard.floatingLicensesSearchInput).toHaveValue(data.TEST_FL_SEARCH_NO_MATCH));
  });

  test('LIMAS-SUD-911: Clear Search with populated Date — date stays', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await dashboard.setFloatingLicensesExpiresBefore(data.TEST_FL_FUTURE_DATE);
    await responsePromise;
    await dashboard.setFloatingLicensesSearch(data.TEST_FL_SEARCH_NO_MATCH);

    let flicenseRequestCount = 0;
    page.on('request', (req) => {
      if ((req as unknown as { url(): string }).url().includes('/api/flicense/')) {
        flicenseRequestCount++;
      }
    });
    const beforeCount = flicenseRequestCount;

    await dashboard.clearFloatingLicensesSearch();

    await recordEvidence('assert-toBe-floating-licenses-combined-filters.spec-98', async () => expect(flicenseRequestCount).toBe(beforeCount));
    await recordEvidence('assert-toHaveValue-floating-licenses-combined-filters.spec-99', async () => expect(dashboard.floatingLicensesExpiresBeforeInput).toHaveValue(data.TEST_FL_FUTURE_DATE));
    await recordEvidence('assert-toHaveValue-floating-licenses-combined-filters.spec-100', async () => expect(dashboard.floatingLicensesSearchInput).toHaveValue(''));
  });

  test('LIMAS-SUD-912: Clear Date with populated Search — search stays', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    let responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await dashboard.setFloatingLicensesExpiresBefore(data.TEST_FL_FUTURE_DATE);
    await responsePromise;
    await dashboard.setFloatingLicensesSearch(data.TEST_FL_SEARCH_NO_MATCH);

    responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await dashboard.clearFloatingLicensesExpiresBefore();
    await responsePromise;

    await recordEvidence('assert-toHaveValue-floating-licenses-combined-filters.spec-120', async () => expect(dashboard.floatingLicensesExpiresBeforeInput).toHaveValue(''));
    await recordEvidence('assert-toHaveValue-floating-licenses-combined-filters.spec-121', async () => expect(dashboard.floatingLicensesSearchInput).toHaveValue(data.TEST_FL_SEARCH_NO_MATCH));
  });

  test('LIMAS-SUD-913: Clear order A — Search then Date — both empty', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    let responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await dashboard.setFloatingLicensesExpiresBefore(data.TEST_FL_FUTURE_DATE);
    await responsePromise;
    await dashboard.setFloatingLicensesSearch(data.TEST_FL_SEARCH_NO_MATCH);

    // Clear search first
    await dashboard.clearFloatingLicensesSearch();
    // Then clear date
    responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await dashboard.clearFloatingLicensesExpiresBefore();
    await responsePromise;

    await recordEvidence('assert-toHaveValue-floating-licenses-combined-filters.spec-144', async () => expect(dashboard.floatingLicensesExpiresBeforeInput).toHaveValue(''));
    await recordEvidence('assert-toHaveValue-floating-licenses-combined-filters.spec-145', async () => expect(dashboard.floatingLicensesSearchInput).toHaveValue(''));
    await recordEvidence('assert-toBeVisible-floating-licenses-combined-filters.spec-146', async () => expect(page.getByText('No floating licenses found')).toBeVisible());
  });

  test('LIMAS-SUD-914: Clear order B — Date then Search — both empty', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    let responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await dashboard.setFloatingLicensesExpiresBefore(data.TEST_FL_FUTURE_DATE);
    await responsePromise;
    await dashboard.setFloatingLicensesSearch(data.TEST_FL_SEARCH_NO_MATCH);

    // Clear date first
    responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await dashboard.clearFloatingLicensesExpiresBefore();
    await responsePromise;
    // Then clear search
    await dashboard.clearFloatingLicensesSearch();

    await recordEvidence('assert-toHaveValue-floating-licenses-combined-filters.spec-169', async () => expect(dashboard.floatingLicensesExpiresBeforeInput).toHaveValue(''));
    await recordEvidence('assert-toHaveValue-floating-licenses-combined-filters.spec-170', async () => expect(dashboard.floatingLicensesSearchInput).toHaveValue(''));
    await recordEvidence('assert-toBeVisible-floating-licenses-combined-filters.spec-171', async () => expect(page.getByText('No floating licenses found')).toBeVisible());
  });

  test('LIMAS-SUD-915: Combined state — no duplicate requests', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    let flicenseGetCount = 0;
    page.on('request', (req) => {
      if ((req as unknown as { url(): string; method(): string }).url().includes('/api/flicense/') && (req as unknown as { url(): string; method(): string }).method() === 'GET') {
        flicenseGetCount++;
      }
    });
    const beforeCount = flicenseGetCount;

    // Set date — expect exactly 1 GET
    let responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await dashboard.setFloatingLicensesExpiresBefore(data.TEST_FL_FUTURE_DATE);
    await responsePromise;
    await recordEvidence('assert-toBe-floating-licenses-combined-filters.spec-191', async () => expect(flicenseGetCount - beforeCount).toBe(1));

    // Fill search — expect 0 additional GETs
    const afterDateCount = flicenseGetCount;
    await dashboard.setFloatingLicensesSearch(data.TEST_FL_SEARCH_NO_MATCH);
    await recordEvidence('assert-toBe-floating-licenses-combined-filters.spec-196', async () => expect(flicenseGetCount).toBe(afterDateCount));

    // Clear search — expect 0 additional GETs
    await dashboard.clearFloatingLicensesSearch();
    await recordEvidence('assert-toBe-floating-licenses-combined-filters.spec-200', async () => expect(flicenseGetCount).toBe(afterDateCount));

    // Clear date — expect exactly 1 GET
    responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await dashboard.clearFloatingLicensesExpiresBefore();
    await responsePromise;
    await recordEvidence('assert-toBe-floating-licenses-combined-filters.spec-209', async () => expect(flicenseGetCount - afterDateCount).toBe(1));
  });

  test('LIMAS-SUD-916: Combined state shows filtered empty state', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await dashboard.setFloatingLicensesExpiresBefore(data.TEST_FL_FUTURE_DATE);
    await responsePromise;
    await dashboard.setFloatingLicensesSearch(data.TEST_FL_SEARCH_NO_MATCH);

    await recordEvidence('assert-toBeVisible-floating-licenses-combined-filters.spec-222', async () => expect(page.getByText('No matching floating licenses found')).toBeVisible());
    await recordEvidence('assert-toBeVisible-floating-licenses-combined-filters.spec-223', async () => expect(
      page.getByText('Try a different user ID, profile, hardware ID, or role.')
    ).toBeVisible());
    await recordEvidence('assert-toHaveValue-floating-licenses-combined-filters.spec-226', async () => expect(dashboard.floatingLicensesExpiresBeforeInput).toHaveValue(data.TEST_FL_FUTURE_DATE));
    await recordEvidence('assert-toHaveValue-floating-licenses-combined-filters.spec-227', async () => expect(dashboard.floatingLicensesSearchInput).toHaveValue(data.TEST_FL_SEARCH_NO_MATCH));
  });
});