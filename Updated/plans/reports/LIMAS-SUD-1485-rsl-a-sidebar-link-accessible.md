---
test_id: "LIMAS-SUD-1485"
title: "To verify the functionality of \"Reports\" → \"Navigation\" → \"Sidebar Link\" → \"Has accessible role and icon\""
module: "Reports"
page: "Reports"
section: "Navigation"
control: "Sidebar Link"
action: "Has accessible role and icon"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Standard Licenses RSL-A"
test_type: "Accessibility"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-standard-licenses-shell.spec.ts"
---

# Purpose

Verify that the Reports sidebar link is visible, enabled, and contains a decorative SVG icon, ensuring it is keyboard- and screen-reader reachable.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the System User Dashboard.

# Test Data

Use environment variables and the sidebar link locator: `page.locator('a[href="/reports"]')`.

# Steps and Expected Results

1. Action: Authenticate and ensure the dashboard is loaded.
   Expected Result: System User Dashboard is visible.

2. Action: Locate the sidebar link with `href="/reports"` and assert it is visible and enabled.
   Expected Result: The sidebar link exists and is interactive.

3. Action: Assert the link contains an SVG child element.
   Expected Result: The SVG icon is visible.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The Reports sidebar link is a visible, enabled anchor with `href="/reports"` containing a decorative SVG icon.

# Classification

- Read-only
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP