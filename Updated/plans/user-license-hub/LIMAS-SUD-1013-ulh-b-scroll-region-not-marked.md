---
test_id: "LIMAS-SUD-1013"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Accessibility\" → \"User Panel Scroll Region Not Marked\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Accessibility"
action: "User Panel Scroll Region Not Marked"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P3"
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

Verify that the user panel scroll container is not marked as a scrollable region for assistive technology — no `role="region"` with `aria-label`, no `tabindex="0"`, no `role="listbox"` or similar.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: User panel loaded with cards.

2. Action: Inspect the user panel scroll container for accessibility markings.
   Expected Result: The scroll container has no `role="region"`, no `aria-label`, no `aria-labelledby`, no `tabindex`. It is a plain `div` with `overflow-y: auto` but no semantic scroll-region annotation.

# Network Verification

No API requests.

# Expected Final Result

The user panel scroll region is not marked for assistive technology — screen readers cannot identify it as a scrollable region.

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

- Live UI observation via Playwright MCP: user panel scroll region not marked as such; no role/aria-label on scroll container.