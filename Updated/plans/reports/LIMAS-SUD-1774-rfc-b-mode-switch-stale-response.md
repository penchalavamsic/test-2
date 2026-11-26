---
test_id: "LIMAS-SUD-1774"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Configuration Mode\" → \"Stale Response Safety\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Configuration Mode"
action: "Stale Response Safety"
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

Verify that when rapidly switching from Active to Deleted, a late-arriving Active error response (500) does not pollute the Deleted view. The last settled state wins and the UI remains consistent.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Active mode is selected and a 500 response is in flight or pending.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: With Active mode loading (or errored), rapidly click Deleted.
   Expected Result: Deleted aria-pressed="true". Active aria-pressed="false". A request to report/alldeleted is sent.

2. Action: Wait for the Deleted request to complete.
   Expected Result: Deleted data loads successfully. Deleted table and counts are visible.

3. Action: Verify no Active error state contaminates the Deleted view.
   Expected Result: The error heading "Unable to load Floating Configuration records" is not visible. No 500 error message or Retry button appears in the Deleted view.

4. Action: Verify the UI is consistent after all responses settle.
   Expected Result: Only Deleted data is displayed. Mode is Deleted (aria-pressed="true"). Counts match the Deleted API response. No mixed-state rendering.

# Network Verification

- Active request (in-flight when switch occurred): Contains report/all
- Deleted request (after switch): Contains report/alldeleted
- The last settled state (Deleted) is the one reflected in the UI.

# Expected Final Result

A late-arriving Active error response does not pollute the Deleted view. The UI reflects only the last settled mode state.

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