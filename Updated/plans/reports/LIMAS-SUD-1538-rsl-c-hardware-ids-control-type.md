---
test_id: "LIMAS-SUD-1538"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Hardware IDs\" → \"Control Type: searchbox input with focus and keyboard interaction\""
module: "Reports"
page: "Reports"
section: "Hardware IDs"
control: "Control Type"
action: "Searchbox input, focus and keyboard interaction"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Standard Licenses RSL-C"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "not-generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that the Hardware IDs filter control is a searchbox-type input that receives focus on click and Tab, shows a visible focus indicator, and accepts keyboard input.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected and the filter panel is expanded.

# Test Data

Use `{runtimeHardwareId}` as a placeholder value for input testing.

# Steps and Expected Results

1. Action: Locate the Hardware IDs input by its accessible name and click it.
   Expected Result: The Hardware IDs input receives focus and shows a visible focus indicator.

2. Action: Verify the input type is a text-based input (text or search).
   Expected Result: Input is a searchbox, not another widget type.

3. Action: Type `{runtimeHardwareId}` and verify the input value updates.
   Expected Result: The input reflects the typed characters.

4. Action: Tab away, then Tab back to the Hardware IDs input.
   Expected Result: Focus returns via keyboard navigation with a visible indicator.

5. Action: Assert the input has a non-empty accessible name.
   Expected Result: Accessible name is meaningful.

# Network Verification

No API request is triggered by focus, keyboard navigation, or typing alone (before submission).

# Expected Final Result

The Hardware IDs filter is a searchbox input, focusable by click and keyboard, with an accessible name and visible focus indicator.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode the accessible name or Hardware ID values.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending