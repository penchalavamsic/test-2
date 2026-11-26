---
test_id: "LIMAS-SUD-1791"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Deleted Mode\" → \"Filtered Counts Relationship\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Deleted Mode"
action: "Filtered Counts Relationship"
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

Verify that when filtering is active in Deleted mode, the loaded count equals the total count (since all matching data is in memory client-side), and after Clear the full counts are restored with loaded ≤ total.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Deleted mode has been selected and fully loaded.

# Test Data

Filter values are chosen from the loaded dataset at runtime.

# Steps and Expected Results

1. Action: Observe the initial unfiltered counts.
   Expected Result: The loaded/total display shows "{runtimeLoaded} loaded · {runtimeTotalElements} total". Verify loaded ≤ total.

2. Action: Apply a filter (e.g., "Deleted By") with a value from the dataset.
   Expected Result: The loaded/total display updates. Verify that the loaded count equals the total count in the filtered state: loaded === total.

3. Action: Apply a second filter ("Group Name") while keeping the first.
   Expected Result: The loaded/total display updates again. Verify loaded === total in the combined filtered state.

4. Action: Click Clear to remove all filters.
   Expected Result: The counts return to "{runtimeLoaded} loaded · {runtimeTotalElements} total". Verify loaded ≤ total.

5. Action: Confirm the invariant across all states.
   Expected Result: In every state (unfiltered, single-filtered, combined, cleared), loaded ≤ total holds true.

# Network Verification

- Initial data-fetch GET requests are the only API calls expected.
- No requests during filter operations (client-side).

# Expected Final Result

In filtered states, loaded === total (all matching data in memory). In unfiltered state, loaded ≤ total. The invariant loaded ≤ total holds in all states.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode filter values or count numbers. Read dynamically at runtime.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending