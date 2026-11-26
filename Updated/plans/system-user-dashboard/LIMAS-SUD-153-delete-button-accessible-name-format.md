---
test_id: "LIMAS-SUD-153"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Delete Button" → "Accessible Name Format"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Delete button"
action: "Verify accessible name follows 'Delete LR-XXXXX' pattern"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P3"
classification: "Read-only"
test_type: "Accessibility"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-153-delete-button-accessible-name-format.spec.ts"
---

# Purpose

Verify that every visible Delete button in the license request table has an accessible name matching the "Delete LR-XXXXX" pattern (where XXXXX is a numeric request ID).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- At least one pending license request exists in the table.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard, wait for full render, and click the Pending License Requests card.
   Expected Result: The license request table is visible with at least one row.

2. Action: Collect all visible Delete buttons and verify each has an accessible name.
   Expected Result: Every Delete button has a non-empty accessible name.

3. Action: Verify each accessible name matches the pattern `Delete LR-\d+`.
   Expected Result: Every Delete button's accessible name starts with "Delete LR-" followed by digits.

# Expected Final Result

All Delete buttons in the license request table have accessible names that follow the "Delete LR-XXXXX" naming convention.

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