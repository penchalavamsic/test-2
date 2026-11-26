---
test_id: "LIMAS-SUD-841"
title: "To verify the functionality of \"System User Dashboard\" → \"Expiring Floating Configurations\" → \"Search Behavior\" → \"Default Heading After Clear\""
module: "System User Dashboard"
page: "System User Dashboard"
section: "Expiring Floating Configurations"
control: "Search Behavior"
action: "Default Heading After Clear"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Positive"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/system-user-dashboard/LIMAS-SUD-841-efc-e-default-heading-after-clear.spec.ts"
---

# Purpose

Verify that clearing the search restores the heading "No expiring floating configurations found".

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- Dashboard loaded, EFC section selected, Expiration radio checked, zero-data state visible.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Navigate to dashboard, click EFC card, wait for initial EFC load, fill search with "test", then clear it.
   Expected Result: "No expiring floating configurations found" is visible.

# Network Verification

- Request URL: N/A
- HTTP Method: N/A
- Expected Status: N/A
- Payload Presence: N/A
- Visible UI Result: Default heading is restored.

# Expected Final Result

Default heading is restored after clearing search.

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