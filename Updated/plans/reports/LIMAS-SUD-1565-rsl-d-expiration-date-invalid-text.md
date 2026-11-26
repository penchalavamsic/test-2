---
test_id: "LIMAS-SUD-1565"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Expiration Date\" → \"Browser native validity prevents invalid text entry, request suppressed, aria-invalid behavior, Clear restores\""
module: "Reports"
page: "Reports"
section: "Expiration Date"
control: "Invalid Text"
action: "Browser native validity prevents invalid text entry (type=date constraint), request suppressed, aria-invalid behavior, Clear restores"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Standard Licenses RSL-D"
test_type: "Negative"
automation_candidate: true
plan_status: "Reviewed"
script_status: "not-generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that the native `type="date"` constraint prevents invalid text entry into the Expiration Date input, that no POST request is fired when the input value is invalid, that `aria-invalid` reflects the constraint state appropriately, and that Clear restores the empty state.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected, the filter panel is expanded, and the Active tab is selected.
- Expiration Date input is empty.

# Test Data

Use a non-date text string (e.g., `"invalid-text"`) as the attempted input. Intercept network requests.

# Steps and Expected Results

1. Action: Attempt to type `"invalid-text"` directly into the Expiration Date date input.
   Expected Result: The native `type="date"` constraint prevents the input from accepting arbitrary text; the value either remains empty or the input shows as invalid.

2. Action: Assert the input's `validity.valid` property is `false` (or the input value cannot be set to the invalid string).
   Expected Result: The control is in an invalid state.

3. Action: Assert that no POST request to `/api/report/standardlicenses` is fired because no valid `change` event is generated.
   Expected Result: Network request is suppressed.

4. Action: Assert `aria-invalid` attribute reflects the invalid state on the input element (if implemented).
   Expected Result: `aria-invalid` behavior is consistent with native validity.

5. Action: Click Clear (or the Expiration Date chip Remove if a prior date exists) and assert the input returns to empty state.
   Expected Result: Clear restores the empty input; no filter is active.

# Network Verification

- Verify no POST request is emitted when the input is in an invalid state.
- The native `type="date"` constraint is the primary defense.

# Expected Final Result

The browser's native `type="date"` constraint prevents invalid text entry, suppresses the POST request, and Clear restores the empty input.

# Classification

- Read-only
- Negative

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode dates or invalid text.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending