import { expect, test, type Page, type Route } from '@playwright/test';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { ExpiringLicensesFlow } from '../flows/expiring-licenses.flow';
import { captureEvidence } from './step-evidence';
/** Verify form validation/pending state with every write blocked. Does not claim live extension success. */
export async function verifyExtensionControl(page:Page,id:number){
 const d=new SystemUserDashboardPage(page),flow=new ExpiringLicensesFlow(page);await flow.prepareExpiringSection();test.skip(await d.extendButtons.count()===0,'No expiring license is available for the extension control check; reevaluated each run.');await d.extendButtons.first().click();await expect(d.extendLicenseDialog).toBeVisible();const dialog=d.extendLicenseDialog;
 const date=(days:number)=>new Date(Date.now()+days*86400000).toISOString().slice(0,10);await d.getExtendDialogExpirationDateInput().fill(date(120));if(id===629)await d.getExtendDialogMaintenanceDateInput().fill(date(150));
 let intercepted=0,release!:()=>void;const pending=new Promise<void>(r=>release=r);
 const guard=async(route:Route)=>{const req=route.request();if(!['POST','PUT','PATCH','DELETE'].includes(req.method())){await route.continue();return;}intercepted++;if(id!==629)await pending;await route.fulfill({status:500,contentType:'application/json',body:JSON.stringify({message:'Controlled rejection after pending-state verification'})});};
 await page.route('**/*',guard);
 try{await d.getExtendDialogApplyButton().click();
  if(id===629){await expect(dialog.getByText('Maintenance date cannot be later than the expiration date.',{exact:true})).toBeVisible();expect(intercepted,'Invalid dates must be rejected before any write').toBe(0);}
  else {await expect.poll(()=>intercepted).toBe(1);const applying=dialog.getByRole('button',{name:/Applying/i});await expect(applying).toBeVisible();await expect(applying).toBeDisabled();if(id===638)await expect(applying).toHaveAccessibleName(/Applying/i);await captureEvidence('extension-pending-state-'+id);release();await expect(dialog.getByRole('button',{name:'Apply Extension',exact:true})).toBeEnabled();await expect(page.getByRole('status').or(page.getByRole('alert')).filter({hasText:/failed|error|rejection/i}).first()).toBeVisible();}
  await captureEvidence('extension-guarded-control-'+id);await test.info().attach('extension-control-check',{contentType:'application/json',body:JSON.stringify({intercepted,serverMutation:false,scope:id===629?'date-validation':'pending-state-and-recovery'})});
 }finally{release();await page.unroute('**/*',guard);if(await dialog.isVisible())await d.closeExtendDialog();}
}
