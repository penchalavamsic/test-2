import { expect, test, type Route } from '@playwright/test';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';
import { selectLicensedHubUser } from './hub-selection';
import { captureEvidence } from './step-evidence';

/** Client recovery only: all mutations are blocked, and the server record is reloaded unchanged. */
export async function verifyHubEditRejection(hub: UserLicenseHubPage, status: 400 | 401 | 403 | 404 | 409 | 500 | 'network') {
  const page = hub.page;
  await hub.goto();
  const selected = await selectLicensedHubUser(hub);
  const email = (await hub.userCards.nth(selected).locator('p').first().innerText()).trim();
  const hardwareId = await hub.getFirstVisibleHardwareId();
  const originalText = await hub.licenseCards.first().innerText();
  const originalProfile = (await hub.getLicensePanelRuntimeData())[0].profile;
  let writes = 0;
  const message = 'Controlled license update rejection';
  const guard = async (route: Route) => {
    const request = route.request();
    if (!['POST','PUT','PATCH','DELETE'].includes(request.method())) { await route.continue(); return; }
    writes++;
    expect(request.method()).toBe('PUT');
    expect(new URL(request.url()).pathname.endsWith('/api/users')).toBeTruthy();
    if (status === 'network') await route.abort('failed');
    else await route.fulfill({ status, contentType: 'application/json', body: JSON.stringify({ message }) });
  };
  await page.route('**/*', guard);
  try {
    await hub.openEditLicenseDialog();
    const dialog = hub.getEditLicenseDialog();
    await dialog.locator('#expirationDate').fill(new Date(Date.now() + 180 * 86400000).toISOString().slice(0, 10));
    await dialog.getByRole('button', { name: 'Save', exact: true }).click();
    await expect.poll(() => writes).toBe(1);
    await expect(page.getByRole('status').or(page.getByRole('alert')).filter({ hasText: status === 'network' ? /network|failed|error/i : /Controlled license update rejection|error/i }).first()).toBeVisible();
    await expect(dialog, 'Rejected save must preserve the editing context').toBeVisible();
    await expect(dialog.getByRole('button', { name: 'Save', exact: true })).toBeEnabled();
    await captureEvidence('controlled-license-update-rejection-' + status);
    await test.info().attach('controlled-license-update-response', { contentType: 'application/json', body: JSON.stringify({ status, intercepted: true, serverMutation: false, writes }) });
    await hub.closeEditLicenseDialog();
  } finally { await page.unroute('**/*', guard); }
  await hub.goto();
  const [response] = await Promise.all([
    page.waitForResponse(r => r.request().method() === 'GET' && new URL(r.url()).pathname.endsWith('/api/users/f') && new URL(r.url()).searchParams.get('eMail') === email),
    hub.userSearchInput.fill(email),
  ]);
  expect(response.ok()).toBeTruthy();
  await hub.waitForHubLoad();
  const card = hub.userCards.filter({ has: page.getByText(email, { exact: true }) });
  await expect(card).toHaveCount(1);
  await card.click();
  await expect.poll(() => hub.getSelectedUserCardIndex()).toBe(0);
  await expect.poll(() => hub.licenseCards.filter({ has: page.getByText(hardwareId, { exact: true }) }).filter({has:page.getByText(originalProfile!,{exact:true})}).first().innerText()).toBe(originalText);
  await captureEvidence('controlled-license-update-preserved-after-reload');
}
