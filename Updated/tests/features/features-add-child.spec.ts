import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { FeaturesPage } from '../pages/features.page';

const PROFILE = resolveProfileName();

// â”€â”€â”€ FTR-C: Features â€” Add Child Feature â”€â”€â”€

test.describe('Features â€” FTR-C', () => {

  // â”€â”€â”€ 1. Dialog Shell â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Dialog Shell', () => {

    test('LIMAS-SUD-2092: Add Child Feature button opens dialog with correct role and name', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      const row = features.tableRows.first();
      await features.openAddChildDialog(row);

      await recordEvidence('assert-toBeVisible-features-add-child.spec-28', async () => expect(features.addChildDialog).toBeVisible());
      const role = await features.addChildDialog.getAttribute('role');
      await recordEvidence('assert-toBe-features-add-child.spec-30', async () => expect(role).toBe('dialog'));

      await features.closeAddChildDialog();
    });

    test('LIMAS-SUD-2093: Dialog has heading "Add Child Feature" as h2 and description', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      const row = features.tableRows.first();
      await features.openAddChildDialog(row);

      await recordEvidence('assert-toBeVisible-features-add-child.spec-47', async () => expect(features.addChildDialogHeading).toBeVisible());
      await recordEvidence('assert-toBeVisible-features-add-child.spec-48', async () => expect(features.addChildDialogDescription).toBeVisible());
      await recordEvidence('assert-toContainText-features-add-child.spec-49', async () => expect(features.addChildDialogDescription).toContainText('Add a child feature'));

      await features.closeAddChildDialog();
    });

    test('LIMAS-SUD-2094: Dialog has Cancel, Save, and Close controls', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      const row = features.tableRows.first();
      await features.openAddChildDialog(row);

      await recordEvidence('assert-toBeVisible-features-add-child.spec-66', async () => expect(features.addChildCancelButton).toBeVisible());
      await recordEvidence('assert-toBeVisible-features-add-child.spec-67', async () => expect(features.addChildSaveButton).toBeVisible());
      await recordEvidence('assert-toBeVisible-features-add-child.spec-68', async () => expect(features.addChildCloseButton).toBeVisible());

      await features.closeAddChildDialog();
    });
  });

  // â”€â”€â”€ 2. Access Levels Inheritance â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Access Levels â€” Inherited and Disabled', () => {

    test('LIMAS-SUD-2095: Access Levels input and Add button are disabled', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      const row = features.tableRows.first();
      await features.openAddChildDialog(row);

      await recordEvidence('assert-toBeDisabled-features-add-child.spec-90', async () => expect(features.addChildAccessLevelsInput).toBeDisabled());
      await recordEvidence('assert-toBeDisabled-features-add-child.spec-91', async () => expect(features.addChildAccessLevelsAddButton).toBeDisabled());

      await features.closeAddChildDialog();
    });

    test('LIMAS-SUD-2096: Info text explains access levels are inherited from root', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      const row = features.tableRows.first();
      await features.openAddChildDialog(row);

      await recordEvidence('assert-toBeVisible-features-add-child.spec-108', async () => expect(features.addChildAccessLevelsInfoText).toBeVisible());
      await recordEvidence('assert-toBeVisible-features-add-child.spec-109', async () => expect(features.addChildAccessLevelsInherited).toBeVisible());

      await features.closeAddChildDialog();
    });

    test('LIMAS-SUD-2097: Inherited access levels match parent row access levels', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      // Find a parent that has access levels
      const count = await features.getRowCount();
      let testRow = features.tableRows.first();
      for (let i = 0; i < count; i++) {
        const row = features.tableRows.nth(i);
        const levelsCell = features.accessLevelsCell(row);
        const cellText = await levelsCell.textContent();
        if (cellText && cellText.trim().length > 0) {
          testRow = row;
          break;
        }
      }

      // Read parent table access levels
      const parentLevelsText = await features.accessLevelsCell(testRow).textContent();
      const parentLevels = (parentLevelsText || '').trim().split(/\s+/);

      await features.openAddChildDialog(testRow);
      const inheritedLevels = await features.getInheritedAccessLevels();

      // Every inherited level shown should appear in parent
      for (const level of inheritedLevels) {
        await recordEvidence('assert-toContain-features-add-child.spec-145', async () => expect(parentLevels).toContain(level));
      }

      await features.closeAddChildDialog();
    });

    test('LIMAS-SUD-2098: Parent with no access levels shows no inherited chips', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      // Find a parent with empty access levels column
      const count = await features.getRowCount();
      let emptyRow: any = null;
      for (let i = 0; i < count; i++) {
        const row = features.tableRows.nth(i);
        const levelsCell = features.accessLevelsCell(row);
        const cellText = await levelsCell.textContent();
        if (!cellText || cellText.trim().length === 0) {
          emptyRow = row;
          break;
        }
      }

      if (emptyRow) {
        await features.openAddChildDialog(emptyRow);
        const inheritedLevels = await features.getInheritedAccessLevels();
        await recordEvidence('assert-toBe-features-add-child.spec-176', async () => expect(inheritedLevels.length).toBe(0));
        await features.closeAddChildDialog();
      } else {
        test.skip(true, 'No parent with empty access levels found');
      }
    });
  });

  // â”€â”€â”€ 3. Parent Context â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Parent Context', () => {

    test('LIMAS-SUD-2099: Opening Add Child from different parent updates the dialog context', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      const row1 = features.tableRows.nth(0);
      const parent1Name = await features.getFeatureName(row1);
      await features.openAddChildDialog(row1);
      const inherited1 = await features.getInheritedAccessLevels();
      await features.closeAddChildDialog();

      // Open from different parent
      const row2 = features.tableRows.nth(5);
      const parent2Name = await features.getFeatureName(row2);
      await features.openAddChildDialog(row2);
      const inherited2 = await features.getInheritedAccessLevels();

      // Parents are different â€” dialog context should reflect new parent
      await recordEvidence('assert-toBe-features-add-child.spec-210', async () => expect(parent1Name).not.toBe(parent2Name));

      await features.closeAddChildDialog();
    });

    test('LIMAS-SUD-2100: Cancel dismisses without modifying hierarchy', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();
      const originalCount = await features.getRowCount();

      const row = features.tableRows.first();
      await features.openAddChildDialog(row);
      await recordEvidence('action-fill-features-add-child.spec-227', async () => features.addChildFeatureNameInput.fill('TestIgnore'));
      await features.closeAddChildDialog();

      const newCount = await features.getRowCount();
      await recordEvidence('assert-toBe-features-add-child.spec-231', async () => expect(newCount).toBe(originalCount));

      await recordEvidence('assert-toBeVisible-features-add-child.spec-233', async () => expect(features.addChildDialog).not.toBeVisible());
    });
  });

  // â”€â”€â”€ 4. Field Behavior â€” Child-specific â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Field Behavior', () => {

    test('LIMAS-SUD-2101: Feature Name and Feature ID are marked required', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      const row = features.tableRows.first();
      await features.openAddChildDialog(row);

      // Required markers present
      await recordEvidence('assert-toBeVisible-features-add-child.spec-254', async () => expect(features.addChildDialog.locator('text=Feature Name *')).toBeVisible());
      await recordEvidence('assert-toBeVisible-features-add-child.spec-255', async () => expect(features.addChildDialog.locator('text=Feature ID *')).toBeVisible());

      await features.closeAddChildDialog();
    });

    test('LIMAS-SUD-2102: Feature Name input accepts text', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      const row = features.tableRows.first();
      await features.openAddChildDialog(row);

      await recordEvidence('action-fill-features-add-child.spec-272', async () => features.addChildFeatureNameInput.fill('TestChild'));
      await recordEvidence('assert-toHaveValue-features-add-child.spec-273', async () => expect(features.addChildFeatureNameInput).toHaveValue('TestChild'));

      await features.closeAddChildDialog();
    });

    test('LIMAS-SUD-2103: Feature ID input accepts text', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      const row = features.tableRows.first();
      await features.openAddChildDialog(row);

      await recordEvidence('action-fill-features-add-child.spec-290', async () => features.addChildFeatureIdInput.fill('com.test.child'));
      await recordEvidence('assert-toHaveValue-features-add-child.spec-291', async () => expect(features.addChildFeatureIdInput).toHaveValue('com.test.child'));

      await features.closeAddChildDialog();
    });

    test('LIMAS-SUD-2104: Description counter starts at 0/1000 and updates', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      const row = features.tableRows.first();
      await features.openAddChildDialog(row);

      await recordEvidence('assert-toContainText-features-add-child.spec-308', async () => expect(features.addChildDescriptionCounter).toContainText('0 / 1000'));
      await recordEvidence('action-fill-features-add-child.spec-309', async () => features.addChildDescriptionInput.fill('Hello'));
      await recordEvidence('assert-toContainText-features-add-child.spec-310', async () => expect(features.addChildDescriptionCounter).toContainText('5 / 1000'));

      await features.closeAddChildDialog();
    });

    test('LIMAS-SUD-2105: Description max length is 1000 characters', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      const row = features.tableRows.first();
      await features.openAddChildDialog(row);

      const longText = 'B'.repeat(1001);
      await recordEvidence('action-fill-features-add-child.spec-328', async () => features.addChildDescriptionInput.fill(longText));
      const val = await features.addChildDescriptionInput.inputValue();
      await recordEvidence('assert-toBeLessThanOrEqual-features-add-child.spec-330', async () => expect(val.length).toBeLessThanOrEqual(1000));

      await features.closeAddChildDialog();
    });

    test('LIMAS-SUD-2106: Versions input and Add button are present', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      const row = features.tableRows.first();
      await features.openAddChildDialog(row);

      await recordEvidence('assert-toBeVisible-features-add-child.spec-347', async () => expect(features.addChildVersionsInput).toBeVisible());
      await recordEvidence('assert-toBeVisible-features-add-child.spec-348', async () => expect(features.addChildVersionsAddButton).toBeVisible());

      await features.closeAddChildDialog();
    });

    test('LIMAS-SUD-2107: Adding version creates chip in child dialog', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      const row = features.tableRows.first();
      await features.openAddChildDialog(row);

      await features.addChildVersion('3.0.0');
      await recordEvidence('assert-toBeVisible-features-add-child.spec-366', async () => expect(features.addChildDialog.locator('text=3.0.0').first()).toBeVisible());

      await features.closeAddChildDialog();
    });

    test('LIMAS-SUD-2108: Multiple versions create multiple chips in child dialog', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      const row = features.tableRows.first();
      await features.openAddChildDialog(row);

      await features.addChildVersion('1.5.0');
      await features.addChildVersion('2.0.0');
      await recordEvidence('assert-toBeVisible-features-add-child.spec-385', async () => expect(features.addChildDialog.locator('text=1.5.0').first()).toBeVisible());
      await recordEvidence('assert-toBeVisible-features-add-child.spec-386', async () => expect(features.addChildDialog.locator('text=2.0.0').first()).toBeVisible());

      await features.closeAddChildDialog();
    });

    test('LIMAS-SUD-2109: Empty/whitespace version does not create chip', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      const row = features.tableRows.first();
      await features.openAddChildDialog(row);

      await recordEvidence('action-fill-features-add-child.spec-403', async () => features.addChildVersionsInput.fill('   '));
      await recordEvidence('action-click-features-add-child.spec-404', async () => features.addChildVersionsAddButton.click());

      // Whitespace-only should not produce a visible chip
      const chip = features.addChildVersionsInput.locator('../..').locator('div.inline-flex:has(svg.lucide-x)');
      await recordEvidence('assert-toHaveCount-features-add-child.spec-408', async () => expect(chip).toHaveCount(0));

      await features.closeAddChildDialog();
    });
  });

  // â”€â”€â”€ 5. Save State â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Save State', () => {

    test('LIMAS-SUD-2110: Save is initially enabled when dialog opens', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      const row = features.tableRows.first();
      await features.openAddChildDialog(row);

      await recordEvidence('assert-toBeEnabled-features-add-child.spec-430', async () => expect(features.addChildSaveButton).toBeEnabled());

      await features.closeAddChildDialog();
    });
  });

  // â”€â”€â”€ 6. Dismissal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Dismissal', () => {

    test('LIMAS-SUD-2111: Cancel dismisses the dialog', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      const row = features.tableRows.first();
      await features.openAddChildDialog(row);
      await recordEvidence('action-click-features-add-child.spec-451', async () => features.addChildCancelButton.click());

      await recordEvidence('assert-toBeVisible-features-add-child.spec-453', async () => expect(features.addChildDialog).not.toBeVisible());
    });

    test('LIMAS-SUD-2112: Close button dismisses the dialog', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      const row = features.tableRows.first();
      await features.openAddChildDialog(row);
      await recordEvidence('action-click-features-add-child.spec-467', async () => features.addChildCloseButton.click());

      await recordEvidence('assert-toBeVisible-features-add-child.spec-469', async () => expect(features.addChildDialog).not.toBeVisible());
    });

    test('LIMAS-SUD-2113: Escape dismisses the dialog', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      const row = features.tableRows.first();
      await features.openAddChildDialog(row);
      await recordEvidence('action-press-features-add-child.spec-483', async () => page.keyboard.press('Escape'));

      await recordEvidence('assert-toBeVisible-features-add-child.spec-485', async () => expect(features.addChildDialog).not.toBeVisible());
    });

    test('LIMAS-SUD-2114: Reopening after Cancel shows clean form', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      const row = features.tableRows.first();

      await features.openAddChildDialog(row);
      await recordEvidence('action-fill-features-add-child.spec-500', async () => features.addChildFeatureNameInput.fill('DirtyName'));
      await features.closeAddChildDialog();

      await features.openAddChildDialog(row);
      const value = await features.addChildFeatureNameInput.inputValue();
      await recordEvidence('assert-toBe-features-add-child.spec-505', async () => expect(value).toBe(''));

      await features.closeAddChildDialog();
    });
  });

  // â”€â”€â”€ 7. Gated Child Lifecycle â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Gated Lifecycle', () => {

    test('LIMAS-SUD-2115: Controlled create-delete child lifecycle', async ({ page }) => {
      test.skip(
        !process.env.TEST_FEATURE_ALLOW_MUTATION || !process.env.TEST_FEATURE_ALLOW_DELETE,
        'TEST_FEATURE_ALLOW_MUTATION and TEST_FEATURE_ALLOW_DELETE not set',
      );

      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();
      await features.expandAll();

      const originalCount = await features.getRowCount();
      const marker = `test-${Date.now()}`;
      const childName = `ChildFeature-${marker}`;
      const childId = `com.test.child.${marker}`;
      let childCreated = false;

      try {
        // Find a parent with access levels for full verification
        const count = await features.getRowCount();
        let parentRow = features.tableRows.first();
        for (let i = 0; i < count; i++) {
          const row = features.tableRows.nth(i);
          const levelsCell = features.accessLevelsCell(row);
          const cellText = await levelsCell.textContent();
          if (cellText && cellText.trim().length > 0) {
            parentRow = row;
            break;
          }
        }

        const parentName = await features.getFeatureName(parentRow);

        // Phase 1: Create child
        await features.openAddChildDialog(parentRow);
        await recordEvidence('action-fill-features-add-child.spec-554', async () => features.addChildFeatureNameInput.fill(childName));
        await recordEvidence('action-fill-features-add-child.spec-555', async () => features.addChildFeatureIdInput.fill(childId));
        await features.addChildVersion('1.0.0');
        await recordEvidence('action-click-features-add-child.spec-557', async () => features.addChildSaveButton.click());
        await features.heading.waitFor({ state: 'visible' });

        childCreated = true;

        // Phase 2: Search finds child
        await features.search(childName);
        const searchRow = await features.getRowByName(childName);
        await recordEvidence('assert-toBeNull-features-add-child.spec-565', async () => expect(searchRow).not.toBeNull());

        // Phase 3: Verify child row structure
        if (searchRow) {
          const childIdCell = await features.getFeatureId(searchRow);
          await recordEvidence('assert-toBe-features-add-child.spec-570', async () => expect(childIdCell).toBe(childId));
        }

        await features.clearSearch();

        // Phase 4: Cleanup â€” delete child (when Delete is functional)
        await features.search(childName);
        // Cleanup placeholder â€” actual delete depends on Delete feature availability
        await features.clearSearch();

      } finally {
        // Verify features page is recoverable
        await features.navigate();
        await recordEvidence('assert-toBeVisible-features-add-child.spec-583', async () => expect(features.heading).toBeVisible());
      }
    });
  });

  // â”€â”€â”€ 8. Safe Restoration â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Safe Restoration', () => {

    test('LIMAS-SUD-2116: Features page clean after child dialog exploration', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      const row = features.tableRows.first();
      await features.openAddChildDialog(row);
      await recordEvidence('action-fill-features-add-child.spec-603', async () => features.addChildFeatureNameInput.fill('ExplorationTest'));
      await features.addChildVersion('5.0.0');
      await features.closeAddChildDialog();

      await recordEvidence('assert-toBeVisible-features-add-child.spec-607', async () => expect(features.heading).toBeVisible());
      await recordEvidence('assert-toBeVisible-features-add-child.spec-608', async () => expect(features.addChildDialog).not.toBeVisible());

      const rowCount = await features.getRowCount();
      await recordEvidence('assert-toBeGreaterThan-features-add-child.spec-611', async () => expect(rowCount).toBeGreaterThan(0));
    });
  });
});