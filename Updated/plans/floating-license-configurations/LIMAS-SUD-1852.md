---
test_id: "LIMAS-SUD-1852"
title: "To verify clearing search restores all configuration cards"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Search"
control: "Search Textbox"
action: "Search Clear"
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

Verify clearing the search field restores the original visible configuration card count.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations group-selection page showing the group-selection tree.

# Test Data

Use environment variables and the authenticated fixture. The no-match term is "zzz_no_such_config_xyz".

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations group-selection page, select a runtime leaf group, and confirm the configuration list loads.
   Expected Result: The configuration list view is displayed with visible configuration cards.

2. Action: Record the current number of visible configuration cards.
   Expected Result: A positive integer count is captured at runtime.

3. Action: Open the search textbox and type "zzz_no_such_config_xyz".
   Expected Result: The visible card count drops to 0.

4. Action: Clear the search textbox (e.g., delete all characters or click a clear button).
   Expected Result: The search input is empty.

5. Action: Count the visible configuration cards again.
   Expected Result: The visible card count equals the original count recorded in step 2.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Clearing the search field restores the full list of visible configuration cards matching the original count.

# Classification

- Floating License Configurations FLC-B
- Positive

# Restrictions

- Do not hardcode group names, IDs, or counts. Discover all values at runtime.
- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending