---
test_id: "LIMAS-SUD-1558"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Native Date-Picker\" → \"Native browser date picker opens on click or calendar button, Escape closes, focus returns, selecting date updates input, change event fires, picker is browser chrome not application DOM\""
module: "Reports"
page: "Reports"
section: "Native Date-Picker"
control: "Expiration Date"
action: "Native browser date picker (type=date), opens on click or calendar button, Escape closes, focus returns, selecting date updates input, change event fires immediately, browser chrome NOT application DOM, accessibility state"
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

Verify that the Expiration Date control invokes the native browser date picker (not a custom DOM widget) on click or calendar-button interaction, that the picker can be closed with Escape with focus returning to the input, that selecting a date updates the input value, and that the `change` event fires immediately.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected and the filter panel is expanded.
- Expiration Date control is in its initial empty state.

# Test Data

Use `{runtimeCurrentDate}` as the date value to select from the native picker.

# Steps and Expected Results

1. Action: Click the Expiration Date input field.
   Expected Result: The native browser date picker UI (calendar popup) opens. Verify the picker is browser chrome, not an element in the application DOM.

2. Action: Click the calendar trigger button adjacent to the Expiration Date input.
   Expected Result: The native browser date picker opens (alternative trigger path).

3. Action: With the picker open, press the Escape key.
   Expected Result: The picker closes and focus returns to the Expiration Date input. The input value does not change.

4. Action: Re-open the picker and select `{runtimeCurrentDate}`.
   Expected Result: The picker closes, the Expiration Date input value updates to the selected date.

5. Action: Assert that a `change` event fires immediately on the input after date selection.
   Expected Result: The `change` event is dispatched synchronously upon picker confirmation.

6. Action: Assert that no custom DOM calendar or date-picker dialog is rendered in the application.
   Expected Result: The picker is entirely native browser chrome.

# Network Verification

The `change` event triggers a POST request; verify the request fires after date selection as confirmation of the `change` event.

# Expected Final Result

The Expiration Date control uses the native browser date picker: it opens on click or calendar button, closes with Escape with focus restored, selecting a date updates the input, and the `change` event fires immediately.

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