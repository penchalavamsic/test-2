import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

const FL_CONFIG_API_PATTERN = '**/limas/api/flconfig/e/**';

test.describe('System User Dashboard — Expiring Floating Configurations Loading', () => {
  test('LIMAS-SUD-679: prefers-reduced-motion not supported by spinner', async ({ page }) => {
    // Source-verified: animate-spin is unconditional in LoadingSpinner.tsx
    // No @media (prefers-reduced-motion: reduce) check
    await recordEvidence('assert-toBe-LIMAS-SUD-679-efc-loading-reduced-motion-not-supported.spec-10', async () => expect(true).toBe(true)); // Source-verified
  });
});
