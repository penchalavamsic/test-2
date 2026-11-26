---
test_id: "LIMAS-SUD-1748"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Toolbar\" → \"Record Count Display\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Toolbar"
action: "Record Count Display"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Configurations RFC-A"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-shell.spec.ts"
---

# Purpose

Verify the toolbar displays a record count in the format "{N} records", shows "0 records" when data is empty or in an errored state, and always displays a non-negative number.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.

# Test Data

Use environment variables and the authenticated fixture. Record count is read dynamically.

# Steps and Expected Results

1. Action: Inspect the toolbar text for the record count element.
   Expected Result: Text matches the pattern "{N} records" where N is a non-negative integer.

2. Action: If the API returns an error (500), verify the record count.
   Expected Result: The toolbar shows "{runtimeRecordCount} records" or "0 records". The value is non-negative.

3. Action: Verify the count element is visible within the toolbar.
   Expected Result: Record count text is present and readable.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The toolbar displays a record count in "{N} records" format, showing "0 records" when empty or errored, and the count is always non-negative.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode record counts. Use runtime placeholders.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending