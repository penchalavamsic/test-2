---
test_id: "LIMAS-SUD-1704"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Mode Control\" → \"Accessibility — Filter State Communication Across Modes\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Mode Control"
action: "Accessibility — Filter State Communication Across Modes"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
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

Verify that filter state changes are communicated to assistive technology: filter persistence or reset is announced when switching modes, chips in Deleted mode have accessible names and remove buttons, Profile Role disabled state is announced, and Clear button actions are communicated.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Active mode, Filters expanded.

# Test Data

All values dynamic.

# Steps and Expected Results

1. Action: Apply a filter in Active mode, then switch to Deleted mode. Observe whether the filter persistence or reset is communicated.
   Expected Result: If filters persist, chips remain with accessible names. If filters reset, the reset is communicated (e.g., live region announcement or chip removal is conveyed).

2. Action: In Deleted mode, apply a filter and inspect the chip accessibility.
   Expected Result: Chips have accessible names (e.g., "Remove Profiles: {count}") and remove buttons are keyboard-operable.

3. Action: Inspect the Profile Role filter in its disabled state.
   Expected Result: Profile Role has aria-disabled="true" or the disabled state is otherwise communicated. Placeholder "Select a profile first" is accessible.

4. Action: Activate the panel Clear button and inspect whether the clear action is announced.
   Expected Result: Clear action is communicated to assistive technology (e.g., "Filters cleared" or chips removed with announcement).

5. Action: Verify the Deleted mode selection remains communicated after clearing.
   Expected Result: Deleted button pressed state is still announced.

# Network Verification

No additional API verification beyond normal mode-switch requests.

# Expected Final Result

Filter persistence/reset is communicated, Deleted chips are accessible, Profile Role disabled state is announced, Clear action is communicated, and mode selection announcement persists.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not hardcode chip labels or announcement text.
- Document any missing announcements as accessibility gaps.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending