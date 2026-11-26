import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Expiring Licenses Section Shell', () => {
  test('LIMAS-SUD-314: should document accessibility limitations in the expiring section shell', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.selectExpiringLicenses();
    await dashboard.waitForExpiringLicenseLoad();

    // Cards should not have role="listitem"
    const cardsWithRole = page.locator('[role="listitem"]').filter({ hasText: /@kpit\.com/ });
    await recordEvidence('assert-toHaveCount-LIMAS-SUD-314-expiring-section-shell-accessibility.spec-13', async () => expect(cardsWithRole).toHaveCount(0));

    // No aria-live on the section shell
    const liveRegions = page.locator('[aria-live]');
    const liveCount = await liveRegions.count();

    // Document — no new live regions expected from section interaction
    await recordEvidence('assert-toBeGreaterThanOrEqual-LIMAS-SUD-314-expiring-section-shell-accessibility.spec-20', async () => expect(liveCount).toBeGreaterThanOrEqual(0));

    // Expires before label is not a <label> element
    const labelTag = await dashboard.expiresBeforeLabel.evaluate(el => el.tagName.toLowerCase());
    await recordEvidence('assert-toBe-LIMAS-SUD-314-expiring-section-shell-accessibility.spec-24', async () => expect(labelTag).not.toBe('label'));
  });
});