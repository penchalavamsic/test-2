const fs = require('fs');
const path = require('path');
const DIR = path.resolve(__dirname, '..', 'plans/floating-license-configurations');

const plans = [
  { id: 'LIMAS-SUD-1993', slug: 'flc-h-card-delete-menu-visible', title: 'Card-menu Delete is visible', section: 'Card-Menu Delete', control: 'Card-menu Delete Item', purpose: 'Verify the Delete menu item appears in the card three-dot menu.', steps: ['Navigate to FLC, select a runtime group.', 'Open the card menu for the first card.', 'Verify Delete menu item is visible.', 'Close the menu.'], expected: 'Delete menu item visible.' },
  { id: 'LIMAS-SUD-1994', slug: 'flc-h-card-delete-role-menuitem', title: 'Card-menu Delete has role menuitem', section: 'Card-Menu Delete', control: 'Delete Role', purpose: 'Verify the Delete item has role="menuitem".', steps: ['Navigate to FLC, select a runtime group.', 'Open the card menu.', 'Verify Delete role is "menuitem".', 'Close.'], expected: 'role="menuitem".' },
  { id: 'LIMAS-SUD-1995', slug: 'flc-h-card-delete-keyboard-focus', title: 'Card-menu Delete receives keyboard focus', section: 'Card-Menu Delete', control: 'Delete Keyboard Focus', purpose: 'Verify Delete can receive focus.', steps: ['Open card menu.', 'Focus Delete.', 'Verify it is the active element.', 'Close.'], expected: 'Delete receives focus.' },
  { id: 'LIMAS-SUD-1996', slug: 'flc-h-card-delete-no-confirmation', title: 'No confirmation dialog before card-menu Delete', section: 'Card-Menu Delete', control: 'Delete No Confirmation', purpose: 'Verify no dialog/alertdialog exists before Delete.', steps: ['Open card menu.', 'Verify no role="dialog" or "alertdialog" exists.', 'Close — do NOT click Delete.'], expected: 'No confirmation element.' },
  { id: 'LIMAS-SUD-1997', slug: 'flc-h-bulk-delete-toolbar-visible', title: 'Bulk Delete visible in selection toolbar', section: 'Bulk Delete', control: 'Bulk Delete Button', purpose: 'Verify Delete button appears in toolbar after card selection.', steps: ['Navigate to FLC, select a runtime group.', 'Select one card.', 'Verify Delete button visible in toolbar.', 'Clear selection.'], expected: 'Bulk Delete visible.' },
  { id: 'LIMAS-SUD-1998', slug: 'flc-h-bulk-delete-enabled', title: 'Bulk Delete is enabled when cards selected', section: 'Bulk Delete', control: 'Bulk Delete Enabled State', purpose: 'Verify Delete button is enabled with selection.', steps: ['Select a card.', 'Verify Delete is enabled.', 'Clear.'], expected: 'Delete enabled.' },
  { id: 'LIMAS-SUD-1999', slug: 'flc-h-bulk-delete-selection-count', title: 'Selection count reflects selected cards', section: 'Bulk Delete', control: 'Selection Count', purpose: 'Verify selection count updates with selection.', steps: ['Select a card.', 'Verify selection count >= 1.', 'Clear.'], expected: 'Count reflects selection.' },
  { id: 'LIMAS-SUD-2000', slug: 'flc-h-bulk-delete-no-confirmation', title: 'No confirmation dialog for bulk Delete', section: 'Bulk Delete', control: 'Bulk Delete No Confirmation', purpose: 'Verify no confirmation element exists for bulk delete.', steps: ['Select a card.', 'Verify no dialog/alertdialog present.', 'Clear — do NOT click Delete.'], expected: 'No confirmation.' },
  { id: 'LIMAS-SUD-2001', slug: 'flc-h-gated-card-delete-lifecycle', title: 'Gated card-menu delete lifecycle', section: 'Controlled Delete Lifecycle', control: 'Gated Lifecycle', purpose: 'Full create-delete lifecycle under mutation flags.', steps: ['Verify flags.', 'Skip if absent.', 'Create config, delete, verify count returns.'], expected: 'Create→Delete→original count restored.' },
  { id: 'LIMAS-SUD-2002', slug: 'flc-h-delete-count-sync', title: 'Delete returns count to original value', section: 'Controlled Delete Lifecycle', control: 'Count Sync', purpose: 'Verify config count decreases by 1 and returns to original.', steps: ['Record count.', 'Create +1.', 'Delete -1.', 'Verify count == original.'], expected: 'Count restored.' },
  { id: 'LIMAS-SUD-2003', slug: 'flc-h-failure-unauthorized', title: 'Unauthorized delete handled gracefully', section: 'Failure Recovery Plans', control: 'Unauthorized Response', purpose: 'Document plan for 401/403 handling.', steps: ['Skip without network interception.'], expected: 'No UI crash on 401/403.' },
  { id: 'LIMAS-SUD-2004', slug: 'flc-h-failure-not-found', title: 'Config not found handled gracefully', section: 'Failure Recovery Plans', control: '404 Response', purpose: 'Document plan for 404 handling.', steps: ['Skip without network interception.'], expected: 'No UI crash on 404.' },
  { id: 'LIMAS-SUD-2005', slug: 'flc-h-failure-server-error', title: 'Server error during delete handled gracefully', section: 'Failure Recovery Plans', control: '500 Response', purpose: 'Document plan for 500 handling.', steps: ['Skip without network interception.'], expected: 'No UI crash on 500.' },
  { id: 'LIMAS-SUD-2006', slug: 'flc-h-duplicate-delete-idempotent', title: 'Already-absent card is idempotent success', section: 'Duplicate-Delete Prevention', control: 'Idempotent Delete', purpose: 'Verify delete of absent config succeeds.', steps: ['Create, delete, verify absent.', 'Count == original.'], expected: 'Idempotent cleanup.' },
  { id: 'LIMAS-SUD-2007', slug: 'flc-h-safe-restoration-clean', title: 'Clean state after delete inspection', section: 'Safe Restoration', control: 'Clean State', purpose: 'Verify config list clean after delete inspection.', steps: ['Clear all selections.', 'Verify no toolbar, heading visible.'], expected: 'Clean state.' },
  { id: 'LIMAS-SUD-2008', slug: 'flc-h-safe-restoration-count', title: 'Original count after lifecycle cleanup', section: 'Safe Restoration', control: 'Original Count', purpose: 'Verify count == original after lifecycle.', steps: ['Create, delete, verify count == original.'], expected: 'Original count restored.' },
];

for (const p of plans) {
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
classification: "Floating License Configurations FLC-H"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/floating-license-configurations/floating-license-configurations-delete.spec.ts"
---

# Purpose

${p.purpose}

# Preconditions

- \`\${LIMAS_BASE_URL}\` is reachable.
- Credentials for \`SUPER_USER_ADMIN_USER\` are configured.
- User is authenticated and on the Floating License Configurations page.
- A runtime group with at least one configuration is selected.
${p.id >= 'LIMAS-SUD-2001' ? '- TEST_FLC_ALLOW_MUTATION=true and TEST_FLC_ALLOW_DELETE=true (or test is skipped).' : '- No deletion will occur during inspection.'}

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

- ${p.id >= 'LIMAS-SUD-2001' ? 'Destructive (gated)' : 'Read-only'}
- Positive
- UI Interaction

# Restrictions

- Do not include credentials, tokens, cookies, or sensitive payloads.
- Do not use static environment-specific data.
- Do not hardcode group names, card names, or values.
- NEVER delete an existing configuration unless TEST_FLC_ALLOW_DELETE is set and config was created by this run.
- Click Delete exactly once; treat "already absent" as successful idempotent cleanup.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
- Healing: Pending
`;

  fs.writeFileSync(path.join(DIR, `${p.id}-${p.slug}.md`), content, 'utf8');
  console.log(`Created: ${p.id}-${p.slug}.md`);
}
console.log(`\nDone: ${plans.length} plan files created.`);