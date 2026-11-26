## User & License Hub — Shell, Controls, Lists, Network, and Accessibility (Batch ULH-A)

### Page Shell, Two-Panel Layout, User Controls, License Controls, User List, Pagination, License List, Network, and Accessibility (ULH-A: SUD-926 to SUD-975, 50 tests)

**Verified User & License Hub structure and behavior:**

- **Navigation (3 tests):** Sidebar link navigation (LIMAS-SUD-926), sanitized route `/users-licenses` (LIMAS-SUD-927), page heading "User & License Hub" (LIMAS-SUD-928).
- **Page Shell (4 tests):** Heading level h1 (LIMAS-SUD-929), main content region (LIMAS-SUD-930), two-panel layout — Users and Licenses (LIMAS-SUD-931), footer visibility (LIMAS-SUD-932).
- **User Search (5 tests):** Visibility (LIMAS-SUD-933), input type text (LIMAS-SUD-934), placeholder "Search by Name or Email" (LIMAS-SUD-935), initial empty value (LIMAS-SUD-936), enabled state (LIMAS-SUD-937).
- **User Filters + Add User (4 tests):** Filters button visibility (LIMAS-SUD-938), aria-expanded="false" (LIMAS-SUD-939), aria-haspopup="dialog" (LIMAS-SUD-940), Add User button visible and enabled (LIMAS-SUD-941).
- **User List (5 tests):** User cards present with count > 0 (LIMAS-SUD-942), scrollable container (LIMAS-SUD-943), card structure — name h3, email, group, license badge, edit, delete (LIMAS-SUD-944), cursor pointer (LIMAS-SUD-945), first user auto-selected on load (LIMAS-SUD-946).
- **User Pagination (7 tests):** Showing range text pattern (LIMAS-SUD-947), rows per page label and combobox (LIMAS-SUD-948), current page is 1 (LIMAS-SUD-949), Previous disabled on page 1 (LIMAS-SUD-950), Next enabled (LIMAS-SUD-951), logical consistency of indices (LIMAS-SUD-952), rows per page defaults to 20 (LIMAS-SUD-953).
- **License Search (5 tests):** Visibility (LIMAS-SUD-954), input type text (LIMAS-SUD-955), placeholder "Search by Hardware ID (comma separated)" (LIMAS-SUD-956), initial empty value (LIMAS-SUD-957), enabled state (LIMAS-SUD-958).
- **License Filters + Toolbar (5 tests):** License Filters visibility (LIMAS-SUD-959), aria-expanded="false" (LIMAS-SUD-960), aria-haspopup="dialog" (LIMAS-SUD-961), Download and Email buttons visible and disabled (LIMAS-SUD-962), Add License button visible and disabled (LIMAS-SUD-963).
- **License List (5 tests):** License cards present for auto-selected user (LIMAS-SUD-964), card fields — Profile, Role, Maintenance, Expiration, Hardware ID, Assigned to (LIMAS-SUD-965), Edit and Delete buttons (LIMAS-SUD-966), date format yyyy-mm-dd (LIMAS-SUD-967), scrollable container (LIMAS-SUD-968).
- **Network (3 tests):** GET `/api/users/f` on navigation (LIMAS-SUD-969), query params page, size, groupids (LIMAS-SUD-970), 200 OK JSON response (LIMAS-SUD-971).
- **Accessibility (4 tests):** Search inputs lack accessible names (LIMAS-SUD-972), placeholder-only naming (LIMAS-SUD-973), single h1 only heading hierarchy (LIMAS-SUD-974), Filters buttons communicate dialog popup and expanded state (LIMAS-SUD-975).

**Verified behaviors:**
- Two independent scrollable panels (Users and Licenses) render side by side.
- User search matches type=text with placeholder "Search by Name or Email", empty initial value, enabled.
- Hardware ID search matches type=text with placeholder "Search by Hardware ID (comma separated)", empty initial value, enabled.
- User cards render: h3 name, email paragraph, group, license-count badge, Edit and Delete buttons, cursor=pointer.
- First user auto-selected on load — license cards appear without user click.
- Pagination shows "Showing 1–20 of N", "Rows per page: 20", "Page 1 of M", Previous disabled, Next enabled.
- License cards for selected user contain Profile, Role, Maintenance, Expiration, Hardware ID, Assigned to fields.
- Maintenance and Expiration dates use yyyy-mm-dd format.
- Download, Email, and Add License buttons are disabled on initial load.
- User API: GET `/api/users/f?page=0&size=20&groupids={value}` returns 200 JSON.
- Search inputs have no id, aria-label, or aria-labelledby — named only by placeholder.
- Only one h1 on page; no h2 page-level headings.

**Blocked cases: 0.** All 50 cases are deterministic and supported by live UI observation.

- **50 plans, 8 grouped spec files (LIMAS-SUD-926 to LIMAS-SUD-975); 0 blocked; not executed**
- **Batch ULH-A status: Complete**

### Test IDs and Descriptions

| Test ID | Atomic Behavior | Plan Path | Script Path | Evidence Source | Profile | Status |
|---------|----------------|-----------|-------------|----------------|---------|--------|
| LIMAS-SUD-926 | Sidebar link navigates to User & License Hub | plans/user-license-hub/LIMAS-SUD-926-ulh-a-sidebar-navigation.md | tests/user-license-hub/user-license-hub-navigation-shell.spec.ts | Live UI | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-927 | Sanitized route /users-licenses | plans/user-license-hub/LIMAS-SUD-927-ulh-a-sanitized-route.md | tests/user-license-hub/user-license-hub-navigation-shell.spec.ts | Live UI | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-928 | Page heading "User & License Hub" | plans/user-license-hub/LIMAS-SUD-928-ulh-a-page-heading.md | tests/user-license-hub/user-license-hub-navigation-shell.spec.ts | Live UI | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-929 | Heading level h1 | plans/user-license-hub/LIMAS-SUD-929-ulh-a-heading-level-h1.md | tests/user-license-hub/user-license-hub-navigation-shell.spec.ts | Live UI, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-930 | Main content region | plans/user-license-hub/LIMAS-SUD-930-ulh-a-main-content-region.md | tests/user-license-hub/user-license-hub-navigation-shell.spec.ts | Live UI, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-931 | Two-panel layout | plans/user-license-hub/LIMAS-SUD-931-ulh-a-two-panel-layout.md | tests/user-license-hub/user-license-hub-navigation-shell.spec.ts | Live UI | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-932 | Footer visibility | plans/user-license-hub/LIMAS-SUD-932-ulh-a-footer-visibility.md | tests/user-license-hub/user-license-hub-navigation-shell.spec.ts | Live UI | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-933 | User search visibility | plans/user-license-hub/LIMAS-SUD-933-ulh-a-user-search-visibility.md | tests/user-license-hub/user-license-hub-user-controls.spec.ts | Live UI | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-934 | User search input type text | plans/user-license-hub/LIMAS-SUD-934-ulh-a-user-search-input-type.md | tests/user-license-hub/user-license-hub-user-controls.spec.ts | Live UI, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-935 | User search placeholder | plans/user-license-hub/LIMAS-SUD-935-ulh-a-user-search-placeholder.md | tests/user-license-hub/user-license-hub-user-controls.spec.ts | Live UI | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-936 | User search initial empty value | plans/user-license-hub/LIMAS-SUD-936-ulh-a-user-search-initial-empty.md | tests/user-license-hub/user-license-hub-user-controls.spec.ts | Live UI | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-937 | User search enabled state | plans/user-license-hub/LIMAS-SUD-937-ulh-a-user-search-enabled.md | tests/user-license-hub/user-license-hub-user-controls.spec.ts | Live UI | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-938 | User Filters button visibility | plans/user-license-hub/LIMAS-SUD-938-ulh-a-user-filters-visibility.md | tests/user-license-hub/user-license-hub-user-controls.spec.ts | Live UI | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-939 | User Filters aria-expanded | plans/user-license-hub/LIMAS-SUD-939-ulh-a-user-filters-aria-expanded.md | tests/user-license-hub/user-license-hub-user-controls.spec.ts | Live UI, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-940 | User Filters aria-haspopup | plans/user-license-hub/LIMAS-SUD-940-ulh-a-user-filters-aria-haspopup.md | tests/user-license-hub/user-license-hub-user-controls.spec.ts | Live UI, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-941 | Add User button visible and enabled | plans/user-license-hub/LIMAS-SUD-941-ulh-a-add-user-button.md | tests/user-license-hub/user-license-hub-user-controls.spec.ts | Live UI | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-942 | User cards present (count > 0) | plans/user-license-hub/LIMAS-SUD-942-ulh-a-user-list-container.md | tests/user-license-hub/user-license-hub-user-list.spec.ts | Live UI | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-943 | User list scrollable | plans/user-license-hub/LIMAS-SUD-943-ulh-a-user-list-scrollable.md | tests/user-license-hub/user-license-hub-user-list.spec.ts | Live UI, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-944 | User card structure | plans/user-license-hub/LIMAS-SUD-944-ulh-a-user-card-structure.md | tests/user-license-hub/user-license-hub-user-list.spec.ts | Live UI | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-945 | User cards cursor pointer | plans/user-license-hub/LIMAS-SUD-945-ulh-a-user-cards-cursor-pointer.md | tests/user-license-hub/user-license-hub-user-list.spec.ts | Live UI, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-946 | First user auto-selected | plans/user-license-hub/LIMAS-SUD-946-ulh-a-first-user-auto-selected.md | tests/user-license-hub/user-license-hub-user-list.spec.ts | Live UI | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-947 | Showing range text pattern | plans/user-license-hub/LIMAS-SUD-947-ulh-a-pagination-showing-range.md | tests/user-license-hub/user-license-hub-pagination.spec.ts | Live UI | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-948 | Rows per page label + combobox | plans/user-license-hub/LIMAS-SUD-948-ulh-a-pagination-rows-per-page.md | tests/user-license-hub/user-license-hub-pagination.spec.ts | Live UI | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-949 | Current page is 1 | plans/user-license-hub/LIMAS-SUD-949-ulh-a-pagination-current-page.md | tests/user-license-hub/user-license-hub-pagination.spec.ts | Live UI | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-950 | Previous button disabled (page 1) | plans/user-license-hub/LIMAS-SUD-950-ulh-a-pagination-previous-disabled.md | tests/user-license-hub/user-license-hub-pagination.spec.ts | Live UI, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-951 | Next button enabled | plans/user-license-hub/LIMAS-SUD-951-ulh-a-pagination-next-enabled.md | tests/user-license-hub/user-license-hub-pagination.spec.ts | Live UI | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-952 | Pagination logical consistency | plans/user-license-hub/LIMAS-SUD-952-ulh-a-pagination-logical-consistency.md | tests/user-license-hub/user-license-hub-pagination.spec.ts | Live UI, Runtime | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-953 | Rows per page defaults to 20 | plans/user-license-hub/LIMAS-SUD-953-ulh-a-pagination-rpp-default.md | tests/user-license-hub/user-license-hub-pagination.spec.ts | Live UI | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-954 | Hardware ID search visibility | plans/user-license-hub/LIMAS-SUD-954-ulh-a-hw-search-visibility.md | tests/user-license-hub/user-license-hub-license-controls.spec.ts | Live UI | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-955 | Hardware ID search input type text | plans/user-license-hub/LIMAS-SUD-955-ulh-a-hw-search-input-type.md | tests/user-license-hub/user-license-hub-license-controls.spec.ts | Live UI, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-956 | Hardware ID search placeholder | plans/user-license-hub/LIMAS-SUD-956-ulh-a-hw-search-placeholder.md | tests/user-license-hub/user-license-hub-license-controls.spec.ts | Live UI | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-957 | Hardware ID search initial empty value | plans/user-license-hub/LIMAS-SUD-957-ulh-a-hw-search-initial-empty.md | tests/user-license-hub/user-license-hub-license-controls.spec.ts | Live UI | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-958 | Hardware ID search enabled state | plans/user-license-hub/LIMAS-SUD-958-ulh-a-hw-search-enabled.md | tests/user-license-hub/user-license-hub-license-controls.spec.ts | Live UI | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-959 | License Filters visibility | plans/user-license-hub/LIMAS-SUD-959-ulh-a-license-filters-visibility.md | tests/user-license-hub/user-license-hub-license-controls.spec.ts | Live UI | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-960 | License Filters aria-expanded | plans/user-license-hub/LIMAS-SUD-960-ulh-a-license-filters-aria-expanded.md | tests/user-license-hub/user-license-hub-license-controls.spec.ts | Live UI, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-961 | License Filters aria-haspopup | plans/user-license-hub/LIMAS-SUD-961-ulh-a-license-filters-aria-haspopup.md | tests/user-license-hub/user-license-hub-license-controls.spec.ts | Live UI, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-962 | Download and Email buttons disabled | plans/user-license-hub/LIMAS-SUD-962-ulh-a-license-toolbar-buttons-disabled.md | tests/user-license-hub/user-license-hub-license-controls.spec.ts | Live UI, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-963 | Add License button disabled | plans/user-license-hub/LIMAS-SUD-963-ulh-a-add-license-button-disabled.md | tests/user-license-hub/user-license-hub-license-controls.spec.ts | Live UI, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-964 | License cards present for selected user | plans/user-license-hub/LIMAS-SUD-964-ulh-a-license-cards-present.md | tests/user-license-hub/user-license-hub-license-list.spec.ts | Live UI | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-965 | License card fields (Profile, Role, etc.) | plans/user-license-hub/LIMAS-SUD-965-ulh-a-license-card-fields.md | tests/user-license-hub/user-license-hub-license-list.spec.ts | Live UI | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-966 | License card Edit and Delete buttons | plans/user-license-hub/LIMAS-SUD-966-ulh-a-license-card-edit-delete.md | tests/user-license-hub/user-license-hub-license-list.spec.ts | Live UI | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-967 | Maintenance and Expiration dates yyyy-mm-dd | plans/user-license-hub/LIMAS-SUD-967-ulh-a-license-card-date-format.md | tests/user-license-hub/user-license-hub-license-list.spec.ts | Live UI | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-968 | License cards panel scrollable | plans/user-license-hub/LIMAS-SUD-968-ulh-a-license-cards-scrollable.md | tests/user-license-hub/user-license-hub-license-list.spec.ts | Live UI, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-969 | GET /api/users/f on navigation | plans/user-license-hub/LIMAS-SUD-969-ulh-a-user-api-get.md | tests/user-license-hub/user-license-hub-network.spec.ts | Live UI, Network | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-970 | User API query params (page, size, groupids) | plans/user-license-hub/LIMAS-SUD-970-ulh-a-user-api-query-params.md | tests/user-license-hub/user-license-hub-network.spec.ts | Live UI, Network | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-971 | User API 200 OK JSON response | plans/user-license-hub/LIMAS-SUD-971-ulh-a-user-api-response.md | tests/user-license-hub/user-license-hub-network.spec.ts | Live UI, Network | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-972 | Search inputs lack accessible names | plans/user-license-hub/LIMAS-SUD-972-ulh-a-search-no-accessible-name.md | tests/user-license-hub/user-license-hub-accessibility.spec.ts | Live UI, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-973 | Search placeholder-only naming | plans/user-license-hub/LIMAS-SUD-973-ulh-a-search-placeholder-only-naming.md | tests/user-license-hub/user-license-hub-accessibility.spec.ts | Live UI, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-974 | Single h1 heading, no h2 page headings | plans/user-license-hub/LIMAS-SUD-974-ulh-a-heading-hierarchy.md | tests/user-license-hub/user-license-hub-accessibility.spec.ts | Live UI, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-975 | Filter buttons communicate expanded state and dialog popup | plans/user-license-hub/LIMAS-SUD-975-ulh-a-filter-buttons-expanded-state.md | tests/user-license-hub/user-license-hub-accessibility.spec.ts | Live UI, DOM | SUPER_USER_ADMIN_USER | Not Run |