---
test_id: "LIMAS-SUD-1531"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Email Filter\" → \"Email Input focus behavior, accessible name, visible focus indicator, and input type\""
module: "Reports"
page: "Reports"
section: "Email Filter"
control: "Email Input"
action: "Focus behavior, accessible name, visible focus indicator, input type"
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

Verify that the Email filter input receives focus on click or Tab, has an accessible name, shows a visible focus indicator, and is of a text-based input type.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected and the filter panel is expanded.

# Test Data

Use `{runtimeEmail}` as a placeholder email value for focus testing.

# Steps and Expected Results

1. Action: Locate the Email input by its accessible name and click it.
   Expected Result: The Email input receives focus and shows a visible focus indicator (outline, ring, or caret).

2. Action: Verify the input type attribute is `text` or `search`.
   Expected Result: Input type is text-based, not a non-text widget.

3. Action: Tab away from the input, then Tab back to it.
   Expected Result: The Email input receives focus via keyboard navigation and the focus indicator is visible.

4. Action: Assert the input has a non-empty accessible name (aria-label, aria-labelledby, or associated label).
   Expected Result: Accessible name is present and meaningful.

# Network Verification

No API request is triggered by focus or keyboard navigation alone.

# Expected Final Result

The Email filter input is focusable by click and keyboard, has an accessible name, a visible focus indicator, and is a text-type input.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode the accessible name value.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending