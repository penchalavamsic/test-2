---
test_id: "LIMAS-SUD-1854"
title: "To verify closing Search restores all configuration cards"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Search"
control: "Search Close Button"
action: "Search Close Restoration"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Floating License Configurations FLC-B"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/floating-license-configurations/floating-license-configurations-list-controls.spec.ts"
---

# Purpose

Verify that clicking Close on the search bar restores the original visible configuration card count even if a no-match term was typed.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations group-selection page showing the group-selection tree.

# Test Data

Use environment variables and the authenticated fixture. The no-match term is "zzz_no_such_config_xyz".

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations group-selection page, select a runtime leaf group, and confirm the configuration list loads.
   Expected Result: The configuration list view is displayed with at least one visible configuration card.

2. Action: Record the current number of visible configuration cards.
   Expected Result: A positive integer count is captured at runtime.

3. Action: Open the search textbox and type "zzz_no_such_config_xyz".
   Expected Result: The visible card count drops to 0.

4. Action: Click the Close button on the search bar.
   Expected Result: The search bar closes, and the search input is cleared.

5. Action: Count the visible configuration cards on the page.
   Expected Result: The visible card count equals the original count recorded in step 2.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Closing the search bar after typing a no-match term restores the full original set of visible configuration cards.

# Classification

- Floating License Configurations FLC-B
- Positive

# Restrictions

- Do not hardcode group names, configuration names, IDs, or counts. Discover all values at runtime.
- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending