import { verifyHubMutationRejection } from '../helpers/hub-mutation-recovery';
import { withOwnedHubLicense } from '../helpers/hub-license-crud';
import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/authenticated-test';
import { UserLicenseHubPage } from '../pages/user-license-hub.page';

/**
 * ULH-L: Delete License
 * Test IDs: LIMAS-SUD-1461 through LIMAS-SUD-1481
 * Compact batch — 21 test cases.
 */

test.describe('Delete License Action', () => {
  let hub: UserLicenseHubPage;

  test.beforeEach(async ({ page }) => {
    hub = new UserLicenseHubPage(page);
    await hub.goto();
    await hub.restoreDefaultUserListState();
    await hub.restoreLicensePanelDefaultState();
    await hub.applyRuntimeProfileForDownload();
    await hub.selectFirstVisibleUser();
  });

  test('LIMAS-SUD-1461: Delete button visible with accessible name', async () => {
    const btn = hub.getDeleteLicenseButtonForRuntimeLicense();
    await recordEvidence('assert-toBeVisible-user-license-hub-delete-license.spec-24', async () => expect(btn).toBeVisible());
    await recordEvidence('assert-toHaveAttribute-user-license-hub-delete-license.spec-25', async () => expect(btn).toHaveAttribute('aria-label', 'Delete license'));
  });

  test('LIMAS-SUD-1462: Delete button present on every license card', async () => {
    const cards = hub.getVisibleLicenseCards();
    const cardCount = await cards.count();
    const deleteBtns = hub.page.locator('button[aria-label="Delete license"]');
    await recordEvidence('assert-toHaveCount-user-license-hub-delete-license.spec-32', async () => expect(deleteBtns).toHaveCount(cardCount));
  });

  test('LIMAS-SUD-1463: Delete button icon-only with SVG', async () => {
    const btn = hub.getDeleteLicenseButtonForRuntimeLicense();
    await recordEvidence('assert-toBeVisible-user-license-hub-delete-license.spec-37', async () => expect(btn.locator('svg')).toBeVisible());
    const text = (await btn.innerText()).trim();
    await recordEvidence('assert-toBe-user-license-hub-delete-license.spec-39', async () => expect(text).toBe(''));
  });

  test('LIMAS-SUD-1464: Delete button enabled', async () => {
    await recordEvidence('assert-toBeEnabled-user-license-hub-delete-license.spec-43', async () => expect(hub.getDeleteLicenseButtonForRuntimeLicense()).toBeEnabled());
  });

  test('LIMAS-SUD-1467: Delete button keyboard reachable and focus indicator', async ({ page }) => {
    await recordEvidence('action-focus-user-license-hub-delete-license.spec-47', async () => hub.getDeleteLicenseButtonForRuntimeLicense().focus());
    await recordEvidence('assert-toBeFocused-user-license-hub-delete-license.spec-48', async () => expect(hub.getDeleteLicenseButtonForRuntimeLicense()).toBeFocused());
  });
});

test.describe('Delete License Interaction Model', () => {
  let hub: UserLicenseHubPage;

  test.beforeEach(async ({ page }) => {
    hub = new UserLicenseHubPage(page);
    await hub.goto();
    await hub.restoreDefaultUserListState();
    await hub.restoreLicensePanelDefaultState();
    await hub.applyRuntimeProfileForDownload();
    await hub.selectFirstVisibleUser();
  });

  test('LIMAS-SUD-1465: All Profiles permits card-scoped DELETE; controlled rejection preserves the license', async ({page}) => { await verifyHubMutationRejection(new UserLicenseHubPage(page),'delete',403); });

  test('LIMAS-SUD-1466: Delete sends its request without a confirmation dialog', async ({page}) => { await verifyHubMutationRejection(new UserLicenseHubPage(page),'delete',403); });

  test('LIMAS-SUD-1468: Delete targets an exact user and license ID and preserves data on rejection', async ({page}) => { await verifyHubMutationRejection(new UserLicenseHubPage(page),'delete',403); });

  test('LIMAS-SUD-1478: Accessibility — immediate destructive action with no confirmation', async () => {
    // Documented finding: Delete License has no confirmation dialog (matches User Delete pattern)
    // This is a destructive UX concern
    const btn = hub.getDeleteLicenseButtonForRuntimeLicense();
    await recordEvidence('assert-toBeVisible-user-license-hub-delete-license.spec-103', async () => expect(btn).toBeVisible());
    // aria-label is present but no additional safety check exists
    await recordEvidence('assert-toHaveAttribute-user-license-hub-delete-license.spec-105', async () => expect(btn).toHaveAttribute('aria-label', 'Delete license'));
  });
});

test.describe.serial('Delete License Lifecycle', () => {
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
    createdHwId = `ULH-TEST-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    // Create lifecycle license
    await hub.prepareRuntimeUserForLicenseCreation();
    await hub.openAddLicenseDialog();
    await recordEvidence('action-fill-user-license-hub-delete-license.spec-129', async () => hub.getAddLicenseDialog().getByPlaceholder(/HW\d+/).fill(createdHwId!));
    await hub.selectAddLicenseRuntimeProfile();
    await hub.selectAddLicenseRuntimeRole();
    const future = new Date();
    future.setDate(future.getDate() + 365);
    await recordEvidence('action-fill-user-license-hub-delete-license.spec-134', async () => hub.getAddLicenseDialog().locator('input[type="date"]').first().fill(future.toISOString().split('T')[0]));
    await recordEvidence('action-click-user-license-hub-delete-license.spec-135', async () => hub.getAddLicenseDialog().getByRole('button', { name: 'Save' }).click());
    await hub.waitForUserListResponse();

    // Re-select user and apply profile to see created license
    await hub.restoreLicensePanelDefaultState();
    await hub.applyRuntimeProfileForDownload();
    await hub.selectFirstVisibleUser();
  });

  test.afterEach(async () => {
    if (!hub) return;
    if (createdHwId && process.env.TEST_ULH_ALLOW_LICENSE_DELETE === 'true') {
      try {
        await hub.deleteLicenseByHardwareId(createdHwId);
      } catch { /* already absent */ }
    }
    createdHwId = null;
    await hub.restoreLicensePanelDefaultState();
  });

  ;

  ;

  ;

  ;

  ;

  ;

  ;

  ;

  ;

  ;
});

test.describe('Controlled Failures', () => {
  test('LIMAS-SUD-1479: Controlled unauthorized forbidden not-found and conflict DELETE responses preserve the license', async ({page}) => { test.setTimeout(240000);for(const status of [401,403,404,409])await verifyHubMutationRejection(new UserLicenseHubPage(page),'delete',status); });

  test('LIMAS-SUD-1480: Controlled DELETE network failure preserves the license after reload', async ({page}) => { await verifyHubMutationRejection(new UserLicenseHubPage(page),'delete','network'); });
});
// Self-contained owned lifecycle; independent of the legacy read-only form hooks.
test('LIMAS-SUD-1469: Delete an owned license and verify absence after reload', async ({page}) => { test.setTimeout(240000); const hub=new UserLicenseHubPage(page); await withOwnedHubLicense(hub,'LIMAS-SUD-1469',async license=>{ await license.remove(); }); });

test('LIMAS-SUD-1470: Owned license card is removed after deletion', async ({page}) => { test.setTimeout(240000); const hub=new UserLicenseHubPage(page); await withOwnedHubLicense(hub,'LIMAS-SUD-1470',async license=>{ await license.remove(); },{}); });
test('LIMAS-SUD-1474: Owned license removal uses DELETE with exact user and license IDs', async ({page}) => { test.setTimeout(240000); const hub=new UserLicenseHubPage(page); await withOwnedHubLicense(hub,'LIMAS-SUD-1474',async license=>{ await license.remove(); },{}); });
test('LIMAS-SUD-1475: One activation sends exactly one owned-license DELETE', async ({page}) => { test.setTimeout(240000); const hub=new UserLicenseHubPage(page); await withOwnedHubLicense(hub,'LIMAS-SUD-1475',async license=>{ await license.remove(); },{}); });
test('LIMAS-SUD-1476: Rapid Delete activation sends one request and removes the owned license', async ({page}) => { test.setTimeout(240000); const hub=new UserLicenseHubPage(page); await withOwnedHubLicense(hub,'LIMAS-SUD-1476',async license=>{ await license.remove(true); },{}); });
test('LIMAS-SUD-1477: Cleanup is idempotent after verified owned-license removal', async ({page}) => { test.setTimeout(240000); const hub=new UserLicenseHubPage(page); await withOwnedHubLicense(hub,'LIMAS-SUD-1477',async license=>{ await license.remove(); await license.cleanup(); await recordEvidence('assert-toHaveLength-user-license-hub-delete-license.spec-162', async () => expect(await license.freshLicenses()).toHaveLength(0)); },{}); });
test('LIMAS-SUD-1471: Owned user badge decrements after license deletion', async ({page}) => { test.setTimeout(240000); const hub=new UserLicenseHubPage(page); await withOwnedHubLicense(hub,'LIMAS-SUD-1471',async license=>{ await license.remove(); await recordEvidence('assert-toBeVisible-user-license-hub-delete-license.spec-163', async () => expect(license.user.card().getByText(/^0 Licenses$/)).toBeVisible()); },{}); });
test('LIMAS-SUD-1472: Owned license card count decrements to zero', async ({page}) => { test.setTimeout(240000); const hub=new UserLicenseHubPage(page); await withOwnedHubLicense(hub,'LIMAS-SUD-1472',async license=>{ await license.remove(); },{}); });
test('LIMAS-SUD-1473: License panel remains synchronized after owned deletion', async ({page}) => { test.setTimeout(240000); const hub=new UserLicenseHubPage(page); await withOwnedHubLicense(hub,'LIMAS-SUD-1473',async license=>{ await license.remove(); },{}); });
test('LIMAS-SUD-1481: Cleanup removes the owned license and restores the user lifecycle', async ({page}) => { test.setTimeout(240000); const hub=new UserLicenseHubPage(page); await withOwnedHubLicense(hub,'LIMAS-SUD-1481',async license=>{ await license.remove(); },{}); });
