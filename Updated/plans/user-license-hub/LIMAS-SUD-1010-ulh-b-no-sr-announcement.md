---
test_id: "LIMAS-SUD-1010"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"Accessibility\" → \"No Screen-Reader Announcement On Selection Change\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "Accessibility"
action: "No Screen-Reader Announcement On Selection Change"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
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

Verify that changing user selection produces no live-region announcement — no `aria-live` region or `role="status"`/`role="alert"` element updates to inform screen readers of the selection change.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: User cards loaded.

2. Action: Check for any `[aria-live]` elements on the page.
   Expected Result: No `aria-live` regions present, or if present, they are empty/unrelated to user selection.

3. Action: Click a different user card.
   Expected Result: No new text content appears in any container that would serve as a live announcement for the selection change. No `role="status"` or `role="alert"` element updates.

# Network Verification

No API requests.

# Expected Final Result

Selection changes produce no screen-reader announcement — the UI relies entirely on visual feedback.

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

- Live UI observation via Playwright MCP: no screen-reader announcements for selection changes; selection is color-only.