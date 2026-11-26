---
test_id: "LIMAS-SUD-1719"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Deleted Infinite Scroll\" → \"Scroll Region Accessibility\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Deleted Infinite Scroll"
action: "Scroll Region Accessibility"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
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

Verify the Deleted scroll region's accessibility: aria-label or accessible name on the scroll container, keyboard scrollability (arrow keys, Page Up/Down), loading announcement via aria-live region, aria-busy toggling during continuation, focus stability within the scrollable area, end-of-data communication, and visible focus indicator on the scroll container or rows.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Deleted mode is activated, initial batch (page=0) has settled, and {runtimeDeletedTotal} > {runtimeLoaded}.

# Test Data

All values read dynamically.

# Steps and Expected Results

1. Action: Inspect the scroll container's accessible name or label.
   Expected Result: The scroll container has an aria-label or equivalent accessible name (e.g., "Deleted floating licenses table" or similar).

2. Action: Inspect the scroll container's ARIA role.
   Expected Result: The container has an appropriate role for a scrollable region (or inherits the semantics from its parent region).

3. Action: Focus the scroll container and test keyboard scrolling: Arrow Down, Arrow Up, Page Down, Page Up.
   Expected Result: The container responds to keyboard scroll commands; content scrolls with each key press.

4. Action: Verify the presence of an aria-live region that announces loading state changes.
   Expected Result: An aria-live="polite" region exists and announces "loading" or count updates during continuation.

5. Action: If aria-busy is present on the scroll region, verify it is set during continuation and cleared afterward.
   Expected Result: aria-busy="true" while loading, aria-busy="false" after settle.

6. Action: During a continuation, verify focus does not jump unexpectedly.
   Expected Result: The active element remains stable; no focus shift to the loading indicator or newly appended rows.

7. Action: Verify how end-of-data is communicated to assistive technology.
   Expected Result: When no more data is available (or at the last page), some indicator (sentinel removal, aria-live announcement, or similar) is present.

8. Action: Verify visible focus indicator on interactive elements within the scroll region (rows if interactive, or the container itself).
   Expected Result: When focused, a visible focus ring or outline is present on the focused element.

# Network Verification

Observe the continuation request; verify aria-live announcements coincide with the loading lifecycle.

# Expected Final Result

The scroll region has an accessible name, supports keyboard scrolling, announces loading via aria-live, toggles aria-busy if present, preserves focus during load, communicates end-of-data, and shows a visible focus indicator.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not hardcode aria-labels or role values.
- Do not assume specific keyboard behavior beyond standard scroll container expectations.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending