---
test_id: "LIMAS-SUD-1654"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"API\" → \"Pagination Mechanism\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "API"
action: "Pagination Mechanism"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Licenses RFL-A"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-shell.spec.ts"
---

# Purpose

Identify the pagination mechanism: page/size query parameters, totalPages, last/first flags, and the relationship between loaded and total.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected on the Reports page.

# Test Data

All values read dynamically.

# Steps and Expected Results

1. Action: Capture the initial API response.
   Expected Result: Response contains pageable with pageNumber, pageSize; and metadata with totalElements, totalPages, size, number, first, last, numberOfElements.

2. Action: Verify first=true and last=true when totalElements ≤ size.
   Expected Result: both first and last flags are consistent with the data volume.

3. Action: Verify the "loaded" UI count matches numberOfElements and "total" matches totalElements.
   Expected Result: UI counts are consistent with API metadata.

# Network Verification

Correlate UI counts with API response fields.

# Expected Final Result

Pagination uses page/size query params with Spring Page metadata; loaded and total UI counts match API response.

# Classification

- Read-only
- Positive
- API

# Restrictions

- Do not hardcode page, size, or count values.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending