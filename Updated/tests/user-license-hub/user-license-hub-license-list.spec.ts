import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';

const PROFILE = resolveProfileName();

test.describe('User & License Hub — License List', () => {
  test.beforeEach(async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const hub = new UserLicenseHubPage(page);
    await hub.openUserLicenseHub();
    await hub.waitForHubLoad();
  });

  test('LIMAS-SUD-964: License cards are present for selected user', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    const count = await hub.getVisibleLicenseCount();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-license-list.spec-22', async () => expect(count).toBeGreaterThan(0));
  });

  test('LIMAS-SUD-965: License card has all expected fields', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    const firstCard = hub.licenseCards.first();
    await recordEvidence('assert-toBeVisible-user-license-hub-license-list.spec-28', async () => expect(firstCard).toBeVisible());

    await recordEvidence('assert-toBeVisible-user-license-hub-license-list.spec-30', async () => expect(firstCard.getByText('Profile')).toBeVisible());
    await recordEvidence('assert-toBeVisible-user-license-hub-license-list.spec-31', async () => expect(firstCard.getByText('Role')).toBeVisible());
    await recordEvidence('assert-toBeVisible-user-license-hub-license-list.spec-32', async () => expect(firstCard.getByText('Maintenance')).toBeVisible());
    await recordEvidence('assert-toBeVisible-user-license-hub-license-list.spec-33', async () => expect(firstCard.getByText('Expiration')).toBeVisible());
    await recordEvidence('assert-toBeVisible-user-license-hub-license-list.spec-34', async () => expect(firstCard.getByText('Hardware ID')).toBeVisible());
    await recordEvidence('assert-toBeVisible-user-license-hub-license-list.spec-35', async () => expect(firstCard.getByText(/Assigned to/)).toBeVisible());
  });

  test('LIMAS-SUD-966: License card has Edit and Delete buttons', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    const firstCard = hub.licenseCards.first();
    await recordEvidence('assert-toBeVisible-user-license-hub-license-list.spec-41', async () => expect(firstCard).toBeVisible());

    const editBtn = firstCard.getByRole('button', { name: /Edit/i });
    await recordEvidence('assert-toBeVisible-user-license-hub-license-list.spec-44', async () => expect(editBtn).toBeVisible());

    const deleteBtn = firstCard.getByRole('button', { name: /Delete/i });
    await recordEvidence('assert-toBeVisible-user-license-hub-license-list.spec-47', async () => expect(deleteBtn).toBeVisible());
  });

  test('LIMAS-SUD-967: Maintenance and Expiration dates use yyyy-mm-dd format', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    const firstCard = hub.licenseCards.first();
    await recordEvidence('assert-toBeVisible-user-license-hub-license-list.spec-53', async () => expect(firstCard).toBeVisible());

    const cardText = await firstCard.textContent();
    const datePattern = /\d{4}-\d{2}-\d{2}/g;
    const dates = cardText?.match(datePattern) ?? [];
    await recordEvidence('assert-toBeGreaterThanOrEqual-user-license-hub-license-list.spec-58', async () => expect(dates.length).toBeGreaterThanOrEqual(2));
  });

  test('LIMAS-SUD-968: License cards panel is scrollable', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    const overflowY = await hub.licensePanel.evaluate((el) => getComputedStyle(el).overflowY);
    await recordEvidence('assert-toContain-user-license-hub-license-list.spec-64', async () => expect(['auto', 'scroll']).toContain(overflowY));
  });
});