---
test_id: "LIMAS-SUD-1009"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Accessibility\" → \"Cards Lack Accessible Name On Container\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Accessibility"
action: "Cards Lack Accessible Name On Container"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-selection-accessibility.spec.ts"
---

# Purpose

Verify that user card containers have no accessible name (no `aria-label`, no `aria-labelledby` on the outer card div) — only the inner h3 provides name content but the card container itself is unnamed.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: User cards loaded.

2. Action: Inspect the outermost card container element (the div with `rounded-lg border bg-card`) for `aria-label`, `aria-labelledby`, and any `title` attribute.
   Expected Result: None of `aria-label`, `aria-labelledby`, or `title` are present on the card container.

3. Action: Verify that an h3 exists inside the card providing textual content.
   Expected Result: h3 is present with the user's name, but the card container itself is not named for accessibility.

# Network Verification

No API requests.

# Expected Final Result

User card containers lack accessible names — the h3 provides content but the container has no ARIA labelling, making cards invisible to screen readers as named interactive elements.

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

- Live UI observation via Playwright MCP: cards have no role, no aria-selected, no accessible name on container; h3 provides name content.