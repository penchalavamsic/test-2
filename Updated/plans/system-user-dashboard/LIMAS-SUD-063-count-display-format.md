---
test_id: "LIMAS-SUD-063"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Count Display" → "Loaded·Total Format Visible"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Count display text (loaded / total format)"
action: "Verify the 'loaded·total pending' format is visible"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "Read-only"
test_type: "Visual"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that the count display in the Pending License Requests section shows a string matching the pattern "{N} loaded·{M} total pending" — for example "147 loaded·147 total pending".

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.

# Test Data

None — counts are verified via pattern matching.

# Steps and Expected Results

1. Action: Navigate to the dashboard and wait for full render.
   Expected Result: The Pending License Requests section is visible with data loaded.

2. Action: Locate the count display text.
   Expected Result: Text matching the pattern `/\d+\s*loaded[·•]\d+\s*total\s+pending/` is visible on the page.

# Expected Final Result

The count display shows the loaded/total format, visible on the page.

# Classification

- Read-only
- Visual

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not hardcode specific counts.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending