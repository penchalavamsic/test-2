import { selectHubUser, selectLicensedHubUser, verifyHubSelection } from '../helpers/hub-selection';
import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';

const PROFILE = resolveProfileName();

test.describe('User & License Hub — User List', () => {
  test.beforeEach(async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const hub = new UserLicenseHubPage(page);
    await hub.openUserLicenseHub();
    await hub.waitForHubLoad();
  });

  test('LIMAS-SUD-942: User list container renders user cards', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    const count = await hub.getVisibleUserCount();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-user-list.spec-22', async () => expect(count).toBeGreaterThan(0));
  });

  test('LIMAS-SUD-943: User list panel is scrollable', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    const overflowY = await hub.userPanel.evaluate((el) => getComputedStyle(el).overflowY);
    await recordEvidence('assert-toContain-user-license-hub-user-list.spec-28', async () => expect(['auto', 'scroll']).toContain(overflowY));
  });

  test('LIMAS-SUD-944: User card shows its identity, group, license count, and working Edit action', async ({ page }) => { const hub = new UserLicenseHubPage(page); test.skip(await hub.userCards.count()===0, 'No runtime users available; reevaluated each run.'); const card=hub.userCards.first(); await recordEvidence('assert-toHaveText-user-license-hub-user-list.spec-34', async () => expect(card.locator('h3')).not.toHaveText('')); await recordEvidence('assert-toContainText-user-license-hub-user-list.spec-34', async () => expect(card.locator('p').first()).toContainText('@')); await recordEvidence('assert-toBeVisible-user-license-hub-user-list.spec-34', async () => expect(card.getByText(/^Group:/)).toBeVisible()); await recordEvidence('assert-toBeVisible-user-license-hub-user-list.spec-34', async () => expect(card.getByText(/\d+\s+Licenses?$/)).toBeVisible()); await recordEvidence('assert-toBeVisible-user-license-hub-user-list.spec-34', async () => expect(card.getByRole('button',{name:'Delete user',exact:true})).toBeVisible()); await recordEvidence('action-click-user-license-hub-user-list.spec-34', async () => card.locator('button').first().click()); await recordEvidence('assert-toBeVisible-user-license-hub-user-list.spec-34', async () => expect(hub.getEditUserDialog()).toBeVisible()); await hub.closeEditUserDialog(); });

  test('LIMAS-SUD-945: User cards have cursor pointer', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    const firstCard = hub.userCards.first();
    const cursor = await firstCard.evaluate((el) => getComputedStyle(el).cursor);
    await recordEvidence('assert-toBe-user-license-hub-user-list.spec-59', async () => expect(cursor).toBe('pointer'));
  });

  test('LIMAS-SUD-946: Initial load has no selected user until a card is chosen', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await recordEvidence('assert-toBe-user-license-hub-user-list.spec-45', async () => expect(await hub.getSelectedUserCardIndex()).toBe(-1));
    let total = 0;
    for (let index = 0; index < await hub.getVisibleUserCount(); index++) total += await hub.getUserCardBadgeCount(index);
    await recordEvidence('assert-toHaveCount-user-license-hub-user-list.spec-48', async () => expect(hub.licenseCards, 'Initial panel shows licenses for the loaded users before narrowing selection').toHaveCount(total));
    await selectHubUser(hub, 0);
    await verifyHubSelection(hub, 0);
  });
});