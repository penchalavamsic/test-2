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

  test('LIMAS-SUD-944: User card has expected structural elements', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    const firstCard = hub.userCards.first();
    await recordEvidence('assert-toBeVisible-user-license-hub-user-list.spec-34', async () => expect(firstCard).toBeVisible());

    const nameHeading = firstCard.locator('h3');
    await recordEvidence('assert-toBeVisible-user-license-hub-user-list.spec-37', async () => expect(nameHeading).toBeVisible());
    const nameText = await nameHeading.textContent();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-user-list.spec-39', async () => expect(nameText?.trim().length).toBeGreaterThan(0));

    const paragraphs = firstCard.locator('p');
    const paraCount = await paragraphs.count();
    await recordEvidence('assert-toBeGreaterThanOrEqual-user-license-hub-user-list.spec-43', async () => expect(paraCount).toBeGreaterThanOrEqual(2));

    const licenseBadge = firstCard.getByText(/\d+\s*Licenses?\b/i);
    await recordEvidence('assert-toBeVisible-user-license-hub-user-list.spec-46', async () => expect(licenseBadge).toBeVisible());

    const editBtn = firstCard.getByRole('button', { name: /Edit/i });
    await recordEvidence('assert-toBeVisible-user-license-hub-user-list.spec-49', async () => expect(editBtn).toBeVisible());

    const deleteBtn = firstCard.getByRole('button', { name: /Delete/i });
    await recordEvidence('assert-toBeVisible-user-license-hub-user-list.spec-52', async () => expect(deleteBtn).toBeVisible());
  });

  test('LIMAS-SUD-945: User cards have cursor pointer', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    const firstCard = hub.userCards.first();
    const cursor = await firstCard.evaluate((el) => getComputedStyle(el).cursor);
    await recordEvidence('assert-toBe-user-license-hub-user-list.spec-59', async () => expect(cursor).toBe('pointer'));
  });

  test('LIMAS-SUD-946: First user is auto-selected on load', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await recordEvidence('assert-first-user-auto-selected', async () => expect.poll(() => hub.getSelectedUserCardIndex()).toBe(0));
    const licenseCount = await hub.getVisibleLicenseCount();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-user-list.spec-65', async () => expect(licenseCount).toBeGreaterThan(0));
  });
});