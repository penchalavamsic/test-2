---
test_id: "LIMAS-SUD-1562"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Expiration Date\" → \"Month-boundary runtime date fills Expiration Date, POST fires, counts update, rows sync, calendar boundary behavior, Clear restores\""
module: "Reports"
page: "Reports"
section: "Expiration Date"
control: "Month-Boundary"
action: "Month-boundary runtime date fills Expiration Date, change-event POST, page=0, counts update, rows sync, different month validates calendar boundary behavior, Clear restores"
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

Verify that selecting a month-boundary runtime date (e.g., the first or last day of a month) in the Expiration Date control triggers a correctly formed POST, filtered counts and rows update, the calendar boundary transition is handled correctly, and Clear restores the unfiltered state.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected, the filter panel is expanded, and the Active tab is selected.
- Expiration Date input is empty.

# Test Data

Use `{runtimeMonthBoundaryDate}` as the date value (e.g., first or last day of a month relative to runtime). Intercept network requests.

# Steps and Expected Results

1. Action: Set the Expiration Date input to `{runtimeMonthBoundaryDate}`.
   Expected Result: The `change` event fires; a POST request is triggered.

2. Action: Assert the POST body contains `expirationDate` as an ISO UTC timestamp derived from `{runtimeMonthBoundaryDate}` and `page=0`.
   Expected Result: Correct field and pagination in body.

3. Action: Assert the filter chip displays `Exp: {runtimeMonthBoundaryDate}` (YYYY-MM-DD).
   Expected Result: Chip label is correct.

4. Action: Assert the filtered total count updates and visible rows sync.
   Expected Result: Counts and rows reflect the filtered API response.

5. Action: Assert that the calendar boundary (month transition) does not cause a parsing or off-by-one error in the request payload.
   Expected Result: The ISO timestamp accurately represents the selected boundary date.

6. Action: Click Clear and assert unfiltered data with original counts is restored.
   Expected Result: Clear restores initial state.

# Network Verification

- Request: `POST /api/report/standardlicenses?page=0&size=10`
- Body: `expirationDate` as ISO UTC timestamp
- Response: paginated JSON

# Expected Final Result

A month-boundary date filter is handled correctly: POST with accurate timestamp, filtered counts and rows update, and Clear restores unfiltered data.

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