---
test_id: "LIMAS-SUD-1586"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Deleted Mode\" → \"Active-to-Deleted switch\" → \"Button press, aria-pressed change, API call to allstandarddeleted\""
module: "Reports"
page: "Reports"
section: "Deleted Mode"
control: "Active-to-Deleted switch"
action: "Click Deleted button from Active mode: Deleted aria-pressed='true', Active aria-pressed='false', API call to GET /api/report/allstandarddeleted?page=0&size=500 fires, Deleted view loads with 433 records"
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

Verify that clicking the Deleted button from Active mode correctly switches the UI state: Active becomes unpressed, Deleted becomes pressed, the Deleted API fires with the correct endpoint and parameters, and the Deleted view loads.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected; Active mode is the default with "2,699 records" visible.

# Test Data

Monitor network requests to `/api/report/allstandarddeleted`. Use button locators: `page.getByRole('button', { name: 'Active' })` and `page.getByRole('button', { name: 'Deleted' })`.

# Steps and Expected Results

1. Action: Assert Active button has `aria-pressed="true"` and Deleted button has `aria-pressed="false"` before the switch.
   Expected Result: Initial toggle state correct.

2. Action: Start network request monitoring and click the Deleted button.
   Expected Result: Deleted button clicked; UI begins transition.

3. Action: Wait for the `GET /api/report/allstandarddeleted?page=0&size=500` request to complete with status 200.
   Expected Result: Deleted API call fires with correct endpoint, page=0, and size=500.

4. Action: Assert Deleted button now has `aria-pressed="true"` and Active button now has `aria-pressed="false"`.
   Expected Result: Toggle state inverted — Deleted is the active mode.

5. Action: Assert the toolbar now displays "433 records" (the Deleted record count).
   Expected Result: Toolbar count updates to reflect Deleted data.

6. Action: Assert the loaded/total text shows "150 loaded · 433 total" (or equivalent based on actual loaded count ≤ 500).
   Expected Result: Loaded/total display reflects Deleted pagination.

7. Action: Assert the table rows now show Deleted-mode data with `deletedOn` dates visible in the License Dates column.
   Expected Result: Table content has switched to Deleted records.

# Network Verification

- Request: `GET /api/report/allstandarddeleted?page=0&size=500`
- HTTP Method: GET
- Expected Status: 200
- Response includes: `content` array with `deletedOn` field, `totalElements` ≈ 433.

# Expected Final Result

Clicking Deleted from Active mode switches the UI: Deleted pressed, Active unpressed, the correct Deleted API fires with size=500, and the Deleted records view loads with 433 total records.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode record counts — use runtime assertions.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP