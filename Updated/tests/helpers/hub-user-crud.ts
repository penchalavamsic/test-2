import { freshNavigationJson } from './fresh-navigation-json';
import { randomUUID } from 'crypto';
import { expect, test, type Response } from '@playwright/test';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';
import { captureEvidence } from './step-evidence';

type UserRecord = { id: number; firstName: string; lastName: string; email: string; company?: string; licenses?: unknown[] };
/** All writes are scoped to the unique user created by this instance. */
export class OwnedHubUser {
  readonly email: string;
  firstName = 'LimasAuto';
  lastName: string;
  company = 'Automation fixture';
  id?: number;
  runtimeProfiles: any[] = [];
  private createAttempted = false;
  private deleteAttempted = false;
  constructor(readonly hub: UserLicenseHubPage, caseId: string) {
    const suffix = caseId.replace('LIMAS-SUD-', '') + '-' + randomUUID().slice(0, 8);
    this.lastName = 'ULH-' + suffix;
    this.email = 'limas-auto-' + suffix + '@example.invalid';
  }
  card() { return this.hub.userCards.filter({ has: this.hub.page.getByText(this.email, { exact: true }) }); }
  async responseSummary(label: string, response: Response) {
    await test.info().attach(label, { contentType: 'application/json', body: JSON.stringify({ method: response.request().method(), path: new URL(response.url()).pathname, status: response.status(), ownedEmail: this.email }) });
    expect(response.ok(), `${label}: HTTP ${response.status()}`).toBeTruthy();
  }
  async findFresh(): Promise<UserRecord[]> {
    const p = this.hub.page;
    await this.hub.goto();
    const [response] = await Promise.all([
      p.waitForResponse(r => { const url = new URL(r.url()); return r.request().method() === 'GET' && url.pathname.endsWith('/api/users/f') && url.searchParams.get('eMail') === this.email; }),
      this.hub.userSearchInput.fill(this.email),
    ]);
    expect(response.ok(), 'Fresh owned-user search must succeed').toBeTruthy();
    const data = await response.json();
    expect(Array.isArray(data.content), 'User search must expose its paginated content').toBeTruthy();
    const matches = data.content.filter((u: UserRecord) => u.email?.toLowerCase() === this.email.toLowerCase());
    // Filtering must not silently return other people or only the first page of matches.
    expect(data.totalElements).toBe(matches.length);
    return matches;
  }
  async verifySaved() {
    const records = await this.findFresh();
    expect(records, 'Exactly one owned user must persist after reload').toHaveLength(1);
    const record = records[0];
    if (this.id !== undefined) expect(record.id).toBe(this.id);
    this.id = record.id;
    expect(record.firstName).toBe(this.firstName);
    expect(record.lastName).toBe(this.lastName);
    expect(record.company).toBe(this.company);
    await expect(this.card()).toHaveCount(1);
    await expect(this.card().getByRole('heading', { name: this.firstName + ' ' + this.lastName, exact: true })).toBeVisible();
    await this.card().locator('button').first().click();
    await expect(this.hub.getEditUserDialog()).toBeVisible();
    await expect(this.hub.getEditUserField('First Name *')).toHaveValue(this.firstName);
    await expect(this.hub.getEditUserField('Last Name *')).toHaveValue(this.lastName);
    await expect(this.hub.getEditUserField('Email *')).toHaveValue(this.email);
    await expect(this.hub.getEditUserField('Company')).toHaveValue(this.company);
    await captureEvidence('owned-hub-user-persisted-fields');
    await this.hub.cancelEditUser();
  }
  async create() {
    const h = this.hub, p = h.page;
    // Reload also closes any read-only form opened by the enclosing test hooks.
    const groups = await freshNavigationJson<any[]>(p, '/api/account-scope/usergroups', async () => {
      this.runtimeProfiles = await freshNavigationJson<any[]>(p, '/api/account-scope/profiles', () => h.goto());
    });
    expect(Array.isArray(groups)).toBeTruthy();
    test.skip(groups.length === 0, 'No assignable User Group exists for creating a disposable Hub user; reevaluated on every run.');
    await h.openAddUserDialog();
    await h.fillAddUserFirstName(this.firstName);
    await h.fillAddUserLastName(this.lastName);
    await h.fillAddUserEmail(this.email);
    await h.getAddUserField('Company').fill(this.company);
    await h.getAddUserField('User Group *').click();
    const option = p.getByRole('listbox').getByRole('option').first();
    await expect(option).toBeVisible();
    await option.click();
    await captureEvidence('owned-hub-user-create-before-save');
    await expect(h.getAddUserSaveButton()).toBeEnabled();
    this.createAttempted = true;
    const [response] = await Promise.all([
      p.waitForResponse(r => r.request().method() === 'POST' && new URL(r.url()).pathname.endsWith('/api/users')),
      h.getAddUserSaveButton().click(),
    ]);
    await this.responseSummary('hub-user-create-response', response);
    await expect(h.getAddUserDialog()).toBeHidden();
    await this.verifySaved();
  }
  async edit() {
    await this.verifySaved();
    await this.card().locator('button').first().click();
    this.firstName = 'LimasEdited';
    this.company = 'Updated automation fixture';
    await this.hub.fillEditUserFirstName(this.firstName);
    await this.hub.getEditUserField('Company').fill(this.company);
    await captureEvidence('owned-hub-user-edit-before-save');
    const [response] = await Promise.all([
      this.hub.page.waitForResponse(r => r.request().method() === 'PUT' && new URL(r.url()).pathname.endsWith('/api/users')),
      this.hub.getEditUserDialog().getByRole('button', { name: 'Save', exact: true }).click(),
    ]);
    await this.responseSummary('hub-user-update-response', response);
    await expect(this.hub.getEditUserDialog()).toBeHidden();
    await this.verifySaved();
  }
  async remove(known?: UserRecord[]) {
    if (this.deleteAttempted) throw new Error('Owned user delete already attempted; do not automatically repeat a failed mutation.');
    const records = known ?? await this.findFresh();
    expect(records, 'Owned user must be identified before deletion').toHaveLength(1);
    if (this.id !== undefined) expect(records[0].id).toBe(this.id);
    this.id = records[0].id;
    expect(records[0].email).toBe(this.email);
    await expect(this.card()).toHaveCount(1);
    await captureEvidence('owned-hub-user-before-delete');
    this.deleteAttempted = true;
    const [response] = await Promise.all([
      this.hub.page.waitForResponse(r => r.request().method() === 'DELETE' && new URL(r.url()).pathname.endsWith('/api/users/' + this.id)),
      this.card().getByRole('button', { name: 'Delete user', exact: true }).click(),
    ]);
    await this.responseSummary('hub-user-delete-response', response);
    const remaining = await this.findFresh();
    expect(remaining, 'Deleted owned user must be absent after a fresh server search').toHaveLength(0);
    await expect(this.card()).toHaveCount(0);
    await captureEvidence('owned-hub-user-deleted-after-reload');
  }
  async cleanup() {
    if (!this.createAttempted || this.deleteAttempted) return;
    const remaining = await this.findFresh();
    if (!remaining.length) return;
    expect(remaining, 'Cleanup must locate exactly one owned user').toHaveLength(1);
    await this.remove(remaining);
  }
}
export async function withOwnedHubUser(hub: UserLicenseHubPage, caseId: string, check: (owned: OwnedHubUser) => Promise<void>) {
  const owned = new OwnedHubUser(hub, caseId);
  let failure: unknown;
  try { await owned.create(); await check(owned); }
  catch (error) { failure = error; await captureEvidence('owned-hub-user-operation-failed'); }
  try { await owned.cleanup(); }
  catch (error) {
    await captureEvidence('owned-hub-user-cleanup-failed');
    if (failure) throw new Error(`${String(failure)}\nCleanup also failed: ${String(error)}`);
    throw error;
  }
  if (failure) throw failure;
}
