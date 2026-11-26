---
test_id: "LIMAS-SUD-055"
title: 'To verify the functionality of "System User Dashboard" → "Pending License Requests" → "Section Heading" → "Heading Level 3 Visible"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Pending License Requests"
control: "h3 heading 'Pending License Requests'"
action: "Verify heading level 3 with text 'Pending License Requests' is visible"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
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

Verify that the "Pending License Requests" section has a visible heading of level 3 with the exact text "Pending License Requests".

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard and wait for full render.
   Expected Result: Dashboard is fully rendered.

2. Action: Locate the heading with role="heading", level=3, and name "Pending License Requests".
   Expected Result: The heading is found and visible.

3. Action: Verify the heading is inside the main content area.
   Expected Result: The heading is within `<main>` or the visible content section.

# Expected Final Result

A level-3 heading reading "Pending License Requests" is visible in the content area.

# Classification

- Read-only
- Visual

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not hardcode heading text that may be environment-specific.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending