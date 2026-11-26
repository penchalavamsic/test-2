---
test_id: "LIMAS-SUD-1692"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Mode Control\" → \"Filter Persistence Across Mode Switches — Non-Date Filter\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Mode Control"
action: "Filter Persistence Across Mode Switches — Non-Date Filter"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Licenses RFL-C"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
execution_status: "Not Run"
ci_cd_execution: "Pending"
healing: "Pending"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-active-deleted.spec.ts"
---

# Purpose

Determine the actual contract for filter persistence across mode switches using one representative non-date filter (Product Profile). Observe whether the filter value persists, resets, or partially carries over when switching Active → Deleted → Active.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Active mode, Filters expanded.

# Test Data

Use placeholders: {runtimeProfile}.

# Steps and Expected Results

1. Action: In Active mode, apply a Product Profile filter and record the selected profile ({runtimeProfile}).
   Expected Result: "Profiles: {count}" chip appears. Filtered count reflects the selection.

2. Action: Switch to Deleted mode.
   Expected Result: Document the actual behavior — whether the Product Profile filter persists in Deleted mode or resets.

3. Action: Switch back to Active mode.
   Expected Result: Document the actual behavior — whether the Product Profile filter is still applied, partially applied, or fully reset.

4. Action: Record the observed contract (persist, reset, or mixed).
   Expected Result: The observed behavior is the authoritative contract for this plan.

# Network Verification

Track any API requests triggered by mode switches. Filters are client-side; mode switches trigger a new GET per mode.

# Expected Final Result

The plan records the actual filter persistence contract across Active ↔ Deleted mode switches for non-date filters.

# Classification

- Read-only
- Positive
- Session

# Restrictions

- Do not assume persistence or reset behavior — observe and document.
- Use only one representative non-date filter.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending