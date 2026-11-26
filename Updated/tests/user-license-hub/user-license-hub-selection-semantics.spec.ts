import { selectHubUser, selectLicensedHubUser, verifyHubSelection } from '../helpers/hub-selection';
import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';

const PROFILE = resolveProfileName();

test.describe('User & License Hub — Selection Semantics', () => {
  test.beforeEach(async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const hub = new UserLicenseHubPage(page);
    await hub.openUserLicenseHub();
    await hub.waitForHubLoad();
  });

  test('LIMAS-SUD-986: Selecting a user applies the deployed selected-card indicator', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await selectHubUser(hub, 0);
    await recordEvidence('assert-toHaveClass-user-license-hub-selection-semantics.spec-25', async () => expect(hub.userCards.first()).toHaveClass(/ring-primary/));
    await verifyHubSelection(hub, 0);
  });

  test('LIMAS-SUD-987: No user card has aria-selected attribute', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const ariaExists = await hub.anyCardHasAriaSelected();
    await recordEvidence('assert-toBe-user-license-hub-selection-semantics.spec-33', async () => expect(ariaExists).toBe(false));
  });

  test('LIMAS-SUD-988: No user card has aria-pressed attribute', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const pressed = await page.evaluate(() => {
      const h3s = document.querySelectorAll('h3');
      for (let i = 0; i < h3s.length; i++) {
        let el = h3s[i].parentElement;
        for (let j = 0; j < 8 && el; j++) {
          if (el.getAttribute('aria-pressed') !== null) return true;
          el = el.parentElement;
        }
      }
      return false;
    });
    await recordEvidence('assert-toBe-user-license-hub-selection-semantics.spec-50', async () => expect(pressed).toBe(false));
  });

  test('LIMAS-SUD-989: No user card has data-state attribute', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const hasDataState = await page.evaluate(() => {
      const h3s = document.querySelectorAll('h3');
      for (let i = 0; i < h3s.length; i++) {
        let el = h3s[i].parentElement;
        for (let j = 0; j < 8 && el; j++) {
          if (el.getAttribute('data-state') !== null) return true;
          el = el.parentElement;
        }
      }
      return false;
    });
    await recordEvidence('assert-toBe-user-license-hub-selection-semantics.spec-67', async () => expect(hasDataState).toBe(false));
  });

  test('LIMAS-SUD-990: No user card has a semantic role (option/listitem/button)', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const hasRole = await hub.anyCardHasSemanticRole();
    await recordEvidence('assert-toBe-user-license-hub-selection-semantics.spec-74', async () => expect(hasRole).toBe(false));
  });

  test('LIMAS-SUD-991: User cards have null tabIndex — excluded from tab order', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const hasTabIndex = await hub.anyCardHasTabIndex();
    await recordEvidence('assert-toBe-user-license-hub-selection-semantics.spec-81', async () => expect(hasTabIndex).toBe(false));
  });

  test('LIMAS-SUD-992: Focus remains on body after user card selection', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    await hub.selectUserByIndex(1);

    const activeTag = await page.evaluate(() => document.activeElement?.tagName);
    // Focus does not move to the selected card
    await recordEvidence('assert-toBe-user-license-hub-selection-semantics.spec-91', async () => expect(activeTag).not.toBe('DIV'));
  });

  test('LIMAS-SUD-993: Selection is communicated only through color (accessibility gap)', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const isColorOnly = await hub.isSelectionColorOnly();
    await recordEvidence('assert-toBe-user-license-hub-selection-semantics.spec-98', async () => expect(isColorOnly).toBe(true));
  });
});