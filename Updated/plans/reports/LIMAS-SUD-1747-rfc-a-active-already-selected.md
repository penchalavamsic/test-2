---
test_id: "LIMAS-SUD-1747"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Configuration Mode\" → \"Active Already Selected\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Configuration Mode"
action: "Active Already Selected"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
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

Verify that clicking Active when it is already selected does not fire a duplicate request, keeps counts stable, and leaves Deleted unpressed with the mode group state unchanged.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected and Active already pressed.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Wait for the initial data request to complete and note the current record count.
   Expected Result: Active is pressed, Deleted is unpressed, data is loaded.

2. Action: Click the Active control again.
   Expected Result: No new network request is fired. The record count remains stable.

3. Action: Verify Deleted and mode group state.
   Expected Result: Deleted remains unpressed. Mode group accessible name "Configuration mode" is unchanged. Active stays pressed.

# Network Verification

- Request Count: No new request after redundant Active click.

# Expected Final Result

Clicking Active when already selected triggers no duplicate request, preserves counts, and does not alter Deleted or mode group state.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending