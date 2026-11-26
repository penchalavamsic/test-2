import { expect, test, type Route } from '@playwright/test';
import { FloatingLicenseConfigurationsPage } from '../pages/floating-license-configurations.page';
import { captureEvidence } from './step-evidence';

/** Controlled client handling: every DELETE is intercepted; no server record is modified. */
export async function verifyFloatingDeleteRejection(flc: FloatingLicenseConfigurationsPage, status: 403 | 404 | 500) {
  const groupName = await flc.navigateToRuntimeGroupConfiguration();
  test.skip(!groupName || await flc.configurationCards.count() === 0, 'No runtime configuration exists for the rejected-delete UI check; reevaluated each run.');
  const page = flc.page;
  const action = flc.configurationCards.first().getByRole('button', { name: /^Actions for / });
  const controls = await action.getAttribute('aria-controls');
  const id = controls?.match(/^flc-details-(\d+)$/)?.[1];
  expect(id, 'The exact configuration identity must be discoverable').toBeDefined();
  const card = flc.configurationCards.filter({ has: page.locator('button[aria-controls="' + controls + '"]') });
  let intercepted = 0;
  let unexpected = 0;
  const guard = async (route: Route) => {
    if (route.request().method() !== 'DELETE') { await route.continue(); return; }
    const url = new URL(route.request().url());
    intercepted++;
    if (!url.pathname.includes('/api/flconfig/') || !url.pathname.endsWith('/' + id)) unexpected++;
    await route.fulfill({ status, contentType: 'application/json', body: JSON.stringify({ message: 'Controlled delete rejection' }) });
  };
  await page.route('**/*', guard);
  try {
    await action.click();
    const [response] = await Promise.all([
      page.waitForResponse(r => r.request().method() === 'DELETE'),
      flc.cardMenuDelete.click(),
    ]);
    expect(response.status()).toBe(status);
    expect(intercepted).toBe(1);
    expect(unexpected, 'No other delete target may be requested').toBe(0);
    await test.info().attach('controlled-floating-delete-response', { contentType: 'application/json', body: JSON.stringify({ status, intercepted: true, serverMutation: false }) });
    await expect(page.getByRole('status').or(page.getByRole('alert')).filter({ hasText: /delete failed|could not be deleted/i }).first()).toBeVisible();
    await expect(card).toBeVisible();
    await captureEvidence('floating-delete-rejection-' + status);
    await page.reload();
    await flc.expandAll();
    await flc.selectTreeItem(groupName);
    await expect(card, 'Rejected deletion must preserve the same configuration after reload').toBeVisible();
  } finally { await page.unroute('**/*', guard); }
}
