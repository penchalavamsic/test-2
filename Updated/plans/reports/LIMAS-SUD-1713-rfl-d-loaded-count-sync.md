---
test_id: "LIMAS-SUD-1713"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Deleted Infinite Scroll\" → \"Loaded Count Synchronization\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Deleted Infinite Scroll"
action: "Loaded Count Synchronization"
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

After each scroll-triggered continuation, verify that the loaded count increments, the "loaded · total" display format updates, loaded never exceeds totalElements, the rendered row count matches the loaded count, and the toolbar total count matches the API totalElements.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Deleted mode is activated, initial batch (page=0) has settled, and {runtimeDeletedTotal} > {runtimeLoaded}.

# Test Data

All values read dynamically. Use placeholders: {runtimeDeletedTotal}, {runtimeLoaded}, {runtimeRowCount}.

# Steps and Expected Results

1. Action: Record the initial "loaded · total" display after the first batch settles.
   Expected Result: Display shows "{runtimeLoaded} · {runtimeDeletedTotal}" where {runtimeLoaded} ≤ {runtimeDeletedTotal}.

2. Action: Trigger a continuation (scroll to sentinel, wait for settle). Read the updated loaded count.
   Expected Result: The loaded count has increased (loadedAfter > loadedBefore) and still ≤ {runtimeDeletedTotal}.

3. Action: Verify the "loaded · total" text format is preserved after the update.
   Expected Result: Format is consistently "{loaded} · {total}" after the update.

4. Action: Count the rendered rows and compare to the loaded count.
   Expected Result: The number of rendered rows matches the displayed loaded count.

5. Action: Verify the toolbar total count remains constant and equals {runtimeDeletedTotal}.
   Expected Result: Total count does not change; it stays at {runtimeDeletedTotal}.

6. Action: Trigger a second continuation and repeat the verifications.
   Expected Result: Loaded count increments again, format stays consistent, row count matches, total unchanged, loaded ≤ total.

7. Action: Verify loaded count never exceeds totalElements at any point.
   Expected Result: At every checkpoint, loaded ≤ {runtimeDeletedTotal}.

# Network Verification

Continuation requests fire and settle; loaded count updates only after the response is received, not mid-request.

# Expected Final Result

Loaded count increments correctly after each continuation, format stays "loaded · total", loaded ≤ total always, row count matches loaded, and toolbar total is constant.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode counts.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending