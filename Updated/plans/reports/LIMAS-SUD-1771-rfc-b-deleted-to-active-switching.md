---
test_id: "LIMAS-SUD-1771"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Configuration Mode\" → \"Deleted-to-Active Switching\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Configuration Mode"
action: "Deleted-to-Active Switching"
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

Verify that clicking Active while in Deleted mode deselects Deleted (aria-pressed="false"), selects Active (aria-pressed="true"), fires a GET request to report/all with page and size query params, transitions to the Active error state (500), removes the table, and resets counts to 0.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Deleted mode is selected with data loaded.
- The Active endpoint returns a 500 error.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Click the Active mode control while currently in Deleted mode.
   Expected Result: Deleted aria-pressed updates to "false". Active aria-pressed updates to "true".

2. Action: Capture the network request after clicking Active.
   Expected Result: A GET request to report/all with page={runtimePage}&size={runtimeSize} is sent.

3. Action: Verify the Active error state appears.
   Expected Result: The error heading "Unable to load Floating Configuration records" is visible. Status 500 error state is displayed.

4. Action: Verify the table is removed.
   Expected Result: The Deleted data table is no longer rendered. No table or rows are visible.

5. Action: Verify counts are reset.
   Expected Result: The record count shows 0 or the error-state count (non-negative). Loaded/total counts reflect the error state.

# Network Verification

- Request URL: Contains report/all?page={runtimePage}&size={runtimeSize}
- HTTP Method: GET
- Expected Status: 500

# Expected Final Result

Switching from Deleted to Active deselects Deleted, selects Active, fires the Active API request, shows the 500 error state, removes the table, and resets counts to 0.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode endpoint paths, page, or size values.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending