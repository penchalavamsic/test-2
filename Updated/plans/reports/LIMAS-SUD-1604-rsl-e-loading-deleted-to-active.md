---
test_id: "LIMAS-SUD-1604"
title: "Cached Active report stays correct during refresh and settles with valid data"
module: "Reports"
page: "Reports"
section: "Deleted Mode"
control: "Loading indicator — Deleted-to-Active"
action: "Cached Active report stays correct during refresh and settles with valid data"
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

Use deployed functional behavior (user confirmed 2026-11-26). Cached data need not trigger another HTTP request or a loading spinner. A recoverable error may show an error view; Retry must recover correct data and scrolling must expose remaining records.

# Scenario

Cached Active report stays correct during refresh and settles with valid data. Check totals, row identity/order, and recovery. Never accept an unhandled error or inaccessible remaining data.

# Audit

Original plan: [preserved baseline](../../docs/execution-records/office-repair/plan-baselines/LIMAS-SUD-1604-rsl-e-loading-deleted-to-active.md).
