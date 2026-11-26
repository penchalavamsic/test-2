---
test_id: "LIMAS-SUD-1853"
title: "To verify search is case-insensitive with mixed-case input"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Search"
control: "Search Textbox"
action: "Case Insensitivity"
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

Verify search filtering is case-insensitive. A runtime card title fragment entered in mixed case still matches the original card.

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

3. Action: Produce a mixed-case version of a substring of the captured title (e.g., take the first 4 characters and alternate case: "AbCd").
   Expected Result: The mixed-case string differs from the original casing of the fragment.

4. Action: Open the search textbox and type the mixed-case fragment.
   Expected Result: The search input contains the mixed-case term.

5. Action: Verify the configuration card whose title was captured in step 2 is still visible in the filtered results.
   Expected Result: The original card remains visible despite the case difference.

6. Action: Clear the search textbox.
   Expected Result: The search input is empty.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Search filtering is case-insensitive; a runtime card title fragment entered in mixed case still matches and shows the original card.

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