---
test_id: "LIMAS-SUD-1679"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Empty State\" → \"Filtered Empty State and Export\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Empty State"
action: "Filtered Empty State and Export"
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

Verify the empty state persists when filters are applied to an already-empty dataset, and Export remains disabled.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable. Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Active mode, 0 records.

# Test Data

All values dynamic.

# Steps and Expected Results

1. Action: Apply Email filter to the empty dataset.
   Expected Result: "No Floating License records found" message still visible.

2. Action: Apply Product Profile filter.
   Expected Result: Empty state message unchanged.

3. Action: Verify Export Excel button remains disabled.
   Expected Result: Export button is disabled throughout all filter states.

4. Action: Verify no table appears.
   Expected Result: No table element is rendered.

# Network Verification

No server requests triggered by filters.

# Expected Final Result

Empty state remains stable across filter actions; Export stays disabled; no table appears.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode messages or counts.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending