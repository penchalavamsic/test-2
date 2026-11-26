const fs = require('fs');
const path = require('path');

const tests = [
  'User Groups route is active in sidebar',
  'Page heading is h1 User Groups',
  'Add Group button is visible',
  'Expand All and Collapse All buttons are visible',
  'Search input is present with accessible name',
  'Table has correct column headers',
  'Group row container is scrollable',
  'Initial page loads groups via read-only GET',
  'Root-level groups are visible with no indent',
  'Groups with children have expand toggle',
  'Expanding a parent group reveals its children',
  'Collapsing a parent hides its children',
  'Expanded state shows chevron-down icon',
  'Child rows are indented relative to parent',
  'Hierarchy preserves parent-child ordering',
  'Expand All reveals all hierarchy levels',
  'Collapse All hides all child rows',
  'Repeated Expand All is idempotent',
  'Repeated Collapse All is idempotent',
  'Expand All toggle icons switch to chevron-down',
  'Collapse All toggle icons switch to chevron-right',
  'Expand All is keyboard accessible',
  'Search finds exact match by group name',
  'Partial match returns group whose name contains fragment',
  'Search is case-insensitive',
  'Leading and trailing whitespace is handled',
  'No-match search shows empty state',
  'Clearing search restores all rows',
  'Search filters to parent groups matching by name',
  'Search interaction with Expand and Collapse is stable',
  'Each row has Add Subgroup Edit and Delete buttons',
  'Add Subgroup has accessible name',
  'Edit has accessible name',
  'Delete button has destructive styling and is enabled',
  'Action buttons are keyboard reachable',
  'Child row actions are scoped to that row',
  'Initial load uses GET with read-only contract',
  'Response contains root groups with parent null',
  'No POST PUT PATCH or DELETE during read-only exploration',
  'Sidebar link has aria-current page',
  'Search input has accessible placeholder',
  'Expand All and Collapse All have accessible names',
  'Table has column headers for structure',
  'Delete button is distinguishable beyond color',
  'Scrollable container supports keyboard navigation',
  'Empty state is visible when no results match',
  'User Groups page restores to clean state after exploration',
];

const dir = path.resolve(__dirname, '..', 'plans/ugr-a');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

tests.forEach((name, i) => {
  const id = `LIMAS-SUD-${2391 + i}`;
  const slug = name
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
  const file = path.join(dir, `${id}-${slug}.md`);
  const content = `# ${id}: ${name}

**Module:** UGR-A — User Groups Page Shell, Hierarchy, Search
**Category:** Read-only
**Type:** Functional
**Priority:** Medium
**Status:** Not Run
**Pre-requisite:** Authenticated as SUPER_USER_ADMIN_USER

## Objective
Verify: ${name}

## Steps
1. Navigate to User Groups page
2. Interact with page elements
3. Assert: ${name}

## Expected Result
The behavior matches the test case title: ${name}
`;
  fs.writeFileSync(file, content, 'utf8');
});

console.log(`Generated ${tests.length} plan files in plans/ugr-a/ (LIMAS-SUD-2391 to LIMAS-SUD-${2391 + tests.length - 1})`);