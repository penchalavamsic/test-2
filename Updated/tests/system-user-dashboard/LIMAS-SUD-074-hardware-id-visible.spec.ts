import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-074: should display at least one quoted numeric hardware ID in a row', async ({ authenticatedPage, page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const loadedCount = await dashboard.getPendingRequestsLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-074-hardware-id-visible.spec-10', async () => expect(loadedCount).toBeGreaterThan(0));

    const firstRow = dashboard.pendingRequestsFirstRow;
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-074-hardware-id-visible.spec-13', async () => expect(firstRow).toBeVisible());

    const hwIdParagraph = dashboard.getPendingRequestHardwareId(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-074-hardware-id-visible.spec-16', async () => expect(hwIdParagraph).toBeVisible());
    const hwIdText = ((await hwIdParagraph.textContent()) ?? '').trim();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-074-hardware-id-visible.spec-18', async () => expect(hwIdText.length).toBeGreaterThan(0));
    await recordEvidence('assert-toMatch-LIMAS-SUD-074-hardware-id-visible.spec-19', async () => expect(hwIdText).toMatch(/^-?\d+$/));
  });
});
