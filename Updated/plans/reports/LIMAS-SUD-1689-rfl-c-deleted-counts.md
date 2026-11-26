---
test_id: "LIMAS-SUD-1689"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Deleted View\" → \"Counts — Toolbar, Loaded, Total, and Rendered Rows\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Deleted View"
action: "Counts — Toolbar, Loaded, Total, and Rendered Rows"
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

Verify the Deleted view's toolbar count, loaded count, total count, and rendered row count. Ensure loaded ≤ total, no Active count contamination, and counts update after the Deleted API request settles.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Deleted mode is activated.

# Test Data

Use placeholders: {runtimeDeletedTotal}, {runtimeLoadedCount}, {runtimeRowCount}.

# Steps and Expected Results

1. Action: Wait for the Deleted API request to settle, then read the toolbar record count.
   Expected Result: Toolbar shows a nonnegative count for Deleted records ({runtimeDeletedTotal}).

2. Action: Read the "loaded · total" display.
   Expected Result: Display format is "{runtimeLoadedCount} · {runtimeDeletedTotal}" where {runtimeLoadedCount} ≤ {runtimeDeletedTotal}.

3. Action: Count the rendered rows in the Deleted table.
   Expected Result: Number of rendered rows ({runtimeRowCount}) matches {runtimeLoadedCount}.

4. Action: Switch back to Active mode and verify the Active count is independent.
   Expected Result: Active count reflects its own totalElements — no Deleted count contamination.

5. Action: Switch to Deleted again and verify counts are still consistent.
   Expected Result: Counts match the Deleted API response after the request settles.

# Network Verification

Verify the Deleted API response provides totalElements, and the loaded count reflects numberOfElements from the response.

# Expected Final Result

Deleted toolbar, loaded, total, and rendered row counts are internally consistent, loaded ≤ total, no cross-mode count contamination, and counts update after each request settles.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode counts.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending