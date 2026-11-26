---
test_id: "LIMAS-SUD-1686"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Mode Control\" → \"Active to Deleted Switching and Route Stability\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Mode Control"
action: "Active to Deleted Switching and Route Stability"
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

Verify that clicking the Deleted mode button once transitions the UI: Deleted becomes pressed, Active becomes unpressed, Floating Licenses card remains selected, scroll resets to top, and the route stays at /reports.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Active mode is pressed.

# Test Data

All values read dynamically.

# Steps and Expected Results

1. Action: Click the Deleted mode button once.
   Expected Result: Deleted button aria-pressed becomes "true".

2. Action: Inspect the Active button pressed state.
   Expected Result: Active button aria-pressed becomes "false".

3. Action: Verify the Floating Licenses report card remains selected.
   Expected Result: Floating Licenses card aria-pressed is "true". No other report card is selected.

4. Action: Verify the route in the browser address bar.
   Expected Result: Route remains /reports (no navigation to a different path).

5. Action: Verify scroll position after the mode switch.
   Expected Result: Scroll container resets to the top (scrollTop is 0 or near 0).

# Network Verification

A GET request to the deleted floating licenses endpoint is triggered. Verify the request URL, method, and successful response.

# Expected Final Result

One click on Deleted transitions the mode, Active unpresses, Floating Licenses stays selected, scroll resets to top, and the route remains /reports.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode scroll values or route strings.
- Do not click Deleted more than once.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending