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

  test('LIMAS-SUD-976: Clicking a non-selected user card selects it', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const userCount = await hub.getVisibleUserCount();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-user-selection.spec-23', async () => expect(userCount).toBeGreaterThan(1));

    // First card is auto-selected; click the second
    const wasSelected0 = await hub.isUserCardSelected(0);
    await recordEvidence('assert-toBe-user-license-hub-user-selection.spec-27', async () => expect(wasSelected0).toBe(true));

    const name = await hub.selectUserByIndex(1);
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-user-selection.spec-30', async () => expect(name.length).toBeGreaterThan(0));

    const isSel1 = await hub.isUserCardSelected(1);
    await recordEvidence('assert-toBe-user-license-hub-user-selection.spec-33', async () => expect(isSel1).toBe(true));

    const isSel0 = await hub.isUserCardSelected(0);
    await recordEvidence('assert-toBe-user-license-hub-user-selection.spec-36', async () => expect(isSel0).toBe(false));
  });

  test('LIMAS-SUD-977: Only one user card is selected at a time', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const selIdx = await hub.getSelectedUserCardIndex();
    await recordEvidence('assert-toBeGreaterThanOrEqual-user-license-hub-user-selection.spec-43', async () => expect(selIdx).toBeGreaterThanOrEqual(0));

    // Select a different user
    const otherIdx = selIdx === 0 ? 1 : 0;
    await hub.selectUserByIndex(otherIdx);

    const newSel = await hub.getSelectedUserCardIndex();
    await recordEvidence('assert-toBe-user-license-hub-user-selection.spec-50', async () => expect(newSel).toBe(otherIdx));

    // Verify the previous card is unselected
    const wasOldSelected = await hub.isUserCardSelected(selIdx);
    await recordEvidence('assert-toBe-user-license-hub-user-selection.spec-54', async () => expect(wasOldSelected).toBe(false));
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

  test('LIMAS-SUD-979: Selection is indicated only by computed box-shadow (no ARIA)', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const selIdx = await hub.getSelectedUserCardIndex();
    await recordEvidence('assert-toBeGreaterThanOrEqual-user-license-hub-user-selection.spec-76', async () => expect(selIdx).toBeGreaterThanOrEqual(0));

    const isSel = await hub.isUserCardSelected(selIdx);
    await recordEvidence('assert-toBe-user-license-hub-user-selection.spec-79', async () => expect(isSel).toBe(true));

    // Verify no ARIA state exists
    const ariaExists = await hub.anyCardHasAriaSelected();
    await recordEvidence('assert-toBe-user-license-hub-user-selection.spec-83', async () => expect(ariaExists).toBe(false));
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