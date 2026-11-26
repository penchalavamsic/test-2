---
test_id: "LIMAS-SUD-1609"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Deleted Mode\" → \"Rapid mode toggle\" → \"Quick Active→Deleted→Active clicks, final state consistent\""
module: "Reports"
page: "Reports"
section: "Deleted Mode"
control: "Rapid mode toggle"
action: "Click Active→Deleted→Active in rapid succession. In-flight requests should be cancelled as needed. Final state must be consistent: Active pressed, Deleted unpressed, Active data rendered with '2,699 records'. No mixed mode data. No error state."
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

Verify that rapidly toggling between Active and Deleted modes (Active → Deleted → Active) does not leave the UI in an inconsistent state: the final mode's data is rendered correctly, no mixed data appears, and the toggle buttons are in the correct state.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected; Active mode is active.

# Test Data

Use network throttling ("Slow 3G") to make the rapid toggle scenario observable. Monitor all requests to Active and Deleted endpoints.

# Steps and Expected Results

1. Action: Enable network throttling to make API responses observable during rapid clicks.
   Expected Result: Throttling active.

2. Action: From Active mode, click the Deleted button, then immediately click the Active button again — all in rapid succession without waiting for intermediate responses.
   Expected Result: Both clicks registered; at least one request may be in-flight when the second click happens.

3. Action: Wait for all network activity to settle.
   Expected Result: No pending requests.

4. Action: Assert the final state is Active mode: Active button has `aria-pressed="true"`, Deleted button has `aria-pressed="false"`.
   Expected Result: Button toggle state matches the last clicked mode (Active).

5. Action: Assert the toolbar shows the Active record count ("2,699 records"), NOT the Deleted count ("433 records").
   Expected Result: Count matches final Active mode.

6. Action: Assert the table License Dates column shows the Active format ("Exp: D M Y" + "Maint: D M Y"), not the Deleted format.
   Expected Result: Table data matches Active mode schema — no "Deleted: D M Y" rows.

7. Action: Assert no error toast, no blank table, and no loading indicator stuck.
   Expected Result: UI is in a clean, error-free state.

8. Action: Assert the filter panel is collapsed and no filter chips are visible (fresh state).
   Expected Result: No residual UI artifacts from the rapid toggle.

# Network Verification

- The intermediate Deleted request may have been aborted or its response discarded.
- The final successful request is for the Active endpoint.
- No request is left pending.

# Expected Final Result

After rapid Active→Deleted→Active clicks, the UI settles on a consistent Active state with correct data, correct button toggle, and no errors or mixed data.

# Classification

- Read-only
- Negative

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use `sleep()` or fixed waits — rely on network settle.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP