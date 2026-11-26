import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Record Fields', () => {
  test('LIMAS-SUD-233: should not use <label> elements for "User"/"Feature"/"Hardware / Created" field labels', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    // Locate the first "User" label occurrence and check its tag name
    const firstUserLabel = page.getByText('User').first();
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-233-processed-record-labels-not-associated.spec-13', async () => expect(firstUserLabel).toBeVisible());

    const userTagName = await firstUserLabel.evaluate(el => el.tagName.toLowerCase());
    await recordEvidence('assert-toBe-LIMAS-SUD-233-processed-record-labels-not-associated.spec-16', async () => expect(userTagName).not.toBe('label'));

    // Locate the first "Feature" label
    const firstFeatureLabel = page.getByText('Feature').first();
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-233-processed-record-labels-not-associated.spec-20', async () => expect(firstFeatureLabel).toBeVisible());

    const featureTagName = await firstFeatureLabel.evaluate(el => el.tagName.toLowerCase());
    await recordEvidence('assert-toBe-LIMAS-SUD-233-processed-record-labels-not-associated.spec-23', async () => expect(featureTagName).not.toBe('label'));

    // Locate the first "Hardware / Created" label
    const firstHwLabel = page.getByText('Hardware / Created').first();
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-233-processed-record-labels-not-associated.spec-27', async () => expect(firstHwLabel).toBeVisible());

    const hwTagName = await firstHwLabel.evaluate(el => el.tagName.toLowerCase());
    await recordEvidence('assert-toBe-LIMAS-SUD-233-processed-record-labels-not-associated.spec-30', async () => expect(hwTagName).not.toBe('label'));
  });
});