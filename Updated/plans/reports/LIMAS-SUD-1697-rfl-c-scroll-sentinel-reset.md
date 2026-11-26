---
test_id: "LIMAS-SUD-1697"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Mode Control\" → \"Scroll Sentinel Reset on Mode Switch\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Mode Control"
action: "Scroll Sentinel Reset on Mode Switch"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
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

Verify that switching modes resets the scroll position to the top, the correct mode container is active, the infinite-scroll sentinel is recalculated for the new mode, the loaded count belongs to the selected mode, no rows from the previous mode remain visible, and at most one initial Deleted API request is triggered.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Active mode with data loaded.

# Test Data

Use placeholders: {runtimeLoadedCount}.

# Steps and Expected Results

1. Action: In Active mode, scroll down to a non-zero position.
   Expected Result: Scroll position > 0.

2. Action: Switch to Deleted mode.
   Expected Result: Scroll position resets to top (scrollTop is 0 or near 0).

3. Action: Verify the Deleted mode content container is the active one.
   Expected Result: Deleted rows are visible; no Active rows remain in the DOM.

4. Action: Verify the loaded count belongs to the Deleted mode.
   Expected Result: Loaded count reflects Deleted numberOfElements.

5. Action: Verify no scroll sentinel from the Active mode remains.
   Expected Result: The sentinel element is recalculated and positioned for the Deleted container.

6. Action: Verify at most one Deleted API request was triggered.
   Expected Result: Exactly one GET to the deleted endpoint, or zero if data was cached.

# Network Verification

At most one GET request to the deleted floating licenses endpoint triggered by the mode switch.

# Expected Final Result

Mode switch resets scroll to top, correct content container active, sentinel recalculated, loaded count belongs to Deleted, no leftover rows from Active.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode scroll positions.
- Document whether exactly one or zero Deleted requests occurred.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending