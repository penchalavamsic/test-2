---
test_id: "LIMAS-SUD-2009"
title: "Sidebar navigation to SLC"
module: "Standard License Configurations"
page: "Standard License Configurations"
section: "Page Shell"
control: "Sidebar Navigation"
action: "Verify"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Standard License Configurations SLC-A"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/standard-license-configurations/standard-license-configurations-data.spec.ts"
---

# Purpose

Verify clicking the sidebar link navigates to the SLC page.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- `SUPER_USER_ADMIN_USER` credentials are configured.
- User is authenticated and on the Standard License Configurations page.

# Test Data

No fixed test data required. Use environment variables and runtime values only.

# Steps and Expected Results

1. Login.

2. Click Standard License Configurations link.

3. Verify page loads with heading.

Expected: Page heading visible.

# Network Verification

No data-changing requests expected. Verify GET-only pattern for SLC API.

# Expected Final Result

Page heading visible.

# Classification

- Read-only
- Positive
- UI Interaction

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not hardcode product names, roles, dates, license counts, or configuration IDs.
- Do not use `nth()` to select a card by business identity.
- Do not create, edit, or delete any configuration.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending
