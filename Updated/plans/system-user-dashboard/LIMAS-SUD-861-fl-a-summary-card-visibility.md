---
test_id: "LIMAS-SUD-861"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Summary Card\" → \"Card Visibility\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Summary Card"
action: "Card Visibility"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/floating-licenses/floating-licenses-summary-card.spec.ts"
---

# Purpose

Verify that the Floating Licenses summary card is visible in the System User Dashboard summary section.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard loaded and fully rendered.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the System User Dashboard and wait for full render.
   Expected Result: The Floating Licenses summary card is visible in the summary cards section.

2. Action: Verify the card is a button with role "button".
   Expected Result: The element has role "button" and matches the "Floating Licenses" accessible name.

# Network Verification

- Request URL: N/A
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Floating Licenses card is visible among the summary cards.

# Expected Final Result

The Floating Licenses summary card is visible and accessible as a button.

# Classification

- Read-only
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