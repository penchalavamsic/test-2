---
test_id: "LIMAS-SUD-054"
title: 'To verify the functionality of "System User Dashboard" → "Summary Cards" → "Content Section" → "Heading Updates on Card Click"'
module: "system-user-dashboard"
page: "/system-user-dashboard"
section: "Summary Cards"
control: "Section heading below the cards"
action: "Verify the content section heading changes after clicking another summary card"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Read-only"
test_type: "Functional"
automation_candidate: true
plan_status: "reviewed"
script_status: "generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: ""
---

# Purpose

Verify that clicking a different summary card updates the content section heading below the cards — confirming that the card selection drives content visibility. The "Pending License Requests" card shows the "Pending License Requests" heading; clicking "Expiring Licenses" should change the visible heading.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- The user is authenticated on `/system-user-dashboard`.

# Test Data

None — heading text is verified dynamically.

# Steps and Expected Results

1. Action: Navigate to the dashboard and wait for full render.
   Expected Result: The "Pending License Requests" heading (level 3) is visible.

2. Action: Click the "Expiring Licenses" summary card.
   Expected Result: The "Expiring Licenses" summary card now has `aria-pressed="true"`.

3. Action: Observe the content section heading.
   Expected Result: The heading text changes — it no longer reads "Pending License Requests" and instead reflects the Expiring Licenses section.

4. Action: Click the "Pending License Requests" summary card again to restore.
   Expected Result: The "Pending License Requests" heading (level 3) is visible again.

# Expected Final Result

Clicking a summary card updates the content section heading to match the selected card's topic, confirming the card-to-content linkage.

# Classification

- Read-only
- Functional

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not hardcode heading text.
- Do not use static environment-specific data.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending