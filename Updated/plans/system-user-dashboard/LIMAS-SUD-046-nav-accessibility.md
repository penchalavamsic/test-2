---
test_id: "LIMAS-SUD-046"
title: 'To verify the functionality of "System User Dashboard" → "Sidebar Navigation" → "Navigation Links" → "Accessibility — Missing Accessible Names"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Sidebar Navigation"
control: "All 11 nav links (items 1–11)"
action: "Document that all nav links lack aria-label, title, and text content"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P3"
classification: "Read-only"
test_type: "Accessibility"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Document that all 11 sidebar navigation links are icon-only with no accessible name — no `aria-label`, no `title` attribute, and no visible text content in the DOM. Labels only appear in React Tooltip components on hover, which are not in the DOM. This is a severe accessibility issue affecting every nav item.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.
- The sidebar dialog is open (after Ctrl+B).

# Test Data

None.

# Steps and Expected Results

1. Action: Navigate to the dashboard, press Ctrl+B to open the sidebar dialog.
   Expected Result: The sidebar dialog is visible with 11 navigation links (items 1–11 in the list).

2. Action: Inspect each of the 11 nav links for `aria-label` attribute.
   Expected Result: None of the 11 links have an `aria-label` attribute.

3. Action: Inspect each of the 11 nav links for `title` attribute.
   Expected Result: None of the 11 links have a `title` attribute.

4. Action: Inspect each of the 11 nav links for visible text content.
   Expected Result: None of the 11 links have text content — they are icon-only (SVG icons wrapped in anchor elements).

5. Action: Verify that each link can still be located by its `href` value and nth-child position.
   Expected Result: All 11 links are locatable via `href` attribute matching their respective routes, and by their position (2nd through 12th `<li>`) within the sidebar list.

# Accessibility Recommendation

All 11 navigation links need `aria-label` attributes. For example:
- `aria-label="System User Dashboard"`
- `aria-label="User Licenses"`
- `aria-label="Reports"`
- `aria-label="Floating License Configurations"`
- `aria-label="Standard License Configurations"`
- `aria-label="Features & Updates"`
- `aria-label="Profile"`
- `aria-label="User Groups"`
- `aria-label="System Users"`
- `aria-label="Server Licensing"`
- `aria-label="Server License Import"`

Without these, screen-reader users cannot identify any navigation target.

# Expected Final Result

All 11 sidebar navigation links have no accessible name. The fallback test strategy uses `href` attribute matching or `nth-child` indexing to locate each link.

# Classification

- Read-only
- Accessibility

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not repeat data-changing submissions.
- Do not use static environment-specific data.
- Do not modify LIMAS source code.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending