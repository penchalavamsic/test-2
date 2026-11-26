---
test_id: "LIMAS-SUD-1807"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Deleted Mode\" → \"Safe Restoration to Active Error State\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Deleted Mode"
action: "Safe Restoration to Active Error State"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Configurations RFC-C"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-deleted.spec.ts"
---

# Purpose

Verify that after collapsing filters and clicking Active mode from Deleted mode, the Active mode error state is correctly restored: "Unable to load Floating Configuration records" heading visible, "Request failed with status code 500" text visible, 0 records displayed, Active button pressed, Deleted button unpressed, and the route is /reports.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Deleted mode has been selected, fully loaded, and filters have been interacted with.
- Active mode's API endpoint returns a 500 error.

# Test Data

The error state and mode control states are verified from the DOM at runtime.

# Steps and Expected Results

1. Action: Collapse the Filters panel in Deleted mode.
   Expected Result: The Filters panel is collapsed or closed.

2. Action: Click the Active mode control.
   Expected Result: The Active mode control transitions to the pressed/selected state. The Deleted mode control becomes unpressed.

3. Action: Verify the error heading is visible.
   Expected Result: The heading "Unable to load Floating Configuration records" is visible on screen.

4. Action: Verify the error supporting text.
   Expected Result: Text "Request failed with status code 500" is visible.

5. Action: Verify the record count.
   Expected Result: The record count displays "0 records" (or equivalent zero state).

6. Action: Verify mode control states.
   Expected Result: Active button is in the pressed/selected state. Deleted button is unpressed.

7. Action: Verify the route.
   Expected Result: The browser URL/route is /reports.

# Network Verification

- Clicking Active triggers a GET to the active endpoint which returns status 500.
- The error state is displayed based on this 500 response.

# Expected Final Result

After collapsing filters and switching to Active, the error state is correctly restored with heading, 500 error text, 0 records, Active pressed, and Deleted unpressed.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode error messages or status codes. Read dynamically from the DOM and API at runtime.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending