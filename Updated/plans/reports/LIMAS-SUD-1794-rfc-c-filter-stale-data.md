---
test_id: "LIMAS-SUD-1794"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Deleted Mode\" → \"Filter Stale Data Prevention\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Deleted Mode"
action: "Filter Stale Data Prevention"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Floating Configurations RFC-C"
test_type: "Negative"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-deleted.spec.ts"
---

# Purpose

Verify that rapid filter → clear → filter cycles do not leave stale counts from a prior filter, and that the current filter state is always accurately reflected in the displayed counts and visible rows.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Deleted mode has been selected and fully loaded.

# Test Data

Filter values are chosen from the loaded dataset at runtime.

# Steps and Expected Results

1. Action: Apply Filter A (e.g., "Deleted By" with value V1). Record count.
   Expected Result: Row count = {runtimeCountA}. Counts match visible rows.

2. Action: Click Clear. Verify counts restore to full dataset.
   Expected Result: Row count = {runtimeTotalElements}. All data restored.

3. Action: Apply Filter B (e.g., "Group Name" with value V2). Record count.
   Expected Result: Row count = {runtimeCountB}. Counts match visible rows. No stale data from Filter A.

4. Action: Rapidly type, clear, and type a new filter value. Verify after each change.
   Expected Result: At every step, the displayed record count and loaded/total match the currently visible rows. No stale counts from any previous filter state.

5. Action: Verify the final state is consistent.
   Expected Result: The final filter produces the correct count. Clearing after restores the full dataset cleanly.

# Network Verification

- No API requests during filter cycles (client-side).

# Expected Final Result

Rapid filter cycles never show stale counts; the current filter state is always accurately reflected in the UI.

# Classification

- Read-only
- Negative

# Restrictions

- Do not hardcode filter values or row counts. Read dynamically at runtime.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending