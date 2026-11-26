const fs = require('fs');
const path = require('path');

const tests = [
  'Add Subgroup dialog opens with accessible name',
  'Dialog heading and description indicate subgroup',
  'Group Name and Comment fields are present',
  'Cancel Save and Close controls are present',
  'Initial focus is on Group Name input',
  'Dialog differs from Add Group in name and description',
  'Add Subgroup opens from different parent rows',
  'Add Subgroup button has accessible name',
  'Add Subgroup button remains enabled after dialog dismissal',
  'Save is enabled when Group Name is empty',
  'Save remains enabled with whitespace-only name',
  'Name preserves leading and trailing spaces',
  'Clearing restores Save to enabled',
  'Cancel closes the dialog',
  'Close button closes the dialog',
  'Escape closes the dialog',
  'Reopening resets fields',
  'Group Name input has accessible name',
  'Comment input has accessible name',
  'Buttons have accessible names',
  'Gated lifecycle creates verifies and deletes a synthetic subgroup',
];

const dir = path.resolve(__dirname, '..', 'plans/ugr-c');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

tests.forEach((name, i) => {
  const id = `LIMAS-SUD-${2463 + i}`;
  const slug = name
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
  const file = path.join(dir, `${id}-${slug}.md`);
  const content = `# ${id}: ${name}

**Module:** UGR-C — Add Subgroup
**Category:** Read-only
**Type:** Functional
**Priority:** Medium
**Status:** Not Run
**Pre-requisite:** Authenticated as SUPER_USER_ADMIN_USER

## Objective
Verify: ${name}

## Steps
1. Navigate to User Groups page
2. Open Add Subgroup dialog from a runtime parent row
3. Interact with fields
4. Assert: ${name}

## Expected Result
The behavior matches the test case title: ${name}
`;
  fs.writeFileSync(file, content, 'utf8');
});

console.log(`Generated ${tests.length} plan files in plans/ugr-c/ (LIMAS-SUD-2463 to LIMAS-SUD-${2463 + tests.length - 1})`);