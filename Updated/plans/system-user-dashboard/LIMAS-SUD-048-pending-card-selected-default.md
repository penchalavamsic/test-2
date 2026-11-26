---
test_id: "LIMAS-SUD-048"
title: 'To verify the functionality of "System User Dashboard" → "Summary Cards" → "Pending License Requests Card" → "Selected by Default"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Summary Cards"
control: "Pending License Requests card"
action: "Verify aria-pressed=\"true\" on the Pending License Requests card on initial load"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Session"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that the "Pending License Requests" summary card is selected by default when the dashboard first loads, indicated by `aria-pressed="true"`.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard and wait for full render.
   Expected Result: Dashboard content is visible.

2. Action: Locate the "Pending License Requests" summary card button.
   Expected Result: The card is found by its accessible name matching `/Pending License Requests/`.

3. Action: Assert the `aria-pressed` attribute of the card.
   Expected Result: `aria-pressed` equals `"true"`.

# Expected Final Result

The "Pending License Requests" summary card is the initially selected card with `aria-pressed="true"`.

# Classification

- Read-only
- Session

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not hardcode card names or counts.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending