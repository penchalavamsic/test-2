---
test_id: "LIMAS-SUD-1773"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Configuration Mode\" → \"Already-Selected Deleted\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Configuration Mode"
action: "Already-Selected Deleted"
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

Verify that clicking the Deleted mode control when it is already selected (aria-pressed="true") does not fire a duplicate network request, keeps counts stable, leaves table content unchanged, and retains the pressed state.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Deleted mode is selected and data has loaded successfully.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: With Deleted mode selected and data loaded, click the Deleted control again.
   Expected Result: No new network request to report/alldeleted is fired beyond the initial load.

2. Action: Verify the record count after clicking already-selected Deleted.
   Expected Result: The record count "{runtimeRecordCount} records" remains unchanged.

3. Action: Verify the loaded/total counts.
   Expected Result: The "{runtimeLoaded} loaded · {runtimeTotal} total" text remains unchanged.

4. Action: Verify table content.
   Expected Result: Table rows and cell content are unchanged from before the redundant click.

5. Action: Verify aria-pressed state.
   Expected Result: Deleted aria-pressed remains "true". Active aria-pressed remains "false".

# Network Verification

- No new network request is fired.
- Request count does not increase from the redundant click.

# Expected Final Result

Clicking already-selected Deleted fires no duplicate request, preserves counts and table content, and maintains aria-pressed="true".

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode counts or table content.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending