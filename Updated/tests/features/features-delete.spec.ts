import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { FeaturesPage } from '../pages/features.page';

const PROFILE = resolveProfileName();

// â”€â”€â”€ FTR-E: Features â€” Delete Feature â”€â”€â”€

test.describe('Features â€” FTR-E', () => {

  test.beforeEach(async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const features = new FeaturesPage(page);
    await features.navigate();
  });

  // â”€â”€â”€ 1. Delete Button Visibility and Semantics â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Delete Button Visibility and Semantics', () => {

    test('LIMAS-SUD-2144: Delete button is visible on every row', async ({ page }) => {
      const features = new FeaturesPage(page);
      const count = await features.getRowCount();
      await recordEvidence('assert-toBeGreaterThan-features-delete.spec-28', async () => expect(count).toBeGreaterThan(0));

      for (let i = 0; i < count; i++) {
        const row = features.tableRows.nth(i);
        await recordEvidence('assert-toBeVisible-features-delete.spec-32', async () => expect(features.rowDeleteButton(row)).toBeVisible());
      }
    });

    test('LIMAS-SUD-2145: Delete button has role button and accessible name "Delete"', async ({ page }) => {
      const features = new FeaturesPage(page);
      const row = features.tableRows.first();
      const btn = features.rowDeleteButton(row);

      await recordEvidence('assert-toHaveRole-features-delete.spec-41', async () => expect(btn).toHaveRole('button'));
      await recordEvidence('assert-toHaveAccessibleName-features-delete.spec-42', async () => expect(btn).toHaveAccessibleName('Delete'));
    });

    test('LIMAS-SUD-2146: Delete button has destructive text styling', async ({ page }) => {
      const features = new FeaturesPage(page);
      const count = await features.getRowCount();
      const sampleIdx = Math.min(0, count - 1);
      const row = features.tableRows.nth(sampleIdx);
      const btn = features.rowDeleteButton(row);

      const cls = await btn.getAttribute('class');
      await recordEvidence('assert-toContain-features-delete.spec-53', async () => expect(cls).toContain('destructive'));
    });
  });

  // â”€â”€â”€ 2. Delete Disabled / Enabled Rules â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Delete Disabled / Enabled Rules', () => {

    test('LIMAS-SUD-2147: Delete disabled when feature has associated profiles', async ({ page }) => {
      const features = new FeaturesPage(page);
      const row = await features.getFirstRowWithProfiles();
      if (!row) {
        test.skip(true, 'No row with profiles found');
        return;
      }

      const btn = features.rowDeleteButton(row);
      await recordEvidence('assert-toBeVisible-features-delete.spec-70', async () => expect(btn).toBeVisible());
      await recordEvidence('assert-toBeDisabled-features-delete.spec-71', async () => expect(btn).toBeDisabled());
    });

    test('LIMAS-SUD-2148: Delete enabled when feature has 0 profiles', async ({ page }) => {
      const features = new FeaturesPage(page);
      const row = await features.getFirstRowWithNoProfiles();
      if (!row) {
        test.skip(true, 'No row with 0 profiles found');
        return;
      }

      const btn = features.rowDeleteButton(row);
      await recordEvidence('assert-toBeVisible-features-delete.spec-83', async () => expect(btn).toBeVisible());
      await recordEvidence('assert-toBeEnabled-features-delete.spec-84', async () => expect(btn).toBeEnabled());
    });

    test('LIMAS-SUD-2149: Disabled Delete tooltip explains profile association', async ({ page }) => {
      const features = new FeaturesPage(page);
      const row = await features.getFirstRowWithProfiles();
      if (!row) {
        test.skip(true, 'No row with profiles found');
        return;
      }

      const btn = features.rowDeleteButton(row);
      const title = await btn.getAttribute('title');
      await recordEvidence('assert-toContain-features-delete.spec-97', async () => expect(title).toContain('Cannot delete'));
      await recordEvidence('assert-toContain-features-delete.spec-98', async () => expect(title).toContain('profiles'));
    });

    test('LIMAS-SUD-2150: Enabled Delete has no tooltip', async ({ page }) => {
      const features = new FeaturesPage(page);
      const row = await features.getFirstRowWithNoProfiles();
      if (!row) {
        test.skip(true, 'No row with 0 profiles found');
        return;
      }

      const btn = features.rowDeleteButton(row);
      const title = await btn.getAttribute('title');
      await recordEvidence('assert-toBe-features-delete.spec-111', async () => expect(title || '').toBe(''));
    });

    test('LIMAS-SUD-2151: Root feature Delete disabled when associated with profiles', async ({ page }) => {
      const features = new FeaturesPage(page);
      const count = await features.getRowCount();
      let foundRootWithProfiles = false;

      for (let i = 0; i < count; i++) {
        const row = features.tableRows.nth(i);
        const expandBtn = features.rowExpandButton(row);
        const hasExpand = (await expandBtn.count()) > 0;
        if (hasExpand) {
          const profileCount = await features.getProfileCount(row);
          if (profileCount > 0) {
            foundRootWithProfiles = true;
            const btn = features.rowDeleteButton(row);
            await recordEvidence('assert-toBeDisabled-features-delete.spec-128', async () => expect(btn).toBeDisabled());
            break;
          }
        }
      }

      if (!foundRootWithProfiles) {
        test.skip(true, 'No root feature with profiles found');
      }
    });

    test('LIMAS-SUD-2152: Child feature Delete disabled when associated with profiles', async ({ page }) => {
      const features = new FeaturesPage(page);
      const count = await features.getRowCount();
      let foundChildWithProfiles = false;

      for (let i = 0; i < count; i++) {
        const row = features.tableRows.nth(i);
        const expandBtn = features.rowExpandButton(row);
        const hasExpand = (await expandBtn.count()) === 0;
        if (hasExpand) {
          // Has no expand button = leaf (possible child)
          // Check if indented or parent-aware via DOM
          const classAttr = await row.getAttribute('class');
          if (classAttr && classAttr.includes('child')) {
            const profileCount = await features.getProfileCount(row);
            if (profileCount > 0) {
              foundChildWithProfiles = true;
              const btn = features.rowDeleteButton(row);
              await recordEvidence('assert-toBeDisabled-features-delete.spec-157', async () => expect(btn).toBeDisabled());
              break;
            }
          }
        }
      }

      if (!foundChildWithProfiles) {
        test.skip(true, 'No child feature with profiles found');
      }
    });

    test('LIMAS-SUD-2153: Profile count drives Delete disabled state', async ({ page }) => {
      const features = new FeaturesPage(page);
      const count = await features.getRowCount();

      for (let i = 0; i < count; i++) {
        const row = features.tableRows.nth(i);
        const profileCount = await features.getProfileCount(row);
        const btn = features.rowDeleteButton(row);

        if (profileCount > 0) {
          await recordEvidence('assert-toBeDisabled-features-delete.spec-179', async () => expect(btn).toBeDisabled());
        } else {
          await recordEvidence('assert-toBeEnabled-features-delete.spec-181', async () => expect(btn).toBeEnabled());
        }
      }
    });

    test('LIMAS-SUD-2154: Delete button count matches row count', async ({ page }) => {
      const features = new FeaturesPage(page);
      const rowCount = await features.getRowCount();

      // Count Delete buttons in the DOM
      const deleteCount = await page.locator('button:has-text("Delete")').count();
      // Each row should have exactly one Delete
      await recordEvidence('assert-toBeGreaterThanOrEqual-features-delete.spec-193', async () => expect(deleteCount).toBeGreaterThanOrEqual(rowCount));
    });

    test('LIMAS-SUD-2155: One Delete button per row', async ({ page }) => {
      const features = new FeaturesPage(page);
      const count = await features.getRowCount();

      for (let i = 0; i < count; i++) {
        const row = features.tableRows.nth(i);
        const deleteBtns = row.locator('button:has-text("Delete")');
        await recordEvidence('assert-toHaveCount-features-delete.spec-203', async () => expect(deleteBtns).toHaveCount(1));
      }
    });
  });

  // â”€â”€â”€ 3. Confirmation Dialog â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Confirmation Dialog', () => {

    test('LIMAS-SUD-2156: Clicking enabled Delete opens "Are you sure?" alertdialog', async ({ page }) => {
      const features = new FeaturesPage(page);
      const row = await features.getFirstRowWithNoProfiles();
      if (!row) {
        test.skip(true, 'No row with 0 profiles found');
        return;
      }

      const btn = features.rowDeleteButton(row);
      await recordEvidence('action-click-features-delete.spec-221', async () => btn.click());
      await recordEvidence('assert-toBeVisible-features-delete.spec-222', async () => expect(features.deleteConfirmDialog).toBeVisible());

      // Cancel to clean up
      await recordEvidence('action-click-features-delete.spec-225', async () => features.deleteConfirmCancelButton.click());
      await recordEvidence('assert-toBeVisible-features-delete.spec-226', async () => expect(features.deleteConfirmDialog).not.toBeVisible());
    });

    test('LIMAS-SUD-2157: Confirmation dialog has heading "Are you sure?" h2', async ({ page }) => {
      const features = new FeaturesPage(page);
      const row = await features.getFirstRowWithNoProfiles();
      if (!row) {
        test.skip(true, 'No row with 0 profiles found');
        return;
      }

      await recordEvidence('action-click-features-delete.spec-237', async () => features.rowDeleteButton(row).click());
      await recordEvidence('assert-toBeVisible-features-delete.spec-238', async () => expect(features.deleteConfirmDialog).toBeVisible());
      await recordEvidence('assert-toBeVisible-features-delete.spec-239', async () => expect(features.deleteConfirmHeading).toBeVisible());
      await recordEvidence('assert-toHaveText-features-delete.spec-240', async () => expect(features.deleteConfirmHeading).toHaveText('Are you sure?'));

      await recordEvidence('action-click-features-delete.spec-242', async () => features.deleteConfirmCancelButton.click());
      await recordEvidence('assert-toBeVisible-features-delete.spec-243', async () => expect(features.deleteConfirmDialog).not.toBeVisible());
    });

    test('LIMAS-SUD-2158: Confirmation warning mentions feature name and "permanently delete"', async ({ page }) => {
      const features = new FeaturesPage(page);
      const row = await features.getFirstRowWithNoProfiles();
      if (!row) {
        test.skip(true, 'No row with 0 profiles found');
        return;
      }

      const featureName = await features.getFeatureName(row);

      await recordEvidence('action-click-features-delete.spec-256', async () => features.rowDeleteButton(row).click());
      await recordEvidence('assert-toBeVisible-features-delete.spec-257', async () => expect(features.deleteConfirmDialog).toBeVisible());

      const warning = features.deleteConfirmWarning;
      await recordEvidence('assert-toBeVisible-features-delete.spec-260', async () => expect(warning).toBeVisible());
      const text = await warning.textContent();
      await recordEvidence('assert-toContain-features-delete.spec-262', async () => expect(text).toContain('permanently delete'));
      await recordEvidence('assert-toContain-features-delete.spec-263', async () => expect(text).toContain(featureName));

      await recordEvidence('action-click-features-delete.spec-265', async () => features.deleteConfirmCancelButton.click());
      await recordEvidence('assert-toBeVisible-features-delete.spec-266', async () => expect(features.deleteConfirmDialog).not.toBeVisible());
    });

    test('LIMAS-SUD-2159: Confirmation dialog has Cancel and Delete controls', async ({ page }) => {
      const features = new FeaturesPage(page);
      const row = await features.getFirstRowWithNoProfiles();
      if (!row) {
        test.skip(true, 'No row with 0 profiles found');
        return;
      }

      await recordEvidence('action-click-features-delete.spec-277', async () => features.rowDeleteButton(row).click());
      await recordEvidence('assert-toBeVisible-features-delete.spec-278', async () => expect(features.deleteConfirmDialog).toBeVisible());
      await recordEvidence('assert-toBeVisible-features-delete.spec-279', async () => expect(features.deleteConfirmCancelButton).toBeVisible());
      await recordEvidence('assert-toBeVisible-features-delete.spec-280', async () => expect(features.deleteConfirmDeleteButton).toBeVisible());

      // Verify button order: Cancel is active/focused first
      await recordEvidence('assert-toBeFocused-features-delete.spec-283', async () => expect(features.deleteConfirmCancelButton).toBeFocused());

      await recordEvidence('action-click-features-delete.spec-285', async () => features.deleteConfirmCancelButton.click());
      await recordEvidence('assert-toBeVisible-features-delete.spec-286', async () => expect(features.deleteConfirmDialog).not.toBeVisible());
    });

    test('LIMAS-SUD-2160: Cancel dismisses confirmation without deleting', async ({ page }) => {
      const features = new FeaturesPage(page);
      const row = await features.getFirstRowWithNoProfiles();
      if (!row) {
        test.skip(true, 'No row with 0 profiles found');
        return;
      }

      const originalName = await features.getFeatureName(row);
      const originalCount = await features.getRowCount();

      await recordEvidence('action-click-features-delete.spec-300', async () => features.rowDeleteButton(row).click());
      await recordEvidence('assert-toBeVisible-features-delete.spec-301', async () => expect(features.deleteConfirmDialog).toBeVisible());
      await recordEvidence('action-click-features-delete.spec-302', async () => features.deleteConfirmCancelButton.click());
      await recordEvidence('assert-toBeVisible-features-delete.spec-303', async () => expect(features.deleteConfirmDialog).not.toBeVisible());

      // Verify original feature still present
      const rowCount = await features.getRowCount();
      await recordEvidence('assert-toBe-features-delete.spec-307', async () => expect(rowCount).toBe(originalCount));

      const stillThere = await features.getRowByName(originalName);
      await recordEvidence('assert-toBeNull-features-delete.spec-310', async () => expect(stillThere).not.toBeNull());
    });

    test('LIMAS-SUD-2161: Escape dismisses confirmation dialog', async ({ page }) => {
      const features = new FeaturesPage(page);
      const row = await features.getFirstRowWithNoProfiles();
      if (!row) {
        test.skip(true, 'No row with 0 profiles found');
        return;
      }

      await recordEvidence('action-click-features-delete.spec-321', async () => features.rowDeleteButton(row).click());
      await recordEvidence('assert-toBeVisible-features-delete.spec-322', async () => expect(features.deleteConfirmDialog).toBeVisible());
      await recordEvidence('action-press-features-delete.spec-323', async () => page.keyboard.press('Escape'));
      await recordEvidence('assert-toBeVisible-features-delete.spec-324', async () => expect(features.deleteConfirmDialog).not.toBeVisible());
    });

    test('LIMAS-SUD-2162: Confirmation dialog role is alertdialog', async ({ page }) => {
      const features = new FeaturesPage(page);
      const row = await features.getFirstRowWithNoProfiles();
      if (!row) {
        test.skip(true, 'No row with 0 profiles found');
        return;
      }

      await recordEvidence('action-click-features-delete.spec-335', async () => features.rowDeleteButton(row).click());
      await recordEvidence('assert-toBeVisible-features-delete.spec-336', async () => expect(features.deleteConfirmDialog).toBeVisible());

      const role = await features.deleteConfirmDialog.getAttribute('role');
      await recordEvidence('assert-toBe-features-delete.spec-339', async () => expect(role).toBe('alertdialog'));

      await recordEvidence('action-click-features-delete.spec-341', async () => features.deleteConfirmCancelButton.click());
      await recordEvidence('assert-toBeVisible-features-delete.spec-342', async () => expect(features.deleteConfirmDialog).not.toBeVisible());
    });
  });

  // â”€â”€â”€ 4. Gated Synthetic Lifecycle â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Gated Lifecycle', () => {

    test('LIMAS-SUD-2163: Controlled synthetic create-delete lifecycle', async ({ page }) => {
      if (!process.env.TEST_FEATURE_ALLOW_MUTATION || !process.env.TEST_FEATURE_ALLOW_DELETE) {
        test.skip(true, 'TEST_FEATURE_ALLOW_MUTATION and/or TEST_FEATURE_ALLOW_DELETE not set');
        return;
      }

      const features = new FeaturesPage(page);
      const originalCount = await features.getRowCount();
      const marker = `del-${Date.now()}`;
      const featureName = `TFT-Delete-${marker}`;
      const featureId = `com.test.delete.${marker}`;

      try {
        // Phase 1: Create a synthetic feature with no profiles
        await features.openAddRootDialog();
        await recordEvidence('action-fill-features-delete.spec-365', async () => features.addRootFeatureNameInput.fill(featureName));
        await recordEvidence('action-fill-features-delete.spec-366', async () => features.addRootFeatureIdInput.fill(featureId));
        await recordEvidence('action-click-features-delete.spec-367', async () => features.addRootSaveButton.click());
        await features.heading.waitFor({ state: 'visible' });

        // Verify it appears
        const afterCreate = await features.getRowCount();
        await recordEvidence('assert-toBeGreaterThanOrEqual-features-delete.spec-372', async () => expect(afterCreate).toBeGreaterThanOrEqual(originalCount + 1));

        // Phase 2: Verify Delete is enabled for synthetic feature (0 profiles)
        const synthRow = await features.getRowByName(featureName);
        await recordEvidence('assert-toBeNull-features-delete.spec-376', async () => expect(synthRow).not.toBeNull());
        if (synthRow) {
          const deleteBtn = features.rowDeleteButton(synthRow);
          await recordEvidence('assert-toBeEnabled-features-delete.spec-379', async () => expect(deleteBtn).toBeEnabled());

          // Phase 3: Open confirmation, verify content, then Delete
          await recordEvidence('action-click-features-delete.spec-382', async () => deleteBtn.click());
          await recordEvidence('assert-toBeVisible-features-delete.spec-383', async () => expect(features.deleteConfirmDialog).toBeVisible());

          const warning = await features.deleteConfirmWarning.textContent();
          await recordEvidence('assert-toContain-features-delete.spec-386', async () => expect(warning).toContain(featureName));
          await recordEvidence('assert-toContain-features-delete.spec-387', async () => expect(warning).toContain('permanently delete'));

          // Perform the actual Delete
          await recordEvidence('action-click-features-delete.spec-390', async () => features.deleteConfirmDeleteButton.click());
          await features.heading.waitFor({ state: 'visible' });

          // Phase 4: Feature should be gone
          const afterDelete = await features.getRowCount();
          await recordEvidence('assert-toBe-features-delete.spec-395', async () => expect(afterDelete).toBe(originalCount));

          // Search should not find it
          await features.search(featureName);
          const found = await features.getRowByName(featureName);
          await recordEvidence('assert-toBeNull-features-delete.spec-400', async () => expect(found).toBeNull());
          await features.clearSearch();

          // Hierarchy restored
          const restored = await features.getRowCount();
          await recordEvidence('assert-toBe-features-delete.spec-405', async () => expect(restored).toBe(originalCount));
        }
      } finally {
        // Cleanup: search for the marker and delete if found
        await features.search(featureName);
        try {
          const leftover = await features.getRowByName(featureName);
          if (leftover) {
            const deleteBtn = features.rowDeleteButton(leftover);
            if (await deleteBtn.isEnabled()) {
              await recordEvidence('action-click-features-delete.spec-415', async () => deleteBtn.click());
              await recordEvidence('action-click-features-delete.spec-416', async () => features.deleteConfirmDeleteButton.click());
              await features.heading.waitFor({ state: 'visible' });
            }
          }
        } catch {
          // Feature already cleaned up
        }
        await features.clearSearch();
      }
    });
  });

  // â”€â”€â”€ 5. Safe Restoration â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  test.describe('Safe Restoration', () => {

    test('LIMAS-SUD-2164: Features page clean after delete dialog exploration', async ({ page }) => {
      const features = new FeaturesPage(page);
      const originalCount = await features.getRowCount();

      // Open confirmation, cancel â€” simulate exploration
      const row = await features.getFirstRowWithNoProfiles();
      if (row) {
        await recordEvidence('action-click-features-delete.spec-439', async () => features.rowDeleteButton(row).click());
        await recordEvidence('assert-toBeVisible-features-delete.spec-440', async () => expect(features.deleteConfirmDialog).toBeVisible());
        await recordEvidence('action-click-features-delete.spec-441', async () => features.deleteConfirmCancelButton.click());
        await recordEvidence('assert-toBeVisible-features-delete.spec-442', async () => expect(features.deleteConfirmDialog).not.toBeVisible());
      }

      // Verify page is clean
      await recordEvidence('assert-toBeVisible-features-delete.spec-446', async () => expect(features.heading).toBeVisible());
      await recordEvidence('assert-toBeVisible-features-delete.spec-447', async () => expect(features.addRootFeatureButton).toBeVisible());

      const rowCount = await features.getRowCount();
      await recordEvidence('assert-toBe-features-delete.spec-450', async () => expect(rowCount).toBe(originalCount));
    });
  });
});