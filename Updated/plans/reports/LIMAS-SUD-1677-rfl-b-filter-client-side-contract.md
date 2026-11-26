---
test_id: "LIMAS-SUD-1677"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"API\" → \"Filter — Client-Side Only, No POST\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "API"
action: "Filter — Client-Side Only, No POST"
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

Record the filter mechanism: all Floating Licenses filters are client-side only. No POST, no filter-specific API endpoint is called.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable. Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Active mode.

# Test Data

All values dynamic.

# Steps and Expected Results

1. Action: Monitor all network requests while applying Email, HW IDs, Product Profile, Role, and Date filters.
   Expected Result: No POST, PUT, PATCH, or DELETE requests to any report API endpoint.

2. Action: Verify the only report API call remains the initial GET to allfloatinglicenses.
   Expected Result: Exactly one GET request observed.

3. Action: Verify the filter state is maintained purely in client-side state.
   Expected Result: Chips, input values, and filtered results are managed without server round-trips.

# Network Verification

No POST or additional GET triggered by filters. Single GET for initial data load.

# Expected Final Result

Floating Licenses filters are entirely client-side. No filter API endpoint exists or is called.

# Classification

- Read-only
- Client-side
- API

# Restrictions

- Do not hardcode endpoints or values.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending