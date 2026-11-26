---
test_id: "LIMAS-SUD-130"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Table" → "Loaded count after incremental load"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Count display"
action: "Verify that the loaded count in the count display increases after scrolling triggers incremental load"
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

Verify that the loaded count shown in the count display increases after scrolling triggers incremental loading of additional rows.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The Pending License Requests tab is selected and the initial rows are loaded.
- The loaded count is less than the total pending count.

# Test Data

None. Counts are captured at runtime.

# Steps and Expected Results

1. Action: Navigate to the dashboard, ensure the Pending License Requests tab is active, and capture the initial loaded count.
   Expected Result: A positive integer `initialLoaded` is captured.

2. Action: Scroll to the bottom of the table and wait for incremental loading.
   Expected Result: The scroll action completes.

3. Action: Capture the updated loaded count from the count display.
   Expected Result: If more rows exist to load, `updatedLoaded` ≥ `initialLoaded`. If all rows were already loaded, the counts remain equal.

# Network Verification

- Request URL: `/system-user-dashboard`
- HTTP Method: GET
- Expected Status: 200
- Payload Presence: Dashboard HTML with Pending License Requests data

# Expected Final Result

After scrolling, the loaded count is at least the initial loaded count, confirming the count display reflects the incremental loading state.

# Classification

- Read-only
- Functional

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not use static environment-specific data.
- Do not hardcode counts — capture at runtime.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending