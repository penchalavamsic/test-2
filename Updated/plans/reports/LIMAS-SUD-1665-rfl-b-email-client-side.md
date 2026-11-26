---
test_id: "LIMAS-SUD-1665"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Email Filter\" → \"Client-Side Filtering — No Server Request\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Email Filter"
action: "Client-Side Filtering — No Server Request"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Licenses RFL-B"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-filters.spec.ts"
---

# Purpose

Confirm that applying an Email filter does not trigger any server-side API request — Floating Licenses filters are client-side only.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable. Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Active mode, Filters expanded.

# Test Data

Use runtime values.

# Steps and Expected Results

1. Action: Monitor all outgoing API requests to the report backend before applying the email filter.
   Expected Result: Set up request monitoring for /api/report/ prefixes.

2. Action: Fill the email input and press Enter.
   Expected Result: No new request to any /api/report/ endpoint is observed.

3. Action: Verify the counts remain stable (no re-fetch).
   Expected Result: Record count and loaded/total unchanged by the filter action.

# Network Verification

No server request is triggered by Floating Licenses filter actions.

# Expected Final Result

All Floating Licenses filters operate client-side — no POST or additional GET is triggered by filter changes.

# Classification

- Read-only
- Positive
- Client-side

# Restrictions

- Do not hardcode values or endpoints.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending