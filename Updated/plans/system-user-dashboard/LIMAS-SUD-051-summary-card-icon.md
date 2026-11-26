---
test_id: "LIMAS-SUD-051"
title: 'To verify the functionality of "System User Dashboard" → "Summary Cards" → "Card Content" → "Lucide SVG Icon Present"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Summary Cards"
control: "SVG icon inside each card"
action: "Verify each card contains a Lucide SVG icon"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P3"
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

Verify that each of the 4 summary cards contains a Lucide SVG icon (an `<svg>` element inside the button).

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard and wait for full render.
   Expected Result: All 4 summary cards are visible.

2. Action: For each summary card button, locate the nested `svg` element.
   Expected Result: Each card contains exactly one `svg` element.

3. Action: Verify each `svg` is visible.
   Expected Result: All 4 SVG icons are visible.

# Expected Final Result

Each summary card contains a visible Lucide SVG icon.

# Classification

- Read-only
- Visual

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not hardcode icon names or class attributes.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending