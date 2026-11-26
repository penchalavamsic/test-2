---
test_id: "LIMAS-SUD-1646"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Filters Panel\" → \"Filters Button Expand and Collapse\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Filters Panel"
action: "Filters Button Expand and Collapse"
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

Verify the Filters button toggles the filter panel visibility, and focus stays within the toolbar area after toggle.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected on the Reports page.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Verify the Filters button is visible and enabled, filters panel is initially collapsed.
   Expected Result: Filters button visible; filter controls (e.g., Email input) are not visible.

2. Action: Click the Filters button.
   Expected Result: Filter panel appears with the Email filter visible.

3. Action: Click the Filters button again.
   Expected Result: Filter panel collapses; filter controls hidden.

4. Action: Verify no unexpected API request is triggered by expand/collapse.
   Expected Result: Only read-only UI state change; no new data request.

# Network Verification

No API request should be triggered by mere expand/collapse.

# Expected Final Result

The Filters button expands and collapses the filter panel without triggering data requests.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not enter filter values.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending