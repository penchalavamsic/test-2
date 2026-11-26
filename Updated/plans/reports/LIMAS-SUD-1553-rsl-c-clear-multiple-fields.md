---
test_id: "LIMAS-SUD-1553"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Clear Button\" → \"Clear with multiple filters resets all RSL-C filters, Profile Role disables, no duplicate requests\""
module: "Reports"
page: "Reports"
section: "Clear Button"
control: "Multiple Fields"
action: "Clear with multiple filters populated resets all RSL-C filters, Profile Role clears and disables, unfiltered data returns, no duplicate reset requests"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Reports Standard Licenses RSL-C"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "not-generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that clicking the Clear button when multiple RSL-C filters are active resets Email, Hardware IDs, User Group, Product Profile, and Profile Role; clears all filter chips; disables Profile Role; restores unfiltered data; and does not send duplicate reset requests.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected and the filter panel is expanded.
- Multiple RSL-C filters are applied: Email (`{runtimeEmail}`), User Group (`{runtimeUserGroup}`), Product Profile (`{runtimeProfile}`), and Profile Role (`{runtimeRole}`).

# Test Data

Use `{runtimeEmail}`, `{runtimeUserGroup}`, `{runtimeProfile}`, `{runtimeRole}` as the applied filter values.

# Steps and Expected Results

1. Action: Apply Email, User Group, Product Profile, and Profile Role filters; verify active filter chips are visible and Profile Role is enabled.
   Expected Result: Multiple active filters with chips visible.

2. Action: Start network monitoring, then click the Clear button.
   Expected Result: A single reset request fires.

3. Action: Assert the Email input is empty.
   Expected Result: Email cleared.

4. Action: Assert the User Group, Product Profile, and Profile Role comboboxes are empty/cleared.
   Expected Result: All RSL-C controls are reset.

5. Action: Assert the Profile Role control is disabled.
   Expected Result: Profile Role returns to disabled state.

6. Action: Assert all filter chips are removed.
   Expected Result: No active filter chips visible.

7. Action: Assert unfiltered total and loaded counts are restored.
   Expected Result: Original data and counts return.

8. Action: Assert only a single request was sent (no duplicate reset requests).
   Expected Result: One reset request, not multiple.

# Network Verification

- A single request fires after Clear without any RSL-C filter fields in the body.
- Response returns the full unfiltered result.

# Expected Final Result

Clear resets all RSL-C filters simultaneously, disables Profile Role, restores unfiltered data, and sends exactly one reset request.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode filter values or counts.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending