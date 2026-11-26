---
test_id: "LIMAS-SUD-1645"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Toolbar\" → \"Grouping and Control Order\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Toolbar"
action: "Grouping and Control Order"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Licenses RFL-A"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-shell.spec.ts"
---

# Purpose

Verify the toolbar contains: record count, "Floating license mode" group, Filters button, and Export Excel button in correct order.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected on the Reports page.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Inspect the toolbar container.
   Expected Result: Contains the record count text, mode group with accessible name "Floating license mode", Filters button, and Export Excel button.

2. Action: Verify the order of controls via keyboard tab: Active → Deleted → Filters.
   Expected Result: Tab order follows the visual order — Active, then Deleted, then Filters. Disabled Export is skipped.

3. Action: Verify the mode group contains exactly two children (Active, Deleted).
   Expected Result: Two buttons inside role="group" named "Floating license mode".

# Network Verification

No API verification needed.

# Expected Final Result

Toolbar controls are grouped correctly with "Floating license mode" label and follow logical tab order.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending