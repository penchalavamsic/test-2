---
test_id: "LIMAS-SUD-1588"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Deleted Mode\" → \"Deleted counts\" → \"Toolbar shows '433 records', loaded/total shows '150 loaded · 433 total'\""
module: "Reports"
page: "Reports"
section: "Deleted Mode"
control: "Deleted counts"
action: "Toolbar count display '433 records', loaded/total text '150 loaded · 433 total' (150 loaded because size=500 but actual count ≤ 500), loaded count matches visible row count"
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

Verify that after switching to Deleted mode, the toolbar displays the correct total record count "433 records" and the loaded/total text shows the correct loaded count vs total count, consistent with the API response.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected; Active mode is visible.

# Test Data

Monitor the `GET /api/report/allstandarddeleted?page=0&size=500` response. Use page text assertions for counts.

# Steps and Expected Results

1. Action: Click the Deleted button and wait for the `allstandarddeleted` response.
   Expected Result: Deleted view loads with status 200.

2. Action: Assert the toolbar text contains "433 records".
   Expected Result: Toolbar displays the total Deleted record count from the API's `totalElements` field.

3. Action: Assert the loaded/total text matches the pattern "N loaded · 433 total" where N is the number of items in the first page response (≤ 500).
   Expected Result: Loaded count reflects actual `content.length` from the response; total matches `totalElements`.

4. Action: Assert the loaded count (N) matches the number of visible table rows.
   Expected Result: Every loaded item has a corresponding visible table row.

5. Action: Assert no row in the table extends beyond the loaded count.
   Expected Result: Row count equals loaded count exactly.

# Network Verification

- Response `totalElements` matches the toolbar "records" count.
- Response `content.length` matches the "loaded" portion of the loaded/total text.
- `size` in response = 500.

# Expected Final Result

Toolbar shows "433 records"; loaded/total text shows "150 loaded · 433 total" (or equivalent when actual loaded < 500); loaded count matches visible rows.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode counts — assert from runtime response.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP