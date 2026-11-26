import { expect, test } from '@playwright/test';
import { OwnedProfile } from './profile-crud';
import { captureEvidence } from './step-evidence';

/** Changes associations only on this test's disposable profile, never the catalog feature. */
export async function verifyOwnedFeatureLifecycle(owned: OwnedProfile) {
  const p = owned.profiles;
  const roleName = owned.name + '-feature-role';
  await p.openManageDialog(owned.card(), owned.name);
  await p.manageDialogTabRoles.click();
  await p.manageRolesAddButton.click();
  await p.addRoleNameInput.fill(roleName);
  await p.addRoleValueInput.fill('10');
  const [roleResponse] = await Promise.all([
    p.page.waitForResponse(r => r.request().method() === 'POST' && new URL(r.url()).pathname.endsWith('/api/profilerole')),
    p.addRoleSaveButton.click(),
  ]);
  await owned.responseSummary('feature-prerequisite-role-create', roleResponse);
  await expect(p.addRoleDialog).toBeHidden();
  const openFeatures = async () => {
    await owned.reloadRecords();
    await expect(owned.card()).toHaveCount(1);
    await p.openManageDialog(owned.card(), owned.name);
    await p.manageDialogTabFeatures.click();
    await expect(p.manageFeaturesTable).toBeVisible();
    await expect(p.manageFeaturesTable.getByRole('columnheader', { name: roleName, exact: true })).toBeVisible();
  };
  await openFeatures();
  await expect(p.manageFeaturesAddCombo).toBeEnabled();
  await p.manageFeaturesAddCombo.click();
  const choices = p.page.getByRole('option');
  await expect(choices.first().or(p.page.getByText('No features found.', { exact: true })).first()).toBeVisible();
  if (!(await choices.count())) {
    test.info().annotations.push({ type: 'unavailable-data', description: 'The live feature catalog has no assignable root features.' });
    test.skip(true, 'No assignable catalog feature is available; choices are checked again on every run.');
  }
  const featureName = (await choices.first().innerText()).trim();
  await choices.first().click();
  const row = () => p.manageFeaturesTable.locator('tbody tr').filter({ has: p.page.getByText(featureName, { exact: true }) });
  await expect(row()).toHaveCount(1);
  await captureEvidence('owned-feature-association-before-save');
  const waitWrite = (suffix: string) => p.page.waitForResponse(r => r.request().method() === 'PUT' && new URL(r.url()).pathname.endsWith('/api/' + suffix));
  const save = p.page.getByRole('tabpanel', { name: 'Features', exact: true }).getByRole('button', { name: 'Save', exact: true });
  const [associated, authorization] = await Promise.all([waitWrite('profiles/f/a'), waitWrite('pauth/b'), save.click()]);
  await owned.responseSummary('feature-association-response', associated);
  await owned.responseSummary('feature-authorization-response', authorization);
  await openFeatures();
  await expect(row()).toHaveCount(1);
  await captureEvidence('owned-feature-association-after-reload');
  await p.manageFeaturesRowRemove(row()).click();
  await captureEvidence('owned-feature-removal-before-save');
  const [removed, removedAuthorization] = await Promise.all([waitWrite('profiles/f/r'), waitWrite('pauth/b'), save.click()]);
  await owned.responseSummary('feature-removal-response', removed);
  await owned.responseSummary('feature-removal-authorization-response', removedAuthorization);
  await openFeatures();
  await expect(row()).toHaveCount(0);
  await captureEvidence('owned-feature-removal-after-reload');
  // Remove the owned prerequisite role through the UI before parent cleanup.
  await p.manageDialogTabRoles.click();
  const role = p.manageRolesTable.locator('> div').filter({ has: p.page.getByText(roleName, { exact: true }) });
  await expect(role).toHaveCount(1);
  await p.manageRolesRowDelete(role).click();
  const [deletedRole] = await Promise.all([
    p.page.waitForResponse(r => r.request().method() === 'DELETE' && /\/api\/profilerole\/[^/]+$/.test(new URL(r.url()).pathname)),
    p.deleteConfirmDeleteButton.click(),
  ]);
  await owned.responseSummary('feature-prerequisite-role-delete', deletedRole);
  await owned.reloadRecords();
  await p.openManageDialog(owned.card(), owned.name);
  await p.manageDialogTabRoles.click();
  await expect(role).toHaveCount(0);
}
