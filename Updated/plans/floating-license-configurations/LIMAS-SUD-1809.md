---
test_id: "LIMAS-SUD-1809"
title: "To verify page heading is 'Floating License Configurations' h1"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Page Shell"
control: "Heading"
action: "Heading Verification"
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

Verify the page heading displays "Floating License Configurations" as an h1 element.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is on the Floating License Configurations page.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to `/floating-license-configurations`.
   Expected Result: Page loads without error.

2. Action: Locate the main page heading element.
   Expected Result: The heading is visible, displays the text "Floating License Configurations", and its tagName is `H1`.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The page renders an h1 element with the exact text "Floating License Configurations".

# Classification

- Read-only
- Positive
- Page Shell

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending