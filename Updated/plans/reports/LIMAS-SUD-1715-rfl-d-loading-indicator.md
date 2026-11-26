---
test_id: "LIMAS-SUD-1715"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Deleted Infinite Scroll\" → \"Loading Indicator During Continuation\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Deleted Infinite Scroll"
action: "Loading Indicator During Continuation"
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

Verify that a loading indicator (spinner, skeleton, or progress) appears while a continuation request is in flight, disappears after data renders, does not obscure the toolbar, does not shift scroll position, does not cause a focus jump, and preserves the usability of mode controls during load. Check for aria-busy on the loading region if present.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Deleted mode is activated, initial batch (page=0) has settled, and {runtimeDeletedTotal} > {runtimeLoaded}.

# Test Data

All values read dynamically. Use placeholders: {runtimeLoaded}, {runtimeScrollTop}, {runtimeDeletedTotal}.

# Steps and Expected Results

1. Action: Scroll to the sentinel to trigger a continuation. Immediately observe the data area.
   Expected Result: A loading indicator (spinner or skeleton) appears within the data area while the request is in flight.

2. Action: Verify the toolbar remains visible and interactive during loading.
   Expected Result: The toolbar with loaded/total counts, Export button, Filters button, and mode controls is not obscured or hidden by the loading indicator.

3. Action: Verify scroll position does not change while the indicator is visible.
   Expected Result: ScrollTop before triggering = scrollTop during loading; position is stable.

4. Action: Verify no focus jump occurs during loading.
   Expected Result: The active element does not change during the loading indicator's lifecycle.

5. Action: Wait for the continuation request to settle. Verify the loading indicator disappears.
   Expected Result: Loading indicator is removed from the DOM or hidden after data renders; new rows are visible.

6. Action: If aria-busy is present on the data container, verify it is set during loading and cleared afterward.
   Expected Result: aria-busy="true" during load, aria-busy="false" or absent after load settles.

7. Action: Verify the mode controls (Active/Deleted) remain usable during loading.
   Expected Result: Active and Deleted buttons are not disabled by the loading state; they are reachable.

# Network Verification

Observe the continuation GET request; the loading indicator lifecycle is synchronous with the request's in-flight → settled transition.

# Expected Final Result

Loading indicator appears only while continuation request is in flight, toolbar remains visible, scroll position and focus are stable, mode controls remain usable, and aria-busy toggles correctly if present.

# Classification

- Read-only
- Positive
- Visual

# Restrictions

- Do not use fixed waits — rely on network observation and UI state.
- Do not manually dismiss the indicator.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending