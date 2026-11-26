---
test_id: "LIMAS-SUD-1710"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Deleted Infinite Scroll\" → \"Single Controlled Scroll Continuation\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Deleted Infinite Scroll"
action: "Single Controlled Scroll Continuation"
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

Trigger exactly one continuation by scrolling to the sentinel boundary, then verify: page increments from 0 to 1, size remains 500, row count increases, existing rows are preserved, and toolbar counts update.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Deleted mode is activated, initial batch (page=0) has settled, and {runtimeDeletedTotal} > {runtimeLoaded}.

# Test Data

All values read dynamically. Use placeholders: {runtimePage}, {runtimeSize}, {runtimeLoaded}, {runtimeSentinelHeight}.

# Steps and Expected Results

1. Action: Capture the page value from the initial request (page=0). Record the initial row count.
   Expected Result: Initial page is 0. Initial row count is recorded as {runtimeLoadedBefore}.

2. Action: Scroll the container so the sentinel enters the viewport (scrollTop reaches approximately scrollHeight - clientHeight - {runtimeSentinelHeight}).
   Expected Result: A new GET request fires to the Deleted endpoint with page={runtimePage + 1}.

3. Action: Inspect the continuation request query parameters.
   Expected Result: Request includes page=1 and size=500 (unchanged size).

4. Action: Wait for the continuation request to settle, then count the total rendered rows.
   Expected Result: Row count has increased beyond {runtimeLoadedBefore}.

5. Action: Verify existing rows from the first batch are still present.
   Expected Result: The first row fingerprint from the initial batch is unchanged; rows are not replaced.

6. Action: Verify toolbar loaded and total counts have updated.
   Expected Result: Loaded count has increased; total count remains equal to {runtimeDeletedTotal}.

# Network Verification

- Initial request: GET allfloatingdeleted?page=0&size=500
- Continuation request: GET allfloatingdeleted?page=1&size=500
- Exactly two requests observed, each with HTTP 200

# Expected Final Result

One controlled scroll to the sentinel triggers exactly one continuation with page=1&size=500, row count increases, existing rows are preserved, and toolbar counts update.

# Classification

- Read-only
- Positive

# Restrictions

- Trigger exactly one continuation; do not scroll further.
- Do not hardcode page numbers beyond the dynamic pattern.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending