---
test_id: "LIMAS-SUD-1709"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Deleted Infinite Scroll\" → \"Non-Boundary Scroll — No Continuation Triggered\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Deleted Infinite Scroll"
action: "Non-Boundary Scroll — No Continuation Triggered"
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

Scroll within the already-loaded rows (scrollTop less than scrollHeight - clientHeight - sentinelHeight) and verify that no continuation request is triggered, row count remains stable, scroll position is preserved, and no scroll-related errors or warnings appear.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Deleted mode is activated, initial batch has settled, and {runtimeDeletedTotal} > {runtimeLoaded} (more data available).

# Test Data

All values read dynamically. Use placeholders: {runtimeScrollHeight}, {runtimeClientHeight}, {runtimeScrollTop}, {runtimeSentinelHeight}, {runtimeLoaded}.

# Steps and Expected Results

1. Action: Record the current row count before any scrolling.
   Expected Result: Row count is {runtimeLoaded} (the count of currently rendered rows).

2. Action: Scroll the container partway through loaded content — scrollTop set to a value well below scrollHeight - clientHeight - {runtimeSentinelHeight} (e.g., 50% of scrollable range).
   Expected Result: ScrollTop is updated; scroll position is within the loaded content area, not at the boundary.

3. Action: Monitor the network for any new API requests after the scroll settles.
   Expected Result: No new GET request to the Deleted endpoint is fired. Only the initial batch request has been observed.

4. Action: Verify the row count has not changed.
   Expected Result: Row count remains at {runtimeLoaded}.

5. Action: Verify the scroll position is stable (no auto-scroll or reset).
   Expected Result: The scroll position set by the user is preserved; no snap-back or auto-scroll occurs.

6. Action: Check the browser console for scroll-related errors or warnings.
   Expected Result: No errors or warnings related to scrolling in the Deleted view.

# Network Verification

Only the initial Deleted GET is observed. No continuation request should appear.

# Expected Final Result

Scrolling within loaded rows does not trigger a continuation: row count stable, scroll position preserved, no network activity, no console errors.

# Classification

- Read-only
- Positive
- Boundary

# Restrictions

- Do not scroll to the sentinel boundary.
- Do not trigger a continuation.
- Do not use fixed wait times — rely on network observation.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending