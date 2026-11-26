---
test_id: "LIMAS-SUD-944"
title: "To verify the functionality of \"User & License Hub\" → \"User List\" → \"User Card\" → \"Card Structure\""
module: "User & License Hub"
page: "User & License Hub"
section: "User List"
control: "User Card"
action: "Card Structure"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-user-list.spec.ts"
---

# Purpose

Verify that each user card renders the expected structural elements: name (h3), email, group, license-count badge, edit button, and delete button.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with user cards loaded.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub and wait for user load.
   Expected Result: User cards are rendered.

2. Action: Inspect the first visible user card.
   Expected Result: The card contains an h3 (name), at least one paragraph (email), a group paragraph, a license-count badge, an Edit button, and a Delete button.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Every user card has a consistent structure with name heading, email, group, license badge, and action buttons.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not hardcode user names, emails, groups, or license counts.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP