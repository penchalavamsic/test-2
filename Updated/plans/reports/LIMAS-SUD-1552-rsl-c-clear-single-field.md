---
test_id: "LIMAS-SUD-1552"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Clear Button\" → \"Clear with Email populated resets Email, removes filter chip, restores unfiltered data\""
module: "Reports"
page: "Reports"
section: "Clear Button"
control: "Single Field"
action: "Clear with Email populated resets Email, removes filter chip, restores unfiltered data and counts, date fields unchanged"
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

Verify that clicking the Clear button when only the Email filter is populated resets the Email input, removes the active filter chip, restores unfiltered data and original counts, and leaves date controls unchanged.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is authenticated and navigated to the Reports page.
- Standard Licenses card is selected and the filter panel is expanded.
- An Email filter has been applied with `{runtimeEmail}` and filtered results are displayed.

# Test Data

Use `{runtimeEmail}` as the applied email filter value.

# Steps and Expected Results

1. Action: Apply the Email filter with `{runtimeEmail}`; note the filtered total count.
   Expected Result: Filtered results and an active email filter chip are visible.

2. Action: Click the Clear button.
   Expected Result: A request to restore unfiltered data fires (GET or POST without filter criteria).

3. Action: Assert the Email input value is empty.
   Expected Result: Email field is cleared.

4. Action: Assert the active Email filter chip is removed.
   Expected Result: No filter chip is visible.

5. Action: Assert the total and loaded counts match the original unfiltered values.
   Expected Result: Counts are restored.

6. Action: Assert all date controls (Expiration Date, Maintenance Date, License Created Date, License Modified Date) remain in their default untouched state.
   Expected Result: Date controls are unchanged.

# Network Verification

- After Clear, a request fires without the `email` filter in body.
- Response returns the full unfiltered paginated result.

# Expected Final Result

Clearing a single Email filter resets the input, removes the chip, and restores unfiltered data with original counts.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode email addresses or counts.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending