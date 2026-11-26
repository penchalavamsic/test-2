---
test_id: "LIMAS-SUD-862"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Summary Card\" → \"Card Accessible Name\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Summary Card"
action: "Card Accessible Name"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Accessibility"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/floating-licenses/floating-licenses-summary-card.spec.ts"
---

# Purpose

Verify that the Floating Licenses summary card accessible name is "0Floating Licenses" — without space between the count and label.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard loaded and fully rendered.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the System User Dashboard and wait for full render.
   Expected Result: The Floating Licenses summary card is visible.

2. Action: Read the accessible name of the card button.
   Expected Result: The accessible name matches the pattern /Floating Licenses/ via getByRole.

# Network Verification

- Request URL: N/A
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Card accessible name is derived from text content "0Floating Licenses".

# Expected Final Result

The Floating Licenses card has an accessible name matching "Floating Licenses".

# Classification

- Accessibility
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP