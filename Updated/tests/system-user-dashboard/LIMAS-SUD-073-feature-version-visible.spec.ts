import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-073: should display at least one version in Version N.N.N format', async ({ authenticatedPage, page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const loadedCount = await dashboard.getPendingRequestsLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-073-feature-version-visible.spec-10', async () => expect(loadedCount).toBeGreaterThan(0));

    const firstRow = dashboard.pendingRequestsFirstRow;
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-073-feature-version-visible.spec-13', async () => expect(firstRow).toBeVisible());

    const versionParagraph = dashboard.getPendingRequestFeatureVersion(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-073-feature-version-visible.spec-16', async () => expect(versionParagraph).toBeVisible());
    const versionText = (await versionParagraph.textContent()) ?? '';
    await recordEvidence('assert-toMatch-LIMAS-SUD-073-feature-version-visible.spec-18', async () => expect(versionText).toMatch(/Version\s+\d+\.\d+\.\d+/));
  });
});
