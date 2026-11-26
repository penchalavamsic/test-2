---
test_id: "LIMAS-SUD-1743"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Report Card\" → \"Selection State\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Report Card"
action: "Selection State"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Configurations RFC-A"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-shell.spec.ts"
---

# Purpose

Verify that clicking the Floating Configurations card sets aria-pressed="true", deselects sibling cards, and the Reports heading remains visible with the route staying at /reports.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Reports page with no card selected.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to /reports and verify the heading "Reports" is visible.
   Expected Result: Page heading "Reports" is present. No card is currently selected.

2. Action: Click the Floating Configurations card.
   Expected Result: aria-pressed="true" on the Floating Configurations card. Standard Licenses and Floating Licenses cards have aria-pressed="false".

3. Action: Verify the page heading and route.
   Expected Result: The "Reports" heading remains visible. The current route is /reports.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Selecting Floating Configurations sets aria-pressed="true" on that card only, keeps sibling cards unpressed, and preserves the Reports heading and /reports route.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending