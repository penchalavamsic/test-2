import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';

const PROFILE = resolveProfileName();

test.describe('User & License Hub — User Pagination', () => {
  test.beforeEach(async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const hub = new UserLicenseHubPage(page);
    await hub.openUserLicenseHub();
    await hub.waitForHubLoad();
  });

  test('LIMAS-SUD-947: Showing range text matches pattern', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await recordEvidence('assert-toBeVisible-user-license-hub-pagination.spec-21', async () => expect(hub.paginationSummary).toBeVisible());
    const text = await hub.paginationSummary.textContent();
    await recordEvidence('assert-toMatch-user-license-hub-pagination.spec-23', async () => expect(text).toMatch(/Showing\s+\d+[–-]\d+\s+of\s+\d+/));
  });

  test('LIMAS-SUD-948: Rows per page label and combobox are visible', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await recordEvidence('assert-toBeVisible-user-license-hub-pagination.spec-28', async () => expect(hub.rowsPerPageLabel).toBeVisible());
    await recordEvidence('assert-toBeVisible-user-license-hub-pagination.spec-29', async () => expect(hub.rowsPerPageCombobox).toBeVisible());
  });

  test('LIMAS-SUD-949: Current page is 1 on initial load', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await recordEvidence('assert-toBeVisible-user-license-hub-pagination.spec-34', async () => expect(hub.pageInfoText).toBeVisible());
    const text = await hub.pageInfoText.textContent();
    await recordEvidence('assert-toMatch-user-license-hub-pagination.spec-36', async () => expect(text).toMatch(/Page\s+1\s+of\s+\d+/));
  });

  test('LIMAS-SUD-950: Previous button is disabled on page 1', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await recordEvidence('assert-toBeVisible-user-license-hub-pagination.spec-41', async () => expect(hub.previousPageButton).toBeVisible());
    const disabled = await hub.previousPageButton.evaluate(
      (el) => (el as HTMLButtonElement).disabled || el.getAttribute('aria-disabled') === 'true'
    );
    await recordEvidence('assert-toBe-user-license-hub-pagination.spec-45', async () => expect(disabled).toBe(true));
  });

  test('LIMAS-SUD-951: Next button is enabled when total pages > 1', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await recordEvidence('assert-toBeVisible-user-license-hub-pagination.spec-50', async () => expect(hub.nextPageButton).toBeVisible());
    await recordEvidence('assert-toBeEnabled-user-license-hub-pagination.spec-51', async () => expect(hub.nextPageButton).toBeEnabled());
  });

  test('LIMAS-SUD-952: Pagination logical consistency', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await hub.verifyPaginationConsistency();
  });

  test('LIMAS-SUD-953: Rows per page defaults to 20', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    const state = await hub.getPaginationState();
    await recordEvidence('assert-toBe-user-license-hub-pagination.spec-62', async () => expect(state.rowsPerPage).toBe(20));
  });
});