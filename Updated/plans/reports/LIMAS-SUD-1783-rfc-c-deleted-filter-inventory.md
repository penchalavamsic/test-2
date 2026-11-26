---
test_id: "LIMAS-SUD-1783"
title: "To verify the functionality of \"Reports\" → \"Floating Configurations\" → \"Deleted Mode\" → \"Filter Controls Inventory\""
module: "Reports"
page: "Reports"
section: "Floating Configurations"
control: "Deleted Mode"
action: "Filter Controls Inventory"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Floating Configurations RFC-C"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-configurations-deleted.spec.ts"
---

# Purpose

Verify that Deleted mode presents exactly 3 filter controls — Deleted By (textbox with placeholder "Enter deleted by"), Created By (textbox with placeholder "Enter created by"), and Group Name (textbox with placeholder "Enter group name") — and that this set differs from Active mode's 8 filters.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated on the Reports page with Floating Configurations selected.
- Deleted mode has been selected and fully loaded.

# Test Data

Filter control labels and placeholders are read from the DOM at runtime.

# Steps and Expected Results

1. Action: Open the Filters panel in Deleted mode.
   Expected Result: The Filters panel is visible and expanded.

2. Action: Count and identify the filter controls.
   Expected Result: Exactly 3 filter controls are present: "Deleted By", "Created By", and "Group Name".

3. Action: Verify each filter's input type and placeholder.
   Expected Result: Each filter is a textbox. "Deleted By" has placeholder "Enter deleted by". "Created By" has placeholder "Enter created by". "Group Name" has placeholder "Enter group name".

4. Action: Verify all 3 filters are visible and enabled.
   Expected Result: Each filter control is visible on screen and in an enabled (interactive) state.

5. Action: Compare with Active mode's filter inventory.
   Expected Result: The 3 Deleted-mode filters are different from Active mode's 8 filters (User Group, Product Profile, Profile Role, Feature, Feature Version, Expiration Date, System User, Maintenance Date).

# Network Verification

- No additional API requests are expected during filter panel inspection.
- Filters are already loaded from the Deleted mode page state.

# Expected Final Result

Deleted mode has exactly 3 textbox filters (Deleted By, Created By, Group Name), all visible and enabled, and distinct from Active mode's filter set.

# Classification

- Read-only
- Positive

# Restrictions

- Do not hardcode filter labels, placeholders, or counts. Read from the DOM at runtime.
- Do not include credentials, tokens, cookies, or sensitive payloads.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending