---
test_id: "LIMAS-SUD-1717"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Deleted Infinite Scroll\" → \"Mode and Filter State Preservation During Scroll\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Deleted Infinite Scroll"
action: "Mode and Filter State Preservation During Scroll"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Licenses RFL-D"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
execution_status: "Not Run"
ci_cd_execution: "Pending"
healing: "Pending"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-deleted-infinite-scroll.spec.ts"
---

# Purpose

Throughout infinite scroll on the Deleted view, verify that: Deleted remains pressed (aria-pressed="true"), Active remains unpressed (aria-pressed="false"), filter values remain empty, the Filters panel remains collapsed, the Floating Licenses card remains selected, and no mode switching is triggered by scroll actions.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Deleted mode is activated, initial batch (page=0) has settled, and {runtimeDeletedTotal} > {runtimeLoaded}.

# Test Data

All values read dynamically. Use placeholders: {runtimeLoaded}, {runtimeDeletedTotal}.

# Steps and Expected Results

1. Action: Before scrolling, verify the Deleted button has aria-pressed="true" and Active has aria-pressed="false".
   Expected Result: Deleted is the active mode; Active is not pressed.

2. Action: Verify the Filters panel is collapsed (filter controls not visible).
   Expected Result: Filters panel is in the collapsed state.

3. Action: Expand filters temporarily, verify all filter values are empty, then collapse again.
   Expected Result: All six filter controls have empty/default values.

4. Action: Trigger a continuation (scroll to sentinel, wait for settle).
   Expected Result: New data is appended.

5. Action: Verify Deleted is still aria-pressed="true" and Active is still aria-pressed="false" after the continuation.
   Expected Result: Mode state is unchanged; no mode switch triggered by scroll.

6. Action: Verify the Filters panel remains collapsed.
   Expected Result: Filter controls are still not visible.

7. Action: Verify the Floating Licenses card is still selected.
   Expected Result: Floating Licenses card has aria-pressed="true".

8. Action: Expand filters and verify all filter values are still empty.
   Expected Result: No filter values have been populated by scroll activity.

9. Action: Trigger additional continuations and repeat the mode/filter checks.
   Expected Result: Mode and filter state remain stable across multiple continuations.

# Network Verification

Only Deleted endpoint GET requests are observed; no Active endpoint request is triggered by scrolling.

# Expected Final Result

Throughout Deleted infinite scroll, mode stays on Deleted, Active stays unpressed, filters stay empty and collapsed, Floating Licenses card stays selected, and no mode switching occurs.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode aria-pressed values — read dynamically.
- Do not change modes during the test.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending