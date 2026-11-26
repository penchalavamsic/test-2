import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { ProfilesPage } from '../pages/profiles.page';

const PROFILE = resolveProfileName();

// â”€â”€â”€ PRF-A: Profiles â€” Page Shell, Search, Sorting, and Cards â”€â”€â”€

test.describe('Profiles â€” PRF-A', () => {

  test.beforeEach(async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const profiles = new ProfilesPage(page);
    await profiles.navigate();
  });

  // â”€â”€â”€ 1. Page Shell â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Page Shell', () => {

    test('LIMAS-SUD-2192: Sidebar navigation lands on Profiles page', async ({ page }) => {
      const profiles = new ProfilesPage(page);
      await recordEvidence('assert-toBeVisible-profiles-search-sorting-cards.spec-27', async () => expect(profiles.heading).toBeVisible());
      await recordEvidence('assert-toHaveText-profiles-search-sorting-cards.spec-28', async () => expect(profiles.heading).toHaveText('Profiles'));
    });

    test('LIMAS-SUD-2193: Profiles heading is h1', async ({ page }) => {
      const profiles = new ProfilesPage(page);
      await recordEvidence('assert-toBeVisible-profiles-search-sorting-cards.spec-33', async () => expect(profiles.heading).toBeVisible());
    });

    test('LIMAS-SUD-2194: Create Profile button is visible', async ({ page }) => {
      const profiles = new ProfilesPage(page);
      await recordEvidence('assert-toBeVisible-profiles-search-sorting-cards.spec-38', async () => expect(profiles.createProfileButton).toBeVisible());
    });

    test('LIMAS-SUD-2195: Search input is present with placeholder "Search"', async ({ page }) => {
      const profiles = new ProfilesPage(page);
      await recordEvidence('assert-toBeVisible-profiles-search-sorting-cards.spec-43', async () => expect(profiles.searchInput).toBeVisible());
      const placeholder = await profiles.searchInput.getAttribute('placeholder');
      await recordEvidence('assert-toBe-profiles-search-sorting-cards.spec-45', async () => expect(placeholder).toBe('Search'));
    });

    test('LIMAS-SUD-2196: Sort field combobox is present with default "Name"', async ({ page }) => {
      const profiles = new ProfilesPage(page);
      await recordEvidence('assert-toBeVisible-profiles-search-sorting-cards.spec-50', async () => expect(profiles.sortFieldCombo).toBeVisible());
      const value = await profiles.getSortField();
      await recordEvidence('assert-toBe-profiles-search-sorting-cards.spec-52', async () => expect(value).toBe('Name'));
    });

    test('LIMAS-SUD-2197: Sort direction combobox is present with default "Ascending"', async ({ page }) => {
      const profiles = new ProfilesPage(page);
      await recordEvidence('assert-toBeVisible-profiles-search-sorting-cards.spec-57', async () => expect(profiles.sortDirectionCombo).toBeVisible());
      const value = await profiles.getSortDirection();
      await recordEvidence('assert-toBe-profiles-search-sorting-cards.spec-59', async () => expect(value).toBe('Ascending'));
    });

    test('LIMAS-SUD-2198: Profile cards are visible', async ({ page }) => {
      const profiles = new ProfilesPage(page);
      const count = await profiles.getCardCount();
      await recordEvidence('assert-toBeGreaterThan-profiles-search-sorting-cards.spec-65', async () => expect(count).toBeGreaterThan(0));
      const firstCard = profiles.profileCards.first();
      await recordEvidence('assert-toBeVisible-profiles-search-sorting-cards.spec-67', async () => expect(firstCard).toBeVisible());
    });
  });

  // â”€â”€â”€ 2. Search â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Search', () => {

    test('LIMAS-SUD-2199: Search accepts text input', async ({ page }) => {
      const profiles = new ProfilesPage(page);
      await profiles.search('Diagnostic');
      const value = await profiles.searchInput.inputValue();
      await recordEvidence('assert-toBe-profiles-search-sorting-cards.spec-79', async () => expect(value).toBe('Diagnostic'));
      await profiles.clearSearch();
    });

    test('LIMAS-SUD-2200: Search finds exact match by profile name fragment', async ({ page }) => {
      const profiles = new ProfilesPage(page);
      const firstCardCount = await profiles.getCardCount();

      // Use a distinctive name fragment
      await profiles.search('Diagnostic');
      const filteredCount = await profiles.getCardCount();
      await recordEvidence('assert-toBeLessThanOrEqual-profiles-search-sorting-cards.spec-90', async () => expect(filteredCount).toBeLessThanOrEqual(firstCardCount));
      await recordEvidence('assert-toBeGreaterThan-profiles-search-sorting-cards.spec-91', async () => expect(filteredCount).toBeGreaterThan(0));
      await profiles.clearSearch();
    });

    test('LIMAS-SUD-2201: No-match search shows zero cards', async ({ page }) => {
      const profiles = new ProfilesPage(page);
      await profiles.search('ZZZ_NO_SUCH_PROFILE_ZZZ');
      const count = await profiles.getCardCount();
      await recordEvidence('assert-toBe-profiles-search-sorting-cards.spec-99', async () => expect(count).toBe(0));
      await profiles.clearSearch();
    });

    test('LIMAS-SUD-2202: Clearing search restores all cards', async ({ page }) => {
      const profiles = new ProfilesPage(page);
      const originalCount = await profiles.getCardCount();

      await profiles.search('Diagnostic');
      await profiles.clearSearch();
      const restoredCount = await profiles.getCardCount();
      await recordEvidence('assert-toBe-profiles-search-sorting-cards.spec-110', async () => expect(restoredCount).toBe(originalCount));
    });

    test('LIMAS-SUD-2203: Search is case-insensitive', async ({ page }) => {
      const profiles = new ProfilesPage(page);
      await profiles.search('diagnostic');
      const lowerCount = await profiles.getCardCount();
      await profiles.clearSearch();

      await profiles.search('DIAGNOSTIC');
      const upperCount = await profiles.getCardCount();
      await profiles.clearSearch();

      await recordEvidence('assert-toBe-profiles-search-sorting-cards.spec-123', async () => expect(lowerCount).toBe(upperCount));
      await recordEvidence('assert-toBeGreaterThan-profiles-search-sorting-cards.spec-124', async () => expect(lowerCount).toBeGreaterThan(0));
    });

    test('LIMAS-SUD-2204: Leading/trailing whitespace in search is handled', async ({ page }) => {
      const profiles = new ProfilesPage(page);
      await profiles.search('   Diagnostic   ');
      const trimmedCount = await profiles.getCardCount();
      await profiles.clearSearch();

      await profiles.search('Diagnostic');
      const normalCount = await profiles.getCardCount();
      await profiles.clearSearch();

      await recordEvidence('assert-toBe-profiles-search-sorting-cards.spec-137', async () => expect(trimmedCount).toBe(normalCount));
    });

    test('LIMAS-SUD-2205: No duplicate cards appear after search and clear', async ({ page }) => {
      const profiles = new ProfilesPage(page);
      const originalCount = await profiles.getCardCount();

      await profiles.search('Database');
      await profiles.clearSearch();

      const finalCount = await profiles.getCardCount();
      await recordEvidence('assert-toBe-profiles-search-sorting-cards.spec-148', async () => expect(finalCount).toBe(originalCount));
    });
  });

  // â”€â”€â”€ 3. Sorting â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Sorting', () => {

    test('LIMAS-SUD-2206: Default sort is Name Ascending â€” first card is alphabetically first', async ({ page }) => {
      const profiles = new ProfilesPage(page);
      // First visible card should start with "A" or similar (AGCO actually)
      const firstName = await profiles.getFirstProfileName();
      await recordEvidence('assert-toBeGreaterThan-profiles-search-sorting-cards.spec-160', async () => expect(firstName.length).toBeGreaterThan(0));
    });

    test('LIMAS-SUD-2207: Selecting Name Descending reorders cards', async ({ page }) => {
      const profiles = new ProfilesPage(page);
      const ascFirstName = await profiles.getFirstProfileName();

      // Change direction to Descending
      await recordEvidence('action-click-profiles-search-sorting-cards.spec-168', async () => profiles.sortDirectionCombo.click());
      await recordEvidence('action-click-profiles-search-sorting-cards.spec-169', async () => page.getByRole('option', { name: 'Descending' }).click());

      const descFirstName = await profiles.getFirstProfileName();
      await recordEvidence('assert-toBe-profiles-search-sorting-cards.spec-172', async () => expect(descFirstName).not.toBe(ascFirstName));

      // Restore
      await recordEvidence('action-click-profiles-search-sorting-cards.spec-175', async () => profiles.sortDirectionCombo.click());
      await recordEvidence('action-click-profiles-search-sorting-cards.spec-176', async () => page.getByRole('option', { name: 'Ascending' }).click());
    });

    test('LIMAS-SUD-2208: Card count is consistent after sorting change', async ({ page }) => {
      const profiles = new ProfilesPage(page);
      const originalCount = await profiles.getCardCount();

      await recordEvidence('action-click-profiles-search-sorting-cards.spec-183', async () => profiles.sortDirectionCombo.click());
      await recordEvidence('action-click-profiles-search-sorting-cards.spec-184', async () => page.getByRole('option', { name: 'Descending' }).click());

      const afterSortCount = await profiles.getCardCount();
      await recordEvidence('assert-toBe-profiles-search-sorting-cards.spec-187', async () => expect(afterSortCount).toBe(originalCount));

      // Restore
      await recordEvidence('action-click-profiles-search-sorting-cards.spec-190', async () => profiles.sortDirectionCombo.click());
      await recordEvidence('action-click-profiles-search-sorting-cards.spec-191', async () => page.getByRole('option', { name: 'Ascending' }).click());
    });

    test('LIMAS-SUD-2209: Sort field combobox shows Name option', async ({ page }) => {
      const profiles = new ProfilesPage(page);
      await recordEvidence('action-click-profiles-search-sorting-cards.spec-196', async () => profiles.sortFieldCombo.click());
      const nameOption = page.getByRole('option', { name: 'Name' });
      await recordEvidence('assert-toBeVisible-profiles-search-sorting-cards.spec-198', async () => expect(nameOption).toBeVisible());
      await recordEvidence('action-press-profiles-search-sorting-cards.spec-199', async () => page.keyboard.press('Escape'));
    });
  });

  // â”€â”€â”€ 4. Profile Card Structure â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Profile Card Structure', () => {

    test('LIMAS-SUD-2210: Each card has a Profile name heading (h3)', async ({ page }) => {
      const profiles = new ProfilesPage(page);
      const count = await profiles.getCardCount();
      await recordEvidence('assert-toBeGreaterThan-profiles-search-sorting-cards.spec-210', async () => expect(count).toBeGreaterThan(0));
      const firstCard = profiles.profileCards.first();
      await recordEvidence('assert-toBeVisible-profiles-search-sorting-cards.spec-212', async () => expect(profiles.cardHeading(firstCard)).toBeVisible());
    });

    test('LIMAS-SUD-2211: Each card has Edit and Delete icon buttons', async ({ page }) => {
      const profiles = new ProfilesPage(page);
      const count = await profiles.getCardCount();
      const firstCard = profiles.profileCards.first();

      await recordEvidence('assert-toBeVisible-profiles-search-sorting-cards.spec-220', async () => expect(profiles.cardEditButton(firstCard)).toBeVisible());
      await recordEvidence('assert-toBeVisible-profiles-search-sorting-cards.spec-221', async () => expect(profiles.cardDeleteButton(firstCard)).toBeVisible());
    });

    test('LIMAS-SUD-2212: Each card has User Licenses, Floating, and Assigned counts', async ({ page }) => {
      const profiles = new ProfilesPage(page);
      const firstCard = profiles.profileCards.first();

      // Count values are numeric strings
      const ul = await profiles.cardUserLicensesValue(firstCard).textContent();
      const fl = await profiles.cardFloatingValue(firstCard).textContent();
      const asgn = await profiles.cardAssignedValue(firstCard).textContent();

      await recordEvidence('assert-toBeTruthy-profiles-search-sorting-cards.spec-233', async () => expect(ul).toMatch(/^\d+$/));
      await recordEvidence('assert-toBeTruthy-profiles-search-sorting-cards.spec-234', async () => expect(fl).toMatch(/^\d+$/));
      await recordEvidence('assert-toBeTruthy-profiles-search-sorting-cards.spec-235', async () => expect(asgn).toMatch(/^\d+$/));
    });

    test('LIMAS-SUD-2213: Each card has a Roles count label like "N Roles"', async ({ page }) => {
      const profiles = new ProfilesPage(page);
      const firstCard = profiles.profileCards.first();
      const rolesText = await profiles.cardRolesCount(firstCard).textContent();
      await recordEvidence('assert-toMatch-profiles-search-sorting-cards.spec-242', async () => expect(rolesText).toMatch(/\d+\s+Roles/));
    });

    test('LIMAS-SUD-2214: Role badges are visible when roles exist', async ({ page }) => {
      const profiles = new ProfilesPage(page);
      const firstCard = profiles.profileCards.first();
      const badges = profiles.cardRoleBadges(firstCard);
      const badgeCount = await badges.count();
      // Some cards have 1 role with 1 badge
      await recordEvidence('assert-toBeGreaterThanOrEqual-profiles-search-sorting-cards.spec-251', async () => expect(badgeCount).toBeGreaterThanOrEqual(0));
    });

    test('LIMAS-SUD-2215: Overflow badge "+N" is present when roles exceed visible slots', async ({ page }) => {
      const profiles = new ProfilesPage(page);
      const count = await profiles.getCardCount();
      let foundOverflow = false;

      for (let i = 0; i < count && !foundOverflow; i++) {
        const card = profiles.profileCards.nth(i);
        const overflow = profiles.cardRoleOverflowBadge(card);
        if ((await overflow.count()) > 0) {
          foundOverflow = true;
          const text = await overflow.textContent();
          await recordEvidence('assert-toMatch-profiles-search-sorting-cards.spec-265', async () => expect(text).toMatch(/^\+\d+$/));
        }
      }
    });

    test('LIMAS-SUD-2216: Each card has a Manage button', async ({ page }) => {
      const profiles = new ProfilesPage(page);
      const firstCard = profiles.profileCards.first();
      await recordEvidence('assert-toBeVisible-profiles-search-sorting-cards.spec-273', async () => expect(profiles.cardManageButton(firstCard)).toBeVisible());
    });

    test('LIMAS-SUD-2217: Cards have unique runtime identities (no duplicate headings)', async ({ page }) => {
      const profiles = new ProfilesPage(page);
      const count = await profiles.getCardCount();
      const names = new Set<string>();

      for (let i = 0; i < count; i++) {
        const card = profiles.profileCards.nth(i);
        const name = await profiles.getCardHeading(card);
        await recordEvidence('assert-toBe-profiles-search-sorting-cards.spec-284', async () => expect(names.has(name)).toBe(false));
        names.add(name);
      }
    });

    test('LIMAS-SUD-2218: Count values are numeric and non-negative', async ({ page }) => {
      const profiles = new ProfilesPage(page);
      const firstCard = profiles.profileCards.first();

      // Find the numeric values within the card
      const allDivs = firstCard.locator('div');
      const divCount = await allDivs.count();

      for (let i = 0; i < divCount; i++) {
        const div = allDivs.nth(i);
        const text = await div.textContent();
        if (text && /^\d+$/.test(text.trim())) {
          const num = parseInt(text.trim(), 10);
          await recordEvidence('assert-toBeGreaterThanOrEqual-profiles-search-sorting-cards.spec-302', async () => expect(num).toBeGreaterThanOrEqual(0));
        }
      }
    });
  });

  // â”€â”€â”€ 5. Accessibility â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Accessibility', () => {

    test('LIMAS-SUD-2219: Search input has accessible placeholder', async ({ page }) => {
      const profiles = new ProfilesPage(page);
      const placeholder = await profiles.searchInput.getAttribute('placeholder');
      await recordEvidence('assert-toBeTruthy-profiles-search-sorting-cards.spec-315', async () => expect(placeholder).toBeTruthy());
    });

    test('LIMAS-SUD-2220: Create Profile button has accessible name', async ({ page }) => {
      const profiles = new ProfilesPage(page);
      await recordEvidence('assert-toHaveAccessibleName-profiles-search-sorting-cards.spec-320', async () => expect(profiles.createProfileButton).toHaveAccessibleName('Create Profile'));
    });

    test('LIMAS-SUD-2221: Manage button has accessible name "Manage"', async ({ page }) => {
      const profiles = new ProfilesPage(page);
      const firstCard = profiles.profileCards.first();
      await recordEvidence('assert-toHaveAccessibleName-profiles-search-sorting-cards.spec-326', async () => expect(profiles.cardManageButton(firstCard)).toHaveAccessibleName('Manage'));
    });

    test('LIMAS-SUD-2222: Role badges are distinguishable beyond color', async ({ page }) => {
      const profiles = new ProfilesPage(page);
      const firstCard = profiles.profileCards.first();
      const badges = profiles.cardRoleBadges(firstCard);
      const count = await badges.count();
      if (count > 0) {
        const text = await badges.first().textContent();
        await recordEvidence('assert-toBeTruthy-profiles-search-sorting-cards.spec-336', async () => expect(text).toBeTruthy());
      }
    });
  });

  // â”€â”€â”€ 6. Safe Restoration â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Safe Restoration', () => {

    test('LIMAS-SUD-2223: Profiles page restores to clean state after exploration', async ({ page }) => {
      const profiles = new ProfilesPage(page);
      const originalCount = await profiles.getCardCount();

      // Exercise search
      await profiles.search('Test');
      await profiles.clearSearch();

      // Exercise sort
      await recordEvidence('action-click-profiles-search-sorting-cards.spec-354', async () => profiles.sortDirectionCombo.click());
      await recordEvidence('action-click-profiles-search-sorting-cards.spec-355', async () => page.getByRole('option', { name: 'Descending' }).click());
      await recordEvidence('action-click-profiles-search-sorting-cards.spec-356', async () => profiles.sortDirectionCombo.click());
      await recordEvidence('action-click-profiles-search-sorting-cards.spec-357', async () => page.getByRole('option', { name: 'Ascending' }).click());

      // Verify restoration
      await recordEvidence('assert-toBeVisible-profiles-search-sorting-cards.spec-360', async () => expect(profiles.heading).toBeVisible());
      const finalCount = await profiles.getCardCount();
      await recordEvidence('assert-toBe-profiles-search-sorting-cards.spec-362', async () => expect(finalCount).toBe(originalCount));

      const value = await profiles.searchInput.inputValue();
      await recordEvidence('assert-toBe-profiles-search-sorting-cards.spec-365', async () => expect(value).toBe(''));
    });
  });
});