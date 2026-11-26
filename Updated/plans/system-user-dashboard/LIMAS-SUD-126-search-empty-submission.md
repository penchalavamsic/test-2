---
test_id: "LIMAS-SUD-126"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Search" → "Empty search submission"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Search field"
action: "Verify that pressing Enter with an empty search field has no effect on the list"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P3"
classification: "Read-only"
test_type: "Boundary"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that pressing Enter while the search field is empty does not change the loaded list, cause an error, or submit an unintended request.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The Pending License Requests tab is selected and the list is loaded.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard, ensure the Pending License Requests tab is active, and capture the initial loaded count.
   Expected Result: The count display shows a positive loaded count.

2. Action: Ensure the search field is empty, focus it, and press Enter.
   Expected Result: The search field remains empty.

3. Action: Observe the loaded count display after pressing Enter.
   Expected Result: The loaded count is unchanged — it matches the initial loaded count. No error or unexpected behavior occurs.

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Dashboard HTML with Pending License Requests data

# Expected Final Result

Pressing Enter with an empty search field has no effect — the loaded count remains unchanged and no errors occur.

# Classification

- Read-only
- Boundary

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending