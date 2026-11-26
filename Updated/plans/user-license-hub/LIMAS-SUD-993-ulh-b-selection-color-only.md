---
test_id: "LIMAS-SUD-993"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Selection\" → \"Selection Is Color-Only With No Programmatic Exposure\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Selection"
action: "Selection Is Color-Only With No Programmatic Exposure"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-selection-semantics.spec.ts"
---

# Purpose

Verify that selection state is communicated only through color (box-shadow green ring) with zero programmatic exposure — no ARIA, no data attributes, no role, no focus change.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: User cards loaded, first card auto-selected.

2. Action: Assert that the selected card has no: `aria-selected`, `aria-pressed`, `data-state`, `role`, `aria-expanded`, `aria-checked`.
   Expected Result: All are null/absent.

3. Action: Assert that the selected card's only differentiating property is its computed box-shadow containing `rgb(188, 255, 71)`.
   Expected Result: Box-shadow is the only observable difference between selected and unselected cards.

4. Action: Click another card and repeat assertions.
   Expected Result: New card's box-shadow contains green; all ARIA/data checks remain null.

# Network Verification

No API requests.

# Expected Final Result

Selection is communicated purely through color (green box-shadow ring). No programmatic state is exposed to assistive technology or scripts.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode user names, emails, groups, or card indexes.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: selection is color-only — green ring box-shadow with no programmatic exposure.