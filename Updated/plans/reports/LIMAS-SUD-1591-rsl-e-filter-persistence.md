---
test_id: "LIMAS-SUD-1591"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Deleted Mode\" → \"Filter persistence across mode switch\" → \"No cross-mode filter persistence, each mode loads fresh state\""
module: "Reports"
page: "Reports"
section: "Deleted Mode"
control: "Filter persistence across mode switch"
action: "Filters are NOT persisted across mode switch. Switching Active→Deleted loads fresh Deleted unfiltered state. Switching Deleted→Active loads fresh Active unfiltered state. Each direction verified independently."
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

Verify that filter state is NOT preserved when switching between Active and Deleted modes: applying a filter in Active mode then switching to Deleted loads a fresh unfiltered Deleted view, and vice versa.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected; Active mode is the default.

# Test Data

Use a specific email filter value (e.g., `{runtimeEmail}`) as a filter marker. Monitor network requests to both standard-licenses and standard-deleted endpoints.

# Steps and Expected Results

1. Action: In Active mode, expand the filter panel and apply an Email filter with `{runtimeEmail}`, then wait for the filter POST to complete.
   Expected Result: Active mode shows filtered results; filter chip visible; count reduced.

2. Action: Now click the Deleted button.
   Expected Result: UI switches to Deleted mode.

3. Action: Wait for the `GET /api/report/allstandarddeleted?page=0&size=500` request to complete.
   Expected Result: Deleted API is called with page=0, size=500 — no filter parameters in the URL.

4. Action: Assert the Deleted view shows the full unfiltered Deleted dataset (toolbar shows "433 records", not a reduced filtered count).
   Expected Result: Deleted loads fresh unfiltered state; no filter chip visible; filter panel fields are empty.

5. Action: Now apply a filter in Deleted mode (e.g., Email filter with `{runtimeEmail}`) and wait for the filtered response.
   Expected Result: Deleted mode shows filtered results.

6. Action: Click the Active button.
   Expected Result: UI switches to Active mode.

7. Action: Wait for the `GET /api/report/allstandardlicenses?page=0&size=10` request to complete.
   Expected Result: Active API loads with page=0, size=10 — no filter from Deleted session carried over.

8. Action: Assert Active mode shows full unfiltered data ("2,699 records", no filter chip).
   Expected Result: Active loads fresh unfiltered state; no filter state persisted from the Deleted session.

# Network Verification

- After mode switch, the initial GET request for the target mode has no filter-related query params or body.
- Filter state is not stored across mode boundaries.

# Expected Final Result

Filter state is scoped to the current mode only. Switching modes always loads a fresh unfiltered state for the target mode.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode email or filter values.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP