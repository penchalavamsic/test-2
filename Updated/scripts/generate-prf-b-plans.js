const fs = require('fs');
const path = require('path');

const tests = [
  'Manage opens dialog with profile name',
  'Dialog shows h2 heading with profile name',
  'Dialog shows No description paragraph when description is empty',
  'Three tabs Overview Roles Features are visible',
  'Overview tab is selected by default',
  'Overview shows User Licenses count',
  'Overview shows Floating count',
  'Overview shows Assigned count',
  'Overview shows Profile Details heading',
  'Overview shows Name field in Profile Details',
  'Overview shows Description field in Profile Details',
  'Overview shows Total Roles field in Profile Details',
  'Switching to Roles tab shows Manage Roles heading',
  'Switching to Features tab shows Manage Features heading',
  'Switching tab updates aria-selected state correctly',
  'Roles tab has Add Role button',
  'Roles tab shows table with role entries',
  'Roles table shows role name and value cells',
  'Features tab has Add feature combobox',
  'Features tab has Create Feature button',
  'Features tab has Save button',
  'Features table shows existing feature rows',
  'Close button dismisses the dialog',
  'Reopening Manage for a different profile shows correct name',
];

const dir = path.resolve(__dirname, '..', 'plans/profiles');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

tests.forEach((name, i) => {
  const id = `LIMAS-SUD-${2224 + i}`;
  const slug = name
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
  const file = path.join(dir, `${id}-${slug}.md`);
  const content = `# ${id}: ${name}

**Module:** PRF-B — Manage Profile Dialog
**Category:** Read-only
**Type:** Functional
**Priority:** Medium
**Status:** Not Run
**Pre-requisite:** Authenticated as SUPER_USER_ADMIN_USER

## Objective
Verify: ${name}

## Steps
1. Navigate to Profiles page
2. Click Manage on a profile card
3. Inspect or interact with the target element in the Manage dialog
4. Assert: ${name}

## Expected Result
The behavior matches the test case title: ${name}
`;
  fs.writeFileSync(file, content, 'utf8');
});

console.log(`Generated ${tests.length} plan files in plans/profiles/ (LIMAS-SUD-2224 to LIMAS-SUD-${2224 + tests.length - 1})`);