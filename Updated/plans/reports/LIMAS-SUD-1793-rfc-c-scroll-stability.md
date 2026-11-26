---
test_id: "LIMAS-SUD-1793"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Deleted Mode\" → \"Scroll Stability After Filter\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Deleted Mode"
action: "Scroll Stability After Filter"
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

Verify that after applying a filter and then clearing it, the scroll position remains stable, the table scrolls correctly with the loaded data, and the UI does not reset to the top on filter clear unless data change triggers it.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Deleted mode has been selected and fully loaded.
- The table has enough rows to require scrolling.

# Test Data

Filter values are chosen from the loaded dataset at runtime.

# Steps and Expected Results

1. Action: Scroll the table to a known scroll position (e.g., middle of the loaded data).
   Expected Result: The table scroll position is at {runtimeScrollPosition}.

2. Action: Apply a filter (e.g., "Deleted By").
   Expected Result: The table content updates to show filtered results. The scroll position may adjust to accommodate the reduced dataset.

3. Action: Scroll within the filtered results.
   Expected Result: The table scrolls correctly through the filtered rows.

4. Action: Click Clear to remove the filter.
   Expected Result: The full dataset is restored. The table is scrollable and the scroll behavior is functional.

5. Action: Verify the table remains scrollable and functional throughout.
   Expected Result: No scroll lock, no jump to unexpected positions, no rendering artifacts. Scroll operates correctly in all states.

# Network Verification

- Only the initial alldeleted GET requests are expected.
- No additional requests during scroll or filter operations.

# Expected Final Result

The table scrolls correctly through filtered and unfiltered data, and the scroll mechanism remains stable across filter/clear cycles.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode scroll positions or filter values. Read dynamically at runtime.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending