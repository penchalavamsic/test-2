import { randomUUID } from 'crypto';
import { expect, test, type Locator } from '@playwright/test';
import { UserGroupsPage } from '../pages/user-groups.page';
import { captureEvidence, recordEvidence } from './step-evidence';

/** Real UI CRUD on records created by this test only. No existing group is deleted. */
export async function exerciseUserGroupCrud(groups: UserGroupsPage, mode: 'create' | 'subgroup' | 'edit' | 'delete', use?: (groupName: string) => Promise<void>): Promise<void> {
  const page = groups.page;
  const prefix = `LIMAS-AUTO-${test.info().title.match(/LIMAS-SUD-(\d+)/)?.[1]}-${randomUUID().slice(0, 8)}`;
  const owned = new Set<string>();
  const errors: unknown[] = [];
  const deleteAttempted = new Set<string>();
  const comment = `Automation fixture ${prefix}`;
  const row = (name: string) => groups.rowByName(name);
  async function refresh() {
    const [response] = await Promise.all([
      page.waitForResponse(r => new URL(r.url()).pathname.includes('/api/usergroups') && r.request().method() === 'GET'),
      groups.navigate(),
    ]);
    expect(response.ok(), `Reload user groups returned HTTP ${response.status()}`).toBe(true);
    await groups.expandAll();
  }
  async function submit(button: Locator, methods: string[], label: string) {
    await captureEvidence(`${label}-before-submit`);
    await recordEvidence(label, async () => {
      const [response] = await Promise.all([
        page.waitForResponse(r => new URL(r.url()).pathname.includes('/api/usergroups') && methods.includes(r.request().method())),
        button.click(),
      ]);
      await test.info().attach(`${label}-response`, { contentType: 'application/json', body: JSON.stringify({method:response.request().method(),endpoint:new URL(response.url()).pathname,status:response.status()}) });
      expect(response.ok(), `${label} returned HTTP ${response.status()}; do not retry the mutation automatically`).toBe(true);
    });
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(page.getByRole('alertdialog')).toHaveCount(0);
  }
  async function create(name: string, parent?: string) {
    expect(name.startsWith(prefix)).toBe(true);
    owned.add(name);
    if (parent) {
      await groups.openAddSubgroupDialog(row(parent));
      await groups.addSubgroupNameInput.fill(name);
      await groups.addSubgroupCommentInput.fill(comment);
      await submit(groups.addSubgroupSaveButton, ['POST'], 'create-subgroup');
    } else {
      await groups.openAddGroupDialog();
      await groups.addGroupNameInput.fill(name);
      await groups.addGroupCommentInput.fill(comment);
      await submit(groups.addGroupSaveButton, ['POST'], 'create-group');
    }
    await refresh();
    await expect(row(name)).toHaveCount(1);
    await expect(row(name)).toBeVisible();
    await captureEvidence('created-group-persists-after-reload');
  }
  async function remove(name: string) {
    if (!owned.has(name) || !name.startsWith(prefix)) throw new Error('Refusing to delete a group not owned by this test');
    await refresh();
    if (await row(name).count() === 0) return;
    await expect(row(name)).toHaveCount(1);
    if (deleteAttempted.has(name)) return; // Retain the first deletion failure; never resubmit it in cleanup.
    await groups.openDeleteDialog(row(name));
    deleteAttempted.add(name);
    await submit(groups.deleteConfirmButton, ['DELETE'], 'delete-owned-group');
    await refresh();
    await expect(row(name)).toHaveCount(0);
    await captureEvidence('deleted-group-absent-after-reload');
  }
  try {
    await create(prefix);
    if (use) {
      await use(prefix);
    } else if (mode === 'subgroup') {
      const child = `${prefix}-child`;
      await create(child, prefix);
      const parentIndent = await groups.getRowIndentation(row(prefix));
      const childIndent = await groups.getRowIndentation(row(child));
      expect(parseFloat(childIndent), 'The child must be nested below its own parent').toBeGreaterThan(parseFloat(parentIndent));
      await remove(child);
    } else if (mode === 'edit') {
      const renamed = `${prefix}-edited`;
      owned.add(renamed);
      await groups.openEditDialog(row(prefix));
      await expect(groups.editCommentInput).toHaveValue(comment);
      await groups.editNameInput.fill(renamed);
      await groups.editCommentInput.fill(`${comment} edited`);
      await submit(groups.editSaveButton, ['PUT', 'PATCH'], 'update-owned-group');
      await refresh();
      await expect(row(prefix)).toHaveCount(0);
      await expect(row(renamed)).toHaveCount(1);
      await groups.openEditDialog(row(renamed));
      await expect(groups.editNameInput).toHaveValue(renamed);
      await expect(groups.editCommentInput).toHaveValue(`${comment} edited`);
      await captureEvidence('updated-fields-persist-after-reload');
      await groups.dismissEditDialog();
    } else if (mode === 'delete') {
      await remove(prefix);
    } else {
      await groups.openEditDialog(row(prefix));
      await expect(groups.editNameInput).toHaveValue(prefix);
      await expect(groups.editCommentInput).toHaveValue(comment);
      await groups.dismissEditDialog();
    }
  } catch (error) { errors.push(error); }
  finally {
    // Reload dismisses an unsaved dialog and checks for partial writes after an error.
    for (const name of [...owned].reverse()) {
      try { await remove(name); } catch (error) { errors.push(error); }
    }
  }
  if (errors.length === 1) throw errors[0];
  if (errors.length > 1) throw new Error(errors.map(e => e instanceof Error ? e.message : String(e)).join('\n'));
}
