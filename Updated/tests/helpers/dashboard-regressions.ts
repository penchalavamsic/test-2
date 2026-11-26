import { expect, test, type Page } from '@playwright/test';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { captureEvidence } from './step-evidence';
export async function verifyDashboardRegression(page:Page,id:number){
 const d=new SystemUserDashboardPage(page);await d.waitForFullRender();
 const history=[195,197,200,205,236,267].includes(id);
 let historyRecords:any[]=[];
 if(history){const [response]=await Promise.all([page.waitForResponse(r=>r.request().method()==='GET'&&new URL(r.url()).pathname.endsWith('/api/request/processed')),d.enableHistory()]);expect(response.ok()).toBeTruthy();historyRecords=(await response.json()).content||[];await d.waitForInitialHistoryLoad();}
 if([117,119,122,195,197,200,205,236,267].includes(id)){
  if(!history)await expect(d.pendingRequestsCountText).toBeVisible();
  const rows=history?d.processedRecordCards:d.pendingRequestsDataRows;test.skip(await rows.count()===0,'No loaded request records exist for this scenario; evaluated on every run.');
  if(id===267){await d.licenseHistorySwitch.click();await expect(d.pendingSectionSubtitle).toBeVisible();await expect(d.licenseHistorySwitch).not.toBeChecked();await expect(d.pendingRequestsCountText).toBeVisible();}
  else if(id===236){await expect(d.processedSectionSubtitle).toBeVisible();await expect(d.processedCountText).toContainText(/total.*processed/i);await expect(rows.first()).toContainText(/Hardware \/ Created/i);}
  else {
   let query='';let target=rows.first();
   if(id===119){const label=await d.getPendingRequestDeleteButton(target).getAttribute('aria-label');query=label?.match(/LR-\d+/)?.[0]||'';expect(query).toBeTruthy();}
   else if(id===195){const hardware=(await d.getPendingRequestHardwareId(target).innerText()).trim();const record=historyRecords.find(r=>String(r.hardwareId)===hardware);expect(record,'A rendered processed card must correspond to the loaded API record').toBeDefined();expect(record.id).toBeTruthy();query='LR-'+record.id;}
   else {query=(await d.getPendingRequestHardwareId(target).innerText()).replace(/^Hardware ID\s*:?\s*/i,'').replace(/^"|"$/g,'').trim();expect(query).toBeTruthy();}
   const marker=id===119?query:(await d.getPendingRequestHardwareId(target).innerText()).trim();
   await d.licenseSearchInput.fill(query);await expect(rows.first()).toBeVisible();
   if(id===119)await expect(d.getPendingRequestDeleteButton(rows.first())).toHaveAttribute('aria-label','Delete '+query);else await expect(rows.filter({hasText:marker}).first()).toBeVisible();
   if([122,200].includes(id)){await d.licenseSearchInput.focus();await page.keyboard.press('ControlOrMeta+A');await page.keyboard.press('Backspace');await expect(d.licenseSearchInput).toHaveValue('');await expect(rows.first()).toBeVisible();}
   if(id===197){await d.licenseSearchInput.fill('  '+query+'  ');await expect(rows.filter({hasText:marker}).first()).toBeVisible();}
   if(id===205){const texts=await rows.allInnerTexts();expect(texts.length).toBeGreaterThan(0);for(const text of texts)expect(text.toLowerCase()).toContain(query.toLowerCase());}
  }
 }else if([297,314,341,402,410,440,485,541].includes(id)){
  const flow=new ExpiringLicensesFlow(page);await flow.prepareExpiringSection();
  if(id===297){await d.expiringLicensesCard.focus();for(let n=0;n<15;n++){await page.keyboard.press('Tab');if(await d.expirationRadio.evaluate(e=>e===document.activeElement))break;}await expect(d.expirationRadio).toBeFocused();}
  else if(id===314){await expect(d.expirationRadio).toHaveAccessibleName('Expiration');await expect(d.maintenanceRadio).toHaveAccessibleName('Maintenance');await expect(d.expiresBeforeInput).toHaveAccessibleName(/Expires before/i);}
  else if(id===341){await d.expiresBeforeInput.fill('2030-06-15');await d.expiresBeforeInput.focus();await page.keyboard.press('ArrowUp');await expect(d.expiresBeforeInput).toHaveValue(/^\d{4}-\d{2}-\d{2}$/);expect(await d.expiresBeforeInput.inputValue()).not.toBe('2030-06-15');}
  else if(id===402){await d.expiringSearchInput.fill('NO-MATCH-'+Date.now());await expect(d.extendButtons).toHaveCount(0);await expect(page.getByText(/No (matching|results|records|licenses)/i).first()).toBeVisible();}
  else if(id===440){await d.maintenanceRadio.check();await expect(d.maintenanceRadio).toBeChecked();await d.expirationRadio.check();await expect(d.expirationRadio).toBeChecked();await d.expirationRadio.focus();await expect(d.expirationRadio).toBeFocused();}
  else {
   const baseline=await flow.captureSearchBaseline();
   if(id===410){const unique=baseline.records.find(r=>baseline.records.filter(x=>(x.profile+' '+x.hardwareId)===(r.profile+' '+r.hardwareId)).length===1);test.skip(!unique,'No unique Profile and Hardware ID combination is available in loaded expiring records.');await d.expiringSearchInput.fill(unique!.profile+' '+unique!.hardwareId);await expect(d.extendButtons).toHaveCount(1);await expect(d.expiringResultCountText).toContainText(/^\s*1\s*match(?:es)?\b/i);}
   else {const card=d.locateExpiringCardByIdentifier(baseline.data.TEST_EXPIRING_RECORD_IDENTIFIER),button=d.getRecordExtendButton(card);await expect(button).toHaveAccessibleName('Extend');await button.click();await expect(d.extendLicenseDialog).toBeVisible();if(id===541){const input=d.getExtendDialogExpirationDaysInput();await expect(input).toHaveAttribute('type','number');await input.fill('');await input.pressSequentially('abc');await expect(input).toHaveValue('');}await d.closeExtendDialog();}
  }
 }else if([750,751,754,756,759,813].includes(id)){
  await d.floatingConfigsCard.click();const group=page.getByRole('group',{name:'Filter by'}),exp=group.getByRole('radio',{name:'Expiration'}),maint=group.getByRole('radio',{name:'Maintenance'}),date=page.locator('#floating-expires-before');await expect(exp).toBeVisible();
  if([750,751].includes(id)){await date.focus();for(let n=0;n<6;n++){await page.keyboard.press('Shift+Tab');if(await exp.evaluate(e=>e===document.activeElement))break;}await expect(exp).toBeFocused();await expect(exp).toBeChecked();}
  else if(id===813){await expect(date).toHaveAttribute('type','date');await date.fill('');await date.pressSequentially('not-a-date');await expect(date).toHaveValue('');await expect(exp).toBeVisible();}
  else {await maint.check();await expect(maint).toBeChecked();await page.waitForLoadState('networkidle');await maint.focus();await page.keyboard.press(id===756?'ArrowUp':'ArrowLeft');await expect(exp).toBeChecked();await expect(maint).not.toBeChecked();if(id===759)await expect(exp,'Keyboard focus must remain on the selected radio').toBeFocused();}
 }else throw Error('No regression implementation '+id);
 await captureEvidence('dashboard-repaired-regression-'+id);
}
