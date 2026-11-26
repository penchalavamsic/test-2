import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

test.describe('LIMAS-SUD-046: Navigation items accessibility — icon-only collapsed links lack accessible names', () => {
  test('should have an accessible name when expanded but lose it when the sidebar collapses to icon-only', async ({ page }) => {
    const dashboard = new SystemUserDashboardPage(page);
    await dashboard.waitForSidebar();

    // Confirmed via execution trace (SUD-PL-01-C): the sidebar's collapse
    // state is NOT guaranteed expanded on load — it rendered data-state
    // "collapsed" by default in that run. waitForSidebar() only waits for
    // the container to be visible, not for a particular collapse state, so
    // this test must establish and verify the expanded state explicitly
    // rather than assume it. The wrapper carrying data-state/data-collapsible
    // is an ancestor of the sidebar container (confirmed execution DOM).
    const sidebarState = dashboard.sidebarContainer.locator('xpath=ancestor::*[@data-collapsible][1]');
    const initialState = await sidebarState.getAttribute('data-state');

    const navLinks = [
      dashboard.navSystemUserDashboard,
      dashboard.navUserLicenses,
      dashboard.navReports,
      dashboard.navFloatingLicenseConfigs,
      dashboard.navStandardLicenseConfigs,
      dashboard.navFeatures,
      dashboard.navProfiles,
      dashboard.navUserGroups,
      dashboard.navSystemUsers,
      dashboard.navServerLicensing,
      dashboard.navServerLicenseImport,
    ];

    try {
      // Establish expanded state deterministically — wait for the attribute
      // change rather than an arbitrary timeout. The toggle only flips
      // data-state; data-collapsible is a static configuration attribute.
      if (initialState !== 'expanded') {
        await recordEvidence('action-click-LIMAS-SUD-046-nav-items-accessibility.spec-38', async () => dashboard.sidebarToggleButton.click());
      }
      await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-046-nav-items-accessibility.spec-40', async () => expect(sidebarState).toHaveAttribute('data-state', 'expanded'));

      // Expanded state: links must have a real, browser-computed accessible
      // name (not a custom textContent/attribute approximation).
      for (const link of navLinks) {
        await recordEvidence('assert-toHaveAccessibleName-LIMAS-SUD-046-nav-items-accessibility.spec-45', async () => expect(link).not.toHaveAccessibleName(''));
      }

      // Collapse the sidebar via the toggle button and wait for the
      // deterministic state change before asserting on collapsed markup.
      await recordEvidence('action-click-LIMAS-SUD-046-nav-items-accessibility.spec-50', async () => dashboard.sidebarToggleButton.click());
      await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-046-nav-items-accessibility.spec-51', async () => expect(sidebarState).toHaveAttribute('data-state', 'collapsed'));

      // Accessibility finding: confirmed via execution trace DOM — when
      // collapsed (data-collapsible="icon"), nav links render icon-only
      // (bare <svg>, no aria-label/title/text), so the browser computes no
      // accessible name at all.
      for (const link of navLinks) {
        await recordEvidence('assert-toBeVisible-LIMAS-SUD-046-nav-items-accessibility.spec-58', async () => expect(link).toBeVisible());
        await recordEvidence('assert-toHaveAccessibleName-LIMAS-SUD-046-nav-items-accessibility.spec-59', async () => expect(link).toHaveAccessibleName(''));
      }
    } finally {
      // Restore the sidebar to whatever state it was in before this test.
      const finalState = await sidebarState.getAttribute('data-state');
      if (finalState !== initialState) {
        await recordEvidence('action-click-LIMAS-SUD-046-nav-items-accessibility.spec-65', async () => dashboard.sidebarToggleButton.click());
        if (initialState) {
          await recordEvidence('assert-toHaveAttribute-LIMAS-SUD-046-nav-items-accessibility.spec-67', async () => expect(sidebarState).toHaveAttribute('data-state', initialState));
        }
      }
    }
  });
});
