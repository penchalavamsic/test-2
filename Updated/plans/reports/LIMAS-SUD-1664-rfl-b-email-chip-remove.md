---
test_id: "LIMAS-SUD-1664"
title: "Single email chip removal and multiple-filter Clear all"
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Email Filter"
action: "Single email chip removal and multiple-filter Clear all"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Licenses RFL-B"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Implemented"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-filters.spec.ts"
---

# Approved workflow baseline

Use deployed workflow and verify correct functional results (user confirmed 2026-11-26).

# Scenario

Single email chip removal and multiple-filter Clear all. Validate the result and restoration, without requiring hidden empty-table headers, a header row in an empty workbook, or Clear all for just one removable chip.

# Audit

Original plan: [preserved baseline](../../docs/execution-records/office-repair/plan-baselines/LIMAS-SUD-1664-rfl-b-email-chip-remove.md).
