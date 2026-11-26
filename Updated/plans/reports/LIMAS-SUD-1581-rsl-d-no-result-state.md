---
test_id: "LIMAS-SUD-1581"
title: "No-result date: zero rows, explicit empty message, Clear restores records"
module: "Reports"
page: "Reports"
section: "No-Result State"
control: "No-Match Date"
action: "No-result date: zero rows, explicit empty message, Clear restores records"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Standard Licenses RSL-D"
test_type: "Negative"
automation_candidate: true
plan_status: "Reviewed"
script_status: "implemented"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-standard-licenses-date-filters.spec.ts"
---

# Approved workflow baseline

Use deployed workflow and verify correct functional results (user confirmed 2026-11-26).

# Scenario

No-result date: zero rows, explicit empty message, Clear restores records. Validate the result and restoration, without requiring hidden empty-table headers, a header row in an empty workbook, or Clear all for just one removable chip.

# Audit

Original plan: [preserved baseline](../../docs/execution-records/office-repair/plan-baselines/LIMAS-SUD-1581-rsl-d-no-result-state.md).
