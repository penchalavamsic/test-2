---
test_id: "LIMAS-SUD-1751"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Filters\" → \"Filters Button Toggle\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Filters"
action: "Filters Button Toggle"
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

Verify the Filters button toggles the filter panel open and closed. Note that no aria-expanded attribute is present (known accessibility gap). The panel slides open and closed, and the "Filters" heading appears when open.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Filter panel starts closed.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Click the Filters button.
   Expected Result: The filter panel slides open. A "Filters" heading appears.

2. Action: Inspect the Filters button for aria-expanded.
   Expected Result: No aria-expanded attribute is present (confirmed accessibility gap).

3. Action: Click the Filters button again.
   Expected Result: The filter panel slides closed. The "Filters" heading is no longer visible.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The Filters button toggles the panel open and closed with a slide animation and a "Filters" heading, though without aria-expanded.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending