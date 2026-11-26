---
test_id: "LIMAS-SUD-1750"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Toolbar\" → \"Toolbar Group Order\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Toolbar"
action: "Toolbar Group Order"
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

Verify the toolbar contains, in order: record count element, Configuration mode group, Filters button, and Export Excel button. Layout is visually consistent.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Inspect the toolbar child elements in DOM order.
   Expected Result: The first element is the record count display.

2. Action: Verify the element after the record count.
   Expected Result: The Configuration mode group with accessible name "Configuration mode".

3. Action: Verify the element after the mode group.
   Expected Result: The Filters button.

4. Action: Verify the element after the Filters button.
   Expected Result: The Export Excel button.

5. Action: Confirm visual layout consistency.
   Expected Result: All four toolbar sections are on one line or consistently wrapped; no misalignment.

# Network Verification

No API verification needed for this plan.

# Expected Final Result

The toolbar renders in order: record count, Configuration mode group, Filters button, Export Excel button, with a consistent layout.

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