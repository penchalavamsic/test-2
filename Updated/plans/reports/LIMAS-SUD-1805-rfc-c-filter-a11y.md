---
test_id: "LIMAS-SUD-1805"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Deleted Mode\" → \"Filter Accessibility\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Deleted Mode"
action: "Filter Accessibility"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Floating Configurations RFC-C"
test_type: "Accessibility"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-deleted.spec.ts"
---

# Purpose

Verify that all filter controls in Deleted mode have accessible labels, textbox controls have accessible names ("Deleted By", "Created By", "Group Name"), the Clear button is accessible, and the filter state is communicated to assistive technology.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Deleted mode has been selected and fully loaded.
- The Filters panel is open.

# Test Data

Accessibility properties are read from the DOM at runtime.

# Steps and Expected Results

1. Action: Inspect the "Deleted By" textbox for an accessible name.
   Expected Result: The textbox has an accessible name (aria-label, aria-labelledby, or associated label element) conveying "Deleted By".

2. Action: Inspect the "Created By" textbox for an accessible name.
   Expected Result: The textbox has an accessible name conveying "Created By".

3. Action: Inspect the "Group Name" textbox for an accessible name.
   Expected Result: The textbox has an accessible name conveying "Group Name".

4. Action: Inspect the Clear button for an accessible name.
   Expected Result: The Clear button has an accessible name (e.g., "Clear"). Record the runtime accessible name.

5. Action: Verify filter state is communicated.
   Expected Result: When a filter has an active value, the filter state is conveyed (e.g., via aria attributes or visible indicators).

# Network Verification

- No API requests during accessibility inspection.

# Expected Final Result

All Deleted mode filter controls have accessible names, the Clear button is accessible, and filter state is communicated.

# Classification

- Read-only
- Accessibility

# Restrictions

- Do not hardcode accessible names or aria attribute values. Read from the DOM at runtime.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending