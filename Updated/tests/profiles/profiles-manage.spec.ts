import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { ProfilesPage } from '../pages/profiles.page';

test.describe('PRF-B ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Manage Profile Dialog', () => {
  let profiles: ProfilesPage;

  test.beforeEach(async ({ page }) => {
    profiles = new ProfilesPage(page);
    await profiles.navigate();
  });

  test.describe('Opening and Shell', () => {
    test('LIMAS-SUD-2224: Manage opens dialog with profile name', async () => {
      const cards = profiles.profileCards;
      const count = await profiles.getCardCount();
      await recordEvidence('assert-toBeGreaterThan-profiles-manage.spec-16', async () => expect(count).toBeGreaterThan(0));
      const card = cards.first();
      const name = await profiles.getCardHeading(card);
      await profiles.openManageDialog(card, name);
      await recordEvidence('assert-toBeVisible-profiles-manage.spec-20', async () => expect(profiles.manageDialog(name)).toBeVisible());
      await profiles.closeManageDialog();
    });

    test('LIMAS-SUD-2225: Dialog shows h2 heading with profile name', async () => {
      const card = profiles.profileCards.first();
      const name = await profiles.getCardHeading(card);
      await profiles.openManageDialog(card, name);
      await recordEvidence('assert-toBeVisible-profiles-manage.spec-28', async () => expect(profiles.manageDialogHeading).toBeVisible());
      await recordEvidence('assert-toHaveText-profiles-manage.spec-29', async () => expect(profiles.manageDialogHeading).toHaveText(name));
      await profiles.closeManageDialog();
    });

    test('LIMAS-SUD-2226: Dialog shows No description paragraph when description is empty', async () => {
      const card = profiles.profileCards.first();
      const name = await profiles.getCardHeading(card);
      await profiles.openManageDialog(card, name);
      await recordEvidence('assert-toBeVisible-profiles-manage.spec-37', async () => expect(profiles.manageDialogDescription).toBeVisible());
      await profiles.closeManageDialog();
    });

    test('LIMAS-SUD-2227: Three tabs Overview Roles Features are visible', async () => {
      const card = profiles.profileCards.first();
      const name = await profiles.getCardHeading(card);
      await profiles.openManageDialog(card, name);
      await recordEvidence('assert-toBeVisible-profiles-manage.spec-45', async () => expect(profiles.manageDialogTabOverview).toBeVisible());
      await recordEvidence('assert-toBeVisible-profiles-manage.spec-46', async () => expect(profiles.manageDialogTabRoles).toBeVisible());
      await recordEvidence('assert-toBeVisible-profiles-manage.spec-47', async () => expect(profiles.manageDialogTabFeatures).toBeVisible());
      await profiles.closeManageDialog();
    });

    test('LIMAS-SUD-2228: Overview tab is selected by default', async () => {
      const card = profiles.profileCards.first();
      const name = await profiles.getCardHeading(card);
      await profiles.openManageDialog(card, name);
      await recordEvidence('assert-toHaveAttribute-profiles-manage.spec-55', async () => expect(profiles.manageDialogTabOverview).toHaveAttribute('aria-selected', 'true'));
      await profiles.closeManageDialog();
    });
  });

  test.describe('Overview Tab Content', () => {
    test('LIMAS-SUD-2229: Overview shows User Licenses count', async () => {
      const card = profiles.profileCards.first();
      const name = await profiles.getCardHeading(card);
      await profiles.openManageDialog(card, name);
      await recordEvidence('assert-toBeVisible-profiles-manage.spec-65', async () => expect(profiles.manageOverviewLicenses).toBeVisible());
      await recordEvidence('assert-toHaveText-profiles-manage.spec-66', async () => expect(profiles.manageOverviewLicenses).toHaveText(/\d+/));
      await profiles.closeManageDialog();
    });

    test('LIMAS-SUD-2230: Overview shows Floating count', async () => {
      const card = profiles.profileCards.first();
      const name = await profiles.getCardHeading(card);
      await profiles.openManageDialog(card, name);
      await recordEvidence('assert-toBeVisible-profiles-manage.spec-74', async () => expect(profiles.manageOverviewFloating).toBeVisible());
      await recordEvidence('assert-toHaveText-profiles-manage.spec-75', async () => expect(profiles.manageOverviewFloating).toHaveText(/\d+/));
      await profiles.closeManageDialog();
    });

    test('LIMAS-SUD-2231: Overview shows Assigned count', async () => {
      const card = profiles.profileCards.first();
      const name = await profiles.getCardHeading(card);
      await profiles.openManageDialog(card, name);
      await recordEvidence('assert-toBeVisible-profiles-manage.spec-83', async () => expect(profiles.manageOverviewAssigned).toBeVisible());
      await recordEvidence('assert-toHaveText-profiles-manage.spec-84', async () => expect(profiles.manageOverviewAssigned).toHaveText(/\d+/));
      await profiles.closeManageDialog();
    });

    test('LIMAS-SUD-2232: Overview shows Profile Details heading', async () => {
      const card = profiles.profileCards.first();
      const name = await profiles.getCardHeading(card);
      await profiles.openManageDialog(card, name);
      const tabpanel = profiles.manageDialogTabpanel.first();
      await recordEvidence('assert-toBeVisible-profiles-manage.spec-93', async () => expect(tabpanel.locator('text=Profile Details')).toBeVisible());
      await profiles.closeManageDialog();
    });

    test('LIMAS-SUD-2233: Overview shows Name field in Profile Details', async () => {
      const card = profiles.profileCards.first();
      const name = await profiles.getCardHeading(card);
      await profiles.openManageDialog(card, name);
      await recordEvidence('assert-toBeVisible-profiles-manage.spec-101', async () => expect(profiles.manageOverviewDetailName).toBeVisible());
      await profiles.closeManageDialog();
    });

    test('LIMAS-SUD-2234: Overview shows Description field in Profile Details', async () => {
      const card = profiles.profileCards.first();
      const name = await profiles.getCardHeading(card);
      await profiles.openManageDialog(card, name);
      await recordEvidence('assert-toBeVisible-profiles-manage.spec-109', async () => expect(profiles.manageOverviewDetailDescription).toBeVisible());
      await profiles.closeManageDialog();
    });

    test('LIMAS-SUD-2235: Overview shows Total Roles field in Profile Details', async () => {
      const card = profiles.profileCards.first();
      const name = await profiles.getCardHeading(card);
      await profiles.openManageDialog(card, name);
      await recordEvidence('assert-toBeVisible-profiles-manage.spec-117', async () => expect(profiles.manageOverviewDetailTotalRoles).toBeVisible());
      await recordEvidence('assert-toHaveText-profiles-manage.spec-118', async () => expect(profiles.manageOverviewDetailTotalRoles).toHaveText(/\d+/));
      await profiles.closeManageDialog();
    });
  });

  test.describe('Tab Switching', () => {
    test('LIMAS-SUD-2236: Switching to Roles tab shows Manage Roles heading', async () => {
      const card = profiles.profileCards.first();
      const name = await profiles.getCardHeading(card);
      await profiles.openManageDialog(card, name);
      await recordEvidence('action-click-profiles-manage.spec-128', async () => profiles.manageDialogTabRoles.click());
      await recordEvidence('assert-toBeVisible-profiles-manage.spec-129', async () => expect(profiles.manageRolesHeading).toBeVisible());
      await profiles.closeManageDialog();
    });

    test('LIMAS-SUD-2237: Switching to Features tab shows Manage Features heading', async () => {
      const card = profiles.profileCards.first();
      const name = await profiles.getCardHeading(card);
      await profiles.openManageDialog(card, name);
      await recordEvidence('action-click-profiles-manage.spec-137', async () => profiles.manageDialogTabFeatures.click());
      await recordEvidence('assert-toBeVisible-profiles-manage.spec-138', async () => expect(profiles.manageFeaturesHeading).toBeVisible());
      await profiles.closeManageDialog();
    });

    test('LIMAS-SUD-2238: Switching tab updates aria-selected state correctly', async () => {
      const card = profiles.profileCards.first();
      const name = await profiles.getCardHeading(card);
      await profiles.openManageDialog(card, name);
      await recordEvidence('action-click-profiles-manage.spec-146', async () => profiles.manageDialogTabRoles.click());
      await recordEvidence('assert-toHaveAttribute-profiles-manage.spec-147', async () => expect(profiles.manageDialogTabRoles).toHaveAttribute('aria-selected', 'true'));
      await recordEvidence('assert-toHaveAttribute-profiles-manage.spec-148', async () => expect(profiles.manageDialogTabOverview).toHaveAttribute('aria-selected', 'false'));
      await recordEvidence('action-click-profiles-manage.spec-149', async () => profiles.manageDialogTabFeatures.click());
      await recordEvidence('assert-toHaveAttribute-profiles-manage.spec-150', async () => expect(profiles.manageDialogTabFeatures).toHaveAttribute('aria-selected', 'true'));
      await recordEvidence('assert-toHaveAttribute-profiles-manage.spec-151', async () => expect(profiles.manageDialogTabRoles).toHaveAttribute('aria-selected', 'false'));
      await profiles.closeManageDialog();
    });
  });

  test.describe('Roles Tab Content', () => {
    test('LIMAS-SUD-2239: Roles tab has Add Role button', async () => {
      const card = profiles.profileCards.first();
      const name = await profiles.getCardHeading(card);
      await profiles.openManageDialog(card, name);
      await recordEvidence('action-click-profiles-manage.spec-161', async () => profiles.manageDialogTabRoles.click());
      await recordEvidence('assert-toBeVisible-profiles-manage.spec-162', async () => expect(profiles.manageRolesAddButton).toBeVisible());
      await profiles.closeManageDialog();
    });

    test('LIMAS-SUD-2240: Roles tab shows table with role entries', async () => {
      const card = profiles.profileCards.first();
      const name = await profiles.getCardHeading(card);
      await profiles.openManageDialog(card, name);
      await recordEvidence('action-click-profiles-manage.spec-170', async () => profiles.manageDialogTabRoles.click());
      await recordEvidence('assert-toBeVisible-profiles-manage.spec-171', async () => expect(profiles.manageRolesTable).toBeVisible());
      const rows = profiles.manageRolesTable.locator(':scope > div.border');
      await recordEvidence('assert-toBeVisible-profiles-manage.spec-173', async () => expect(rows.first()).toBeVisible());
      await profiles.closeManageDialog();
    });

    test('LIMAS-SUD-2241: Roles table shows role name and value cells', async () => {
      const card = profiles.profileCards.first();
      const name = await profiles.getCardHeading(card);
      await profiles.openManageDialog(card, name);
      await recordEvidence('action-click-profiles-manage.spec-181', async () => profiles.manageDialogTabRoles.click());
      const firstRow = profiles.manageRolesTable.locator(':scope > div.border').first();
      const cells = firstRow.locator(':scope > div:first-child > div');
      const cellCount = await cells.count();
      await recordEvidence('assert-toBeGreaterThanOrEqual-profiles-manage.spec-185', async () => expect(cellCount).toBeGreaterThanOrEqual(2));
      await profiles.closeManageDialog();
    });
  });

  test.describe('Features Tab Content', () => {
    test('LIMAS-SUD-2242: Features tab has Add feature combobox', async () => {
      const card = profiles.profileCards.first();
      const name = await profiles.getCardHeading(card);
      await profiles.openManageDialog(card, name);
      await recordEvidence('action-click-profiles-manage.spec-195', async () => profiles.manageDialogTabFeatures.click());
      await recordEvidence('assert-toBeVisible-profiles-manage.spec-196', async () => expect(profiles.manageFeaturesAddCombo).toBeVisible());
      await profiles.closeManageDialog();
    });

    test('LIMAS-SUD-2243: Features tab has Create Feature button', async () => {
      const card = profiles.profileCards.first();
      const name = await profiles.getCardHeading(card);
      await profiles.openManageDialog(card, name);
      await recordEvidence('action-click-profiles-manage.spec-204', async () => profiles.manageDialogTabFeatures.click());
      await recordEvidence('assert-toBeVisible-profiles-manage.spec-205', async () => expect(profiles.manageFeaturesCreateButton).toBeVisible());
      await profiles.closeManageDialog();
    });

    test('LIMAS-SUD-2244: Features tab has Save button', async () => {
      const card = profiles.profileCards.first();
      const name = await profiles.getCardHeading(card);
      await profiles.openManageDialog(card, name);
      await recordEvidence('action-click-profiles-manage.spec-213', async () => profiles.manageDialogTabFeatures.click());
      await recordEvidence('assert-toBeVisible-profiles-manage.spec-214', async () => expect(profiles.manageFeaturesSaveButton).toBeVisible());
      await profiles.closeManageDialog();
    });

    test('LIMAS-SUD-2245: Features table shows existing feature rows', async () => {
      const card = profiles.profileCards.first();
      const name = await profiles.getCardHeading(card);
      await profiles.openManageDialog(card, name);
      await recordEvidence('action-click-profiles-manage.spec-222', async () => profiles.manageDialogTabFeatures.click());
      await recordEvidence('assert-toBeVisible-profiles-manage.spec-223', async () => expect(profiles.manageFeaturesTable).toBeVisible());
      const rows = profiles.manageFeaturesTable.locator('tbody tr');
      await recordEvidence('assert-toBeVisible-profiles-manage.spec-225', async () => expect(rows.first()).toBeVisible());
      await profiles.closeManageDialog();
    });
  });

  test.describe('Dialog Dismiss and Reopen', () => {
    test('LIMAS-SUD-2246: Close button dismisses the dialog', async () => {
      const card = profiles.profileCards.first();
      const name = await profiles.getCardHeading(card);
      await profiles.openManageDialog(card, name);
      await profiles.closeManageDialog();
      await recordEvidence('assert-toBeVisible-profiles-manage.spec-236', async () => expect(profiles.manageDialog(name)).not.toBeVisible());
    });

    test('LIMAS-SUD-2247: Reopening Manage for a different profile shows correct name', async () => {
      const count = await profiles.getCardCount();
      await recordEvidence('assert-toBeGreaterThanOrEqual-profiles-manage.spec-241', async () => expect(count).toBeGreaterThanOrEqual(2));
      const card1 = profiles.profileCards.nth(0);
      const card2 = profiles.profileCards.nth(1);
      const name1 = await profiles.getCardHeading(card1);
      const name2 = await profiles.getCardHeading(card2);
      await profiles.openManageDialog(card1, name1);
      await recordEvidence('assert-toHaveText-profiles-manage.spec-247', async () => expect(profiles.manageDialogHeading).toHaveText(name1));
      await profiles.closeManageDialog();
      await profiles.openManageDialog(card2, name2);
      await recordEvidence('assert-toHaveText-profiles-manage.spec-250', async () => expect(profiles.manageDialogHeading).toHaveText(name2));
      await profiles.closeManageDialog();
    });
  });
});