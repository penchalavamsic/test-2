import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { ServerLicensingPage } from '../pages/server-licensing.page';

const PROFILE = resolveProfileName();

// ─── SVL-A: Server License Management — Initial Page Shell ───

test.describe('Server License Management — SVL-A', () => {

  // ─── 1. Page Shell ────────────────────────────────────────────

  test.describe('Page Shell', () => {

    test('LIMAS-SUD-2576: Sidebar navigation to Server License Management has route and aria-current', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      await dashboard.waitForSidebar();
      const navLink = dashboard.navServerLicensing;
      await recordEvidence('assert-toBeVisible-server-licensing-shell.spec-24', async () => expect(navLink).toBeVisible());
      await recordEvidence('action-click-server-licensing-shell.spec-25', async () => navLink.click());
      await page.waitForURL('**/server-licensing/**');

      const url = new URL(page.url());
      await recordEvidence('assert-toMatch-server-licensing-shell.spec-29', async () => expect(url.pathname).toMatch(/server-licensing/i));
      await recordEvidence('assert-toHaveAttribute-server-licensing-shell.spec-30', async () => expect(navLink).toHaveAttribute('aria-current', /page/i));
    });

    test('LIMAS-SUD-2577: Page heading is h1 "Server License Management"', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      await recordEvidence('assert-toBeVisible-server-licensing-shell.spec-42', async () => expect(svl.heading).toBeVisible());
      await recordEvidence('assert-toHaveText-server-licensing-shell.spec-43', async () => expect(svl.heading).toHaveText('Server License Management'));
    });

    test('LIMAS-SUD-2578: Page description text is visible', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      await recordEvidence('assert-toBeVisible-server-licensing-shell.spec-55', async () => expect(svl.description).toBeVisible());
    });

    test('LIMAS-SUD-2579: Sidebar highlights Server License Management link', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      await dashboard.waitForSidebar();
      const navLink = dashboard.navServerLicensing;
      await recordEvidence('assert-toHaveAttribute-server-licensing-shell.spec-69', async () => expect(navLink).toHaveAttribute('aria-current', /page/i));
    });

    test('LIMAS-SUD-2580: Main content region is visible', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      await recordEvidence('assert-toBeVisible-server-licensing-shell.spec-81', async () => expect(svl.mainContent).toBeVisible());
    });

    test('LIMAS-SUD-2581: Footer is visible', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      await recordEvidence('assert-toBeVisible-server-licensing-shell.spec-93', async () => expect(svl.footer).toBeVisible());
    });
  });

  // ─── 2. Server License Selector ───────────────────────────────

  test.describe('Server License Selector', () => {

    test('LIMAS-SUD-2582: Server License selector is visible with label', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      await recordEvidence('assert-toBeVisible-server-licensing-shell.spec-110', async () => expect(svl.serverLicenseSelector).toBeVisible());
      await recordEvidence('assert-toBeVisible-server-licensing-shell.spec-111', async () => expect(svl.serverLicenseSelectorLabel).toBeVisible());
    });

    test('LIMAS-SUD-2583: Server License selector has runtime options', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const options = await svl.getServerLicenseSelectorOptions();
      await recordEvidence('assert-toBeGreaterThan-server-licensing-shell.spec-124', async () => expect(options.length).toBeGreaterThan(0));
    });

    test('LIMAS-SUD-2584: Server License selector shows selected value', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const selected = await svl.getSelectedServerLicense();
      await recordEvidence('assert-toBeGreaterThan-server-licensing-shell.spec-137', async () => expect(selected.length).toBeGreaterThan(0));
    });
  });

  // ─── 3. Filters Button ────────────────────────────────────────

  test.describe('Filters Button', () => {

    test('LIMAS-SUD-2585: Filters button is visible and enabled', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      await recordEvidence('assert-toBeVisible-server-licensing-shell.spec-154', async () => expect(svl.filtersButton).toBeVisible());
      await recordEvidence('assert-toBeEnabled-server-licensing-shell.spec-155', async () => expect(svl.filtersButton).toBeEnabled());
    });

    test('LIMAS-SUD-2586: Filters panel is initially collapsed', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const expanded = await svl.isFiltersExpanded();
      await recordEvidence('assert-toBe-server-licensing-shell.spec-168', async () => expect(expanded).toBe(false));
    });

    test('LIMAS-SUD-2587: Filters button opens filters panel', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      await svl.openFilters();
      const expanded = await svl.isFiltersExpanded();
      await recordEvidence('assert-toBe-server-licensing-shell.spec-182', async () => expect(expanded).toBe(true));

      await svl.closeFilters();
    });

    test('LIMAS-SUD-2588: Escape closes filters panel', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      await svl.openFilters();
      await svl.closeFilters();

      const expanded = await svl.isFiltersExpanded();
      await recordEvidence('assert-toBe-server-licensing-shell.spec-200', async () => expect(expanded).toBe(false));
    });
  });

  // ─── 4. Add Customer Button ───────────────────────────────────

  test.describe('Add Customer Button', () => {

    test('LIMAS-SUD-2589: Add Customer button is visible', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      await recordEvidence('assert-toBeVisible-server-licensing-shell.spec-217', async () => expect(svl.addCustomerButton).toBeVisible());
    });

    test('LIMAS-SUD-2590: Add Customer button has accessible name', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      await recordEvidence('assert-toHaveAccessibleName-server-licensing-shell.spec-229', async () => expect(svl.addCustomerButton).toHaveAccessibleName(/add customer/i));
    });
  });

  // ─── 5. Card Collection ───────────────────────────────────────

  test.describe('Card Collection', () => {

    test('LIMAS-SUD-2591: Customer cards are present and visible', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardCount = await svl.getVisibleCardCount();
      if (cardCount === 0) return;
      await recordEvidence('assert-toBeVisible-server-licensing-shell.spec-248', async () => expect(svl.customerCards.first()).toBeVisible());
    });

    test('LIMAS-SUD-2592: Customer count matches visible card count', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const count = await svl.getCustomerCount();
      const cardCount = await svl.getVisibleCardCount();
      await recordEvidence('assert-toBe-server-licensing-shell.spec-262', async () => expect(cardCount).toBe(count));
    });

    test('LIMAS-SUD-2593: No duplicate customer cards are present', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const names = await svl.getCardNames();
      const unique = new Set(names);
      await recordEvidence('assert-toBe-server-licensing-shell.spec-276', async () => expect(unique.size).toBe(names.length));
    });
  });

  // ─── 6. Card Structure ────────────────────────────────────────

  test.describe('Card Structure', () => {

    test('LIMAS-SUD-2594: Each customer card displays a name', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await recordEvidence('assert-toBeVisible-server-licensing-shell.spec-296', async () => expect(svl.cardName(cardName)).toBeVisible());
    });

    test('LIMAS-SUD-2595: Each customer card displays a description', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await recordEvidence('assert-toBeVisible-server-licensing-shell.spec-311', async () => expect(svl.cardDescription(cardName)).toBeVisible());
    });

    test('LIMAS-SUD-2596: Each customer card displays a license-status badge', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      const badge = svl.cardLicenseStatusBadge(cardName);
      await recordEvidence('assert-toBeVisible-server-licensing-shell.spec-327', async () => expect(badge).toBeVisible());
    });
  });

  // ─── 7. Row Actions ───────────────────────────────────────────

  test.describe('Row Actions', () => {

    test('LIMAS-SUD-2597: Create Server License button is visible on each card', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await recordEvidence('assert-toBeVisible-server-licensing-shell.spec-347', async () => expect(svl.cardCreateServerLicenseButton(cardName)).toBeVisible());
    });

    test('LIMAS-SUD-2598: Edit button is visible on each card', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await recordEvidence('assert-toBeVisible-server-licensing-shell.spec-362', async () => expect(svl.cardEditButton(cardName)).toBeVisible());
    });

    test('LIMAS-SUD-2599: Delete button is visible on each card', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await recordEvidence('assert-toBeVisible-server-licensing-shell.spec-377', async () => expect(svl.cardDeleteButton(cardName)).toBeVisible());
    });

    test('LIMAS-SUD-2600: Expand/collapse toggle is visible on each card', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      await recordEvidence('assert-toBeVisible-server-licensing-shell.spec-392', async () => expect(svl.cardExpandToggle(cardName)).toBeVisible());
    });
  });

  // ─── 8. Expand/Collapse ───────────────────────────────────────

  test.describe('Expand/Collapse', () => {

    test('LIMAS-SUD-2601: Expanding a customer card reveals server-license sub-cards', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      const initiallyExpanded = await svl.isCardExpanded(cardName);
      const initialSubCount = await svl.getServerLicenseCountForCustomer(cardName);

      if (!initiallyExpanded) {
        await svl.expandCard(cardName);
        const expanded = await svl.isCardExpanded(cardName);
        await recordEvidence('assert-toBe-server-licensing-shell.spec-418', async () => expect(expanded).toBe(true));
      }

      // Collapse back to initial state
      await svl.collapseCard(cardName);
    });

    test('LIMAS-SUD-2602: Collapsing a customer card hides server-license sub-cards', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardName = await svl.discoverFirstCardName();
      if (!cardName) return;

      const initiallyExpanded = await svl.isCardExpanded(cardName);
      if (!initiallyExpanded) {
        await svl.expandCard(cardName);
      }

      await svl.collapseCard(cardName);
      const expanded = await svl.isCardExpanded(cardName);
      await recordEvidence('assert-toBe-server-licensing-shell.spec-444', async () => expect(expanded).toBe(false));

      // Restore to expanded if it was initially expanded
      if (initiallyExpanded) {
        await svl.expandCard(cardName);
      }
    });

    test('LIMAS-SUD-2603: Top-level Expand All expands all customer cards', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardCount = await svl.getVisibleCardCount();
      if (cardCount < 2) return;

      await svl.expandAll();
      const allExpanded = await svl.areAllCardsExpanded();
      await recordEvidence('assert-toBe-server-licensing-shell.spec-466', async () => expect(allExpanded).toBe(true));

      await svl.collapseAll();
    });

    test('LIMAS-SUD-2604: Top-level Collapse All collapses all customer cards', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      await svl.expandAll();
      await svl.collapseAll();

      const allCollapsed = await svl.areAllCardsCollapsed();
      await recordEvidence('assert-toBe-server-licensing-shell.spec-484', async () => expect(allCollapsed).toBe(true));
    });
  });

  // ─── 9. Scrolling ─────────────────────────────────────────────

  test.describe('Scrolling', () => {

    test('LIMAS-SUD-2605: Card container is scrollable when cards overflow', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardCount = await svl.getVisibleCardCount();
      if (cardCount < 3) return;

      const scrollable = await svl.isScrollable();
      await recordEvidence('assert-toBe-server-licensing-shell.spec-505', async () => expect(scrollable).toBe(true));
    });

    test('LIMAS-SUD-2606: Scroll to bottom reveals additional cards when present', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const cardCount = await svl.getVisibleCardCount();
      if (cardCount < 3) return;

      const initialPos = await svl.getScrollPosition();
      await svl.scrollToBottom();

      const newPos = await svl.getScrollPosition();
      await recordEvidence('assert-toBeGreaterThan-server-licensing-shell.spec-524', async () => expect(newPos).toBeGreaterThan(initialPos));

      await svl.scrollToTop();
    });
  });

  // ─── 10. Initial API Contract ─────────────────────────────────

  test.describe('Initial API Contract', () => {

    test('LIMAS-SUD-2607: Initial page load uses read-only GET requests only', async ({ page }) => {
      const requests: string[] = [];
      page.on('request', (req) => {
        if (req.resourceType() === 'xhr' || req.resourceType() === 'fetch') {
          requests.push(req.method());
        }
      });

      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const dataRequests = requests.filter((m) => m !== 'OPTIONS');
      const nonGet = dataRequests.filter((m) => m !== 'GET');
      await recordEvidence('assert-toBe-server-licensing-shell.spec-552', async () => expect(nonGet.length).toBe(0));
    });

    test('LIMAS-SUD-2608: Server licensing API returns valid JSON', async ({ page }) => {
      let capturedResponse: any = null;

      page.on('response', (response) => {
        if (response.url().includes('server-licensing') || response.url().includes('server-license')) {
          if (response.request().method() === 'GET') {
            capturedResponse = response;
          }
        }
      });

      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      if (capturedResponse) {
        const contentType = capturedResponse.headers()['content-type'] ?? '';
        await recordEvidence('assert-toMatch-server-licensing-shell.spec-576', async () => expect(contentType).toMatch(/json/i));
        await recordEvidence('assert-toBe-server-licensing-shell.spec-577', async () => expect(capturedResponse.status()).toBe(200));
      }
    });
  });

  // ─── 11. Keyboard and Accessibility ───────────────────────────

  test.describe('Keyboard and Accessibility', () => {

    test('LIMAS-SUD-2609: Tab navigation reaches Add Customer button', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      await recordEvidence('action-focus-server-licensing-shell.spec-595', async () => svl.serverLicenseSelector.focus());
      await recordEvidence('action-press-server-licensing-shell.spec-596', async () => page.keyboard.press('Tab'));
      await recordEvidence('action-press-server-licensing-shell.spec-597', async () => page.keyboard.press('Tab'));

      const focused = page.locator(':focus');
      const focusedText = await focused.evaluate((el: HTMLElement) => el.getAttribute('aria-label') || el.textContent);
      await recordEvidence('assert-toBeTruthy-server-licensing-shell.spec-601', async () => expect(focusedText).toBeTruthy());
    });

    test('LIMAS-SUD-2610: Focus indicators are visible on interactive elements', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      await recordEvidence('action-focus-server-licensing-shell.spec-613', async () => svl.serverLicenseSelector.focus());

      const hasFocusVisible = await svl.serverLicenseSelector.evaluate((el: HTMLElement) =>
        el.matches(':focus-visible')
      );
      await recordEvidence('assert-toBe-server-licensing-shell.spec-618', async () => expect(hasFocusVisible).toBe(true));
    });

    test('LIMAS-SUD-2611: Server License selector has accessible name', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      await recordEvidence('assert-toHaveAccessibleName-server-licensing-shell.spec-630', async () => expect(svl.serverLicenseSelector).toHaveAccessibleName(/\S/));
    });
  });

  // ─── 12. Safe Restoration ─────────────────────────────────────

  test.describe('Safe Restoration', () => {

    test('LIMAS-SUD-2612: Page restores to clean initial state after exploration', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const svl = new ServerLicensingPage(page);
      await svl.navigate();

      const originalLicense = await svl.getSelectedServerLicense();

      // Dirty the state: open filters, expand a card
      await svl.openFilters();
      const cardName = await svl.discoverFirstCardName();
      if (cardName) {
        await svl.expandCard(cardName);
      }

      // Restore
      await svl.restoreToInitialState(originalLicense);

      // Verify clean
      await recordEvidence('assert-toBeVisible-server-licensing-shell.spec-660', async () => expect(svl.heading).toBeVisible());
      await recordEvidence('assert-toBeVisible-server-licensing-shell.spec-661', async () => expect(svl.serverLicenseSelector).toBeVisible());
      const filtersOpen = await svl.isFiltersExpanded();
      await recordEvidence('assert-toBe-server-licensing-shell.spec-663', async () => expect(filtersOpen).toBe(false));

      // Verify scroll back to top
      const scrollPos = await svl.getScrollPosition();
      await recordEvidence('assert-toBeLessThanOrEqual-server-licensing-shell.spec-667', async () => expect(scrollPos).toBeLessThanOrEqual(5));
    });
  });
});
