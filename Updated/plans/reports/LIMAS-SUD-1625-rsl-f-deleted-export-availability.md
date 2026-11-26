---
test_id: "LIMAS-SUD-1625"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Deleted View Toolbar\" → \"Export Excel Button\" → \"Deleted-view export availability\""
module: "Reports"
page: "Reports"
section: "Deleted View Toolbar"
control: "Export Excel Button"
action: "Deleted-view export availability"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Standard Licenses RSL-F"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: ""
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Switch to the Deleted view, clear all filters, and observe the Export button state. Determine whether the Deleted view uses the same or a different export endpoint/mode.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to Reports → Standard Licenses → Active view.
- Deleted tab is present and clickable.

# Test Data

Switch to the Deleted tab. Clear any filters that persist from Active view. Use `page.getByRole('button', { name: 'Export Excel' })`.

# Steps and Expected Results

1. Action: Switch to the Deleted tab.
   Expected Result: The Deleted view loads with its data table.

2. Action: Clear any filters that may have carried over.
   Expected Result: The loaded-total reflects the unfiltered Deleted count.

3. Action: Observe the Export Excel button presence and state.
   Expected Result: The button is either present (enabled/disabled) or absent entirely. Document the observed state.

4. Action: If present, inspect the export request endpoint (trigger or inspect via network).
   Expected Result: Determine if the endpoint differs from the Active export endpoint or if a mode parameter distinguishes Deleted exports.

# Network Verification

- If export is available: inspect request URL, method, and any mode/deleted parameter.
- Compare to Active export request structure.

# Expected Final Result

The availability and behavior of the Export button in the Deleted view is documented, including whether it uses a distinct endpoint or mode.

# Classification

- Read-only (observation)
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode endpoints or parameter names.
- Do not export repeatedly; one observation export is sufficient.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending

# Dynamic Plan Rules

1. Use only behavior verified through Playwright MCP.
2. Verify one atomic behavior per plan.
3. Do not hardcode application URLs.
4. Do not hardcode usernames or passwords.
5. Do not hardcode counts, emails, hardware IDs, groups, profiles, roles, dates, or filenames.
6. Use runtime placeholders: `{runtimeBaseTotal}`, `{runtimeFilteredTotal}`, `{runtimeExportedRows}`, `{runtimeFilename}`, `{runtimeSheetName}`, `{runtimeDate}`, `{runtimeProfile}`, `{runtimeRole}`, `{runtimeEmail}`.