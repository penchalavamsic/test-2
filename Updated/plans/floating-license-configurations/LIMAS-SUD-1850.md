---
test_id: "LIMAS-SUD-1850"
title: "To verify search filters cards by runtime configuration name fragment"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Search"
control: "Search Textbox"
action: "Filtering"
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

Verify typing a runtime-derived name fragment into the search textbox filters the visible configuration cards correctly.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations group-selection page showing the group-selection tree.

# Test Data

Use environment variables and the authenticated fixture. No static configuration names or IDs.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations group-selection page, select a runtime leaf group, and confirm the configuration list loads.
   Expected Result: The configuration list view is displayed with at least one visible configuration card.

2. Action: Capture the title text of the first visible configuration card at runtime.
   Expected Result: A non-empty configuration name string is captured.

3. Action: Open the search textbox and type a substring of the captured title (e.g., the first 3 characters).
   Expected Result: The search input accepts the typed fragment.

4. Action: Verify that the card whose title was captured is still visible in the filtered results.
   Expected Result: The captured configuration card remains visible after filtering.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Searching by a runtime-derived name fragment filters the list such that the matching configuration card is still visible.

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