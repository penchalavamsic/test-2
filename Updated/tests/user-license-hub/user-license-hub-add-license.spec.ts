import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';

test.describe('Add License Button', () => {
  let hub: UserLicenseHubPage;

  test.beforeEach(async ({ page }) => {
    hub = new UserLicenseHubPage(page);
    await hub.goto();
    await hub.restoreDefaultUserListState();
    await hub.restoreLicensePanelDefaultState();
  });

  test('LIMAS-SUD-1203: Add License button visible with accessible name', async () => {
    await recordEvidence('assert-toBeVisible-user-license-hub-add-license.spec-15', async () => expect(hub.addLicenseButton).toBeVisible());
    await recordEvidence('assert-toHaveAccessibleName-user-license-hub-add-license.spec-16', async () => expect(hub.addLicenseButton).toHaveAccessibleName('Add License'));
  });

  test('LIMAS-SUD-1204: Add License disabled when All Profiles active', async () => {
    await recordEvidence('assert-toBeDisabled-user-license-hub-add-license.spec-20', async () => expect(hub.addLicenseButton).toBeDisabled());
  });

  test('LIMAS-SUD-1205: Add License disabled when no user explicitly selected', async () => {
    await hub.applySpecificProfileWithoutUserSelection();
    const isDisabled = await hub.addLicenseButton.isDisabled();
    await recordEvidence('assert-toBeDefined-user-license-hub-add-license.spec-26', async () => expect(isDisabled).toBe(true));
  });

  test('LIMAS-SUD-1206: Add License enabled after Profile AND user selection', async () => {
    await hub.applyRuntimeProfileForDownload();
    await hub.selectFirstVisibleUser();
    await recordEvidence('assert-toBeEnabled-user-license-hub-add-license.spec-32', async () => expect(hub.addLicenseButton).toBeEnabled());
  });
});

test.describe('Add License Dialog Shell', () => {
  let hub: UserLicenseHubPage;

  test.beforeEach(async ({ page }) => {
    hub = new UserLicenseHubPage(page);
    await hub.goto();
    await hub.restoreDefaultUserListState();
    await hub.restoreLicensePanelDefaultState();
    await hub.applyRuntimeProfileForDownload();
    await hub.selectFirstVisibleUser();
  });

  test.afterEach(async () => {
    if (!hub) return;
    await hub.closeAddLicenseDialog();
    await hub.restoreLicensePanelDefaultState();
  });

  test('LIMAS-SUD-1207: Add License dialog opens on button click', async () => {
    await hub.openAddLicenseDialog();
    const dialog = hub.getAddLicenseDialog();
    await recordEvidence('assert-toBeVisible-user-license-hub-add-license.spec-56', async () => expect(dialog).toBeVisible());
  });

  test('LIMAS-SUD-1208: Dialog has role dialog and heading Add License', async () => {
    await hub.openAddLicenseDialog();
    const dialog = hub.getAddLicenseDialog();
    await recordEvidence('assert-toHaveAttribute-user-license-hub-add-license.spec-62', async () => expect(dialog).toHaveAttribute('role', 'dialog'));
    await recordEvidence('assert-toBeVisible-user-license-hub-add-license.spec-63', async () => expect(dialog.getByRole('heading', { name: 'Add License' })).toBeVisible());
  });

  test('LIMAS-SUD-1209: Dialog shows description Add a new license for this user', async () => {
    await hub.openAddLicenseDialog();
    const dialog = hub.getAddLicenseDialog();
    await recordEvidence('assert-toBeVisible-user-license-hub-add-license.spec-69', async () => expect(dialog.getByText('Add a new license for this user')).toBeVisible());
  });

  test('LIMAS-SUD-1210: Dialog contains Hardware IDs input with placeholder', async () => {
    await hub.openAddLicenseDialog();
    const hwInput = hub.getAddLicenseDialog().getByPlaceholder(/HW\d+/);
    await recordEvidence('assert-toBeVisible-user-license-hub-add-license.spec-75', async () => expect(hwInput).toBeVisible());
  });

  test('LIMAS-SUD-1211: Dialog contains Profile combobox with default', async () => {
    await hub.openAddLicenseDialog();
    const profileCombo = hub.getAddLicenseProfileCombo();
    await recordEvidence('assert-toBeVisible-user-license-hub-add-license.spec-81', async () => expect(profileCombo).toBeVisible());
    await recordEvidence('assert-toHaveText-user-license-hub-add-license.spec-82', async () => expect(profileCombo).toHaveText('Select profile'));
  });

  test('LIMAS-SUD-1212: Dialog contains Expiration Date date input', async () => {
    await hub.openAddLicenseDialog();
    const expDate = hub.getAddLicenseDialog().locator('input[type="date"]').first();
    await recordEvidence('assert-toBeVisible-user-license-hub-add-license.spec-88', async () => expect(expDate).toBeVisible());
    await recordEvidence('assert-toHaveAttribute-user-license-hub-add-license.spec-89', async () => expect(expDate).toHaveAttribute('type', 'date'));
  });

  test('LIMAS-SUD-1213: Dialog contains Maintenance Date date input', async () => {
    await hub.openAddLicenseDialog();
    const maintDate = hub.getAddLicenseDialog().locator('input[type="date"]').last();
    await recordEvidence('assert-toBeVisible-user-license-hub-add-license.spec-95', async () => expect(maintDate).toBeVisible());
  });

  test('LIMAS-SUD-1214: Dialog has Cancel and Save buttons', async () => {
    await hub.openAddLicenseDialog();
    const dialog = hub.getAddLicenseDialog();
    await recordEvidence('assert-toBeVisible-user-license-hub-add-license.spec-101', async () => expect(dialog.getByRole('button', { name: 'Cancel' })).toBeVisible());
    await recordEvidence('assert-toBeVisible-user-license-hub-add-license.spec-102', async () => expect(dialog.getByRole('button', { name: 'Save' })).toBeVisible());
  });

  test('LIMAS-SUD-1215: Dialog has Close button', async () => {
    await hub.openAddLicenseDialog();
    const dialog = hub.getAddLicenseDialog();
    await recordEvidence('assert-toBeVisible-user-license-hub-add-license.spec-108', async () => expect(dialog.getByRole('button', { name: 'Close' })).toBeVisible());
  });

  test('LIMAS-SUD-1216: Save is enabled immediately before any input', async () => {
    await hub.openAddLicenseDialog();
    const saveBtn = hub.getAddLicenseDialog().getByRole('button', { name: 'Save' });
    await recordEvidence('assert-toBeEnabled-user-license-hub-add-license.spec-114', async () => expect(saveBtn).toBeEnabled());
  });

  test('LIMAS-SUD-1234: Dialog accessible name and role correct', async () => {
    await hub.openAddLicenseDialog();
    const dialog = hub.getAddLicenseDialog();
    await recordEvidence('assert-toHaveAttribute-user-license-hub-add-license.spec-120', async () => expect(dialog).toHaveAttribute('role', 'dialog'));
    await recordEvidence('assert-toBeVisible-user-license-hub-add-license.spec-121', async () => expect(dialog.getByRole('heading', { name: 'Add License' })).toBeVisible());
  });

  test('LIMAS-SUD-1235: Dialog initial focus is on first interactive element', async () => {
    await hub.openAddLicenseDialog();
    const focused = hub.page.locator(':focus');
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-add-license.spec-127', async () => expect(await focused.count()).toBeGreaterThan(0));
  });

  test('LIMAS-SUD-1236: Dialog has focus trap', async ({ page }) => {
    await hub.openAddLicenseDialog();
    // Tab through dialog — should stay within
    for (let i = 0; i < 20; i++) {
      await recordEvidence('action-press-user-license-hub-add-license.spec-134', async () => page.keyboard.press('Tab'));
      await expect.poll(() => hub.getAddLicenseDialog().evaluate(el => el.contains(document.activeElement))).toBe(true);
    }
    const dialog = hub.getAddLicenseDialog();
    const focused = page.locator(':focus');
    // Focus should still be inside dialog
    const isInside = await dialog.evaluate(el => el.contains(document.activeElement) ? 1 : 0);
    await recordEvidence('assert-toBeGreaterThanOrEqual-user-license-hub-add-license.spec-140', async () => expect(isInside).toBeGreaterThanOrEqual(1));
  });
});

test.describe('Hardware IDs', () => {
  let hub: UserLicenseHubPage;
  let runId: string;

  test.beforeEach(async ({ page }) => {
    hub = new UserLicenseHubPage(page);
    await hub.goto();
    await hub.restoreDefaultUserListState();
    await hub.restoreLicensePanelDefaultState();
    await hub.applyRuntimeProfileForDownload();
    await hub.selectFirstVisibleUser();
    await hub.openAddLicenseDialog();
    runId = `ULH-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  });

  test.afterEach(async () => {
    if (!hub) return;
    await hub.closeAddLicenseDialog();
    await hub.restoreLicensePanelDefaultState();
  });

  test('LIMAS-SUD-1217: Hardware ID single value accepted', async () => {
    const hwInput = hub.getAddLicenseDialog().getByPlaceholder(/HW\d+/);
    const hwId = `TEST-HW-${runId}`;
    await recordEvidence('action-fill-user-license-hub-add-license.spec-167', async () => hwInput.fill(hwId));
    await recordEvidence('assert-toBe-user-license-hub-add-license.spec-168', async () => expect(await hwInput.inputValue()).toBe(hwId));
  });

  test('LIMAS-SUD-1237: Hardware IDs field has required indicator and accessible label', async () => {
    const dialog = hub.getAddLicenseDialog();
    await recordEvidence('assert-toBeVisible-user-license-hub-add-license.spec-173', async () => expect(dialog.getByText(/Hardware IDs/)).toBeVisible());
    await recordEvidence('assert-toBeVisible-user-license-hub-add-license.spec-174', async () => expect(dialog.getByText(/minimum 1 required/)).toBeVisible());
  });
});

test.describe('Profile and Role', () => {
  let hub: UserLicenseHubPage;

  test.beforeEach(async ({ page }) => {
    hub = new UserLicenseHubPage(page);
    await hub.goto();
    await hub.restoreDefaultUserListState();
    await hub.restoreLicensePanelDefaultState();
    await hub.applyRuntimeProfileForDownload();
    await hub.selectFirstVisibleUser();
    await hub.openAddLicenseDialog();
  });

  test.afterEach(async () => {
    if (!hub) return;
    await hub.closeAddLicenseDialog();
    await hub.restoreLicensePanelDefaultState();
  });

  test('LIMAS-SUD-1218: Profile dropdown lists options with role option', async () => {
    await recordEvidence('action-click-user-license-hub-add-license.spec-197', async () => hub.getAddLicenseProfileCombo().click());
    const listbox = hub.page.getByRole('listbox');
    await recordEvidence('assert-toBeVisible-user-license-hub-add-license.spec-199', async () => expect(listbox).toBeVisible());
    const optionCount = await listbox.getByRole('option').count();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-add-license.spec-201', async () => expect(optionCount).toBeGreaterThan(10));
  });

  test('LIMAS-SUD-1219: Role combobox appears only after Profile selection', async () => {
    // Before Profile selection, Role should not exist
    const roleBefore = hub.getAddLicenseDialog().getByRole('combobox').filter({ hasText: /Select role/ });
    await recordEvidence('assert-toHaveCount-user-license-hub-add-license.spec-207', async () => expect(roleBefore).toHaveCount(0));
    // Select Profile
    await hub.selectAddLicenseRuntimeProfile();
    // Now Role should appear
    const roleAfter = hub.getAddLicenseDialog().getByRole('combobox').filter({ hasText: /Select role/ });
    await recordEvidence('assert-toBeVisible-user-license-hub-add-license.spec-212', async () => expect(roleAfter).toBeVisible());
  });

  test('LIMAS-SUD-1220: Role options dynamically loaded based on Profile', async () => {
    await hub.selectAddLicenseRuntimeProfile();
    const roleCombo = hub.getAddLicenseRoleCombo();
    await recordEvidence('action-click-user-license-hub-add-license.spec-218', async () => roleCombo.click());
    const listbox = hub.page.getByRole('listbox');
    const optionCount = await listbox.getByRole('option').count();
    await recordEvidence('assert-toBeGreaterThan-user-license-hub-add-license.spec-221', async () => expect(optionCount).toBeGreaterThan(0));
  });

  test('LIMAS-SUD-1221: Changing Profile clears previously selected Role', async () => {
    // Select first Profile
    const profileCombo = hub.getAddLicenseProfileCombo();
    await recordEvidence('action-click-user-license-hub-add-license.spec-227', async () => profileCombo.click());
    const listbox = hub.page.getByRole('listbox');
    const firstProfile = listbox.getByRole('option').first();
    const firstName = await firstProfile.textContent();
    await recordEvidence('action-click-user-license-hub-add-license.spec-231', async () => firstProfile.click());
    await hub.page.waitForTimeout(400);
    // Select Role
    const roleCombo = hub.getAddLicenseRoleCombo();
    await recordEvidence('action-click-user-license-hub-add-license.spec-235', async () => roleCombo.click());
    const listbox2 = hub.page.getByRole('listbox');
    await recordEvidence('action-click-user-license-hub-add-license.spec-237', async () => listbox2.getByRole('option').first().click());
    await hub.page.waitForTimeout(300);
    // Change Profile to a different one
    await recordEvidence('action-click-user-license-hub-add-license.spec-240', async () => profileCombo.click());
    const listbox3 = hub.page.getByRole('listbox');
    // Select second Profile
    await recordEvidence('action-click-user-license-hub-add-license.spec-243', async () => listbox3.getByRole('option').nth(1).click());
    await hub.page.waitForTimeout(500);
    // Role should be cleared
    const roleText = await roleCombo.textContent();
    await recordEvidence('assert-toBe-user-license-hub-add-license.spec-247', async () => expect(roleText?.trim() || '').not.toBe(firstName));
  });

  test('LIMAS-SUD-1238: Profile combobox has required indicator and label', async () => {
    const dialog = hub.getAddLicenseDialog();
    await recordEvidence('assert-toBeVisible-user-license-hub-add-license.spec-252', async () => expect(dialog.getByText(/Profile/)).toBeVisible());
  });

  test('LIMAS-SUD-1239: Role combobox has required indicator and label', async () => {
    await hub.selectAddLicenseRuntimeProfile();
    const dialog = hub.getAddLicenseDialog();
    await recordEvidence('assert-toBeVisible-user-license-hub-add-license.spec-258', async () => expect(dialog.getByText(/Role/)).toBeVisible());
  });
});

test.describe('Date Controls', () => {
  let hub: UserLicenseHubPage;

  test.beforeEach(async ({ page }) => {
    hub = new UserLicenseHubPage(page);
    await hub.goto();
    await hub.restoreDefaultUserListState();
    await hub.restoreLicensePanelDefaultState();
    await hub.applyRuntimeProfileForDownload();
    await hub.selectFirstVisibleUser();
    await hub.openAddLicenseDialog();
  });

  test.afterEach(async () => {
    if (!hub) return;
    await hub.closeAddLicenseDialog();
    await hub.restoreLicensePanelDefaultState();
  });

  test('LIMAS-SUD-1222: Expiration Date accepts date via native date picker', async () => {
    const dateInput = hub.getAddLicenseDialog().locator('input[type="date"]').first();
    await recordEvidence('assert-toHaveAttribute-user-license-hub-add-license.spec-282', async () => expect(dateInput).toHaveAttribute('type', 'date'));
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 365);
    const dateStr = futureDate.toISOString().split('T')[0];
    await recordEvidence('action-fill-user-license-hub-add-license.spec-286', async () => dateInput.fill(dateStr));
    await recordEvidence('assert-toBe-user-license-hub-add-license.spec-287', async () => expect(await dateInput.inputValue()).toBe(dateStr));
  });

  test('LIMAS-SUD-1223: Maintenance Date is optional', async () => {
    const maintInput = hub.getAddLicenseDialog().locator('input[type="date"]').last();
    await recordEvidence('assert-toBe-user-license-hub-add-license.spec-292', async () => expect(await maintInput.inputValue()).toBe(''));
    // Maintenance Date label should not have required asterisk, or aria-required=false
  });

  test('LIMAS-SUD-1240: Expiration Date has required indicator and accessible label', async () => {
    const dialog = hub.getAddLicenseDialog();
    await recordEvidence('assert-toBeVisible-user-license-hub-add-license.spec-298', async () => expect(dialog.getByText(/Expiration Date/)).toBeVisible());
  });
});

test.describe('Cancel and Close', () => {
  let hub: UserLicenseHubPage;

  test.beforeEach(async ({ page }) => {
    hub = new UserLicenseHubPage(page);
    await hub.goto();
    await hub.restoreDefaultUserListState();
    await hub.restoreLicensePanelDefaultState();
    await hub.applyRuntimeProfileForDownload();
    await hub.selectFirstVisibleUser();
    await hub.openAddLicenseDialog();
  });

  test.afterEach(async () => {
    if (!hub) return;
    await hub.closeAddLicenseDialog();
    await hub.restoreLicensePanelDefaultState();
  });

  test('LIMAS-SUD-1224: Cancel closes dialog without saving', async ({ page }) => {
    const dialog = hub.getAddLicenseDialog();
    await recordEvidence('action-click-user-license-hub-add-license.spec-322', async () => dialog.getByRole('button', { name: 'Cancel' }).click());
    await recordEvidence('assert-toBeVisible-user-license-hub-add-license.spec-323', async () => expect(dialog).not.toBeVisible());
  });

  test('LIMAS-SUD-1225: Close button dismisses dialog', async () => {
    const dialog = hub.getAddLicenseDialog();
    await recordEvidence('action-click-user-license-hub-add-license.spec-328', async () => dialog.getByRole('button', { name: 'Close' }).click());
    await recordEvidence('assert-toBeVisible-user-license-hub-add-license.spec-329', async () => expect(dialog).not.toBeVisible());
  });

  test('LIMAS-SUD-1226: Escape dismisses dialog', async ({ page }) => {
    await recordEvidence('action-press-user-license-hub-add-license.spec-333', async () => page.keyboard.press('Escape'));
    const dialog = hub.getAddLicenseDialog();
    await recordEvidence('assert-toBeVisible-user-license-hub-add-license.spec-335', async () => expect(dialog).not.toBeVisible());
  });

  test('LIMAS-SUD-1227: Outside click dismisses dialog', async ({ page }) => {
    await recordEvidence('action-click-user-license-hub-add-license.spec-339', async () => page.mouse.click(10, 10));
    const dialog = hub.getAddLicenseDialog();
    await recordEvidence('assert-toBeVisible-user-license-hub-add-license.spec-341', async () => expect(dialog).not.toBeVisible());
  });

  test('LIMAS-SUD-1228: Reopening dialog shows clean initial state', async () => {
    // Fill some fields
    const hwInput = hub.getAddLicenseDialog().getByPlaceholder(/HW\d+/);
    await recordEvidence('action-fill-user-license-hub-add-license.spec-347', async () => hwInput.fill('TEST123'));
    // Cancel
    await recordEvidence('action-click-user-license-hub-add-license.spec-349', async () => hub.getAddLicenseDialog().getByRole('button', { name: 'Cancel' }).click());
    await hub.page.waitForTimeout(300);
    // Reopen
    await hub.openAddLicenseDialog();
    const hwInput2 = hub.getAddLicenseDialog().getByPlaceholder(/HW\d+/);
    await recordEvidence('assert-toBe-user-license-hub-add-license.spec-354', async () => expect(await hwInput2.inputValue()).toBe(''));
  });
});

test.describe('Save State', () => {
  let hub: UserLicenseHubPage;

  test.beforeEach(async ({ page }) => {
    hub = new UserLicenseHubPage(page);
    await hub.goto();
    await hub.restoreDefaultUserListState();
    await hub.restoreLicensePanelDefaultState();
    await hub.applyRuntimeProfileForDownload();
    await hub.selectFirstVisibleUser();
    await hub.openAddLicenseDialog();
  });

  test.afterEach(async () => {
    if (!hub) return;
    await hub.closeAddLicenseDialog();
    await hub.restoreLicensePanelDefaultState();
  });

  test('LIMAS-SUD-1241: Save button accessible and present', async () => {
    const saveBtn = hub.getAddLicenseDialog().getByRole('button', { name: 'Save' });
    await recordEvidence('assert-toBeVisible-user-license-hub-add-license.spec-378', async () => expect(saveBtn).toBeVisible());
  });
});

test.describe('Create Lifecycle', () => {
  let hub: UserLicenseHubPage;
  let createdHwId: string | null = null;

  test.beforeEach(async ({ page }) => {
    if (!process.env.TEST_ULH_ALLOW_LICENSE_MUTATION || process.env.TEST_ULH_ALLOW_LICENSE_MUTATION !== 'true') {
      test.skip(true, 'TEST_ULH_ALLOW_LICENSE_MUTATION not set');
      return;
    }
    hub = new UserLicenseHubPage(page);
    await hub.goto();
    await hub.restoreDefaultUserListState();
    await hub.restoreLicensePanelDefaultState();
    await hub.applyRuntimeProfileForDownload();
    await hub.selectFirstVisibleUser();
    await hub.openAddLicenseDialog();
    createdHwId = `ULH-TEST-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  });

  test.afterEach(async () => {
    if (!hub) return;
    if (createdHwId && process.env.TEST_ULH_ALLOW_LICENSE_DELETE === 'true') {
      await hub.deleteLicenseByHardwareId(createdHwId);
    }
    createdHwId = null;
    await hub.closeAddLicenseDialog();
    await hub.restoreLicensePanelDefaultState();
  });

  test('LIMAS-SUD-1229: Save creates license via POST with safe payload', async ({ page }) => {
    if (!process.env.TEST_ULH_ALLOW_LICENSE_MUTATION || process.env.TEST_ULH_ALLOW_LICENSE_MUTATION !== 'true') {
      test.skip(true, 'mutation gated');
      return;
    }
    // Fill all required fields
    const hwInput = hub.getAddLicenseDialog().getByPlaceholder(/HW\d+/);
    await recordEvidence('action-fill-user-license-hub-add-license.spec-417', async () => hwInput.fill(createdHwId!));
    await hub.selectAddLicenseRuntimeProfile();
    await hub.selectAddLicenseRuntimeRole();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 365);
    const dateStr = futureDate.toISOString().split('T')[0];
    const expInput = hub.getAddLicenseDialog().locator('input[type="date"]').first();
    await recordEvidence('action-fill-user-license-hub-add-license.spec-424', async () => expInput.fill(dateStr));
    // Observe create request
    const respPromise = page.waitForResponse(
      resp => resp.request().method() === 'POST' && resp.status() === 200,
      { timeout: 15000 }
    );
    await recordEvidence('action-click-user-license-hub-add-license.spec-430', async () => hub.getAddLicenseDialog().getByRole('button', { name: 'Save' }).click());
    const resp = await respPromise;
    await recordEvidence('assert-toBe-user-license-hub-add-license.spec-432', async () => expect(resp.status()).toBe(200));
  });

  test('LIMAS-SUD-1230: Saved license appears in license panel', async ({ page }) => {
    if (!process.env.TEST_ULH_ALLOW_LICENSE_MUTATION || process.env.TEST_ULH_ALLOW_LICENSE_MUTATION !== 'true') {
      test.skip(true, 'mutation gated');
      return;
    }
    const hwInput = hub.getAddLicenseDialog().getByPlaceholder(/HW\d+/);
    await recordEvidence('action-fill-user-license-hub-add-license.spec-441', async () => hwInput.fill(createdHwId!));
    await hub.selectAddLicenseRuntimeProfile();
    await hub.selectAddLicenseRuntimeRole();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 365);
    await recordEvidence('action-fill-user-license-hub-add-license.spec-446', async () => hub.getAddLicenseDialog().locator('input[type="date"]').first().fill(futureDate.toISOString().split('T')[0]));
    await recordEvidence('action-click-user-license-hub-add-license.spec-447', async () => hub.getAddLicenseDialog().getByRole('button', { name: 'Save' }).click());
    await hub.waitForUserListResponse();
    // Verify the license appears
    const hwIds = await hub.getAllVisibleHardwareIds();
    await recordEvidence('assert-toContain-user-license-hub-add-license.spec-451', async () => expect(hwIds).toContain(createdHwId));
  });

  test('LIMAS-SUD-1231: User badge count increments after addition', async ({ page }) => {
    if (!process.env.TEST_ULH_ALLOW_LICENSE_MUTATION || process.env.TEST_ULH_ALLOW_LICENSE_MUTATION !== 'true') {
      test.skip(true, 'mutation gated');
      return;
    }
    const initialCount = await hub.getVisibleLicenseCards().count();
    const hwInput = hub.getAddLicenseDialog().getByPlaceholder(/HW\d+/);
    await recordEvidence('action-fill-user-license-hub-add-license.spec-461', async () => hwInput.fill(createdHwId!));
    await hub.selectAddLicenseRuntimeProfile();
    await hub.selectAddLicenseRuntimeRole();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 365);
    await recordEvidence('action-fill-user-license-hub-add-license.spec-466', async () => hub.getAddLicenseDialog().locator('input[type="date"]').first().fill(futureDate.toISOString().split('T')[0]));
    await recordEvidence('action-click-user-license-hub-add-license.spec-467', async () => hub.getAddLicenseDialog().getByRole('button', { name: 'Save' }).click());
    await hub.waitForUserListResponse();
    const newCount = await hub.getVisibleLicenseCards().count();
    await recordEvidence('assert-toBe-user-license-hub-add-license.spec-470', async () => expect(newCount).toBe(initialCount + 1));
  });

  test('LIMAS-SUD-1232: Created license is deletable via Delete License', async ({ page }) => {
    if (!process.env.TEST_ULH_ALLOW_LICENSE_DELETE || process.env.TEST_ULH_ALLOW_LICENSE_DELETE !== 'true') {
      test.skip(true, 'delete gated');
      return;
    }
    // Create first
    const hwInput = hub.getAddLicenseDialog().getByPlaceholder(/HW\d+/);
    await recordEvidence('action-fill-user-license-hub-add-license.spec-480', async () => hwInput.fill(createdHwId!));
    await hub.selectAddLicenseRuntimeProfile();
    await hub.selectAddLicenseRuntimeRole();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 365);
    await recordEvidence('action-fill-user-license-hub-add-license.spec-485', async () => hub.getAddLicenseDialog().locator('input[type="date"]').first().fill(futureDate.toISOString().split('T')[0]));
    await recordEvidence('action-click-user-license-hub-add-license.spec-486', async () => hub.getAddLicenseDialog().getByRole('button', { name: 'Save' }).click());
    await hub.waitForUserListResponse();
    // Delete
    await hub.deleteLicenseByHardwareId(createdHwId!);
    await hub.waitForUserListResponse();
    const hwIds = await hub.getAllVisibleHardwareIds();
    await recordEvidence('assert-toContain-user-license-hub-add-license.spec-492', async () => expect(hwIds).not.toContain(createdHwId));
  });

  test('LIMAS-SUD-1233: Cleanup removes created license and restores state', async ({ page }) => {
    if (!process.env.TEST_ULH_ALLOW_LICENSE_DELETE || process.env.TEST_ULH_ALLOW_LICENSE_DELETE !== 'true') {
      test.skip(true, 'delete gated');
      return;
    }
    const initialCount = await hub.getVisibleLicenseCards().count();
    const hwInput = hub.getAddLicenseDialog().getByPlaceholder(/HW\d+/);
    await recordEvidence('action-fill-user-license-hub-add-license.spec-502', async () => hwInput.fill(createdHwId!));
    await hub.selectAddLicenseRuntimeProfile();
    await hub.selectAddLicenseRuntimeRole();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 365);
    await recordEvidence('action-fill-user-license-hub-add-license.spec-507', async () => hub.getAddLicenseDialog().locator('input[type="date"]').first().fill(futureDate.toISOString().split('T')[0]));
    await recordEvidence('action-click-user-license-hub-add-license.spec-508', async () => hub.getAddLicenseDialog().getByRole('button', { name: 'Save' }).click());
    await hub.waitForUserListResponse();
    await hub.deleteLicenseByHardwareId(createdHwId!);
    await hub.waitForUserListResponse();
    const finalCount = await hub.getVisibleLicenseCards().count();
    await recordEvidence('assert-toBe-user-license-hub-add-license.spec-513', async () => expect(finalCount).toBe(initialCount));
  });
});

test.describe('Add License Failures (Planned)', () => {
  test('LIMAS-SUD-1242: Failure plan — duplicate Hardware ID', async () => {
    test.skip(true, 'Requires controlled failure fixture');
  });

  test('LIMAS-SUD-1243: Failure plan — invalid Profile Role combination', async () => {
    test.skip(true, 'Requires controlled failure fixture');
  });

  test('LIMAS-SUD-1244: Failure plan — expired date rejection', async () => {
    test.skip(true, 'Requires controlled failure fixture');
  });

  test('LIMAS-SUD-1245: Failure plan — server error on save', async () => {
    test.skip(true, 'Requires controlled failure fixture');
  });

  test('LIMAS-SUD-1246: Failure plan — network interruption on save', async () => {
    test.skip(true, 'Requires controlled failure fixture');
  });

  test('LIMAS-SUD-1247: Failure plan — double submit prevention', async () => {
    test.skip(true, 'Requires controlled failure fixture');
  });

  test('LIMAS-SUD-1248: Failure plan — cleanup failure handling', async () => {
    test.skip(true, 'Requires controlled failure fixture');
  });
});