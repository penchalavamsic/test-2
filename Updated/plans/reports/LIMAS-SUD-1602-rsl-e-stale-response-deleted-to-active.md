---
test_id: "LIMAS-SUD-1602"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Deleted Mode\" → \"Stale response handling\" → \"Deleted-to-Active: cancel in-flight requests, only Active data rendered\""
module: "Reports"
page: "Reports"
section: "Deleted Mode"
control: "Stale response — Deleted-to-Active"
action: "Switch from Deleted to Active while a Deleted request is in-flight. The in-flight Deleted request must be cancelled. Only the Active API response data is rendered. No stale Deleted rows appear in Active view."
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

Verify that when switching from Deleted to Active mode while a Deleted API request is still in flight, the in-flight request is cancelled and only the Active response data is rendered, preventing stale Deleted data from appearing in the Active view.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected; Deleted mode is active.
- Network conditions may need throttling to make the in-flight window observable.

# Test Data

Use Playwright network throttling ("Slow 3G"). Monitor all requests to both Deleted and Active endpoints.

# Steps and Expected Results

1. Action: Enable network throttling to make API responses slow enough to observe.
   Expected Result: Throttling active.

2. Action: In Deleted mode, trigger a Deleted API request (e.g., scroll to trigger a next-page load or apply a filter).
   Expected Result: A Deleted API request is in-flight.

3. Action: While the Deleted request is still in-flight, immediately click the Active button.
   Expected Result: Mode switch initiated while Deleted request is pending.

4. Action: Assert the in-flight Deleted request was cancelled (aborted).
   Expected Result: The Deleted request shows status "aborted" or "canceled"; it did not complete.

5. Action: Wait for the Active API request (`GET /api/report/allstandardlicenses?page=0&size=10`) to complete with status 200.
   Expected Result: Active request completes successfully.

6. Action: Assert the table renders only Active records (verify License Dates cells show "Maint: D M Y" format, not "Deleted: D M Y").
   Expected Result: Only Active data visible; no stale Deleted rows.

7. Action: Assert the toolbar shows "2,699 records" (Active count), not Deleted count.
   Expected Result: UI is consistent with Active mode.

# Network Verification

- In-flight Deleted request is aborted.
- Only Active request completes and its data is rendered.

# Expected Final Result

In-flight Deleted requests are cancelled when switching to Active mode; only Active response data is rendered; no stale Deleted data contaminates the Active view.

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