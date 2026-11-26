---
test_id: "LIMAS-SUD-1566"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Expiration Date\" → \"Individual chip Remove or backspace-to-empty clears date, POST fires with expirationDate null/empty, unfiltered data returns, page=0\""
module: "Reports"
page: "Reports"
section: "Expiration Date"
control: "Clear"
action: "Individual chip Remove or backspace-to-empty clears the date, input becomes empty, POST fires with expirationDate as null/empty, unfiltered data returns, page=0, counts restore, no other filter altered"
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

Verify that clearing the Expiration Date individually — via the chip's Remove button or by backspace-to-empty on the input — empties the input, fires a POST with `expirationDate` as `null` or absent, returns unfiltered data with `page=0`, restores original counts, and does not alter any other filter controls.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected, the filter panel is expanded, and the Active tab is selected.
- Expiration Date has a date applied (`{runtimeCurrentDate}`) and filtered results are displayed.

# Test Data

Use `{runtimeCurrentDate}` as the initially applied date. Intercept network requests.

# Steps and Expected Results

1. Action: Apply `{runtimeCurrentDate}` in Expiration Date and confirm the filtered state.
   Expected Result: `Exp: {runtimeCurrentDate}` chip visible; filtered results loaded.

2. Action: Click the Remove (×) button on the Expiration Date filter chip.
   Expected Result: The chip is removed; the Expiration Date input becomes empty.

3. Action: Assert a POST request to `/api/report/standardlicenses` is fired with `page=0` and `expirationDate` as `null` or not present in the body.
   Expected Result: POST body does not contain a date value for `expirationDate`.

4. Action: Assert unfiltered data is returned in the response and the total count matches the original unfiltered value.
   Expected Result: Counts restored to unfiltered state.

5. Action: Assert no other filter controls (email, hardware IDs, user group, product profile, profile role, other date fields) are altered.
   Expected Result: All other filters remain in their previous state.

6. Action: Repeat the test using the backspace-to-empty approach on the Expiration Date input instead of the chip Remove.
   Expected Result: Same behavior: input empties, POST fires with `expirationDate` as null/empty, unfiltered data returns.

# Network Verification

- First POST includes `expirationDate`.
- After clear, POST includes `expirationDate: null` or omits the field; `page=0`.
- Response returns full unfiltered paginated JSON.

# Expected Final Result

Clearing the Expiration Date individually via chip Remove or backspace-to-empty empties the input, fires a POST without the date, restores unfiltered data, and leaves other filters unchanged.

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