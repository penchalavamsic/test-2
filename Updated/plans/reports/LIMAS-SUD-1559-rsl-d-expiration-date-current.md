---
test_id: "LIMAS-SUD-1559"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Expiration Date\" → \"Current runtime date fills Expiration Date, POST with expirationDate ISO UTC, chip shows Exp: YYYY-MM-DD, filtered total updates, rows sync\""
module: "Reports"
page: "Reports"
section: "Expiration Date"
control: "Current"
action: "Current runtime date fills Expiration Date, change-event triggers POST /api/report/standardlicenses, body field expirationDate as ISO timestamp UTC, page=0, size=10, chip shows Exp: YYYY-MM-DD with Remove button, Clear all shows, filtered total updates, loaded resets to <=10, rows sync, Active stays pressed, no stale rows, no data-changing request"
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

Verify that selecting the current runtime date in the Expiration Date control triggers a `change`-event POST to `/api/report/standardlicenses` with `expirationDate` as an ISO UTC timestamp, `page=0`, `size=10`, a filter chip appears showing `Exp: YYYY-MM-DD` with a Remove button, the Clear button becomes available, filtered totals update, loaded count resets to ≤10, table rows sync with the response, the Active tab stays pressed, no stale rows remain, and the request is read-only.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected, the filter panel is expanded, and the Active tab is selected.
- Expiration Date input is empty.

# Test Data

Use `{runtimeCurrentDate}` as the date value to select. Intercept the POST request to `/api/report/standardlicenses`.

# Steps and Expected Results

1. Action: Set the Expiration Date input to `{runtimeCurrentDate}` and assert the `change` event fires.
   Expected Result: A POST request to `/api/report/standardlicenses` is triggered.

2. Action: Assert the POST body contains `expirationDate` as an ISO UTC timestamp string, `page` as 0, and `size` as 10.
   Expected Result: Body: `{ "expirationDate": "{runtimeCurrentDate}T00:00:00.000Z", ... }`.

3. Action: Assert a filter chip labeled `Exp: YYYY-MM-DD` appears with a Remove button.
   Expected Result: Chip is visible with correct date label.

4. Action: Assert the Clear (all) button is visible and enabled.
   Expected Result: Clear button is accessible.

5. Action: Assert the filtered total count in the toolbar updates to the `totalElements` from the response.
   Expected Result: Toolbar count matches filtered total.

6. Action: Assert the loaded count resets to ≤10 (size=10 batch).
   Expected Result: Loaded count ≤ 10.

7. Action: Assert the visible table rows correspond to the filtered response content and no rows from previous unfiltered state remain.
   Expected Result: Rows sync with response; no stale rows.

8. Action: Assert the Active tab remains in the pressed/selected state.
   Expected Result: Active tab stays pressed.

9. Action: Assert the request is a read-only POST (no PUT, PATCH, or DELETE).
   Expected Result: Method is POST; response contains data, not a mutation.

# Network Verification

- Request URL: `POST /api/report/standardlicenses?page=0&size=10`
- HTTP Method: POST
- Expected Status: 200
- Request Body contains: `expirationDate` (ISO UTC timestamp), `page`, `size`
- Response: paginated JSON

# Expected Final Result

Selecting the current date in Expiration Date triggers a correctly formed POST, displays the Exp chip, updates filtered totals, resets loaded count to ≤10, synchronizes rows, and keeps the Active tab pressed.

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