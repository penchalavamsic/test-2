---
test_id: "LIMAS-SUD-1569"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"License Created Date\" → \"Valid runtime date fills License Created Date, POST with createdDate ISO UTC, chip shows Created: YYYY-MM-DD, filtered counts update, rows sync, other dates empty\""
module: "Reports"
page: "Reports"
section: "License Created Date"
control: "One Valid Date"
action: "Valid runtime date fills License Created Date, change-event POST with createdDate field as ISO timestamp UTC, page=0, size=10, chip shows Created: YYYY-MM-DD, filtered counts update, rows sync, other date fields remain empty, Clear restores"
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

Verify that selecting a valid runtime date in the License Created Date control triggers a POST with `createdDate` as an ISO UTC timestamp, `page=0`, `size=10`, a filter chip showing `Created: YYYY-MM-DD` appears, filtered counts update, table rows sync with the response, all other date fields remain empty, and Clear restores the unfiltered state.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected, the filter panel is expanded, and the Active tab is selected.
- All date controls are empty.

# Test Data

Use `{runtimeCurrentDate}` as the date value to select. Intercept network requests.

# Steps and Expected Results

1. Action: Set the License Created Date input to `{runtimeCurrentDate}` via the native picker.
   Expected Result: The `change` event fires; a POST request is triggered.

2. Action: Assert the POST body contains `createdDate` as an ISO UTC timestamp string and `page=0`, `size=10`.
   Expected Result: Body includes `createdDate` field correctly.

3. Action: Assert a filter chip labeled `Created: YYYY-MM-DD` appears with a Remove button.
   Expected Result: Chip is visible with correct label.

4. Action: Assert the filtered total count updates to match the response `totalElements`.
   Expected Result: Toolbar count syncs with filtered total.

5. Action: Assert the visible table rows correspond to the filtered response.
   Expected Result: Rows sync with response content.

6. Action: Assert that Expiration Date, Maintenance Date, and License Modified Date remain empty.
   Expected Result: No other date field is populated.

7. Action: Click Clear and assert unfiltered data with original counts is restored.
   Expected Result: Clear restores initial state.

# Network Verification

- Request: `POST /api/report/standardlicenses?page=0&size=10`
- Body contains: `createdDate` as ISO UTC timestamp
- Response: paginated JSON

# Expected Final Result

Selecting a valid date in License Created Date triggers a correctly formed POST, displays the Created chip, updates filtered counts and rows, leaves other date fields untouched, and Clear restores unfiltered data.

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