---
test_id: "LIMAS-SUD-1767"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Toolbar\" → \"Deleted Mode Counts\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Toolbar"
action: "Deleted Mode Counts"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Configurations RFC-B"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-error-deleted.spec.ts"
---

# Purpose

Verify that after Deleted mode data loads, the toolbar displays a record count in "{runtimeRecordCount} records" format, a loaded/total count in "{runtimeLoaded} loaded · {runtimeTotal} total" format, and both counts match the totalElements from the API response.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Deleted mode is selected and data has loaded successfully.

# Test Data

Use environment variables and the authenticated fixture. All count values are read dynamically from the UI and cross-referenced with the API response.

# Steps and Expected Results

1. Action: Inspect the toolbar for the record count after Deleted data loads.
   Expected Result: Text matches the pattern "{runtimeRecordCount} records" where runtimeRecordCount is a non-negative integer.

2. Action: Inspect the toolbar for the loaded/total count text.
   Expected Result: Text matches the pattern "{runtimeLoaded} loaded · {runtimeTotal} total" where both values are non-negative integers.

3. Action: Cross-reference the record count with the API response totalElements.
   Expected Result: The runtimeRecordCount matches the totalElements value from the report/alldeleted API response.

4. Action: Cross-reference the total count with the API response totalElements.
   Expected Result: The runtimeTotal matches the totalElements value from the API response.

# Network Verification

- Request URL: Contains report/alldeleted?page={runtimePage}&size={runtimeSize}
- HTTP Method: GET
- Response Field: totalElements

# Expected Final Result

After Deleted mode loads, the toolbar shows "{runtimeRecordCount} records" and "{runtimeLoaded} loaded · {runtimeTotal} total", with both counts matching the totalElements from the API response.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode record counts, loaded, or total values. Use runtime placeholders.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending