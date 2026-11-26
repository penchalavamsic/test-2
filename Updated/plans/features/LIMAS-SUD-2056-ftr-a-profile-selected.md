---
test_id: "LIMAS-SUD-2056"
title: "Correct profile opened"
module: "Features"
page: "Features"
section: "Profile Navigation"
control: "Correct profile opened"
action: "Verify"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Features FTR-A"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/features/features-profiles-navigation.spec.ts"
---

# Purpose

Verify selected profile opens.

# Preconditions

- `${LIMAS_BASE_URL}` is reachable.
- `SUPER_USER_ADMIN_USER` credentials configured.
- Authenticated on Features page.

# Classification

- Read-only
- Positive
- UI Inspection

# Restrictions

- Do not hardcode feature names, IDs, versions, access levels, or profile counts.
- Do not activate Add Root Feature, Add Child Feature, Edit, or Delete.
- No data-changing requests.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
