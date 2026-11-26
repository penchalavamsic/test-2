---
test_id: "LIMAS-SUD-1541"
title: "Hardware IDs API contract \u00e2\u20ac\u201d POST, hardwareId JSON array, page/size params"
module: "Reports"
page: "Reports"
section: "Hardware IDs"
control: "API Contract"
action: "Hardware IDs API contract \u00e2\u20ac\u201d POST, hardwareId JSON array, page/size params"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Standard Licenses RSL-C"
test_type: "Network"
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

Select runtime hardware IDs using checkbox options. Verify the filter request contains the exact selected hardwareIdString values and page zero. For single/multiple selection, also verify matching displayed records and restoration after Clear.

# Audit

Original plan: [preserved baseline](../../docs/execution-records/office-repair/plan-baselines/LIMAS-SUD-1541-rsl-c-hardware-ids-api-contract.md).
