---
test_id: "LIMAS-SUD-1014"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Accessibility\" → \"User Cards Not Keyboard Reachable\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Accessibility"
action: "User Cards Not Keyboard Reachable"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Negative"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-selection-accessibility.spec.ts"
---

# Purpose

Verify that user cards are excluded from the tab order — each card has `tabIndex: null` on its container element, meaning keyboard users cannot reach them via Tab navigation.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.

# Test Data

Use environment variables and the authenticated fixture. Runtime DOM inspection.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: User cards rendered, first user auto-selected.

2. Action: Inspect the tabindex attribute on each visible user-card container element.
   Expected Result: All user-card containers have `tabIndex: null` — they are not in the keyboard focus order.

3. Action: Press Tab repeatedly from a known focusable starting point.
   Expected Result: Focus skips user cards entirely; only search inputs and buttons receive focus.

# Network Verification

No API requests.

# Expected Final Result

User cards are not keyboard-reachable — they are excluded from the tab order and cannot be selected via keyboard navigation alone.

# Classification

- Read-only
- Negative
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode user names, emails, groups, or card indexes.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: all user cards have tabIndex=null on their container divs; document.activeElement remains BODY after selection; cards are divs with no role or focusable semantics.