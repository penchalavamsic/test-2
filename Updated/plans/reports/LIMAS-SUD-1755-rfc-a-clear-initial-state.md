---
test_id: "LIMAS-SUD-1755"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Filters\" → \"Clear Initial State\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Filters"
action: "Clear Initial State"
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

Verify the Clear button is visible in the filter panel. When filters are empty, clicking Clear has no effect and produces no error.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Filter panel is opened with all filters in their empty initial state.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Verify the Clear button is visible within the open filter panel.
   Expected Result: Clear button is present and visible.

2. Action: Click Clear while all filters are empty.
   Expected Result: No error is thrown. No network request is triggered. All filter controls remain in their initial empty state. The UI does not crash or show an error message.

# Network Verification

- Request Count: No new request after Clear with empty filters.

# Expected Final Result

Clear is visible and clicking it with empty filters causes no error or side effect.

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