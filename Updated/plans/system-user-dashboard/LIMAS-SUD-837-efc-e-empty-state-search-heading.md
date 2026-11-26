---
test_id: "LIMAS-SUD-837"
title: "To verify the functionality of \"System User Dashboard\" → \"Expiring Floating Configurations\" → \"Search Behavior\" → \"Empty State Search Heading\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Expiring Floating Configurations"
control: "Search Behavior"
action: "Empty State Search Heading"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-837-efc-e-empty-state-search-heading.spec.ts"
---

# Purpose

Verify that after filling the search, the heading "No matching configurations" appears.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard loaded, EFC section selected, Expiration radio checked, zero-data state visible.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to dashboard, click EFC card, wait for initial EFC load, fill search with "test".
   Expected Result: The text "No matching configurations" is visible.

# Network Verification

- Request URL: N/A
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: The "No matching configurations" heading is displayed.

# Expected Final Result

"No matching configurations" heading appears after search with no matches.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not repeat data-changing submissions.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation