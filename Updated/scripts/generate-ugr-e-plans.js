const fs = require('fs');
const path = require('path');

const tests = [
  'Delete button has destructive visual class',
  'Delete button is enabled for a runtime group',
  'Delete button has trash icon',
  'Delete button is keyboard reachable',
  'Delete opens alertdialog with accessible name',
  'Dialog shows heading and warning text',
  'Cancel and Delete buttons are present',
  'Cancel has initial focus in confirmation dialog',
  'Root with children warns subgroups will be promoted',
  'Leaf node warns action is irreversible',
  'Subgroup with children warns subgroups will be promoted',
  'Cancel dismisses the delete dialog',
  'Escape dismisses the delete dialog',
  'Cancel preserves the group in table',
  'Search is functional after delete cancellation',
  'Hierarchy is functional after delete cancellation',
  'Delete button is distinguishable beyond color',
  'Gated lifecycle creates deletes and verifies removal',
];

const dir = path.resolve(__dirname, '..', 'plans/ugr-e');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

tests.forEach((name, i) => {
  const id = `LIMAS-SUD-${2505 + i}`;
  const slug = name
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
  const file = path.join(dir, `${id}-${slug}.md`);
  const content = `# ${id}: ${name}

**Module:** UGR-E — Delete Group
**Category:** Read-only
**Type:** Functional
**Priority:** Medium
**Status:** Not Run
**Pre-requisite:** Authenticated as SUPER_USER_ADMIN_USER

## Objective
Verify: ${name}

## Steps
1. Navigate to User Groups page
2. Click Delete on a group row
3. Interact with the confirmation dialog
4. Assert: ${name}

## Expected Result
The behavior matches the test case title: ${name}
`;
  fs.writeFileSync(file, content, 'utf8');
});

console.log(`Generated ${tests.length} plan files in plans/ugr-e/ (LIMAS-SUD-2505 to LIMAS-SUD-${2505 + tests.length - 1})`);