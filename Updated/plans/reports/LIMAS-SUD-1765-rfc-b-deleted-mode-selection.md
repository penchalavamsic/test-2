---
test_id: "LIMAS-SUD-1765"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Configuration Mode\" → \"Deleted Mode Selection\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Configuration Mode"
action: "Deleted Mode Selection"
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

Verify that clicking the Deleted mode control sets aria-pressed="true" on Deleted and aria-pressed="false" on Active, shows a loading state with text "Loading Deleted Floating Configuration records...", and keeps the Floating Configurations card selected.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Active mode is initially selected (default).

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Click the Deleted mode control.
   Expected Result: Deleted aria-pressed updates to "true". Active aria-pressed updates to "false".

2. Action: Observe the loading state after clicking Deleted.
   Expected Result: A loading indicator or text is displayed, such as "Loading Deleted Floating Configuration records...".

3. Action: Verify the Floating Configurations card remains selected.
   Expected Result: Floating Configurations card retains aria-pressed="true". No other report card becomes selected.

# Network Verification

- Request URL: Contains report/alldeleted with page={runtimePage}&size={runtimeSize}
- HTTP Method: GET

# Expected Final Result

Clicking Deleted sets its aria-pressed to "true", sets Active to "false", shows a loading state, and keeps the Floating Configurations card selected.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode loading messages or endpoint paths.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending