import { OwnedHubLicense } from './hub-license-crud';
import { randomUUID } from 'crypto';
import { expect, test, type Page, type Request } from '@playwright/test';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { OwnedHubUser, withOwnedHubUser } from './hub-user-crud';
import { captureEvidence } from './step-evidence';

export class OwnedDashboardRequest {
 hardwareId='LIMAS-AUTO-REQUEST-'+randomUUID().slice(0,8);
 id?:number; profile:any; role:any;
 expiration=new Date(Date.now()+120*86400000).toISOString().slice(0,10);
 maintenance=new Date(Date.now()+90*86400000).toISOString().slice(0,10);
 private processed=false; private processingAttempted=false;
 constructor(readonly user:OwnedHubUser){}
 get page(){return this.user.hub.page;}
 get dashboard(){return new SystemUserDashboardPage(this.page);}
 row(){return this.dashboard.pendingRequestsDataRows.filter({has:this.page.getByRole('button',{name:'Delete LR-'+this.id,exact:true})});}
 async create(){
  // The deployed approval flow requires hardware already persisted on an existing license user.
  const prerequisite=new OwnedHubLicense(this.user);await prerequisite.create();this.hardwareId=prerequisite.hardwareId;this.profile=prerequisite.profile;this.role=this.profile.profileRoles[0];await prerequisite.remove();
  this.profile=this.user.runtimeProfiles.find(p=>p.profileRoles?.length);test.skip(!this.profile,'No assignable Profile with a Role exists for the disposable approval request.');this.role=this.profile.profileRoles[0];
  let pending:Request|undefined;const observe=(r:Request)=>{if(r.method()==='GET'&&new URL(r.url()).pathname.endsWith('/api/request/pending'))pending=r;};this.page.on('request',observe);
  try{await this.page.goto('/system-user-dashboard');await expect.poll(()=>Boolean(pending)).toBe(true);}finally{this.page.off('request',observe);}
  const headers=await pending!.allHeaders(),url=new URL(pending!.url());url.pathname=url.pathname.replace(/\/pending$/,'');url.search='';
  const response=await this.page.request.post(url.href,{headers:headers.authorization?{authorization:headers.authorization}:{},data:{userName:null,receivedOn:null,firstName:this.user.firstName,lastName:this.user.lastName,email:this.user.email,company:this.user.company,contact:null,hardwareId:this.hardwareId,featureName:this.profile.name,featureVersion:this.role.name,local:null,reasonofRequest:0,orderNumber:null,otherRequestComments:'Disposable automation request',gdprConsentStatus:2,password:randomUUID(),enabled:true}});
  await test.info().attach('owned-request-fixture-setup',{contentType:'application/json',body:JSON.stringify({method:'POST',path:url.pathname,status:response.status(),purpose:'API fixture setup only; approval/deletion is exercised through UI'})});
  expect(response.ok(),'Disposable request creation must succeed').toBeTruthy();const body=await response.json();this.id=body.id;expect(this.id).toBeGreaterThan(0);await this.loadPending();await captureEvidence('owned-request-persisted-pending');
 }
 async loadPending(){
  await this.page.goto('/system-user-dashboard');await this.dashboard.waitForFullRender();await expect(this.dashboard.pendingRequestsCountText).toBeVisible();
  for(let i=0;i<100;i++){if(await this.row().count())return;const note=this.page.getByText('More requests will load automatically.',{exact:true});if(!(await note.count()))break;const before=await this.dashboard.pendingRequestsDataRows.count();await note.scrollIntoViewIfNeeded();await expect.poll(async()=>await this.dashboard.pendingRequestsDataRows.count()).toBeGreaterThan(before);}
  await expect(this.row(),'Owned request must be present in fresh pending data').toHaveCount(1);
 }
 async openForm(){await this.loadPending();await this.row().getByRole('button',{name:'Approve',exact:true}).click();await expect(this.dashboard.approveFormContainer).toBeVisible();await expect(this.dashboard.approveFormContainer.locator('[id^="approval-group-"]')).toBeVisible();}
 async fillForm(){const d=this.dashboard,p=this.page,form=d.approveFormContainer;await form.locator('[id^="approval-group-"]').click();await p.getByRole('option').first().click();await form.locator('[id^="approval-profile-"]').click();await p.getByRole('option',{name:this.profile.name,exact:true}).click();await form.getByRole('combobox').nth(2).click();await p.getByRole('option',{name:this.role.name,exact:true}).click();await form.locator('input[type=date]').nth(0).fill(this.expiration);await form.locator('input[type=date]').nth(1).fill(this.maintenance);await expect(form.getByRole('button',{name:'Approve Request',exact:true})).toBeEnabled();}
 async approve(){await this.openForm();await this.fillForm();await captureEvidence('owned-request-before-approval');const writes:Request[]=[];const observe=(r:Request)=>{if(r.method()==='PUT'&&/\/api\/(users|request)$/.test(new URL(r.url()).pathname)){writes.push(r);if(new URL(r.url()).pathname.endsWith('/api/request'))this.processingAttempted=true;}};this.page.on('request',observe);
  try{const [response]=await Promise.all([this.page.waitForResponse(r=>r.request().method()==='PUT'&&new URL(r.url()).pathname.endsWith('/api/users')),this.dashboard.approveFormApproveRequestButton.click()]);expect(response.request().postDataJSON().id,'Approval must target the owned Hub user').toBe(this.user.id);await this.user.responseSummary('dashboard-approval-license-update',response);await expect(this.row()).toHaveCount(0);this.processed=true;}finally{this.page.off('request',observe);}
  expect(writes.filter(r=>new URL(r.url()).pathname.endsWith('/api/users'))).toHaveLength(1);expect(writes.filter(r=>new URL(r.url()).pathname.endsWith('/api/request'))).toHaveLength(1);
  const records=await this.user.findFresh();const licenses=(records[0].licenses||[]) as any[];const matches=licenses.filter(l=>(l.hardwareId?.hardwareIdString??l.hardwareId?.hardwareId)===this.hardwareId);expect(matches).toHaveLength(1);expect(matches[0].productProfile.id).toBe(this.profile.id);expect(matches[0].profileRole.id).toBe(this.role.id);expect(new Date(matches[0].expirationDate).toISOString().slice(0,10)).toBe(this.expiration);expect(new Date(matches[0].maintenanceDate).toISOString().slice(0,10)).toBe(this.maintenance);await this.verifyProcessed();await captureEvidence('owned-approval-persisted-license-and-history');
 }
 async dismiss(){if(this.processingAttempted)throw Error('Processing already attempted; inspect failure before repeating.');await this.loadPending();this.processingAttempted=true;await captureEvidence('owned-request-before-dismiss');const [response]=await Promise.all([this.page.waitForResponse(r=>r.request().method()==='PUT'&&new URL(r.url()).pathname.endsWith('/api/request')),this.row().getByRole('button',{name:'Delete LR-'+this.id,exact:true}).click()]);expect(response.request().postDataJSON().id).toBe(this.id);await this.user.responseSummary('dashboard-request-mark-processed',response);await expect(this.row()).toHaveCount(0);this.processed=true;await this.verifyProcessed();}
 async verifyProcessed(){
  await this.page.goto('/system-user-dashboard');await this.dashboard.waitForFullRender();await expect(this.row()).toHaveCount(0);
  const [response]=await Promise.all([this.page.waitForResponse(r=>r.request().method()==='GET'&&new URL(r.url()).pathname.endsWith('/api/request/processed')),this.dashboard.enableHistory()]);expect(response.ok()).toBeTruthy();await this.dashboard.waitForInitialHistoryLoad();
  const first=await response.json();const headers=await response.request().allHeaders();let found=first.content?.find((r:any)=>r.id===this.id);const base=new URL(response.url());
  // Newly processed records may be at the end of the server's ascending history. Read real pages; never inject UI results.
  for(let offset=0;!found&&offset<5;offset++){const pageNumber=first.totalPages-1-offset;if(pageNumber<=0)break;const url=new URL(base);url.searchParams.set('page',String(pageNumber));const reply=await this.page.request.get(url.href,{headers:headers.authorization?{authorization:headers.authorization}:{}});expect(reply.ok()).toBeTruthy();const data=await reply.json();found=data.content?.find((r:any)=>r.id===this.id);}
  expect(found,'The owned request must persist in the server processed-history endpoint').toBeDefined();expect(found.hardwareId).toBe(this.hardwareId);expect(found.email).toBe(this.user.email);expect(found.processedOn).toBeTruthy();await test.info().attach('owned-request-history-verification',{contentType:'application/json',body:JSON.stringify({id:this.id,processedOn:found.processedOn,verification:'Fresh processed-history API record; UI history shell visible. Other history pages are not claimed to be rendered.'})});await captureEvidence('processed-history-view-and-verified-owned-record');
 }
 async cleanup(){
  if(this.id&&!this.processed&&!this.processingAttempted)await this.dismiss();
  const records=await this.user.findFresh();if(records.length!==1)return;const licenses=(records[0].licenses||[]) as any[];const own=licenses.filter(l=>(l.hardwareId?.hardwareIdString??l.hardwareId?.hardwareId)===this.hardwareId);
  for(const license of own){if(!(await this.user.card().getAttribute('class'))?.includes('ring-primary'))await this.user.card().click();const card=this.user.hub.licenseCards.filter({has:this.page.getByText(this.hardwareId,{exact:true})});await expect(card).toHaveCount(1);const [response]=await Promise.all([this.page.waitForResponse(r=>r.request().method()==='DELETE'&&new URL(r.url()).pathname.endsWith('/api/users/'+this.user.id+'/licenses/'+license.id)),card.getByRole('button',{name:'Delete license',exact:true}).click()]);await this.user.responseSummary('dashboard-owned-license-cleanup',response);const fresh=await this.user.findFresh();expect((fresh[0].licenses||[]).some((l:any)=>l.id===license.id)).toBe(false);}
 }
}
export async function exerciseDashboardRequest(page:Page,caseId:string,action:'approve'|'delete'){
 await withOwnedHubUser(new UserLicenseHubPage(page),caseId,async user=>{const request=new OwnedDashboardRequest(user);let failure:unknown;try{await request.create();if(action==='approve')await request.approve();else await request.dismiss();}catch(e){failure=e;await captureEvidence('owned-dashboard-request-failed');}try{await request.cleanup();}catch(e){if(failure)throw Error(String(failure)+'\nOwned request cleanup: '+String(e));throw e;}if(failure)throw failure;});
}
