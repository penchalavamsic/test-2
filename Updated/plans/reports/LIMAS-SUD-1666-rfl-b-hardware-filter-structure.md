---
test_id: "LIMAS-SUD-1666"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Hardware IDs Filter\" → \"Input Structure\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Hardware IDs Filter"
action: "Input Structure"
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

Inspect the Hardware IDs filter input structure: type=search, accessible name "Search Hardware IDs", placeholder, enabled state.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable. Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Active mode, Filters expanded.

# Test Data

Use environment variables only.

# Steps and Expected Results

1. Action: Inspect the Hardware IDs input element.
   Expected Result: Input type is search, accessible name "Search Hardware IDs", placeholder "Search Hardware IDs", enabled.

2. Action: Verify the input accepts keyboard focus.
   Expected Result: Input is focusable and shows focus-visible indicator.

# Network Verification

No API request needed for structure inspection.

# Expected Final Result

Hardware IDs filter is a type=search input with appropriate accessible name and keyboard reachability.

# Classification

- Read-only
- Positive

# Restrictions

- Do not enter Hardware ID values. Do not hardcode.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending