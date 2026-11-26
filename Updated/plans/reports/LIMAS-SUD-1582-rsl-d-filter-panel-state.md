---
test_id: "LIMAS-SUD-1582"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Filter Panel State\" → \"Filters stay expanded after date request, date persists in input, collapse preserves date on re-expand, Clear restores, no focus jump\""
module: "Reports"
page: "Reports"
section: "Filter Panel State"
control: "Focus and Expand"
action: "Filters stay expanded after date request, date value persists in input, collapse with active date filter preserves date on re-expand, Clear restores empty inputs, no unexpected focus jump to table"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Standard Licenses RSL-D"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "not-generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that after a date filter request, the filter panel remains expanded, the date value persists in the input, collapsing the panel with an active date filter preserves the date when re-expanded, Clear restores empty inputs, and focus does not unexpectedly jump to the table.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected, the filter panel is expanded, and the Active tab is selected.

# Test Data

Use `{runtimeCurrentDate}` as the date value. Monitor focus behavior on elements.

# Steps and Expected Results

1. Action: Apply Expiration Date with `{runtimeCurrentDate}` and wait for the filtered response.
   Expected Result: Filtered results loaded; filter panel is still expanded.

2. Action: Assert the filter panel is in the expanded state (controls are visible).
   Expected Result: Panel remains open after the date request.

3. Action: Assert the Expiration Date input still displays `{runtimeCurrentDate}`.
   Expected Result: Date value persists in the input after the request.

4. Action: Collapse the filter panel (click the toggle or collapse control).
   Expected Result: Panel collapses; filter controls are no longer visible.

5. Action: Re-expand the filter panel.
   Expected Result: Panel expands; the Expiration Date input still displays `{runtimeCurrentDate}` and the chip is visible.

6. Action: Assert focus did not unexpectedly jump to the table after the date request.
   Expected Result: Focus remains on or near the date input or the last interacted element.

7. Action: Click Clear and assert all date inputs are empty and the panel remains expanded.
   Expected Result: Clear restores empty inputs; panel stays expanded.

# Network Verification

- Date filter POST fires; no focus-stealing patterns.
- Panel state is independent of network requests.

# Expected Final Result

The filter panel remains expanded after date requests, the date value persists through collapse/expand cycles, Clear restores empty inputs, and focus does not jump unexpectedly.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode dates.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending