---
test_id: "LIMAS-SUD-1752"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Filters\" → \"Filter Panel Shell\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Filters"
action: "Filter Panel Shell"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Configurations RFC-A"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-shell.spec.ts"
---

# Purpose

Verify the open filter panel has heading "Filters", contains 8 filter controls, includes a Clear button, uses a grid layout, and places labels above inputs.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Filter panel is opened.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Open the Filters panel and verify the heading.
   Expected Result: Heading "Filters" is visible.

2. Action: Count the filter control elements in the panel.
   Expected Result: Exactly 8 filter controls are present.

3. Action: Verify the Clear button exists in the panel.
   Expected Result: A button with accessible name "Clear" is present.

4. Action: Inspect the layout of filter controls.
   Expected Result: Controls are arranged in a grid layout. Labels appear above their corresponding inputs.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The filter panel has a "Filters" heading, 8 filter controls, a Clear button, grid layout, and labels above inputs.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending