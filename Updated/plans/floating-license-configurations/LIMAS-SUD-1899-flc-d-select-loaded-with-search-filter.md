---
test_id: "LIMAS-SUD-1899"
title: "Select loaded scopes to search-filtered cards"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "Select Loaded and Clear"
control: "Select Loaded Button"
action: "Select loaded with search filter"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Floating License Configurations FLC-D"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/floating-license-configurations/floating-license-configurations-bulk-actions.spec.ts"
---

# Purpose

Verify that Select Loaded only selects cards that match the current search filter.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and on the Floating License Configurations page.
- A runtime group with configurations is selected.
- At least one configuration card is visible.

# Test Data

Use environment variables and the authenticated fixture. No hardcoded group names, card names, or counts.

# Steps and Expected Results

1. Action: Navigate to the Floating License Configurations page and select a runtime group.
   Expected Result: Page loads, all visible card titles are obtained.

2. Action: If no cards are visible, exit the test early.
   Expected Result: Test exits cleanly.

3. Action: Apply a search filter using a substring of the first card's title to narrow the visible set.
   Expected Result: Only cards matching the search fragment are visible.

4. Action: If the filter results in zero cards, clear the search and exit.
   Expected Result: Test exits cleanly with no false failure.

5. Action: Select one of the filtered cards, then click Select Loaded.
   Expected Result: Toolbar is active and Select Loaded is clicked.

6. Action: Read the selection count.
   Expected Result: The selection count equals the number of filtered visible cards only.

7. Action: Clear all selections, clear the search filter, and close search.
   Expected Result: State is fully restored.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

Select Loaded scopes its selection to only the cards currently visible under the active search filter.

# Classification

- Read-only
- Positive
- UI Interaction

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.
- Do not hardcode group names, card names, or counts.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending