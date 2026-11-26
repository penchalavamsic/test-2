---
test_id: "LIMAS-SUD-1616"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Active View Toolbar\" → \"Export Excel Button\" → \"Export preserves UI state\""
module: "Reports"
page: "Reports"
section: "Active View Toolbar"
control: "Export Excel Button"
action: "Export preserves UI state"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Standard Licenses RSL-F"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "not-generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that triggering an export does not cause page navigation, does not change the selected report type, does not change the active mode, does not alter existing filter state, and does not issue a data-changing request.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to Reports → Standard Licenses → Active view.
- `{runtimeProfile}` filter is applied so state is non-trivial.

# Test Data

Apply `{runtimeProfile}` filter before export. Monitor network for any non-GET requests during and after export.

# Steps and Expected Results

1. Action: Apply a `{runtimeProfile}` filter and note the filter tag and filtered total `{runtimeFilteredTotal}`.
   Expected Result: The filter tag is visible and the loaded-total shows `{runtimeFilteredTotal}`.

2. Action: Click the Export Excel button and wait for download completion.
   Expected Result: The download completes.

3. Action: Assert the page URL has not changed.
   Expected Result: No navigation occurred; the URL is unchanged.

4. Action: Assert the Standard Licenses card remains selected.
   Expected Result: The card is in the selected state.

5. Action: Assert the Active tab/mode remains selected.
   Expected Result: Active mode is still active.

6. Action: Assert the `{runtimeProfile}` filter tag is still present.
   Expected Result: The filter has not been cleared or changed.

7. Action: Verify no POST, PUT, PATCH, or DELETE request was issued during the export.
   Expected Result: Only the export request (GET or POST for download) was made.

# Network Verification

- No data-mutating requests (POST/PUT/PATCH/DELETE) fired.
- Export request is the only additional network activity.

# Expected Final Result

Export does not navigate, change report type, change mode, clear filters, or issue data-changing requests. UI state is fully preserved.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not repeat data-changing submissions.

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