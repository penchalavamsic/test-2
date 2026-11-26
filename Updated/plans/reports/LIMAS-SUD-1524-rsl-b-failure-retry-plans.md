---
test_id: "LIMAS-SUD-1524"
title: "Next-page error is visible, Retry recovers data, and scrolling continues"
module: "Reports"
page: "Reports"
section: "Standard Licenses Infinite Scroll"
control: "Failure and Retry"
action: "Next-page error is visible, Retry recovers data, and scrolling continues"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Standard Licenses RSL-B"
test_type: "Negative"
automation_candidate: true
plan_status: "draft"
script_status: "implemented"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-standard-licenses-infinite-scroll.spec.ts"
---

# Approved workflow baseline

Use deployed functional behavior (user confirmed 2026-11-26). Cached data need not trigger another HTTP request or a loading spinner. A recoverable error may show an error view; Retry must recover correct data and scrolling must expose remaining records.

# Scenario

Next-page error is visible, Retry recovers data, and scrolling continues. Check totals, row identity/order, and recovery. Never accept an unhandled error or inaccessible remaining data.

# Audit

Original plan: [preserved baseline](../../docs/execution-records/office-repair/plan-baselines/LIMAS-SUD-1524-rsl-b-failure-retry-plans.md).
