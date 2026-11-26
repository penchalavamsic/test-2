const fs = require('fs');
const path = require('path');

const tests = [
  'Delete button is visible on every row',
  'Delete button has role button and accessible name Delete',
  'Delete button has destructive text styling',
  'Delete disabled when feature has associated profiles',
  'Delete enabled when feature has 0 profiles',
  'Disabled Delete tooltip explains profile association',
  'Enabled Delete has no tooltip',
  'Root feature Delete disabled when associated with profiles',
  'Child feature Delete disabled when associated with profiles',
  'Profile count drives Delete disabled state',
  'Delete button count matches row count',
  'One Delete button per row',
  'Clicking enabled Delete opens Are you sure alertdialog',
  'Confirmation dialog has heading Are you sure h2',
  'Confirmation warning mentions feature name and permanently delete',
  'Confirmation dialog has Cancel and Delete controls',
  'Cancel dismisses confirmation without deleting',
  'Escape dismisses confirmation dialog',
  'Confirmation dialog role is alertdialog',
  'Controlled synthetic create-delete lifecycle',
  'Features page clean after delete dialog exploration',
];

const dir = path.resolve(__dirname, '..', 'plans/ftr-e');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

tests.forEach((name, i) => {
  const id = `LIMAS-SUD-${2144 + i}`;
  const slug = name
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
  const file = path.join(dir, `${id}-${slug}.md`);
  const content = `# ${id}: ${name}

**Module:** FTR-E — Features Delete Feature
**Category:** Read-only
**Type:** Functional
**Priority:** Medium
**Status:** Not Run
**Pre-requisite:** Authenticated as ${process.env.LIMAS_DEFAULT_ACCESS_PROFILE || 'SUPER_USER_ADMIN_USER'}

## Objective
Verify: ${name}

## Steps
1. Navigate to Features page
2. Perform the test actions for: ${name}
3. Assert the expected behavior

## Expected Result
The behavior matches the test case title: ${name}
`;
  fs.writeFileSync(file, content, 'utf8');
});

console.log(`Generated ${tests.length} plan files in plans/ftr-e/ (LIMAS-SUD-2144 to LIMAS-SUD-${2144 + tests.length - 1})`);