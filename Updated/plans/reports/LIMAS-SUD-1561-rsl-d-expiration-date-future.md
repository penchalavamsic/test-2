---
test_id: "LIMAS-SUD-1561"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Expiration Date\" → \"Future runtime date fills Expiration Date, POST with expirationDate, filtered counts update, rows sync, Clear restores\""
module: "Reports"
page: "Reports"
section: "Expiration Date"
control: "Future"
action: "Future runtime date fills Expiration Date, change-event POST with expirationDate field, page=0, filtered counts update, rows sync, Clear restores initial data"
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

Verify that selecting a future runtime date in the Expiration Date control triggers a correctly formed POST with `expirationDate` as an ISO UTC timestamp, `page=0`, filtered counts update, table rows synchronize with the response, and Clear restores the initial unfiltered data.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected, the filter panel is expanded, and the Active tab is selected.
- Expiration Date input is empty.

# Test Data

Use `{runtimeFutureDate}` as the date value to select. Intercept network requests.

# Steps and Expected Results

1. Action: Set the Expiration Date input to `{runtimeFutureDate}` via the native picker.
   Expected Result: The `change` event fires; a POST request to `/api/report/standardlicenses` is triggered.

2. Action: Assert the POST body contains `expirationDate` as an ISO UTC timestamp from `{runtimeFutureDate}` and `page=0`.
   Expected Result: Payload includes the future date field correctly.

3. Action: Assert the filter chip displays `Exp: {runtimeFutureDate}` (YYYY-MM-DD format).
   Expected Result: Chip visible with correct label.

4. Action: Assert the filtered total count updates to match the API response.
   Expected Result: Toolbar count reflects filtered `totalElements`.

5. Action: Assert the visible table rows match the filtered response content.
   Expected Result: Rows sync with response.

6. Action: Click Clear and assert the unfiltered data with original counts returns.
   Expected Result: Clear restores initial state.

# Network Verification

- Request: `POST /api/report/standardlicenses?page=0&size=10`
- Body: `expirationDate` as ISO UTC timestamp
- Response: paginated JSON

# Expected Final Result

A future date filter correctly triggers the POST, updates chip and counts, syncs rows, and Clear restores unfiltered data.

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