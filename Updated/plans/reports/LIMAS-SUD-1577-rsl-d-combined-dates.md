---
test_id: "LIMAS-SUD-1577"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Combined Dates\" → \"Both Expiration and Maintenance dates populated, both chips visible, POST with both fields, filtered counts update, rows sync, Clear restores\""
module: "Reports"
page: "Reports"
section: "Combined Dates"
control: "Expiration + Maintenance"
action: "Both dates populated with runtime values, both chips visible, POST body contains both expirationDate and maintenanceDate, page=0, size=10, filtered counts update, rows satisfy observable date relationships, no stale single-date response, Clear restores"
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

Verify that populating both Expiration Date and Maintenance Date with runtime values displays both filter chips, sends a POST body containing both `expirationDate` and `maintenanceDate` fields simultaneously (`page=0`, `size=10`), updates filtered counts, ensures visible rows satisfy both date relationships, does not return a stale single-date response, and Clear restores the unfiltered state.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected, the filter panel is expanded, and the Active tab is selected.
- All date controls are empty.

# Test Data

Use `{runtimeCurrentDate}` for Expiration Date and `{runtimeSecondDate}` for Maintenance Date. Intercept network requests.

# Steps and Expected Results

1. Action: Set Expiration Date to `{runtimeCurrentDate}` and Maintenance Date to `{runtimeSecondDate}`.
   Expected Result: Both `change` events fire; observe the resulting POST(s).

2. Action: Assert both filter chips are visible: `Exp: {runtimeCurrentDate}` and `Maint: {runtimeSecondDate}`.
   Expected Result: Two distinct date chips with correct labels.

3. Action: Parse the final POST body and assert it contains both `expirationDate` and `maintenanceDate` as ISO UTC timestamps with `page=0` and `size=10`.
   Expected Result: Body: `{ expirationDate: "...", maintenanceDate: "...", page: 0, size: 10 }`.

4. Action: Assert the filtered total count updates and the loaded count resets to ≤10.
   Expected Result: Counts reflect the combined filter.

5. Action: Assert the visible rows satisfy both date conditions (no rows from only a single-date response).
   Expected Result: Rows are the intersection of both filters.

6. Action: Click Clear and assert unfiltered data with original counts is restored.
   Expected Result: Clear restores initial state.

# Network Verification

- Final POST to `/api/report/standardlicenses?page=0&size=10` contains both `expirationDate` and `maintenanceDate`.
- Response reflects combined filtering.
- No stale single-date response.

# Expected Final Result

Both dates combined trigger a POST with both fields, display both chips, update counts and rows for the intersection, and Clear restores unfiltered data.

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