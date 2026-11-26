# LIMAS Test Automation — Generated Test Index

## System User Dashboard

### Batch Execution Framework (November 2026)

The 913 System User Dashboard tests are divided into 20 named batches (max 50 tests each) for controlled local execution. Batch definitions live in `config/sud-batches.json`. Use `.\scripts\run-tests-with-report.ps1 -ListBatches` to display them all.

Authentication state is saved once per profile and reused across all tests in a batch:
- Setup: `tests/auth.setup.ts` — generates `.auth/<profile>.json`
- SUD tests use the `system-user-dashboard` Playwright project, which auto-runs `auth-setup` project as a dependency if the saved state is missing/expired.
- Individual tests receive a fresh page/context but skip UI sign-in when a valid state exists.

**Runner usage:**
```powershell
# List all batches
.\scripts\run-tests-with-report.ps1 -ListBatches

# Run a specific batch
.\scripts\run-tests-with-report.ps1 -Suite system-user-dashboard -Batch SUD-PL-01

# Run full suite (no batch filter)
.\scripts\run-tests-with-report.ps1 -Suite system-user-dashboard
```

Default `Workers: 1`. Batch name is embedded in the run folder (e.g. `system-user-dashboard_SUD-FL-02_2026-11-21_14-00-00_SUPER_USER_ADMIN_USER`).

### Execution Batches

| Batch | Section | ID Range | Tests |
|-------|---------|----------|-------|
| SUD-PL-01 | Pending License Requests | 1-46 | 46 |
| SUD-PL-02 | Pending License Requests | 47-81 | 35 |
| SUD-PL-03 | Pending License Requests | 82-127 | 46 |
| SUD-PL-04 | Pending License Requests | 128-160 | 33 |
| SUD-PL-05 | Pending License Requests | 161-210 | 50 |
| SUD-PL-06 | Pending License Requests | 211-268 | 50 |
| SUD-EL-01 | Active User Licenses | 273-315 | 43 |
| SUD-EL-02 | Active User Licenses | 316-360 | 45 |
| SUD-EL-03 | Active User Licenses | 361-416 | 50 |
| SUD-EL-04 | Active User Licenses | 417-463 | 47 |
| SUD-EL-05 | Active User Licenses | 464-517 | 50 |
| SUD-EL-06 | Active User Licenses | 518-589 | 50 |
| SUD-EL-07 | Active User Licenses | 590-640 | 50 |
| SUD-EFC-01 | Floating License Configurations | 641-690 | 50 |
| SUD-EFC-02 | Floating License Configurations | 692-743 | 50 |
| SUD-EFC-03 | Floating License Configurations | 744-799 | 50 |
| SUD-EFC-04 | Floating License Configurations | 800-843 | 44 |
| SUD-EFC-05 | Floating License Configurations | 844-860 | 17 |
| SUD-FL-01 | Floating Licenses | 861-887 | 27 |
| SUD-FL-02 | Floating Licenses | 888-925 | 38 |
| **Total** | | | **913** |

### Legacy Batch Index (pre-batch-framework)

| Batch | Test ID Range | Count | Type | Status |
|-------|--------------|-------|------|--------|
| EFC-A (Shell & Zero-Data) | LIMAS-SUD-641 to LIMAS-SUD-715 | 75 | Shell, empty states, loading | Complete |
| EFC-B (Expiration & Maintenance) | LIMAS-SUD-716 to LIMAS-SUD-778 | 63 | Filter switching, radio controls | Complete |
| EFC-C (Date Input) | LIMAS-SUD-779 to LIMAS-SUD-819 | 41 | Expires until date input | Complete |
| EFC-D (Search Input) | LIMAS-SUD-820 to LIMAS-SUD-843 | 24 | Search input, client-side filtering | Complete |
| EFC-F (Combined Date & Search) | LIMAS-SUD-844 to LIMAS-SUD-860 | 17 | Combined date+search interaction | Complete |

**Total EFC cases:** 220 | **Blocked:** 0 | **Executed:** 0

### Floating Licenses

| Batch | Test ID Range | Count | Type | Status |
|-------|--------------|-------|------|--------|
| FL-A (Shell & Zero-Data) | LIMAS-SUD-861 to LIMAS-SUD-887 | 27 | Summary card, section shell, controls, network, empty state | Complete |
| FL-B (Date, Search, Combined, Zero-State) | LIMAS-SUD-888 to LIMAS-SUD-925 | 38 | Date behavior, search behavior, combined filters, zero-state, network, a11y | Complete |

**Total FL cases:** 65 | **Blocked:** 0 | **Executed:** 0

### Other Sections

| Batch | Test ID Range | Count | Type | Status |
|-------|--------------|-------|------|--------|
| Pending License Requests | LIMAS-SUD-001 to LIMAS-SUD-640 | 640 | Approvals, history, pagination | Complete |

### User & License Hub

| Batch | Test ID Range | Count | Type | Status |
|-------|--------------|-------|------|--------|
| ULH-A (Shell, Controls, Lists, Network, A11y) | LIMAS-SUD-926 to LIMAS-SUD-975 | 50 | Navigation, page shell, user controls, license controls, user list, pagination, license list, network, accessibility | Complete |

**Total ULH cases:** 556 | **Blocked:** 0 | **Executed:** 0

## Reports

### Standard Licenses

| Batch | Test ID Range | Count | Type | Status |
|-------|--------------|-------|------|--------|
| RSL-A (Shell, Active View, Table, Filters Shell, Initial Request) | LIMAS-SUD-1482 to LIMAS-SUD-1511 | 30 | Navigation, page shell, cards, tabs, toolbar, filters panel, table, network, accessibility | Complete |
| RSL-B (Infinite Scroll, Append, Pagination, Loading, End-of-Data, A11y, Restoration) | LIMAS-SUD-1512 to LIMAS-SUD-1529 | 18 | Scroll container, sentinel, non-boundary scroll, next-page request, row append, duplicate prevention, loading indicator, scroll stability, state preservation, end-of-data contract, failure plans, accessibility, restoration | Complete |
| RSL-C (Core Filters — Email, HW IDs, Groups, Profiles, Roles, Clear, Combined) | LIMAS-SUD-1530 to LIMAS-SUD-1556 | 27 | Filter panel, email filter, hardware IDs filter, user group, product profile, profile role dependency, clear button, combined filters, filter reset, result synchronization | Complete |
| RSL-D (Date Filters — Expiration, Maintenance, Created, Modified, Clear, Combined) | LIMAS-SUD-1557 to LIMAS-SUD-1583 | 27 | Date control structure, native picker, expiration date matrix, maintenance date, created date, modified date, date contract, clear, combined dates, core+date, scroll reset, counts, no-result, a11y | Complete |
| RSL-E (Mode Switching — Active↔Deleted, API Contract, Counts, Table, Scroll, Filters, Clear, Stale Response, Loading, A11y) | LIMAS-SUD-1584 to LIMAS-SUD-1609 | 26 | Mode control structure, already-selected, active-to-deleted, deleted API, deleted counts, deleted table, deleted scroll, filter persistence, core filters in deleted, date filters in deleted, clear in deleted, deleted-to-active, stale response, loading indicator, a11y | Complete |
| RSL-F (Export Excel — Button, Unfiltered, Filtered, Deleted, Workbook, Cleanup, A11y, Failures) | LIMAS-SUD-1610 to LIMAS-SUD-1635 | 26 | Export button structure, keyboard, zero-results, pending state, contract, unfiltered scope, UI preservation, filename, workbook validation, MIME, core-filtered, date-filtered, combined-filtered, zero-result export, restoration, deleted availability, deleted scope, duplicate protection, cleanup, a11y, controlled failures | Complete |

### Floating Licenses

| Batch | Test ID Range | Count | Type | Status |
|-------|--------------|-------|------|--------|
| RFL-A (Shell, Active View, Filters, Table, Network, A11y, Restoration) | LIMAS-SUD-1636 to LIMAS-SUD-1662 | 27 | Card selection, keyboard, active/deleted controls, toolbar counts, filters panel, filter inventory, profile role dependency, clear, export button, table/empty state, API contract, pagination, request count, loading, infinite-scroll mechanism, empty-state a11y, card a11y, mode a11y, filter/export a11y, safe restoration | Complete |
| RFL-B (Filters — Email, HW IDs, Profile, Role, Dates, Clear, Combined, A11y) | LIMAS-SUD-1663 to LIMAS-SUD-1683 | 21 | Email input/chip/remove, client-side filtering, HW IDs structure, Product Profile combobox/selection/pill, Profile Role dependency/selection, profile-clear cascade, Expiration Date native input/chip, License Created Date, Clear panel/Clear all, combined filters, client-side filter contract, zero-result counts, filtered empty state, panel state/focus, filter a11y, chip a11y, restoration | Complete |
| RFL-C (Active/Deleted Mode Switching, Deleted API, Deleted Table, Filter Persistence, Scroll Reset, Stale Response, A11y) | LIMAS-SUD-1684 to LIMAS-SUD-1705 | 22 | Mode control semantics, already-selected Active, Active-to-Deleted switching, Deleted API contract (allfloatingdeleted), Deleted data availability, Deleted counts, Deleted table structure (5 headers + Details), Export state, filter persistence, non-date filter in Deleted, date filter in Deleted, clear in Deleted, scroll/sentinel reset, Deleted-to-Active switching, stale response safety, loading state, mode a11y, mode-change a11y, table a11y, filter state a11y, safe restoration | Complete |
| RFL-D (Deleted Infinite Scroll — Container, Sentinel, Batch, Continuation, Append, Counts, Dup Prevention, Loading, Stability, End-of-Data, A11y) | LIMAS-SUD-1706 to LIMAS-SUD-1722 | 17 | Scroll container (overflow-y:auto, flex-1, min-h-[260px]), initial batch (page=0, size=500), sentinel (div.h-4[aria-hidden=true], 16px), non-boundary scroll, controlled continuation, sequential pages (0-16), row append (not replace), loaded count sync, duplicate prevention, loading indicator, scroll stability, mode/filter preservation, end-of-data (last:true, totalPages=28), scroll a11y, count a11y, no Active contamination, safe restoration | Complete |
| RFL-E (Export Excel — Button, Contract, Workbook, UI, Filtered, Cleanup, A11y, Failures) | LIMAS-SUD-1723 to LIMAS-SUD-1740 | 18 | Client-side export via xlsx.js (no server request), disabled in Active (0 records), enabled in Deleted, keyboard activation, limas-reports.xlsx, 1 sheet 8 columns, workbook validation, UI preservation, filename safety, MIME/size, filtered export (Profile/Date), zero-result, duplicate protection, cleanup, a11y, restoration | Complete |

### Floating Configurations

| Batch | Test ID Range | Count | Type | Status |
|-------|--------------|-------|------|--------|
| RFC-A (Shell, Error State, Filters Panel, Export, A11y, Restoration) | LIMAS-SUD-1741 to LIMAS-SUD-1762 | 22 | Card selection (3), Active mode (4), toolbar & counts (3), filters panel (5: toggle, shell, inventory, profile-role dep, clear), export button (1), error state (4: 500 error, API contract GET /api/report/all, pagination mechanism, retry), a11y (1), safe restoration (1) | Complete |
| RFC-B (Error & Deleted Mode — Asymmetric API, Deleted Table, Mode Switching, A11y, Freshness, Restoration) | LIMAS-SUD-1763 to LIMAS-SUD-1780 | 18 | Active error 500 (2), Deleted mode selection (3: mode click, API contract GET /report/alldeleted 200, counts), deleted table structure (2: 6 headers, row sub-fields), Deleted export (1), mode switching (5: D→A, A→D↔A→D, re-click, stale, loading), filter preservation (1), a11y (2: mode switching, error state), restoration (1), data freshness (1) | Complete |
| RFC-C (Deleted Filters, Client-Side Filtering, Export Excel, A11y, Restoration) | LIMAS-SUD-1781 to LIMAS-SUD-1807 | 27 | Full auto-load (2 API pages, 598 records, 150 rows), counts sync, 3 Deleted-mode filters (Deleted By/Created By/Group Name — different from Active 8), client-side filtering (individual/combined/zero-result/contract/counts-relationship/empty-state), filter state (scroll stability, stale prevention, clear restoration), Export Excel (button state, client-side contract, workbook validation — "Exported Deleted Configs" 15 columns, row count, filtered scope, UI preservation, duplicate protection, cleanup), a11y (2), safe restoration to Active error (1) | Complete |

**Total RFC cases:** 67 | **Blocked:** 0 | **Executed:** 0

**Total RFL cases:** 105 | **Blocked:** 0 | **Executed:** 0

**Total RSL cases:** 154 | **Blocked:** 0 | **Executed:** 0

## Floating License Configurations

| Batch | Test ID Range | Count | Type | Status |
|-------|--------------|-------|------|--------|
| FLC-A (Group Selection — Navigation, Tree, Search, Expand/Collapse, Selection, Configuration Shell, Back/Change, Subgroup, Restoration) | LIMAS-SUD-1808 to LIMAS-SUD-1840 | 33 | Page shell, group tree structure, search groups, expand/collapse, runtime group selection, configuration page shell, back/change group, parent/subgroup selection, safe restoration | Complete |
| FLC-B (List Controls — Shell, Search, Filters, Refresh, Include Subgroups, Safe Restoration) | LIMAS-SUD-1841 to LIMAS-SUD-1864 | 24 | Configuration list shell, client-side search, filters panel (product profile, profile role, expiration, maintenance, checkout availability), refresh, include subgroups checkbox, safe restoration | Complete |
| FLC-C (Cards and Selection — Card Collection, Structure, Individual/Multi Selection, Search/Filter Interaction, Menu, Accessibility, Restoration) | LIMAS-SUD-1865 to LIMAS-SUD-1888 | 24 | Card collection sync, card structure (checkbox, title, capacity, checkout, dates, actions), individual selection toolbar, multiple selection (data-dependent), search/filter selection interaction, three-dot menu structure, accessibility, safe restoration | Complete |
| FLC-D (Bulk Actions — Selection Toolbar, Select Loaded & Clear, Dates Panel, Capacity Panel, Delete Action, Safe Restoration) | LIMAS-SUD-1889 to LIMAS-SUD-1916 | 28 | Selection toolbar structure (7), select loaded & clear (5), dates panel inspection (7), capacity panel inspection (6), delete immediate destructive (2), safe restoration (1) | Complete |
| FLC-E (Create Configuration — Form Shell, Fields, Validation, Dismissal, Reset, Safe Restoration) | LIMAS-SUD-1917 to LIMAS-SUD-1945 | 29 | Form shell & layout (5), user group (3), product profile (3), profile role (4), number of licenses (2), max checkout time (2), availability (2), date fields (2), save state (2), dismissal (2), reset (1), safe restoration (1) | Complete |
| FLC-F (View Details — Menu Item, Panel Structure, Fields, Audit, System IDs, Dismissal, Safe Restoration) | LIMAS-SUD-1946 to LIMAS-SUD-1967 | 22 | Menu item (3), panel shell (4), identity fields (3), capacity & checkout (3), date fields (2), audit fields (3), system IDs (1), feature note (1), dismissal (1), safe restoration (1) | Complete |
| FLC-G (Edit Configuration — Form Shell, Prepopulation, Editable Fields, Validation, Reset & Dismissal, Gated Lifecycle, Safe Restoration) | LIMAS-SUD-1968 to LIMAS-SUD-1992 | 25 | Form shell (3), prepopulation (7), disabled fields (1), editable behavior (5), numeric validation (2), save state (2), reset & dismissal (3), gated lifecycle (1), safe restoration (1) | Complete |
| FLC-H (Delete Configuration — Card-Menu Delete, Bulk Delete, Controlled Lifecycle, Failure Recovery, Duplicate Prevention, Safe Restoration) | LIMAS-SUD-1993 to LIMAS-SUD-2008 | 16 | Card-menu delete (4), bulk delete (4), controlled lifecycle (2), failure recovery (3 skipped), duplicate prevention (1), safe restoration (2) | Complete |

**Total FLC cases:** 201 | **Blocked:** 0 | **Executed:** 0

---

## Standard License Configurations

| Batch / Section | IDs | Cases | Breakdown | Status |
|-----------------|-----|-------|-----------|--------|
| SLC-A (Read-Only Data Page — Page Shell, Cards, Data Validation, API, State, Accessibility) | LIMAS-SUD-2009 to LIMAS-SUD-2028 | 20 | Page shell (5), cards (5), data validation (4), API (2), state handling (2), accessibility (2) | Complete |

**Total SLC cases:** 20 | **Blocked:** 0 | **Executed:** 0

---

## Features

| Batch / Section | IDs | Cases | Breakdown | Status |
|-----------------|-----|-------|-----------|--------|
| FTR-A (Page Shell, Hierarchy, Search, Row Structure, Used in Profiles Dialog, Profile Navigation, Safe Restoration) | LIMAS-SUD-2029 to LIMAS-SUD-2059 | 31 | Page shell (6), hierarchy (4), search (6), row structure (4), profiles dialog (6), profile navigation (4), safe restoration (1) | Complete |
| FTR-B (Add Root Feature Dialog — Dialog Shell, Feature Name/ID, Description, Versions, Access Levels, Save State, Dismissal, Gated Lifecycle, Safe Restoration) | LIMAS-SUD-2060 to LIMAS-SUD-2091 | 32 | Dialog shell (5), name/ID (5), description (4), versions (5), access levels (4), save state (3), dismissal (4), gated lifecycle (1), safe restoration (1) | Complete |
| FTR-C (Add Child Feature Dialog — Dialog Shell, Access Levels Inheritance, Parent Context, Field Behavior, Save State, Dismissal, Gated Lifecycle, Safe Restoration) | LIMAS-SUD-2092 to LIMAS-SUD-2116 | 25 | Dialog shell (3), access levels inheritance (4), parent context (2), field behavior (9), save state (1), dismissal (4), gated lifecycle (1), safe restoration (1) | Complete |
| FTR-D (Edit Feature Dialog — Dialog Shell, Prepopulation, Root vs Child, Field Edits, Save State, Dismissal, Validation, Gated Lifecycle, Safe Restoration) | LIMAS-SUD-2117 to LIMAS-SUD-2143 | 27 | Dialog shell (3), prepopulation (5), root vs child (3), field edits (5), save state (1), dismissal (4), validation (4), gated lifecycle (1), safe restoration (1) | Complete |
| FTR-E (Delete Feature — Button Visibility, Disabled/Enabled Rules, Confirmation Dialog, Gated Lifecycle, Safe Restoration) | LIMAS-SUD-2144 to LIMAS-SUD-2164 | 21 | Button visibility/semantics (3), disabled/enabled rules (9), confirmation dialog (7), gated lifecycle (1), safe restoration (1) | Complete |
| FTR-F (Feature Update Management — Modal Shell, File Upload, Comments, Dismissal, Accessibility, Gated Lifecycle, Safe Restoration) | LIMAS-SUD-2165 to LIMAS-SUD-2191 | 27 | Modal shell (5), file upload (7), comments (5), dismissal (5), accessibility (3), gated lifecycle (1), safe restoration (1) | Complete |

**Total FTR cases:** 163 | **Blocked:** 0 | **Executed:** 0

---
+
+## Profiles
+
+| Batch / Section | IDs | Cases | Breakdown | Status |
+|-----------------|-----|-------|-----------|--------|
+| PRF-A (Page Shell, Search, Sorting, Card Structure, Accessibility, Safe Restoration) | LIMAS-SUD-2192 to LIMAS-SUD-2223 | 32 | Page shell (7), search (7), sorting (4), card structure (9), accessibility (4), safe restoration (1) | Complete |
+| PRF-B (Manage Profile Dialog) | LIMAS-SUD-2224 to LIMAS-SUD-2247 | 24 | Opening and Shell (5), Overview Tab (7), Tab Switching (3), Roles Tab (3), Features Tab (4), Dialog Dismiss and Reopen (2) | Complete |
+| PRF-C (Manage Profile Roles) | LIMAS-SUD-2248 to LIMAS-SUD-2289 | 42 | Roles Tab Shell (5), Existing Role Rows (8), Add Role Dialog (6), Validation (12), Dismissal (5), Action Inspection (2), Accessibility (2), Synthetic Lifecycle (1), End-State Restoration (1) | Complete |
+| PRF-D (Create Profile) | LIMAS-SUD-2290 to LIMAS-SUD-2317 | 28 | Dialog Structure (7), Profile Name (6), Description (5), Save-State (4), Dismissal (4), Synthetic Lifecycle (1), End-State Restoration (1) | Complete |
+| PRF-E (Manage Profile Features) | LIMAS-SUD-2318 to LIMAS-SUD-2345 | 28 | Features Tab Shell (5), Existing Feature Rows (5), Add Feature Control (4), Remove Control (1), Version Dropdown (2), Access Level Dropdown (2), Save Behavior (1), Create Feature Inspection (1), Tab Switching and Dismissal (4), Accessibility (2), Synthetic Lifecycle (1) | Complete |
+| PRF-F (Edit Profile) | LIMAS-SUD-2346 to LIMAS-SUD-2372 | 27 | Dialog Structure (7), Prepopulated Values (3), Save State (5), Description Field (4), Dismissal (4), Accessibility (2), Synthetic Lifecycle (1), End-State Restoration (1) | Complete |
+| PRF-G (Delete Profile) | LIMAS-SUD-2373 to LIMAS-SUD-2390 | 18 | Delete Button Structure (4), Confirmation Dialog (7), Search and Sorting (2), Controlled Failure (3), Accessibility (1), Synthetic Lifecycle (1) | Complete |
+
+**Total PRF cases:** 199 | **Blocked:** 0 | **Executed:** 0
+
+---
+

---

+## User Groups

+| Batch / Section | IDs | Cases | Breakdown | Status |
+|-----------------|-----|-------|-----------|--------|
+| UGR-A (Page Shell, Hierarchy, Search, Expand/Collapse, Row Actions, API, Accessibility, Safe Restoration) | LIMAS-SUD-2391 to LIMAS-SUD-2437 | 47 | Page Shell (8), Hierarchy (7), Expand/Collapse All (7), Search (8), Row-Action Structure (6), API and States (3), Accessibility (7), Safe Restoration (1) | Complete |
+| UGR-B (Add Group) | LIMAS-SUD-2438 to LIMAS-SUD-2462 | 25 | Dialog Structure (7), Group Name (7), Comment Field (3), Dismissal (4), Accessibility (3), Gated Lifecycle (1) | Complete |
+| UGR-C (Add Subgroup) | LIMAS-SUD-2463 to LIMAS-SUD-2483 | 21 | Dialog Structure (6), Parent Context (3), Group Name (4), Dismissal (4), Accessibility (3), Gated Lifecycle (1) | Complete |
+| UGR-D (Edit Group) | LIMAS-SUD-2484 to LIMAS-SUD-2504 | 21 | Dialog Structure (5), Prepopulated Values (3), Save State (4), Dismissal (4), Root vs Subgroup (2), Accessibility (2), Gated Lifecycle (1) | Complete |
+| UGR-E (Delete Group) | LIMAS-SUD-2505 to LIMAS-SUD-2522 | 18 | Delete Button (4), Confirmation Dialog (4), Warning Text (3), Dismissal (3), State After Cancel (2), Accessibility (1), Gated Lifecycle (1) | Complete |

+**Total UGR cases:** 132 | **Blocked:** 0 | **Executed:** 0

+---

+
+## System Users
+
+| Batch / Section | IDs | Cases | Breakdown | Status |
+|-----------------|-----|-------|-----------|--------|
+| SYU-A (Search, Filters, Table, and Assignment Expansion) | LIMAS-SUD-2523 to LIMAS-SUD-2551 | 29 | Page Shell (7), Search (7), Profiles Filter (3), User Groups Filter (3), User Groups Overflow (3), Profiles Overflow (2), Edit Action (3), Accessibility (1) | Complete |
+| SYU-B (Edit Assignments) | LIMAS-SUD-2552 to LIMAS-SUD-2575 | 24 | Dialog Shell (4), Prepopulated (4), Profile Assignments (4), User Group Assignments (3), Update State (4), Dismissal (4), Gated Lifecycle (1) | Complete |
+
+**Total SYU cases:** 53 | **Blocked:** 0 | **Executed:** 0
+
+---
+

+---
+
++## Server License Management
++
++| Batch / Section | IDs | Cases | Breakdown | Status |
++|-----------------|-----|-------|-----------|--------|
++| SVL-A (Initial Page Shell — Route, Selector, Filters, Cards, Row Actions, Expand/Collapse, Scrolling, API, Accessibility, Safe Restoration) | LIMAS-SUD-2576 to LIMAS-SUD-2612 | 37 | Page Shell (6), Server License Selector (3), Filters (4), Add Customer (2), Card Collection (3), Card Structure (3), Row Actions (4), Expand/Collapse (4), Scrolling (2), API Contract (2), Keyboard/A11y (3), Safe Restoration (1) | Complete |
++| SVL-B (Create Server License Dialog — Button Visibility, Dialog Structure, Filename Behavior, Download Behavior, Apply/Cancel Controls, Feedback, Focus/Keyboard, Accessibility) | LIMAS-SUD-2613 to LIMAS-SUD-2641 | 29 | Button Visibility/A11y (4), Dialog Structure (3), Filename Behavior (6), Download Behavior (3), Apply/Cancel Controls (8), Feedback (2), Focus/Keyboard (4), Accessibility (1) | Complete |
++| SVL-C (Edit Customer Dialog — Button, Dialog, Fields, Apply State, Dismissal, User Groups Add/Edit/Delete, System User, Focus/Keyboard, Accessibility) | LIMAS-SUD-2642 to LIMAS-SUD-2673 | 32 | Button/Dialog (3), Form Fields (3), Apply State (7), Dismissal (3), User Groups (9), System User (2), Focus/Keyboard (4), Feedback/Accessibility (2) | Complete |
++| SVL-D (Delete Customer + Standard Licenses — Delete Customer Dependencies/Dialog/Focus, Standard Licenses Section/Tabs/Cards, Edit/Delete Standard License) | LIMAS-SUD-2674 to LIMAS-SUD-2719 | 46 | Delete Customer Button/Deps (5), Confirmation Dialog (5), Focus (2), Delete Lifecycle (1 blocked), SL Section (4), Tabs (4), Empty States (2), SL Cards (4), Card Fields (5), Edit SL (10), Delete SL (3), Accessibility (1) | Complete |
++| SVL-E (Floating Licenses + Create Floating/Standard License — Floating Cards/Fields, Edit/Delete FL, Create FL Form, Create SL Form) | LIMAS-SUD-2720 to LIMAS-SUD-2806 | 87 | Floating Tab/Cards (21), Edit FL (19), Delete FL (5), Create FL (21), Create SL (21) | Complete |
++
++**Total SVL cases:** 231 | **Blocked:** 5 | **Executed:** 0
++
++---
++
++**Grand Total:** 2858 cases | **Blocked:** 5 | **Executed:** 0 | **Last ID:** LIMAS-SUD-2806