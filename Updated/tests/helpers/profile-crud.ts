import { freshNavigationJson } from './fresh-navigation-json';
import { randomUUID } from 'crypto';
import { expect, test, type Response } from '@playwright/test';
import { ProfilesPage } from '../pages/profiles.page';
import { captureEvidence } from './step-evidence';

type ProfileRecord = { id: string | number; name: string; description?: string; uuid?: string; enabled?: boolean; profileRoles?: any[] };

/** Owns only the uniquely named record created during this test. Mutations are never retried. */
export class OwnedProfile {
  name: string;
  description: string;
  id?: string;
  private createAttempted = false;
  private deleteAttempted = false;
  private names = new Set<string>();
  constructor(readonly profiles: ProfilesPage, caseId: string, description?: string) {
    this.name = `LIMAS-AUTO-${caseId.replace('LIMAS-SUD-', '')}-${randomUUID().slice(0, 8)}`;
    this.description = description ?? `Disposable profile for ${caseId}`;
    this.names.add(this.name);
  }
  card() {
    return this.profiles.profileCards.filter({ has: this.profiles.page.getByRole('heading', { name: this.name, exact: true }) });
  }
  async responseSummary(label: string, response: Response) {
    await test.info().attach(label, { contentType: 'application/json', body: JSON.stringify({
      method: response.request().method(), path: new URL(response.url()).pathname,
      status: response.status(), ownedProfile: this.name,
    }, null, 2) });
    expect(response.ok(), `${label}: HTTP ${response.status()}`).toBeTruthy();
  }
  async reloadRecords(): Promise<ProfileRecord[]> {
    const page = this.profiles.page;
    const data = await freshNavigationJson<any[]>(page, '/api/profiles', () => page.goto('/profiles'));
    expect(Array.isArray(data), 'Profile listing must be the deployed envelope array').toBeTruthy();
    await expect(this.profiles.heading).toBeVisible();
    await expect(this.profiles.createProfileButton).toBeVisible();
    // Jackson identity references can point to objects nested elsewhere in the same response.
    const identities = new Map<string, ProfileRecord>();
    const collect = (value: any): void => {
      if (!value || typeof value !== 'object') return;
      if (typeof value['@id'] === 'string') identities.set(value['@id'], value);
      for (const child of Object.values(value)) collect(child);
    };
    collect(data);
    return data.map((item: { productProfile: ProfileRecord | string }) => {
      const profile = typeof item.productProfile === 'string' ? identities.get(item.productProfile) : item.productProfile;
      expect(profile?.id, 'Profile identity reference must resolve to a record').toBeDefined();
      return { ...profile!, profileRoles: (profile!.profileRoles || []).map((role: any) => typeof role === 'string' ? identities.get(role) : role) }; 
    });
  }
  async verifySaved() {
    const records = await this.reloadRecords();
    const matches = records.filter(r => r.name === this.name);
    expect(matches, 'Exactly one newly owned profile must persist after reload').toHaveLength(1);
    if (this.id) expect(String(matches[0].id)).toBe(this.id);
    this.id = String(matches[0].id);
    expect.soft(matches[0].description ?? '', 'Saved description must persist in the server record').toBe(this.description);
    await expect(this.card()).toHaveCount(1);
    await this.profiles.openEditDialog(this.card());
    await expect(this.profiles.editNameInput).toHaveValue(this.name);
    expect.soft(await this.profiles.editDescriptionInput.inputValue(), 'Saved description must reappear in Edit').toBe(this.description);
    await captureEvidence('owned-profile-persisted-fields');
    await this.profiles.editCancelButton.click();
    await expect(this.profiles.editDialog).toBeHidden();
  }
  async create() {
    const p = this.profiles;
    await p.createProfileButton.click();
    await p.createProfileNameInput.fill(this.name);
    await p.createProfileDescriptionInput.fill(this.description);
    await captureEvidence('owned-profile-create-before-save');
    this.createAttempted = true;
    const [response] = await Promise.all([
      p.page.waitForResponse(r => r.request().method() === 'POST' && /\/api\/profiles$/.test(new URL(r.url()).pathname)),
      p.createProfileSaveButton.click(),
    ]);
    await this.responseSummary('profile-create-response', response);
    await expect(p.createProfileDialog).toBeHidden();
    await this.verifySaved();
  }
  async edit() {
    await this.verifySaved();
    const p = this.profiles;
    await p.openEditDialog(this.card());
    const nextName = this.name + '-edited';
    this.names.add(nextName);
    await p.editNameInput.fill(nextName);
    this.description += ' - updated';
    await p.editDescriptionInput.fill(this.description);
    await captureEvidence('owned-profile-edit-before-save');
    const [response] = await Promise.all([
      p.page.waitForResponse(r => r.request().method() === 'PUT' && /\/api\/profiles\/l$/.test(new URL(r.url()).pathname)),
      p.editSaveButton.click(),
    ]);
    await this.responseSummary('profile-edit-response', response);
    await expect(p.editDialog).toBeHidden();
    this.name = nextName;
    await this.verifySaved();
  }
  async remove() {
    if (this.deleteAttempted) throw new Error('Deletion was already attempted; inspect its evidence before another mutation.');
    const records = await this.reloadRecords();
    const owned = records.filter(r => this.id ? String(r.id) === this.id : this.names.has(r.name));
    expect(owned, 'Only the record created by this test may be deleted').toHaveLength(1);
    expect(this.names.has(owned[0].name), 'Owned profile name must still match').toBeTruthy();
    this.name = owned[0].name;
    this.id = String(owned[0].id);
    await expect(this.card()).toHaveCount(1);
    await this.profiles.cardDeleteButton(this.card()).click();
    await expect(this.profiles.deleteConfirmDialog).toBeVisible();
    await captureEvidence('owned-profile-delete-confirmation');
    expect(owned[0].uuid, 'The deployed delete action uses the owned profile UUID').toBeTruthy();
    const deleteKey = owned[0].uuid!;
    this.deleteAttempted = true;
    const [response] = await Promise.all([
      this.profiles.page.waitForResponse(r => r.request().method() === 'DELETE' && new URL(r.url()).pathname.endsWith('/api/profiles/' + deleteKey)),
      this.profiles.deleteConfirmDeleteButton.click(),
    ]);
    await this.responseSummary('profile-delete-response', response);
    await expect(this.profiles.deleteConfirmDialog).toBeHidden();
    const after = await this.reloadRecords();
    const remaining = after.find(r => String(r.id) === this.id);
    await captureEvidence('owned-profile-after-delete-reload');
    expect(remaining, 'Deleted profile must be absent from a fresh server listing').toBeUndefined();
    await expect(this.card()).toHaveCount(0);
  }
  async cleanup() {
    if (!this.createAttempted || this.deleteAttempted) return;
    const records = await this.reloadRecords();
    const matches = records.filter(r => this.id ? String(r.id) === this.id : this.names.has(r.name));
    if (!matches.length) return;
    expect(matches, 'Cleanup must identify exactly one owned record').toHaveLength(1);
    this.id = String(matches[0].id);
    await this.remove();
  }
}

export async function withOwnedProfile(profiles: ProfilesPage, caseId: string, check: (owned: OwnedProfile) => Promise<void>, description?: string) {
  const owned = new OwnedProfile(profiles, caseId, description);
  let failure: unknown;
  try { await owned.create(); await check(owned); }
  catch (error) { failure = error; await captureEvidence('owned-profile-operation-failed'); }
  try { await owned.cleanup(); }
  catch (error) {
    await captureEvidence('owned-profile-cleanup-failed');
    if (failure) throw new Error(`${String(failure)}\nCleanup also failed: ${String(error)}`);
    throw error;
  }
  if (failure) throw failure;
}

/** Client validation must reject invalid fields without sending a write. */
export async function verifyProfileRequiredFields(profiles: ProfilesPage, kind: 'profile' | 'role') {
  const page = profiles.page;
  const dialog = kind === 'role' ? profiles.addRoleDialog : profiles.createProfileDialog;
  const save = kind === 'role' ? profiles.addRoleSaveButton : profiles.createProfileSaveButton;
  const endpoint = kind === 'role' ? '/api/profilerole' : '/api/profiles';
  let invalidWrites = 0;
  const guard = async (route: import('@playwright/test').Route) => {
    if (route.request().method() === 'POST') {
      invalidWrites++;
      await route.fulfill({ status: 422, contentType: 'application/json', body: '{"message":"Invalid test input must not be submitted"}' });
    } else await route.continue();
  };
  const pattern = (url: URL) => url.pathname.endsWith(endpoint);
  await page.route(pattern, guard);
  try {
    await expect(dialog).toBeVisible();
    if (await save.isEnabled()) {
      await save.click();
      await expect(page.getByText(kind === 'role' ? 'Please fill in all required fields' : 'Profile name is required', { exact: true })).toBeVisible();
    } else await expect(save).toBeDisabled();
    await expect(dialog).toBeVisible();
    expect(invalidWrites, 'Invalid form must not submit a server write').toBe(0);
    await captureEvidence(kind + '-required-fields-validation');
  } finally { await page.unroute(pattern, guard); }
}

