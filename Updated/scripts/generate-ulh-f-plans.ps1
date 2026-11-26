$dir = Join-Path $PSScriptRoot '..\plans\user-license-hub'

$plans = @(
  @{id=1086; slug="edit-button-opens-dialog"; section="Edit Action"; control="Edit Button"; action="Click Opens Dialog"; priority="P1"},
  @{id=1087; slug="edit-dialog-heading-description"; section="Edit User Dialog"; control="Dialog"; action="Heading and Description"; priority="P1"},
  @{id=1088; slug="edit-close-dismisses"; section="Edit User Dialog"; control="Close Button"; action="Dismisses Dialog"; priority="P1"},
  @{id=1089; slug="edit-cancel-discards"; section="Edit User Dialog"; control="Cancel Button"; action="Discards Changes"; priority="P1"},
  @{id=1090; slug="edit-escape-dismisses"; section="Edit User Dialog"; control="Escape Key"; action="Dismisses Dialog"; priority="P2"},
  @{id=1091; slug="edit-outside-click-dismisses"; section="Edit User Dialog"; control="Outside Click"; action="Dismisses Dialog"; priority="P2"},
  @{id=1092; slug="edit-initial-focus"; section="Edit User Dialog"; control="Focus"; action="Initial Focus on First Name"; priority="P2"},
  @{id=1093; slug="edit-focus-trap"; section="Edit User Dialog"; control="Focus Trap"; action="Tab Cycles Within Dialog"; priority="P2"},
  @{id=1094; slug="edit-prepopulated-first-name"; section="Prepopulated Values"; control="First Name"; action="Prepopulated with Runtime Value"; priority="P1"},
  @{id=1095; slug="edit-prepopulated-all-fields"; section="Prepopulated Values"; control="All Fields"; action="All Values Match Selected User"; priority="P1"},
  @{id=1096; slug="edit-first-name-field"; section="Field Structure"; control="First Name"; action="Label Required Editable"; priority="P2"},
  @{id=1097; slug="edit-last-name-field"; section="Field Structure"; control="Last Name"; action="Label Required Editable"; priority="P2"},
  @{id=1098; slug="edit-email-field"; section="Field Structure"; control="Email"; action="Label Required Editable"; priority="P2"},
  @{id=1099; slug="edit-company-field"; section="Field Structure"; control="Company"; action="Optional Editable"; priority="P3"},
  @{id=1100; slug="edit-contact-person-field"; section="Field Structure"; control="Contact Person"; action="Optional Editable"; priority="P3"},
  @{id=1101; slug="edit-user-group-field"; section="Field Structure"; control="User Group"; action="Required Combobox Prepopulated"; priority="P2"},
  @{id=1102; slug="edit-save-initially-enabled"; section="Save State"; control="Save Button"; action="Initially Enabled"; priority="P1"},
  @{id=1103; slug="edit-clear-first-name-validation"; section="Validation"; control="First Name"; action="Clear Required Field Validation"; priority="P2"},
  @{id=1104; slug="edit-required-field-clear-all"; section="Validation"; control="Required Fields"; action="Clear Each Required Field"; priority="P2"},
  @{id=1105; slug="edit-language-dropdown"; section="Dropdowns"; control="Language"; action="Options and Current Value"; priority="P2"},
  @{id=1106; slug="edit-gdpr-dropdown"; section="Dropdowns"; control="GDPR Consent"; action="Options and Current Value"; priority="P2"},
  @{id=1107; slug="edit-user-group-dropdown"; section="Dropdowns"; control="User Group"; action="Options and Current Value"; priority="P2"},
  @{id=1108; slug="edit-update-lifecycle"; section="Edit Lifecycle"; control="Save"; action="Update Verify Cleanup Gated"; priority="P1"; script="Not Started"},
  @{id=1109; slug="edit-button-accessible-name"; section="Accessibility"; control="Edit Button"; action="Accessible Name"; priority="P2"},
  @{id=1110; slug="edit-dialog-a11y"; section="Accessibility"; control="Dialog"; action="Role Name Description"; priority="P2"},
  @{id=1111; slug="edit-api-contract"; section="API Contract"; control="PUT Endpoint"; action="Update User Contract"; priority="P2"; script="Not Started"}
)

foreach ($p in $plans) {
  $id = $p.id
  $slug = $p.slug
  $section = $p.section
  $control = $p.control
  $action = $p.action
  $priority = $p.priority
  $scriptStatus = if ($p.script) { $p.script } else { "Generated" }

  $content = @"
---
test_id: "LIMAS-SUD-$id"
title: "To verify the functionality of `"User & License Hub`" -> `"$section`" -> `"$control`" -> `"$action`""
module: "User & License Hub"
page: "User & License Hub"
section: "$section"
control: "$control"
action: "$action"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "$priority"
classification: "User & License Hub ULH-F"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "$scriptStatus"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/user-license-hub/user-license-hub-edit-user.spec.ts"
---

## Objective

Verify that the Edit User `"$control`" `"$action`" when interacting with the User & License Hub Edit User dialog.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER at `${LIMAS_BASE_URL}`.
- On the User & License Hub page (path: /users-licenses).
- A runtime test user is available for Edit testing.

## Steps

1. Navigate to User & License Hub.
2. Restore default user list state.
3. Open the Edit User dialog for the runtime test user.
4. Interact with `"$control`" to verify `"$action`".
5. Verify the expected behavior as described in the title.
6. Cancel or close the dialog. Restore default state.

## Expected Result

The `"$control`" behaves as described — `"$action`".

## Evidence Source

- Live MCP inspection (dialog structure, prepopulated values, Save state, Cancel behavior verified)
- Mutation gated behind TEST_ULH_ALLOW_USER_MUTATION=true
"@

  $filename = "$dir\LIMAS-SUD-$id-ulh-f-$slug.md"
  $content | Out-File -FilePath $filename -Encoding UTF8
  Write-Host "Created: LIMAS-SUD-$id-ulh-f-$slug.md"
}

Write-Host "Done. Generated $($plans.Count) plans."