const fs = require('fs');
const path = require('path');

const tests = [
  'Sidebar navigation lands on Profiles page',
  'Profiles heading is h1',
  'Create Profile button is visible',
  'Search input is present with placeholder Search',
  'Sort field combobox is present with default Name',
  'Sort direction combobox is present with default Ascending',
  'Profile cards are visible',
  'Search accepts text input',
  'Search finds match by profile name fragment',
  'No-match search shows zero cards',
  'Clearing search restores all cards',
  'Search is case-insensitive',
  'Leading trailing whitespace in search is handled',
  'No duplicate cards appear after search and clear',
  'Default sort is Name Ascending first card is alphabetically first',
  'Selecting Name Descending reorders cards',
  'Card count is consistent after sorting change',
  'Sort field combobox shows Name option',
  'Each card has a Profile name heading h3',
  'Each card has Edit and Delete icon buttons',
  'Each card has User Licenses Floating and Assigned counts',
  'Each card has a Roles count label like N Roles',
  'Role badges are visible when roles exist',
  'Overflow badge plus N is present when roles exceed visible slots',
  'Each card has a Manage button',
  'Cards have unique runtime identities no duplicate headings',
  'Count values are numeric and non-negative',
  'Search input has accessible placeholder',
  'Create Profile button has accessible name',
  'Manage button has accessible name Manage',
  'Role badges are distinguishable beyond color',
  'Profiles page restores to clean state after exploration',
];

const dir = path.resolve(__dirname, '..', 'plans/profiles');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

tests.forEach((name, i) => {
  const id = `LIMAS-SUD-${2192 + i}`;
  const slug = name
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
  const file = path.join(dir, `${id}-${slug}.md`);
  const content = `# ${id}: ${name}

**Module:** PRF-A — Profiles Page Shell, Search, Sorting, Cards
**Category:** Read-only
**Type:** Functional
**Priority:** Medium
**Status:** Not Run
**Pre-requisite:** Authenticated as SUPER_USER_ADMIN_USER

## Objective
Verify: ${name}

## Steps
1. Navigate to Profiles page
2. Inspect or interact with the target element
3. Assert: ${name}

## Expected Result
The behavior matches the test case title: ${name}
`;
  fs.writeFileSync(file, content, 'utf8');
});

console.log(`Generated ${tests.length} plan files in plans/profiles/ (LIMAS-SUD-2192 to LIMAS-SUD-${2192 + tests.length - 1})`);