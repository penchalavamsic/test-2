---
test_id: "LIMAS-SUD-1603"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Deleted Mode\" → \"Loading indicator\" → \"Spinner visible during Active-to-Deleted switch, disappears on load\""
module: "Reports"
page: "Reports"
section: "Deleted Mode"
control: "Loading indicator — Active-to-Deleted"
action: "When switching from Active to Deleted mode, a loading indicator (spinner) appears during the API call and disappears once the Deleted response arrives and the table is rendered."
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

Verify that a loading indicator appears during the Active-to-Deleted mode switch and disappears once the Deleted view is fully loaded.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected; Active mode is active.

# Test Data

Locate the loading indicator element (spinner, skeleton, or progress indicator) in the table area. Use Playwright assertions for visibility.

# Steps and Expected Results

1. Action: Confirm no loading indicator is currently visible in Active mode.
   Expected Result: No stale spinner present.

2. Action: Start monitoring and click the Deleted button. Immediately observe the DOM for a loading indicator in the table or toolbar area.
   Expected Result: A loading indicator (spinner) becomes visible during the switch.

3. Action: Assert the loading indicator is located within or near the table container (not outside the Standard Licenses section).
   Expected Result: Indicator is contextually placed near the data being loaded.

4. Action: Wait for the `GET /api/report/allstandarddeleted?page=0&size=500` request to settle (response received and DOM updated).
   Expected Result: Deleted data loaded.

5. Action: Assert the loading indicator is no longer visible.
   Expected Result: Spinner disappeared; no stale loading element remains.

6. Action: Assert the Deleted table data is rendered and visible.
   Expected Result: Table populated with Deleted records.

7. Action: If the indicator is too transient to capture due to fast network, document it as unobserved without adding artificial delays.
   Expected Result: Finding honestly documented.

# Network Verification

- The loading indicator's lifecycle is tied to the Deleted API request: appears on request start, disappears on response settlement.

# Expected Final Result

A loading indicator appears during the Active-to-Deleted switch and disappears when the Deleted data is loaded and rendered.

# Classification

- Read-only
- Positive

# Restrictions

- Do not add fixed waits or `sleep()` to observe the indicator.
- Do not delay the backend.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP