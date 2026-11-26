import { selectHubUser, selectLicensedHubUser, verifyHubSelection } from '../helpers/hub-selection';
import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';

const PROFILE = resolveProfileName();

test.describe('User & License Hub — License Synchronization', () => {
  test.beforeEach(async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const hub = new UserLicenseHubPage(page);
    await hub.openUserLicenseHub();
    await hub.waitForHubLoad();
  });

  test('LIMAS-SUD-994: License panel count matches the explicitly selected user', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await selectHubUser(hub, 0);
    await hub.verifyLicenseCountMatchesBadge(0);
  });

  test('LIMAS-SUD-995: Each displayed license belongs to the selected licensed user', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    const index = await selectLicensedHubUser(hub);
    await hub.verifyAssignedToMatchesSelection(index);
  });

  test('LIMAS-SUD-996: Switching users replaces the license panel without stale cards', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    for (const index of [0, 1, 0]) { await selectHubUser(hub, index); await verifyHubSelection(hub, index); }
  });

  test('LIMAS-SUD-997: Repeated switching does not accumulate duplicate license cards', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    for (const index of [0, 1, 2, 0, 1]) { await selectHubUser(hub, index); await verifyHubSelection(hub, index); }
  });

  test('LIMAS-SUD-998: Selecting a licensed user enables license toolbar actions', async ({ page }) => { const hub = new UserLicenseHubPage(page); await selectLicensedHubUser(hub); await recordEvidence('assert-toBeEnabled-user-license-hub-license-synchronization.spec-44', async () => expect(hub.downloadButton).toBeEnabled()); await recordEvidence('assert-toBeEnabled-user-license-hub-license-synchronization.spec-44', async () => expect(hub.emailButton).toBeEnabled()); await recordEvidence('assert-toBeEnabled-user-license-hub-license-synchronization.spec-44', async () => expect(hub.addLicenseButton).toBeEnabled()); });

  test('LIMAS-SUD-999: Toolbar button state tracks user selection', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const selIdx = await hub.getSelectedUserCardIndex();
    const otherIdx = selIdx === 0 ? 1 : 0;

    // First user toolbar state
    const badgeCount0 = await hub.getUserCardBadgeCount(selIdx);

    // Switch users
    await hub.selectUserByIndex(otherIdx);
    const badgeCount1 = await hub.getUserCardBadgeCount(otherIdx);

    // Toolbar should be enabled for any selected user with licenses
    if (badgeCount1 > 0) {
      await recordEvidence('assert-toBeEnabled-user-license-hub-license-synchronization.spec-94', async () => expect(hub.downloadButton).toBeEnabled());
    }
  });
});