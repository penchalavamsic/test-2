---
test_id: "LIMAS-SUD-1716"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Deleted Infinite Scroll\" → \"Scroll Position Stability After Append\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Deleted Infinite Scroll"
action: "Scroll Position Stability After Append"
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

After a continuation appends new rows to the Deleted table, verify that the scroll position is not reset to the top. ScrollTop is preserved, the viewport content shifts smoothly without jarring repositioning, and the user's current view is maintained.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Deleted mode is activated, initial batch (page=0) has settled, and {runtimeDeletedTotal} > {runtimeLoaded}.

# Test Data

All values read dynamically. Use placeholders: {runtimeScrollTop}, {runtimeLoaded}.

# Steps and Expected Results

1. Action: Scroll the container to a known position within the loaded content (e.g., 50% of scrollable range). Record ScrollTop.
   Expected Result: ScrollTop = {runtimeScrollTop}; the user is viewing content partway through the loaded rows.

2. Action: Trigger a continuation by scrolling to the sentinel boundary. Wait for the request to settle.
   Expected Result: New rows are appended below the previous last row.

3. Action: After the continuation settles, read the scroll position again.
   Expected Result: ScrollTop after append ≥ {runtimeScrollTop} (it should not drop to 0, nor significantly decrease). The viewport should not jump back to the top.

4. Action: Verify the visible content before and after the append — the rows that were in the viewport should remain visible or have scrolled naturally.
   Expected Result: No jarring repositioning; any scroll movement is incremental from the user's scrolling action, not a reset.

5. Action: Trigger a second continuation and repeat the scroll stability check.
   Expected Result: ScrollTop is again preserved (no reset) after the second continuation.

# Network Verification

Continuation requests fire and settle; the scroll position is sampled before and after each settlement.

# Expected Final Result

After each continuation, the scroll position does not reset to the top; ScrollTop is preserved relative to the append, and the viewport shifts smoothly.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode scroll positions.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending