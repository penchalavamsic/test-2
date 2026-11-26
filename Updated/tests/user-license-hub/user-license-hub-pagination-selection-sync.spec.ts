import { selectHubUser, verifyHubSelection } from '../helpers/hub-selection';
import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';

const PROFILE = resolveProfileName();

test.describe('User & License Hub — Pagination Selection Sync', () => {
  test.beforeEach(async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const hub = new UserLicenseHubPage(page);
    await hub.openUserLicenseHub();
    await hub.waitForHubLoad();
  });

  test.afterEach(async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await hub.restoreDefaultPaginationState();
  });

  test('LIMAS-SUD-1054: After Next, an explicitly selected user drives the license panel', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    test.skip(!(await hub.isNextEnabled()), 'No second page of runtime users is available; reevaluated each run.');
    await selectHubUser(hub, 0);
    await hub.goToNextUserPage();
    await selectHubUser(hub, 0);
    await verifyHubSelection(hub, 0);
  });

  test('LIMAS-SUD-1055: After Previous, an explicitly selected user drives the license panel', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    test.skip(!(await hub.isNextEnabled()), 'No second page of runtime users is available; reevaluated each run.');
    await hub.goToNextUserPage();
    await selectHubUser(hub, 0);
    await hub.goToPreviousUserPage();
    await selectHubUser(hub, 0);
    await verifyHubSelection(hub, 0);
  });

  test('LIMAS-SUD-1056: License panel synchronizes to an explicitly selected user on the next page', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    test.skip(!(await hub.isNextEnabled()), 'No second page of runtime users is available; reevaluated each run.');
    await hub.goToNextUserPage();
    await selectHubUser(hub, 0);
    await verifyHubSelection(hub, 0);
  });

  test('LIMAS-SUD-1057: License panel synchronizes after returning to the previous page', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    test.skip(!(await hub.isNextEnabled()), 'No second page of runtime users is available; reevaluated each run.');
    await hub.goToNextUserPage();
    await selectHubUser(hub, 0);
    await hub.goToPreviousUserPage();
    await selectHubUser(hub, 0);
    await verifyHubSelection(hub, 0);
  });

  test('LIMAS-SUD-1058: A user can be selected on each visited page without stale selection', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    test.skip(!(await hub.isNextEnabled()), 'No second page of runtime users is available; reevaluated each run.');
    for (const direction of ['initial', 'next', 'previous']) {
      if (direction === 'next') await hub.goToNextUserPage();
      if (direction === 'previous') await hub.goToPreviousUserPage();
      await selectHubUser(hub, 0);
      await recordEvidence('assert-toBeVisible-user-license-hub-pagination-selection-sync.spec-71', async () => expect(hub.userCards.first()).toBeVisible());
      await verifyHubSelection(hub, 0);
    }
  });
});