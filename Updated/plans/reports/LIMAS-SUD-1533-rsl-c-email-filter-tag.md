---
test_id: "LIMAS-SUD-1533"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Email Filter\" → \"Filter tag shows value, Remove filter button, Clear all button, accessible remove action\""
module: "Reports"
page: "Reports"
section: "Email Filter"
control: "Email Filter"
action: "Filter tag shows value, Remove filter button, Clear all button visible, active filter chip has accessible remove action"
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

Verify that after applying an Email filter, a filter tag/chip displays the entered email value, a per-filter remove button is present, the Clear all button is visible, and the active filter chip has an accessible remove action.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected and the filter panel is expanded.
- An Email filter has been applied with `{runtimeEmail}`.

# Test Data

Use `{runtimeEmail}` as the applied email value.

# Steps and Expected Results

1. Action: Apply the Email filter by typing `{runtimeEmail}` and pressing Enter.
   Expected Result: Filtered results appear.

2. Action: Assert a filter tag/chip is visible containing the text `{runtimeEmail}`.
   Expected Result: The email value is shown in the active filter chip.

3. Action: Assert a remove/close button is visible on the email filter chip.
   Expected Result: A per-filter remove control is present.

4. Action: Assert the Clear all button is visible in the filter panel.
   Expected Result: Global Clear button is present.

5. Action: Verify the filter chip's remove button has an accessible name (e.g., aria-label containing "remove" or "delete").
   Expected Result: The remove action is announced to assistive technology.

# Network Verification

No additional network verification beyond the initial filter request is required.

# Expected Final Result

The active Email filter displays a chip with the value, a per-filter remove button, and a globally visible Clear button, with accessible remove semantics.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode email addresses or chip text.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending