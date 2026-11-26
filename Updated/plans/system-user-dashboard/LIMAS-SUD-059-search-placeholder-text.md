---
test_id: "LIMAS-SUD-059"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Search Field" → "Placeholder Text"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Search textbox placeholder"
action: "Verify placeholder reads 'Search license requests...'"
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

Verify that the search textbox has the correct placeholder text: "Search license requests..."

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard and wait for full render.
   Expected Result: The Pending License Requests section is visible.

2. Action: Locate the search textbox by its placeholder attribute.
   Expected Result: The textbox is found and has placeholder "Search license requests...".

# Expected Final Result

The search textbox displays the placeholder "Search license requests...".

# Classification

- Read-only
- Visual

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not hardcode placeholder text.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending