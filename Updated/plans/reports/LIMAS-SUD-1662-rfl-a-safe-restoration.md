---
test_id: "LIMAS-SUD-1662"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Restoration\" → \"Safe Initial State Restoration\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Restoration"
action: "Safe Initial State Restoration"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Licenses RFL-A"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-shell.spec.ts"
---

# Purpose

After state-changing observations (filter toggle, Clear click), restore Floating Licenses to its initial state: card selected, Active pressed, filters collapsed, filters empty, counts restored, route /reports.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses state may have been modified by prior test actions.

# Test Data

All values read dynamically.

# Steps and Expected Results

1. Action: Ensure Floating Licenses card is selected.
   Expected Result: aria-pressed="true" on Floating Licenses card.

2. Action: Ensure Active is pressed.
   Expected Result: Active button has aria-pressed="true".

3. Action: Ensure Deleted is not pressed.
   Expected Result: Deleted button has aria-pressed="false".

4. Action: Collapse the Filters panel.
   Expected Result: Filter controls are not visible.

5. Action: Expand filters, verify all filter values are empty, then collapse.
   Expected Result: All 6 filters have empty/default values.

6. Action: Verify route is /reports.
   Expected Result: URL pathname matches /reports.

7. Action: Verify counts are stable and consistent with initial state.
   Expected Result: Record count and loaded/total match the initial API response.

8. Action: Verify no error, toast, or pending request.
   Expected Result: UI is in a clean, stable state.

# Network Verification

A GET to allfloatinglicenses should settle; no error responses.

# Expected Final Result

Floating Licenses initial state is fully restored: correct card, mode, filters collapsed/empty, counts stable, route correct.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode counts.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending