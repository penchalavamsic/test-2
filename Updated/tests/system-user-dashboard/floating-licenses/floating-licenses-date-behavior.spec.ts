import { recordEvidence } from '../../helpers/step-evidence';
import { test, expect } from '../../fixtures/base';
import { SystemUserDashboardPage } from '../../pages/system-user-dashboard.page';
import { getFloatingLicensesRuntimeData } from '../../test-data/runtime-data';

const data = getFloatingLicensesRuntimeData();

test.describe('System User Dashboard — Floating Licenses Date Behavior', () => {
  test.beforeEach(async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    // Switch away from FL first to guarantee a fresh GET on selection
    await recordEvidence('action-click-floating-licenses-date-behavior.spec-13', async () => dashboard.expiringLicensesCard.click());
    await page.waitForTimeout(500);

    // Prepare response wait BEFORE triggering card selection
    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await dashboard.selectFloatingLicenses();
    await responsePromise;
  });

  test('LIMAS-SUD-888: Future date is accepted in Expires before control', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.setFloatingLicensesExpiresBefore(data.TEST_FL_FUTURE_DATE);
    await recordEvidence('assert-toHaveValue-floating-licenses-date-behavior.spec-28', async () => expect(dashboard.floatingLicensesExpiresBeforeInput).toHaveValue(data.TEST_FL_FUTURE_DATE));
    const badInput = await dashboard.floatingLicensesExpiresBeforeInput.evaluate(
      (el) => (el as HTMLInputElement).validity.badInput
    );
    await recordEvidence('assert-toBe-floating-licenses-date-behavior.spec-32', async () => expect(badInput).toBe(false));
  });

  test('LIMAS-SUD-889: Future date triggers GET request', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await dashboard.setFloatingLicensesExpiresBefore(data.TEST_FL_FUTURE_DATE);
    const response = await responsePromise;
    await recordEvidence('assert-toBe-floating-licenses-date-behavior.spec-43', async () => expect(response.status()).toBe(200));
    const url = new URL(response.url());
    await recordEvidence('assert-toMatch-floating-licenses-date-behavior.spec-45', async () => expect(url.pathname).toMatch(/\/api\/flicense\/ex\/.+/));
  });

  test('LIMAS-SUD-890: Past date is accepted in Expires before control', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.setFloatingLicensesExpiresBefore(data.TEST_FL_PAST_DATE);
    await recordEvidence('assert-toHaveValue-floating-licenses-date-behavior.spec-51', async () => expect(dashboard.floatingLicensesExpiresBeforeInput).toHaveValue(data.TEST_FL_PAST_DATE));
    const badInput = await dashboard.floatingLicensesExpiresBeforeInput.evaluate(
      (el) => (el as HTMLInputElement).validity.badInput
    );
    await recordEvidence('assert-toBe-floating-licenses-date-behavior.spec-55', async () => expect(badInput).toBe(false));
  });

  test('LIMAS-SUD-891: Past date triggers GET request', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await dashboard.setFloatingLicensesExpiresBefore(data.TEST_FL_PAST_DATE);
    const response = await responsePromise;
    await recordEvidence('assert-toBe-floating-licenses-date-behavior.spec-66', async () => expect(response.status()).toBe(200));
    const url = new URL(response.url());
    await recordEvidence('assert-toMatch-floating-licenses-date-behavior.spec-68', async () => expect(url.pathname).toMatch(/\/api\/flicense\/ex\/.+/));
  });

  test('LIMAS-SUD-892: Current date is accepted and triggers GET', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    const today = data.TEST_FL_CURRENT_DATE;
    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await dashboard.setFloatingLicensesExpiresBefore(today);
    const response = await responsePromise;
    await recordEvidence('assert-toBe-floating-licenses-date-behavior.spec-80', async () => expect(response.status()).toBe(200));
    await recordEvidence('assert-toHaveValue-floating-licenses-date-behavior.spec-81', async () => expect(dashboard.floatingLicensesExpiresBeforeInput).toHaveValue(today));
  });

  test('LIMAS-SUD-893: Date clearing triggers default-date GET', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    // The plan requires a populated date before clearing it.
    const [setResponse] = await Promise.all([
      page.waitForResponse(resp => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET'),
      dashboard.setFloatingLicensesExpiresBefore(data.TEST_FL_FUTURE_DATE),
    ]);
    await expect(dashboard.floatingLicensesExpiresBeforeInput).toHaveValue(data.TEST_FL_FUTURE_DATE);
    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await dashboard.clearFloatingLicensesExpiresBefore();
    const response = await responsePromise;
    await recordEvidence('assert-toBe-floating-licenses-date-behavior.spec-92', async () => expect(response.status()).toBe(200));
    await recordEvidence('assert-default-date-restored', async () => expect(new URL(response.url()).pathname).not.toBe(new URL(setResponse.url()).pathname));
    await recordEvidence('assert-toHaveValue-floating-licenses-date-behavior.spec-93', async () => expect(dashboard.floatingLicensesExpiresBeforeInput).toHaveValue(''));
  });

  test('LIMAS-SUD-894: Date value persists after request', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await dashboard.setFloatingLicensesExpiresBefore(data.TEST_FL_FUTURE_DATE);
    await responsePromise;
    await recordEvidence('assert-toHaveValue-floating-licenses-date-behavior.spec-104', async () => expect(dashboard.floatingLicensesExpiresBeforeInput).toHaveValue(data.TEST_FL_FUTURE_DATE));
  });

  test('LIMAS-SUD-895: Date change triggers exactly one GET', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    let flicenseGetCount = 0;
    page.on('request', (req) => {
      if ((req as unknown as { url(): string; method(): string }).url().includes('/api/flicense/') && (req as unknown as { url(): string; method(): string }).method() === 'GET') {
        flicenseGetCount++;
      }
    });
    const beforeCount = flicenseGetCount;

    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await dashboard.setFloatingLicensesExpiresBefore(data.TEST_FL_FUTURE_DATE);
    await responsePromise;

    const afterFirstCount = flicenseGetCount;
    await recordEvidence('assert-toBe-floating-licenses-date-behavior.spec-125', async () => expect(afterFirstCount - beforeCount).toBe(1));

    const responsePromise2 = page.waitForResponse(
      (resp) => resp.url().includes('/api/flicense/ex/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    );
    await dashboard.setFloatingLicensesExpiresBefore(data.TEST_FL_CURRENT_DATE);
    await responsePromise2;

    await recordEvidence('assert-toBe-floating-licenses-date-behavior.spec-134', async () => expect(flicenseGetCount - afterFirstCount).toBe(1));
  });
});