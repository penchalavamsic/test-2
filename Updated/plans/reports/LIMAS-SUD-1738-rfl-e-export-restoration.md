---
test_id: "LIMAS-SUD-1738"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Export Excel\" → \"State Restoration After Export Scenarios\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Export Excel"
action: "State Restoration After Export Scenarios"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Licenses RFL-E"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
execution_status: "Not Run"
ci_cd_execution: "Pending"
healing: "Pending"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-export.spec.ts"
---

# Purpose

After all Export scenarios have run, restore the Floating Licenses state: select Active, clear filters, collapse filters, and verify the initial Active state — FL card selected, Active pressed, Deleted unpressed, 0 records, 0 loaded · 0 total, empty-state visible, Export disabled, route /reports.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Prior Export test scenarios may have modified the Floating Licenses → Deleted state (filters applied, scroll position changed, multiple exports performed).

# Test Data

All values read dynamically. Target: Active mode, zero records.

# Steps and Expected Results

1. Action: Click the Active button to switch from Deleted to Active mode.
   Expected Result: A request to the Active endpoint fires. Active button gets aria-pressed="true", Deleted gets aria-pressed="false".

2. Action: Wait for the Active API request to settle.
   Expected Result: Active Floating License data is displayed.

3. Action: Ensure all filters are cleared.
   Expected Result: All filter controls have empty/default values. All chips removed.

4. Action: Collapse the Filters panel.
   Expected Result: Filter controls are not visible.

5. Action: Verify the Floating Licenses card is still selected.
   Expected Result: Floating Licenses card has aria-pressed="true".

6. Action: Verify Active is pressed and Deleted is unpressed.
   Expected Result: Active has aria-pressed="true", Deleted has aria-pressed="false".

7. Action: Verify the toolbar counts.
   Expected Result: 0 records. "0 loaded · 0 total" or equivalent is displayed.

8. Action: Verify the empty-state is visible.
   Expected Result: The "No records found" or equivalent empty-state message is displayed.

9. Action: Verify the Export Excel button is disabled.
   Expected Result: Export button has `disabled` attribute or `aria-disabled="true"`.

10. Action: Verify the route is /reports.
    Expected Result: URL pathname matches /reports.

11. Action: Verify no pending API request, no error toasts, no console errors.
    Expected Result: UI is in a clean, stable state.

# Network Verification

Active endpoint GET request settles. No stale Deleted endpoint request remains pending. No error responses.

# Expected Final Result

After export scenarios, the Floating Licenses state is fully restored: Active mode, filters cleared/collapsed, FL card selected, 0 records, 0 loaded · 0 total, empty-state visible, Export disabled, route /reports.

# Classification

- Read-only
- Positive

# Restrictions

- Do not close the browser — this is a restoration, not teardown.
- Do not hardcode counts or filter state descriptions.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending