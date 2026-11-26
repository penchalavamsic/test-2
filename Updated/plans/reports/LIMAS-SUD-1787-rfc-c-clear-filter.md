---
test_id: "LIMAS-SUD-1787"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Deleted Mode\" → \"Clear Filter\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Deleted Mode"
action: "Clear Filter"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Configurations RFC-C"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Implemented"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-deleted.spec.ts"
---

# Approved behavior baseline

On 26 November 2026, the user selected: "Use the deployed workflow and verify correct functional results." Explicit requirements, including email display and real CRUD persistence, remain enforced.

# Purpose

Verify filtering and Clear restore the correct functional state using the deployed workflow.

# Preconditions

- Use the configured deployed URL and authenticated access profile.
- Use runtime records; skip only when required data is genuinely absent.

# Steps and expected results

1. Capture the unfiltered runtime total and currently rendered rows.
2. Apply the filter or filter combination described by this case using runtime data. Verify the intended filtered state.
3. Clear the individual date or use the panel Clear action, as appropriate to this case.
4. Verify cleared inputs and removed filter state; where Profile selection is cleared, verify Profile Role is disabled.
5. Require the original total to be restored. Require displayed row count to match rendered rows and not exceed the total. A different pagination window does not imply missing records.

# Implementation details

A fresh request is not required when the deployed app restores valid cached data. Rendered page size may differ from the complete dataset size. Verify the functional result rather than requiring the former assumed transport or pagination behavior.

# Audit history

The prior plan is preserved in docs/execution-records/office-repair/plan-baselines/LIMAS-SUD-1787-rfc-c-clear-filter.md. Historical run evidence is unchanged. CI/CD execution remains pending; local results are recorded separately.
