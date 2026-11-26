---
test_id: "LIMAS-SUD-863"
title: "To verify the functionality of \"System User Dashboard\" → \"Floating Licenses\" → \"Summary Card\" → \"Card Keyboard Focus and Selection State\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Floating Licenses"
control: "Summary Card"
action: "Card Keyboard Focus and Selection State"
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

Verify that the Floating Licenses summary card is keyboard-focusable and communicates pressed/selection state.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard loaded and fully rendered.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to the dashboard, verify the Floating Licenses card has tabIndex=0 (is keyboard-focusable).
   Expected Result: The card is in the tab order.

2. Action: Verify the card is enabled (not disabled).
   Expected Result: The card is enabled.

3. Action: Verify the card has aria-pressed attribute.
   Expected Result: aria-pressed is present and reflects selection state.

# Network Verification

- Request URL: N/A
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Card is focusable, enabled, and supports pressed state.

# Expected Final Result

The Floating Licenses card is keyboard-focusable (tabIndex=0), enabled, and uses aria-pressed for selection.

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