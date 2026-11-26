---
test_id: "LIMAS-SUD-1596"
title: "Deleted Deletion Date filter returns the exact matching dataset and clears"
module: "Reports"
page: "Reports"
section: "Deleted Mode"
control: "Date filter Maintenance in Deleted"
action: "Deleted Deletion Date filter returns the exact matching dataset and clears"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Standard Licenses RSL-E"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "implemented"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-standard-licenses-mode-switching.spec.ts"
---

# Approved workflow baseline

Use deployed workflow and verify correct functional results (user confirmed 2026-11-26). Deleted reports load all pages and filter locally. Available filters are Email, Hardware IDs, Expiration Date, and Deletion Date.

# Scenario

Deleted Deletion Date filter returns the exact matching dataset and clears. Compare counts and displayed records against the complete runtime dataset. Skip only if the necessary records or valid dates are absent.

# Audit

Original plan: [preserved baseline](../../docs/execution-records/office-repair/plan-baselines/LIMAS-SUD-1596-rsl-e-date-filter-maintenance.md).
