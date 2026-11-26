---
test_id: "LIMAS-SUD-156"
title: 'To verify the functionality of "System User Dashboard" → "Summary Cards" → "Pending License Requests Card" → "Count Syncs with Table"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Summary Cards"
control: "Pending License Requests card"
action: "Verify card count matches loaded table row count"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Functional"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-156-card-count-syncs-with-table.spec.ts"
---

# Purpose

Verify that the count displayed on the "Pending License Requests" summary card matches the number of rows currently loaded in the license request table.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- At least one pending license request exists.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard and wait for full render.
   Expected Result: Dashboard is fully rendered with summary cards visible.

2. Action: Extract the numeric count from the Pending License Requests card text.
   Expected Result: The card contains a numeric count (e.g., "146 Pending").

3. Action: Click the Pending License Requests card to load the table and count the rows.
   Expected Result: The table is visible with a certain number of data rows.

4. Action: Compare the card count to the number of visible table rows.
   Expected Result: The card count equals the number of loaded table rows.

# Expected Final Result

The Pending count displayed on the summary card accurately reflects the number of license request rows loaded in the table.

# Classification

- Read-only
- Functional

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not manually navigate to simulate a successful result.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending