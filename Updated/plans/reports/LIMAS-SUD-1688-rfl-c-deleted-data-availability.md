---
test_id: "LIMAS-SUD-1688"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Deleted View\" → \"Data Availability — Records, Export, and Filters\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Deleted View"
action: "Data Availability — Records, Export, and Filters"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Licenses RFL-C"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
execution_status: "Not Run"
ci_cd_execution: "Pending"
healing: "Pending"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-active-deleted.spec.ts"
---

# Purpose

Handle both populated and empty Deleted states dynamically. Verify totalElements > 0 or = 0, rows present only when > 0, Export enabled only when > 0, filters available regardless, counts match the API response, and table structure is present when rows exist.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Deleted mode is activated.

# Test Data

Read totalElements dynamically. Use placeholders: {runtimeDeletedTotal}.

# Steps and Expected Results

1. Action: Read the API response totalElements for the Deleted view.
   Expected Result: totalElements is a nonnegative integer ({runtimeDeletedTotal}).

2. Action: If {runtimeDeletedTotal} > 0, verify rows are rendered.
   Expected Result: At least one row is visible in the Deleted table.

3. Action: If {runtimeDeletedTotal} > 0, verify the Export Excel button is enabled.
   Expected Result: Export button is not disabled and has no aria-disabled attribute.

4. Action: If {runtimeDeletedTotal} = 0, verify no table rows are rendered.
   Expected Result: An empty-state message is displayed, Export is disabled.

5. Action: Verify filter controls are available regardless of record count.
   Expected Result: Filters button is visible and expandable. All six Floating Licenses filter controls are present.

6. Action: Verify toolbar counts match the API response.
   Expected Result: Toolbar total count equals {runtimeDeletedTotal}.

# Network Verification

Confirm the Deleted API response is received and its totalElements drives all conditional UI states.

# Expected Final Result

The Deleted view dynamically adapts: rows and Export enabled when records exist, empty-state and Export disabled when zero, filters always available, counts always consistent.

# Classification

- Read-only
- Positive
- Boundary

# Restrictions

- Do not hardcode the presence or absence of records.
- Do not assume a specific totalElements value.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending