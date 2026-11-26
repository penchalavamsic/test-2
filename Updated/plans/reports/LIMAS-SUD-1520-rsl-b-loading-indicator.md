---
test_id: "LIMAS-SUD-1520"
title: "To verify the functionality of \"Reports\" → \"Standard Licenses\" → \"Infinite Scroll\" → \"Loading indicator behavior during append\""
module: "Reports"
page: "Reports"
section: "Standard Licenses Infinite Scroll"
control: "Loading Indicator"
action: "Behavior inspected during append"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Reports Standard Licenses RSL-B"
test_type: "Positive"
automation_candidate: true
plan_status: "draft"
script_status: "not-generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Inspect the loading indicator type, location, and visibility during the additional batch load.

# Preconditions

- Initial batch visible.
- Additional load can be triggered.

# Test Data

Use `ReportsPage.getStandardLicenseLoadingIndicator()` to locate the indicator element.

# Steps and Expected Results

1. Action: Before triggering, check for a visible loading indicator.
   Expected Result: No stale loading indicator visible.

2. Action: Trigger the additional load and immediately inspect the DOM for a loading indicator.
   Expected Result: If a loading indicator exists, document its type (spinner, skeleton, progress bar), location (inline, at bottom of table, overlay), and whether `aria-busy` is present on the table or container.

3. Action: After the request settles, verify the loading indicator is no longer visible.
   Expected Result: No loading indicator remains. No stale loading row.

4. Action: If the indicator is too transient to observe, document it as unobserved without adding fixed waits.
   Expected Result: Finding documented honestly.

5. Action: Verify existing rows remained visible during the load.
   Expected Result: Existing rows still present in the DOM after the append.

# Network Verification

No API verification beyond the existing request tracking.

# Expected Final Result

Loading indicator behavior documented. No stale indicator remains after load completes.

# Classification

- Read-only
- Positive

# Restrictions

- Do not add fixed waits or `sleep()` to observe the indicator.
- Do not delay the backend.

# Generation Status

- Test script generation: Pending
- CI/CD execution: Pending
- Healing: Pending