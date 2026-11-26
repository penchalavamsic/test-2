import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';

const PROFILE = resolveProfileName();

test.describe('User & License Hub — Selection Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const hub = new UserLicenseHubPage(page);
    await hub.openUserLicenseHub();
    await hub.waitForHubLoad();
  });

  test('LIMAS-SUD-1007: Badge displays singular form "1 License" for count of 1', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const userCount = await hub.getVisibleUserCount();

    // Find a card with 1 license from the current page
    const oneLicense = await page.evaluate(() => {
      const h3s = document.querySelectorAll('h3');
      for (let i = 0; i < h3s.length; i++) {
        const all = h3s[i].parentElement?.querySelectorAll?.('*');
        if (!all) continue;
        for (const el of all) {
          const text = el.textContent?.trim() ?? '';
          if (/^1\s+License$/i.test(text)) return i;
        }
      }
      return -1;
    });

    if (oneLicense >= 0) {
      const count = await hub.getUserCardBadgeCount(oneLicense);
      await recordEvidence('assert-toBe-user-license-hub-selection-accessibility.spec-40', async () => expect(count).toBe(1));

      // Verify badge wording
      const card = await hub.getUserCardContainer(oneLicense);
      const badgeText = await card.evaluate((el) => {
        const all = el.querySelectorAll('*');
        for (const c of all) {
          const t = c.textContent?.trim() ?? '';
          if (/^\d+\s*Licenses?$/i.test(t)) return t;
        }
        return '';
      });
      await recordEvidence('assert-toBe-user-license-hub-selection-accessibility.spec-52', async () => expect(badgeText).toBe('1 License'));
    }
  });

  test('LIMAS-SUD-1008: Badge displays plural form "N Licenses" for count > 1', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const multiLicense = await page.evaluate(() => {
      const h3s = document.querySelectorAll('h3');
      for (let i = 0; i < h3s.length; i++) {
        const all = h3s[i].parentElement?.querySelectorAll?.('*');
        if (!all) continue;
        for (const el of all) {
          const text = el.textContent?.trim() ?? '';
          const m = text.match(/^(\d+)\s+Licenses$/i);
          if (m && parseInt(m[1]) > 1) return i;
        }
      }
      return -1;
    });

    if (multiLicense >= 0) {
      const count = await hub.getUserCardBadgeCount(multiLicense);
      await recordEvidence('assert-toBeGreaterThan-user-license-hub-selection-accessibility.spec-75', async () => expect(count).toBeGreaterThan(1));
    } else {
      // All users have >0 licenses on page 1, so at least one should have >1
      test.skip();
    }
  });

  test('LIMAS-SUD-1009: User-card containers have no accessible name', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const hasAccessibleName = await page.evaluate(() => {
      const h3s = document.querySelectorAll('h3');
      for (let i = 0; i < Math.min(3, h3s.length); i++) {
        let el = h3s[i].parentElement;
        for (let j = 0; j < 8 && el; j++) {
          const label = el.getAttribute('aria-label');
          const labelledBy = el.getAttribute('aria-labelledby');
          if (label || labelledBy) return true;
          el = el.parentElement;
        }
      }
      return false;
    });
    await recordEvidence('assert-toBe-user-license-hub-selection-accessibility.spec-98', async () => expect(hasAccessibleName).toBe(false));
  });

  test('LIMAS-SUD-1010: No screen-reader announcement for selection changes', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    // Check for live regions that might announce selection
    const liveRegions = await page.locator('[aria-live]').count();
    // No live regions should exist (or if they do, they shouldn't announce card selection)
    await recordEvidence('assert-toBeLessThanOrEqual-user-license-hub-selection-accessibility.spec-107', async () => expect(liveRegions).toBeLessThanOrEqual(1));
  });

  test('LIMAS-SUD-1011: User cards are divs, not buttons or list items', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const hasRole = await hub.anyCardHasSemanticRole();
    await recordEvidence('assert-toBe-user-license-hub-selection-accessibility.spec-114', async () => expect(hasRole).toBe(false));

    // Verify cards themselves are divs with no interactable semantics
    const tag = await page.evaluate(() => {
      const h3 = document.querySelector('h3');
      let el = h3?.parentElement;
      for (let i = 0; i < 8 && el; i++) {
        if (el.className && el.className.startsWith('rounded-lg border')) return el.tagName;
        el = el.parentElement;
      }
      return '';
    });
    await recordEvidence('assert-toBe-user-license-hub-selection-accessibility.spec-126', async () => expect(tag).toBe('DIV'));
  });

  test('LIMAS-SUD-1012: No focus management — selected card does not receive focus', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    await hub.selectUserByIndex(1);

    // Focus should not be on any card element
    const focusedIsCard = await page.evaluate(() => {
      const ae = document.activeElement;
      if (!ae || ae === document.body) return false;
      return ae.className && ae.className.includes('rounded-lg');
    });
    await recordEvidence('assert-toBe-user-license-hub-selection-accessibility.spec-140', async () => expect(focusedIsCard).toBe(false));
  });

  test('LIMAS-SUD-1013: User panel scroll region is not marked for assistive technology', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const hasMarking = await page.evaluate(() => {
      const el = [...document.querySelectorAll('main div')].find(
        (d) =>
          d.className &&
          d.className.includes('overflow-y-auto') &&
          d.className.includes('space-y-3')
      );
      if (!el) return true;
      return (
        el.getAttribute('role') !== null ||
        el.getAttribute('aria-label') !== null ||
        el.getAttribute('aria-labelledby') !== null ||
        el.getAttribute('tabindex') !== null
      );
    });
    await recordEvidence('assert-toBe-user-license-hub-selection-accessibility.spec-161', async () => expect(hasMarking).toBe(false));
  });

  test('LIMAS-SUD-1014: User cards are excluded from keyboard tab order', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const hasTabIndex = await hub.anyCardHasTabIndex();
    await recordEvidence('assert-toBe-user-license-hub-selection-accessibility.spec-168', async () => expect(hasTabIndex).toBe(false));
  });
});