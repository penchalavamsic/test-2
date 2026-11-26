---
test_id: "LIMAS-SUD-1699"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Mode Control\" → \"Stale Response Safety — Rapid Mode Toggling\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Mode Control"
action: "Stale Response Safety — Rapid Mode Toggling"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Licenses RFL-C"
test_type: "Negative"
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

Verify that a rapid sequence of mode switches (Active → Deleted → Active) does not result in a late Deleted response overriding the final Active state. The final mode must be Active, with Active counts, no mixed-mode data, and no duplicate mode request.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Active mode with data loaded.

# Test Data

All values read dynamically.

# Steps and Expected Results

1. Action: From Active mode, rapidly click Deleted, then immediately click Active again — before the Deleted response likely settles.
   Expected Result: Both clicks are registered. At most 3 requests may be in flight, but the final settled state must correspond to Active.

2. Action: Wait for all network requests to settle, then verify the final pressed mode.
   Expected Result: Active button is pressed (aria-pressed="true"). Deleted is unpressed.

3. Action: Verify the final counts match the Active API response.
   Expected Result: Toolbar counts reflect Active totalElements, not Deleted.

4. Action: Verify no mixed-mode data in the DOM.
   Expected Result: Only Active-mode rows (if any) are present. No Deleted rows or Deleted-specific columns remain.

5. Action: Verify no duplicate request for the final Active mode.
   Expected Result: The final Active GET is not duplicated — at most one per settled mode.

# Network Verification

Track all requests during the rapid toggle sequence. The final settled GET is for the Active endpoint. No late Deleted response overrides the final Active state.

# Expected Final Result

Rapid mode toggling is safe: the final settled mode (Active) is correct, counts are correct, no mixed-mode data, and stale Deleted responses do not override Active.

# Classification

- Read-only
- Negative
- Session

# Restrictions

- Use Playwright network monitoring or request interception.
- Do not hardcode timing values.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending