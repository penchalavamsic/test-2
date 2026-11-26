import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Pending License Requests', () => {
  test('LIMAS-SUD-064: should have loaded and total counts as numbers >= 0', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    const countText = page.getByText(/\d+\s*loaded[·•]\d+\s*total\s+pending/i);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-064-count-numeric.spec-10', async () => expect(countText).toBeVisible());

    const text = await countText.textContent();
    await recordEvidence('assert-toBeTruthy-LIMAS-SUD-064-count-numeric.spec-13', async () => expect(text).toBeTruthy());

    // Extract loaded and total numbers
    const match = text!.match(/(\d+)\s*loaded[·•](\d+)\s*total\s+pending/i);
    await recordEvidence('assert-toBeNull-LIMAS-SUD-064-count-numeric.spec-17', async () => expect(match).not.toBeNull());

    const loaded = parseInt(match![1], 10);
    const total = parseInt(match![2], 10);

    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-064-count-numeric.spec-22', async () => expect(loaded).toBeGreaterThanOrEqual(0));
    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-064-count-numeric.spec-23', async () => expect(total).toBeGreaterThanOrEqual(0));
    await recordEvidence('assert-toBeLessThanOrEqual-LIMAS-SUD-064-count-numeric.spec-24', async () => expect(loaded).toBeLessThanOrEqual(total));
  });
});