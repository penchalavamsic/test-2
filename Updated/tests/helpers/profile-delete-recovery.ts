import { expect, test, type Route } from '@playwright/test';
import { ProfilesPage } from '../pages/profiles.page';
import { captureEvidence } from './step-evidence';

/** Controlled client error handling only; this does not test server authorization enforcement. */
export async function verifyProfileDeleteRejection(p: ProfilesPage, status: 403 | 404 | 500) {
  const count = await p.getCardCount();
  test.skip(count === 0, 'No Profile exists for a controlled rejected-delete UI check; reevaluated on each run.');
  const name = await p.getCardHeading(p.profileCards.first());
  const before = await p.profileCards.locator('h3').allTextContents();
  let intercepted = 0;
  const pattern = (url: URL) => /\/api\/profiles\/[^/]+$/.test(url.pathname);
  const guard = async (route: Route) => {
    if (route.request().method() !== 'DELETE') { await route.continue(); return; }
    intercepted++;
    await route.fulfill({ status, contentType: 'application/json', body: JSON.stringify({ message: `Controlled deletion rejection (${status})` }) });
  };
  await p.page.route(pattern, guard);
  try {
    await p.cardDeleteButton(p.profileCards.first()).click();
    await captureEvidence('controlled-profile-delete-' + status + '-confirmation');
    const [response] = await Promise.all([
      p.page.waitForResponse(r => r.request().method() === 'DELETE' && pattern(new URL(r.url()))),
      p.deleteConfirmDeleteButton.click(),
    ]);
    expect(response.status()).toBe(status);
    expect(intercepted, 'Exactly one rejected request; no real DELETE reaches the server').toBe(1);
    await test.info().attach('controlled-delete-response', { contentType: 'application/json', body: JSON.stringify({ status, intercepted: true, serverMutation: false }) });
    await expect.soft(p.page.getByRole('status').or(p.page.getByRole('alert')).filter({ hasText: /error|failed|forbidden|not found|unable|denied/i }).first(), 'A rejected delete must show an actionable error').toBeVisible({ timeout: 5000 });
    await captureEvidence('controlled-profile-delete-' + status + '-result');
    await p.navigate();
    await expect(p.profileCards).toHaveCount(before.length);
    expect((await p.profileCards.locator('h3').allTextContents()).sort()).toEqual(before.sort());
    expect(await p.getCardByName(name), 'Rejected deletion must preserve the selected record').not.toBeNull();
  } finally { await p.page.unroute(pattern, guard); }
}
