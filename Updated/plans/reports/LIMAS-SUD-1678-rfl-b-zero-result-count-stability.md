---
test_id: "LIMAS-SUD-1678"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Counts\" → \"Zero-Result Filter Stability\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Counts"
action: "Zero-Result Filter Stability"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Licenses RFL-B"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-filters.spec.ts"
---

# Purpose

With 0 total records, verify that applying any filter keeps counts at 0 — record count and loaded/total remain consistent.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable. Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Active mode, 0 totalElements.

# Test Data

All counts read dynamically.

# Steps and Expected Results

1. Action: Apply Email filter and verify counts.
   Expected Result: Record count remains 0, loaded/total remains "0 loaded · 0 total".

2. Action: Apply Product Profile filter and verify counts.
   Expected Result: Counts still 0.

3. Action: Apply Expiration Date filter and verify counts.
   Expected Result: Counts still 0.

4. Action: Clear all and verify counts.
   Expected Result: Counts still 0, no stale Standard License count.

# Network Verification

No server requests triggered. Counts managed client-side.

# Expected Final Result

With zero data, all filter states show consistent zero counts without stale values.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode counts.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending