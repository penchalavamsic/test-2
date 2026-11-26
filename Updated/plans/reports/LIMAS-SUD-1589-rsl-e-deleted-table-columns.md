---
test_id: "LIMAS-SUD-1589"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Deleted Mode\" → \"Deleted table columns\" → \"Same 6 columns, License Dates shows Exp + Deleted (no Maint), cells populated\""
module: "Reports"
page: "Reports"
section: "Deleted Mode"
control: "Deleted table columns"
action: "Table has same 6 columns as Active — User Group, Profile, Role, Email, Hardware ID, License Dates. License Dates cell format: 'Exp: D M Y' + 'Deleted: D M Y' (no Maintenance date in Deleted). Data populated from API response including deletedOn."
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Standard Licenses RSL-E"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "not-generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that the Deleted-mode table renders the same 6 columns as Active mode, the License Dates cell displays both Expiration and Deleted dates (not Maintenance), and all cells are populated with data from the API response.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected; Active mode is visible.

# Test Data

Use table header locators and cell content inspection. Monitor `GET /api/report/allstandarddeleted?page=0&size=500` response for data values.

# Steps and Expected Results

1. Action: Click the Deleted button and wait for the Deleted view to load.
   Expected Result: Deleted records table is visible.

2. Action: Assert the table has exactly 6 column headers in order: User Group, Profile, Role, Email, Hardware ID, License Dates.
   Expected Result: Same 6 columns as Active mode; no extra or missing columns.

3. Action: For the first visible row, assert the License Dates cell contains text matching the pattern "Exp: D M Y" (e.g., "Exp: 15 Mar 2025").
   Expected Result: Expiration date is displayed in "Exp: D M Y" format.

4. Action: For the same row, assert the License Dates cell also contains text matching the pattern "Deleted: D M Y" (e.g., "Deleted: 20 Oct 2025").
   Expected Result: Deleted date is displayed, sourced from the API's `deletedOn` field.

5. Action: Assert the License Dates cell does NOT contain "Maint:" text.
   Expected Result: Maintenance date is absent from the Deleted-mode License Dates cell (unlike Active mode which shows both "Exp:" and "Maint:").

6. Action: Assert that at least one visible row has non-empty values in User Group, Profile, Role, Email, and Hardware ID columns.
   Expected Result: All 6 columns are populated with data for Deleted records.

7. Action: Cross-check the values in the first row against the corresponding item in the API response `content` array (by email or hardware ID matching).
   Expected Result: Cell data matches API response fields.

# Network Verification

- `GET /api/report/allstandarddeleted?page=0&size=500` response items carry: `userGroup`, `profile`, `role`, `email`, `hardwareId`, `expirationDate`, `deletedOn`.

# Expected Final Result

The Deleted table has the same 6 columns as Active; License Dates shows "Exp: D M Y" + "Deleted: D M Y" with no Maintenance date; cells are populated from the API response.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode dates or cell values.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP