---
test_id: "LIMAS-SUD-1711"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Deleted Infinite Scroll\" → \"Sequential Page Increment Across Continuations\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Deleted Infinite Scroll"
action: "Sequential Page Increment Across Continuations"
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

Trigger multiple continuation requests in sequence (e.g., 3 continuations) and verify page values are sequential with no gaps and no duplicates. Each response appends one batch (500 API records), and size remains 500 across all requests.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Deleted mode is activated, initial batch (page=0) has settled, and {runtimeDeletedTotal} is large enough to support at least 3 continuations.

# Test Data

All values read dynamically. Use placeholders: {runtimePage}, {runtimeSize}, {runtimeLoaded}.

# Steps and Expected Results

1. Action: Record the pages of observed continuation requests as scroll-to-sentinel is performed repeatedly (trigger continuation, wait for settle, then repeat).
   Expected Result: Observed page values in sequence: 0, 1, 2, 3 (or up to the number of triggered continuations).

2. Action: Verify there are no gaps in the page sequence.
   Expected Result: Every integer from 0 to N is represented exactly once; no page value is skipped.

3. Action: Verify there are no duplicate page values.
   Expected Result: Each page value appears in exactly one request.

4. Action: Verify size=500 is preserved in every request.
   Expected Result: Every continuation request includes size=500.

5. Action: Verify each response appends approximately one batch worth of API records (500 per response, though UI row count may be less per batch due to sub-aggregation).
   Expected Result: The total row count increases with each settled continuation.

# Network Verification

Observe all GET requests to the Deleted endpoint. Every request must have a unique, sequential page value starting from 0 with no gaps or duplicates, and size=500 throughout.

# Expected Final Result

Multiple continuation requests use sequential page values (0, 1, 2, …) with no gaps, no duplicates, size=500 preserved, and each response contributes additional data.

# Classification

- Read-only
- Positive
- API

# Restrictions

- Do not hardcode page numbers.
- Do not scroll beyond what is needed to observe sequential increments (3-4 continuations maximum).

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending