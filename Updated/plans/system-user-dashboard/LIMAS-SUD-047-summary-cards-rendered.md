---
test_id: "LIMAS-SUD-047"
title: 'To verify the functionality of "System User Dashboard" → "Summary Cards" → "Card Container" → "All 4 Summary Cards Rendered"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Summary Cards"
control: "4 buttons with role=button and aria-pressed"
action: "Verify exactly 4 summary cards exist with role=button and aria-pressed attributes"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
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

Verify that exactly 4 summary cards are rendered in the dashboard, each being a button element with `role="button"` and an `aria-pressed` attribute (radio-group behavior).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.

# Test Data

None — counts and attributes are verified dynamically.

# Steps and Expected Results

1. Action: Navigate to the dashboard and wait for full render.
   Expected Result: Dashboard content is visible.

2. Action: Locate all summary card buttons within the main content area.
   Expected Result: Exactly 4 buttons are found, each with `role="button"`.

3. Action: Verify that each of the 4 cards has an `aria-pressed` attribute.
   Expected Result: All 4 cards have `aria-pressed` set to either `"true"` or `"false"`.

# Expected Final Result

Exactly 4 summary cards are rendered as buttons with `aria-pressed` attributes, forming the radio-group card selector.

# Classification

- Read-only
- Visual

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not hardcode counts — verify dynamically.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending