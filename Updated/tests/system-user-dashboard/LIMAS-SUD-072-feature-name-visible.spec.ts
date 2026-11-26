import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-072: should display at least one feature name in a row', async ({ authenticatedPage, page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-072-feature-name-visible.spec-9', async () => expect(dashboard.pendingRequestsFeatureHeading).toBeVisible());

    const loadedCount = await dashboard.getPendingRequestsLoadedCount();
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-072-feature-name-visible.spec-12', async () => expect(loadedCount).toBeGreaterThan(0));

    const firstRow = dashboard.pendingRequestsFirstRow;
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-072-feature-name-visible.spec-15', async () => expect(firstRow).toBeVisible());

    const featureNameParagraph = dashboard.getPendingRequestFeatureName(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-072-feature-name-visible.spec-18', async () => expect(featureNameParagraph).toBeVisible());
    const featureNameText = (await featureNameParagraph.textContent()) ?? '';
    await recordEvidence('assert-toBeGreaterThan-LIMAS-SUD-072-feature-name-visible.spec-20', async () => expect(featureNameText.trim().length).toBeGreaterThan(0));
  });
});
