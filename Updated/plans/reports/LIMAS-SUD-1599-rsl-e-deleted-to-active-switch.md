---
test_id: "LIMAS-SUD-1599"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Deleted Mode\" → \"Deleted-to-Active switch\" → \"Button press, Active pressed, Deleted unpressed, 2,699 records shown\""
module: "Reports"
page: "Reports"
section: "Deleted Mode"
control: "Deleted-to-Active switch"
action: "Click Active button from Deleted mode: Active aria-pressed='true', Deleted aria-pressed='false', Active view loads with '2,699 records', loaded/total shows '10 loaded · 2,699 total', table columns revert to Exp + Maint format"
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

Verify switching from Deleted mode back to Active mode: the Active button becomes pressed, the Deleted button becomes unpressed, the Active API fires, and the Active view loads with its full dataset and correct column format.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected; Deleted mode is active showing "433 records".

# Test Data

Monitor network requests. Use button locators and page text assertions.

# Steps and Expected Results

1. Action: Confirm Deleted mode is active: Deleted button has `aria-pressed="true"`, toolbar shows "433 records".
   Expected Result: Starting state is Deleted mode.

2. Action: Start network request monitoring and click the Active button.
   Expected Result: Active button clicked; transition begins.

3. Action: Wait for the `GET /api/report/allstandardlicenses?page=0&size=10` request to complete with status 200.
   Expected Result: Active API fires with correct endpoint and page/size params.

4. Action: Assert Active button now has `aria-pressed="true"` and Deleted button now has `aria-pressed="false"`.
   Expected Result: Toggle state switched to Active mode.

5. Action: Assert the toolbar now displays "2,699 records".
   Expected Result: Toolbar count reflects Active data total.

6. Action: Assert the loaded/total text shows "10 loaded · 2,699 total".
   Expected Result: Pagination reflects Active mode's size=10 initial load.

7. Action: Assert the License Dates column in the table now shows "Exp: D M Y" + "Maint: D M Y" (no "Deleted: D M Y" visible).
   Expected Result: Active-mode License Dates format restored.

8. Action: Wait for the follow-up `page=1` request (Active infinite scroll) to fire and complete.
   Expected Result: `GET /api/report/allstandardlicenses?page=1&size=10` fires.

# Network Verification

- First request: `GET /api/report/allstandardlicenses?page=0&size=10`
- Follow-up: `GET /api/report/allstandardlicenses?page=1&size=10`
- Both return 200 with Active data (no `deletedOn` in content items).

# Expected Final Result

Clicking Active from Deleted mode switches back: Active pressed, Deleted unpressed, Active data loads with 2,699 records, size=10 pagination, and Exp+Maint column format.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode record counts.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP