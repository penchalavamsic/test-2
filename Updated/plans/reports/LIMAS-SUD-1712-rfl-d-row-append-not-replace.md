---
test_id: "LIMAS-SUD-1712"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Deleted Infinite Scroll\" → \"Row Append — Existing Rows Preserved\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Deleted Infinite Scroll"
action: "Row Append — Existing Rows Preserved"
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

After a scroll-triggered continuation appends new rows, verify: existing rows remain in the table with the same content fingerprint, new rows appear below existing rows, total row count equals originally loaded + newly appended, no rows disappear, and DOM order matches append order.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Deleted mode is activated, initial batch (page=0) has settled, and {runtimeDeletedTotal} > {runtimeLoaded}.

# Test Data

All values read dynamically. Use placeholders: {runtimeLoaded}, {runtimeRowCount}.

# Steps and Expected Results

1. Action: Capture the content fingerprint of the first row (e.g., text content, Profile, Role, Email, Hardware ID) before any continuation.
   Expected Result: A unique fingerprint is recorded for the first row.

2. Action: Capture the content fingerprint of the last row before continuation.
   Expected Result: A unique fingerprint is recorded for the last currently loaded row.

3. Action: Trigger a continuation by scrolling to the sentinel boundary. Wait for the request to settle.
   Expected Result: New data is appended.

4. Action: Verify the first row's content fingerprint is unchanged.
   Expected Result: The first row before continuation is identical to the first row after continuation (same Profile, Role, Email, Hardware ID).

5. Action: Verify the row that was previously last is still present, now no longer the last row.
   Expected Result: The previous last row fingerprint is found above the newly appended rows.

6. Action: Verify new rows appear below all previously existing rows.
   Expected Result: The DOM order has all original rows first, followed by the new rows from the continuation — in append order.

7. Action: Verify total row count equals the sum of original + newly visible rows.
   Expected Result: rowCountAfter = rowCountBefore + newRowsAppended, and no original rows are missing.

# Network Verification

Observe the continuation GET request (page=1&size=500) and confirm rows are appended after it settles.

# Expected Final Result

Continuation appends new rows below existing ones; first-row fingerprint is unchanged, previous last row is preserved in its original position, row count matches, and DOM order reflects append order.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode row content for fingerprinting — compute dynamically.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending