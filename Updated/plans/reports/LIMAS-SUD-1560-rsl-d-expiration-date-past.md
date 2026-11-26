---
test_id: "LIMAS-SUD-1560"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Expiration Date\" → \"Past runtime date fills Expiration Date, POST with expirationDate, chip updates, filtered counts update, rows correspond, Clear restores\""
module: "Reports"
page: "Reports"
section: "Expiration Date"
control: "Past"
action: "Past runtime date fills Expiration Date, change-event POST with expirationDate field, page=0, chip updates, filtered counts update, visible rows correspond, no stale data, Clear restores"
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

Verify that selecting a past runtime date in the Expiration Date control triggers a POST with `expirationDate` as an ISO UTC timestamp, page=0, the filter chip updates to show the past date, filtered counts update, visible rows correspond to the filtered response, no stale data persists, and Clear restores the unfiltered state.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected, the filter panel is expanded, and the Active tab is selected.
- Expiration Date input is empty.

# Test Data

Use `{runtimePastDate}` as the date value to select. Intercept network requests.

# Steps and Expected Results

1. Action: Set the Expiration Date input to `{runtimePastDate}` via the native picker.
   Expected Result: The `change` event fires and a POST request is triggered.

2. Action: Assert the POST body contains `expirationDate` as an ISO UTC timestamp derived from `{runtimePastDate}` and `page=0`.
   Expected Result: Correct field and pagination in body.

3. Action: Assert the filter chip displays `Exp: {runtimePastDate}` (formatted as YYYY-MM-DD).
   Expected Result: Chip label matches the selected past date.

4. Action: Assert the filtered total count updates to reflect the response `totalElements`.
   Expected Result: Toolbar count syncs with filtered total.

5. Action: Assert all visible table rows correspond to the filtered response (no rows from the unfiltered state remain).
   Expected Result: No stale data visible.

6. Action: Click Clear and assert the unfiltered data with original counts is restored.
   Expected Result: Clear restores initial state.

# Network Verification

- Request: `POST /api/report/standardlicenses?page=0&size=10`
- Body field: `expirationDate` as ISO UTC timestamp
- Response: paginated JSON with filtered results

# Expected Final Result

A past date filter correctly triggers a POST with the right payload, updates the chip and counts, shows only matching rows, and Clear restores unfiltered data.

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