import { expect, test, type Route } from '@playwright/test';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';
import { withOwnedHubLicense } from './hub-license-crud';
import { captureEvidence } from './step-evidence';
export async function verifyHubRefreshRecovery(hub:UserLicenseHubPage){
 await withOwnedHubLicense(hub,'LIMAS-SUD-1408',async license=>{
  const page=hub.page;await license.card().locator('button').first().click();const dialog=hub.getEditLicenseDialog();await expect(dialog).toBeVisible();license.expiration=new Date(Date.now()+180*86400000).toISOString().slice(0,10);await dialog.locator('#expirationDate').fill(license.expiration);
  let committed=false,blockedReads=0;const guard=async(route:Route)=>{const r=route.request(),url=new URL(r.url());if(r.method()==='PUT'&&url.pathname.endsWith('/api/users')){expect(r.postDataJSON().id).toBe(license.user.id);const response=await route.fetch();committed=response.ok();await route.fulfill({response});return;}if(committed&&r.method()==='GET'&&url.pathname.endsWith('/api/users/f')){blockedReads++;await route.fulfill({status:500,contentType:'application/json',body:JSON.stringify({message:'Controlled list refresh failure'})});return;}await route.continue();};
  await page.route('**/*',guard);let failure:unknown;
  try{const [response]=await Promise.all([page.waitForResponse(r=>r.request().method()==='PUT'&&new URL(r.url()).pathname.endsWith('/api/users')),dialog.getByRole('button',{name:'Save',exact:true}).click()]);expect(response.ok()).toBeTruthy();await expect.poll(()=>blockedReads).toBeGreaterThan(0);await expect(page.getByText(/error|failed|unable|could not/i).first(),'A failed refresh must be communicated visibly').toBeVisible();await captureEvidence('hub-saved-update-with-controlled-refresh-failure');}catch(e){failure=e;}finally{await page.unroute('**/*',guard);await test.info().attach('hub-refresh-recovery',{contentType:'application/json',body:JSON.stringify({ownedUpdateCommitted:committed,interceptedReadFailures:blockedReads})});}
  expect(committed,'The owned update must actually succeed').toBe(true);await license.verifySaved();if(failure)throw failure;
 });
}
