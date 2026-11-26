---
test_id: "LIMAS-SUD-1696"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Deleted View\" → \"Clear Filters — Panel Clear and Clear All\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Deleted View"
action: "Clear Filters — Panel Clear and Clear All"
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

Verify that with both a non-date filter (Product Profile) and a date filter (Expiration Date) populated in Deleted mode, activating the panel Clear or Clear all button resets all six filters, removes all chips, clears Product Profile selection, clears and disables Profile Role, and restores unfiltered Deleted counts — without changing the selected mode.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Deleted mode is activated, Filters expanded.

# Test Data

Use placeholders: {runtimeProfile}, {runtimeDate}, {runtimeDeletedTotal}.

# Steps and Expected Results

1. Action: In Deleted mode, apply a Product Profile filter and an Expiration Date filter.
   Expected Result: "Profiles: {count}" chip and "Exp: {runtimeDate}" chip are both visible.

2. Action: Activate the panel Clear button (or Clear all button if in chip area).
   Expected Result: All six filters return to initial/empty values. Both chips disappear.

3. Action: Verify Product Profile is cleared.
   Expected Result: Product Profile combobox shows no selection.

4. Action: Verify Profile Role is cleared and disabled.
   Expected Result: Profile Role has no selection and is disabled with placeholder "Select a profile first".

5. Action: Verify Deleted mode is still selected.
   Expected Result: Deleted button remains pressed (aria-pressed="true").

6. Action: Verify counts return to unfiltered Deleted state.
   Expected Result: Toolbar count equals {runtimeDeletedTotal}.

# Network Verification

No server request triggered by the clear action. Only the initial Deleted GET.

# Expected Final Result

Clear resets all filters atomically in Deleted mode, chips disappear, Profile Role clears and disables, Deleted mode persists, counts restore to unfiltered Deleted state.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode filter values.
- Verify both chip removal and disabled-state reversion.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending