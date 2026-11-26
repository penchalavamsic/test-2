---
test_id: "LIMAS-SUD-1614"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Active View Toolbar\" → \"Export Excel Button\" → \"Export request contract (HTTP method, endpoint, Content-Type, Content-Disposition, status, download count)\""
module: "Reports"
page: "Reports"
section: "Active View Toolbar"
control: "Export Excel Button"
action: "Export request contract (HTTP method, endpoint, Content-Type, Content-Disposition, status, download count)"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Standard Licenses RSL-F"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "implemented"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-standard-licenses-export.spec.ts"
automation_disposition: "Skipped - manual verification required"
manual_verification_status: "Pending; user decision 2026-11-26"
---

# Approved behavior baseline

On 26 November 2026, the user selected: "Use the deployed workflow and verify correct functional results." Explicit requirements, including email display and real CRUD persistence, remain enforced.

# Purpose

Verify the deployed Standard export fetches JSON successfully and creates a valid workbook containing all expected runtime records.

# Preconditions

- Use the configured deployed URL and authenticated access profile.
- Use runtime records; skip only when required data is genuinely absent.

# Steps and expected results

1. Capture the unfiltered runtime total.
2. Trigger Export Excel and observe the actual JSON data request. Require successful GET/JSON response.
3. Capture the download and open the workbook. Require valid workbook headers, no HTML error page, and an exact runtime data-row count.
4. Remove temporary exported files after verification.

# Implementation details

A fresh request is not required when the deployed app restores valid cached data. Rendered page size may differ from the complete dataset size. Verify the functional result rather than requiring the former assumed transport or pagination behavior.

# Audit history

The prior plan is preserved in docs/execution-records/office-repair/plan-baselines/LIMAS-SUD-1614-rsl-f-export-request-contract.md. Historical run evidence is unchanged. CI/CD execution remains pending; local results are recorded separately.
