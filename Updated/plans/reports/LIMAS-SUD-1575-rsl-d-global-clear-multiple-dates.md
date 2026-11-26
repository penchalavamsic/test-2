---
test_id: "LIMAS-SUD-1575"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Date Clear\" → \"Global Clear with multiple dates populated resets all dates, all chips removed, single POST with all dates=null, unfiltered data returns\""
module: "Reports"
page: "Reports"
section: "Date Clear"
control: "Global Clear Multiple Dates"
action: "Multiple dates populated, Clear resets all dates to empty, chips removed, single POST fires with all dates as null, unfiltered data returns, no duplicate request"
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

Verify that clicking the global Clear button when multiple date filters are populated resets all date inputs to empty, removes all associated filter chips, fires a single POST with all date fields as `null`, returns unfiltered data with `page=0`, and does not trigger duplicate requests.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected, the filter panel is expanded, and the Active tab is selected.
- At least two date filters (e.g., Expiration Date and Maintenance Date) have been populated with distinct runtime values.

# Test Data

Use `{runtimeCurrentDate}` and `{runtimeSecondDate}` as applied dates on two different date controls. Intercept network requests.

# Steps and Expected Results

1. Action: Apply `{runtimeCurrentDate}` in Expiration Date and `{runtimeSecondDate}` in Maintenance Date. Confirm both chips are visible and filtered results are loaded.
   Expected Result: Two date chips visible; filtered state active.

2. Action: Click the global Clear button.
   Expected Result: A single POST request fires.

3. Action: Assert all date inputs (Expiration, Maintenance, Created, Modified) are empty.
   Expected Result: All four date inputs are cleared.

4. Action: Assert all date filter chips are removed.
   Expected Result: No filter chips visible.

5. Action: Assert the POST body contains `expirationDate: null` and `maintenanceDate: null` (and other date fields as null) with `page=0`.
   Expected Result: All date fields sent as null in a single request.

6. Action: Assert unfiltered data is returned and counts match the original unfiltered values.
   Expected Result: Counts restored.

7. Action: Assert only a single POST request was triggered.
   Expected Result: No duplicate reset requests.

# Network Verification

- Clear triggers: `POST /api/report/standardlicenses?page=0&size=10`
- Body: all date fields as `null`
- Response: full unfiltered paginated JSON
- Exactly one request

# Expected Final Result

Global Clear with multiple dates populated resets all dates, removes all chips, fires a single POST with all dates as null, and restores unfiltered data.

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