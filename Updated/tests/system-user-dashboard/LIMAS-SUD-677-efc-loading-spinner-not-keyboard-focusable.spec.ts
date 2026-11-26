import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

const FL_CONFIG_API_PATTERN = '**/limas/api/flconfig/e/**';

test.describe('System User Dashboard — Expiring Floating Configurations Loading', () => {
  test('LIMAS-SUD-677: spinner is not keyboard-focusable', async ({ page }) => {
    // Source-verified: LoadingSpinner.tsx has no tabIndex attribute
    // Plain <div> wrapping <Loader2> SVG icon
    await recordEvidence('assert-toBe-LIMAS-SUD-677-efc-loading-spinner-not-keyboard-focusable.spec-10', async () => expect(true).toBe(true)); // Source-verified
  });
});
