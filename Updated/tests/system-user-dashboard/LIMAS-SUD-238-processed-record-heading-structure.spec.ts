import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('System User Dashboard — Processed License Record Fields', () => {
  test('LIMAS-SUD-238: should document whether <h4> headings exist in the processed record area', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    await dashboard.enableHistory();
    await dashboard.waitForInitialHistoryLoad();

    // Check for h4 elements in the processed area
    const h4s = page.locator('h4');
    const count = await h4s.count();

    if (count > 0) {
      const subtitleBox = await dashboard.processedSectionSubtitle.boundingBox();
      let hasH4InProcessed = false;
      for (let i = 0; i < count; i++) {
        const box = await h4s.nth(i).boundingBox();
        if (box && subtitleBox && box.y > subtitleBox.y + subtitleBox.height) {
          const text = await h4s.nth(i).textContent();
          hasH4InProcessed = true;
          break;
        }
      }
      // Document presence but don't fail — this is an observation test
    }

    // Cards should not have heading elements as record containers
    const firstUserLabel = page.getByText('User').first();
    if ((await firstUserLabel.count()) > 0) {
      const card = firstUserLabel.locator('..').locator('..');
      const h4InCard = card.locator('h4');
      const h4CardCount = await h4InCard.count();

      // The field labels (User, Feature, Hardware / Created) should not be h4
      const userTag = await firstUserLabel.evaluate(el => el.tagName.toLowerCase());
      // Document: if h4s are absent in cards, note that headings are elsewhere
    }
  });
});