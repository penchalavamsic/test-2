---
test_id: "LIMAS-SUD-131"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Table" → "Dark mode readability"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Table rows"
action: "Verify that table row text is readable in dark theme (sufficient contrast)"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P3"
classification: "Read-only"
test_type: "Visual"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that the table row text and background in dark theme have sufficient contrast for readability — the text color is not the same as the background.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The Pending License Requests tab is selected and the table is loaded.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard, ensure the Pending License Requests tab is active, and switch to dark theme.
   Expected Result: The `<html>` element has the `dark` class.

2. Action: Locate the first visible data row in the table and evaluate its computed text color and background color.
   Expected Result: The text color is not identical to the background color (text is distinguishable).

3. Action: Verify that at least one text element (user name paragraph) in the row is visible.
   Expected Result: The paragraph is visible in dark theme.

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: N/A

# Expected Final Result

In dark theme, table row text is distinguishable from the background — the computed text color differs from the background color, and the text is visible.

# Classification

- Read-only
- Visual

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending