---
test_id: "LIMAS-SUD-1722"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Deleted Infinite Scroll\" → \"Safe Restoration After Deleted Infinite Scroll\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Deleted Infinite Scroll"
action: "Safe Restoration After Deleted Infinite Scroll"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Licenses RFL-D"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
execution_status: "Not Run"
ci_cd_execution: "Pending"
healing: "Pending"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-deleted-infinite-scroll.spec.ts"
---

# Purpose

After Deleted infinite scroll scenarios have run: switch to Active mode, clear all filters, collapse the Filters panel, restore scroll to top, and verify the Floating Licenses initial state: card selected, Active pressed, Deleted unpressed, 0 records, 0 loaded · 0 total, empty-state visible, Export disabled, route /reports, no pending request, and browser is clean.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Prior test actions may have modified the Floating Licenses → Deleted state (scroll position, loaded count, multiple continuations triggered).

# Test Data

All values read dynamically.

# Steps and Expected Results

1. Action: Click the Active button to switch from Deleted to Active mode.
   Expected Result: A request to the Active endpoint (allfloatinglicenses) fires. Active button gets aria-pressed="true", Deleted gets aria-pressed="false".

2. Action: Wait for the Active request to settle.
   Expected Result: Active Floating License data is displayed.

3. Action: Ensure all filters are cleared.
   Expected Result: All six filter controls have empty/default values.

4. Action: Collapse the Filters panel.
   Expected Result: Filter controls are not visible.

5. Action: Verify the scroll container is reset (scrollTop = 0 or scrolled to top).
   Expected Result: The table scroll container is at its top position.

6. Action: Verify Floating Licenses card is still selected.
   Expected Result: Floating Licenses card has aria-pressed="true".

7. Action: Verify Active is pressed and Deleted is unpressed.
   Expected Result: Active has aria-pressed="true", Deleted has aria-pressed="false".

8. Action: Verify the record count, loaded count, and total count.
   Expected Result: 0 records when no Active licenses exist for the profile; loaded = 0, total = 0.

9. Action: Verify the empty-state is visible.
   Expected Result: The "No records found" or equivalent empty-state message is displayed.

10. Action: Verify the Export Excel button is disabled.
    Expected Result: Export button has attribute disabled or aria-disabled="true".

11. Action: Verify the route is /reports.
    Expected Result: URL pathname matches /reports.

12. Action: Verify no pending API request is outstanding.
    Expected Result: All network requests have settled; no spinner or loading indicator is present.

13. Action: Verify no error toasts, console errors, or visual anomalies.
    Expected Result: UI is in a clean, stable state.

# Network Verification

Active endpoint GET request settles; no stale Deleted endpoint request remains pending. No error responses.

# Expected Final Result

After Deleted infinite scroll, the Floating Licenses state is fully restored: Active mode, filters cleared/collapsed, scroll reset, counts zero, empty-state shown, Export disabled, route /reports, no pending requests.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode counts — the Active state may have 0 records.
- Do not manually navigate to simulate a successful result.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending