## Floating License Configurations — Group Selection (Batch FLC-A)

### Navigation, Group Tree, Search, Expand/Collapse, Group Selection, Configuration Shell, Back/Change Group, Subgroup Selection, Safe Restoration (FLC-A: SUD-1808 to SUD-1840, 33 tests)

**Verified Floating License Configurations group-selection behavior:**

- **Page and Group-Panel Shell (8 tests):** Sidebar navigation to `/floating-license-configurations` (LIMAS-SUD-1808), h1 heading "Floating License Configurations" (LIMAS-SUD-1809), "Select a User Group" panel heading visible (LIMAS-SUD-1810), instructional text visible (LIMAS-SUD-1811), Group Search input visible and initially empty (LIMAS-SUD-1812), Expand All and Collapse All buttons visible (LIMAS-SUD-1813), group tree container visible (LIMAS-SUD-1814), no group selected initially (LIMAS-SUD-1815).
- **Group-Tree Structure (5 tests):** Tree items rendered with role="treeitem" (LIMAS-SUD-1816), parent groups have expand chevron (LIMAS-SUD-1817), children become visible after expanding parent (LIMAS-SUD-1818), children hidden after collapsing parent (LIMAS-SUD-1819), collapsed parent has aria-expanded="false" (LIMAS-SUD-1820).
- **Search Groups (4 tests):** Search input filters the tree (LIMAS-SUD-1821), exact group name search shows that group (LIMAS-SUD-1822), clearing search restores full tree (LIMAS-SUD-1823), no-match state when search returns no results (LIMAS-SUD-1824).
- **Expand and Collapse (3 tests):** Expand All expands all parent groups (LIMAS-SUD-1825), Collapse All collapses all expanded groups (LIMAS-SUD-1826), repeated Expand All does not cause errors (LIMAS-SUD-1827).
- **Runtime Group Selection (2 tests):** Selecting a runtime leaf group navigates to configuration page (LIMAS-SUD-1828), only one group selected at a time (LIMAS-SUD-1829).
- **Configuration-Page Shell (3 tests):** Back button and User Group summary visible (LIMAS-SUD-1830), selected group name matches runtime selection (LIMAS-SUD-1831), configuration controls (Search, Filters, Refresh, Create) visible (LIMAS-SUD-1832).
- **Back and Change Group (5 tests):** Back returns to group-selection view (LIMAS-SUD-1833), Change Group returns to group-selection view (LIMAS-SUD-1834), tree state restored after Back (LIMAS-SUD-1835), Search visible after Back (LIMAS-SUD-1836), no stale selected-group details after Back (LIMAS-SUD-1837).
- **Parent and Subgroup Selection (2 tests):** Subgroup selection after expanding parent navigates correctly (LIMAS-SUD-1838), parent not incorrectly shown for subgroup (LIMAS-SUD-1839). Subgroup-specific coverage marked as data-dependent if no subgroups available.
- **Safe Restoration (1 test):** Restore group-selection view to clean state (LIMAS-SUD-1840).

**Key design decisions:**
- All group names, IDs, counts, and hierarchy positions are runtime-discovered — no hardcoded business values.
- Group selection uses a leaf group discovered dynamically (first tree item without a chevron/expand control).
- Parent/subgroup tests are gated: if no parent groups are available, those cases are data-dependent.
- Search fragment is derived from the first 3 characters of the first visible group name.
- Safe restoration clears search, collapses all, and returns to the group-selection view.

**Blocked cases: 0.** All 33 cases are deterministic and supported by runtime UI observation. Subgroup cases marked data-dependent when tree has no expandable parents.

- **33 plans, 1 grouped spec, 1 Page Object (LIMAS-SUD-1808 to LIMAS-SUD-1840); 0 blocked; not executed**
- **Batch FLC-A status: Complete**

### Test IDs and Descriptions

| Test ID | Atomic Behavior | Plan Path | Script Path | Evidence Source | Profile | Status |
|---------|----------------|-----------|-------------|----------------|---------|--------|
| LIMAS-SUD-1808 | Sidebar navigation to /floating-license-configurations | plans/floating-license-configurations/LIMAS-SUD-1808.md | tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1809 | Page heading h1 "Floating License Configurations" | plans/floating-license-configurations/LIMAS-SUD-1809.md | tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1810 | "Select a User Group" heading visible | plans/floating-license-configurations/LIMAS-SUD-1810.md | tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1811 | Instructional text visible | plans/floating-license-configurations/LIMAS-SUD-1811.md | tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1812 | Group Search input visible and initially empty | plans/floating-license-configurations/LIMAS-SUD-1812.md | tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1813 | Expand All and Collapse All buttons visible | plans/floating-license-configurations/LIMAS-SUD-1813.md | tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1814 | Group tree container visible | plans/floating-license-configurations/LIMAS-SUD-1814.md | tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1815 | No group selected initially | plans/floating-license-configurations/LIMAS-SUD-1815.md | tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1816 | Tree items render with role="treeitem" | plans/floating-license-configurations/LIMAS-SUD-1816.md | tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1817 | Parent groups render with expand chevron | plans/floating-license-configurations/LIMAS-SUD-1817.md | tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1818 | Children visible after expanding parent | plans/floating-license-configurations/LIMAS-SUD-1818.md | tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1819 | Children hidden after collapsing parent | plans/floating-license-configurations/LIMAS-SUD-1819.md | tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1820 | Collapsed parent has aria-expanded="false" | plans/floating-license-configurations/LIMAS-SUD-1820.md | tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1821 | Search input filters the group tree | plans/floating-license-configurations/LIMAS-SUD-1821.md | tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1822 | Exact group name search shows that group | plans/floating-license-configurations/LIMAS-SUD-1822.md | tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1823 | Clearing search restores full tree | plans/floating-license-configurations/LIMAS-SUD-1823.md | tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1824 | No-match state when search returns no results | plans/floating-license-configurations/LIMAS-SUD-1824.md | tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1825 | Expand All expands all parent groups | plans/floating-license-configurations/LIMAS-SUD-1825.md | tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1826 | Collapse All collapses all expanded groups | plans/floating-license-configurations/LIMAS-SUD-1826.md | tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1827 | Repeated Expand All does not cause errors | plans/floating-license-configurations/LIMAS-SUD-1827.md | tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1828 | Selecting runtime group navigates to config page | plans/floating-license-configurations/LIMAS-SUD-1828.md | tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1829 | Only one group selected at a time | plans/floating-license-configurations/LIMAS-SUD-1829.md | tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1830 | Config page shows Back button and User Group summary | plans/floating-license-configurations/LIMAS-SUD-1830.md | tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1831 | Selected group name matches runtime selection | plans/floating-license-configurations/LIMAS-SUD-1831.md | tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1832 | Config controls (Search, Filters, Refresh, Create) visible | plans/floating-license-configurations/LIMAS-SUD-1832.md | tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1833 | Back returns to group-selection view | plans/floating-license-configurations/LIMAS-SUD-1833.md | tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1834 | Change Group returns to group-selection view | plans/floating-license-configurations/LIMAS-SUD-1834.md | tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1835 | Tree state restored after Back | plans/floating-license-configurations/LIMAS-SUD-1835.md | tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1836 | Search visible after Back | plans/floating-license-configurations/LIMAS-SUD-1836.md | tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1837 | No stale selected-group details after Back | plans/floating-license-configurations/LIMAS-SUD-1837.md | tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1838 | Subgroup selection navigates correctly (data-dependent) | plans/floating-license-configurations/LIMAS-SUD-1838.md | tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1839 | Parent not shown for subgroup selection | plans/floating-license-configurations/LIMAS-SUD-1839.md | tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1840 | Safe restoration to clean group-selection state | plans/floating-license-configurations/LIMAS-SUD-1840.md | tests/floating-license-configurations/floating-license-configurations-group-selection.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |