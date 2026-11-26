import { expect, test } from '@playwright/test';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';

export async function selectHubUser(hub: UserLicenseHubPage, index = 0) {
  test.skip(await hub.getVisibleUserCount() <= index, 'Not enough runtime users are available for this selection check; reevaluated each run.');
  if (!(await hub.isUserCardSelected(index))) await hub.selectUserByIndex(index);
  await expect.poll(() => hub.getSelectedUserCardIndex()).toBe(index);
  await hub.verifyLicenseCountMatchesBadge(index);
}
export async function verifyHubSelection(hub: UserLicenseHubPage, index: number) {
  await expect(hub.userCards.locator('xpath=self::*[contains(concat(" ",normalize-space(@class)," ")," ring-primary ")]')).toHaveCount(1);
  await hub.verifyLicenseCountMatchesBadge(index);
  if (await hub.getUserCardBadgeCount(index) > 0) await hub.verifyAssignedToMatchesSelection(index);
}
export async function selectLicensedHubUser(hub: UserLicenseHubPage) {
  const visited = new Set<number>();
  while (true) {
    const count = await hub.getVisibleUserCount();
    for (let index = 0; index < count; index++) if (await hub.getUserCardBadgeCount(index) > 0) {
      await selectHubUser(hub, index);
      return index;
    }
    if (!(await hub.nextPageButton.isEnabled())) { test.skip(true, 'No licensed user is present in the accessible user pages; reevaluated each run.'); return -1; }
    const next = await hub.goToNextUserPage();
    expect(visited.has(next), 'Pagination must advance while looking for required data').toBe(false);
    visited.add(next);
  }
}
