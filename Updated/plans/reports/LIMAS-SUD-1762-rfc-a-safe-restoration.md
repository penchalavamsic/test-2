---
test_id: "LIMAS-SUD-1762"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Restoration\" → \"Safe Restoration\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Restoration"
action: "Safe Restoration"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Configurations RFC-A"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-shell.spec.ts"
---

# Purpose

After all RFC-A scenarios: verify Floating Configurations card is selected and pressed, Active is pressed, Deleted is unpressed, filters are collapsed, the error state or initial view is visible (depending on backend), the route is /reports, and no request is pending. Keep the browser open.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page.
- All RFC-A test steps have been executed.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Verify Floating Configurations card selection.
   Expected Result: Card is selected with aria-pressed="true".

2. Action: Verify mode controls.
   Expected Result: Active has aria-pressed="true". Deleted has aria-pressed="false".

3. Action: Verify Filters panel state.
   Expected Result: Filters panel is collapsed. No filter controls are visible.

4. Action: Verify the main content area.
   Expected Result: Either the error state view or the initial data view is visible, depending on the backend response.

5. Action: Verify the current route.
   Expected Result: The route is /reports.

6. Action: Verify no pending network requests.
   Expected Result: No in-flight or pending requests are observed.

7. Action: Keep the browser open for subsequent test sessions.
   Expected Result: Browser session remains active and responsive.

# Network Verification

- Request Count: 0 pending requests.

# Expected Final Result

The UI is in a clean restored state: FC selected, Active pressed, Deleted unpressed, filters collapsed, correct route, no pending requests, browser open.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode application state details.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending