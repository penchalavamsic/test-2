import { test, expect } from '../tests/fixtures/observed-test';
import { recordEvidence, captureEvidence } from '../tests/helpers/step-evidence';
import { AuthSession, isExpiring, tokenExpiry, restoreSession, type AuthSnapshot } from '../tests/helpers/auth-session';
import { performKeycloakLogin, getProfile, resolveProfileName } from '../tests/helpers/auth';
import type { Browser } from '@playwright/test';
import { test as authenticatedTest } from '../tests/fixtures/base';
import { SystemUserDashboardPage } from '../tests/pages/system-user-dashboard.page';
import { UserLicenseHubPage } from '../tests/pages/user-license-hub.page';
import { loadCaseCatalog, findPlans } from '../tests/helpers/case-catalog';

test.beforeEach(async ({ context }) => {
  await context.route('**/*', route => route.abort());
});

test('offline: each action and assertion captures evidence without hiding failures', async ({ page }, info) => {
  await page.setContent('<button onclick="this.textContent=\'Done\'">Start</button>');
  const initial = info.attachments.length;
  await recordEvidence('click', () => page.getByRole('button', { name: 'Start' }).click());
  await recordEvidence('assert', () => expect(page.getByRole('button')).toHaveText('Done'));
  const sentinel = new Error('original action failure');
  let caught: unknown;
  try { await recordEvidence('failed-action', () => { throw sentinel; }); } catch (error) { caught = error; }
  expect(caught).toBe(sentinel);
  expect(info.attachments.slice(initial).filter(a => a.contentType === 'image/png')).toHaveLength(3);
  await page.close();
  await captureEvidence('closed-page', info, page);
  expect(info.attachments.at(-1)?.name).toContain('unavailable');
});

test('offline: a five-minute token passes, near-expired and expired tokens do not', async () => {
  const previous = process.env.LIMAS_AUTH_EXPIRY_MARGIN_MS;
  process.env.LIMAS_AUTH_EXPIRY_MARGIN_MS = '30000';
  try {
    const now = Date.now();
    const session = { 'oidc.user:fixture': JSON.stringify({ expires_at: Math.floor((now + 300000) / 1000) }) };
    expect(isExpiring(tokenExpiry(session), now)).toBe(false);
    expect(isExpiring(now + 29000, now)).toBe(true);
    expect(isExpiring(now - 1, now)).toBe(true);
    expect(tokenExpiry({ unrelated: 'text' })).toBeNull();
  } finally {
    if (previous === undefined) delete process.env.LIMAS_AUTH_EXPIRY_MARGIN_MS;
    else process.env.LIMAS_AUTH_EXPIRY_MARGIN_MS = previous;
  }
});

test('offline: session restoration is origin-scoped and preserves refreshed values', async ({ context, page }) => {
  // All HTTP requests are fulfilled locally; no application or identity provider is contacted.
  await context.route('**/*', route => route.fulfill({ contentType: 'text/html', body: '<h1>Offline fixture</h1>' }));
  const snapshot: AuthSnapshot = { state: { cookies: [], origins: [] }, session: { fixture: 'initial' }, origin: 'http://application.invalid', expiresAt: null };
  await restoreSession(context, snapshot);
  await page.goto('http://identity.invalid');
  expect(await page.evaluate(() => sessionStorage.getItem('fixture'))).toBeNull();
  await page.goto('http://application.invalid');
  expect(await page.evaluate(() => sessionStorage.getItem('fixture'))).toBe('initial');
  await page.evaluate(() => sessionStorage.setItem('fixture', 'refreshed'));
  await page.reload();
  expect(await page.evaluate(() => sessionStorage.getItem('fixture'))).toBe('refreshed');
});

test('offline: pending-request locators select DIV data rows and exclude headers', async ({ page }) => {
  await page.setContent(`<div class="w-full min-w-0 rounded-lg border border-border">
    <div class="border-b">User Feature Hardware / Created Actions</div>
    <div class="border-b last:border-b-0">Runtime user <button>Approve</button></div>
    <div class="border-b last:border-b-0">Another user <button>Approve</button></div>
  </div>`);
  const dashboard = new SystemUserDashboardPage(page);
  await expect(dashboard.licenseRequestTable).toBeVisible();
  await expect(dashboard.licenseRequestRows).toHaveCount(2);
  await expect(dashboard.approveButtons).toHaveCount(2);
  await expect(dashboard.pendingRequestsHeaderRow).toHaveCount(1);
});

test('offline: restored user-dialog methods resolve archived field structure', async ({ page }) => {
  await page.setContent(`<div role="dialog" aria-label="Add User" aria-describedby="description">
    <h2>Add User</h2><p id="description">Add a new user to the system</p>
    <label>First Name *<input></label><label>Last Name *<input></label><label>Email *<input></label>
    <button role="combobox">English</button><button role="combobox">Runtime group</button><button role="combobox">Pending</button>
    <button disabled>Save</button></div>`);
  const hub = new UserLicenseHubPage(page);
  await hub.fillAddUserFirstName('runtime-value');
  expect(await hub.getAddUserField('First Name *').inputValue()).toBe('runtime-value');
  expect(await hub.getAddUserGroupSelectedText()).toBe('Runtime group');
  expect(await hub.getAddUserDialogDescription()).toBe('Add a new user to the system');
  expect(await hub.isAddUserSaveEnabled()).toBe(false);
});

test('offline: authoritative workbook and exact plan lookup are readable', async () => {
  const catalog = await loadCaseCatalog();
  expect(catalog.get('LIMAS-SUD-196')?.['Expected Result']).toContain('case-insensitive');
  expect(findPlans('LIMAS-SUD-196').every(file => /LIMAS-SUD-196-/.test(file))).toBe(true);
  expect(findPlans('LIMAS-SUD-196')).toHaveLength(1);
});

for (const sso of [false, true]) {
  test(`offline: Keycloak login handles ${sso ? 'direct SSO' : 'password form'}`, async ({ context, page }) => {
    const profile = resolveProfileName();
    const credentials = getProfile(profile);
    const before = [process.env[credentials.usernameEnv], process.env[credentials.passwordEnv]];
    process.env[credentials.usernameEnv] = 'offline-user';
    process.env[credentials.passwordEnv] = 'offline-password';
    try {
      await context.route('**/*', route => {
        const pathname = new URL(route.request().url()).pathname;
        const body = pathname === '/system-user-dashboard' ? '<h1>System User Dashboard</h1>'
          : pathname === '/auth' ? `<h1>Sign in to your account</h1><label>Username or email<input></label><label>Password<input type="password"></label><button onclick="location.href='/system-user-dashboard'">Sign In</button>`
          : `<button onclick="location.href='${sso ? '/system-user-dashboard' : '/auth'}'">Sign In</button>`;
        return route.fulfill({ contentType: 'text/html', body });
      });
      await page.goto('http://login-fixture.invalid');
      await performKeycloakLogin(page, profile);
      await expect(page.getByRole('heading', { name: 'System User Dashboard' })).toBeVisible();
    } finally {
      for (const [key, value] of [[credentials.usernameEnv, before[0]], [credentials.passwordEnv, before[1]]] as const) {
        if (value === undefined) delete process.env[key]; else process.env[key] = value;
      }
    }
  });
}

test('offline: an expired worker session renews before the next test', async ({ browser }) => {
  const profile = resolveProfileName();
  const credentials = getProfile(profile);
  const replacements = { LIMAS_BASE_URL: 'http://renewal-fixture.invalid', [credentials.usernameEnv]: 'offline-user', [credentials.passwordEnv]: 'offline-password' };
  const before = Object.fromEntries(Object.keys(replacements).map(key=>[key,process.env[key]]));
  Object.assign(process.env, replacements);
  let logins = 0;
  // Route each isolated refresh context before opening a page.
  const interceptedBrowser = { newContext: async (options: Parameters<Browser['newContext']>[0]) => {
    const context = await browser.newContext(options);
    await context.route('**/*', route => {
      const pathname = new URL(route.request().url()).pathname;
      if (pathname === '/system-user-dashboard') logins++;
      const session = JSON.stringify({ expires_at: Math.floor(Date.now()/1000) + 300 });
      const body = pathname === '/system-user-dashboard'
        ? `<h1>System User Dashboard</h1><script>sessionStorage.setItem('oidc.user:fixture',${JSON.stringify(session)})</script>`
        : `<button onclick="location.href='/system-user-dashboard'">Sign In</button>`;
      return route.fulfill({ contentType: 'text/html', body });
    });
    return context;
  } } as Browser;
  try {
    const manager = new AuthSession(interceptedBrowser, 1);
    const first = await manager.current();
    expect(await manager.current()).toBe(first);
    expect(logins).toBe(1);
    first.expiresAt = Date.now() - 1;
    const renewed = await manager.current();
    expect(logins).toBe(2);
    expect(renewed).not.toBe(first);
    expect(isExpiring(renewed.expiresAt)).toBe(false);
  } finally {
    for (const [key,value] of Object.entries(before)) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
  }
});

const inheritedTest = authenticatedTest.extend({
  authSession: [async ({}, use) => {
    await use({ current: async () => ({ state: { cookies: [], origins: [] }, session: {}, origin: 'http://dashboard-fixture.invalid', expiresAt: Date.now() + 300000 }) } as unknown as AuthSession);
  }, { scope: 'worker' }],
  context: async ({ context }, use) => {
    await context.route('**/*', route => route.fulfill({ contentType: 'text/html', body: '<h1>System User Dashboard</h1>' }));
    await use(context);
  },
});
inheritedTest.use({ baseURL: 'http://dashboard-fixture.invalid' });
inheritedTest('offline: inherited auth fixture and workbook evidence [LIMAS-SUD-001]', async ({ page, authenticatedPage }, info) => {
  expect(authenticatedPage.url).toBe('http://dashboard-fixture.invalid/system-user-dashboard');
  await expect(page.getByRole('heading', { name: 'System User Dashboard' })).toBeVisible();
  expect(info.attachments.some(item => item.name === 'Workbook test plan')).toBe(true);
  expect(info.attachments.some(item => item.name.startsWith('Atomic Test Plan'))).toBe(true);
});


test('offline: important screenshots keep milestones, every failure and final state', async ({ page }, info) => {
  const previous = process.env.PLAYWRIGHT_SCREENSHOT_MODE;
  process.env.PLAYWRIGHT_SCREENSHOT_MODE = 'important';
  try {
    await page.setContent('<h1>Example page</h1><input aria-label="Search"><button id="open">Open form</button><div role="dialog" hidden><h2>Example form</h2></div>');
    await page.locator('#open').evaluate(el => el.addEventListener('click', () => document.querySelector('[role="dialog"]')!.removeAttribute('hidden')));
    const screenshots = () => info.attachments.filter(a => a.contentType === 'image/png').length;
    const before = screenshots();
    await recordEvidence('assert-page-ready', () => expect(page.getByRole('heading', { name: 'Example page' })).toBeVisible());
    for (const value of ['a', 'ab', 'abc']) await recordEvidence('action-fill-search', () => page.getByRole('textbox').fill(value));
    expect(screenshots() - before).toBe(1);
    await recordEvidence('action-open-form', () => page.locator('#open').click());
    expect(screenshots() - before).toBe(2);
    const sentinel = new Error('original important-mode failure');
    let caught: unknown;
    try { await recordEvidence('failed-check', () => { throw sentinel; }); } catch (error) { caught = error; }
    expect(caught).toBe(sentinel);
    expect(screenshots() - before).toBe(3);
    await captureEvidence('final-state', info, page);
    expect(screenshots() - before).toBe(4);
  } finally {
    if (previous === undefined) delete process.env.PLAYWRIGHT_SCREENSHOT_MODE;
    else process.env.PLAYWRIGHT_SCREENSHOT_MODE = previous;
  }
});
