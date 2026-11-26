import { expect, test } from '@playwright/test';
import { OwnedFeature } from './feature-crud';
import { captureEvidence } from './step-evidence';

/** Upload and remove a tiny inert fixture only on this test's new Feature/version. */
export async function verifyOwnedFeatureUpdate(owned: OwnedFeature) {
  const f = owned.features, page = f.page;
  const filename = owned.stringId + '.txt';
  const comment = 'Disposable update verification for ' + owned.stringId;
  const body = Buffer.from('LIMAS automation test fixture. This file contains no executable code.\n');
  let uploadAccepted = false, deleteAttempted = false;
  const readVersion = async () => {
    const feature = (await owned.reload()).find(x => x.stringId === owned.stringId);
    expect(feature, 'Owned feature must remain present').toBeDefined();
    expect(feature!.id).toBe(owned.id);
    return feature!.featureVersion.find(x => x.featureVersion === '1.0.0');
  };
  const open = async () => {
    await owned.row().locator('td').nth(1).locator('div.cursor-pointer').filter({ hasText: /^1\.0\.0$/ }).click();
    await expect(f.updateDialog).toBeVisible();
  };
  const removeUpdate = async () => {
    if (deleteAttempted) throw new Error('Do not repeat a failed update-file deletion automatically.');
    const saved = await readVersion();
    expect(saved?.updateFileReference, 'The uploaded fixture must have a persisted file reference for UI cleanup').toBe(filename);
    await open();
    await captureEvidence('owned-feature-update-before-delete');
    deleteAttempted = true;
    const [response] = await Promise.all([
      page.waitForResponse(r => r.request().method() === 'DELETE' && new URL(r.url()).pathname.includes('/update-management/d/') && decodeURIComponent(new URL(r.url()).pathname).includes('/' + owned.stringId + '/')),
      f.updateDialog.getByRole('button', { name: 'Delete', exact: true }).click(),
    ]);
    await test.info().attach('feature-update-file-delete-response', { contentType: 'application/json', body: JSON.stringify({ method: 'DELETE', path: '/api/update-management/d/[owned-feature]/[version]/[actor]', status: response.status(), ownedFeature: owned.name, stringId: owned.stringId }) });
    expect(response.ok(), 'Update-file deletion returned HTTP ' + response.status()).toBeTruthy();
    await expect(f.updateDialog.getByText('Current File', { exact: true })).toBeHidden();
    await f.updateCloseButton.click();
    const current = await readVersion();
    expect(current?.updateFileReference ?? '', 'Deleted update reference must remain absent after reload').toBe('');
    await open();
    await expect(f.updateDialog.getByText('Current File', { exact: true })).toBeHidden();
    await captureEvidence('owned-feature-update-deleted');
    await f.updateCloseButton.click();
  };
  let failure: unknown;
  try {
    await open();
    await f.updateFileInput.setInputFiles({ name: filename, mimeType: 'text/plain', buffer: body });
    await f.updateCommentsTextarea.fill(comment);
    await captureEvidence('owned-feature-update-before-upload');
    const [response] = await Promise.all([
      page.waitForResponse(r => r.request().method() === 'POST' && new URL(r.url()).pathname.endsWith('/update-management/u/')),
      f.updateSaveButton.click(),
    ]);
    uploadAccepted = response.ok();
    await owned.responseSummary('feature-update-file-upload-response', response);
    await expect(f.updateDialog).toBeHidden();
    const saved = await readVersion();
    expect(saved?.updateFileReference).toBe(filename);
    expect(saved?.updateComment).toBe(comment);
    expect(saved?.size).toBe(body.length);
    await captureEvidence('owned-feature-update-persisted');
    await removeUpdate();
  } catch (error) { failure = error; }
  if (uploadAccepted && !deleteAttempted) {
    try { await removeUpdate(); } catch (error) { throw new Error(String(failure ?? '') + '\nUpdate-file cleanup failed: ' + String(error)); }
  }
  if (failure) throw failure;
}
