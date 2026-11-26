import { expect, test } from '@playwright/test';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';

export async function filterHubByRuntimeGroup(hub: UserLicenseHubPage) {
  test.skip(await hub.getVisibleUserCount() === 0, 'No runtime user is available to choose a populated group; reevaluated each run.');
  const group = await hub.getFirstVisibleUserGroup();
  await hub.openUserFilters();
  const groups = await hub.getGroupOptionTexts();
  expect(groups, 'The runtime user group must be selectable').toContain(group);
  await hub.selectGroupOption(group);
  const [response] = await Promise.all([
    hub.page.waitForResponse(r => r.request().method() === 'GET' && new URL(r.url()).pathname.endsWith('/api/users/f')),
    hub.clickSelectButton(),
  ]);
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  expect(Array.isArray(data.content)).toBeTruthy();
  const ids = new Set((new URL(response.url()).searchParams.get('groupids') || '').split(',').map(Number));
  expect(ids.size).toBeGreaterThan(0);
  for (const user of data.content) expect(ids.has(user.group?.id), 'Every returned user must belong to a requested group').toBe(true);
  await expect.poll(() => hub.getVisibleUserCardNames()).toEqual(data.content.map((u: any) => [u.firstName,u.lastName].filter(Boolean).join(' ').trim()));
  await expect.poll(() => hub.getFiltersBadgeCount()).toBe(1);
  return group;
}
export async function searchHubByRuntimeName(hub: UserLicenseHubPage, type = false) {
  const names = await hub.getVisibleUserCardNames();
  test.skip(names.length === 0, 'No runtime user name is available for search; reevaluated each run.');
  const query = names[0].trim().split(/\s+/)[0];
  expect(query.length).toBeGreaterThan(0);
  const [response] = await Promise.all([
    hub.page.waitForResponse(r => r.request().method() === 'GET' && new URL(r.url()).pathname.endsWith('/api/users/f') && new URL(r.url()).searchParams.get('firstName') === query),
    type ? hub.getUserSearchInputLocator().pressSequentially(query, { delay: 30 }) : hub.setUserSearch(query),
  ]);
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  expect(data.content.length).toBeGreaterThan(0);
  for (const user of data.content) expect(user.firstName.toLowerCase()).toContain(query.toLowerCase());
  await expect.poll(() => hub.getVisibleUserCardNames()).toEqual(data.content.map((u: any) => [u.firstName,u.lastName].filter(Boolean).join(' ').trim()));
  return query;
}
