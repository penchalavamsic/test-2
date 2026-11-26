---
test_id: "LIMAS-SUD-1574"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Date Clear\" → \"Global Clear with one date populated resets date to empty, chip removed, POST with date=null, unfiltered data returns, page=0\""
module: "Reports"
page: "Reports"
section: "Date Clear"
control: "Global Clear Single Date"
action: "One date populated, Clear button resets date to empty, chip removed, POST with date=null, unfiltered data returns, page=0, no duplicate reset request"
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

Verify that clicking the global Clear button when exactly one date filter is populated resets that date input to empty, removes the associated filter chip, fires a POST with that date field as `null`, returns unfiltered data with `page=0`, and does not trigger a duplicate reset request.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected, the filter panel is expanded, and the Active tab is selected.
- Expiration Date has a date applied (`{runtimeCurrentDate}`) and filtered results are displayed. No other filters are applied.

# Test Data

Use `{runtimeCurrentDate}` as the single applied date. Intercept network requests.

# Steps and Expected Results

1. Action: Apply `{runtimeCurrentDate}` in Expiration Date and confirm filtered results.
   Expected Result: `Exp: {runtimeCurrentDate}` chip visible; filtered state active.

2. Action: Click the global Clear button.
   Expected Result: A POST request fires to restore unfiltered data.

3. Action: Assert the Expiration Date input is empty.
   Expected Result: Date input value is cleared.

4. Action: Assert the `Exp: {runtimeCurrentDate}` chip is removed.
   Expected Result: No filter chip visible.

5. Action: Assert the POST body has `expirationDate` as `null` and `page=0`.
   Expected Result: Body excludes the date value.

6. Action: Assert unfiltered data is returned and counts match the original unfiltered values.
   Expected Result: Counts restored.

7. Action: Assert only a single POST request was triggered (no duplicate reset).
   Expected Result: Exactly one request fires for the Clear action.

# Network Verification

- Clear triggers: `POST /api/report/standardlicenses?page=0&size=10`
- Body: `expirationDate: null`
- Response: full unfiltered paginated JSON

# Expected Final Result

Global Clear with one date populated resets the date, removes the chip, fires a single POST without the date, and restores unfiltered data.

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