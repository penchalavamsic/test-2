import { expect, test, type Response } from '@playwright/test';
import { FloatingLicenseConfigurationsPage } from '../pages/floating-license-configurations.page';
import { UserGroupsPage } from '../pages/user-groups.page';
import { exerciseUserGroupCrud } from './user-group-crud';
import { freshNavigationJson } from './fresh-navigation-json';
import { captureEvidence } from './step-evidence';

function identities(raw: unknown) {
  const map = new Map<string, any>();
  const groups = new Map<number, any>();
  const visit = (value: any): void => {
    if (!value || typeof value !== 'object') return;
    if (value['@id']) map.set(value['@id'], value);
    if (value.id && Array.isArray(value.floatingLicenseConfigs)) groups.set(value.id, value);
    for (const child of Object.values(value)) visit(child);
  };
  visit(raw);
  return { groups, resolve: (value: any) => typeof value === 'string' ? map.get(value) : value };
}
const futureDate = (days: number) => new Date(Date.now() + days * 86400000).toISOString().slice(0, 10);
const dateOnly = (value: string) => value?.slice(0, 10);

export class OwnedFloatingConfiguration {
  id?: number;
  groupId?: number;
  capacity = 1;
  checkout = 1;
  expiration = futureDate(120);
  maintenance = futureDate(90);
  private attemptedCreate = false;
  private attemptedDelete = false;
  constructor(readonly flc: FloatingLicenseConfigurationsPage, readonly groupName: string, readonly profile: { id: number; name: string; roleId: number }) {
    if (!groupName.startsWith('LIMAS-AUTO-')) throw new Error('Only a newly owned group may hold this fixture.');
  }
  card() { return this.flc.configurationCards.filter({ has: this.flc.page.locator('button[aria-controls="flc-details-' + this.id + '"]') }); }
  async reload() {
    const raw = await freshNavigationJson<unknown>(this.flc.page, '/api/usergroups', () => this.flc.page.goto('/floating-license-configurations'));
    const data = identities(raw);
    const matches = [...data.groups.values()].filter(g => g.name === this.groupName);
    expect(matches, 'Exactly the owned group must exist').toHaveLength(1);
    if (this.groupId !== undefined) expect(matches[0].id).toBe(this.groupId);
    this.groupId = matches[0].id;
    await this.flc.expandAll();
    await this.flc.selectTreeItem(this.groupName);
    await expect(this.flc.userGroupSummaryPanel).toBeVisible();
    return (matches[0].floatingLicenseConfigs || []).map(data.resolve).filter(Boolean).map((config: any) => ({ ...config, productProfile: data.resolve(config.productProfile), profileRole: data.resolve(config.profileRole) }));
  }
  async response(operation: string, response: Response) {
    await test.info().attach(operation, { contentType: 'application/json', body: JSON.stringify({ method: response.request().method(), path: new URL(response.url()).pathname.replace(/(\/api\/flconfig\/)[^/]+(\/)/, '$1[actor]$2'), status: response.status(), ownedGroup: this.groupName, groupId: this.groupId, configId: this.id }) });
    expect(response.ok(), operation + ': HTTP ' + response.status()).toBeTruthy();
  }
  async verifySaved() {
    const configs = await this.reload();
    expect(configs, 'The owned group must contain only its newly created configuration').toHaveLength(1);
    const config = configs[0];
    if (this.id !== undefined) expect(config.id).toBe(this.id);
    this.id = config.id;
    expect(config.productProfile.id).toBe(this.profile.id);
    expect(config.profileRole.id).toBe(this.profile.roleId);
    expect(config.numberOfLicenses).toBe(this.capacity);
    expect(config.maxCheckoutTimeInHours).toBe(this.checkout);
    expect(dateOnly(config.expirationDate)).toBe(this.expiration);
    expect(dateOnly(config.maintenanceDate)).toBe(this.maintenance);
    await expect(this.card()).toHaveCount(1);
    await captureEvidence('owned-floating-configuration-persisted');
  }
  async save(operation: string) {
    const [response] = await Promise.all([
      this.flc.page.waitForResponse(r => r.request().method() === 'PUT' && new URL(r.url()).pathname.endsWith('/api/usergroups')),
      this.flc.page.getByRole('button', { name: 'Save Configuration', exact: true }).click(),
    ]);
    expect(response.request().postDataJSON().id, 'Only the owned group may be updated').toBe(this.groupId);
    await this.response(operation, response);
    await this.verifySaved();
  }
  async create() {
    expect(await this.reload(), 'The newly owned group must start without configurations').toHaveLength(0);
    await this.flc.openCreateForm();
    await this.flc.createProductProfileCombo.selectOption(String(this.profile.id));
    await expect(this.flc.createProfileRoleCombo.locator('option[value="' + this.profile.roleId + '"]')).toHaveCount(1);
    await this.flc.createProfileRoleCombo.selectOption(String(this.profile.roleId));
    await this.flc.createNumberOfLicensesInput.fill(String(this.capacity));
    await this.flc.createMaxCheckoutInput.fill(String(this.checkout));
    await this.flc.page.locator('#flc-editor-expirationDate').fill(this.expiration);
    await this.flc.page.locator('#flc-editor-maintenanceDate').fill(this.maintenance);
    await captureEvidence('owned-floating-configuration-before-create');
    this.attemptedCreate = true;
    await this.save('floating-config-create-response');
  }
  async edit() {
    await this.verifySaved();
    await this.card().getByRole('button', { name: /^Actions for / }).click();
    await this.flc.cardMenuEdit.click();
    await expect(this.flc.editFormHeading).toBeVisible();
    this.capacity = 2; this.checkout = 2;
    this.expiration = futureDate(180); this.maintenance = futureDate(150);
    await this.flc.editNumberOfLicensesInput.fill(String(this.capacity));
    await this.flc.editMaxCheckoutInput.fill(String(this.checkout));
    await this.flc.page.locator('#flc-editor-expirationDate').fill(this.expiration);
    await this.flc.page.locator('#flc-editor-maintenanceDate').fill(this.maintenance);
    await captureEvidence('owned-floating-configuration-before-edit');
    await this.save('floating-config-edit-response');
  }
  async updateBulk(mode: 'dates' | 'capacity') {
    await this.reload();
    await this.card().getByRole('checkbox').check();
    if (mode === 'dates') {
      await this.flc.openDatesPanel();
      this.expiration = futureDate(180); this.maintenance = futureDate(150);
      await this.flc.page.locator('#bulk-expiration-date').fill(this.expiration);
      await this.flc.page.locator('#bulk-maintenance-date').fill(this.maintenance);
    } else {
      await this.flc.openCapacityPanel();
      this.capacity = 2; this.checkout = 2;
      await this.flc.capacityNumberOfLicensesInput.fill(String(this.capacity));
      await this.flc.capacityMaxCheckoutInput.fill(String(this.checkout));
    }
    await captureEvidence('owned-floating-bulk-' + mode + '-before-save');
    const [response] = await Promise.all([
      this.flc.page.waitForResponse(r => r.request().method() === 'PUT' && new URL(r.url()).pathname.endsWith('/api/usergroups')),
      (mode === 'dates' ? this.flc.datesApplyButton : this.flc.capacityApplyButton).click(),
    ]);
    expect(response.request().postDataJSON().id, 'Bulk update must only target the owned group').toBe(this.groupId);
    await this.response('floating-config-bulk-' + mode + '-response', response);
    await this.verifySaved();
  }
  async remove(mode: 'card' | 'bulk' = 'card', known?: any[]) {
    if (this.attemptedDelete) throw new Error('Do not repeat a failed configuration delete automatically.');
    const configs = known ?? await this.reload();
    expect(configs).toHaveLength(1);
    if (this.id !== undefined) expect(configs[0].id).toBe(this.id);
    this.id = configs[0].id;
    if (mode === 'card') await this.card().getByRole('button', { name: /^Actions for / }).click();
    else await this.card().getByRole('checkbox').check();
    await captureEvidence('owned-floating-configuration-before-delete');
    this.attemptedDelete = true;
    const [response] = await Promise.all([
      this.flc.page.waitForResponse(r => r.request().method() === 'DELETE' && new URL(r.url()).pathname.includes('/api/flconfig/') && new URL(r.url()).pathname.endsWith('/' + this.id)),
      mode === 'card' ? this.flc.cardMenuDelete.click() : this.flc.selectionDeleteButton.click(),
    ]);
    await expect(this.flc.page.getByRole('dialog').or(this.flc.page.getByRole('alertdialog'))).toHaveCount(0);
    await this.response('floating-config-delete-response', response);
    expect(await this.reload(), 'Deleted configuration must be absent from the fresh group data').toHaveLength(0);
    await expect(this.card()).toHaveCount(0);
    await captureEvidence('owned-floating-configuration-deleted');
  }
  async cleanup() {
    if (!this.attemptedCreate || this.attemptedDelete) return;
    const remaining = await this.reload();
    if (!remaining.length) return;
    await this.remove('card', remaining);
  }
}

export async function withOwnedFloatingConfiguration(flc: FloatingLicenseConfigurationsPage, check: (owned: OwnedFloatingConfiguration) => Promise<void>) {
  const raw = await freshNavigationJson<any[]>(flc.page, '/api/profiles', () => flc.page.goto('/floating-license-configurations'));
  const data = identities(raw);
  expect(Array.isArray(raw)).toBeTruthy();
  const profiles = raw.map(x => data.resolve(x.productProfile ?? x)).filter(Boolean);
  const profile = profiles.find(p => p.profileRoles?.map(data.resolve).some((role: any) => role?.id));
  test.skip(!profile, 'No runtime Product Profile with a role is available for creating a configuration; reevaluated each run.');
  const role = profile.profileRoles.map(data.resolve).find((r: any) => r?.id);
  const groups = new UserGroupsPage(flc.page);
  await groups.navigate();
  await exerciseUserGroupCrud(groups, 'create', async groupName => {
    const owned = new OwnedFloatingConfiguration(flc, groupName, { id: profile.id, name: profile.name, roleId: role.id });
    let failure: unknown;
    try { await owned.create(); await check(owned); } catch (error) { failure = error; await captureEvidence('owned-floating-configuration-failed'); }
    try { await owned.cleanup(); } catch (error) { if (failure) throw new Error(String(failure) + '\nConfiguration cleanup also failed: ' + String(error)); throw error; }
    if (failure) throw failure;
  });
}
