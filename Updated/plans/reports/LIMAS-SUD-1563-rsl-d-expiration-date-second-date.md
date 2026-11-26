---
test_id: "LIMAS-SUD-1563"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Expiration Date\" → \"Second distinct runtime date replaces previous chip, new POST with updated expirationDate, counts and rows update, Clear restores\""
module: "Reports"
page: "Reports"
section: "Expiration Date"
control: "Second Date"
action: "Second distinct runtime date fills Expiration Date, previous chip replaces (no stacking), new POST with updated expirationDate, counts and rows update, Clear restores"
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

Verify that selecting a second distinct runtime date in the Expiration Date control replaces the previous filter chip (no stacking), fires a new POST with the updated `expirationDate`, and updates counts and rows accordingly, with Clear restoring the unfiltered state.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected, the filter panel is expanded, and the Active tab is selected.
- A first date has already been applied in the Expiration Date control.

# Test Data

Use `{runtimeCurrentDate}` as the first date and `{runtimeSecondDate}` as the second distinct date. Intercept network requests.

# Steps and Expected Results

1. Action: Apply `{runtimeCurrentDate}` in Expiration Date and confirm the chip and filtered results appear.
   Expected Result: `Exp: {runtimeCurrentDate}` chip visible.

2. Action: Change Expiration Date to `{runtimeSecondDate}`.
   Expected Result: A new `change` event fires; a new POST request is triggered.

3. Action: Assert the previous chip (`Exp: {runtimeCurrentDate}`) is removed and a single chip `Exp: {runtimeSecondDate}` is present.
   Expected Result: No chip stacking; only one Exp chip visible with the new date.

4. Action: Assert the POST body contains `expirationDate` as the ISO UTC timestamp for `{runtimeSecondDate}`.
   Expected Result: Body field reflects the updated date.

5. Action: Assert the filtered total count and visible rows update to match the new response.
   Expected Result: Counts and rows reflect the second date filter.

6. Action: Click Clear and assert unfiltered data with original counts is restored.
   Expected Result: Clear restores initial state.

# Network Verification

- Two distinct POST requests fire: one for the first date, one for the second.
- Second request body contains the updated `expirationDate`.
- No duplicate chips or stacked date filters.

# Expected Final Result

Changing the Expiration Date to a second value replaces the chip, fires a new POST with the updated date, updates results, and Clear restores unfiltered data.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode dates or counts.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending