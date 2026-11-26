---
test_id: "LIMAS-SUD-1775"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Configuration Mode\" → \"Mode Switch Loading State\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Configuration Mode"
action: "Mode Switch Loading State"
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

Verify that a loading indicator is shown during Active→Deleted and Deleted→Active mode switches, the indicator resolves when a response arrives (success or error), and there is no perpetual loading state.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: With Active mode active, click Deleted and immediately observe the content area.
   Expected Result: A loading indicator (spinner, skeleton, or loading text) is displayed while the Deleted request is in flight.

2. Action: Wait for the Deleted response to complete.
   Expected Result: The loading indicator resolves. Either Deleted data loads (success) or the expected state renders. No perpetual loading.

3. Action: With Deleted mode active, click Active and immediately observe the content area.
   Expected Result: A loading indicator is displayed while the Active request is in flight.

4. Action: Wait for the Active response to complete (expected 500 error).
   Expected Result: The loading indicator resolves. The Active error state appears. No perpetual loading.

5. Action: Verify no perpetual loading after all switches settle.
   Expected Result: After all responses arrive, the UI is settled with no loading indicator visible.

# Network Verification

- Active→Deleted: GET report/alldeleted
- Deleted→Active: GET report/all
- Loading indicator appears during each in-flight request and resolves afterward.

# Expected Final Result

Loading indicators appear during mode switches and resolve when responses arrive (success or error), with no perpetual loading state.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode endpoint paths.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending