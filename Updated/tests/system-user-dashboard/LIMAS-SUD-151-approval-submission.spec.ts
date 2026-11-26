import { recordEvidence, captureEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
const { redactObject } = require('../../scripts/lib/evidence-redaction.cjs');

test.describe('LIMAS-SUD-151: Approval submission (Data-changing)', () => {
  // Approval must never be replayed automatically after a post-submit assertion fails.
  test.describe.configure({ retries: 0 });
  test('should approve a pending request and verify API and count update', async ({ page }, testInfo) => {
    const recordId = process.env.TEST_RECORD_IDENTIFIER;
    test.skip(!recordId, 'TEST_RECORD_IDENTIFIER is required for data-changing approval test');
    const settings = {
      request: recordId!, user: process.env.TEST_RECORD_USER_NAME,
      userGroup: process.env.TEST_USER_GROUP, profile: process.env.TEST_PROFILE,
      role: process.env.TEST_ROLE, expirationDate: process.env.TEST_EXPIRATION_DATE,
      maintenanceDate: process.env.TEST_MAINTENANCE_DATE,
    };
    for (const key of ['userGroup', 'profile', 'role', 'expirationDate', 'maintenanceDate'] as const)
      expect(settings[key], `Explicit ${key} is required before approving a real request`).toBeTruthy();
    expect(recordId).toMatch(/^LR-\d+$/);
    const requestNumber = recordId!.slice(3);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.waitForPendingRequestsReady();
    const row = dashboard.pendingRequestsDataRows.filter({ has: page.getByRole('button', { name: `Delete ${recordId}`, exact: true }) });
    await expect(row).toHaveCount(1);
    if (settings.user) await expect(dashboard.getPendingRequestUserName(row)).toHaveText(settings.user);
    const initialTotal = await dashboard.getPendingRequestsTotalCount();
    expect(initialTotal).toBeGreaterThan(0);
    await testInfo.attach('Approval settings', { body: JSON.stringify(settings, null, 2), contentType: 'application/json' });
    await captureEvidence('selected-test-user-pending-request', testInfo, page);

    await recordEvidence('open-selected-request-approval-form', () => dashboard.getPendingRequestApproveButton(row).click());
    const form = dashboard.approveFormContainer;
    await expect(form).toHaveCount(1);
    const submit = form.getByRole('button', { name: 'Approve Request', exact: true });
    await expect(submit).toBeDisabled();
    await captureEvidence('blank-approval-form-submit-disabled', testInfo, page);
    await recordEvidence('select-authorized-user-group', async () => {
      await form.locator(`#approval-group-${requestNumber}`).click();
      await page.getByRole('option', { name: settings.userGroup, exact: true }).click();
    });
    await recordEvidence('select-matching-license-profile', async () => {
      await form.locator(`#approval-profile-${requestNumber}`).click();
      await page.getByRole('option', { name: settings.profile, exact: true }).click();
    });
    // The live role button has no associated accessible label; scope it to this form.
    await expect(form.getByRole('combobox')).toHaveCount(3);
    await recordEvidence('select-approved-license-role', async () => {
      await form.getByRole('combobox').nth(2).click();
      await page.getByRole('option', { name: settings.role, exact: true }).click();
    });
    await captureEvidence('group-profile-and-role-selected', testInfo, page);
    await recordEvidence('set-seven-day-license-dates', async () => {
      await form.locator(`#approval-expiration-${requestNumber}`).fill(settings.expirationDate!);
      await form.locator(`#approval-maintenance-${requestNumber}`).fill(settings.maintenanceDate!);
    });
    await expect(form.locator(`#approval-expiration-${requestNumber}`)).toHaveValue(settings.expirationDate!);
    await expect(form.locator(`#approval-maintenance-${requestNumber}`)).toHaveValue(settings.maintenanceDate!);
    await expect(submit).toBeEnabled();
    await captureEvidence('complete-approval-form-before-submit', testInfo, page);

    const responsePromise = page.waitForResponse(r => new URL(r.url()).pathname === '/limas/api/users' && r.request().method() === 'PUT', { timeout: 30000 });
    await recordEvidence('submit-approval-exactly-once', () => submit.click());
    const response = await responsePromise;
    let responseBody: unknown;
    try { responseBody = await response.json(); } catch { responseBody = await response.text(); }
    await testInfo.attach('Approval API result', { body: JSON.stringify(redactObject({
      request: recordId, method: response.request().method(), endpoint: new URL(response.url()).pathname,
      status: response.status(), response: responseBody,
    }), null, 2), contentType: 'application/json' });
    await captureEvidence('approval-server-response-and-ui', testInfo, page);
    expect(response.status(), 'Approval update must succeed before checking UI changes').toBe(200);
    await expect(row).toHaveCount(0, { timeout: 15000 });
    await expect.poll(async () => Number((await dashboard.pendingLicenseRequestsCard.innerText()).match(/^\s*(\d+)/)?.[1]), { timeout: 15000 }).toBe(initialTotal - 1);
    await captureEvidence('request-removed-and-pending-count-decreased', testInfo, page);
    await page.reload();
    await dashboard.waitForFullRender();
    await expect(row).toHaveCount(0);
    await captureEvidence('approval-persisted-after-reload', testInfo, page);
    const history = page.getByRole('switch', { name: 'Show License Request History', exact: true });
    if (await history.isVisible()) {
      await history.click();
      await expect(dashboard.processedSectionSubtitle).toBeVisible();
      await captureEvidence('processed-request-history-after-approval', testInfo, page);
    }
    expect(response.request().method(), 'Approval API method required by the scenario').toBe('PUT');
    expect(response.status(), 'Approval API successful response').toBe(200);
  });
});
