---
test_id: "LIMAS-SUD-1776"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Filters\" → \"Filter Preservation Across Modes\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Filters"
action: "Filter Preservation Across Modes"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Configurations RFC-B"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-error-deleted.spec.ts"
---

# Purpose

Verify that the filters panel collapsed/empty state is preserved when switching between Active and Deleted modes, the filter panel state is independent of mode, and no filter data from one mode leaks into the other.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: In Active mode, open the Filters panel and verify its collapsed state.
   Expected Result: The Filters panel is collapsed with no active filter values by default.

2. Action: Switch to Deleted mode.
   Expected Result: The Filters panel remains collapsed. No filter data from Active mode is visible in the panel.

3. Action: Switch back to Active mode.
   Expected Result: The Filters panel state (collapsed/empty) is preserved. No filter data from Deleted mode leaks into the Active-mode panel.

4. Action: Verify the filter panel state is independent of mode.
   Expected Result: Opening the panel in either mode shows the same independent state. Mode switching does not alter or carry over filter selections across modes.

# Network Verification

- Active mode: GET report/all
- Deleted mode: GET report/alldeleted
- Filter panel state is UI-only and independent of the current mode's API request.

# Expected Final Result

The filter panel state (collapsed/empty) is preserved and independent across mode switches, with no filter data leaking between Active and Deleted views.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode filter values or panel states.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending