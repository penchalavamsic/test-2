---
test_id: "LIMAS-SUD-1606"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Deleted Mode\" → \"Accessibility\" → \"Enter/Space key activates mode switch\""
module: "Reports"
page: "Reports"
section: "Deleted Mode"
control: "Accessibility — Enter/Space activation"
action: "When focus is on a mode button (Active or Deleted), pressing Enter or Space key activates the mode switch. aria-pressed toggles, the correct API fires, and the table updates. Works for both directions."
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Standard Licenses RSL-E"
test_type: "Accessibility"
automation_candidate: true
plan_status: "Reviewed"
script_status: "not-generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that pressing Enter or Space on a focused mode button activates the mode switch, both from Active to Deleted and from Deleted to Active.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected.

# Test Data

Use Playwright keyboard simulation. Monitor network requests to verify API calls.

# Steps and Expected Results

1. Action: In Active mode (default), press Tab to move focus to the Deleted button.
   Expected Result: Deleted button focused; focus ring visible.

2. Action: Press Enter on the focused Deleted button.
   Expected Result: Mode switch initiated via keyboard.

3. Action: Wait for the `GET /api/report/allstandarddeleted?page=0&size=500` request to fire and complete.
   Expected Result: Deleted API fires; Deleted view loads.

4. Action: Assert Deleted now has `aria-pressed="true"` and Active has `aria-pressed="false"`.
   Expected Result: Toggle state updated correctly.

5. Action: Assert toolbar shows "433 records".
   Expected Result: Deleted data loaded via keyboard activation.

6. Action: Now Tab to the Active button and press Space.
   Expected Result: Mode switch initiated via Space key.

7. Action: Wait for `GET /api/report/allstandardlicenses?page=0&size=10` to fire and complete.
   Expected Result: Active API fires; Active view loads.

8. Action: Assert Active now has `aria-pressed="true"`, Deleted has `aria-pressed="false"`, toolbar shows "2,699 records".
   Expected Result: Active mode restored via Space key activation.

# Network Verification

- Enter activation triggers the target mode's API request.
- Space activation triggers the target mode's API request.

# Expected Final Result

Both Enter and Space keys activate the mode switch when a mode button is focused; the correct API fires, aria-pressed updates, and the view switches for both directions.

# Classification

- Read-only
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP