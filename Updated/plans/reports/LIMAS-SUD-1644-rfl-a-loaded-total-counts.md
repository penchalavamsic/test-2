---
test_id: "LIMAS-SUD-1644"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Toolbar\" → \"Loaded and Total Counts\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Toolbar"
action: "Loaded and Total Counts"
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

Parse the "loaded · total" text dynamically and verify loaded ≤ total, both are nonnegative, and no stale Standard License count remains.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected on the Reports page.

# Test Data

All counts are read dynamically. Use placeholders like {runtimeLoaded} and {runtimeTotal}.

# Steps and Expected Results

1. Action: After selecting Floating Licenses, parse "{loaded} loaded · {total} total".
   Expected Result: Both loaded and total are nonnegative integers.

2. Action: Verify loaded ≤ total.
   Expected Result: loaded <= total.

3. Action: Verify the counts reflect Floating Licenses, not Standard Licenses.
   Expected Result: The total matches the toolbar record count and the API response totalElements.

# Network Verification

Correlate with the allfloatinglicenses API response totalElements and numberOfElements.

# Expected Final Result

Loaded and total counts are nonnegative, loaded ≤ total, and consistent with the initial API response.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode record counts or batch sizes.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending