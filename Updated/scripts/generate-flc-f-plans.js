const fs = require('fs');
const path = require('path');

const DIR = path.resolve(__dirname, '..', 'plans/floating-license-configurations');

const plans = [
  {
    id: 'LIMAS-SUD-1946',
    slug: 'flc-f-view-details-menu-visible',
    title: 'View Details menu item is visible in the three-dot menu',
    section: 'View Details Menu Item',
    control: 'View Details Menu Item',
    purpose: 'Verify View Details appears as a menu item when the three-dot actions menu is open.',
    steps: ['Navigate to FLC page and select a runtime group.', 'Open the three-dot actions menu for the first card.', 'Verify the View Details menu item is visible.', 'Close the menu.'],
    expected: 'View Details menu item is visible in the open menu.'
  },
  {
    id: 'LIMAS-SUD-1947',
    slug: 'flc-f-view-details-accessible-name',
    title: 'View Details menu item has accessible name',
    section: 'View Details Menu Item',
    control: 'View Details Accessible Name',
    purpose: 'Verify the View Details menu item has an aria-label containing "View details".',
    steps: ['Navigate to FLC page and select a runtime group.', 'Open the three-dot actions menu for the first card.', 'Read the aria-label of the View Details menu item.', 'Verify it contains "View details".', 'Close the menu.'],
    expected: 'aria-label includes "View details for {cardName}".'
  },
  {
    id: 'LIMAS-SUD-1948',
    slug: 'flc-f-view-details-keyboard-enter',
    title: 'View Details menu item can be activated by keyboard Enter',
    section: 'View Details Menu Item',
    control: 'View Details Keyboard Activation',
    purpose: 'Verify Enter key on the focused View Details menu item opens the details panel.',
    steps: ['Navigate to FLC page and select a runtime group.', 'Open the three-dot actions menu.', 'Focus the View Details menu item.', 'Press Enter.', 'Verify the details region appears.', 'Close the panel via the Close button.'],
    expected: 'Details panel opens on Enter key press.'
  },
  {
    id: 'LIMAS-SUD-1949',
    slug: 'flc-f-details-inline-region-not-dialog',
    title: 'View Details opens an inline region panel, not a dialog',
    section: 'Details Panel Structure',
    control: 'Details Panel Container',
    purpose: 'Verify the details panel is an inline region element, not a modal dialog.',
    steps: ['Navigate to FLC page and select a runtime group.', 'Open View Details for the first card.', 'Verify the details region is visible.', 'Assert no role="dialog" element exists.', 'Close the panel.'],
    expected: 'Details panel is role="region", no dialog present.'
  },
  {
    id: 'LIMAS-SUD-1950',
    slug: 'flc-f-details-heading',
    title: 'Details panel has a Configuration Details heading',
    section: 'Details Panel Structure',
    control: 'Configuration Details Heading',
    purpose: 'Verify "Configuration Details" text heading is visible in the panel.',
    steps: ['Navigate to FLC page and select a runtime group.', 'Open View Details for the first card.', 'Verify "Configuration Details" text is visible.', 'Close the panel.'],
    expected: '"Configuration Details" is visible in the panel.'
  },
  {
    id: 'LIMAS-SUD-1951',
    slug: 'flc-f-details-close-button-accessible',
    title: 'Details panel has a close button with accessible name',
    section: 'Details Panel Structure',
    control: 'Close Button',
    purpose: 'Verify the Close button has an aria-label including "Close details for {name}".',
    steps: ['Navigate to FLC page and select a runtime group.', 'Open View Details for the first card.', 'Verify the Close button is visible.', 'Verify its aria-label contains "Close details for".', 'Close the panel.'],
    expected: 'Close button aria-label includes "Close details for {cardName}".'
  },
  {
    id: 'LIMAS-SUD-1952',
    slug: 'flc-f-details-region-accessible-name',
    title: 'Details panel region has accessible name matching card',
    section: 'Details Panel Structure',
    control: 'Details Region Accessible Name',
    purpose: 'Verify the details region aria-label contains the card name.',
    steps: ['Navigate to FLC page and select a runtime group.', 'Open View Details for the first card.', 'Read the aria-label of the details region.', 'Verify it contains the card name.', 'Close the panel.'],
    expected: 'Region aria-label is "Details for {cardName}".'
  },
  {
    id: 'LIMAS-SUD-1953',
    slug: 'flc-f-details-product-profile',
    title: 'Product Profile field is displayed in details',
    section: 'Configuration Identity Fields',
    control: 'Product Profile Field',
    purpose: 'Verify the Product Profile field label and value are present.',
    steps: ['Navigate to FLC page and select a runtime group.', 'Open View Details for the first card.', 'Verify "Product Profile" label is visible.', 'Verify its value is non-empty.', 'Close the panel.'],
    expected: 'Product Profile label and value displayed.'
  },
  {
    id: 'LIMAS-SUD-1954',
    slug: 'flc-f-details-profile-role',
    title: 'Profile Role field is displayed in details',
    section: 'Configuration Identity Fields',
    control: 'Profile Role Field',
    purpose: 'Verify the Profile Role field label and value are present.',
    steps: ['Navigate to FLC page and select a runtime group.', 'Open View Details for the first card.', 'Verify "Profile Role" label is visible.', 'Verify its value is non-empty.', 'Close the panel.'],
    expected: 'Profile Role label and value displayed.'
  },
  {
    id: 'LIMAS-SUD-1955',
    slug: 'flc-f-details-user-group',
    title: 'User Group field is displayed in details',
    section: 'Configuration Identity Fields',
    control: 'User Group Field',
    purpose: 'Verify the User Group field label and value are present.',
    steps: ['Navigate to FLC page and select a runtime group.', 'Open View Details for the first card.', 'Verify "User Group" label is visible.', 'Verify its value is non-empty.', 'Close the panel.'],
    expected: 'User Group label and value displayed.'
  },
  {
    id: 'LIMAS-SUD-1956',
    slug: 'flc-f-details-capacity-fields',
    title: 'Total Licenses, Occupied, and Available fields are displayed',
    section: 'Capacity and Checkout Fields',
    control: 'Capacity Fields',
    purpose: 'Verify all three capacity fields are present.',
    steps: ['Navigate to FLC page and select a runtime group.', 'Open View Details for the first card.', 'Verify "Total Licenses" is visible.', 'Verify "Occupied" is visible.', 'Verify "Available" is visible.', 'Close the panel.'],
    expected: 'All three capacity field labels visible.'
  },
  {
    id: 'LIMAS-SUD-1957',
    slug: 'flc-f-details-checkout-field',
    title: 'Checkout field displays availability status',
    section: 'Capacity and Checkout Fields',
    control: 'Checkout Field',
    purpose: 'Verify the Checkout field shows availability status (Available/Unavailable).',
    steps: ['Navigate to FLC page and select a runtime group.', 'Open View Details for the first card.', 'Verify "Checkout" label is visible.', 'Verify its value is non-empty.', 'Close the panel.'],
    expected: 'Checkout status displayed with non-empty value.'
  },
  {
    id: 'LIMAS-SUD-1958',
    slug: 'flc-f-details-max-checkout',
    title: 'Max Checkout Time field is displayed with unit',
    section: 'Capacity and Checkout Fields',
    control: 'Max Checkout Time Field',
    purpose: 'Verify the Max Checkout Time field label and value (with unit) are present.',
    steps: ['Navigate to FLC page and select a runtime group.', 'Open View Details for the first card.', 'Verify "Max Checkout Time" label is visible.', 'Verify its value is non-empty.', 'Close the panel.'],
    expected: 'Max Checkout Time with value displayed.'
  },
  {
    id: 'LIMAS-SUD-1959',
    slug: 'flc-f-details-expiration',
    title: 'Expiration date is displayed in details',
    section: 'Date Fields',
    control: 'Expiration Date Field',
    purpose: 'Verify the Expiration date field label and value are present.',
    steps: ['Navigate to FLC page and select a runtime group.', 'Open View Details for the first card.', 'Verify "Expiration" label is visible.', 'Verify its value is non-empty.', 'Close the panel.'],
    expected: 'Expiration date displayed.'
  },
  {
    id: 'LIMAS-SUD-1960',
    slug: 'flc-f-details-maintenance',
    title: 'Maintenance date is displayed in details',
    section: 'Date Fields',
    control: 'Maintenance Date Field',
    purpose: 'Verify the Maintenance date field label and value are present.',
    steps: ['Navigate to FLC page and select a runtime group.', 'Open View Details for the first card.', 'Verify "Maintenance" label is visible.', 'Verify its value is non-empty.', 'Close the panel.'],
    expected: 'Maintenance date displayed.'
  },
  {
    id: 'LIMAS-SUD-1961',
    slug: 'flc-f-details-created',
    title: 'Created date is displayed in details',
    section: 'Audit Fields',
    control: 'Created Date Field',
    purpose: 'Verify the Created audit field is present.',
    steps: ['Navigate to FLC page and select a runtime group.', 'Open View Details for the first card.', 'Verify "Created" label is visible.', 'Verify its value is non-empty.', 'Close the panel.'],
    expected: 'Created date displayed.'
  },
  {
    id: 'LIMAS-SUD-1962',
    slug: 'flc-f-details-last-modified',
    title: 'Last Modified date is displayed in details',
    section: 'Audit Fields',
    control: 'Last Modified Date Field',
    purpose: 'Verify the Last Modified audit field is present.',
    steps: ['Navigate to FLC page and select a runtime group.', 'Open View Details for the first card.', 'Verify "Last Modified" label is visible.', 'Verify its value is non-empty.', 'Close the panel.'],
    expected: 'Last Modified date displayed.'
  },
  {
    id: 'LIMAS-SUD-1963',
    slug: 'flc-f-details-created-by',
    title: 'Created by field is displayed in details',
    section: 'Audit Fields',
    control: 'Created by Field',
    purpose: 'Verify the Created by audit field is present.',
    steps: ['Navigate to FLC page and select a runtime group.', 'Open View Details for the first card.', 'Verify "Created by" label is visible.', 'Verify its value is non-empty.', 'Close the panel.'],
    expected: 'Created by user name displayed.'
  },
  {
    id: 'LIMAS-SUD-1964',
    slug: 'flc-f-details-system-ids',
    title: 'Configuration ID, Version ID, and System User ID are displayed',
    section: 'System ID Fields',
    control: 'System ID Fields',
    purpose: 'Verify all three system ID fields are present at the bottom of the panel.',
    steps: ['Navigate to FLC page and select a runtime group.', 'Open View Details for the first card.', 'Verify "Configuration ID:" text is visible.', 'Verify "Version ID:" text is visible.', 'Verify "System User ID:" text is visible.', 'Close the panel.'],
    expected: 'All three system ID fields visible.'
  },
  {
    id: 'LIMAS-SUD-1965',
    slug: 'flc-f-details-feature-note',
    title: 'Feature information note is displayed when features are unavailable',
    section: 'Feature Information',
    control: 'Feature Information Note',
    purpose: 'Verify the feature-unavailable note is visible.',
    steps: ['Navigate to FLC page and select a runtime group.', 'Open View Details for the first card.', 'Verify "Feature information is not available in this view." is visible.', 'Close the panel.'],
    expected: 'Feature unavailable note visible.'
  },
  {
    id: 'LIMAS-SUD-1966',
    slug: 'flc-f-details-close-dismisses',
    title: 'Close button dismisses the details panel',
    section: 'Panel Dismissal',
    control: 'Close Button Action',
    purpose: 'Verify clicking Close removes the details panel.',
    steps: ['Navigate to FLC page and select a runtime group.', 'Open View Details for the first card.', 'Click the Close button.', 'Verify the details region is no longer visible.'],
    expected: 'Details panel closed; region not visible.'
  },
  {
    id: 'LIMAS-SUD-1967',
    slug: 'flc-f-details-safe-restoration',
    title: 'After closing details, config list returns to clean state',
    section: 'Safe Restoration',
    control: 'Clean State',
    purpose: 'Verify after closing the details panel, the config list is in a clean state.',
    steps: ['Navigate to FLC page and select a runtime group.', 'Open View Details for the first card.', 'Close the panel via Close button.', 'Verify heading is visible.', 'Verify user group summary panel is visible.', 'Verify details panel is not visible.'],
    expected: 'Config list in clean state; no details panel visible.'
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
action: "Verify"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Floating License Configurations FLC-F"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/floating-license-configurations/floating-license-configurations-view-details.spec.ts"
---

# Purpose

${p.purpose}

# Preconditions

- \`${'$'}{LIMAS_BASE_URL}\` is reachable.
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

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending
`;

  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`Created: ${filename}`);
}

console.log(`\nDone: ${plans.length} plan files created.`);