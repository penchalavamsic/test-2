---
test_id: "LIMAS-SUD-1685"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Mode Control\" → \"Click Active When Already Selected\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Mode Control"
action: "Click Active When Already Selected"
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

Verify that clicking the Active mode button when it is already selected does not trigger a duplicate API request, does not alter the existing counts, and does not change the Deleted button state or scroll position.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Active mode is already pressed.

# Test Data

All values read dynamically.

# Steps and Expected Results

1. Action: Record the current Active record counts (loaded and total).
   Expected Result: Counts are available and nonnegative.

2. Action: Record the initial scroll position.
   Expected Result: Scroll position is at top or a known value.

3. Action: Begin monitoring network requests, then click the Active mode button.
   Expected Result: No new API request to the floating licenses endpoint is triggered.

4. Action: Inspect the Active button pressed state.
   Expected Result: Active remains pressed (aria-pressed="true").

5. Action: Inspect the Deleted button pressed state.
   Expected Result: Deleted remains unpressed (aria-pressed="false").

6. Action: Verify record counts remain unchanged.
   Expected Result: Loaded and total counts are identical to pre-click values.

7. Action: Verify scroll position is unchanged.
   Expected Result: Scroll position matches the initial recorded value.

# Network Verification

No duplicate GET or any other request triggered by re-clicking the already-selected Active button.

# Expected Final Result

Clicking Active when already selected is idempotent — no duplicate request, counts stable, Deleted remains unpressed, scroll unchanged.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode counts or scroll values.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending