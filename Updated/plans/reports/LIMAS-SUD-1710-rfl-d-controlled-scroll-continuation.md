---
test_id: "LIMAS-SUD-1710"
title: "Deleted scrolling renders the next cached batch with accurate counts"
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Deleted Infinite Scroll"
action: "Deleted scrolling renders the next cached batch with accurate counts"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Licenses RFL-D"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Implemented"
execution_status: "Not Run"
ci_cd_execution: "Pending"
healing: "Pending"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-deleted-infinite-scroll.spec.ts"
---

# Approved workflow baseline

Use deployed functional behavior (user confirmed 2026-11-26). Cached data need not trigger another HTTP request or a loading spinner. A recoverable error may show an error view; Retry must recover correct data and scrolling must expose remaining records.

# Scenario

Deleted scrolling renders the next cached batch with accurate counts. Check totals, row identity/order, and recovery. Never accept an unhandled error or inaccessible remaining data.

# Audit

Original plan: [preserved baseline](../../docs/execution-records/office-repair/plan-baselines/LIMAS-SUD-1710-rfl-d-controlled-scroll-continuation.md).
