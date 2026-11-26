---
test_id: "LIMAS-SUD-1703"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Deleted View\" → \"Accessibility — Table Headers, Rows, Cells, and Empty State\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Deleted View"
action: "Accessibility — Table Headers, Rows, Cells, and Empty State"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
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

Verify the Deleted table accessibility: column headers are properly associated with data cells (columnheader role + row associations), rows have appropriate row semantics, cell content is accessible, Details column sub-field content is accessible, and empty-state announcement is communicated when {runtimeDeletedTotal} = 0.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Deleted mode is activated.

# Test Data

All values dynamic. Handle both populated and empty states.

# Steps and Expected Results

1. Action: Inspect the table header row for columnheader roles.
   Expected Result: Header cells have role="columnheader" and are associated with data cells via scope or headers attributes.

2. Action: Inspect a data row for row semantics.
   Expected Result: Rows have role="row". Data cells have role="cell".

3. Action: Inspect cell content accessibility.
   Expected Result: Text content within cells is exposed to assistive technology (no hidden or aria-hidden content).

4. Action: Inspect the Details column for sub-field accessibility.
   Expected Result: Sub-fields (Feature, Exp, Created, Deleted) within the Details column are exposed as readable text or structured content.

5. Action: If {runtimeDeletedTotal} > 0, verify row count is communicated.
   Expected Result: The number of visible rows is consistent and the table structure is complete.

6. Action: If {runtimeDeletedTotal} = 0, verify empty-state announcement.
   Expected Result: An accessible empty-state message is communicated (e.g., via role="status" or aria-live region).

# Network Verification

No API verification specific to accessibility.

# Expected Final Result

Deleted table has proper header-cell associations, row/column semantics, accessible cell and Details content, and communicates empty state accessibly when no records exist.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not hardcode column names or row counts.
- Handle both populated and empty states dynamically.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending