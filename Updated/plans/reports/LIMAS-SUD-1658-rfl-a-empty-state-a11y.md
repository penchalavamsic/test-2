---
test_id: "LIMAS-SUD-1658"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Empty State\" → \"Accessibility\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Empty State"
action: "Accessibility"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
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

Verify the empty-state container uses role="group" and that empty-state messages are accessible text paragraphs.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, API returns 0 records (empty state visible).

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: When no records exist, inspect the empty-state container.
   Expected Result: Container has role="group".

2. Action: Verify the empty-state messages are paragraph elements with readable text.
   Expected Result: Messages like "No Floating License records found" are in <p> elements.

3. Action: Verify the loaded/total count is displayed as "0 loaded · 0 total".
   Expected Result: Zero counts are clearly communicated.

# Network Verification

No additional API verification needed.

# Expected Final Result

The empty state is semantically structured with role="group" and accessible paragraph text.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending