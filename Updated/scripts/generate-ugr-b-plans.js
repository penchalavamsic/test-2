const fs = require('fs');
const path = require('path');

const tests = [
  'Add Group dialog opens with role and accessible name',
  'Dialog shows heading and description',
  'Group Name input has placeholder and visual required indicator',
  'Comment textarea has placeholder and optional hint',
  'Cancel Save and Close controls are present',
  'Initial focus is on Group Name input',
  'Focus is trapped inside the dialog',
  'Save is enabled when Group Name is empty',
  'Save remains enabled with valid Group Name',
  'Save remains enabled with whitespace-only name',
  'Group Name preserves leading and trailing spaces',
  'Group Name accepts supported characters',
  'Clearing restores Save to enabled',
  'Save remains enabled with Comment filled but empty name',
  'Comment is initially empty',
  'Comment accepts multiline input',
  'Comment clearing restores empty value',
  'Cancel closes the dialog',
  'Close button closes the dialog',
  'Escape closes the dialog',
  'Reopening resets fields',
  'Group Name input has accessible name',
  'Comment input has accessible name',
  'All interactive elements are keyboard reachable',
  'Gated lifecycle creates verifies and deletes a synthetic group',
];

const dir = path.resolve(__dirname, '..', 'plans/ugr-b');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

tests.forEach((name, i) => {
  const id = `LIMAS-SUD-${2438 + i}`;
  const slug = name
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
  const file = path.join(dir, `${id}-${slug}.md`);
  const content = `# ${id}: ${name}

**Module:** UGR-B — Add Group
**Category:** Read-only
**Type:** Functional
**Priority:** Medium
**Status:** Not Run
**Pre-requisite:** Authenticated as SUPER_USER_ADMIN_USER

## Objective
Verify: ${name}

## Steps
1. Navigate to User Groups page
2. Open Add Group dialog and interact with fields
3. Assert: ${name}

## Expected Result
The behavior matches the test case title: ${name}
`;
  fs.writeFileSync(file, content, 'utf8');
});

console.log(`Generated ${tests.length} plan files in plans/ugr-b/ (LIMAS-SUD-2438 to LIMAS-SUD-${2438 + tests.length - 1})`);