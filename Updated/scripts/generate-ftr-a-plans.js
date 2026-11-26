const fs = require('fs');
const path = require('path');
const DIR = path.resolve(__dirname, '..', 'plans/features');
if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });

const plans = [
  { id: 'LIMAS-SUD-2029', slug: 'ftr-a-sidebar-nav', title: 'Sidebar navigation to Features', section: 'Page Shell', purpose: 'Verify sidebar link navigates to Features page.' },
  { id: 'LIMAS-SUD-2030', slug: 'ftr-a-h1-heading', title: 'h1 heading Features', section: 'Page Shell', purpose: 'Verify page heading is h1 "Features".' },
  { id: 'LIMAS-SUD-2031', slug: 'ftr-a-add-root-button', title: 'Add Root Feature button visible', section: 'Page Shell', purpose: 'Verify Add Root Feature button present.' },
  { id: 'LIMAS-SUD-2032', slug: 'ftr-a-expand-collapse-buttons', title: 'Expand All and Collapse All visible', section: 'Page Shell', purpose: 'Verify hierarchy controls visible.' },
  { id: 'LIMAS-SUD-2033', slug: 'ftr-a-table-headers', title: 'Table column headers', section: 'Page Shell', purpose: 'Verify all 6 column headers present.' },
  { id: 'LIMAS-SUD-2034', slug: 'ftr-a-table-rows', title: 'Table has loaded rows', section: 'Page Shell', purpose: 'Verify feature table has rows.' },
  { id: 'LIMAS-SUD-2035', slug: 'ftr-a-row-expand-buttons', title: 'Expand buttons on hierarchical rows', section: 'Feature Hierarchy', purpose: 'Verify expand chevrons exist on parent rows.' },
  { id: 'LIMAS-SUD-2036', slug: 'ftr-a-expand-all', title: 'Expand All expands all rows', section: 'Feature Hierarchy', purpose: 'Verify Expand All increases or maintains row count.' },
  { id: 'LIMAS-SUD-2037', slug: 'ftr-a-collapse-all', title: 'Collapse All collapses rows', section: 'Feature Hierarchy', purpose: 'Verify Collapse All compacts hierarchy.' },
  { id: 'LIMAS-SUD-2038', slug: 'ftr-a-repeated-expand', title: 'Repeated Expand All idempotent', section: 'Feature Hierarchy', purpose: 'Verify repeated expand is stable.' },
  { id: 'LIMAS-SUD-2039', slug: 'ftr-a-search-input', title: 'Search input accepts text', section: 'Search', purpose: 'Verify search textbox works.' },
  { id: 'LIMAS-SUD-2040', slug: 'ftr-a-search-by-name', title: 'Search filters by feature name', section: 'Search', purpose: 'Verify name-based filtering works.' },
  { id: 'LIMAS-SUD-2041', slug: 'ftr-a-search-by-id', title: 'Search matches on feature ID', section: 'Search', purpose: 'Verify ID fragment search works.' },
  { id: 'LIMAS-SUD-2042', slug: 'ftr-a-search-no-match', title: 'No-match search shows zero rows', section: 'Search', purpose: 'Verify no-match state.' },
  { id: 'LIMAS-SUD-2043', slug: 'ftr-a-search-clear', title: 'Clearing search restores rows', section: 'Search', purpose: 'Verify clear restores full table.' },
  { id: 'LIMAS-SUD-2044', slug: 'ftr-a-no-duplicates', title: 'No duplicate rows after search cycle', section: 'Search', purpose: 'Verify no duplicates after search+clear.' },
  { id: 'LIMAS-SUD-2045', slug: 'ftr-a-row-name-id', title: 'Row has feature name and ID', section: 'Feature Row Structure', purpose: 'Verify name and ID on each row.' },
  { id: 'LIMAS-SUD-2046', slug: 'ftr-a-row-actions', title: 'Row actions Add Child/Edit/Delete', section: 'Feature Row Structure', purpose: 'Verify three action buttons present.' },
  { id: 'LIMAS-SUD-2047', slug: 'ftr-a-delete-disabled', title: 'Delete button disabled', section: 'Feature Row Structure', purpose: 'Verify Delete is disabled on rows.' },
  { id: 'LIMAS-SUD-2048', slug: 'ftr-a-profiles-badge', title: 'Used in Profiles badge clickable', section: 'Feature Row Structure', purpose: 'Verify profiles badge present with count.' },
  { id: 'LIMAS-SUD-2049', slug: 'ftr-a-profiles-dialog-opens', title: 'Profiles badge opens dialog', section: 'Used in Profiles', purpose: 'Verify clicking badge opens dialog.' },
  { id: 'LIMAS-SUD-2050', slug: 'ftr-a-dialog-heading', title: 'Dialog heading Profiles Using This Feature', section: 'Used in Profiles', purpose: 'Verify dialog heading.' },
  { id: 'LIMAS-SUD-2051', slug: 'ftr-a-dialog-close-button', title: 'Dialog close button', section: 'Used in Profiles', purpose: 'Verify close button exists.' },
  { id: 'LIMAS-SUD-2052', slug: 'ftr-a-dialog-escape', title: 'Escape closes profiles dialog', section: 'Used in Profiles', purpose: 'Verify Escape dismisses dialog.' },
  { id: 'LIMAS-SUD-2053', slug: 'ftr-a-dialog-cards', title: 'Dialog shows profile cards', section: 'Used in Profiles', purpose: 'Verify cards appear when profiles exist.' },
  { id: 'LIMAS-SUD-2054', slug: 'ftr-a-count-consistency', title: 'Badge count consistent with cards', section: 'Used in Profiles', purpose: 'Verify dialog cards >= 1 when count > 0.' },
  { id: 'LIMAS-SUD-2055', slug: 'ftr-a-navigate-to-profiles', title: 'Profile click navigates to Profiles', section: 'Profile Navigation', purpose: 'Verify navigation to /profiles.' },
  { id: 'LIMAS-SUD-2056', slug: 'ftr-a-profile-selected', title: 'Correct profile opened', section: 'Profile Navigation', purpose: 'Verify selected profile opens.' },
  { id: 'LIMAS-SUD-2057', slug: 'ftr-a-return-to-features', title: 'Return to Features restores state', section: 'Profile Navigation', purpose: 'Verify round trip preserves row count.' },
  { id: 'LIMAS-SUD-2058', slug: 'ftr-a-read-only-requests', title: 'No mutation requests during navigation', section: 'Profile Navigation', purpose: 'Verify only GET requests for features/profiles.' },
  { id: 'LIMAS-SUD-2059', slug: 'ftr-a-safe-restoration', title: 'Clean state after exploration', section: 'Safe Restoration', purpose: 'Verify Features page stable after search/expand/clear.' },
];

for (const p of plans) {
  const content = `---
test_id: "${p.id}"
title: "${p.title}"
module: "Features"
page: "Features"
section: "${p.section}"
control: "${p.title}"
action: "Verify"
access_profile: "SUPER_USER_ADMIN_USER"
priority: "P1"
classification: "Features FTR-A"
test_type: "Positive"
automation_candidate: true
plan_status: "Reviewed"
script_status: "Generated"
environment_variables: ["LIMAS_BASE_URL", "LIMAS_SUPER_USER_ADMIN_USER_USERNAME", "LIMAS_SUPER_USER_ADMIN_USER_PASSWORD"]
test_data: {}
related_script: "tests/features/features-profiles-navigation.spec.ts"
---

# Purpose

${p.purpose}

# Preconditions

- \`\${LIMAS_BASE_URL}\` is reachable.
- \`SUPER_USER_ADMIN_USER\` credentials configured.
- Authenticated on Features page.

# Classification

- Read-only
- Positive
- UI Inspection

# Restrictions

- Do not hardcode feature names, IDs, versions, access levels, or profile counts.
- Do not activate Add Root Feature, Add Child Feature, Edit, or Delete.
- No data-changing requests.

# Generation Status

- Test script generation: Generated
- CI/CD execution: Pending
`;

  fs.writeFileSync(path.join(DIR, `${p.id}-${p.slug}.md`), content, 'utf8');
}
console.log(`Done: ${plans.length} plan files created.`);