---
test_id: "LIMAS-SUD-1084"
title: "To verify the functionality of \"User & License Hub\" → \"Add User Dialog\" → \"Language Dropdown\" → \"Default and Options\""
module: "User & License Hub"
page: "User & License Hub"
section: "Add User Dialog"
control: "Language Dropdown"
action: "Default and Options"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P2"
classification: "User & License Hub ULH-E"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-add-user.spec.ts"
---

# Purpose

Verify the Language dropdown defaults to "English" and contains at least ["English", "German"] as options.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- Credentials for `SUPER_USER_ADMIN_USER` are configured.
- User is navigated to User & License Hub.

# Test Data

Use environment variables and the authenticated fixture.

# Steps and Expected Results

1. Action: Open the Add User dialog.
   Expected Result: Dialog visible.

2. Action: Locate the Language field by its label "Language".
   Expected Result: A combobox is present with displayed text "English".

3. Action: Open the Language dropdown and collect option texts.
   Expected Result: Options include "English" and "German". "English" is the selected default.

# Network Verification

No API verification needed.

# Expected Final Result

Language dropdown defaults to "English" and offers at least English and German.

# Classification

- Read-only
- Positive

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not submit the form.
- Do not hardcode language options beyond what was verified live.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending

# Evidence Source

- Live UI observation via Playwright MCP: Language dropdown, default "English", options English and German.