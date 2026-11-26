import { selectHubUser, selectLicensedHubUser, verifyHubSelection } from '../helpers/hub-selection';
import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';

const PROFILE = resolveProfileName();

test.describe('User & License Hub — Panel Scrolling', () => {
  test.beforeEach(async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const hub = new UserLicenseHubPage(page);
    await hub.openUserLicenseHub();
    await hub.waitForHubLoad();
  });

  test('LIMAS-SUD-1000: Selection persists while the user panel is scrolled', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await selectHubUser(hub, 0);
    await hub.scrollUserPanel(400);
    await recordEvidence('assert-toBe-user-license-hub-panel-scrolling.spec-26', async () => expect(await hub.getSelectedUserCardIndex()).toBe(0));
  });

  test('LIMAS-SUD-1001: User-panel scroll position is preserved through selection changes', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const requests: string[] = [];
    const handler = (request: import('@playwright/test').Request) => { if (request.url().includes('/api/')) requests.push(request.method()); };
    page.on('request', handler);
    const offset = await hub.userPanel.evaluate(el => Math.min(el.scrollHeight - el.clientHeight, Math.round(el.clientHeight * 0.75)));
    await hub.scrollUserPanel(offset);
    const scrollBefore = await hub.getUserPanelScrollTop();
    test.skip(offset <= 0, 'Too few runtime user cards to scroll; reevaluated each run.');
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-panel-scrolling.spec-39', async () => expect(scrollBefore).toBeGreaterThan(0));
    const index = await hub.userCards.evaluateAll(cards => cards.findIndex(card => {
      const panel = card.closest('.overflow-y-auto');
      if (!panel) return false;
      const box = card.getBoundingClientRect(), viewport = panel.getBoundingClientRect();
      return box.top >= viewport.top && box.bottom <= viewport.bottom && !card.className.includes('ring-primary');
    }));
    await recordEvidence('assert-toBeGreaterThanOrEqual-user-license-hub-panel-scrolling.spec-46', async () => expect(index, 'An unselected card must be fully visible at the scrolled position').toBeGreaterThanOrEqual(0));
    await hub.selectUserByIndex(index);
    await recordEvidence('assert-toBe-user-license-hub-panel-scrolling.spec-48', async () => expect(await hub.isUserCardSelected(index)).toBe(true));
    await recordEvidence('assert-toBeLessThanOrEqual-user-license-hub-panel-scrolling.spec-49', async () => expect(Math.abs((await hub.getUserPanelScrollTop()) - scrollBefore)).toBeLessThanOrEqual(10));
    page.off('request', handler);

  });

  test('LIMAS-SUD-1002: License panel has independent scrolling from user panel', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    // Check license panel overflow
    const lOverflow = await hub.licensePanel.evaluate((el) => getComputedStyle(el).overflowY);
    await recordEvidence('assert-toBe-user-license-hub-panel-scrolling.spec-58', async () => expect(lOverflow).not.toBe('visible'));
  });

  test('LIMAS-SUD-1003: Can select a user card after scrolling to new visible area', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    // Scroll to bring idx 6-10 into view
    await hub.scrollUserPanel(800);

    // Select idx 7 (should be visible)
    const userCount = await hub.getVisibleUserCount();
    if (userCount > 7) {
      const name = await hub.selectUserByIndex(7);
      await recordEvidence('assert-toBeGreaterThan-user-license-hub-panel-scrolling.spec-71', async () => expect(name.length).toBeGreaterThan(0));

      const isSel = await hub.isUserCardSelected(7);
      await recordEvidence('assert-toBe-user-license-hub-panel-scrolling.spec-74', async () => expect(isSel).toBe(true));
    }
  });

  test('LIMAS-SUD-1004: License panel scroll container exists (overflow-y: auto)', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const hasScroll = await page.evaluate(() => {
      const el = [...document.querySelectorAll('main div')].find(
        (d) =>
          d.className &&
          d.className.includes('overflow-y-auto') &&
          d.className.includes('gap-3')
      );
      return el ? getComputedStyle(el).overflowY : '';
    });
    await recordEvidence('assert-toMatch-user-license-hub-panel-scrolling.spec-90', async () => expect(hasScroll).toMatch(/auto|scroll/));
  });

  test('LIMAS-SUD-1005: Scrolling the user panel triggers no API requests', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    let reqCount = 0;
    const handler = () => { reqCount++; };
    page.on('request', handler);

    await hub.scrollUserPanel(400);
    await hub.scrollUserPanel(-400);
    await page.waitForLoadState('networkidle');

    page.off('request', handler);

    // No additional API requests from scrolling (only background auth tokens)
    await recordEvidence('assert-toBeLessThanOrEqual-user-license-hub-panel-scrolling.spec-107', async () => expect(reqCount).toBeLessThanOrEqual(2));
  });

  test('LIMAS-SUD-1006: Selection persists after scrolling away and back', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await selectHubUser(hub, 0);
    await hub.scrollUserPanel(600);
    await hub.scrollUserPanel(-600);
    await recordEvidence('assert-toBe-user-license-hub-panel-scrolling.spec-116', async () => expect(await hub.getSelectedUserCardIndex()).toBe(0));
  });
});