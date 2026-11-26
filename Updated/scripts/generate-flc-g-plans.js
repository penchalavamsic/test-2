const fs = require('fs');
const path = require('path');

const DIR = path.resolve(__dirname, '..', 'plans/floating-license-configurations');

const plans = [
  { id: 'LIMAS-SUD-1968', slug: 'flc-g-edit-form-heading', title: 'Edit opens inline form with heading', section: 'Edit Form Shell', control: 'Edit Form Heading', purpose: 'Verify Edit menu item opens an inline form with heading.', steps: ['Navigate to FLC, select a runtime group.', 'Open Edit for the first card.', 'Verify "Edit Floating License Configuration" heading is visible.', 'Cancel the form.'], expected: 'Edit form opens with visible heading.' },
  { id: 'LIMAS-SUD-1969', slug: 'flc-g-edit-inline-not-dialog', title: 'Edit form is inline panel, not a dialog', section: 'Edit Form Shell', control: 'Edit Form Container', purpose: 'Verify the edit form is inline, not a modal dialog.', steps: ['Navigate to FLC, select a runtime group.', 'Open Edit for the first card.', 'Assert no role="dialog" element exists.', 'Cancel the form.'], expected: 'No dialog present; form is inline.' },
  { id: 'LIMAS-SUD-1970', slug: 'flc-g-edit-controls', title: 'Edit form has Cancel, Reset, and Save Configuration controls', section: 'Edit Form Shell', control: 'Form Controls', purpose: 'Verify all three controls are visible.', steps: ['Navigate to FLC, select a runtime group.', 'Open Edit for the first card.', 'Verify Cancel, Reset, and Save Configuration buttons are visible.', 'Cancel.'], expected: 'All three controls visible.' },
  { id: 'LIMAS-SUD-1971', slug: 'flc-g-edit-product-profile-prepop', title: 'Product Profile is prepopulated with current value', section: 'Field Prepoulation', control: 'Product Profile Combobox', purpose: 'Verify Product Profile shows the current config profile.', steps: ['Navigate to FLC, select a runtime group.', 'Open Edit for the first card.', 'Verify the selected Product Profile option is not the placeholder.', 'Cancel.'], expected: 'Product Profile shows current non-placeholder value.' },
  { id: 'LIMAS-SUD-1972', slug: 'flc-g-edit-profile-role-prepop', title: 'Profile Role is prepopulated with current value', section: 'Field Prepoulation', control: 'Profile Role Combobox', purpose: 'Verify Profile Role is prepopulated.', steps: ['Navigate to FLC, select a runtime group.', 'Open Edit for the first card.', 'Verify selected Profile Role is not placeholder.', 'Cancel.'], expected: 'Profile Role shows current value.' },
  { id: 'LIMAS-SUD-1973', slug: 'flc-g-edit-licenses-prepop', title: 'Number of Licenses is prepopulated', section: 'Field Prepoulation', control: 'Number of Licenses Spinbutton', purpose: 'Verify Number of Licenses shows current value.', steps: ['Navigate to FLC, select a runtime group.', 'Open Edit for the first card.', 'Verify Number of Licenses has a value.', 'Cancel.'], expected: 'License count prepopulated.' },
  { id: 'LIMAS-SUD-1974', slug: 'flc-g-edit-max-checkout-prepop', title: 'Max Checkout Time is prepopulated', section: 'Field Prepoulation', control: 'Max Checkout Time Spinbutton', purpose: 'Verify Max Checkout Time shows current value.', steps: ['Navigate to FLC, select a runtime group.', 'Open Edit for the first card.', 'Verify Max Checkout has a value.', 'Cancel.'], expected: 'Max Checkout Time prepopulated.' },
  { id: 'LIMAS-SUD-1975', slug: 'flc-g-edit-availability-prepop', title: 'Availability radio is prepopulated', section: 'Field Prepoulation', control: 'Availability Radios', purpose: 'Verify exactly one of Available/Unavailable is checked.', steps: ['Navigate to FLC, select a runtime group.', 'Open Edit for the first card.', 'Verify exactly one radio is checked.', 'Cancel.'], expected: 'Exactly one radio checked.' },
  { id: 'LIMAS-SUD-1976', slug: 'flc-g-edit-expiration-prepop', title: 'Expiration Date is prepopulated', section: 'Field Prepoulation', control: 'Expiration Date Textbox', purpose: 'Verify Expiration Date shows current value.', steps: ['Navigate to FLC, select a runtime group.', 'Open Edit for the first card.', 'Verify Expiration Date has a value.', 'Cancel.'], expected: 'Expiration date prepopulated.' },
  { id: 'LIMAS-SUD-1977', slug: 'flc-g-edit-maintenance-prepop', title: 'Maintenance Date is prepopulated', section: 'Field Prepoulation', control: 'Maintenance Date Textbox', purpose: 'Verify Maintenance Date shows current value.', steps: ['Navigate to FLC, select a runtime group.', 'Open Edit for the first card.', 'Verify Maintenance Date has a value.', 'Cancel.'], expected: 'Maintenance date prepopulated.' },
  { id: 'LIMAS-SUD-1978', slug: 'flc-g-edit-user-group-disabled', title: 'User Group is disabled in edit form', section: 'Disabled and Read-Only Fields', control: 'User Group Combobox', purpose: 'Verify User Group is disabled and cannot be changed.', steps: ['Navigate to FLC, select a runtime group.', 'Open Edit for the first card.', 'Verify User Group combobox is disabled.', 'Cancel.'], expected: 'User Group is disabled.' },
  { id: 'LIMAS-SUD-1979', slug: 'flc-g-edit-profile-role-change', title: 'Profile Role can be changed in edit form', section: 'Editable Field Behavior', control: 'Profile Role Combobox', purpose: 'Verify Profile Role can be changed.', steps: ['Navigate to FLC, select a runtime group.', 'Open Edit for the first card.', 'Select a different Profile Role option.', 'Verify the selected value changes.', 'Cancel (do not save).'], expected: 'Profile Role changes on selection.' },
  { id: 'LIMAS-SUD-1980', slug: 'flc-g-edit-licenses-change', title: 'Number of Licenses can be changed in edit form', section: 'Editable Field Behavior', control: 'Number of Licenses Spinbutton', purpose: 'Verify Number of Licenses can be edited.', steps: ['Navigate to FLC, select a runtime group.', 'Open Edit for the first card.', 'Fill "5" in Number of Licenses.', 'Verify value is "5".', 'Cancel.'], expected: 'License count updates to 5.' },
  { id: 'LIMAS-SUD-1981', slug: 'flc-g-edit-max-checkout-change', title: 'Max Checkout Time can be changed in edit form', section: 'Editable Field Behavior', control: 'Max Checkout Spinbutton', purpose: 'Verify Max Checkout Time can be edited.', steps: ['Navigate to FLC, select a runtime group.', 'Open Edit for the first card.', 'Fill "4" in Max Checkout Time.', 'Verify value is "4".', 'Cancel.'], expected: 'Max Checkout updates to 4.' },
  { id: 'LIMAS-SUD-1982', slug: 'flc-g-edit-availability-toggle', title: 'Availability can be toggled in edit form', section: 'Editable Field Behavior', control: 'Availability Radios', purpose: 'Verify Available/Unavailable can be toggled.', steps: ['Navigate to FLC, select a runtime group.', 'Open Edit for the first card.', 'Toggle to the opposite radio.', 'Verify the new radio is checked.', 'Cancel.'], expected: 'Availability toggles.' },
  { id: 'LIMAS-SUD-1983', slug: 'flc-g-edit-expiration-change', title: 'Expiration Date can be changed in edit form', section: 'Editable Field Behavior', control: 'Expiration Date Textbox', purpose: 'Verify Expiration Date can be edited.', steps: ['Navigate to FLC, select a runtime group.', 'Open Edit for the first card.', 'Fill a new date in Expiration.', 'Verify the value updates.', 'Cancel.'], expected: 'Expiration date changes.' },
  { id: 'LIMAS-SUD-1984', slug: 'flc-g-edit-licenses-positive-int', title: 'Number of Licenses accepts positive integer', section: 'Numeric Validation', control: 'Number of Licenses Validation', purpose: 'Verify positive integer is accepted.', steps: ['Navigate to FLC, select a runtime group.', 'Open Edit for the first card.', 'Fill "10" in Number of Licenses.', 'Verify value is "10".', 'Cancel.'], expected: 'Value 10 accepted.' },
  { id: 'LIMAS-SUD-1985', slug: 'flc-g-edit-licenses-zero-valid', title: 'Number of Licenses with value zero is valid', section: 'Numeric Validation', control: 'Number of Licenses Validation', purpose: 'Verify zero is valid and Save is not disabled.', steps: ['Navigate to FLC, select a runtime group.', 'Open Edit for the first card.', 'Fill "0" in Number of Licenses.', 'Verify Save is not disabled.', 'Cancel.'], expected: 'Zero accepted; Save not disabled.' },
  { id: 'LIMAS-SUD-1986', slug: 'flc-g-edit-save-enabled-initial', title: 'Save is initially enabled when form opens with prepopulated values', section: 'Save State Behavior', control: 'Save Button State', purpose: 'Verify Save is enabled on initial form load.', steps: ['Navigate to FLC, select a runtime group.', 'Open Edit for the first card.', 'Verify Save Configuration is not disabled.', 'Cancel.'], expected: 'Save enabled on clean form.' },
  { id: 'LIMAS-SUD-1987', slug: 'flc-g-edit-save-after-change', title: 'Save stays enabled after one valid field change', section: 'Save State Behavior', control: 'Save Button State', purpose: 'Verify Save remains enabled after a valid change.', steps: ['Navigate to FLC, select a runtime group.', 'Open Edit for the first card.', 'Change Number of Licenses to "3".', 'Verify Save is still enabled.', 'Cancel.'], expected: 'Save enabled after change.' },
  { id: 'LIMAS-SUD-1988', slug: 'flc-g-edit-reset-restores', title: 'Reset restores original persisted values', section: 'Reset and Dismissal', control: 'Reset Button', purpose: 'Verify Reset reverts changes to original values.', steps: ['Navigate to FLC, select a runtime group.', 'Open Edit for the first card.', 'Record original license count.', 'Change license count to 99.', 'Click Reset.', 'Verify license count is restored.', 'Cancel.'], expected: 'Reset restores original values.' },
  { id: 'LIMAS-SUD-1989', slug: 'flc-g-edit-cancel-discards', title: 'Cancel discards changes and closes form', section: 'Reset and Dismissal', control: 'Cancel Button', purpose: 'Verify Cancel closes form and discards changes.', steps: ['Navigate to FLC, select a runtime group.', 'Open Edit for the first card.', 'Change a value.', 'Click Cancel.', 'Verify form is not visible.'], expected: 'Form closed, changes discarded.' },
  { id: 'LIMAS-SUD-1990', slug: 'flc-g-edit-reopen-persisted', title: 'Reopening Edit shows persisted values', section: 'Reset and Dismissal', control: 'Reopen Behavior', purpose: 'Verify reopening after Cancel shows original persisted values.', steps: ['Navigate to FLC, select a runtime group.', 'Open Edit for the first card.', 'Record original Profile Role.', 'Change Profile Role to a different option.', 'Cancel.', 'Open Edit again for the same card.', 'Verify Profile Role is the original value.', 'Cancel.'], expected: 'Reopening shows persisted values.' },
  { id: 'LIMAS-SUD-1991', slug: 'flc-g-edit-gated-lifecycle', title: 'Gated create-edit-delete lifecycle with mutation flags', section: 'Controlled Update Lifecycle', control: 'Gated Lifecycle', purpose: 'Verify full create-edit lifecycle under mutation flags.', steps: ['Verify TEST_FLC_ALLOW_MUTATION and TEST_FLC_ALLOW_DELETE flags.', 'Skip if not set.', 'Create a config, edit it, and cleanup.'], expected: 'Lifecycle guarded by flags; skipped when flags absent.' },
  { id: 'LIMAS-SUD-1992', slug: 'flc-g-edit-safe-restoration', title: 'After closing Edit, config list returns to clean state', section: 'Safe Restoration', control: 'Clean State', purpose: 'Verify config list is clean after edit form closure.', steps: ['Navigate to FLC, select a runtime group.', 'Open Edit for the first card.', 'Cancel.', 'Verify heading, group summary visible.', 'Verify edit form not visible.'], expected: 'Clean config list state.' },
];

for (const p of plans) {
  const filename = `${p.id}-${p.slug}.md`;
  const content = `---
test_id: "${p.id}"
title: "${p.title}"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "${p.section}"
control: "${p.control}"
action: "Verify"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Floating License Configurations FLC-G"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/floating-license-configurations/floating-license-configurations-edit.spec.ts"
---

# Purpose

${p.purpose}

# Preconditions

- \`\${LIMAS_BASE_URL}\` is reachable.
- Credentials for \`SUPER_USER_ADMIN_USER\` are configured.
- User is authenticated and on the Floating License Configurations page.
- A runtime group with at least one configuration is selected.

# Test Data

Use environment variables and the authenticated fixture. No hardcoded group names, card names, or values.

# Steps and Expected Results

${p.steps.map((s, i) => `${i + 1}. ${s}`).join('\n\n')}

Expected: ${p.expected}

# Network Verification

No API verification needed for this plan.

# Expected Final Result

${p.expected}

# Classification

- Read-only
- Positive
- UI Interaction

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.
- Do not hardcode group names, card names, or values.
- Do not click Save unless TEST_FLC_ALLOW_MUTATION is set.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending
`;

  fs.writeFileSync(path.join(DIR, filename), content, 'utf8');
  console.log(`Created: ${filename}`);
}

console.log(`\nDone: ${plans.length} plan files created.`);