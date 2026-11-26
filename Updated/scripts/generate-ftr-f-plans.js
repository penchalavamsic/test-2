const fs = require('fs');
const path = require('path');

const tests = [
  'Clicking a Version opens Feature Update Management dialog',
  'Dialog has role dialog and accessible name Feature Update Management',
  'Dialog heading is h2 Feature Update Management',
  'Subtitle contains runtime Feature ID and selected Version',
  'Dialog has Cancel Save and Close controls',
  'Upload file control labeled Upload Update File is present',
  'A native file input exists within the dialog',
  'Upload icon button and file input are visible',
  'Selecting a file displays the filename in the input',
  'Replacing file updates the displayed filename',
  'Save is enabled before file selection',
  'Save remains enabled after file selection',
  'Update Comments textarea is present',
  'Comments textarea has placeholder',
  'Comments textarea accepts multiline input',
  'Comments textarea is optional not required',
  'Clearing comments restores empty value',
  'Cancel dismisses without uploading',
  'Close button dismisses the dialog',
  'Escape dismisses the dialog',
  'Reopening after Close shows clean state',
  'Reopening with file was selected state resets',
  'Initial focus is on the upload button when dialog opens',
  'File input has visible label Upload Update File',
  'Tab order includes Cancel and Save buttons',
  'Controlled update upload lifecycle',
  'Features page clean after update dialog exploration',
];

const dir = path.resolve(__dirname, '..', 'plans/ftr-f');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

tests.forEach((name, i) => {
  const id = `LIMAS-SUD-${2165 + i}`;
  const slug = name
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
  const file = path.join(dir, `${id}-${slug}.md`);
  const content = `# ${id}: ${name}

**Module:** FTR-F — Features Feature Update Management
**Category:** Read-only
**Type:** Functional
**Priority:** Medium
**Status:** Not Run
**Pre-requisite:** Authenticated as SUPER_USER_ADMIN_USER

## Objective
Verify: ${name}

## Steps
1. Navigate to Features page
2. Click a runtime Feature Version
3. Interact with the Feature Update Management dialog
4. Assert: ${name}

## Expected Result
The behavior matches the test case title: ${name}
`;
  fs.writeFileSync(file, content, 'utf8');
});

console.log(`Generated ${tests.length} plan files in plans/ftr-f/ (LIMAS-SUD-2165 to LIMAS-SUD-${2165 + tests.length - 1})`);