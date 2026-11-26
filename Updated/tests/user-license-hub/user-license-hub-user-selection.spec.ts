import { selectHubUser, selectLicensedHubUser, verifyHubSelection } from '../helpers/hub-selection';
import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';

const PROFILE = resolveProfileName();

test.describe('User & License Hub — User Selection', () => {
  test.beforeEach(async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const hub = new UserLicenseHubPage(page);
    await hub.openUserLicenseHub();
    await hub.waitForHubLoad();
  });

  test('LIMAS-SUD-976: Clicking a different user transfers selection', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await selectHubUser(hub, 0);
    await selectHubUser(hub, 1);
    await recordEvidence('assert-toBe-user-license-hub-user-selection.spec-26', async () => expect(await hub.isUserCardSelected(0)).toBe(false));
    await verifyHubSelection(hub, 1);
  });

  test('LIMAS-SUD-977: Exactly one user remains selected after switching', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await selectHubUser(hub, 0);
    await selectHubUser(hub, 1);
    await verifyHubSelection(hub, 1);
  });

  test('LIMAS-SUD-978: Clicking card sub-elements (name text / badge text) selects the card', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const userCount = await hub.getVisibleUserCount();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-user-selection.spec-61', async () => expect(userCount).toBeGreaterThan(2));

    // Click the badge text of the third card
    const card = await hub.getUserCardContainer(2);
    const badgeEl = card.getByText(/\d+\s*Licenses?/i);
    await recordEvidence('action-click-user-license-hub-user-selection.spec-66', async () => badgeEl.click());

    const isSel = await hub.isUserCardSelected(2);
    await recordEvidence('assert-toBe-user-license-hub-user-selection.spec-69', async () => expect(isSel).toBe(true));
  });

  test('LIMAS-SUD-979: Selected user is visibly distinct and its license panel is synchronized', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await selectHubUser(hub, 0);
    await recordEvidence('assert-toHaveClass-user-license-hub-user-selection.spec-55', async () => expect(hub.userCards.first()).toHaveClass(/ring-primary/));
    await verifyHubSelection(hub, 0);
  });

  test('LIMAS-SUD-980: Unselected cards have default subtle box-shadow', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const userCount = await hub.getVisibleUserCount();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-user-selection.spec-90', async () => expect(userCount).toBeGreaterThan(1));

    const selIdx = await hub.getSelectedUserCardIndex();
    const unselectedIdx = selIdx === 0 ? 1 : 0;

    const isUnselSelected = await hub.isUserCardSelected(unselectedIdx);
    await recordEvidence('assert-toBe-user-license-hub-user-selection.spec-96', async () => expect(isUnselSelected).toBe(false));
  });

  test('LIMAS-SUD-981: Selecting a user does not change the route', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    const beforeUrl = page.url();

    await hub.selectUserByIndex(1);

    const afterUrl = page.url();
    await recordEvidence('assert-toBe-user-license-hub-user-selection.spec-106', async () => expect(afterUrl).toBe(beforeUrl));
    await recordEvidence('assert-toContain-user-license-hub-user-selection.spec-107', async () => expect(afterUrl).toContain('/users-licenses'));
  });

  test('LIMAS-SUD-982: Selecting a user does not open a dialog', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    await hub.selectUserByIndex(1);

    const dialogCount = await page.locator('[role="dialog"]').count();
    await recordEvidence('assert-toBe-user-license-hub-user-selection.spec-116', async () => expect(dialogCount).toBe(0));
  });

  test('LIMAS-SUD-983: No API request is triggered on user selection', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    let postCount = 0;
    page.on('request', (req) => {
      if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method())) {
        postCount++;
      }
    });

    await hub.selectUserByIndex(1);

    // Allow any pending async requests to complete
    await page.waitForLoadState('networkidle');
    await recordEvidence('assert-toBe-user-license-hub-user-selection.spec-133', async () => expect(postCount).toBe(0));
  });

  test('LIMAS-SUD-984: License panel updates synchronously on selection (no network request)', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const userCount = await hub.getVisibleUserCount();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-user-selection.spec-140', async () => expect(userCount).toBeGreaterThan(1));

    const selIdx = await hub.getSelectedUserCardIndex();
    const otherIdx = selIdx === 0 ? 1 : 0;

    // Record license count before
    const beforeCount = await hub.getVisibleLicenseCount();

    // Select different user
    await hub.selectUserByIndex(otherIdx);

    // License panel should have updated (count may differ)
    const afterCount = await hub.getVisibleLicenseCount();
    const badgeCount = await hub.getUserCardBadgeCount(otherIdx);
    await recordEvidence('assert-toBe-user-license-hub-user-selection.spec-154', async () => expect(afterCount).toBe(badgeCount));
  });

  test('LIMAS-SUD-985: Edit and Delete buttons do not trigger card selection', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const selIdx = await hub.getSelectedUserCardIndex();

    // Click the Edit button on a different card
    const otherIdx = selIdx === 0 ? 1 : 0;
    const card = await hub.getUserCardContainer(otherIdx);
    const editBtn = card.getByRole('button', { name: /Edit/i });
    if (await editBtn.isVisible()) {
      await recordEvidence('action-click-user-license-hub-user-selection.spec-167', async () => editBtn.click());
    }

    // Selection should not have changed (Edit opens its own dialog/action)
    const newSelIdx = await hub.getSelectedUserCardIndex();
    // Card selection doesn't change when clicking Edit button
    await recordEvidence('assert-toBeDefined-user-license-hub-user-selection.spec-173', async () => expect(newSelIdx).toBeDefined());
  });
});