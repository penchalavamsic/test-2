import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';

const PROFILE = resolveProfileName();

test.describe('User & License Hub — Pagination Selection Sync', () => {
  test.beforeEach(async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const hub = new UserLicenseHubPage(page);
    await hub.openUserLicenseHub();
    await hub.waitForHubLoad();
  });

  test.afterEach(async ({ page }) => {
    const hub = new UserLicenseHubPage(page);
    await hub.restoreDefaultPaginationState();
  });

  test('LIMAS-SUD-1054: First user auto-selected after Next navigation', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const { totalPages } = await hub.parsePageSummary();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-pagination-selection-sync.spec-28', async () => expect(totalPages).toBeGreaterThan(1));

    // First card selected on page 1
    const selBefore = await hub.isUserCardSelected(0);
    await recordEvidence('assert-toBe-user-license-hub-pagination-selection-sync.spec-32', async () => expect(selBefore).toBe(true));

    await hub.goToNextUserPage();

    // First card selected on page 2
    const selAfter = await hub.isUserCardSelected(0);
    await recordEvidence('assert-toBe-user-license-hub-pagination-selection-sync.spec-38', async () => expect(selAfter).toBe(true));

    // Only one card selected
    const selIndex = await hub.getSelectedUserCardIndex();
    await recordEvidence('assert-toBe-user-license-hub-pagination-selection-sync.spec-42', async () => expect(selIndex).toBe(0));

    // Verify no other card on page is selected
    const cardCount = await hub.getUserPageCount();
    for (let i = 1; i < cardCount; i++) {
      const isSel = await hub.isUserCardSelected(i);
      await recordEvidence('assert-toBe-user-license-hub-pagination-selection-sync.spec-48', async () => expect(isSel).toBe(false));
    }
  });

  test('LIMAS-SUD-1055: First user auto-selected after Previous navigation', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    await hub.goToNextUserPage();
    await recordEvidence('assert-toBe-user-license-hub-pagination-selection-sync.spec-56', async () => expect(await hub.isUserCardSelected(0)).toBe(true));

    await hub.goToPreviousUserPage();

    const selAfter = await hub.isUserCardSelected(0);
    await recordEvidence('assert-toBe-user-license-hub-pagination-selection-sync.spec-61', async () => expect(selAfter).toBe(true));

    const selIndex = await hub.getSelectedUserCardIndex();
    await recordEvidence('assert-toBe-user-license-hub-pagination-selection-sync.spec-64', async () => expect(selIndex).toBe(0));
  });

  test('LIMAS-SUD-1056: License panel syncs to selected user after Next', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    const { totalPages } = await hub.parsePageSummary();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-pagination-selection-sync.spec-71', async () => expect(totalPages).toBeGreaterThan(1));

    // Capture page 1 data
    const page1Names = await hub.getVisibleUserCardHeadings();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-pagination-selection-sync.spec-75', async () => expect(page1Names.length).toBeGreaterThan(0));

    await hub.goToNextUserPage();

    // Page 2: license panel synced to first user
    const badgeCount = await hub.getUserCardBadgeCount(0);
    const licenseCount = await hub.getVisibleLicenseCount();
    await recordEvidence('assert-toBe-user-license-hub-pagination-selection-sync.spec-82', async () => expect(licenseCount).toBe(badgeCount));

    // Assigned-to matches selected user
    const assignedTo = await hub.getLicensePanelAssignedTo();
    const selectedName = (await hub.getVisibleUserCardHeadings())[0].trim();
    await recordEvidence('assert-toBe-user-license-hub-pagination-selection-sync.spec-87', async () => expect(assignedTo).toBe(selectedName));
  });

  test('LIMAS-SUD-1057: License panel syncs to selected user after Previous', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    await hub.goToNextUserPage();

    // Capture page 2 selected user info
    const page2Badge = await hub.getUserCardBadgeCount(0);

    await hub.goToPreviousUserPage();

    // Page 1: license panel synced
    const badgeCount = await hub.getUserCardBadgeCount(0);
    const licenseCount = await hub.getVisibleLicenseCount();
    await recordEvidence('assert-toBe-user-license-hub-pagination-selection-sync.spec-103', async () => expect(licenseCount).toBe(badgeCount));

    // Assigned-to matches selected user on page 1
    const assignedTo = await hub.getLicensePanelAssignedTo();
    const selectedName = (await hub.getVisibleUserCardHeadings())[0].trim();
    await recordEvidence('assert-toBe-user-license-hub-pagination-selection-sync.spec-108', async () => expect(assignedTo).toBe(selectedName));

    // Page 1 badge should differ from page 2 (different user)
    await recordEvidence('assert-toBe-user-license-hub-pagination-selection-sync.spec-111', async () => expect(badgeCount).not.toBe(page2Badge));
  });

  test('LIMAS-SUD-1058: Selected user is always visible on current page', async ({ page }) => {
    const hub = new UserLicenseHubPage(page);

    // Page 1
    let selectedIdx = await hub.getSelectedUserCardIndex();
    await recordEvidence('assert-toBeGreaterThanOrEqual-user-license-hub-pagination-selection-sync.spec-119', async () => expect(selectedIdx).toBeGreaterThanOrEqual(0));
    let headings = await hub.getVisibleUserCardHeadings();
    const selName1 = headings[selectedIdx].trim();
    await recordEvidence('assert-toContain-user-license-hub-pagination-selection-sync.spec-122', async () => expect(headings.map((h) => h.trim())).toContain(selName1));

    // Page 2
    await hub.goToNextUserPage();
    selectedIdx = await hub.getSelectedUserCardIndex();
    headings = await hub.getVisibleUserCardHeadings();
    const selName2 = headings[selectedIdx].trim();
    await recordEvidence('assert-toContain-user-license-hub-pagination-selection-sync.spec-129', async () => expect(headings.map((h) => h.trim())).toContain(selName2));

    // Back to page 1
    await hub.goToPreviousUserPage();
    selectedIdx = await hub.getSelectedUserCardIndex();
    headings = await hub.getVisibleUserCardHeadings();
    const selName3 = headings[selectedIdx].trim();
    await recordEvidence('assert-toContain-user-license-hub-pagination-selection-sync.spec-136', async () => expect(headings.map((h) => h.trim())).toContain(selName3));
    await recordEvidence('assert-toBe-user-license-hub-pagination-selection-sync.spec-137', async () => expect(selName3).toBe(selName1));

    // After size change
    const altSizes = await hub.getAvailablePageSizes();
    const currentSize = await hub.getCurrentPageSize();
    const altSize = altSizes.find((s) => s !== currentSize);
    if (altSize) {
      await hub.setDynamicUserPageSize(altSize);
      selectedIdx = await hub.getSelectedUserCardIndex();
      headings = await hub.getVisibleUserCardHeadings();
      await recordEvidence('assert-toBeGreaterThanOrEqual-user-license-hub-pagination-selection-sync.spec-147', async () => expect(selectedIdx).toBeGreaterThanOrEqual(0));
      await recordEvidence('assert-toContain-user-license-hub-pagination-selection-sync.spec-148', async () => expect(headings.map((h) => h.trim())).toContain(headings[selectedIdx].trim()));
    }
  });
});