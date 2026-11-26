---
test_id: "LIMAS-SUD-1858"
title: "To verify Clear all removes applied filter chips"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Filters"
control: "Clear All Button"
action: "Clear Chips"
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

Verify clicking "Clear all" removes all applied filter chips from the page.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations group-selection page showing the group-selection tree.

# Test Data

Use environment variables and the authenticated fixture. No static filter values.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations group-selection page, select a runtime leaf group, and confirm the configuration list loads.
   Expected Result: The configuration list view is displayed.

2. Action: Open the filters panel, select the "Available" radio under Checkout Availability, and click Apply Filters.
   Expected Result: A "Checkout: Available" filter chip appears on the page.

3. Action: Click the "Clear all" button.
   Expected Result: All filter chips are removed from the page.

4. Action: Verify the configuration cards are visible again (filters removed).
   Expected Result: At least one configuration card is visible.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Clicking "Clear all" removes all applied filter chips and restores the unfiltered configuration list.

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