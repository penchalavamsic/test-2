import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

function fmtDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + day;
}

test.describe('System User Dashboard — Expiring Floating Configurations EFC-D', () => {
  test('LIMAS-SUD-806: date embedded in API URL uses MMMM d, yyyy format', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();

    await Promise.all([
      page.waitForResponse(
      (resp) => resp.url().includes('/api/flconfig/e/') && resp.request().method() === 'GET',
      { timeout: 15000 }
    ),
      recordEvidence('action-click-LIMAS-SUD-806-efc-d-date-url-format.spec-16', async () => dashboard.floatingConfigsCard.click()),
    ]);

    const today = new Date();
    const futureDate = fmtDate(new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()));

    const expiresUntilInput = page.getByRole('textbox', { name: 'Expires until' });
    const resp = page.waitForResponse(
      (r) => r.url().includes('/api/flconfig/') && r.request().method() === 'GET',
      { timeout: 15000 }
    );
    await recordEvidence('action-fill-LIMAS-SUD-806-efc-d-date-url-format.spec-31', async () => expiresUntilInput.fill(futureDate));
    const response = await resp;

    const url = new URL(response.url());
    const pathParts = url.pathname.split('/');
    const encodedDate = pathParts[pathParts.length - 2];
    const decoded = decodeURIComponent(encodedDate);
    await recordEvidence('assert-toMatch-LIMAS-SUD-806-efc-d-date-url-format.spec-38', async () => expect(decoded).toMatch(/^[A-Z][a-z]+ \d{1,2}, \d{4}$/));

    await recordEvidence('action-fill-LIMAS-SUD-806-efc-d-date-url-format.spec-40', async () => expiresUntilInput.fill(''));
  });
});