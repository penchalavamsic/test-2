import { expect, test } from '@playwright/test';
import { SystemUsersPage } from '../pages/system-users.page';
import { UserGroupsPage } from '../pages/user-groups.page';
import { exerciseUserGroupCrud } from './user-group-crud';
import { captureEvidence } from './step-evidence';

/** Saves a temporary empty-group assignment on a designated test user, then restores it. */
export async function exerciseSystemUserAssignments(users: SystemUsersPage): Promise<void> {
  const name = process.env.TEST_SYSTEM_USER_NAME || 'Test User';
  const email = process.env.TEST_SYSTEM_USER_EMAIL;
  const target = () => email ? users.rowByEmail(email) : users.rowByName(name);
  async function locateTarget() {
    await users.waitForTableStable();
    await users.search(email || name); // Search all runtime records, including virtualized/off-screen rows.
    await expect.poll(async () => (await target().count()) > 0 || (await users.getVisibleCount()) === 0,
      {message:'Wait for the designated-user search to return a matching row or empty results'}).toBe(true);
  }
  await locateTarget();
  test.skip(await target().count() === 0, 'The designated disposable system user is absent from runtime data. Configure TEST_SYSTEM_USER_NAME or TEST_SYSTEM_USER_EMAIL when it becomes available.');
  await expect(target(), 'The designated test user must be unique').toHaveCount(1);
  const groups = new UserGroupsPage(users.page);
  await groups.navigate();
  await exerciseUserGroupCrud(groups, 'create', async groupName => {
    const page = users.page;
    const errors: unknown[] = [];
    let originalGroups: string[] = [];
    let originalProfiles: string[] = [];
    let captured = false;
    let submitted = false;
    async function reopen() {
      await users.navigate();
      await locateTarget();
      await expect(target()).toHaveCount(1);
      await users.openEditAssignments(target());
    }
    async function save(label: string) {
      await captureEvidence(`${label}-before-save`);
      const [response] = await Promise.all([
        page.waitForResponse(r => /\/api\/sysusers(?:\/|$)/.test(new URL(r.url()).pathname) && ['PUT','PATCH','POST'].includes(r.request().method())),
        users.editAssignmentsUpdateButton.click(),
      ]);
      await test.info().attach(`${label}-response`, {contentType:'application/json', body:JSON.stringify({method:response.request().method(),endpoint:new URL(response.url()).pathname,status:response.status()})});
      expect(response.ok(), `${label} returned HTTP ${response.status()}`).toBe(true);
      await expect(users.editAssignmentsDialog).toBeHidden();
    }
    try {
      await reopen();
      originalGroups = await users.getDialogUserGroupChipNames();
      originalProfiles = await users.getDialogProfileChipNames();
      captured = true;
      await users.openUserGroupsSelection();
      await users.selectOptionInDialog(groupName);
      await users.doneSelection();
      expect(await users.getDialogUserGroupChipNames()).toEqual(expect.arrayContaining([...originalGroups,groupName]));
      submitted = true;
      await save('save-temporary-assignment');
      await reopen();
      expect((await users.getDialogUserGroupChipNames()).sort()).toEqual([...originalGroups,groupName].sort());
      expect((await users.getDialogProfileChipNames()).sort()).toEqual([...originalProfiles].sort());
      await captureEvidence('assignment-persists-after-reload');
    } catch (error) { errors.push(error); }
    finally {
      if (captured && submitted) {
        try {
          await reopen();
          const current = await users.getDialogUserGroupChipNames();
          // Remove only our new group; never overwrite another concurrent user's edits.
          if (current.includes(groupName)) {
            await users.openUserGroupsSelection();
            await users.selectOptionInDialog(groupName);
            await users.doneSelection();
            await save('restore-original-assignment');
          }
          await reopen();
          expect((await users.getDialogUserGroupChipNames()).sort()).toEqual([...originalGroups].sort());
          expect((await users.getDialogProfileChipNames()).sort()).toEqual([...originalProfiles].sort());
          await captureEvidence('original-assignments-restored');
          await users.cancelEditAssignments();
        } catch (error) { errors.push(error); }
      }
    }
    if (errors.length) throw new Error(errors.map(e => e instanceof Error ? e.message : String(e)).join('\n'));
  });
}
