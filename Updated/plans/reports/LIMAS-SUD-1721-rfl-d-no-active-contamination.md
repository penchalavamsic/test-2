---
test_id: "LIMAS-SUD-1721"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Deleted Infinite Scroll\" → \"No Active, Standard, or Configurations Contamination\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Deleted Infinite Scroll"
action: "No Active, Standard, or Configurations Contamination"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Licenses RFL-D"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
execution_status: "Not Run"
ci_cd_execution: "Pending"
healing: "Pending"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-deleted-infinite-scroll.spec.ts"
---

# Purpose

Throughout Deleted infinite scroll, verify that no Active Floating License rows appear (Active uses a different endpoint allfloatinglicenses), no Standard License rows appear, no Floating Configurations rows appear, the table only contains Deleted Floating License data, and the Deleted table headers (Profile, Role, Email, Hardware ID, Details) match the Deleted schema.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Deleted mode is activated, initial batch (page=0) has settled, and {runtimeDeletedTotal} > {runtimeLoaded}.

# Test Data

All values read dynamically. Use placeholders: {runtimeLoaded}, {runtimeProfile}, {runtimeRole}.

# Steps and Expected Results

1. Action: Inspect the column headers in the Deleted table.
   Expected Result: Headers are Profile, Role, Email, Hardware ID, Details — matching the Deleted Floating License schema. No Active-specific column (e.g., Status, Checked Out Date) is present.

2. Action: Sample row content from the initial batch — verify the Details column includes sub-fields consistent with deleted records (Feature, Exp, Created, Deleted).
   Expected Result: The Details column contains Deletion Date as a sub-field, confirming these are deleted records.

3. Action: Verify no row in the initial batch contains data that would indicate an Active license (e.g., a "Checked Out" status or an expiration date in a future-oriented format inconsistent with deleted records).
   Expected Result: All rows represent deleted floating licenses.

4. Action: Verify no Standard License rows are present — the table does not intermix data from the Standard Licenses section.
   Expected Result: The row structure, headers, and content are exclusively Floating License Deleted data.

5. Action: Verify no Floating Configurations rows appear.
   Expected Result: The data is from the Floating Licenses → Deleted scope only.

6. Action: Trigger a continuation (scroll to sentinel, wait for settle). Verify the newly appended rows are also exclusively Deleted Floating License records.
   Expected Result: New rows have the same Deleted schema — Profile, Role, Email, Hardware ID, Details with Deletion Date.

7. Action: Verify the API requests throughout the session are to the Deleted endpoint only — no Active endpoint (allfloatinglicenses) is called.
   Expected Result: All observed GET requests target the Deleted floating licenses API endpoint.

# Network Verification

All observed requests go to the Deleted endpoint. No request to the Active (allfloatinglicenses) endpoint is observed. No requests to Standard Licenses or Floating Configurations endpoints.

# Expected Final Result

The Deleted infinite scroll table contains only Deleted Floating License data with correct headers (Profile, Role, Email, Hardware ID, Details), no Active/Standard/Configurations contamination, and only the Deleted endpoint is called.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode column headers beyond the schema reference.
- Do not hardcode row content or endpoint paths.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending