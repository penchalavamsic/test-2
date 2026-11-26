import { expect, test, type Page, type Route } from '@playwright/test';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { captureEvidence } from './step-evidence';
/** Hold a real GET response to observe loading, then deliver its unchanged body. No fabricated configuration data. */
export async function verifyFloatingLoading(page:Page,id:number){
 const d=new SystemUserDashboardPage(page);await d.waitForFullRender();await page.waitForLoadState('networkidle');
 if(id===679)await page.emulateMedia({reducedMotion:'reduce'});
 let release!:()=>void;const held=new Promise<void>(r=>release=r);let intercepted=0;const paths:string[]=[];
 const observe=(r:import('@playwright/test').Request)=>{const u=new URL(r.url());if(u.pathname.includes('/api/'))paths.push(u.pathname);};page.on('request',observe);
 const pattern='**/api/flconfig/e/**';const guard=async(route:Route)=>{intercepted++;await held;await route.continue();};await page.route(pattern,guard);
 const responsePromise=page.waitForResponse(r=>r.request().method()==='GET'&&new URL(r.url()).pathname.includes('/api/flconfig/e/'));
 void responsePromise.catch(()=>{});
 try{
  await d.floatingConfigsCard.click();await expect.poll(()=>intercepted).toBeGreaterThan(0);
  const heading=page.getByRole('heading',{name:'Expiring Floating Configurations',exact:true});await expect(heading).toBeVisible();
  const section=heading.locator('xpath=ancestor::div[contains(concat(" ", normalize-space(@class), " "), " border-border ")][1]');const spinner=section.locator('svg.animate-spin').first();await expect(spinner).toBeVisible();
  const count=page.getByText(/\d+\s*loaded\s*[·•]\s*\d+\s*total configurations/i);
  if(id===668)await expect(spinner.locator('xpath=..').locator('xpath=ancestor-or-self::div[contains(@class,"min-h-36")]').first()).toBeVisible();
  if([669,701].includes(id))await expect(count).toBeHidden();
  if(id===673)expect(await spinner.getAttribute('role')).toBeNull();
  if(id===674)await expect(spinner).toHaveAccessibleName('');
  if(id===675)expect(await section.getAttribute('aria-busy')).toBeNull();
  if(id===676)await expect(section.locator('[role="status"],[aria-live]')).toHaveCount(0);
  if([677,678].includes(id)){expect(await spinner.getAttribute('tabindex')).not.toBe('0');await page.keyboard.press('Tab');expect(await spinner.evaluate(el=>el===document.activeElement)).toBe(false);}
  if(id===679)expect(await spinner.evaluate(el=>getComputedStyle(el).animationName)).not.toBe('none');
  if(id===680){await expect(spinner).toHaveText('');await expect(spinner).toHaveClass(/animate-spin/);}
  if(id===683)await expect(heading.locator('svg')).toBeVisible();
  if(id>=673&&id<=680)test.info().annotations.push({type:'characterization',description:'Observed deployed loading markup; this result is not an accessibility-compliance claim.'});
  await captureEvidence('floating-loading-visible-'+id);release();const response=await responsePromise;expect(response.ok()).toBeTruthy();const body=await response.json();expect(Array.isArray(body.content)).toBe(true);
  await expect(spinner).toBeHidden();await expect(count).toBeVisible();
  const numbers=(await count.innerText()).match(/(\d+)\s*loaded\s*[·•]\s*(\d+)\s*total configurations/i);expect(numbers).not.toBeNull();expect(Number(numbers![1])).toBe(body.content.length);expect(Number(numbers![2])).toBe(body.totalElements);
  if(body.content.length===0)await expect(page.getByText('No expiring floating configurations found',{exact:true})).toBeVisible();else await expect(section.getByRole('button',{name:'Extend',exact:true})).toHaveCount(body.content.length);
  if(id===704)expect(paths.filter(p=>!p.includes('/api/flconfig/')),'Only the selected configuration endpoint should be triggered by the settled card transition').toEqual([]);
  await test.info().attach('floating-loading-live-response',{contentType:'application/json',body:JSON.stringify({status:response.status(),loaded:body.content.length,total:body.totalElements,delayedWithoutChangingResponse:true})});await captureEvidence('floating-loading-settled-'+id);
 }finally{release();await page.unroute(pattern,guard);page.off('request',observe);}
 if(id===715){const before=intercepted;await page.goto('/system-user-dashboard');await d.waitForFullRender();const [reply]=await Promise.all([page.waitForResponse(r=>r.request().method()==='GET'&&new URL(r.url()).pathname.includes('/api/flconfig/e/')),d.floatingConfigsCard.click()]);expect(reply.ok()).toBe(true);expect(intercepted).toBe(before);await expect(page.getByText(/total configurations/i)).toBeVisible();}
}