export async function verifyOwnedRoleLifecycle(owned: OwnedProfile) {
  const p = owned.profiles;
  let name = owned.name + '-role';
  const roleRow = () => p.manageRolesTable.locator('> div').filter({ has: p.page.getByText(name, { exact: true }) });
  const open = async () => {
    await owned.reloadRecords();
    await expect(owned.card()).toHaveCount(1);
    await p.openManageDialog(owned.card(), owned.name);
    await p.manageDialogTabRoles.click();
    await expect(p.manageDialogTabRoles).toHaveAttribute('aria-selected', 'true');
  };
  await open();
  await p.manageRolesAddButton.click();
  await p.addRoleNameInput.fill(name);
  await p.addRoleValueInput.fill('10');
  await captureEvidence('owned-role-create-before-save');
  const [created] = await Promise.all([
    p.page.waitForResponse(r => r.request().method() === 'POST' && new URL(r.url()).pathname.endsWith('/api/profilerole')),
    p.addRoleSaveButton.click(),
  ]);
  await owned.responseSummary('role-create-response', created);
  await expect(p.addRoleDialog).toBeHidden();
  await open();
  await expect(roleRow()).toHaveCount(1);
  await expect(p.manageRolesRowValue(roleRow())).toContainText('10');
  await captureEvidence('owned-role-created-after-reload');
  await p.manageRolesRowEdit(roleRow()).click();
  const edit = p.page.getByRole('dialog', { name: 'Edit Role', exact: true });
  await expect(edit).toBeVisible();
  name += '-edited';
  await edit.getByRole('textbox', { name: /Role Name/ }).fill(name);
  await edit.getByRole('spinbutton', { name: /Value/ }).fill('20');
  const [updated] = await Promise.all([
    p.page.waitForResponse(r => r.request().method() === 'PUT' && new URL(r.url()).pathname.endsWith('/api/profilerole')),
    edit.getByRole('button', { name: 'Save', exact: true }).click(),
  ]);
  await owned.responseSummary('role-edit-response', updated);
  await expect(edit).toBeHidden();
  await open();
  await expect(roleRow()).toHaveCount(1);
  await expect(p.manageRolesRowValue(roleRow())).toContainText('20');
  await captureEvidence('owned-role-edited-after-reload');
  await p.manageRolesRowDelete(roleRow()).click();
  await expect(p.deleteConfirmDialog).toBeVisible();
  const [removed] = await Promise.all([
    p.page.waitForResponse(r => r.request().method() === 'DELETE' && /\/api\/profilerole\/[^/]+$/.test(new URL(r.url()).pathname)),
    p.deleteConfirmDeleteButton.click(),
  ]);
  await owned.responseSummary('role-delete-response', removed);
  await expect(p.deleteConfirmDialog).toBeHidden();
  await open();
  await expect(roleRow()).toHaveCount(0);
  await captureEvidence('owned-role-deleted-after-reload');
}
