import { expect, test, type Request } from '@playwright/test';
import { FeaturesPage } from '../pages/features.page';
import { captureEvidence } from './step-evidence';

export async function verifyFeatureUpdateDismissal(features: FeaturesPage, action: 'Cancel' | 'Close') {
  const p = features.page;
  const reload = async () => {
    const [response] = await Promise.all([
      p.waitForResponse(r => r.request().method() === 'GET' && new URL(r.url()).pathname.endsWith('/api/features')),
      features.navigate(),
    ]);
    expect(response.ok(), 'Feature prerequisites must load successfully').toBeTruthy();
    await features.expandAll();
  };
  await reload();
  const versions = features.featureTable.locator('tbody td:nth-child(2) div.cursor-pointer');
  test.skip(await versions.count() === 0, 'No Feature version is available after loading and expanding all Features; reevaluated each run.');
  const first = versions.first();
  const row = first.locator('xpath=ancestor::tr');
  const stringId = (await features.featureIdCell(row).innerText()).trim();
  const version = (await first.innerText()).trim();
  await first.click();
  await expect(features.updateDialog).toBeVisible();
  const baseline = await features.updateCommentsTextarea.inputValue();
  const writes: string[] = [];
  const observe = (request: Request) => { if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method()) && new RegExp('/(features|update-management)(/|$)').test(new URL(request.url()).pathname)) writes.push(request.method() + ' ' + new URL(request.url()).pathname); };
  p.on('request', observe);
  try {
    await features.updateCommentsTextarea.fill('Unsaved automation cancellation check');
    await captureEvidence('feature-update-unsaved-draft');
    await features.updateDialog.getByRole('button', { name: action, exact: true }).click();
    await expect(features.updateDialog).toBeHidden();
    await reload();
    const sameRow = features.tableRows.filter({ has: p.getByText(stringId, { exact: true }) });
    await expect(sameRow).toHaveCount(1);
    await sameRow.locator('td').nth(1).locator('div.cursor-pointer').filter({ hasText: version }).first().click();
    await expect(features.updateCommentsTextarea).toHaveValue(baseline);
    expect(writes, 'Dismissal and reload must not persist a draft or upload a file').toEqual([]);
    await captureEvidence('feature-update-cancelled-data-unchanged');
    await features.updateCloseButton.click();
  } finally { p.off('request', observe); }
}
