---
test_id: "LIMAS-SUD-1542"
title: "Unknown hardware lookup cannot select an invalid ID or alter report data"
module: "Reports"
page: "Reports"
section: "Hardware IDs"
control: "No-Match"
action: "Unknown hardware lookup cannot select an invalid ID or alter report data"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Standard Licenses RSL-C"
test_type: "Negative"
automation_candidate: true
plan_status: "Reviewed"
script_status: "implemented"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-standard-licenses-core-filters.spec.ts"
---

# Approved workflow baseline

Use the deployed workflow and verify correct functional results, as confirmed by the user on 2026-11-26.

# Steps and expected result

Search an unavailable hardware ID; confirm successful lookup, no selectable match, and Enter does not replace report data. Clear and verify the original total.

# Audit

Original plan: [preserved baseline](../../docs/execution-records/office-repair/plan-baselines/LIMAS-SUD-1542-rsl-c-hardware-ids-no-match.md).
