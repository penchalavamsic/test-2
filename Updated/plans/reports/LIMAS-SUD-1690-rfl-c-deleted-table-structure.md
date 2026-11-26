---
test_id: "LIMAS-SUD-1690"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Deleted View\" → \"Table Structure — Headers, Sub-Fields, and Layout\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Deleted View"
action: "Table Structure — Headers, Sub-Fields, and Layout"
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

Verify the Deleted view table structure when records are present: column headers (Profile, Role, Email, Hardware ID, Details), Details sub-fields (Feature, Exp, Created, Deleted), row count consistency with loaded count, scroll container presence, and text wrapping/alignment.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Deleted mode is activated, and {runtimeDeletedTotal} > 0 (or skip if zero — document the dynamic condition).

# Test Data

Use placeholders: {runtimeRowCount}, {runtimeProfile}, {runtimeRole}.

# Steps and Expected Results

1. Action: If {runtimeDeletedTotal} = 0, document the skip and verify empty-state instead. Otherwise, inspect column headers.
   Expected Result: Column headers present: Profile, Role, Email, Hardware ID, Details.

2. Action: Inspect the Details column content in one row.
   Expected Result: Details column contains sub-fields: Feature, Exp (Expiration), Created (License Created Date), Deleted (Deletion Date).

3. Action: Count rendered rows.
   Expected Result: Row count equals {runtimeLoadedCount}.

4. Action: Verify the scroll container exists.
   Expected Result: A scrollable container is present wrapping the table body.

5. Action: Verify text wrapping and alignment in data cells.
   Expected Result: Text does not overflow cells; alignment is consistent across rows.

# Network Verification

No additional network verification beyond the standard Deleted API request.

# Expected Final Result

The Deleted table has correct headers, Details sub-fields, consistent row count, a scroll container, and proper text rendering.

# Classification

- Read-only
- Positive
- Visual

# Restrictions

- Do not hardcode column header text or sub-field labels.
- Document the dynamic skip if no records exist.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending