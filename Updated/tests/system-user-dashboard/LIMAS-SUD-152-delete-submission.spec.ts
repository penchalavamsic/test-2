import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-152: Delete submission (Data-changing)', () => {
  test('should delete a pending request and verify API and count update', async ({ page }) => {
    const recordId = process.env.TEST_RECORD_IDENTIFIER;
    const isDisposable = process.env.DEDICATED_DISPOSABLE_REQUEST;

    test.skip(!recordId, 'TEST_RECORD_IDENTIFIER is required for data-changing deletion test');
    test.skip(isDisposable !== 'true', 'DEDICATED_DISPOSABLE_REQUEST must be true');    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await recordEvidence('action-click-LIMAS-SUD-152-delete-submission.spec-12', async () => dashboard.pendingRequestsTab.click());

    // Capture initial pending count
    const countText = await page.getByText(/loaded·/).textContent();
    const initialTotalMatch = countText?.match(/·(\d+)\s+total/);
    const initialTotal = initialTotalMatch ? parseInt(initialTotalMatch[1], 10) : null;

    // Locate the specific Delete button
    const deleteButton = page.getByRole('button', { name: new RegExp(`Delete ${recordId}`) });

    // Set up response watcher before clicking (Delete is immediate — no confirmation dialog)
    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/limas/api/') && resp.request().method() === 'DELETE',
      { timeout: 15_000 }
    );

    // Click Delete exactly once — note: no confirmation dialog, deletion is immediate
    await recordEvidence('action-click-LIMAS-SUD-152-delete-submission.spec-29', async () => deleteButton.click());

    // Verify API response
    const response = await responsePromise;
    await recordEvidence('assert-toBe-LIMAS-SUD-152-delete-submission.spec-33', async () => expect(response.status()).toBe(200));

    // Verify count decremented
    await recordEvidence('assert-toPass-LIMAS-SUD-152-delete-submission.spec-36', async () => expect(async () => {
      const newCountText = await page.getByText(/loaded·/).textContent();
      const newTotalMatch = newCountText?.match(/·(\d+)\s+total/);
      if (newTotalMatch && initialTotal !== null) {
        await recordEvidence('assert-toBeLessThan-LIMAS-SUD-152-delete-submission.spec-40', async () => expect(parseInt(newTotalMatch[1], 10)).toBeLessThan(initialTotal));
      }
    }).toPass({ timeout: 15_000 }));

    // Verify the deleted request is gone
    await recordEvidence('assert-toBeAttached-LIMAS-SUD-152-delete-submission.spec-45', async () => expect(deleteButton).not.toBeAttached({ timeout: 10_000 }));
  });
});