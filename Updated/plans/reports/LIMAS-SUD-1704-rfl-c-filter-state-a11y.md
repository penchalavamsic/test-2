---
test_id: "LIMAS-SUD-1704"
title: "Deleted filter accessibility: labeled controls, removable date chip, keyboard Clear"
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Mode Control"
action: "Deleted filter accessibility: labeled controls, removable date chip, keyboard Clear"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
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

Deleted filter accessibility: labeled controls, removable date chip, keyboard Clear. Verify resulting data/counts and state restoration. Skip only when the complete dataset offers no available lookup record.

# Audit

Original plan: [preserved baseline](../../docs/execution-records/office-repair/plan-baselines/LIMAS-SUD-1704-rfl-c-filter-state-a11y.md).
