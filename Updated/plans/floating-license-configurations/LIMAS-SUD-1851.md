---
test_id: "LIMAS-SUD-1851"
title: "To verify no-match search shows zero visible cards"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Search"
control: "Search Textbox"
action: "No-Match State"
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

Verify searching for a non-existent configuration name results in zero visible configuration cards.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations group-selection page showing the group-selection tree.

# Test Data

Use environment variables and the authenticated fixture. The search term is a fixed non-existent string: "zzz_no_such_config_xyz".

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations group-selection page, select a runtime leaf group, and confirm the configuration list loads.
   Expected Result: The configuration list view is displayed with at least one visible configuration card.

2. Action: Open the search textbox.
   Expected Result: The search input is available.

3. Action: Type "zzz_no_such_config_xyz" into the search textbox.
   Expected Result: The search input contains the typed term.

4. Action: Count the number of visible configuration cards on the page.
   Expected Result: The visible configuration card count is 0.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Searching for a term matching no configuration results in zero visible configuration cards.

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