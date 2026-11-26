---
test_id: "LIMAS-SUD-1788"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Deleted Mode\" → \"Combined Filtering\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Deleted Mode"
action: "Combined Filtering"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Floating Configurations RFC-C"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-deleted.spec.ts"
---

# Purpose

Verify that filling multiple filter fields simultaneously ("Deleted By" and "Group Name") applies both filters client-side, and that the resulting row count is less than or equal to the row count from either single-filter application.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Deleted mode has been selected and fully loaded.
- The Filters panel is open.

# Test Data

Two filter values from the loaded dataset are chosen at runtime: one from Deleted By and one from Group Name, each known to have some matching rows.

# Steps and Expected Results

1. Action: Fill only the "Deleted By" textbox. Record the row count.
   Expected Result: Row count = {runtimeDeletedByCount}, less than the full dataset.

2. Action: While "Deleted By" still has a value, fill the "Group Name" textbox with a value from the dataset.
   Expected Result: The row count updates to {runtimeCombinedCount}, which is ≤ {runtimeDeletedByCount}.

3. Action: Verify no API requests fire during combined filter input.
   Expected Result: Filtering remains client-side. No new network requests.

4. Action: Verify counts are consistent.
   Expected Result: The loaded and total counts in the combined filtered state match each other (loaded === total, client-side).

5. Action: Clear all filters after verification.
   Expected Result: Full dataset restored.

# Network Verification

- No API requests fire during filter input or combined filter changes.
- Only initial alldeleted GET requests are observed.

# Expected Final Result

Combined "Deleted By" + "Group Name" filtering narrows results client-side, with combined row count ≤ single-filter row count.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode filter values or row counts. Read dynamically at runtime.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending