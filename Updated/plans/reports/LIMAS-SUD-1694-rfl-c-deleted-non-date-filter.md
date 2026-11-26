---
test_id: "LIMAS-SUD-1694"
title: "Deleted hardware filter returns exact matching records and Clear restores the full dataset"
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Deleted View"
action: "Deleted hardware filter returns exact matching records and Clear restores the full dataset"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Licenses RFL-C"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Implemented"
execution_status: "Not Run"
ci_cd_execution: "Pending"
healing: "Pending"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-active-deleted.spec.ts"
---

# Approved workflow baseline

Use deployed functional behavior (user confirmed 2026-11-26). Deleted Floating filters are Hardware IDs, Expiration Date and Deletion Date; no assumed Email, Profile, or Role filter.

# Scenario

Deleted hardware filter returns exact matching records and Clear restores the full dataset. Verify resulting data/counts and state restoration. Skip only when the complete dataset offers no available lookup record.

# Audit

Original plan: [preserved baseline](../../docs/execution-records/office-repair/plan-baselines/LIMAS-SUD-1694-rfl-c-deleted-non-date-filter.md).
