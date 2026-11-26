---
test_id: "LIMAS-SUD-1557"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Date-Control Structure\" → \"Verify visibility, label, input type=date, role=textbox, initial empty value, enabled, no min/max/required, focus indicator, calendar trigger button, no aria-label, DOM IDs\""
module: "Reports"
page: "Reports"
section: "Date-Control Structure"
control: "All 4 Date Controls"
action: "Verify visibility, label, input type=date, role=textbox, initial empty value, enabled, no min/max/required, focus indicator, calendar trigger button, no aria-label (uses parent text label), DOM IDs (report-exp-date, report-maint-date, report-created-date, report-modified-date)"
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

Verify the structural properties of all four date controls in the filter panel: visibility, associated text label, native date input type, ARIA role, initial empty value, enabled state, absence of HTML constraint attributes, visible focus indicator, calendar trigger button, absence of `aria-label`, and correct DOM element IDs.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected and the filter panel is expanded.
- Date controls are in their initial untouched state.

# Test Data

Use Playwright locators for each date control identified by DOM ID and associated text label. Target IDs: `report-exp-date`, `report-maint-date`, `report-created-date`, `report-modified-date`.

# Steps and Expected Results

1. Action: For each of the four date controls, assert the element is visible.
   Expected Result: All four controls are rendered and visible in the filter panel.

2. Action: Assert each control has an associated visible text label (Expiration Date, Maintenance Date, License Created Date, License Modified Date).
   Expected Result: Each date input has a text label adjacent to or wrapping the control.

3. Action: Assert the `type` attribute of each input element is `date`.
   Expected Result: All four inputs use native `type="date"`.

4. Action: Assert the ARIA role of each input is `textbox`.
   Expected Result: Each input reports `role="textbox"`.

5. Action: Assert the initial `value` property of each input is empty.
   Expected Result: All four inputs have an empty value on initial load.

6. Action: Assert each control is enabled (not disabled).
   Expected Result: All four controls are in an enabled, interactive state.

7. Action: Assert no `min`, `max`, or `required` attribute is present on any of the four inputs.
   Expected Result: No HTML constraint attributes are set.

8. Action: Focus each date control sequentially and assert a visible focus indicator appears.
   Expected Result: A visible focus ring or outline is present around each focused control.

9. Action: Assert a calendar trigger button (picker indicator) is rendered inside or adjacent to each date input.
   Expected Result: Each date input has a clickable calendar trigger.

10. Action: Assert that no `aria-label` attribute is present on any date input (the control relies on the parent text label).
    Expected Result: `aria-label` is absent on all four inputs.

11. Action: Assert the DOM `id` values match the expected identifiers.
    Expected Result: IDs are `report-exp-date`, `report-maint-date`, `report-created-date`, `report-modified-date`.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

All four date controls meet structural requirements: `type="date"`, `role="textbox"`, empty initial value, enabled, no constraint attributes, visible focus indicator, calendar trigger present, no `aria-label`, and correct DOM IDs.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode dates, DOM IDs beyond expected values, or attribute values.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending