---
test_id: "LIMAS-SUD-1590"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Deleted Mode\" → \"Deleted infinite scroll\" → \"Page param increments, next batch loads, sentinel triggers append\""
module: "Reports"
page: "Reports"
section: "Deleted Mode"
control: "Deleted infinite scroll"
action: "Same infinite scroll mechanism as Active — same endpoint GET /api/report/allstandarddeleted with incrementing page param. Sentinel element at bottom triggers next page. Rows append to existing table without replacing. Loaded count updates."
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

Verify that Deleted mode uses the same infinite scroll mechanism as Active mode: scrolling to the sentinel element triggers a GET request to `/api/report/allstandarddeleted` with an incremented `page` parameter, new rows append to the table, loaded count updates, and no duplicate rows appear.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected; Deleted mode is active with initial Deleted data loaded.
- More data exists beyond the first page (`totalElements` > `content.length`).

# Test Data

Monitor network requests to `/api/report/allstandarddeleted`. Observe table row count and loaded/total text before and after scroll.

# Steps and Expected Results

1. Action: After initial Deleted load, record the current table row count and the loaded count from the loaded/total text.
   Expected Result: Initial batch loaded; row count matches loaded count.

2. Action: Scroll to the sentinel element at the bottom of the table to trigger the next page load.
   Expected Result: Scroll action reaches the sentinel.

3. Action: Wait for the `GET /api/report/allstandarddeleted?page=1&size=500` request to fire and complete with status 200.
   Expected Result: Next page request fires with `page=1` (same endpoint, incremented page param).

4. Action: Assert the table row count has increased by the number of items in the page=1 response `content` array.
   Expected Result: New rows appended; no existing rows removed or replaced.

5. Action: Assert the loaded count in the loaded/total text updated: loaded = old_loaded + new_page_count.
   Expected Result: Loaded count reflects cumulative loaded rows.

6. Action: Assert no duplicate rows exist (check by unique identifier such as email + hardware ID combination across all visible rows).
   Expected Result: No duplicate records in the table.

7. Action: Assert the total count ("433 total") remains unchanged.
   Expected Result: Total unchanged across scroll loads.

# Network Verification

- Second request: `GET /api/report/allstandarddeleted?page=1&size=500`
- HTTP Method: GET
- Expected Status: 200
- Response `content` is non-empty (if more data exists).

# Expected Final Result

Infinite scroll in Deleted mode works identically to Active mode: page param increments on each scroll-triggered request, rows append without replacement, loaded count updates, and no duplicates appear.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode page or size values.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP