import { expect, test } from '@playwright/test';
import { OwnedProfile } from './profile-crud';
import { captureEvidence } from './step-evidence';

/** Check the deployed integer-role workflow using only roles on an owned Profile. */
export async function verifyOwnedRoleBoundary(owned: OwnedProfile, mode: 'duplicate-name' | 'duplicate-value' | 'zero') {
  const p = owned.profiles;
  const created: { name: string; value: number; id: number }[] = [];
  const open = async () => {
    await owned.reloadRecords();
    await p.openManageDialog(owned.card(), owned.name);
    await p.manageDialogTabRoles.click();
  };
  const rowFor = (role: { name: string; value: number }) => p.manageRolesTable.locator('> div').filter({ has: p.page.getByText(role.name, { exact: true }) }).filter({ has: p.page.getByText(new RegExp(':\\s*' + role.value + String.fromCharCode(36))) });
  const add = async (name: string, value: number) => {
    await p.manageRolesAddButton.click();
    await p.addRoleNameInput.fill(name);
    await p.addRoleValueInput.fill(String(value));
    await captureEvidence('owned-role-boundary-before-save');
    const [response] = await Promise.all([
      p.page.waitForResponse(r => r.request().method() === 'POST' && new URL(r.url()).pathname.endsWith('/api/profilerole')),
      p.addRoleSaveButton.click(),
    ]);
    await test.info().attach('role-boundary-create-response', { contentType: 'application/json', body: JSON.stringify({ method: 'POST', path: '/api/profilerole', status: response.status(), ownedProfile: owned.name }) });
    await expect(p.addRoleDialog).toBeHidden();
    const rejectedVisibly = await p.page.getByRole('status').or(p.page.getByRole('alert')).filter({ hasText: /failed|error|duplicate|already/i }).count() > 0;
    const records = await owned.reloadRecords();
    const profile = records.find(record => String(record.id) === owned.id);
    const matches = (profile?.profileRoles || []).filter(role => role?.name === name && role?.value === value);
    if (matches.length === 1 && !created.some(role => role.id === matches[0].id)) {
      expect(response.ok(), 'Persisted creation must have a successful response').toBeTruthy();
      created.push({ name, value, id: matches[0].id });
    } else {
      expect(matches, 'An absent new role must not be reported as successful creation').toHaveLength(0);
      expect(rejectedVisibly, 'Rejected duplicate input must show an error instead of a success toast').toBe(true);
      expect(mode, 'Zero is a supported integer priority in the deployed form').not.toBe('zero');
    }
    await open();
    for (const role of created) await expect(rowFor(role), 'Each owned role must persist independently').toHaveCount(1);
    await captureEvidence('owned-role-boundary-persisted');
  };
  let failure: unknown;
  try {
    await open();
    const name = owned.name + '-role';
    if (mode === 'zero') await add(name, 0);
    else {
      await add(name, 10);
      await add(mode === 'duplicate-name' ? name : name + '-second', mode === 'duplicate-value' ? 10 : 20);
      expect(new Set(created.map(r => r.id)).size).toBe(created.length);
    }
  } catch (error) { failure = error; }
  const cleanupErrors: unknown[] = [];
  for (const role of [...created].reverse()) {
    try {
      await open();
      await expect(rowFor(role)).toHaveCount(1);
      await p.manageRolesRowDelete(rowFor(role)).click();
      const [response] = await Promise.all([
        p.page.waitForResponse(r => r.request().method() === 'DELETE' && new URL(r.url()).pathname.endsWith('/api/profilerole/' + role.id)),
        p.deleteConfirmDeleteButton.click(),
      ]);
      await owned.responseSummary('role-boundary-delete-response', response);
      await open();
      await expect(rowFor(role)).toHaveCount(0);
    } catch (error) { cleanupErrors.push(error); }
  }
  if (failure || cleanupErrors.length) throw new Error([failure, ...cleanupErrors].filter(Boolean).map(String).join('\n'));
}
