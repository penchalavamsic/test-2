import type { Page, Route } from '@playwright/test';
import { expect, test } from '../fixtures/base';
import { ReportsPage } from '../pages/reports.page';
import { recordEvidence, captureEvidence } from './step-evidence';

type ExportFailure = { name: string; status?: number; body?: string; abort?: boolean };

/** Fail only this browser's export data request; never inject an outage into the live backend. */
export async function verifyStandardExportFailures(page: Page, scenarios: ExportFailure[]): Promise<void> {
  const reports = new ReportsPage(page);
  await reports.openReports();
  for (const [index, scenario] of scenarios.entries()) {
    await test.step(scenario.name, async () => {
      if (index) await page.reload();
      await reports.waitForStandardLicenseSettled();
      const initialUrl = page.url();
      let intercepted = 0;
      let downloads = 0;
      const crashes: string[] = [];
      const onDownload = () => { downloads++; };
      const onError = (error: Error) => { crashes.push(error.message); };
      // The deployed export builds Excel in the browser after fetching all pages with size=500.
      const matches = (url: URL) => url.pathname.endsWith('/api/report/allstandardlicenses') && url.searchParams.get('size') === '500';
      const handler = async (route: Route) => {
        intercepted++;
        if (scenario.abort) await route.abort('failed');
        else await route.fulfill({status: scenario.status ?? 200, contentType:'application/json', body:scenario.body ?? JSON.stringify({message:'Controlled export failure'})});
      };
      page.on('download', onDownload);
      page.on('pageerror', onError);
      await page.route(matches, handler);
      try {
        await recordEvidence('export-with-controlled-' + scenario.name, () => reports.exportExcelButton.click());
        await expect.poll(() => intercepted, {message:'Export must use the intercepted request'}).toBeGreaterThan(0);
        await expect(page.getByText('Export failed', {exact:true})).toBeVisible();
        await expect(reports.exportExcelButton).toBeEnabled();
        await expect(page).toHaveURL(initialUrl);
        await captureEvidence('controlled-export-error-' + scenario.name);
        await page.waitForTimeout(600);
        expect(downloads, 'An unsuccessful export must not save a workbook').toBe(0);
        expect(intercepted, 'No automatic export retry without user action').toBe(1);
        expect(crashes, 'Export failure must be handled by the application').toEqual([]);
      } finally {
        await page.unroute(matches, handler);
        page.removeListener('download', onDownload);
        page.removeListener('pageerror', onError);
      }
    });
  }
}

/** A browser-only failure; the server and other users remain unaffected. */
export async function installConfigurationError(page: Page, endpoint: string): Promise<() => Promise<void>> {
  const match = (url: URL) => url.pathname.endsWith(endpoint);
  const handler = (route: Route) => route.fulfill({status:500,contentType:'application/json',body:JSON.stringify({message:'Controlled report failure'})});
  await page.route(match, handler);
  return () => page.unroute(match, handler);
}

export async function verifyFloatingExportFailure(page: Page, status: number): Promise<void> {
  const reports = new ReportsPage(page);
  await reports.openReports();
  await reports.selectFloatingLicensesReport();
  await reports.selectFloatingLicenseDeletedMode();
  const matches = (url: URL) => url.pathname.endsWith(reports.floatingLicensesDeletedApiPath) || /export/i.test(url.pathname);
  let intercepted=0, downloads=0;
  const crashes: string[]=[];
  const onDownload=()=>{downloads++};
  const onError=(error: Error)=>{crashes.push(error.message)};
  const handler=async(route: Route)=>{intercepted++;await route.fulfill({status,contentType:'application/json',body:JSON.stringify({message:'Controlled export failure'})})};
  await page.route(matches,handler);
  page.on('download',onDownload);page.on('pageerror',onError);
  try {
    await recordEvidence('export-with-controlled-'+status,()=>reports.floatingLicenseExportButton.click());
    await expect.poll(()=>intercepted,{timeout:10000,message:'The reviewed server-error scenario requires a real export request; a client-only export cannot receive this HTTP failure'}).toBeGreaterThan(0);
    await expect(page.getByText(/Export failed|Unauthorized|Session expired/i)).toBeVisible();
    await expect(reports.floatingLicenseExportButton).toBeEnabled();
    expect(downloads).toBe(0);expect(crashes).toEqual([]);
  } finally {
    await page.unroute(matches,handler);
    page.removeListener('download',onDownload);page.removeListener('pageerror',onError);
  }
}

export async function installEmptyFloatingActive(page: Page, endpoint: string): Promise<void> {
  await page.route(url=>url.pathname.endsWith(endpoint),async route=>{
    const response=await route.fetch();
    expect(response.ok(), 'The actual data endpoint must be healthy before the empty-state fixture is applied').toBe(true);
    const body=await response.json();
    await route.fulfill({response,json:{...body,content:[],totalElements:0,numberOfElements:0,totalPages:0,number:0,first:true,last:true,empty:true}});
  });
}

export async function verifyConfigurationStaleError(page: Page): Promise<void> {
  const reports=new ReportsPage(page);
  const matches=(url: URL)=>url.pathname.endsWith(reports.floatingConfigurationsApiPath);
  let release!:()=>void,held=false,routeDone:Promise<void>|undefined;
  const gate=new Promise<void>(resolve=>release=resolve);
  const handler=(route: Route)=>{
    routeDone=(async()=>{held=true;await gate;await route.fulfill({status:500,contentType:'application/json',body:JSON.stringify({message:'Controlled late Active error'})}).catch(error=>{if(!route.request().failure()&&!page.isClosed())throw error;});})();
    return routeDone;
  };
  await page.route(matches,handler);
  try {
    await reports.floatingConfigurationsCard.click();
    await expect.poll(()=>held).toBe(true);
    const deletedResponse=page.waitForResponse(r=>new URL(r.url()).pathname.endsWith(reports.floatingConfigurationsDeletedApiPath));
    await reports.fcDeletedTab.click();
    const response=await deletedResponse;expect(response.status()).toBe(200);
    const body=await response.json();
    await expect(reports.fcRecordCountText).toHaveText(new RegExp('^'+body.totalElements.toLocaleString('en-US')+' records$'));
    release();if(routeDone)await routeDone;
    await reports.waitForFloatingReportSettled();
    await expect(reports.fcDeletedTab).toHaveAttribute('aria-pressed','true');
    await expect(reports.fcErrorState).toBeHidden();
    await expect(reports.fcRetryButton).toBeHidden();
    expect((await reports.getFloatingConfigurationsDeletedCounts()).total).toBe(body.totalElements);
  } finally {release();if(routeDone)await routeDone;await page.unroute(matches,handler);}
}
