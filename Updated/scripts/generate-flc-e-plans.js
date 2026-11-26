const fs = require('fs');
const path = require('path');

const DIR = path.resolve(__dirname, '..', 'plans/floating-license-configurations');

const plans = [
  {
    id: 'LIMAS-SUD-1917',
    slug: 'flc-e-create-form-heading',
    title: 'Create Configuration button opens inline form with heading',
    section: 'Form Shell and Layout',
    control: 'Create Configuration Form Heading',
    action: 'Verify',
    purpose: 'Verify clicking Create Configuration opens an inline form with a heading.',
    steps: [
      'Navigate to the Floating License Configurations page and select a runtime group.',
      'Click the Create Configuration button.',
      'Verify the Create Floating License Configuration heading is visible.',
      'Verify the heading contains "Create" in its text.',
      'Click Cancel to close the form.'
    ],
    expected: 'The Create form opens inline with a visible heading.'
  },
  {
    id: 'LIMAS-SUD-1918',
    slug: 'flc-e-create-form-cancel-button',
    title: 'Create form has Cancel button in the header area',
    section: 'Form Shell and Layout',
    control: 'Cancel Button',
    action: 'Verify',
    purpose: 'Verify the Cancel button exists in the create form header.',
    steps: [
      'Navigate to the Floating License Configurations page and select a runtime group.',
      'Click Create Configuration to open the form.',
      'Verify the Cancel button is visible.',
      'Click Cancel to close the form.'
    ],
    expected: 'Cancel button is visible in the create form header area.'
  },
  {
    id: 'LIMAS-SUD-1919',
    slug: 'flc-e-create-form-inline-not-dialog',
    title: 'Create form is inline panel, not a modal dialog',
    section: 'Form Shell and Layout',
    control: 'Create Form Container',
    action: 'Verify',
    purpose: 'Verify the create form renders as an inline panel, not a role="dialog".',
    steps: [
      'Navigate to the Floating License Configurations page and select a runtime group.',
      'Click Create Configuration to open the form.',
      'Assert no element with role="dialog" is present.',
      'Click Cancel to close the form.'
    ],
    expected: 'No role="dialog" element exists; the form is inline.'
  },
  {
    id: 'LIMAS-SUD-1920',
    slug: 'flc-e-create-form-field-labels',
    title: 'Create form shows labels for all top-level fields',
    section: 'Form Shell and Layout',
    control: 'Field Labels',
    action: 'Verify',
    purpose: 'Verify all top-level form field labels are present.',
    steps: [
      'Navigate to the Floating License Configurations page and select a runtime group.',
      'Click Create Configuration to open the form.',
      'Verify User Group, Product Profile, Profile Role, Number of Licenses, Max Checkout Time, Available for Checkout, Expiration Date, and Maintenance Date labels are visible.',
      'Click Cancel to close the form.'
    ],
    expected: 'All 8 field labels are visible.'
  },
  {
    id: 'LIMAS-SUD-1921',
    slug: 'flc-e-create-form-bottom-controls',
    title: 'Create form has Reset and Save Configuration buttons at the bottom',
    section: 'Form Shell and Layout',
    control: 'Reset and Save Configuration Buttons',
    action: 'Verify',
    purpose: 'Verify Reset and Save Configuration buttons are present at the form bottom.',
    steps: [
      'Navigate to the Floating License Configurations page and select a runtime group.',
      'Click Create Configuration to open the form.',
      'Verify Reset button is visible.',
      'Verify Save Configuration button is visible.',
      'Click Cancel to close the form.'
    ],
    expected: 'Reset and Save Configuration buttons are visible.'
  },
  {
    id: 'LIMAS-SUD-1922',
    slug: 'flc-e-user-group-prepopulated',
    title: 'User Group field is prepopulated with the currently selected group',
    section: 'User Group Field',
    control: 'User Group Combobox',
    action: 'Verify',
    purpose: 'Verify the User Group field shows the currently selected group name.',
    steps: [
      'Navigate to the Floating License Configurations page and select a runtime group.',
      'Record the selected group name.',
      'Click Create Configuration to open the form.',
      'Verify the User Group combobox selected value contains the recorded group name.',
      'Click Cancel to close the form.'
    ],
    expected: 'User Group combobox is prepopulated with the current group.'
  },
  {
    id: 'LIMAS-SUD-1923',
    slug: 'flc-e-user-group-editable-options',
    title: 'User Group combobox is editable and has options populated',
    section: 'User Group Field',
    control: 'User Group Combobox',
    action: 'Verify',
    purpose: 'Verify the User Group combobox is enabled and has options.',
    steps: [
      'Navigate to the Floating License Configurations page and select a runtime group.',
      'Click Create Configuration to open the form.',
      'Verify the User Group combobox is enabled.',
      'Verify the combobox has more than one option.',
      'Click Cancel to close the form.'
    ],
    expected: 'User Group combobox is enabled with multiple options.'
  },
  {
    id: 'LIMAS-SUD-1924',
    slug: 'flc-e-user-group-label',
    title: 'User Group field has a label',
    section: 'User Group Field',
    control: 'User Group Label',
    action: 'Verify',
    purpose: 'Verify the "User Group" label is visible on the form.',
    steps: [
      'Navigate to Floating License Configurations and select a runtime group.',
      'Click Create Configuration.',
      'Verify the text "User Group" is visible.',
      'Click Cancel.'
    ],
    expected: '"User Group" label is visible.'
  },
  {
    id: 'LIMAS-SUD-1925',
    slug: 'flc-e-product-profile-placeholder',
    title: 'Product Profile combobox starts with placeholder "Select a profile…"',
    section: 'Product Profile Field',
    control: 'Product Profile Combobox',
    action: 'Verify',
    purpose: 'Verify the Product Profile combobox initially shows a placeholder.',
    steps: [
      'Navigate to Floating License Configurations and select a runtime group.',
      'Click Create Configuration.',
      'Verify the selected option displays "Select a profile…".',
      'Click Cancel.'
    ],
    expected: 'Product Profile shows placeholder text.'
  },
  {
    id: 'LIMAS-SUD-1926',
    slug: 'flc-e-product-profile-options-populated',
    title: 'Product Profile options list is populated',
    section: 'Product Profile Field',
    control: 'Product Profile Combobox',
    action: 'Verify',
    purpose: 'Verify Product Profile combobox has multiple options.',
    steps: [
      'Navigate to Floating License Configurations and select a runtime group.',
      'Click Create Configuration.',
      'Count options in the Product Profile combobox.',
      'Verify more than one option exists.',
      'Click Cancel.'
    ],
    expected: 'Multiple product profile options exist.'
  },
  {
    id: 'LIMAS-SUD-1927',
    slug: 'flc-e-product-profile-required',
    title: 'Product Profile field shows required indicator (*)',
    section: 'Product Profile Field',
    control: 'Product Profile Label',
    action: 'Verify',
    purpose: 'Verify "Product Profile *" label with asterisk is visible.',
    steps: [
      'Navigate to Floating License Configurations and select a runtime group.',
      'Click Create Configuration.',
      'Verify the text "Product Profile *" is visible.',
      'Click Cancel.'
    ],
    expected: 'Required asterisk is visible on Product Profile label.'
  },
  {
    id: 'LIMAS-SUD-1928',
    slug: 'flc-e-profile-role-placeholder',
    title: 'Profile Role combobox starts with placeholder "Select a role…"',
    section: 'Profile Role Field',
    control: 'Profile Role Combobox',
    action: 'Verify',
    purpose: 'Verify Profile Role combobox initially shows a placeholder.',
    steps: [
      'Navigate to Floating License Configurations and select a runtime group.',
      'Click Create Configuration.',
      'Verify the selected option displays "Select a role…".',
      'Click Cancel.'
    ],
    expected: 'Profile Role shows placeholder text.'
  },
  {
    id: 'LIMAS-SUD-1929',
    slug: 'flc-e-profile-role-options-populated',
    title: 'Profile Role options list is populated',
    section: 'Profile Role Field',
    control: 'Profile Role Combobox',
    action: 'Verify',
    purpose: 'Verify Profile Role combobox has multiple options.',
    steps: [
      'Navigate to Floating License Configurations and select a runtime group.',
      'Click Create Configuration.',
      'Count options in the Profile Role combobox.',
      'Verify more than one option exists.',
      'Click Cancel.'
    ],
    expected: 'Multiple profile role options exist.'
  },
  {
    id: 'LIMAS-SUD-1930',
    slug: 'flc-e-profile-role-cascade',
    title: 'Selecting a Product Profile filters Profile Role options',
    section: 'Profile Role Field',
    control: 'Profile Role Combobox Cascade',
    action: 'Verify',
    purpose: 'Verify Profile Role options change after selecting a Product Profile.',
    steps: [
      'Navigate to Floating License Configurations and select a runtime group.',
      'Click Create Configuration.',
      'Record the count of Profile Role options.',
      'Select a Product Profile option.',
      'Wait for the role list to update.',
      'Verify at least one role option remains.',
      'Click Cancel.'
    ],
    expected: 'Profile Role options are filtered or remain populated after profile selection.'
  },
  {
    id: 'LIMAS-SUD-1931',
    slug: 'flc-e-profile-role-required',
    title: 'Profile Role field shows required indicator (*)',
    section: 'Profile Role Field',
    control: 'Profile Role Label',
    action: 'Verify',
    purpose: 'Verify "Profile Role *" label with asterisk is visible.',
    steps: [
      'Navigate to Floating License Configurations and select a runtime group.',
      'Click Create Configuration.',
      'Verify the text "Profile Role *" is visible.',
      'Click Cancel.'
    ],
    expected: 'Required asterisk is visible on Profile Role label.'
  },
  {
    id: 'LIMAS-SUD-1932',
    slug: 'flc-e-licenses-spinbutton',
    title: 'Number of Licenses is a spinbutton with numeric-only input',
    section: 'Number of Licenses Field',
    control: 'Number of Licenses Spinbutton',
    action: 'Verify',
    purpose: 'Verify Number of Licenses input has role="spinbutton".',
    steps: [
      'Navigate to Floating License Configurations and select a runtime group.',
      'Click Create Configuration.',
      'Verify the Number of Licenses input is visible.',
      'Verify its role attribute is "spinbutton".',
      'Click Cancel.'
    ],
    expected: 'Number of Licenses has role="spinbutton".'
  },
  {
    id: 'LIMAS-SUD-1933',
    slug: 'flc-e-licenses-required',
    title: 'Number of Licenses shows required indicator (*)',
    section: 'Number of Licenses Field',
    control: 'Number of Licenses Label',
    action: 'Verify',
    purpose: 'Verify "Number of Licenses *" label with asterisk is visible.',
    steps: [
      'Navigate to Floating License Configurations and select a runtime group.',
      'Click Create Configuration.',
      'Verify the text "Number of Licenses *" is visible.',
      'Click Cancel.'
    ],
    expected: 'Required asterisk is visible on Number of Licenses label.'
  },
  {
    id: 'LIMAS-SUD-1934',
    slug: 'flc-e-max-checkout-spinbutton',
    title: 'Max Checkout Time is a spinbutton with numeric-only input',
    section: 'Max Checkout Time Field',
    control: 'Max Checkout Time Spinbutton',
    action: 'Verify',
    purpose: 'Verify Max Checkout Time input has role="spinbutton".',
    steps: [
      'Navigate to Floating License Configurations and select a runtime group.',
      'Click Create Configuration.',
      'Verify the Max Checkout Time input is visible.',
      'Verify its role attribute is "spinbutton".',
      'Click Cancel.'
    ],
    expected: 'Max Checkout Time has role="spinbutton".'
  },
  {
    id: 'LIMAS-SUD-1935',
    slug: 'flc-e-max-checkout-required',
    title: 'Max Checkout Time shows required indicator (*)',
    section: 'Max Checkout Time Field',
    control: 'Max Checkout Time Label',
    action: 'Verify',
    purpose: 'Verify "Max Checkout Time (hours) *" label with asterisk is visible.',
    steps: [
      'Navigate to Floating License Configurations and select a runtime group.',
      'Click Create Configuration.',
      'Verify "Max Checkout Time (hours) *" is visible.',
      'Click Cancel.'
    ],
    expected: 'Required asterisk is visible on Max Checkout Time label.'
  },
  {
    id: 'LIMAS-SUD-1936',
    slug: 'flc-e-availability-radios',
    title: 'Available for Checkout has Available and Unavailable radio buttons',
    section: 'Available for Checkout',
    control: 'Availability Radios',
    action: 'Verify',
    purpose: 'Verify both Available and Unavailable radio buttons are present.',
    steps: [
      'Navigate to Floating License Configurations and select a runtime group.',
      'Click Create Configuration.',
      'Verify Available radio is visible.',
      'Verify Unavailable radio is visible.',
      'Click Cancel.'
    ],
    expected: 'Both Available and Unavailable radio buttons are visible.'
  },
  {
    id: 'LIMAS-SUD-1937',
    slug: 'flc-e-availability-default-available',
    title: 'Available radio is selected by default',
    section: 'Available for Checkout',
    control: 'Availability Default',
    action: 'Verify',
    purpose: 'Verify Available radio is checked and Unavailable is unchecked by default.',
    steps: [
      'Navigate to Floating License Configurations and select a runtime group.',
      'Click Create Configuration.',
      'Verify Available radio is checked.',
      'Verify Unavailable radio is not checked.',
      'Click Cancel.'
    ],
    expected: 'Available is checked, Unavailable is unchecked.'
  },
  {
    id: 'LIMAS-SUD-1938',
    slug: 'flc-e-date-textboxes',
    title: 'Expiration Date and Maintenance Date textboxes are present',
    section: 'Date Fields',
    control: 'Date Textboxes',
    action: 'Verify',
    purpose: 'Verify Expiration Date and Maintenance Date textbox inputs exist.',
    steps: [
      'Navigate to Floating License Configurations and select a runtime group.',
      'Click Create Configuration.',
      'Verify Expiration Date textbox is visible.',
      'Verify Maintenance Date textbox is visible.',
      'Click Cancel.'
    ],
    expected: 'Both date textboxes are visible.'
  },
  {
    id: 'LIMAS-SUD-1939',
    slug: 'flc-e-date-fields-not-required',
    title: 'Date fields are not marked as required (*)',
    section: 'Date Fields',
    control: 'Date Field Labels',
    action: 'Verify',
    purpose: 'Verify Expiration Date and Maintenance Date labels do not have the required asterisk.',
    steps: [
      'Navigate to Floating License Configurations and select a runtime group.',
      'Click Create Configuration.',
      'Verify "Expiration Date *" does not exist.',
      'Verify "Maintenance Date *" does not exist.',
      'Click Cancel.'
    ],
    expected: 'Date labels do not have required asterisks.'
  },
  {
    id: 'LIMAS-SUD-1940',
    slug: 'flc-e-save-disabled-initial',
    title: 'Save Configuration is disabled when required fields are empty',
    section: 'Save State Behavior',
    control: 'Save Configuration Button',
    action: 'Verify',
    purpose: 'Verify Save Configuration is disabled when no required fields are filled.',
    steps: [
      'Navigate to Floating License Configurations and select a runtime group.',
      'Click Create Configuration.',
      'Verify the Save Configuration button has the disabled attribute.',
      'Click Cancel.'
    ],
    expected: 'Save Configuration button is disabled initially.'
  },
  {
    id: 'LIMAS-SUD-1941',
    slug: 'flc-e-save-enabled-required-filled',
    title: 'Save Configuration becomes enabled after required fields are filled',
    section: 'Save State Behavior',
    control: 'Save Configuration Button State',
    action: 'Verify',
    purpose: 'Verify Save Configuration enables after filling required fields.',
    steps: [
      'Navigate to Floating License Configurations and select a runtime group.',
      'Click Create Configuration.',
      'Select a Product Profile.',
      'Select a Profile Role.',
      'Fill Number of Licenses.',
      'Fill Max Checkout Time.',
      'Verify Save Configuration is no longer disabled.',
      'Click Cancel (do not save).'
    ],
    expected: 'Save Configuration is enabled after required fields are filled.'
  },
  {
    id: 'LIMAS-SUD-1942',
    slug: 'flc-e-cancel-closes-form',
    title: 'Cancel button closes the form and restores Create button',
    section: 'Form Dismissal',
    control: 'Cancel Button Action',
    action: 'Verify',
    purpose: 'Verify Cancel closes the form and re-enables the Create Configuration button.',
    steps: [
      'Navigate to Floating License Configurations and select a runtime group.',
      'Click Create Configuration.',
      'Click the Cancel button.',
      'Verify the form heading is no longer visible.',
      'Verify Create Configuration button is enabled.'
    ],
    expected: 'Cancel closes the form and re-enables Create Configuration button.'
  },
  {
    id: 'LIMAS-SUD-1943',
    slug: 'flc-e-escape-closes-form',
    title: 'Escape key closes the form',
    section: 'Form Dismissal',
    control: 'Escape Key Dismissal',
    action: 'Verify',
    purpose: 'Verify pressing Escape closes the create form.',
    steps: [
      'Navigate to Floating License Configurations and select a runtime group.',
      'Click Create Configuration.',
      'Press the Escape key.',
      'Wait briefly.',
      'Verify the form heading is no longer visible.'
    ],
    expected: 'Escape key dismisses the form.'
  },
  {
    id: 'LIMAS-SUD-1944',
    slug: 'flc-e-reset-restores-defaults',
    title: 'Reset restores form fields to default values',
    section: 'Reset Behavior',
    control: 'Reset Button',
    action: 'Verify',
    purpose: 'Verify Reset clears modifications and restores defaults.',
    steps: [
      'Navigate to Floating License Configurations and select a runtime group.',
      'Click Create Configuration.',
      'Select a Product Profile.',
      'Fill Number of Licenses with 10.',
      'Check the Unavailable radio.',
      'Click the Reset button.',
      'Verify Product Profile returns to "Select a profile…".',
      'Verify Available radio is checked again.',
      'Click Cancel.'
    ],
    expected: 'Reset restores fields to initial default values.'
  },
  {
    id: 'LIMAS-SUD-1945',
    slug: 'flc-e-safe-restoration',
    title: 'Full restore closes form and returns to clean config list state',
    section: 'Safe Restoration',
    control: 'State Restoration',
    action: 'Verify',
    purpose: 'Verify after closing the create form, the config list returns to a clean state.',
    steps: [
      'Navigate to Floating License Configurations and select a runtime group.',
      'Open the Create Configuration form.',
      'Close the form via Cancel.',
      'Verify heading is visible.',
      'Verify user group summary panel is visible.',
      'Verify Create Configuration button is enabled.'
    ],
    expected: 'Config list is in clean state after form closure.'
  }
];

for (const p of plans) {
  const filename = `${p.id}-${p.slug}.md`;
  const filepath = path.join(DIR, filename);

  const content = `---
test_id: "${p.id}"
title: "${p.title}"
module: "Floating License Configurations"
page: "Floating License Configurations"
section: "${p.section}"
control: "${p.control}"
action: "${p.action}"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Floating License Configurations FLC-E"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/floating-license-configurations/floating-license-configurations-create.spec.ts"
---

# Purpose

${p.purpose}

# Preconditions

- \`${'$'}{LIMAS_BASE_URL}\` is reachable.
- Credentials for \`SUPER_USER_ADMIN_USER\` are configured.
- User is authenticated and on the Floating License Configurations page.
- A runtime group with configurations is selected.

# Test Data

Use environment variables and the authenticated fixture. No hardcoded group names, card names, or counts.

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
- Do not hardcode group names, card names, or counts.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending
`;

  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`Created: ${filename}`);
}

console.log(`\nDone: ${plans.length} plan files created.`);