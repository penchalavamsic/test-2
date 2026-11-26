---
test_id: "LIMAS-SUD-159"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "History Switch" → "Accessible Name"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "History switch"
action: "Verify switch has accessible name 'Show License Request History'"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P3"
classification: "Read-only"
test_type: "Accessibility"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-159-history-switch-accessible-name.spec.ts"
---

# Purpose

Verify that the "Show License Request History" toggle switch has role="switch" and an accessible name matching "Show License Request History".

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard, wait for full render, and click the Pending License Requests card.
   Expected Result: The license request table is visible.

2. Action: Locate the history toggle switch by its accessible name.
   Expected Result: The switch is visible and has accessible name "Show License Request History".

3. Action: Verify the switch has role="switch".
   Expected Result: The element has `role="switch"`.

# Expected Final Result

The history toggle has a proper accessible name ("Show License Request History") and the correct ARIA role of "switch".

# Classification

- Read-only
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not manually navigate to simulate a successful result.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending