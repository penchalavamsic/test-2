---
test_id: "LIMAS-SUD-1967"
title: "After closing details, config list returns to clean state"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Safe Restoration"
control: "Clean State"
action: "Verify"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Floating License Configurations FLC-F"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/floating-license-configurations/floating-license-configurations-view-details.spec.ts"
---

# Purpose

Verify after closing the details panel, the config list is in a clean state.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations page.
- A runtime group with at least one configuration is selected.

# Test Data

Use environment variables and the authenticated fixture. No hardcoded group names, card names, or values.

# Steps and Expected Results

1. Navigate to FLC page and select a runtime group.

2. Open View Details for the first card.

3. Close the panel via Close button.

4. Verify heading is visible.

5. Verify user group summary panel is visible.

6. Verify details panel is not visible.

Expected: Config list in clean state; no details panel visible.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Config list in clean state; no details panel visible.

# Classification

- Read-only
- Positive
- UI Interaction

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.
- Do not hardcode group names, card names, or values.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending
