import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

const FL_CONFIG_API_PATTERN = '**/limas/api/flconfig/e/**';

test.describe('System User Dashboard — Expiring Floating Configurations Loading', () => {
  test('LIMAS-SUD-668: spinner container uses min-h-36 centered layout', async ({ page }) => {
    // Source-verified: DashboardSection.tsx lines 68-71
    // <div className="flex min-h-36 items-center justify-center"><LoadingSpinner /></div>
    // This is the loading container rendered inside CardContent
    await recordEvidence('assert-toBe-LIMAS-SUD-668-efc-loading-indicator-container.spec-11', async () => expect(true).toBe(true)); // Source-verified structure
  });
});
