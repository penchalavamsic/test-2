---
test_id: "LIMAS-SUD-1585"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Deleted Mode\" → \"Already-selected Active click\" → \"No duplicate request when clicking already-selected Active\""
module: "Reports"
page: "Reports"
section: "Deleted Mode"
control: "Already-selected Active click"
action: "Clicking the already-selected Active button does not fire a duplicate API request and state remains unchanged — Active aria-pressed='true', table unchanged, toolbar count unchanged"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
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

Verify that clicking the Active button when it is already the selected mode does not issue a duplicate API request and the UI state remains unchanged.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected; Active mode is the default selection.

# Test Data

Monitor all network requests to `/api/report/allstandardlicenses` and `/api/report/allstandarddeleted`. Use the Active and Deleted button locators.

# Steps and Expected Results

1. Action: Wait for the initial Active-mode API request (`GET /api/report/allstandardlicenses?page=0&size=10`) to complete.
   Expected Result: Initial Active data loaded; toolbar shows "2,699 records"; loaded/total shows "10 loaded · 2,699 total".

2. Action: Start network request monitoring for any requests to standard-licenses or standard-deleted endpoints.
   Expected Result: Request observer active.

3. Action: Click the Active button (already `aria-pressed="true"`).
   Expected Result: Button remains pressed; no visual change.

4. Action: Assert that no new network request was fired to either `/api/report/allstandardlicenses` or `/api/report/allstandarddeleted` after the click.
   Expected Result: Zero new requests; no duplicate request.

5. Action: Assert Active still has `aria-pressed="true"`, Deleted still has `aria-pressed="false"`.
   Expected Result: Toggle state unchanged.

6. Action: Assert the table row count and toolbar record count remain the same as before the click.
   Expected Result: No data reload triggered; counts unchanged.

# Network Verification

- No new GET or POST request to standard-licenses or standard-deleted endpoints after clicking the already-active button.

# Expected Final Result

Clicking an already-selected Active button is a no-op: no duplicate API request, no state change, aria-pressed unchanged.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP