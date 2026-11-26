---
test_id: "LIMAS-SUD-1623"
title: "Zero-result export: valid empty workbook or disabled download"
module: "Reports"
page: "Reports"
section: "Active View Toolbar"
control: "Export Excel Button"
action: "Zero-result export: valid empty workbook or disabled download"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Standard Licenses RSL-F"
test_type: "Boundary"
automation_candidate: true
plan_status: "Reviewed"
script_status: "implemented"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-standard-licenses-export.spec.ts"
automation_disposition: "Skipped - manual verification required"
manual_verification_status: "Pending; user decision 2026-11-26"
---

# Approved workflow baseline

Use deployed workflow and verify correct functional results (user confirmed 2026-11-26).

# Scenario

Zero-result export: valid empty workbook or disabled download. Validate the result and restoration, without requiring hidden empty-table headers, a header row in an empty workbook, or Clear all for just one removable chip.

# Audit

Original plan: [preserved baseline](../../docs/execution-records/office-repair/plan-baselines/LIMAS-SUD-1623-rsl-f-zero-result-export.md).
