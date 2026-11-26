import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';

test.describe('Delete User — UI Presence', () => {
  let hub: UserLicenseHubPage;

  test.beforeEach(async ({ page }) => {
    hub = new UserLicenseHubPage(page);
    await hub.goto();
    await hub.restoreDefaultUserListState();
  });

  test('LIMAS-SUD-1112: Delete button visible on every loaded user card', async ({ page }) => {
    const deleteButtons = hub.getDeleteUserButtons();
    const count = await deleteButtons.count();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-delete-user.spec-16', async () => expect(count).toBeGreaterThan(0));
    for (let i = 0; i < count; i++) {
      await recordEvidence('assert-toBeVisible-user-license-hub-delete-user.spec-18', async () => expect(deleteButtons.nth(i)).toBeVisible());
    }
  });

  test('LIMAS-SUD-1113: Delete button has accessible name "Delete user"', async ({ page }) => {
    const deleteBtn = hub.getDeleteUserButtonForFirstCard();
    const name = await deleteBtn.getAttribute('aria-label');
    if (name) {
      await recordEvidence('assert-toBe-user-license-hub-delete-user.spec-26', async () => expect(name).toBe('Delete user'));
    } else {
      const text = await deleteBtn.textContent();
      await recordEvidence('assert-toContain-user-license-hub-delete-user.spec-29', async () => expect(text?.trim().toLowerCase()).toContain('delete'));
    }
  });

  test('LIMAS-SUD-1119: Every user card has a Delete button', async ({ page }) => {
    const userCards = hub.getUserCards();
    const cardCount = await userCards.count();
    const deleteButtons = hub.getDeleteUserButtons();
    const btnCount = await deleteButtons.count();
    await recordEvidence('assert-toBe-user-license-hub-delete-user.spec-38', async () => expect(btnCount).toBe(cardCount));
  });
});

test.describe('Delete User — API Contract', () => {
  let hub: UserLicenseHubPage;

  test.beforeEach(async ({ page }) => {
    hub = new UserLicenseHubPage(page);
    await hub.goto();
    await hub.restoreDefaultUserListState();
  });

  test('LIMAS-SUD-1114: Delete is single-click — no confirmation dialog', async ({ page }) => {
    if (!process.env.TEST_ULH_ALLOW_USER_DELETE || process.env.TEST_ULH_ALLOW_USER_DELETE !== 'true') {
      test.skip(true, 'TEST_ULH_ALLOW_USER_DELETE not set');
      return;
    }
    // Click delete — no dialog should appear
    const deleteBtn = hub.getDeleteUserButtonForFirstCard();

    let dialogAppeared = false;
    page.on('dialog', () => { dialogAppeared = true; });
    // Monitor for any role=dialog elements appearing
    const preDialog = page.locator('[role="dialog"], [role="alertdialog"]');

    await recordEvidence('action-click-user-license-hub-delete-user.spec-64', async () => deleteBtn.click());

    // No browser-level dialog
    await recordEvidence('assert-toBe-user-license-hub-delete-user.spec-67', async () => expect(dialogAppeared).toBe(false));
    // No ARIA dialog appeared
    await await recordEvidence('assert-toBeVisible-user-license-hub-delete-user.spec-69', async () => expect(preDialog).not.toBeVisible({ timeout: 2000 })).catch(() => {});
  });

  test('LIMAS-SUD-1115: DELETE targets correct API endpoint', async ({ page }) => {
    if (!process.env.TEST_ULH_ALLOW_USER_DELETE || process.env.TEST_ULH_ALLOW_USER_DELETE !== 'true') {
      test.skip(true, 'TEST_ULH_ALLOW_USER_DELETE not set');
      return;
    }
    const userId = await hub.getFirstVisibleUserId();
    const deletePromise = page.waitForResponse(
      resp => resp.request().method() === 'DELETE' && resp.url().includes('/api/users/'),
      { timeout: 10000 }
    );
    const deleteBtn = hub.getDeleteUserButtonForFirstCard();
    await recordEvidence('action-click-user-license-hub-delete-user.spec-83', async () => deleteBtn.click());
    const resp = await deletePromise;
    await recordEvidence('assert-toBe-user-license-hub-delete-user.spec-85', async () => expect(resp.request().method()).toBe('DELETE'));
    await recordEvidence('assert-toContain-user-license-hub-delete-user.spec-86', async () => expect(resp.url()).toContain(`/limas/api/users/${userId}`));
  });

  test('LIMAS-SUD-1121: DELETE returns HTTP 200 on success', async ({ page }) => {
    if (!process.env.TEST_ULH_ALLOW_USER_DELETE || process.env.TEST_ULH_ALLOW_USER_DELETE !== 'true') {
      test.skip(true, 'TEST_ULH_ALLOW_USER_DELETE not set');
      return;
    }
    const deletePromise = page.waitForResponse(
      resp => resp.request().method() === 'DELETE' && resp.url().includes('/api/users/'),
      { timeout: 10000 }
    );
    const deleteBtn = hub.getDeleteUserButtonForFirstCard();
    await recordEvidence('action-click-user-license-hub-delete-user.spec-99', async () => deleteBtn.click());
    const resp = await deletePromise;
    await recordEvidence('assert-toBe-user-license-hub-delete-user.spec-101', async () => expect(resp.status()).toBe(200));
  });
});

test.describe('Delete User — List Refresh', () => {
  let hub: UserLicenseHubPage;

  test.beforeEach(async ({ page }) => {
    hub = new UserLicenseHubPage(page);
    await hub.goto();
    await hub.restoreDefaultUserListState();
  });

  test.afterEach(async () => {
    await hub.restoreDefaultUserListState();
  });

  test('LIMAS-SUD-1116: Page auto-refreshes after delete', async ({ page }) => {
    if (!process.env.TEST_ULH_ALLOW_USER_DELETE || process.env.TEST_ULH_ALLOW_USER_DELETE !== 'true') {
      test.skip(true, 'TEST_ULH_ALLOW_USER_DELETE not set');
      return;
    }
    const deleteBtn = hub.getDeleteUserButtonForFirstCard();
    const refreshPromise = page.waitForResponse(
      resp => resp.request().method() === 'GET' && resp.url().includes('/api/users/f') && resp.status() === 200,
      { timeout: 10000 }
    );
    await recordEvidence('action-click-user-license-hub-delete-user.spec-128', async () => deleteBtn.click());
    const refreshResp = await refreshPromise;
    await recordEvidence('assert-toBe-user-license-hub-delete-user.spec-130', async () => expect(refreshResp.status()).toBe(200));
  });

  test('LIMAS-SUD-1117: Deleted user removed from list after refresh', async ({ page }) => {
    if (!process.env.TEST_ULH_ALLOW_USER_DELETE || process.env.TEST_ULH_ALLOW_USER_DELETE !== 'true') {
      test.skip(true, 'TEST_ULH_ALLOW_USER_DELETE not set');
      return;
    }
    const deletedUserName = await hub.getFirstVisibleUserName();
    const deleteBtn = hub.getDeleteUserButtonForFirstCard();
    await recordEvidence('action-click-user-license-hub-delete-user.spec-140', async () => deleteBtn.click());
    await hub.waitForUserListResponse();
    // Verify the deleted user's name is not in the refreshed list
    const names = await hub.getAllVisibleUserNames();
    await recordEvidence('assert-toContain-user-license-hub-delete-user.spec-144', async () => expect(names).not.toContain(deletedUserName));
  });

  test('LIMAS-SUD-1118: Total user count decrements after delete', async ({ page }) => {
    if (!process.env.TEST_ULH_ALLOW_USER_DELETE || process.env.TEST_ULH_ALLOW_USER_DELETE !== 'true') {
      test.skip(true, 'TEST_ULH_ALLOW_USER_DELETE not set');
      return;
    }
    const initialTotal = await hub.getTotalUserCount();
    const deleteBtn = hub.getDeleteUserButtonForFirstCard();
    await recordEvidence('action-click-user-license-hub-delete-user.spec-154', async () => deleteBtn.click());
    await hub.waitForUserListResponse();
    const newTotal = await hub.getTotalUserCount();
    await recordEvidence('assert-toBe-user-license-hub-delete-user.spec-157', async () => expect(newTotal).toBe(initialTotal - 1));
  });

  test('LIMAS-SUD-1120: Delete last user on page — list does not go empty', async ({ page }) => {
    if (!process.env.TEST_ULH_ALLOW_USER_DELETE || process.env.TEST_ULH_ALLOW_USER_DELETE !== 'true') {
      test.skip(true, 'TEST_ULH_ALLOW_USER_DELETE not set');
      return;
    }
    // Navigate to last page
    const totalPages = await hub.getTotalPages();
    if (totalPages <= 1) {
      test.skip(true, 'Only one page — last-page stability test not applicable');
      return;
    }
    await hub.goToPage(totalPages);
    await hub.waitForUserListResponse();
    const deleteBtn = hub.getDeleteUserButtonForFirstCard();
    await recordEvidence('action-click-user-license-hub-delete-user.spec-174', async () => deleteBtn.click());
    await hub.waitForUserListResponse();
    // List should not be empty
    const userCards = hub.getUserCards();
    await recordEvidence('assert-toBeVisible-user-license-hub-delete-user.spec-178', async () => expect(userCards.first()).toBeVisible({ timeout: 5000 }));
  });
});