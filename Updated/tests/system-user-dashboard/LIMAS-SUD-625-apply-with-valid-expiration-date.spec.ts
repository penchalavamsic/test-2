import { test } from '../fixtures/authenticated-test';
import { exerciseDashboardExtension } from '../helpers/dashboard-license-crud';

test('LIMAS-SUD-625: Apply an expiration date to an owned license and verify persistence', async ({ page }) => {
  test.setTimeout(240000);
  await exerciseDashboardExtension(page, 'LIMAS-SUD-625', 'expiration-date');
});
