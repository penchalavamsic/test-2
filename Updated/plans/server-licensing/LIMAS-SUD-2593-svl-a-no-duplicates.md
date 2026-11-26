---
test_id: "LIMAS-SUD-2593"
title: "svl-a-no-duplicates"
module: "Server License Management"
page: "Server License Management"
section: "SVL-A"
control: "Customer Cards"
action: "Verify"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Server License Management SVL-A"
test_type: "Read-only"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/server-licensing/server-licensing-shell.spec.ts"
---

# Purpose

Verify no two cards share the same customer name.

# Preconditions

- ${'$'}{LIMAS_BASE_URL} is reachable.
- SUPER_USER_ADMIN_USER credentials are configured.
- User is authenticated and on the Server License Management page.

# Test Data

No fixed test data required. Use runtime-discovered values only. Do not hardcode customer names, server-license names, license types, statuses, counts, card positions, IDs, or API values.

# Steps and Expected Results

1. Login with SUPER_USER_ADMIN_USER.
2. Navigate to Server License Management page.
3. Verify: No duplicate customer cards are present

# Network Verification

No data-changing requests expected. Verify GET-only pattern for read-only exploration.

# Expected Final Result

No duplicate customer cards are present

# Classification

- Read-only
- Positive
- UI Interaction

# Restrictions

- Do not include credentials, tokens, cookies, authorization codes, or sensitive payloads.
- Do not hardcode customer names, server-license names, license types, statuses, counts, card positions, IDs, or API values.
- Do not activate Add Customer, Create Server License, Edit, Delete, Apply, or Save.
- Do not use nth() for business records; locate actions within the dynamically identified card.
- Do not use waitForTimeout, fixed sleeps, or XPath.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending
