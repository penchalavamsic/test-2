---
test_id: "LIMAS-SUD-1808"
title: "To verify navigation to Floating License Configurations via sidebar"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Navigation"
control: "Sidebar Link"
action: "Navigation"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Floating License Configurations FLC-A"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts"
---

# Purpose

Verify that clicking the Floating License Configurations sidebar link navigates to the correct route /floating-license-configurations.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Authenticate as SUPER_USER_ADMIN_USER and open the sidebar navigation.
   Expected Result: Sidebar is visible with the Floating License Configurations link present.

2. Action: Click the "Floating License Configurations" sidebar link.
   Expected Result: The browser navigates to the Floating License Configurations page.

3. Action: Assert the current page URL pathname.
   Expected Result: URL pathname matches `/floating-license-configurations`.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Clicking the Floating License Configurations sidebar link navigates the user to `/floating-license-configurations`.

# Classification

- Read-only
- Positive
- Navigation

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending