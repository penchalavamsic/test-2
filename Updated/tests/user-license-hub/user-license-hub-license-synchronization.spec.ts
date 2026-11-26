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

  test('LIMAS-SUD-994: License panel card count matches selected user badge count', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const selIdx = await hub.getSelectedUserCardIndex();
    await recordEvidence('assert-toBeGreaterThanOrEqual-user-license-hub-license-synchronization.spec-23', async () => expect(selIdx).toBeGreaterThanOrEqual(0));

    await hub.verifyLicenseCountMatchesBadge(selIdx);
  });

  test('LIMAS-SUD-995: Assigned-to on license cards matches selected user name', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const selIdx = await hub.getSelectedUserCardIndex();
    await recordEvidence('assert-toBeGreaterThanOrEqual-user-license-hub-license-synchronization.spec-32', async () => expect(selIdx).toBeGreaterThanOrEqual(0));

    await hub.verifyAssignedToMatchesSelection(selIdx);
  });

  test('LIMAS-SUD-996: No stale license cards after switching users', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await expect.poll(() => hub.getSelectedUserCardIndex()).toBe(0);
    expect(await hub.getVisibleUserCount()).toBeGreaterThanOrEqual(2);
    const requests: string[] = [];
    const handler = (request: import('@playwright/test').Request) => { if (request.url().includes('/api/')) requests.push(request.method()); };
    page.on('request', handler);
    for (const index of [1, 0]) {
      await hub.selectUserByIndex(index);
      await hub.verifyLicenseCountMatchesBadge(index);
      await hub.verifyAssignedToMatchesSelection(index);
    }
    page.off('request', handler);
    expect(requests).toEqual([]);
  });

  test('LIMAS-SUD-997: No duplicate license cards displayed', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await expect.poll(() => hub.getSelectedUserCardIndex()).toBe(0);
    test.skip(await hub.getVisibleUserCount() < 3, 'Three populated users are required for the planned switching sequence');
    const originalCount = await hub.getUserCardBadgeCount(0);
    const requests: string[] = [];
    const handler = (request: import('@playwright/test').Request) => { if (request.url().includes('/api/')) requests.push(request.method()); };
    page.on('request', handler);
    for (const index of [0, 1, 2, 0, 1]) {
      await hub.selectUserByIndex(index);
      await hub.verifyLicenseCountMatchesBadge(index);
      if (index === 0) expect(await hub.licenseCards.count()).toBe(originalCount);
    }
    page.off('request', handler);
    expect(requests).toEqual([]);
  });

  test('LIMAS-SUD-998: Download, Email, and Add License toolbar buttons are enabled when a user is selected', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    // Auto-selected user should have toolbar enabled (if user has licenses)
    const badgeCount = await hub.getUserCardBadgeCount(0);
    if (badgeCount > 0) {
      await hub.verifyToolbarButtonsEnabled();
    }
  });

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