import { randomUUID } from 'crypto';
import { expect, test } from '@playwright/test';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';
import { OwnedHubUser, withOwnedHubUser } from './hub-user-crud';
import { captureEvidence } from './step-evidence';

type RuntimeProfile = { id: number; name: string; profileRoles: { id: number; name: string }[] };
const futureDay = (days: number) => new Date(Date.now() + days * 86400000).toISOString().slice(0, 10);
const dateOnly = (value: string | number) => new Date(value).toISOString().slice(0, 10);
export class OwnedHubLicense {
  readonly hardwareId = 'LIMAS-AUTO-' + randomUUID().slice(0, 12);
  profile!: RuntimeProfile;
  roleId!: number;
  expiration = futureDay(120);
  maintenance = futureDay(90);
  id?: number;
  private createAttempted = false;
  private deleteAttempted = false;
  constructor(readonly user: OwnedHubUser) {}
  get hub() { return this.user.hub; }
  card() { return this.hub.licenseCards.filter({ has: this.hub.page.getByText(this.hardwareId, { exact: true }) }); }
  async freshLicenses() {
    const users = await this.user.findFresh();
    expect(users, 'Owned license user must remain available').toHaveLength(1);
    const licenses = (users[0].licenses || []) as any[];
    return licenses.filter(l => (l.hardwareId?.hardwareIdString ?? l.hardwareId?.hardwareId) === this.hardwareId);
  }
  async selectOwnedUser() {
    await expect(this.user.card()).toHaveCount(1);
    if (!(await this.user.card().getAttribute('class'))?.includes('ring-primary')) await this.user.card().click();
    await expect(this.user.card()).toHaveClass(/ring-primary/);
  }
  async verifySaved() {
    const matches = await this.freshLicenses();
    expect(matches, 'Exactly one owned license must persist, without duplicates').toHaveLength(1);
    const license = matches[0];
    if (this.id !== undefined) expect(license.id).toBe(this.id);
    this.id = license.id;
    expect(license.productProfile.id).toBe(this.profile.id);
    expect(license.profileRole.id).toBe(this.roleId);
    expect(dateOnly(license.expirationDate)).toBe(this.expiration);
    if (this.maintenance) expect(dateOnly(license.maintenanceDate)).toBe(this.maintenance);
    else expect([null, undefined, ''], 'Cleared optional maintenance date must remain cleared').toContain(license.maintenanceDate);
    await this.selectOwnedUser();
    await expect(this.card()).toHaveCount(1);
    await expect(this.user.card().getByText(/^1 License$/)).toBeVisible();
    await captureEvidence('owned-license-persisted-after-reload');
  }
  async create(doubleSubmit = false) {
    const h = this.hub, p = h.page;
    const profiles = this.user.runtimeProfiles as RuntimeProfile[];
    expect(Array.isArray(profiles)).toBeTruthy();
    const available = profiles.filter(x => x.profileRoles?.length && profiles.filter(y => y.name === x.name).length === 1);
    test.skip(!profiles.some(x => x.profileRoles?.length), 'No assigned Profile with a role exists; the live prerequisites are reevaluated on every run.');
    expect(available.length, 'A uniquely selectable Profile with a role is required').toBeGreaterThan(0);
    this.profile = available.find(x => x.profileRoles.length > 1) || available[0];
    this.roleId = this.profile.profileRoles[0].id;
    await this.selectOwnedUser();
    await h.addLicenseButton.click();
    const dialog = p.getByRole('dialog').filter({ has: p.getByRole('heading', { name: 'Add License', exact: true }) });
    await expect(dialog).toBeVisible({ timeout: 60000 });
    await dialog.getByPlaceholder('e.g., HW001').fill(this.hardwareId);
    await dialog.getByRole('combobox').first().click();
    await p.getByRole('option', { name: this.profile.name, exact: true }).click();
    await dialog.getByRole('combobox').last().click();
    await p.getByRole('option', { name: this.profile.profileRoles[0].name, exact: true }).click();
    await dialog.locator('#expirationDate').fill(this.expiration);
    await dialog.locator('#maintenanceDate').fill(this.maintenance);
    await captureEvidence('owned-license-create-before-save');
    this.createAttempted = true;
    const requests: import('@playwright/test').Request[] = [];
    const observe = (request: import('@playwright/test').Request) => { if (request.method() === 'PUT' && new URL(request.url()).pathname.endsWith('/api/users')) requests.push(request); };
    p.on('request', observe);
    let saved: import('@playwright/test').Response;
    try { [saved] = await Promise.all([
      p.waitForResponse(r => r.request().method() === 'PUT' && new URL(r.url()).pathname.endsWith('/api/users')),
      doubleSubmit ? dialog.getByRole('button', { name: 'Save', exact: true }).dblclick() : dialog.getByRole('button', { name: 'Save', exact: true }).click(),
    ]); } finally { p.off('request', observe); }
    if (!doubleSubmit) expect(requests.length, 'One Save must send one user update').toBe(1);
    // Rapid activation is judged by persisted outcome, not an assumed implementation request count.
    for (const request of requests) {
      const response = await request.response();
      expect(response, 'Every Save request must receive a response').not.toBeNull();
      await response!.finished();
      expect(response!.ok(), 'Every observed Save response must succeed').toBeTruthy();
    }
    await test.info().attach('owned-license-save-request-count', { contentType: 'application/json', body: JSON.stringify({ rapidActivation: doubleSubmit, requests: requests.length }) });
    await this.user.responseSummary('owned-license-create-user-update', saved);
    await expect(dialog).toBeHidden();
    await this.verifySaved();
  }
  async edit(kind: 'role' | 'expiration' | 'maintenance' | 'clear-maintenance' | 'all' | 'unchanged' = 'all', rapidActivation = false, afterSave?: () => Promise<void>) {
    expect(this.id, 'Creation must already have verified the persisted owned license').toBeDefined();
    await expect(this.card()).toHaveCount(1);
    const p = this.hub.page;
    const alternate = this.profile.profileRoles.find(r => r.id !== this.roleId);
    if (kind === 'role') test.skip(!alternate, 'No alternative role exists for the assigned runtime Profile.');
    await this.card().locator('button').first().click();
    const dialog = p.getByRole('dialog').filter({ has: p.getByRole('heading', { name: 'Edit License', exact: true }) });
    await expect(dialog).toBeVisible({ timeout: 60000 });
    if ((kind === 'role' || kind === 'all') && alternate) {
      await dialog.getByRole('combobox').last().click();
      await p.getByRole('option', { name: alternate.name, exact: true }).click();
      this.roleId = alternate.id;
    }
    if (kind === 'expiration' || kind === 'all') { this.expiration = futureDay(180); await dialog.locator('#expirationDate').fill(this.expiration); }
    if (kind === 'maintenance' || kind === 'all') { this.maintenance = futureDay(100); await dialog.locator('#maintenanceDate').fill(this.maintenance); }
    if (kind === 'clear-maintenance') { this.maintenance = ''; await dialog.locator('#maintenanceDate').fill(''); }
    await captureEvidence('owned-license-edit-before-save');
    let writes = 0;
    const observe = (request: import('@playwright/test').Request) => { if (request.method() === 'PUT' && new URL(request.url()).pathname.endsWith('/api/users')) writes++; };
    p.on('request', observe);
    let response: import('@playwright/test').Response;
    try { [response] = await Promise.all([
      p.waitForResponse(r => r.request().method() === 'PUT' && new URL(r.url()).pathname.endsWith('/api/users')),
      rapidActivation ? dialog.getByRole('button', { name: 'Save', exact: true }).dblclick() : dialog.getByRole('button', { name: 'Save', exact: true }).click(),
    ]); } finally { p.off('request', observe); }
    if (rapidActivation) {
      // Two click events can issue an idempotent PUT twice; correctness is verified from fresh persisted values below.
      expect(writes, 'Rapid activation must submit the owned update').toBeGreaterThan(0);
      await test.info().attach('rapid-save-request-count', {contentType:'application/json', body:JSON.stringify({writes,verification:'Persisted owned license count and values determine success; request count alone does not prove data duplication.'})});
    } else expect(writes, 'One Save action must issue one update request').toBe(1);
    const payload = response.request().postDataJSON();
    expect(payload.id, 'Update payload must identify the owned user').toBe(this.user.id);
    expect(Array.isArray(payload.licenses)).toBeTruthy();
    expect(payload.licenses.filter((l: any) => l.id === this.id), 'Update payload must contain the owned license exactly once').toHaveLength(1);
    await this.user.responseSummary('owned-license-update-response', response);
    await expect(dialog).toBeHidden();
    if (afterSave) await afterSave();
    await this.verifySaved();
  }
  async remove(doubleActivate = false, known?: any[]) {
    if (this.deleteAttempted) throw new Error('Owned license deletion already attempted; inspect the failure before another mutation.');
    const matches = known ?? await this.freshLicenses();
    expect(matches, 'Only the uniquely owned license can be deleted').toHaveLength(1);
    if (this.id !== undefined) expect(matches[0].id).toBe(this.id);
    this.id = matches[0].id;
    await this.selectOwnedUser();
    await expect(this.card()).toHaveCount(1);
    await captureEvidence('owned-license-before-delete');
    this.deleteAttempted = true;
    const suffix = `/api/users/${this.user.id}/licenses/${this.id}`;
    let writes = 0;
    const observe = (request: import('@playwright/test').Request) => { if (request.method() === 'DELETE' && new URL(request.url()).pathname.endsWith(suffix)) writes++; };
    this.hub.page.on('request', observe);
    let response: import('@playwright/test').Response;
    try { [response] = await Promise.all([
      this.hub.page.waitForResponse(r => r.request().method() === 'DELETE' && new URL(r.url()).pathname.endsWith(suffix)),
      doubleActivate ? this.card().getByRole('button', { name: 'Delete license', exact: true }).dblclick() : this.card().getByRole('button', { name: 'Delete license', exact: true }).click(),
    ]); } finally { this.hub.page.off('request', observe); }
    expect(writes, 'Exactly one deletion request is allowed').toBe(1);
    await this.user.responseSummary('owned-license-delete-response', response);
    await expect(this.card()).toHaveCount(0);
    expect(await this.freshLicenses(), 'Deleted license must remain absent after reload').toHaveLength(0);
    await this.selectOwnedUser();
    await expect(this.card()).toHaveCount(0);
    await captureEvidence('owned-license-deleted-after-reload');
  }
  async cleanup() {
    if (!this.createAttempted || this.deleteAttempted) return;
    const matches = await this.freshLicenses();
    if (!matches.length) return;
    await this.remove(false, matches);
  }
}
export async function withOwnedHubLicense(hub: UserLicenseHubPage, caseId: string, check: (license: OwnedHubLicense) => Promise<void>, options: { doubleSubmit?: boolean; expirationDays?: number; maintenanceDays?: number } = {}) {
  await withOwnedHubUser(hub, caseId, async user => {
    const license = new OwnedHubLicense(user);
    if (options.expirationDays !== undefined) license.expiration = futureDay(options.expirationDays);
    if (options.maintenanceDays !== undefined) license.maintenance = futureDay(options.maintenanceDays);
    let failure: unknown;
    try { await license.create(options.doubleSubmit); await check(license); }
    catch (error) { failure = error; await captureEvidence('owned-license-operation-failed'); }
    try { await license.cleanup(); }
    catch (error) { if (failure) throw new Error(`${String(failure)}\nLicense cleanup also failed: ${String(error)}`); throw error; }
    if (failure) throw failure;
  });
}
