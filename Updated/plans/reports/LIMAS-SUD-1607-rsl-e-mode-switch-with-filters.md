---
test_id: "LIMAS-SUD-1607"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Deleted Mode\" → \"Mode switch with active filters\" → \"Active has filter, click Deleted, filters reset for Deleted\""
module: "Reports"
page: "Reports"
section: "Deleted Mode"
control: "Mode switch with active filters"
action: "Apply core filters (Email + Hardware ID) in Active mode. Switch to Deleted. Verify Deleted loads fresh unfiltered state (433 records, no chips). Switch back to Active. Verify Active also loads fresh unfiltered state (2,699 records, no chips)."
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

Verify the combined scenario: apply filters in Active mode, switch to Deleted and confirm filters are not persisted, then switch back to Active and confirm the Active state is also fresh.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected; Active mode is the default.

# Test Data

Use `{runtimeEmail}` and a hardware ID from the combobox. Monitor network requests.

# Steps and Expected Results

1. Action: In Active mode, expand the filter panel and apply an Email filter with `{runtimeEmail}`. Wait for the filtered response.
   Expected Result: Filtered Active results; email chip visible; count < 2,699.

2. Action: Also select a hardware ID from the Hardware IDs combobox and wait for the filtered response.
   Expected Result: Both filter chips visible; count further reduced.

3. Action: Click the Deleted button.
   Expected Result: Mode switch initiated.

4. Action: Wait for the Deleted API request (`GET /api/report/allstandarddeleted?page=0&size=500`) to complete.
   Expected Result: Deleted data loaded.

5. Action: Assert no filter chips are visible in Deleted mode.
   Expected Result: Both filter chips from Active session are gone.

6. Action: Assert the filter panel Email input is empty and Hardware IDs combobox is empty.
   Expected Result: All filter controls reset.

7. Action: Assert toolbar shows "433 records" (unfiltered Deleted total).
   Expected Result: Deleted loads full unfiltered data.

8. Action: Now click the Active button.
   Expected Result: Switch back to Active.

9. Action: Wait for the Active API request (`GET /api/report/allstandardlicenses?page=0&size=10`) to complete.
   Expected Result: Active data loaded.

10. Action: Assert no filter chips visible in Active mode and toolbar shows "2,699 records".
    Expected Result: Active also loads fresh unfiltered state; no filter persistence.

# Network Verification

- Deleted GET request has no filter params.
- Active GET request has no filter params.
- Both modes start clean after the round-trip switch.

# Expected Final Result

Filters applied in Active mode do not persist to Deleted mode, and switching back to Active also loads a fresh unfiltered state. Each mode independently starts clean after a mode switch.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode email or hardware ID values.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP