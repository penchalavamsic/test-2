import { randomUUID } from 'crypto';
import { expect, test, type Response } from '@playwright/test';
import { FeaturesPage } from '../pages/features.page';
import { captureEvidence } from './step-evidence';

type Feature = { id: number; uuid?: string; name: string; stringId: string; description?: string; parent?: any; featureVersion: any[]; accessLevel: any[] };
export class OwnedFeature {
  name: string;
  readonly stringId: string;
  description = 'Disposable automation feature';
  id?: number;
  private createAttempted = false;
  private deleteAttempted = false;
  constructor(readonly features: FeaturesPage, caseId: string, readonly parent?: OwnedFeature) {
    const nonce = randomUUID().slice(0, 8);
    this.name = `LIMAS-AUTO-${caseId.replace('LIMAS-SUD-', '')}-${nonce}`;
    this.stringId = 'limas.auto.' + nonce;
  }
  row() { return this.features.tableRows.filter({ has: this.features.page.getByText(this.name, { exact: true }) }); }
  async responseSummary(operation: string, response: Response) {
    await test.info().attach(operation, { contentType: 'application/json', body: JSON.stringify({ method: response.request().method(), path: new URL(response.url()).pathname, status: response.status(), ownedFeature: this.name, stringId: this.stringId }) });
    expect(response.ok(), `${operation}: HTTP ${response.status()}`).toBeTruthy();
  }
  async reload(): Promise<Feature[]> {
    const p = this.features.page;
    const [data] = await Promise.all([
      p.waitForResponse(r => r.request().method() === 'GET' && new URL(r.url()).pathname.endsWith('/api/features')).then(async response => { expect(response.ok()).toBeTruthy(); return response.json(); }),
      p.goto('/features'),
    ]);
    expect(Array.isArray(data)).toBeTruthy();
    const identities = new Map<string, any>();
    const collect = (x: any): void => { if (!x || typeof x !== 'object') return; if (x['@id']) identities.set(x['@id'], x); for (const v of Object.values(x)) collect(v); };
    collect(data);
    const resolve = (x: any) => typeof x === 'string' ? identities.get(x) : x;
    const records = data.map((envelope: any) => resolve(envelope.feature)).filter(Boolean).map((f: any) => ({ ...f, parent: resolve(f.parent), featureVersion: (f.featureVersion || []).map(resolve), accessLevel: (f.accessLevel || []).map(resolve) }));
    await expect(this.features.heading).toBeVisible();
    await expect(this.features.addRootFeatureButton).toBeVisible();
    return records;
  }
  async verifySaved() {
    const matches = (await this.reload()).filter(f => f.stringId === this.stringId);
    expect(matches, 'Owned feature must persist exactly once').toHaveLength(1);
    const saved = matches[0];
    if (this.id !== undefined) expect(saved.id).toBe(this.id);
    this.id = saved.id;
    expect(saved.name).toBe(this.name);
    expect.soft(saved.description ?? '', 'Feature description must persist').toBe(this.description);
    expect(saved.featureVersion.map(v => v.featureVersion)).toContain('1.0.0');
    if (this.parent) { expect(saved.parent?.id).toBe(this.parent.id); await this.features.expandAll(); }
    else expect.soft(saved.accessLevel.map(a => a.accessLevelName), 'Feature access levels must persist').toContain('Standard');
    await expect(this.row()).toHaveCount(1);
    await expect(this.features.featureIdCell(this.row())).toHaveText(this.stringId);
    await captureEvidence('owned-feature-persisted-after-reload');
  }
  async create() {
    const f = this.features, p = f.page;
    await this.reload();
    if (this.parent) { await expect(this.parent.row()).toHaveCount(1); await f.openAddChildDialog(this.parent.row()); }
    else await f.openAddRootDialog();
    const dialog = this.parent ? f.addChildDialog : f.addRootDialog;
    await dialog.getByPlaceholder('Enter feature name').fill(this.name);
    await dialog.getByPlaceholder('e.g., FEAT-001').fill(this.stringId);
    await (this.parent ? f.addChildDescriptionInput : f.addRootDescriptionInput).fill(this.description);
    if (this.parent) await f.addChildVersion('1.0.0');
    else { await f.addVersion('1.0.0'); await f.addAccessLevel('Standard'); }
    await captureEvidence('owned-feature-before-create');
    this.createAttempted = true;
    // The deployed UI creates the feature, then updates its versions/access levels.
    const details = p.waitForResponse(r => r.request().method() === 'PUT' && new URL(r.url()).pathname.endsWith('/api/features') && r.request().postDataJSON()?.name === this.name, { timeout: 30000 }).catch(() => null);
    const [created] = await Promise.all([
      p.waitForResponse(r => r.request().method() === 'POST' && new URL(r.url()).pathname.endsWith('/api/features')),
      dialog.getByRole('button', { name: 'Save', exact: true }).click(),
    ]);
    await this.responseSummary('feature-create-response', created);
    const detailResponse = await details;
    expect(detailResponse, 'Version/access-level follow-up must complete').not.toBeNull();
    await this.responseSummary('feature-details-response', detailResponse!);
    await expect(dialog).toBeHidden();
    await this.verifySaved();
  }
  async edit() {
    await this.features.openEditDialog(this.row());
    this.name += '-edited';
    this.description = 'Updated disposable automation feature';
    await this.features.editFeatureNameInput.fill(this.name);
    await this.features.editDescriptionInput.fill(this.description);
    await captureEvidence('owned-feature-before-edit');
    const [response] = await Promise.all([
      this.features.page.waitForResponse(r => r.request().method() === 'PUT' && new URL(r.url()).pathname.endsWith('/api/features')),
      this.features.editSaveButton.click(),
    ]);
    await this.responseSummary('feature-update-response', response);
    await this.verifySaved();
  }
  async remove(known?: Feature[]) {
    if (this.deleteAttempted) throw new Error('Owned feature delete already attempted; do not automatically retry a failed mutation.');
    const matches = (known || await this.reload()).filter(f => f.stringId === this.stringId);
    expect(matches, 'Delete must identify exactly the owned feature').toHaveLength(1);
    if (this.id !== undefined) expect(matches[0].id).toBe(this.id);
    this.id = matches[0].id;
    this.name = matches[0].name;
    const key = matches[0].uuid || this.id;
    if (this.parent) await this.features.expandAll();
    await expect(this.row()).toHaveCount(1);
    await this.features.rowDeleteButton(this.row()).click();
    await expect(this.features.deleteConfirmDialog).toBeVisible();
    await captureEvidence('owned-feature-delete-confirmation');
    this.deleteAttempted = true;
    const [response] = await Promise.all([
      this.features.page.waitForResponse(r => r.request().method() === 'DELETE' && new URL(r.url()).pathname.endsWith('/api/features/' + key)),
      this.features.deleteConfirmDeleteButton.click(),
    ]);
    await this.responseSummary('feature-delete-response', response);
    expect((await this.reload()).filter(f => f.stringId === this.stringId), 'Deleted feature must be absent after reload').toHaveLength(0);
    if (this.parent) await this.features.expandAll();
    await expect(this.row()).toHaveCount(0);
    await captureEvidence('owned-feature-deleted-after-reload');
  }
  async cleanup() {
    if (!this.createAttempted || this.deleteAttempted) return;
    const records = await this.reload();
    if (!records.some(f => f.stringId === this.stringId)) return;
    await this.remove(records);
  }
}
export async function withOwnedFeature(features: FeaturesPage, caseId: string, check: (feature: OwnedFeature) => Promise<void>, parent?: OwnedFeature) {
  const owned = new OwnedFeature(features, caseId, parent);
  let failure: unknown;
  try { await owned.create(); await check(owned); }
  catch (error) { failure = error; await captureEvidence('owned-feature-operation-failed'); }
  try { await owned.cleanup(); }
  catch (error) { await captureEvidence('owned-feature-cleanup-failed'); if (failure) throw new Error(`${String(failure)}\nCleanup also failed: ${String(error)}`); throw error; }
  if (failure) throw failure;
}
