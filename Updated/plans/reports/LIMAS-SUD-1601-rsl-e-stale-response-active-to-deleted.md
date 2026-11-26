---
test_id: "LIMAS-SUD-1601"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Deleted Mode\" → \"Stale response handling\" → \"Active-to-Deleted: cancel in-flight requests, only Deleted data rendered\""
module: "Reports"
page: "Reports"
section: "Deleted Mode"
control: "Stale response — Active-to-Deleted"
action: "Switch from Active to Deleted while an Active request is still in-flight. The in-flight Active request must be cancelled (aborted). Only the Deleted API response data is rendered in the table. No stale Active rows appear."
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Standard Licenses RSL-E"
test_type: "Negative"
automation_candidate: true
plan_status: "Reviewed"
script_status: "not-generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that when switching from Active to Deleted mode while an Active API request is still in flight, the in-flight request is cancelled and only the Deleted response data is rendered, preventing stale Active data from appearing in the Deleted view.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected; Active mode is active showing initial data.
- Network conditions may need throttling (simulated slow 3G) to make the in-flight window observable.

# Test Data

Use Playwright network throttling to slow responses. Monitor all requests to both Active and Deleted endpoints.

# Steps and Expected Results

1. Action: Enable network throttling (e.g., "Slow 3G" in Playwright) to make API responses slow enough to observe.
   Expected Result: Throttling active; API responses are delayed.

2. Action: In Active mode, trigger a filter or scroll action that initiates an Active API request (e.g., apply an Email filter or scroll to trigger a next-page load).
   Expected Result: An Active API request is in-flight (not yet completed).

3. Action: While the Active request is still in-flight, immediately click the Deleted button.
   Expected Result: Mode switch initiated while Active request is pending.

4. Action: Assert that the in-flight Active request was cancelled (aborted).
   Expected Result: The Active request shows status "aborted" or "canceled" in the network log; it did not complete.

5. Action: Wait for the Deleted API request (`GET /api/report/allstandarddeleted?page=0&size=500`) to complete with status 200.
   Expected Result: Deleted request completes successfully.

6. Action: Assert the table renders only Deleted records (verify License Dates cells show "Deleted: D M Y" format, not Active "Maint: D M Y").
   Expected Result: Only Deleted data visible; no stale Active rows.

7. Action: Assert the toolbar shows "433 records" (Deleted count), not Active count.
   Expected Result: UI is consistent with Deleted mode.

# Network Verification

- In-flight Active request is aborted.
- Only Deleted request completes and its data is rendered.

# Expected Final Result

In-flight Active requests are cancelled when switching to Deleted mode; only Deleted response data is rendered; no stale Active data contaminates the Deleted view.

# Classification

- Read-only
- Negative

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use `sleep()` or fixed waits — rely on network monitoring.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP