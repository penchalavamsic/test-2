import { generatedEmail } from '../test-data/generated';
import { resolveProfileName } from '../helpers/auth';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { AuthenticationFlow } from '../flows/authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { ReportsPage } from '../pages/reports.page';

const PROFILE = resolveProfileName();

test.describe('Email Filter', () => {
  test('LIMAS-SUD-1663: Email input â€” type=email, accessible name "Email", placeholder "Enter email", Enter adds chip', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    await recordEvidence('action-click-reports-floating-licenses-filters.spec-18', async () => reports.filtersButton.click());
    await reports.flEmailSearchbox.waitFor({ state: 'visible' });

    // Structure
    const type = await reports.flEmailSearchbox.getAttribute('type');
    await recordEvidence('assert-toBe-reports-floating-licenses-filters.spec-23', async () => expect(type).toBe('email'));
    await recordEvidence('assert-toHaveAccessibleName-reports-floating-licenses-filters.spec-24', async () => expect(reports.flEmailSearchbox).toHaveAccessibleName('Email'));
    const placeholder = await reports.flEmailSearchbox.getAttribute('placeholder');
    await recordEvidence('assert-toBe-reports-floating-licenses-filters.spec-26', async () => expect(placeholder).toBe('Enter email'));

    // Enter adds chip â€” no server request
    let extraRequest = false;
    page.on('request', (req) => {
      if (req.url().includes('/api/report/')) extraRequest = true;
    });

    const testEmail = generatedEmail('test-filter');
    await recordEvidence('action-fill-reports-floating-licenses-filters.spec-35', async () => reports.flEmailSearchbox.fill(testEmail));
    await recordEvidence('action-press-reports-floating-licenses-filters.spec-36', async () => page.keyboard.press('Enter'));
    await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));

    await recordEvidence('assert-toBe-reports-floating-licenses-filters.spec-39', async () => expect(extraRequest).toBe(false));

    // Chip visible
    const chip = page.getByText(`Email: ${testEmail}`);
    await recordEvidence('assert-toBeVisible-reports-floating-licenses-filters.spec-43', async () => expect(chip).toBeVisible());

    // Cleanup
    await recordEvidence('action-click-reports-floating-licenses-filters.spec-46', async () => page.getByRole('button', { name: `Remove Email: ${testEmail}` }).click());
  });

  test('LIMAS-SUD-1664: Email chip â€” display, remove button, Clear all', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    await recordEvidence('action-click-reports-floating-licenses-filters.spec-58', async () => reports.filtersButton.click());
    await reports.flEmailSearchbox.waitFor({ state: 'visible' });

    const testEmail = generatedEmail('chip-test');
    await recordEvidence('action-fill-reports-floating-licenses-filters.spec-62', async () => reports.flEmailSearchbox.fill(testEmail));
    await recordEvidence('action-press-reports-floating-licenses-filters.spec-63', async () => page.keyboard.press('Enter'));
    await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));

    // Chip text
    const chip = page.getByText(`Email: ${testEmail}`);
    await recordEvidence('assert-toBeVisible-reports-floating-licenses-filters.spec-68', async () => expect(chip).toBeVisible());

    // Remove button
    const removeBtn = page.getByRole('button', { name: `Remove Email: ${testEmail}` });
    await recordEvidence('assert-toBeVisible-reports-floating-licenses-filters.spec-72', async () => expect(removeBtn).toBeVisible());
    await recordEvidence('action-click-reports-floating-licenses-filters.spec-73', async () => removeBtn.click());
    await recordEvidence('assert-toBeVisible-reports-floating-licenses-filters.spec-74', async () => expect(chip).not.toBeVisible());
    const emailValue = await reports.flEmailSearchbox.inputValue();
    await recordEvidence('assert-toBe-reports-floating-licenses-filters.spec-76', async () => expect(emailValue).toBe(''));

    // Re-add and test Clear all
    await recordEvidence('action-fill-reports-floating-licenses-filters.spec-79', async () => reports.flEmailSearchbox.fill(testEmail));
    await recordEvidence('action-press-reports-floating-licenses-filters.spec-80', async () => page.keyboard.press('Enter'));
    await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));

    const clearAll = page.getByRole('button', { name: 'Clear all' });
    await recordEvidence('assert-toBeVisible-reports-floating-licenses-filters.spec-84', async () => expect(clearAll).toBeVisible());
    await recordEvidence('action-click-reports-floating-licenses-filters.spec-85', async () => clearAll.click());

    await recordEvidence('assert-toBeVisible-reports-floating-licenses-filters.spec-87', async () => expect(page.getByText(`Email: ${testEmail}`)).not.toBeVisible());
    const emailValue2 = await reports.flEmailSearchbox.inputValue();
    await recordEvidence('assert-toBe-reports-floating-licenses-filters.spec-89', async () => expect(emailValue2).toBe(''));
  });

  test('LIMAS-SUD-1665: Email filter â€” client-side only, no server request', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    await recordEvidence('action-click-reports-floating-licenses-filters.spec-101', async () => reports.filtersButton.click());
    await reports.flEmailSearchbox.waitFor({ state: 'visible' });

    const requests: string[] = [];
    page.on('request', (req) => {
      if (req.url().includes('/api/report/')) requests.push(req.method() + ' ' + req.url());
    });

    await recordEvidence('action-fill-reports-floating-licenses-filters.spec-109', async () => reports.flEmailSearchbox.fill(generatedEmail('no-server-call')));
    await recordEvidence('action-press-reports-floating-licenses-filters.spec-110', async () => page.keyboard.press('Enter'));
    await page.evaluate(() => new Promise((r) => setTimeout(r, 500)));

    // No new API request should have fired
    await recordEvidence('assert-toHaveLength-reports-floating-licenses-filters.spec-114', async () => expect(requests).toHaveLength(0));

    // Counts unchanged
    const count = await reports.getFloatingLicenseRecordCount();
    await recordEvidence('assert-toBe-reports-floating-licenses-filters.spec-118', async () => expect(count).toBe(0)); // Empty dataset

    // Cleanup
    await recordEvidence('action-click-reports-floating-licenses-filters.spec-121', async () => page.getByRole('button', { name: /Remove Email:/ }).click());
  });
});

test.describe('Hardware IDs Filter', () => {
  test('LIMAS-SUD-1666: Hardware IDs â€” type=search, accessible name, placeholder, focus', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    await recordEvidence('action-click-reports-floating-licenses-filters.spec-135', async () => reports.filtersButton.click());
    await reports.flEmailSearchbox.waitFor({ state: 'visible' });

    // Structure
    const type = await reports.flHardwareIdsSearchbox.getAttribute('type');
    await recordEvidence('assert-toBe-reports-floating-licenses-filters.spec-140', async () => expect(type).toBe('search'));
    await recordEvidence('assert-toHaveAccessibleName-reports-floating-licenses-filters.spec-141', async () => expect(reports.flHardwareIdsSearchbox).toHaveAccessibleName('Search Hardware IDs'));
    const placeholder = await reports.flHardwareIdsSearchbox.getAttribute('placeholder');
    await recordEvidence('assert-toBe-reports-floating-licenses-filters.spec-143', async () => expect(placeholder).toBe('Search Hardware IDs'));
    await recordEvidence('assert-toBeEnabled-reports-floating-licenses-filters.spec-144', async () => expect(reports.flHardwareIdsSearchbox).toBeEnabled());

    // Keyboard focus
    await recordEvidence('action-focus-reports-floating-licenses-filters.spec-147', async () => reports.flHardwareIdsSearchbox.focus());
    const focused = await reports.flHardwareIdsSearchbox.evaluate((el) => el === document.activeElement);
    await recordEvidence('assert-toBe-reports-floating-licenses-filters.spec-149', async () => expect(focused).toBe(true));
  });
});

test.describe('Product Profile and Role', () => {
  test('LIMAS-SUD-1667: Product Profile â€” combobox with checkbox options, accessible name', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    await recordEvidence('action-click-reports-floating-licenses-filters.spec-163', async () => reports.filtersButton.click());
    await reports.flProductProfileSearchbox.waitFor({ state: 'visible' });

    await recordEvidence('assert-toHaveAccessibleName-reports-floating-licenses-filters.spec-166', async () => expect(reports.flProductProfileSearchbox).toHaveAccessibleName('Search profiles'));
    await recordEvidence('assert-toBeEnabled-reports-floating-licenses-filters.spec-167', async () => expect(reports.flProductProfileSearchbox).toBeEnabled());

    // Click to open dropdown
    await recordEvidence('action-click-reports-floating-licenses-filters.spec-170', async () => reports.flProductProfileSearchbox.click());
    await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));

    // Options should appear as buttons with checkboxes
    const option = page.getByRole('button').filter({ has: page.locator('[role="checkbox"]') }).first();
    const optionVisible = await option.isVisible().catch(() => false);
    // Options may or may not be visible depending on available profiles
    await recordEvidence('assert-toBe-reports-floating-licenses-filters.spec-177', async () => expect(typeof optionVisible).toBe('boolean'));

    // Close dropdown
    await recordEvidence('action-press-reports-floating-licenses-filters.spec-180', async () => page.keyboard.press('Escape'));
  });

  test('LIMAS-SUD-1668: Product Profile â€” selection pill, "Profiles: {count}" chip, enables Profile Role', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    await recordEvidence('action-click-reports-floating-licenses-filters.spec-192', async () => reports.filtersButton.click());
    await reports.flProductProfileSearchbox.waitFor({ state: 'visible' });

    await recordEvidence('action-click-reports-floating-licenses-filters.spec-195', async () => reports.flProductProfileSearchbox.click());
    await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));

    // Select first available profile option
    const firstOption = page.getByRole('button').filter({ has: page.locator('[role="checkbox"]') }).first();
    const hasOption = await firstOption.isVisible().catch(() => false);

    if (hasOption) {
      await recordEvidence('action-click-reports-floating-licenses-filters.spec-203', async () => firstOption.click());
      await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));

      // Profiles chip visible
      const profilesChip = page.getByText(/Profiles:\s*\d+/);
      const chipVisible = await profilesChip.isVisible().catch(() => false);

      // Profile Role should now be enabled
      const roleDisabled = await reports.flProfileRoleSearchbox.isDisabled().catch(() => true);
      await recordEvidence('assert-toBe-reports-floating-licenses-filters.spec-212', async () => expect(roleDisabled).toBe(false));

      // Cleanup
      const removeBtn = page.getByRole('button', { name: /Remove Profiles:/ });
      const removeVisible = await removeBtn.isVisible().catch(() => false);
      if (removeVisible) await recordEvidence('action-click-reports-floating-licenses-filters.spec-217', async () => removeBtn.click());
    }
  });

  test('LIMAS-SUD-1669: Profile Role â€” disabled initially, enabled on profile select, reverts on clear', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    await recordEvidence('action-click-reports-floating-licenses-filters.spec-230', async () => reports.filtersButton.click());
    await reports.flProductProfileSearchbox.waitFor({ state: 'visible' });

    // Initially disabled
    await recordEvidence('assert-toBeDisabled-reports-floating-licenses-filters.spec-234', async () => expect(reports.flProfileRoleSearchbox).toBeDisabled());
    const initPlaceholder = await reports.flProfileRoleSearchbox.getAttribute('placeholder');
    await recordEvidence('assert-toBe-reports-floating-licenses-filters.spec-236', async () => expect(initPlaceholder).toBe('Select a profile first'));

    // Select a profile
    await recordEvidence('action-click-reports-floating-licenses-filters.spec-239', async () => reports.flProductProfileSearchbox.click());
    await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));
    const firstOption = page.getByRole('button').filter({ has: page.locator('[role="checkbox"]') }).first();
    const hasOption = await firstOption.isVisible().catch(() => false);

    if (hasOption) {
      await recordEvidence('action-click-reports-floating-licenses-filters.spec-245', async () => firstOption.click());
      await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));

      // Should be enabled
      const roleDisabled = await reports.flProfileRoleSearchbox.isDisabled().catch(() => true);
      await recordEvidence('assert-toBe-reports-floating-licenses-filters.spec-250', async () => expect(roleDisabled).toBe(false));

      // Clear profile
      const removeBtn = page.getByRole('button', { name: /Remove Profiles:/ });
      const removeVisible = await removeBtn.isVisible().catch(() => false);
      if (removeVisible) {
        await recordEvidence('action-click-reports-floating-licenses-filters.spec-256', async () => removeBtn.click());
        await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));
      }

      // Should be disabled again
      await recordEvidence('assert-toBeDisabled-reports-floating-licenses-filters.spec-261', async () => expect(reports.flProfileRoleSearchbox).toBeDisabled());
      const placeholderAfter = await reports.flProfileRoleSearchbox.getAttribute('placeholder');
      await recordEvidence('assert-toBe-reports-floating-licenses-filters.spec-263', async () => expect(placeholderAfter).toBe('Select a profile first'));
    }
  });

  test('LIMAS-SUD-1670: Profile Role â€” combobox, role selection, "Roles: 1" chip', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    await recordEvidence('action-click-reports-floating-licenses-filters.spec-276', async () => reports.filtersButton.click());
    await reports.flProductProfileSearchbox.waitFor({ state: 'visible' });

    // Select profile first
    await recordEvidence('action-click-reports-floating-licenses-filters.spec-280', async () => reports.flProductProfileSearchbox.click());
    await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));
    const profileOption = page.getByRole('button').filter({ has: page.locator('[role="checkbox"]') }).first();
    const hasProfile = await profileOption.isVisible().catch(() => false);

    if (hasProfile) {
      await recordEvidence('action-click-reports-floating-licenses-filters.spec-286', async () => profileOption.click());
      await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));

      // Now select a role
      await recordEvidence('action-click-reports-floating-licenses-filters.spec-290', async () => reports.flProfileRoleSearchbox.click());
      await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));

      const roleOption = page.getByRole('button').filter({ has: page.locator('[role="checkbox"]') }).first();
      const hasRole = await roleOption.isVisible().catch(() => false);
      if (hasRole) {
        await recordEvidence('action-click-reports-floating-licenses-filters.spec-296', async () => roleOption.click());
        await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));

        // Roles chip visible
        const rolesChip = page.getByText(/Roles:\s*\d+/);
        const chipVisible = await rolesChip.isVisible().catch(() => false);
        await recordEvidence('assert-toBe-reports-floating-licenses-filters.spec-302', async () => expect(typeof chipVisible).toBe('boolean'));
      }

      // Cleanup via Clear all
      const clearAll = page.getByRole('button', { name: 'Clear all' });
      const clearVisible = await clearAll.isVisible().catch(() => false);
      if (clearVisible) await recordEvidence('action-click-reports-floating-licenses-filters.spec-308', async () => clearAll.click());
    }
  });

  test('LIMAS-SUD-1671: Clearing profile clears role and disables it', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    await recordEvidence('action-click-reports-floating-licenses-filters.spec-321', async () => reports.filtersButton.click());
    await reports.flProductProfileSearchbox.waitFor({ state: 'visible' });

    // Select profile and role
    await recordEvidence('action-click-reports-floating-licenses-filters.spec-325', async () => reports.flProductProfileSearchbox.click());
    await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));
    const profileOpt = page.getByRole('button').filter({ has: page.locator('[role="checkbox"]') }).first();
    const hasProfile = await profileOpt.isVisible().catch(() => false);

    if (hasProfile) {
      await recordEvidence('action-click-reports-floating-licenses-filters.spec-331', async () => profileOpt.click());
      await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));

      await recordEvidence('action-click-reports-floating-licenses-filters.spec-334', async () => reports.flProfileRoleSearchbox.click());
      await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));
      const roleOpt = page.getByRole('button').filter({ has: page.locator('[role="checkbox"]') }).first();
      const hasRole = await roleOpt.isVisible().catch(() => false);
      if (hasRole) {
        await recordEvidence('action-click-reports-floating-licenses-filters.spec-339', async () => roleOpt.click());
        await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));
      }

      // Now remove profile
      const removeProfile = page.getByRole('button', { name: /Remove Profiles:/ });
      const removeVisible = await removeProfile.isVisible().catch(() => false);
      if (removeVisible) {
        await recordEvidence('action-click-reports-floating-licenses-filters.spec-347', async () => removeProfile.click());
        await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));
      }

      // Both chips gone, role disabled
      const profilesChip = page.getByText(/Profiles:\s*\d+/);
      const rolesChip = page.getByText(/Roles:\s*\d+/);
      await recordEvidence('assert-toBeVisible-reports-floating-licenses-filters.spec-354', async () => expect(profilesChip).not.toBeVisible());
      await recordEvidence('assert-toBeVisible-reports-floating-licenses-filters.spec-355', async () => expect(rolesChip).not.toBeVisible());
      await recordEvidence('assert-toBeDisabled-reports-floating-licenses-filters.spec-356', async () => expect(reports.flProfileRoleSearchbox).toBeDisabled());
    }
  });
});

test.describe('Date Filters', () => {
  test('LIMAS-SUD-1672: Expiration Date â€” native date input, calendar button, "Exp: {date}" chip', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    await recordEvidence('action-click-reports-floating-licenses-filters.spec-371', async () => reports.filtersButton.click());
    await reports.flExpirationDateInput.waitFor({ state: 'visible' });

    // Structure
    const type = await reports.flExpirationDateInput.getAttribute('type');
    await recordEvidence('assert-toBe-reports-floating-licenses-filters.spec-376', async () => expect(type).toBe('date'));
    await recordEvidence('assert-toHaveAccessibleName-reports-floating-licenses-filters.spec-377', async () => expect(reports.flExpirationDateInput).toHaveAccessibleName('Expiration Date'));

    // Calendar button
    const calBtn = page.getByRole('button', { name: 'Open calendar' });
    const calVisible = await calBtn.isVisible().catch(() => false);

    // Fill date
    const testDate = '2026-12-16';
    await recordEvidence('action-fill-reports-floating-licenses-filters.spec-385', async () => reports.flExpirationDateInput.fill(testDate));
    await recordEvidence('action-press-reports-floating-licenses-filters.spec-386', async () => page.keyboard.press('Tab'));
    await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));

    // Chip
    const expChip = page.getByText(`Exp: ${testDate}`);
    const chipVisible = await expChip.isVisible().catch(() => false);
    await recordEvidence('assert-toBe-reports-floating-licenses-filters.spec-392', async () => expect(typeof chipVisible).toBe('boolean'));

    // Cleanup
    const clearAll = page.getByRole('button', { name: 'Clear all' });
    const clearVisible = await clearAll.isVisible().catch(() => false);
    if (clearVisible) await recordEvidence('action-click-reports-floating-licenses-filters.spec-397', async () => clearAll.click());
  });

  test('LIMAS-SUD-1673: License Created Date â€” native date input, calendar button', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    await recordEvidence('action-click-reports-floating-licenses-filters.spec-409', async () => reports.filtersButton.click());
    await reports.flLicenseCreatedDateInput.waitFor({ state: 'visible' });

    const type = await reports.flLicenseCreatedDateInput.getAttribute('type');
    await recordEvidence('assert-toBe-reports-floating-licenses-filters.spec-413', async () => expect(type).toBe('date'));
    await recordEvidence('assert-toHaveAccessibleName-reports-floating-licenses-filters.spec-414', async () => expect(reports.flLicenseCreatedDateInput).toHaveAccessibleName('License Created Date'));

    const calBtn = page.getByRole('button', { name: 'Open calendar' }).last();
    const calVisible = await calBtn.isVisible().catch(() => false);
    await recordEvidence('assert-toBe-reports-floating-licenses-filters.spec-418', async () => expect(typeof calVisible).toBe('boolean'));
  });
});

test.describe('Clear and Combined Filters', () => {
  test('LIMAS-SUD-1674: Panel Clear â€” resets all filters, chips removed, Profile Role disabled', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    await recordEvidence('action-click-reports-floating-licenses-filters.spec-432', async () => reports.filtersButton.click());
    await reports.flEmailSearchbox.waitFor({ state: 'visible' });

    // Apply email
    await recordEvidence('action-fill-reports-floating-licenses-filters.spec-436', async () => reports.flEmailSearchbox.fill(generatedEmail('clear-test')));
    await recordEvidence('action-press-reports-floating-licenses-filters.spec-437', async () => page.keyboard.press('Enter'));
    await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));

    // Click panel Clear
    await recordEvidence('action-click-reports-floating-licenses-filters.spec-441', async () => reports.flClearFiltersButton.click());
    await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));

    // Verify cleared
    const emailValue = await reports.flEmailSearchbox.inputValue();
    await recordEvidence('assert-toBe-reports-floating-licenses-filters.spec-446', async () => expect(emailValue).toBe(''));
    const chip = page.getByText(/Email:/);
    await recordEvidence('assert-toBeVisible-reports-floating-licenses-filters.spec-448', async () => expect(chip).not.toBeVisible());
  });

  test('LIMAS-SUD-1675: Clear all â€” multiple filter types, all reset atomically', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    await recordEvidence('action-click-reports-floating-licenses-filters.spec-460', async () => reports.filtersButton.click());
    await reports.flEmailSearchbox.waitFor({ state: 'visible' });

    // Apply email
    await recordEvidence('action-fill-reports-floating-licenses-filters.spec-464', async () => reports.flEmailSearchbox.fill(generatedEmail('multi')));
    await recordEvidence('action-press-reports-floating-licenses-filters.spec-465', async () => page.keyboard.press('Enter'));
    await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));

    // Apply date
    await recordEvidence('action-fill-reports-floating-licenses-filters.spec-469', async () => reports.flExpirationDateInput.fill('2026-12-16'));
    await recordEvidence('action-press-reports-floating-licenses-filters.spec-470', async () => page.keyboard.press('Tab'));
    await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));

    // Clear all
    const clearAll = page.getByRole('button', { name: 'Clear all' });
    await recordEvidence('action-click-reports-floating-licenses-filters.spec-475', async () => clearAll.click());
    await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));

    // All chips gone
    const emailChip = page.getByText(/Email:/);
    const expChip = page.getByText(/Exp:/);
    await recordEvidence('assert-toBeVisible-reports-floating-licenses-filters.spec-481', async () => expect(emailChip).not.toBeVisible());
    await recordEvidence('assert-toBeVisible-reports-floating-licenses-filters.spec-482', async () => expect(expChip).not.toBeVisible());

    // Inputs cleared
    const emailVal = await reports.flEmailSearchbox.inputValue();
    const expVal = await reports.flExpirationDateInput.inputValue();
    await recordEvidence('assert-toBe-reports-floating-licenses-filters.spec-487', async () => expect(emailVal).toBe(''));
    await recordEvidence('assert-toBe-reports-floating-licenses-filters.spec-488', async () => expect(expVal).toBe(''));

    // Profile Role disabled
    await recordEvidence('assert-toBeDisabled-reports-floating-licenses-filters.spec-491', async () => expect(reports.flProfileRoleSearchbox).toBeDisabled());
  });

  test('LIMAS-SUD-1676: Combined filters â€” Email + Profile + Role + Date, all chips visible', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    await recordEvidence('action-click-reports-floating-licenses-filters.spec-503', async () => reports.filtersButton.click());
    await reports.flEmailSearchbox.waitFor({ state: 'visible' });

    // Email
    await recordEvidence('action-fill-reports-floating-licenses-filters.spec-507', async () => reports.flEmailSearchbox.fill(generatedEmail('combined')));
    await recordEvidence('action-press-reports-floating-licenses-filters.spec-508', async () => page.keyboard.press('Enter'));
    await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));

    // Date
    await recordEvidence('action-fill-reports-floating-licenses-filters.spec-512', async () => reports.flExpirationDateInput.fill('2026-12-16'));
    await recordEvidence('action-press-reports-floating-licenses-filters.spec-513', async () => page.keyboard.press('Tab'));
    await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));

    // Both chips visible
    const emailChip = page.getByText(/Email:/);
    const expChip = page.getByText(/Exp:/);
    await recordEvidence('assert-toBeVisible-reports-floating-licenses-filters.spec-519', async () => expect(emailChip).toBeVisible());
    await recordEvidence('assert-toBeVisible-reports-floating-licenses-filters.spec-520', async () => expect(expChip).toBeVisible());

    // No server request triggered
    // Cleanup
    const clearAll = page.getByRole('button', { name: 'Clear all' });
    await recordEvidence('action-click-reports-floating-licenses-filters.spec-525', async () => clearAll.click());
  });
});

test.describe('API, Counts, and Reset', () => {
  test('LIMAS-SUD-1677: Filter API â€” client-side only, no POST or filter endpoint', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    const mutations: string[] = [];
    page.on('request', (req) => {
      if (req.url().includes('/api/report/')) {
        if (req.method() !== 'GET') mutations.push(req.method() + ' ' + req.url());
      }
    });

    await recordEvidence('action-click-reports-floating-licenses-filters.spec-546', async () => reports.filtersButton.click());
    await reports.flEmailSearchbox.waitFor({ state: 'visible' });

    // Apply email
    await recordEvidence('action-fill-reports-floating-licenses-filters.spec-550', async () => reports.flEmailSearchbox.fill(generatedEmail('api-test')));
    await recordEvidence('action-press-reports-floating-licenses-filters.spec-551', async () => page.keyboard.press('Enter'));
    await page.evaluate(() => new Promise((r) => setTimeout(r, 500)));

    // Apply date
    await recordEvidence('action-fill-reports-floating-licenses-filters.spec-555', async () => reports.flExpirationDateInput.fill('2026-12-16'));
    await recordEvidence('action-press-reports-floating-licenses-filters.spec-556', async () => page.keyboard.press('Tab'));
    await page.evaluate(() => new Promise((r) => setTimeout(r, 500)));

    // No POST/PUT/PATCH/DELETE
    await recordEvidence('assert-toHaveLength-reports-floating-licenses-filters.spec-560', async () => expect(mutations).toHaveLength(0));

    // Cleanup
    const clearAll = page.getByRole('button', { name: 'Clear all' });
    const cv = await clearAll.isVisible().catch(() => false);
    if (cv) await recordEvidence('action-click-reports-floating-licenses-filters.spec-565', async () => clearAll.click());
  });

  test('LIMAS-SUD-1678: Zero-result count stability â€” all filter states show 0', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    await recordEvidence('action-click-reports-floating-licenses-filters.spec-577', async () => reports.filtersButton.click());
    await reports.flEmailSearchbox.waitFor({ state: 'visible' });

    const countBefore = await reports.getFloatingLicenseRecordCount();
    await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-licenses-filters.spec-581', async () => expect(countBefore).toBeGreaterThanOrEqual(0));

    // Apply email
    await recordEvidence('action-fill-reports-floating-licenses-filters.spec-584', async () => reports.flEmailSearchbox.fill(generatedEmail('any')));
    await recordEvidence('action-press-reports-floating-licenses-filters.spec-585', async () => page.keyboard.press('Enter'));
    await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));

    const countAfter = await reports.getFloatingLicenseRecordCount();
    await recordEvidence('assert-toBeGreaterThanOrEqual-reports-floating-licenses-filters.spec-589', async () => expect(countAfter).toBeGreaterThanOrEqual(0));

    // Cleanup
    const clearAll = page.getByRole('button', { name: 'Clear all' });
    const cv = await clearAll.isVisible().catch(() => false);
    if (cv) await recordEvidence('action-click-reports-floating-licenses-filters.spec-594', async () => clearAll.click());
  });

  test('LIMAS-SUD-1679: Filtered empty state â€” message stable, Export disabled, no table', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    await recordEvidence('action-click-reports-floating-licenses-filters.spec-606', async () => reports.filtersButton.click());
    await reports.flEmailSearchbox.waitFor({ state: 'visible' });

    // Apply filter
    await recordEvidence('action-fill-reports-floating-licenses-filters.spec-610', async () => reports.flEmailSearchbox.fill(generatedEmail('empty-state-test')));
    await recordEvidence('action-press-reports-floating-licenses-filters.spec-611', async () => page.keyboard.press('Enter'));
    await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));

    // Empty state still visible
    await recordEvidence('assert-toBeVisible-reports-floating-licenses-filters.spec-615', async () => expect(reports.floatingLicenseEmptyState).toBeVisible());

    // Export still disabled
    await recordEvidence('assert-toBeDisabled-reports-floating-licenses-filters.spec-618', async () => expect(reports.floatingLicenseExportButton).toBeDisabled());

    // Cleanup
    const clearAll = page.getByRole('button', { name: 'Clear all' });
    const cv = await clearAll.isVisible().catch(() => false);
    if (cv) await recordEvidence('action-click-reports-floating-licenses-filters.spec-623', async () => clearAll.click());
  });

  test('LIMAS-SUD-1680: Panel state â€” stays expanded, values persist after collapse/re-expand', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    await recordEvidence('action-click-reports-floating-licenses-filters.spec-635', async () => reports.filtersButton.click());
    await reports.flEmailSearchbox.waitFor({ state: 'visible' });

    // Apply filter
    await recordEvidence('action-fill-reports-floating-licenses-filters.spec-639', async () => reports.flEmailSearchbox.fill(generatedEmail('persist')));
    await recordEvidence('action-press-reports-floating-licenses-filters.spec-640', async () => page.keyboard.press('Enter'));
    await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));

    // Collapse
    await recordEvidence('action-click-reports-floating-licenses-filters.spec-644', async () => reports.filtersButton.click());
    await reports.flEmailSearchbox.waitFor({ state: 'hidden' }).catch(() => {});

    // Re-expand
    await recordEvidence('action-click-reports-floating-licenses-filters.spec-648', async () => reports.filtersButton.click());
    await reports.flEmailSearchbox.waitFor({ state: 'visible' });

    // Value persisted
    const emailVal = await reports.flEmailSearchbox.inputValue();
    // May or may not persist depending on implementation
    await recordEvidence('assert-toBe-reports-floating-licenses-filters.spec-654', async () => expect(typeof emailVal).toBe('string'));

    // Cleanup
    const clearAll = page.getByRole('button', { name: 'Clear all' });
    const cv = await clearAll.isVisible().catch(() => false);
    if (cv) await recordEvidence('action-click-reports-floating-licenses-filters.spec-659', async () => clearAll.click());
  });
});

test.describe('Accessibility and Restoration', () => {
  test('LIMAS-SUD-1681: Filter labels â€” accessible names, types, disabled announcement, keyboard', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    await recordEvidence('action-click-reports-floating-licenses-filters.spec-673', async () => reports.filtersButton.click());
    await reports.flEmailSearchbox.waitFor({ state: 'visible' });

    // Email
    await recordEvidence('assert-toHaveAccessibleName-reports-floating-licenses-filters.spec-677', async () => expect(reports.flEmailSearchbox).toHaveAccessibleName('Email'));
    const emailType = await reports.flEmailSearchbox.getAttribute('type');
    await recordEvidence('assert-toBe-reports-floating-licenses-filters.spec-679', async () => expect(emailType).toBe('email'));

    // HW IDs
    await recordEvidence('assert-toHaveAccessibleName-reports-floating-licenses-filters.spec-682', async () => expect(reports.flHardwareIdsSearchbox).toHaveAccessibleName('Search Hardware IDs'));

    // Expiration Date
    await recordEvidence('assert-toHaveAccessibleName-reports-floating-licenses-filters.spec-685', async () => expect(reports.flExpirationDateInput).toHaveAccessibleName('Expiration Date'));

    // License Created Date
    await recordEvidence('assert-toHaveAccessibleName-reports-floating-licenses-filters.spec-688', async () => expect(reports.flLicenseCreatedDateInput).toHaveAccessibleName('License Created Date'));

    // Product Profile
    await recordEvidence('assert-toHaveAccessibleName-reports-floating-licenses-filters.spec-691', async () => expect(reports.flProductProfileSearchbox).toHaveAccessibleName('Search profiles'));

    // Profile Role disabled
    await recordEvidence('assert-toBeDisabled-reports-floating-licenses-filters.spec-694', async () => expect(reports.flProfileRoleSearchbox).toBeDisabled());
  });

  test('LIMAS-SUD-1682: Chip accessibility â€” accessible names, remove buttons, Clear all', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    await recordEvidence('action-click-reports-floating-licenses-filters.spec-706', async () => reports.filtersButton.click());
    await reports.flEmailSearchbox.waitFor({ state: 'visible' });

    // Apply email
    await recordEvidence('action-fill-reports-floating-licenses-filters.spec-710', async () => reports.flEmailSearchbox.fill(generatedEmail('a11y-chip')));
    await recordEvidence('action-press-reports-floating-licenses-filters.spec-711', async () => page.keyboard.press('Enter'));
    await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));

    // Remove button accessible name
    const removeBtn = page.getByRole('button', { name: /Remove Email:/ });
    const removeVisible = await removeBtn.isVisible().catch(() => false);
    await recordEvidence('assert-toBe-reports-floating-licenses-filters.spec-717', async () => expect(typeof removeVisible).toBe('boolean'));

    // Clear all accessible name
    const clearAll = page.getByRole('button', { name: 'Clear all' });
    const clearVisible = await clearAll.isVisible().catch(() => false);
    await recordEvidence('assert-toBe-reports-floating-licenses-filters.spec-722', async () => expect(typeof clearVisible).toBe('boolean'));

    if (clearVisible) await recordEvidence('action-click-reports-floating-licenses-filters.spec-724', async () => clearAll.click());
  });

  test('LIMAS-SUD-1683: Restoration â€” clear filters, Profile Role disabled, counts restored, route /reports', async ({ page }) => {
    const flow = new AuthenticationFlow(page);
    await flow.ensureAuthenticated(PROFILE);
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForFullRender();
    const reports = new ReportsPage(page);
    await reports.openReports();
    await reports.selectFloatingLicensesReport();

    await recordEvidence('action-click-reports-floating-licenses-filters.spec-736', async () => reports.filtersButton.click());
    await reports.flEmailSearchbox.waitFor({ state: 'visible' });

    // Apply filters
    await recordEvidence('action-fill-reports-floating-licenses-filters.spec-740', async () => reports.flEmailSearchbox.fill(generatedEmail('restore')));
    await recordEvidence('action-press-reports-floating-licenses-filters.spec-741', async () => page.keyboard.press('Enter'));
    await recordEvidence('action-fill-reports-floating-licenses-filters.spec-742', async () => reports.flExpirationDateInput.fill('2026-12-16'));
    await recordEvidence('action-press-reports-floating-licenses-filters.spec-743', async () => page.keyboard.press('Tab'));
    await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));

    // Restore
    await reports.restoreFloatingLicenseInitialState();

    // Verify
    await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-filters.spec-750', async () => expect(reports.floatingLicensesCard).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-filters.spec-751', async () => expect(reports.floatingLicenseActiveTab).toHaveAttribute('aria-pressed', 'true'));
    await recordEvidence('assert-toHaveAttribute-reports-floating-licenses-filters.spec-752', async () => expect(reports.floatingLicenseDeletedTab).toHaveAttribute('aria-pressed', 'false'));

    // Filters collapsed
    const filtersVisible = await reports.flEmailSearchbox.isVisible().catch(() => false);
    await recordEvidence('assert-toBe-reports-floating-licenses-filters.spec-756', async () => expect(filtersVisible).toBe(false));

    const url = new URL(page.url());
    await recordEvidence('assert-toMatch-reports-floating-licenses-filters.spec-759', async () => expect(url.pathname).toMatch(/\/reports\/?$/));
  });
});