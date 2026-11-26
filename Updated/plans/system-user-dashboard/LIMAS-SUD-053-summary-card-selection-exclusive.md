---
test_id: "LIMAS-SUD-053"
title: 'To verify the functionality of "System User Dashboard" → "Summary Cards" → "Selection Behavior" → "Exclusive Selection (Radio-Group)"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Summary Cards"
control: "aria-pressed on all 4 cards"
action: "Verify only one card has aria-pressed=\"true\" at any time"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
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

Verify that the 4 summary cards behave as a radio-group: exactly one card has `aria-pressed="true"` at any time, and clicking another card transfers the pressed state exclusively.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard and wait for full render.
   Expected Result: Dashboard is loaded with the Pending License Requests card pressed.

2. Action: Count how many summary cards have `aria-pressed="true"`.
   Expected Result: Exactly 1 card has `aria-pressed="true"`.

3. Action: Click the "Expiring Licenses" summary card.
   Expected Result: The Expiring Licenses card now has `aria-pressed="true"`.

4. Action: Count how many cards have `aria-pressed="true"` after the click.
   Expected Result: Still exactly 1 card has `aria-pressed="true"`.

5. Action: Verify the previously pressed card now has `aria-pressed="false"`.
   Expected Result: The Pending License Requests card has `aria-pressed="false"`.

# Expected Final Result

Summary cards operate as an exclusive radio-group: exactly one card is pressed at any time, and clicking a different card transfers the pressed state exclusively.

# Classification

- Read-only
- Functional

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not hardcode card names.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending