---
test_id: "LIMAS-SUD-1720"
title: "To verify the functionality of \"Reports\" → \"Floating Licenses\" → \"Deleted Infinite Scroll\" → \"Loaded Count Update Accessibility\""
module: "Reports"
page: "Reports"
section: "Floating Licenses"
control: "Deleted Infinite Scroll"
action: "Loaded Count Update Accessibility"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Floating Licenses RFL-D"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
execution_status: "Not Run"
ci_cd_execution: "Pending"
healing: "Pending"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/reports/reports-floating-licenses-deleted-infinite-scroll.spec.ts"
---

# Purpose

Verify that loaded/total count updates are announced to assistive technology, newly appended rows are communicated, screen readers are aware of the new content, and the count display text has an accessible name.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Floating Licenses is selected, Deleted mode is activated, initial batch (page=0) has settled, and {runtimeDeletedTotal} > {runtimeLoaded}.

# Test Data

All values read dynamically. Use placeholders: {runtimeLoaded}, {runtimeDeletedTotal}.

# Steps and Expected Results

1. Action: Identify the element that displays the "loaded · total" text and inspect its accessible name or label.
   Expected Result: The count display has an accessible name (e.g., aria-label, aria-labelledby, or text content that is programmatically determinable).

2. Action: Verify the count display is associated with the correct region (toolbar or table summary).
   Expected Result: The count text is positioned within or programmatically linked to the toolbar/table region.

3. Action: Identify the aria-live region that announces updates when data changes.
   Expected Result: An aria-live="polite" region exists that updates when the loaded count changes.

4. Action: Trigger a continuation. Observe whether the live region announces the count change.
   Expected Result: The live region text content updates to reflect the new "loaded · total" values after the continuation settles.

5. Action: Verify that screen readers are made aware of newly appended content.
   Expected Result: The newly appended rows are within the announced region, or the live region message describes the appended content.

6. Action: Verify the loaded count announcement includes the format "{loaded} · {total}" or equivalent.
   Expected Result: The announced text matches or contains the displayed "loaded · total" values.

7. Action: Trigger a second continuation and verify the live region updates again.
   Expected Result: Live region text updates incrementally; each continuation produces a new announcement.

# Network Verification

Observe the continuation requests; live region updates should occur after each response settles.

# Expected Final Result

Count updates are announced: the loaded/total display has an accessible name, an aria-live region communicates count changes and appended content, and screen readers are informed of new rows after each continuation.

# Classification

- Read-only
- Positive
- Accessibility

# Restrictions

- Do not hardcode aria-live text content.
- Do not assume specific screen reader output — verify DOM attributes only.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending