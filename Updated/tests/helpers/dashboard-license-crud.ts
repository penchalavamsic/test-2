import { expect, test, type Page } from '@playwright/test';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { withOwnedHubLicense } from './hub-license-crud';
import { captureEvidence } from './step-evidence';

export type ExtensionMode = 'expiration-date' | 'expiration-days' | 'sync-date' | 'sync-days' | 'maintenance-date' | 'maintenance-days' | 'both-dates';
const plusDays = (value: string, days: number) => new Date(Date.parse(value + 'T12:00:00Z') + days * 86400000).toISOString().slice(0, 10);
/** Exercise the deployed Dashboard on a license created and owned by this test. */
export async function exerciseDashboardExtension(page: Page, caseId: string, mode: ExtensionMode) {
  const hub = new UserLicenseHubPage(page);
  await withOwnedHubLicense(hub, caseId, async license => {
    const dashboard = new SystemUserDashboardPage(page);
    await page.goto('/system-user-dashboard');
    await dashboard.waitForFullRender();
    const [listing]=await Promise.all([page.waitForResponse(r=>r.request().method()==='GET'&&new URL(r.url()).pathname.endsWith('/api/users/f')&&Boolean(new URL(r.url()).searchParams.get('expirationDate'))),dashboard.selectExpiringLicenses()]);expect(listing.ok()).toBeTruthy();const data=await listing.json();const found=data.content?.some((u:any)=>u.id===license.user.id&&u.licenses?.some((l:any)=>l.id===license.id));await test.info().attach('dashboard-owned-license-discovery',{contentType:'application/json',body:JSON.stringify({userId:license.user.id,licenseId:license.id,cutoff:new URL(listing.url()).searchParams.get('expirationDate'),total:data.totalElements,last:data.last,found})});if(data.last&&!found)throw Error('Application discovery failure: the complete Dashboard expiration query omits the freshly persisted owned license in an included group. Extension cannot safely proceed.');
    const search = page.getByPlaceholder(/Search by name, email, profile, company, or Hardware ID/);
    await expect(search).toBeVisible();
    await search.fill(license.hardwareId);
    const card = dashboard.locateExpiringCardByHardwareId(license.hardwareId);
    await expect(card, 'The freshly persisted expired owned license must be discoverable in the Dashboard').toBeVisible({ timeout: 60000 });
    await card.getByRole('button', { name: 'Extend', exact: true }).click();
    await expect(dashboard.extendLicenseDialog).toBeVisible();
    const expiration = plusDays(license.expiration, 30);
    const maintenance = plusDays(license.maintenance, 30);
    if (mode === 'expiration-date' || mode === 'sync-date' || mode === 'both-dates') {
      await dashboard.getExtendDialogExpirationDateInput().fill(expiration);
      license.expiration = expiration;
    }
    if (mode === 'expiration-days' || mode === 'sync-days') {
      await dashboard.getExtendDialogExpirationDaysInput().fill('30');
      license.expiration = expiration;
    }
    if (mode === 'maintenance-date' || mode === 'both-dates') {
      await dashboard.getExtendDialogMaintenanceDateInput().fill(maintenance);
      license.maintenance = maintenance;
    }
    if (mode === 'maintenance-days') {
      await dashboard.getExtendDialogMaintenanceDaysInput().fill('30');
      license.maintenance = maintenance;
    }
    if (mode === 'sync-date' || mode === 'sync-days') {
      await dashboard.getExtendDialogSyncCheckbox().check();
      license.maintenance = mode === 'sync-days' ? maintenance : license.expiration;
    }
    await captureEvidence('owned-dashboard-license-before-extension');
    const [response] = await Promise.all([
      page.waitForResponse(r => r.request().method() === 'PUT' && new URL(r.url()).pathname.endsWith('/api/users'), { timeout: 60000 }),
      dashboard.getExtendDialogApplyButton().click(),
    ]);
    const payload = response.request().postDataJSON();
    expect(payload.id, 'Only the disposable license user may be updated').toBe(license.user.id);
    expect(payload.licenses).toHaveLength(1);
    expect(payload.licenses[0].id).toBe(license.id);
    await test.info().attach('dashboard-extension-response', { contentType: 'application/json', body: JSON.stringify({ method: 'PUT', path: new URL(response.url()).pathname, status: response.status(), ownedEmail: license.user.email, licenseId: license.id, mode }) });
    expect(response.ok(), 'Dashboard extension returned HTTP ' + response.status()).toBeTruthy();
    await expect(dashboard.extendLicenseDialog).toBeHidden();
    await expect(page.getByRole('status').or(page.getByRole('alert')).filter({hasText:/License updated|License dates updated successfully/}).first()).toBeVisible();
    await expect(card).toBeVisible();
    await captureEvidence('dashboard-extension-refreshed-card');
    await license.verifySaved();
    await captureEvidence('owned-dashboard-extension-persisted');
  }, { expirationDays: -7, maintenanceDays: -10 });
}
