---
test_id: "LIMAS-SUD-1779"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Cleanup\" → \"Safe Restoration\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Cleanup"
action: "Safe Restoration"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Configurations RFC-B"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-error-deleted.spec.ts"
---

# Purpose

Verify that after all testing, the Floating Configurations card is selected, Active mode is pressed, Deleted mode is unpressed, filters are collapsed and empty, the Active state is visible (error or initial), the route is /reports, no request is pending, and the browser remains open.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page.
- All RFC-B test scenarios have completed.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Verify the Floating Configurations card is selected.
   Expected Result: Floating Configurations card has aria-pressed="true". Other report cards are unpressed.

2. Action: Verify Active mode is selected.
   Expected Result: Active aria-pressed="true". Deleted aria-pressed="false".

3. Action: Verify the Filters panel is collapsed and empty.
   Expected Result: The Filters panel is in a collapsed state with no active filter selections applied.

4. Action: Verify the Active view state.
   Expected Result: The Active state is visible — either the error state (500) or the initial loading/default state. No Deleted data is displayed.

5. Action: Verify the current route.
   Expected Result: The browser URL path is /reports.

6. Action: Verify no pending network request.
   Expected Result: No in-flight API request is pending. The network tab is idle.

7. Action: Verify the browser remains open.
   Expected Result: The browser session is still alive and responsive.

# Network Verification

- No pending network requests.
- The page is settled with no in-flight API calls.

# Expected Final Result

After all testing, the UI is restored to a clean state: FC card selected, Active pressed, Deleted unpressed, filters collapsed empty, Active state visible, route /reports, no pending requests, browser open.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode routes, card names, or mode labels.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending