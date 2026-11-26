import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-131: Table dark mode readability', () => {
  test('should render readable row text in dark theme', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForLoad();

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-131-table-dark-mode-readability.spec-9', async () => expect(dashboard.pendingRequestsTab).toBeVisible());
    await recordEvidence('action-click-LIMAS-SUD-131-table-dark-mode-readability.spec-10', async () => dashboard.pendingRequestsTab.click());

    await recordEvidence('assert-toBeVisible-LIMAS-SUD-131-table-dark-mode-readability.spec-12', async () => expect(dashboard.licenseRequestTable).toBeVisible());

    // Switch to dark theme
    await recordEvidence('action-click-LIMAS-SUD-131-table-dark-mode-readability.spec-15', async () => dashboard.themeButton.click());
    await recordEvidence('assert-toHaveClass-LIMAS-SUD-131-table-dark-mode-readability.spec-16', async () => expect(page.locator('html')).toHaveClass(/dark/));

    // Get first visible data row and its computed styles
    const rows = dashboard.pendingRequestsDataRows;
    const firstRow = rows.first();
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-131-table-dark-mode-readability.spec-21', async () => expect(firstRow).toBeVisible());

    const firstCell = dashboard.getPendingRequestUserName(firstRow);
    const textColor = await firstCell.evaluate((el) => window.getComputedStyle(el).color);
    const bgColor = await firstCell.evaluate((el) => window.getComputedStyle(el).backgroundColor);

    // Text color must differ from background color
    await recordEvidence('assert-toBe-LIMAS-SUD-131-table-dark-mode-readability.spec-28', async () => expect(textColor).not.toBe(bgColor));

    // Verify user name paragraph is readable
    const nameParagraph = dashboard.getPendingRequestUserName(firstRow);
    await recordEvidence('assert-toBeVisible-LIMAS-SUD-131-table-dark-mode-readability.spec-32', async () => expect(nameParagraph).toBeVisible());

    // Restore light theme
    await recordEvidence('action-click-LIMAS-SUD-131-table-dark-mode-readability.spec-35', async () => dashboard.themeButton.click());
    await recordEvidence('assert-toHaveClass-LIMAS-SUD-131-table-dark-mode-readability.spec-36', async () => expect(page.locator('html')).not.toHaveClass(/dark/));
  });
});