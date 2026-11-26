---
test_id: "LIMAS-SUD-1604"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Deleted Mode\" → \"Loading indicator\" → \"Spinner visible during Deleted-to-Active switch, disappears on load\""
module: "Reports"
page: "Reports"
section: "Deleted Mode"
control: "Loading indicator — Deleted-to-Active"
action: "When switching from Deleted to Active mode, a loading indicator appears during the API call and disappears once the Active response arrives and the table is rendered."
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

Verify that a loading indicator appears during the Deleted-to-Active mode switch and disappears once the Active view is fully loaded.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected; Deleted mode is active.

# Test Data

Locate the loading indicator element. Use Playwright assertions for visibility lifecycle.

# Steps and Expected Results

1. Action: Confirm no loading indicator is currently visible in Deleted mode.
   Expected Result: No stale spinner present.

2. Action: Click the Active button. Immediately observe the DOM for a loading indicator.
   Expected Result: A loading indicator becomes visible during the switch.

3. Action: Assert the loading indicator appears in the same location (near the table) as it does for the Active-to-Deleted direction.
   Expected Result: Consistent indicator placement regardless of switch direction.

4. Action: Wait for the `GET /api/report/allstandardlicenses?page=0&size=10` request to settle.
   Expected Result: Active data loaded.

5. Action: Assert the loading indicator is no longer visible.
   Expected Result: Spinner disappeared.

6. Action: Assert the Active table data is rendered with "2,699 records" and correct column format.
   Expected Result: Table populated with Active records; Exp + Maint format.

# Network Verification

- Loading indicator lifecycle tied to the Active API request.

# Expected Final Result

A loading indicator appears during the Deleted-to-Active switch and disappears when the Active data is loaded and rendered.

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