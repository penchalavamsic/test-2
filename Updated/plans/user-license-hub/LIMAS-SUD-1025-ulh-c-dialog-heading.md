---
test_id: "LIMAS-SUD-1025"
title: "To verify the functionality of \"User & License Hub\" → \"User Filters\" → \"Filter Dialog\" → \"Dialog Has Correct Heading\""
module: "User & License Hub"
page: "User & License Hub"
section: "User Filters"
control: "Filter Dialog"
action: "Dialog Has Correct Heading"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-user-filters-dialog.spec.ts"
---

# Purpose

Verify that the filter dialog has an h4 heading with the text "Filter Users".

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub with filter dialog open.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to User & License Hub, wait for load.
   Expected Result: Page loaded.

2. Action: Open the Filters dialog.
   Expected Result: Dialog visible.

3. Action: Read the heading text and level.
   Expected Result: A heading at level 4 with text "Filter Users" is present in the dialog.

# Network Verification

No API requests.

# Expected Final Result

Filter dialog has heading "Filter Users" at level h4.

# Classification

- Read-only
- Positive
- Visual

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode group names.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: dialog heading "Filter Users" h4.