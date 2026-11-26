---
test_id: "LIMAS-SUD-1674"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Clear\" → \"Panel Clear Button\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Clear"
action: "Panel Clear Button"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Licenses RFL-B"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-filters.spec.ts"
---

# Purpose

Verify the Clear button inside the filter panel resets all filter controls and removes all chips.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable. Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Active mode, Filters expanded, one or more filters applied.

# Test Data

Use runtime values.

# Steps and Expected Results

1. Action: Apply Email, Product Profile, and Expiration Date filters.
   Expected Result: Multiple chips are visible.

2. Action: Click the Clear button inside the filter panel.
   Expected Result: All chips removed, all filter inputs cleared, Profile Role returns to disabled "Select a profile first".

3. Action: Verify no server request triggered.
   Expected Result: Cleared state reflects initial empty state; no API call.

# Network Verification

No server request triggered by Clear.

# Expected Final Result

Panel Clear resets all filters to initial empty state including Profile Role dependency.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode filter values.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending