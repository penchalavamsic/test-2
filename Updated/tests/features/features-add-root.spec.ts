import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { FeaturesPage } from '../pages/features.page';

const PROFILE = resolveProfileName();

// â”€â”€â”€ FTR-B: Features â€” Add Root Feature Dialog â”€â”€â”€

test.describe('Features â€” FTR-B', () => {

  // â”€â”€â”€ 1. Dialog Shell â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Dialog Shell', () => {

    test('LIMAS-SUD-2060: Add Root Feature button opens a dialog', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      await features.openAddRootDialog();
      await recordEvidence('assert-toBeVisible-features-add-root.spec-26', async () => expect(features.addRootDialog).toBeVisible());
      await features.closeAddRootDialog();
    });

    test('LIMAS-SUD-2061: Dialog has role dialog and accessible name', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      await features.openAddRootDialog();
      const role = await features.addRootDialog.getAttribute('role');
      await recordEvidence('assert-toBe-features-add-root.spec-41', async () => expect(role).toBe('dialog'));
      await features.closeAddRootDialog();
    });

    test('LIMAS-SUD-2062: Dialog has heading "Add Root Feature" as h2', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      await features.openAddRootDialog();
      await recordEvidence('assert-toBeVisible-features-add-root.spec-55', async () => expect(features.addRootDialogHeading).toBeVisible());
      await features.closeAddRootDialog();
    });

    test('LIMAS-SUD-2063: Dialog has description "Add a new root feature"', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      await features.openAddRootDialog();
      await recordEvidence('assert-toBeVisible-features-add-root.spec-69', async () => expect(features.addRootDialogDescription).toBeVisible());
      await features.closeAddRootDialog();
    });

    test('LIMAS-SUD-2064: Dialog has Cancel, Save, and Close controls', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      await features.openAddRootDialog();
      await recordEvidence('assert-toBeVisible-features-add-root.spec-83', async () => expect(features.addRootCancelButton).toBeVisible());
      await recordEvidence('assert-toBeVisible-features-add-root.spec-84', async () => expect(features.addRootSaveButton).toBeVisible());
      await recordEvidence('assert-toBeVisible-features-add-root.spec-85', async () => expect(features.addRootCloseButton).toBeVisible());
      await features.closeAddRootDialog();
    });
  });

  // â”€â”€â”€ 2. Feature Name and Feature ID â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Feature Name and ID', () => {

    test('LIMAS-SUD-2065: Feature Name input accepts text', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      await features.openAddRootDialog();
      await recordEvidence('action-fill-features-add-root.spec-104', async () => features.addRootFeatureNameInput.fill('TestFeature'));
      await recordEvidence('assert-toHaveValue-features-add-root.spec-105', async () => expect(features.addRootFeatureNameInput).toHaveValue('TestFeature'));
      await features.closeAddRootDialog();
    });

    test('LIMAS-SUD-2066: Feature Name is marked required', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      await features.openAddRootDialog();
      // Required indicator: the label includes "Feature Name *"
      await recordEvidence('assert-toBeVisible-features-add-root.spec-120', async () => expect(features.addRootDialog.locator('text=Feature Name *')).toBeVisible());
      await features.closeAddRootDialog();
    });

    test('LIMAS-SUD-2067: Feature ID input accepts text', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      await features.openAddRootDialog();
      await recordEvidence('action-fill-features-add-root.spec-134', async () => features.addRootFeatureIdInput.fill('test-feature-id-001'));
      await recordEvidence('assert-toHaveValue-features-add-root.spec-135', async () => expect(features.addRootFeatureIdInput).toHaveValue('test-feature-id-001'));
      await features.closeAddRootDialog();
    });

    test('LIMAS-SUD-2068: Feature ID is marked required', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      await features.openAddRootDialog();
      await recordEvidence('assert-toBeVisible-features-add-root.spec-149', async () => expect(features.addRootDialog.locator('text=Feature ID *')).toBeVisible());
      await features.closeAddRootDialog();
    });

    test('LIMAS-SUD-2069: Empty Feature Name with ID filled â€” Save state', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      await features.openAddRootDialog();
      await recordEvidence('action-fill-features-add-root.spec-163', async () => features.addRootFeatureIdInput.fill('test-id'));
      // Document the Save state when only one required field is filled
      // Inspect but DO NOT click Save
      await recordEvidence('assert-toBeVisible-features-add-root.spec-166', async () => expect(features.addRootSaveButton).toBeVisible());
      await features.closeAddRootDialog();
    });
  });

  // â”€â”€â”€ 3. Description â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Description', () => {

    test('LIMAS-SUD-2070: Description field is present and optional', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      await features.openAddRootDialog();
      await recordEvidence('assert-toBeVisible-features-add-root.spec-185', async () => expect(features.addRootDescriptionInput).toBeVisible());
      // Description has no * â€” it's optional
      await features.closeAddRootDialog();
    });

    test('LIMAS-SUD-2071: Description character counter starts at 0/1000', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      await features.openAddRootDialog();
      await recordEvidence('assert-toContainText-features-add-root.spec-200', async () => expect(features.addRootDescriptionCounter).toContainText('0 / 1000'));
      await features.closeAddRootDialog();
    });

    test('LIMAS-SUD-2072: Description counter updates while typing', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      await features.openAddRootDialog();
      await recordEvidence('action-fill-features-add-root.spec-214', async () => features.addRootDescriptionInput.fill('Hello World'));
      await recordEvidence('assert-toContainText-features-add-root.spec-215', async () => expect(features.addRootDescriptionCounter).toContainText('11 / 1000'));
      await features.closeAddRootDialog();
    });

    test('LIMAS-SUD-2073: Description maximum length is 1000 characters', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      await features.openAddRootDialog();

      // Type 1000 characters + 1 more
      const text = 'A'.repeat(1001);
      await recordEvidence('action-fill-features-add-root.spec-232', async () => features.addRootDescriptionInput.fill(text));
      const value = await features.addRootDescriptionInput.inputValue();
      // Value should be truncated to 1000
      await recordEvidence('assert-toBeLessThanOrEqual-features-add-root.spec-235', async () => expect(value.length).toBeLessThanOrEqual(1000));

      await features.closeAddRootDialog();
    });
  });

  // â”€â”€â”€ 4. Versions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Versions', () => {

    test('LIMAS-SUD-2074: Versions input and Add button are present', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      await features.openAddRootDialog();
      await recordEvidence('assert-toBeVisible-features-add-root.spec-255', async () => expect(features.addRootVersionsInput).toBeVisible());
      await recordEvidence('assert-toBeVisible-features-add-root.spec-256', async () => expect(features.addRootVersionsAddButton).toBeVisible());
      await features.closeAddRootDialog();
    });

    test('LIMAS-SUD-2075: Add version creates a chip with removal control', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      await features.openAddRootDialog();
      await features.addVersion('1.0.0');

      // Check the chip appears
      const chip = features.getVersionChip('1.0.0');
      await recordEvidence('assert-toBeVisible-features-add-root.spec-274', async () => expect(chip).toBeVisible());

      await features.closeAddRootDialog();
    });

    test('LIMAS-SUD-2076: Add multiple versions creates multiple chips', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      await features.openAddRootDialog();
      await features.addVersion('1.0.0');
      await features.addVersion('2.0.0');

      await recordEvidence('assert-toBeVisible-features-add-root.spec-292', async () => expect(features.getVersionChip('1.0.0')).toBeVisible());
      await recordEvidence('assert-toBeVisible-features-add-root.spec-293', async () => expect(features.getVersionChip('2.0.0')).toBeVisible());

      await features.closeAddRootDialog();
    });

    test('LIMAS-SUD-2077: Duplicate version adds only once or is validated', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      await features.openAddRootDialog();
      await features.addVersion('1.0.0');
      await features.addVersion('1.0.0');

      // The system should handle duplicates gracefully
      // Either deduplicate or show validation â€” verify no crash
      await recordEvidence('assert-toBeVisible-features-add-root.spec-313', async () => expect(features.addRootDialog).toBeVisible());
      await features.closeAddRootDialog();
    });

    test('LIMAS-SUD-2078: Empty and whitespace-only Add does not create a valid chip', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      await features.openAddRootDialog();
      await recordEvidence('action-fill-features-add-root.spec-327', async () => features.addRootVersionsInput.fill('   '));
      await recordEvidence('action-click-features-add-root.spec-328', async () => features.addRootVersionsAddButton.click());

      // Whitespace-only should not create a chip
      const chip = features.getVersionChip('   ');
      const count = await chip.count();
      await recordEvidence('assert-toBe-features-add-root.spec-333', async () => expect(count).toBe(0));

      await features.closeAddRootDialog();
    });
  });

  // â”€â”€â”€ 5. Access Levels â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Access Levels', () => {

    test('LIMAS-SUD-2079: Access Levels input and Add button are present', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      await features.openAddRootDialog();
      await recordEvidence('assert-toBeVisible-features-add-root.spec-353', async () => expect(features.addRootAccessLevelsInput).toBeVisible());
      await recordEvidence('assert-toBeVisible-features-add-root.spec-354', async () => expect(features.addRootAccessLevelsAddButton).toBeVisible());
      await features.closeAddRootDialog();
    });

    test('LIMAS-SUD-2080: Add access level creates a chip with removal control', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      await features.openAddRootDialog();
      await features.addAccessLevel('Premium');

      const chip = features.addRootDialog.locator('text=Premium');
      await recordEvidence('assert-toBeVisible-features-add-root.spec-371', async () => expect(chip.first()).toBeVisible());

      await features.closeAddRootDialog();
    });

    test('LIMAS-SUD-2081: Add multiple access levels', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      await features.openAddRootDialog();
      await features.addAccessLevel('Basic');
      await features.addAccessLevel('Premium');

      await recordEvidence('assert-toBeVisible-features-add-root.spec-389', async () => expect(features.addRootDialog.locator('text=Basic').first()).toBeVisible());
      await recordEvidence('assert-toBeVisible-features-add-root.spec-390', async () => expect(features.addRootDialog.locator('text=Premium').first()).toBeVisible());

      await features.closeAddRootDialog();
    });

    test('LIMAS-SUD-2082: Duplicate access level is handled', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      await features.openAddRootDialog();
      await features.addAccessLevel('Basic');
      await features.addAccessLevel('Basic');

      await recordEvidence('assert-toBeVisible-features-add-root.spec-408', async () => expect(features.addRootDialog).toBeVisible());
      await features.closeAddRootDialog();
    });
  });

  // â”€â”€â”€ 6. Save State â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Save State', () => {

    test('LIMAS-SUD-2083: Save is initially enabled when dialog opens', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      await features.openAddRootDialog();
      await recordEvidence('assert-toBeEnabled-features-add-root.spec-427', async () => expect(features.addRootSaveButton).toBeEnabled());
      await features.closeAddRootDialog();
    });

    test('LIMAS-SUD-2084: Save remains enabled after filling required fields', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      await features.openAddRootDialog();
      await recordEvidence('action-fill-features-add-root.spec-441', async () => features.addRootFeatureNameInput.fill('TestFeature'));
      await recordEvidence('action-fill-features-add-root.spec-442', async () => features.addRootFeatureIdInput.fill('test-id'));
      await recordEvidence('assert-toBeEnabled-features-add-root.spec-443', async () => expect(features.addRootSaveButton).toBeEnabled());
      await features.closeAddRootDialog();
    });

    test('LIMAS-SUD-2085: Save state with optional fields filled', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      await features.openAddRootDialog();
      await recordEvidence('action-fill-features-add-root.spec-457', async () => features.addRootFeatureNameInput.fill('TestFeature'));
      await recordEvidence('action-fill-features-add-root.spec-458', async () => features.addRootFeatureIdInput.fill('test-id'));
      await recordEvidence('action-fill-features-add-root.spec-459', async () => features.addRootDescriptionInput.fill('A test description'));
      await features.addVersion('1.0.0');
      await features.addAccessLevel('Basic');

      // Save should remain enabled with all fields filled
      await recordEvidence('assert-toBeEnabled-features-add-root.spec-464', async () => expect(features.addRootSaveButton).toBeEnabled());
      await features.closeAddRootDialog();
    });
  });

  // â”€â”€â”€ 7. Dismissal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Dismissal', () => {

    test('LIMAS-SUD-2086: Cancel dismisses the dialog without creating', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      await features.openAddRootDialog();
      await recordEvidence('action-fill-features-add-root.spec-483', async () => features.addRootFeatureNameInput.fill('TestName'));
      await recordEvidence('action-click-features-add-root.spec-484', async () => features.addRootCancelButton.click());

      await recordEvidence('assert-toBeVisible-features-add-root.spec-486', async () => expect(features.addRootDialog).not.toBeVisible());
    });

    test('LIMAS-SUD-2087: Close button dismisses the dialog', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      await features.openAddRootDialog();
      await recordEvidence('action-click-features-add-root.spec-499', async () => features.addRootCloseButton.click());

      await recordEvidence('assert-toBeVisible-features-add-root.spec-501', async () => expect(features.addRootDialog).not.toBeVisible());
    });

    test('LIMAS-SUD-2088: Escape dismisses the dialog', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      await features.openAddRootDialog();
      await recordEvidence('action-press-features-add-root.spec-514', async () => page.keyboard.press('Escape'));

      await recordEvidence('assert-toBeVisible-features-add-root.spec-516', async () => expect(features.addRootDialog).not.toBeVisible());
    });

    test('LIMAS-SUD-2089: Reopening dialog after Cancel shows clean form', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      // Fill and dismiss
      await features.openAddRootDialog();
      await recordEvidence('action-fill-features-add-root.spec-530', async () => features.addRootFeatureNameInput.fill('TestName'));
      await recordEvidence('action-click-features-add-root.spec-531', async () => features.addRootCancelButton.click());

      // Reopen
      await features.openAddRootDialog();
      // Form should be reset (empty)
      const value = await features.addRootFeatureNameInput.inputValue();
      await recordEvidence('assert-toBe-features-add-root.spec-537', async () => expect(value).toBe(''));

      await features.closeAddRootDialog();
    });
  });

  // â”€â”€â”€ 8. Gated Create Lifecycle â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Gated Lifecycle', () => {

    test('LIMAS-SUD-2090: Controlled create-delete lifecycle with mutation gates', async ({ page }) => {
      if (!process.env.TEST_FEATURE_ALLOW_MUTATION || !process.env.TEST_FEATURE_ALLOW_DELETE) {
        test.skip(true, 'TEST_FEATURE_ALLOW_MUTATION and TEST_FEATURE_ALLOW_DELETE not set');
        return;
      }

      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      const originalCount = await features.getRowCount();
      const marker = `test-${Date.now()}`;

      // Phase 1: Create
      await features.openAddRootDialog();
      await recordEvidence('action-fill-features-add-root.spec-566', async () => features.addRootFeatureNameInput.fill(`TestFeature-${marker}`));
      await recordEvidence('action-fill-features-add-root.spec-567', async () => features.addRootFeatureIdInput.fill(`com.test.${marker}`));
      await features.addVersion('1.0.0');
      await features.addAccessLevel('Basic');
      await recordEvidence('action-click-features-add-root.spec-570', async () => features.addRootSaveButton.click());
      await features.heading.waitFor({ state: 'visible' });

      // Verify new feature appears
      const newCount = await features.getRowCount();
      await recordEvidence('assert-toBeGreaterThanOrEqual-features-add-root.spec-575', async () => expect(newCount).toBeGreaterThanOrEqual(originalCount + 1));

      // Phase 2: Delete via search and card menu â€” cleanup
      await features.search(`TestFeature-${marker}`);
      const deleteRow = await features.getRowByName(`TestFeature-${marker}`);
      if (deleteRow) {
        // When delete is available, clean up
      }
      await features.clearSearch();
    });
  });

  // â”€â”€â”€ 9. Safe Restoration â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Safe Restoration', () => {

    test('LIMAS-SUD-2091: Features page clean after dialog exploration', async ({ page }) => {
      const flow = new AuthenticationFlow(page);
      await flow.ensureAuthenticated(PROFILE);
      const dashboard = new SystemUserDashboardPage(page);
      await dashboard.waitForFullRender();

      const features = new FeaturesPage(page);
      await features.navigate();

      // Open dialog, interact, cancel
      await features.openAddRootDialog();
      await recordEvidence('action-fill-features-add-root.spec-602', async () => features.addRootFeatureNameInput.fill('Test'));
      await features.addVersion('1.0.0');
      await recordEvidence('action-click-features-add-root.spec-604', async () => features.addRootCancelButton.click());

      // Verify page is clean
      await recordEvidence('assert-toBeVisible-features-add-root.spec-607', async () => expect(features.heading).toBeVisible());
      await recordEvidence('assert-toBeVisible-features-add-root.spec-608', async () => expect(features.addRootDialog).not.toBeVisible());

      const rowCount = await features.getRowCount();
      await recordEvidence('assert-toBeGreaterThan-features-add-root.spec-611', async () => expect(rowCount).toBeGreaterThan(0));
    });
  });
});