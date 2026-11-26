---
test_id: "LIMAS-SUD-1652"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Table\" → \"Empty State or Table Structure\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Table"
action: "Empty State or Table Structure"
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

Verify the data area shows either a table with headers when records exist or an appropriate empty state when no records are available.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected on the Reports page.

# Test Data

Do not hardcode table headers or empty-state text.

# Steps and Expected Results

1. Action: After selecting Floating Licenses, observe the data area.
   Expected Result: Either a table with header row or an empty-state message is visible.

2. Action: If empty, verify the empty-state messages.
   Expected Result: Messages like "No Floating License records found" and "No records are available for the current report and applied filters."

3. Action: If a table is present, discover actual headers dynamically.
   Expected Result: Headers match the Floating Licenses data schema.

# Network Verification

No additional API verification needed.

# Expected Final Result

The data area renders either the correct table structure or the appropriate empty state based on available records.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode table headers.
- Do not store or log row values.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending