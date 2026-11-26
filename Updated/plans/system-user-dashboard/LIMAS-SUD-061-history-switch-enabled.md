---
test_id: "LIMAS-SUD-061"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "History Switch" → "Switch Enabled"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Switch 'Show License Request History'"
action: "Verify history switch is not disabled"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Functional"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that the "Show License Request History" switch is enabled (not disabled), allowing the user to toggle it.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard and wait for full render.
   Expected Result: The Pending License Requests section is visible.

2. Action: Locate the history switch.
   Expected Result: The switch is visible.

3. Action: Assert the switch is enabled.
   Expected Result: `.toBeEnabled()` passes on the switch.

# Expected Final Result

The history switch is enabled and ready for interaction.

# Classification

- Read-only
- Functional

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending