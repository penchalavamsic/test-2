const fs = require('fs');
const path = require('path');

const tests = [
  'Edit dialog opens with role and accessible name',
  'Edit dialog shows heading and description',
  'Group Name and Comment fields are present',
  'Cancel Save and Close controls are present',
  'Initial focus is on Group Name input',
  'Group Name is prepopulated with current name',
  'Comment is prepopulated with current value',
  'Opening Edit for a different row loads correct values',
  'Save is enabled when dialog opens with no changes',
  'Save remains enabled after changing Group Name',
  'Save remains enabled after changing Comment',
  'Save remains enabled after clearing Group Name',
  'Cancel closes the dialog without changes',
  'Close button closes the dialog',
  'Escape closes the dialog',
  'Reopening restores original persisted values',
  'Edit works on a root group',
  'Edit works on a visible child group',
  'Group Name input has accessible name',
  'Comment input has accessible name',
  'Gated lifecycle creates edits and verifies a synthetic group',
];

const dir = path.resolve(__dirname, '..', 'plans/ugr-d');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

tests.forEach((name, i) => {
  const id = `LIMAS-SUD-${2484 + i}`;
  const slug = name
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
  const file = path.join(dir, `${id}-${slug}.md`);
  const content = `# ${id}: ${name}

**Module:** UGR-D — Edit Group
**Category:** Read-only
**Type:** Functional
**Priority:** Medium
**Status:** Not Run
**Pre-requisite:** Authenticated as SUPER_USER_ADMIN_USER

## Objective
Verify: ${name}

## Steps
1. Navigate to User Groups page
2. Open Edit dialog from a runtime group row
3. Interact with fields and controls
4. Assert: ${name}

## Expected Result
The behavior matches the test case title: ${name}
`;
  fs.writeFileSync(file, content, 'utf8');
});

console.log(`Generated ${tests.length} plan files in plans/ugr-d/ (LIMAS-SUD-2484 to LIMAS-SUD-${2484 + tests.length - 1})`);