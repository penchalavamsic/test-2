---
test_id: "LIMAS-SUD-056"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Section Subtitle" → "Subtitle Text Visible"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "Subtitle 'License requests awaiting review.'"
action: "Verify subtitle text is visible"
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

Verify that the "Pending License Requests" section displays a subtitle reading "License requests awaiting review."

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard and wait for full render.
   Expected Result: Dashboard is fully rendered with the Pending License Requests card selected.

2. Action: Locate the subtitle element with text "License requests awaiting review."
   Expected Result: The subtitle is visible.

3. Action: Verify the subtitle appears below the section heading.
   Expected Result: The subtitle is positioned after the "Pending License Requests" heading in the DOM order.

# Expected Final Result

The subtitle "License requests awaiting review." is visible below the "Pending License Requests" section heading.

# Classification

- Read-only
- Visual

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not hardcode subtitle text.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending