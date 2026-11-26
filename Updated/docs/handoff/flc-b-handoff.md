## Floating License Configurations — Configuration List Controls (Batch FLC-B)

### List Shell, Search, Filters, Refresh, Include Subgroups, Empty State, Safe Restoration (FLC-B: SUD-1841 to SUD-1864, 24 tests)

**Verified Floating License Configurations list-control behavior:**

- **Configuration List Shell (8 tests):** Selected group name displayed in User Group summary (LIMAS-SUD-1841), dynamic configuration count displayed (LIMAS-SUD-1842), Search button visible (LIMAS-SUD-1843), Filters button visible (LIMAS-SUD-1844), Refresh button visible (LIMAS-SUD-1845), Create Configuration button visible without activation (LIMAS-SUD-1846), Include Subgroups checkbox with accessible name (LIMAS-SUD-1847), loaded-status text visible (LIMAS-SUD-1848).
- **Search (6 tests):** Search opens inline textbox "Search loaded configurations" (LIMAS-SUD-1849), filters cards by runtime name fragment (LIMAS-SUD-1850), no-match shows zero cards (LIMAS-SUD-1851), clearing search restores all cards (LIMAS-SUD-1852), case-insensitive mixed-case matching (LIMAS-SUD-1853), closing search restores all cards (LIMAS-SUD-1854). Search is client-side — no API requests.
- **Filters (5 tests):** Panel opens with heading "Configuration Filters" and all controls (LIMAS-SUD-1855), closes via Cancel (LIMAS-SUD-1856), applying Checkout Availability filter shows filter chip (LIMAS-SUD-1857), Clear all removes chips (LIMAS-SUD-1858), Reset restores default radio to "All" (LIMAS-SUD-1859). Filter controls discovered: Product Profile dropdown, Profile Role dropdown, Expiration date, Maintenance date, Checkout Availability radio group (All/Available/Unavailable).
- **Refresh (3 tests):** Refresh preserves selected group name (LIMAS-SUD-1860), preserves configuration count (LIMAS-SUD-1861), preserves visible configuration cards (LIMAS-SUD-1862). Single refresh action, read-only.
- **Include Subgroups (1 test):** Checkbox role="checkbox", accessible name "Include subgroups", boolean checked/enabled states (LIMAS-SUD-1863). May be disabled when no subgroups or no subgroup configs exist.
- **Safe Restoration (1 test):** Restore to clean state — chips cleared, filters closed, heading and summary visible (LIMAS-SUD-1864).

**Key design decisions:**
- Search is client-side filtering on loaded configurations; opens an inline textbox via a Search button.
- Filters are an inline panel (not a dialog) with Product Profile, Profile Role, Expiration, Maintenance, and Checkout Availability controls.
- Applied filters show as chips with individual remove buttons and a "Clear all" button.
- Refresh triggers a read-only reload; preserves group selection and data.
- Include Subgroups may be disabled if the selected group has no child groups with configurations.
- All configuration names, counts, and filter values are runtime-discovered — no hardcoded business data.

**Blocked cases: 0.** All 24 cases are deterministic. Include Subgroups toggle behavior is data-dependent when checkbox is disabled.

- **24 plans, 1 grouped spec, 1 extended Page Object (LIMAS-SUD-1841 to LIMAS-SUD-1864); 0 blocked; not executed**
- **Batch FLC-B status: Complete**

### Test IDs and Descriptions

| Test ID | Atomic Behavior | Plan Path | Script Path | Evidence Source | Profile | Status |
|---------|----------------|-----------|-------------|----------------|---------|--------|
| LIMAS-SUD-1841 | Selected group name in User Group summary | plans/floating-license-configurations/LIMAS-SUD-1841.md | tests/floating-license-configurations/floating-license-configurations-list-controls.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1842 | Dynamic configuration count displayed | plans/floating-license-configurations/LIMAS-SUD-1842.md | tests/floating-license-configurations/floating-license-configurations-list-controls.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1843 | Search button visible | plans/floating-license-configurations/LIMAS-SUD-1843.md | tests/floating-license-configurations/floating-license-configurations-list-controls.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1844 | Filters button visible | plans/floating-license-configurations/LIMAS-SUD-1844.md | tests/floating-license-configurations/floating-license-configurations-list-controls.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1845 | Refresh button visible | plans/floating-license-configurations/LIMAS-SUD-1845.md | tests/floating-license-configurations/floating-license-configurations-list-controls.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1846 | Create Configuration button visible | plans/floating-license-configurations/LIMAS-SUD-1846.md | tests/floating-license-configurations/floating-license-configurations-list-controls.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1847 | Include Subgroups checkbox accessible name | plans/floating-license-configurations/LIMAS-SUD-1847.md | tests/floating-license-configurations/floating-license-configurations-list-controls.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1848 | Loaded-status text visible | plans/floating-license-configurations/LIMAS-SUD-1848.md | tests/floating-license-configurations/floating-license-configurations-list-controls.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1849 | Search opens inline textbox | plans/floating-license-configurations/LIMAS-SUD-1849.md | tests/floating-license-configurations/floating-license-configurations-list-controls.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1850 | Search filters by runtime name fragment | plans/floating-license-configurations/LIMAS-SUD-1850.md | tests/floating-license-configurations/floating-license-configurations-list-controls.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1851 | No-match search zero cards | plans/floating-license-configurations/LIMAS-SUD-1851.md | tests/floating-license-configurations/floating-license-configurations-list-controls.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1852 | Clearing search restores cards | plans/floating-license-configurations/LIMAS-SUD-1852.md | tests/floating-license-configurations/floating-license-configurations-list-controls.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1853 | Search case-insensitive (mixed-case) | plans/floating-license-configurations/LIMAS-SUD-1853.md | tests/floating-license-configurations/floating-license-configurations-list-controls.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1854 | Closing search restores cards | plans/floating-license-configurations/LIMAS-SUD-1854.md | tests/floating-license-configurations/floating-license-configurations-list-controls.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1855 | Filters panel opens with controls | plans/floating-license-configurations/LIMAS-SUD-1855.md | tests/floating-license-configurations/floating-license-configurations-list-controls.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1856 | Filters panel closes via Cancel | plans/floating-license-configurations/LIMAS-SUD-1856.md | tests/floating-license-configurations/floating-license-configurations-list-controls.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1857 | Applied filter shows chip | plans/floating-license-configurations/LIMAS-SUD-1857.md | tests/floating-license-configurations/floating-license-configurations-list-controls.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1858 | Clear all removes filter chips | plans/floating-license-configurations/LIMAS-SUD-1858.md | tests/floating-license-configurations/floating-license-configurations-list-controls.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1859 | Filters Reset clears radio selections | plans/floating-license-configurations/LIMAS-SUD-1859.md | tests/floating-license-configurations/floating-license-configurations-list-controls.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1860 | Refresh preserves group name | plans/floating-license-configurations/LIMAS-SUD-1860.md | tests/floating-license-configurations/floating-license-configurations-list-controls.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1861 | Refresh preserves configuration count | plans/floating-license-configurations/LIMAS-SUD-1861.md | tests/floating-license-configurations/floating-license-configurations-list-controls.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1862 | Refresh preserves visible cards | plans/floating-license-configurations/LIMAS-SUD-1862.md | tests/floating-license-configurations/floating-license-configurations-list-controls.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1863 | Include Subgroups role and initial state | plans/floating-license-configurations/LIMAS-SUD-1863.md | tests/floating-license-configurations/floating-license-configurations-list-controls.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1864 | Safe restoration to clean state | plans/floating-license-configurations/LIMAS-SUD-1864.md | tests/floating-license-configurations/floating-license-configurations-list-controls.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |