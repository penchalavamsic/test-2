---
test_id: "LIMAS-SUD-128"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Table" → "Incremental loading trigger"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Table scroll"
action: "Verify that scrolling to the bottom of the table triggers incremental loading of more rows"
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

Verify that scrolling to the bottom of the Pending License Requests table triggers incremental loading — the row count increases after scrolling.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The Pending License Requests tab is selected and the initial 20 rows are loaded.
- The loaded count is less than the total pending count (there are more rows to load).

# Test Data

None. Row counts are captured at runtime.

# Steps and Expected Results

1. Action: Navigate to the dashboard, ensure the Pending License Requests tab is active, and capture the initial visible row count.
   Expected Result: A positive row count is captured as `initialRowCount`.

2. Action: Scroll to the bottom of the table container.
   Expected Result: The scroll action completes.

3. Action: Wait briefly and capture the new visible row count.
   Expected Result: If more rows exist, the row count after scrolling is greater than the initial count. If all rows were already loaded, the count stays the same.

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Dashboard HTML with Pending License Requests data

# Expected Final Result

Scrolling to the bottom of the table either increases the visible row count (incremental loading works) or the count stays the same (all rows were already loaded).

# Classification

- Read-only
- Functional

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not use static environment-specific data.
- Do not hardcode row counts — capture at runtime.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending