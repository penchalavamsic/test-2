---
test_id: "LIMAS-SUD-1705"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Active View\" → \"Safe Restoration — Initial Active State After All Scenarios\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Active View"
action: "Safe Restoration — Initial Active State After All Scenarios"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Licenses RFL-C"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
execution_status: "Not Run"
ci_cd_execution: "Pending"
healing: "Pending"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-active-deleted.spec.ts"
---

# Purpose

After exercising all Deleted-mode scenarios, verify the environment can be safely restored: select Floating Licenses card, select Active mode, expand Filters, clear all six filters, verify Profile Role is disabled, collapse Filters, and verify the initial Active state is restored — 0 records displayed, "0 loaded · 0 total", Export disabled, route /reports, and the browser remains open.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The Reports page is loaded. Any prior test state may be active.

# Test Data

All values dynamic. Target state: records = 0.

# Steps and Expected Results

1. Action: Ensure the Floating Licenses report card is selected (click if not).
   Expected Result: Floating Licenses card is selected (aria-pressed="true").

2. Action: Select the Active mode button (click if not already active).
   Expected Result: Active button is pressed (aria-pressed="true"), Deleted is unpressed.

3. Action: Expand the Filters panel if collapsed.
   Expected Result: Filters panel is expanded with all six Floating Licenses filter controls visible.

4. Action: Activate the panel Clear button to reset all six filters.
   Expected Result: All filter inputs are empty/initial. All chips are removed.

5. Action: Verify the Profile Role filter is disabled.
   Expected Result: Profile Role has placeholder "Select a profile first" and is disabled.

6. Action: Collapse the Filters panel.
   Expected Result: Filters panel is collapsed.

7. Action: Verify the toolbar shows "0 records" and "0 loaded · 0 total".
   Expected Result: Record count is 0. Loaded and total are both 0.

8. Action: Verify the Export Excel button is disabled.
   Expected Result: Export button is disabled or has aria-disabled="true".

9. Action: Verify the route is /reports.
   Expected Result: Browser URL path is /reports.

10. Action: Verify the browser session remains open and responsive.
    Expected Result: No browser crash, no navigation away from /reports.

# Network Verification

The initial Active API GET returns with totalElements = 0 (or the response is settled). No outstanding requests.

# Expected Final Result

The Floating Licenses Active view is restored to its clean initial state: 0 records, 0 loaded · 0 total, Export disabled, filters empty and collapsed, Profile Role disabled, and route /reports.

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