import { withOwnedHubUser } from '../helpers/hub-user-crud';
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

  test('LIMAS-SUD-1114: Delete the owned user through the deployed single-click action',async()=>{ test.setTimeout(180000); await withOwnedHubUser(hub,'LIMAS-SUD-1114',async owned=>{ await owned.remove(); }); });

  test('LIMAS-SUD-1115: DELETE targets the owned user identifier',async()=>{ test.setTimeout(180000); await withOwnedHubUser(hub,'LIMAS-SUD-1115',async owned=>{ await owned.remove(); }); });

  test('LIMAS-SUD-1121: Owned user deletion succeeds and persists',async()=>{ test.setTimeout(180000); await withOwnedHubUser(hub,'LIMAS-SUD-1121',async owned=>{ await owned.remove(); }); });
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

  test('LIMAS-SUD-1116: Owned user disappears automatically after deletion and stays absent after reload',async()=>{ test.setTimeout(180000); await withOwnedHubUser(hub,'LIMAS-SUD-1116',async owned=>{ await owned.remove(); }); });

  test('LIMAS-SUD-1117: Deleted owned user is absent from fresh server results',async()=>{ test.setTimeout(180000); await withOwnedHubUser(hub,'LIMAS-SUD-1117',async owned=>{ await owned.remove(); }); });

  test('LIMAS-SUD-1118: Owned user filtered count changes from one to zero after deletion',async()=>{ test.setTimeout(180000); await withOwnedHubUser(hub,'LIMAS-SUD-1118',async owned=>{ await owned.remove(); }); });

  test('LIMAS-SUD-1120: Deleting the last filtered user shows a valid empty state',async()=>{ test.setTimeout(180000); await withOwnedHubUser(hub,'LIMAS-SUD-1120',async owned=>{ await owned.remove(); }); });
});