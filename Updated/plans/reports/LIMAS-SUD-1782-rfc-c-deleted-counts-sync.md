---
test_id: "LIMAS-SUD-1782"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Deleted Mode\" → \"Counts Sync with API\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Deleted Mode"
action: "Counts Sync with API"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Configurations RFC-C"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-deleted.spec.ts"
---

# Purpose

Verify that after Deleted mode fully loads, the record count and loaded/total display accurately reflect the API response: "{runtimeTotalElements} records" and "{runtimeLoaded} loaded · {runtimeTotalElements} total".

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Deleted mode has been selected and all API requests have completed.

# Test Data

Use the API response from the alldeleted endpoint to read totalElements dynamically.

# Steps and Expected Results

1. Action: Read the record count display after Deleted mode fully loads.
   Expected Result: The record count displays "{runtimeTotalElements} records", where runtimeTotalElements is read from the alldeleted API response totalElements field.

2. Action: Read the loaded/total display.
   Expected Result: The display shows "{runtimeLoaded} loaded · {runtimeTotalElements} total", where runtimeLoaded is the number of rows currently rendered in the table, and runtimeTotalElements matches the API totalElements.

3. Action: Verify loaded ≤ total.
   Expected Result: The loaded count is less than or equal to the total count from the API response.

4. Action: Verify the record count is dynamic (read at runtime, not hardcoded).
   Expected Result: The test reads both values from the API response and the UI at runtime and compares them, without any hardcoded numeric expectations.

# Network Verification

- Request URL: {runtimeBaseUrl}/api/report/alldeleted?page=0&size={runtimeSize}
- HTTP Method: GET
- Expected Status: 200
- UI counts derived from the same API response.

# Expected Final Result

The Deleted mode record count and loaded/total display match the alldeleted API's totalElements at runtime, with loaded ≤ total.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode record counts, loaded values, or total values. Read dynamically from API and UI.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending