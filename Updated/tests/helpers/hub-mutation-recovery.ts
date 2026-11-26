import { expect, test, type Route } from '@playwright/test';
import { randomUUID } from 'crypto';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';
import { selectLicensedHubUser } from './hub-selection';
import { captureEvidence } from './step-evidence';
/** Controlled client error handling, not backend validation/permission coverage. Every write is intercepted. */
export async function verifyHubMutationRejection(hub: UserLicenseHubPage, mode: 'add' | 'delete', status: number | 'network', message = 'Controlled license operation rejected') {
 const page=hub.page; await hub.goto(); const selected=await selectLicensedHubUser(hub);
 const email=(await hub.userCards.nth(selected).locator('p').first().innerText()).trim();
 const hardwareId=await hub.getFirstVisibleHardwareId();const before=await hub.licenseCards.first().innerText();const originalProfile=(await hub.getLicensePanelRuntimeData())[0].profile;
 let calls=0;let requestPath='';let nativeDialogs=0;
 const dismiss=async(d:import('@playwright/test').Dialog)=>{nativeDialogs++;await d.dismiss();};page.on('dialog',dismiss);
 const guard=async(route:Route)=>{const r=route.request();if(!['POST','PUT','PATCH','DELETE'].includes(r.method())){await route.continue();return;}calls++;requestPath=new URL(r.url()).pathname;expect(r.method()).toBe(mode==='delete'?'DELETE':'PUT');expect(requestPath).toMatch(mode==='delete'?/\/api\/users\/\d+\/licenses\/\d+$/:/\/api\/users$/);if(status==='network')await route.abort('failed');else await route.fulfill({status,contentType:'application/json',body:JSON.stringify({message})});};
 await page.route('**/*',guard);
 try {
  if(mode==='add'){
   await hub.openEditLicenseDialog();const edit=hub.getEditLicenseDialog();const profile=(await edit.getByRole('combobox').first().innerText()).trim(),role=(await edit.getByRole('combobox').last().innerText()).trim();await hub.closeEditLicenseDialog();
   await hub.openAddLicenseDialog();const dialog=hub.getAddLicenseDialog();await dialog.getByPlaceholder('e.g., HW001').fill(message.includes('duplicate')?hardwareId:'CONTROLLED-'+randomUUID().slice(0,8));
   await dialog.getByRole('combobox').first().click();await page.getByRole('option',{name:profile,exact:true}).click();await dialog.getByRole('combobox').last().click();await page.getByRole('option',{name:role,exact:true}).click();
   await dialog.locator('#expirationDate').fill(new Date(Date.now()+120*86400000).toISOString().slice(0,10));await dialog.locator('#maintenanceDate').fill(new Date(Date.now()+90*86400000).toISOString().slice(0,10));
   await dialog.getByRole('button',{name:'Save',exact:true}).click();await expect.poll(()=>calls).toBe(1);await expect(dialog).toBeVisible();await expect(dialog.getByRole('button',{name:'Save',exact:true})).toBeEnabled();
  }else {await hub.licenseCards.first().getByRole('button',{name:'Delete license',exact:true}).click();await expect.poll(()=>calls).toBe(1);expect(nativeDialogs,'Delete must reach its request without an assumed confirmation step').toBe(0);}
  await expect(page.getByRole('status').or(page.getByRole('alert')).filter({hasText:/error|failed|rejected|network/i}).first()).toBeVisible();
  await captureEvidence('controlled-'+mode+'-rejection-'+status);
  await test.info().attach('controlled-hub-rejection',{contentType:'application/json',body:JSON.stringify({mode,status,calls,requestPath,intercepted:true,serverMutation:false})});
  if(mode==='add')await hub.closeAddLicenseDialog();
 }finally{await page.unroute('**/*',guard);page.off('dialog',dismiss);}
 await hub.goto();const [response]=await Promise.all([page.waitForResponse(r=>r.request().method()==='GET'&&new URL(r.url()).pathname.endsWith('/api/users/f')&&new URL(r.url()).searchParams.get('eMail')===email),hub.userSearchInput.fill(email)]);expect(response.ok()).toBeTruthy();await hub.waitForHubLoad();const card=hub.userCards.filter({has:page.getByText(email,{exact:true})});await expect(card).toHaveCount(1);if(!(await card.getAttribute('class'))?.includes('ring-primary'))await card.click();await expect.poll(()=>hub.licenseCards.filter({has:page.getByText(hardwareId,{exact:true})}).filter({has:page.getByText(originalProfile!,{exact:true})}).first().innerText()).toBe(before);await captureEvidence('controlled-'+mode+'-unchanged-server-record');
}
