## User & License Hub — Selection, Sync, Scrolling, and Accessibility (Batch ULH-B)

### User Selection, Selection Semantics, License Synchronization, Panel Scrolling, and Accessibility (ULH-B: SUD-976 to SUD-1014, 39 tests)

**Verified ULH-B behaviors:**

- **User Selection (10 tests):** Click selects user card (LIMAS-SUD-976), exclusive single selection (LIMAS-SUD-977), sub-element click selects (LIMAS-SUD-978), selection purely visual — no ARIA (LIMAS-SUD-979), unselected cards have default shadow (LIMAS-SUD-980), selection does not change route (LIMAS-SUD-981), selection does not open dialog (LIMAS-SUD-982), no API request on selection (LIMAS-SUD-983), license panel updates synchronously (LIMAS-SUD-984), Edit/Delete button isolation from card selection (LIMAS-SUD-985).
- **Selection Semantics (8 tests):** Green-ring box-shadow rgb(188,255,71) 2px (LIMAS-SUD-986), no aria-selected (LIMAS-SUD-987), no aria-pressed (LIMAS-SUD-988), no data-state (LIMAS-SUD-989), cards have no semantic role (LIMAS-SUD-990), null tabIndex — excluded from tab order (LIMAS-SUD-991), focus stays on body after selection (LIMAS-SUD-992), selection communicated only through color (LIMAS-SUD-993).
- **License Synchronization (6 tests):** License card count matches badge count (LIMAS-SUD-994), assigned-to maps to selected user (LIMAS-SUD-995), no stale license cards after switching (LIMAS-SUD-996), no duplicate license cards (LIMAS-SUD-997), toolbar enabled when user with licenses selected (LIMAS-SUD-998), toolbar state tracks selection (LIMAS-SUD-999).
- **Panel Scrolling (7 tests):** Selection persists across user-panel scrolling (LIMAS-SUD-1000), scroll position preserved through selection (LIMAS-SUD-1001), license panel independent scrolling (LIMAS-SUD-1002), can select after scrolling to new area (LIMAS-SUD-1003), license scroll container overflow-y: auto (LIMAS-SUD-1004), no API requests on scroll (LIMAS-SUD-1005), selection persists after scroll-back (LIMAS-SUD-1006).
- **Selection Accessibility (8 tests):** Badge singular "1 License" for count=1 (LIMAS-SUD-1007), badge plural "N Licenses" for count>1 (LIMAS-SUD-1008), cards have no accessible name (LIMAS-SUD-1009), no SR announcement for selection changes (LIMAS-SUD-1010), cards are divs not buttons (LIMAS-SUD-1011), no focus management (LIMAS-SUD-1012), scroll region not marked for AT (LIMAS-SUD-1013), cards excluded from keyboard tab order (LIMAS-SUD-1014).

**Key findings:**
- Selection is purely visual — green ring via `box-shadow: rgb(188,255,71) 0px 0px 0px 2px` with elevated shadow on `.rounded-lg.border...` element.
- No ARIA selection semantics, no programmatic state, no accessible name on cards.
- Selection triggers zero API requests — entirely client-side.
- License data embedded in initial user-list response; no separate license endpoint.
- User and license panels scroll independently.
- Selection persists across all scroll operations.
- Toolbar buttons (Download, Email, Add License) become enabled when user with ≥1 license is selected.
- Cards are divs with `tabIndex: null` — excluded from keyboard focus order.
- Badge uses "1 License" (singular) vs "N Licenses" (plural) correctly.
- All 20 users on page 1 have ≥1 license; zero-license case not naturally available.
- No POST/PUT/PATCH/DELETE to any LIMAS API during any ULH-B activity.

**Blocked cases: 0.** All 39 cases are deterministic and supported by live UI observation.

- **39 plans, 5 grouped spec files (LIMAS-SUD-976 to LIMAS-SUD-1014); 0 blocked; not executed**
- **Batch ULH-B status: Complete**

### Test IDs and Descriptions

| Test ID | Atomic Behavior | Plan Path | Script Path | Evidence Source | Profile | Status |
|---------|----------------|-----------|-------------|----------------|---------|--------|
| LIMAS-SUD-976 | Click selects user card | plans/user-license-hub/LIMAS-SUD-976-ulh-b-click-selects-user-card.md | tests/user-license-hub/user-license-hub-user-selection.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-977 | Single exclusive selection | plans/user-license-hub/LIMAS-SUD-977-ulh-b-single-exclusive-selection.md | tests/user-license-hub/user-license-hub-user-selection.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-978 | Sub-element click selects card | plans/user-license-hub/LIMAS-SUD-978-ulh-b-sub-element-click-selection.md | tests/user-license-hub/user-license-hub-user-selection.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-979 | Selection purely visual — no ARIA | plans/user-license-hub/LIMAS-SUD-979-ulh-b-selection-purely-visual.md | tests/user-license-hub/user-license-hub-user-selection.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-980 | Unselected cards have default shadow | plans/user-license-hub/LIMAS-SUD-980-ulh-b-unselected-default-shadow.md | tests/user-license-hub/user-license-hub-user-selection.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-981 | Selection does not change route | plans/user-license-hub/LIMAS-SUD-981-ulh-b-selection-no-route-change.md | tests/user-license-hub/user-license-hub-user-selection.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-982 | Selection does not open dialog | plans/user-license-hub/LIMAS-SUD-982-ulh-b-selection-no-dialog.md | tests/user-license-hub/user-license-hub-user-selection.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-983 | No API request on selection | plans/user-license-hub/LIMAS-SUD-983-ulh-b-no-api-on-selection.md | tests/user-license-hub/user-license-hub-user-selection.spec.ts | Live MCP, Network | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-984 | License panel updates synchronously | plans/user-license-hub/LIMAS-SUD-984-ulh-b-license-panel-synchronous-update.md | tests/user-license-hub/user-license-hub-user-selection.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-985 | Edit/Delete buttons isolated from selection | plans/user-license-hub/LIMAS-SUD-985-ulh-b-edit-delete-button-isolation.md | tests/user-license-hub/user-license-hub-user-selection.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-986 | Green-ring box-shadow rgb(188,255,71) | plans/user-license-hub/LIMAS-SUD-986-ulh-b-green-ring-box-shadow.md | tests/user-license-hub/user-license-hub-selection-semantics.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-987 | No aria-selected attribute | plans/user-license-hub/LIMAS-SUD-987-ulh-b-no-aria-selected.md | tests/user-license-hub/user-license-hub-selection-semantics.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-988 | No aria-pressed attribute | plans/user-license-hub/LIMAS-SUD-988-ulh-b-no-aria-pressed.md | tests/user-license-hub/user-license-hub-selection-semantics.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-989 | No data-state attribute | plans/user-license-hub/LIMAS-SUD-989-ulh-b-no-data-state.md | tests/user-license-hub/user-license-hub-selection-semantics.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-990 | Cards have no semantic role | plans/user-license-hub/LIMAS-SUD-990-ulh-b-cards-no-role.md | tests/user-license-hub/user-license-hub-selection-semantics.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-991 | Cards have null tabIndex | plans/user-license-hub/LIMAS-SUD-991-ulh-b-cards-null-tabindex.md | tests/user-license-hub/user-license-hub-selection-semantics.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-992 | Focus stays on body after selection | plans/user-license-hub/LIMAS-SUD-992-ulh-b-focus-stays-on-body.md | tests/user-license-hub/user-license-hub-selection-semantics.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-993 | Selection communicated only through color | plans/user-license-hub/LIMAS-SUD-993-ulh-b-selection-color-only.md | tests/user-license-hub/user-license-hub-selection-semantics.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-994 | License count matches badge count | plans/user-license-hub/LIMAS-SUD-994-ulh-b-license-count-matches-badge.md | tests/user-license-hub/user-license-hub-license-synchronization.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-995 | Assigned-to maps to selected user | plans/user-license-hub/LIMAS-SUD-995-ulh-b-assigned-to-maps-to-user.md | tests/user-license-hub/user-license-hub-license-synchronization.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-996 | No stale license cards after switching | plans/user-license-hub/LIMAS-SUD-996-ulh-b-no-stale-licenses.md | tests/user-license-hub/user-license-hub-license-synchronization.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-997 | No duplicate license cards | plans/user-license-hub/LIMAS-SUD-997-ulh-b-no-duplicate-license-cards.md | tests/user-license-hub/user-license-hub-license-synchronization.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-998 | Toolbar enabled when user selected | plans/user-license-hub/LIMAS-SUD-998-ulh-b-toolbar-buttons-enabled.md | tests/user-license-hub/user-license-hub-license-synchronization.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-999 | Toolbar state tracks selection | plans/user-license-hub/LIMAS-SUD-999-ulh-b-toolbar-buttons-track-selection.md | tests/user-license-hub/user-license-hub-license-synchronization.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1000 | Selection persists across scroll | plans/user-license-hub/LIMAS-SUD-1000-ulh-b-selection-persists-scrolling.md | tests/user-license-hub/user-license-hub-panel-scrolling.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1001 | Scroll preserved through selection | plans/user-license-hub/LIMAS-SUD-1001-ulh-b-scroll-preserved-on-selection.md | tests/user-license-hub/user-license-hub-panel-scrolling.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1002 | License panel independent scroll | plans/user-license-hub/LIMAS-SUD-1002-ulh-b-license-panel-independent-scroll.md | tests/user-license-hub/user-license-hub-panel-scrolling.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1003 | Select after scrolling to new area | plans/user-license-hub/LIMAS-SUD-1003-ulh-b-select-after-scrolling.md | tests/user-license-hub/user-license-hub-panel-scrolling.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1004 | License scroll overflow-y: auto | plans/user-license-hub/LIMAS-SUD-1004-ulh-b-license-scrollbar-always-present.md | tests/user-license-hub/user-license-hub-panel-scrolling.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1005 | No API requests on scroll | plans/user-license-hub/LIMAS-SUD-1005-ulh-b-no-api-on-scroll.md | tests/user-license-hub/user-license-hub-panel-scrolling.spec.ts | Live MCP, Network | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1006 | Selection persists after scroll-back | plans/user-license-hub/LIMAS-SUD-1006-ulh-b-selection-persists-scroll-back.md | tests/user-license-hub/user-license-hub-panel-scrolling.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1007 | Badge singular "1 License" for count=1 | plans/user-license-hub/LIMAS-SUD-1007-ulh-b-badge-singular-1-license.md | tests/user-license-hub/user-license-hub-selection-accessibility.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1008 | Badge plural "N Licenses" for count>1 | plans/user-license-hub/LIMAS-SUD-1008-ulh-b-badge-plural-licenses.md | tests/user-license-hub/user-license-hub-selection-accessibility.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1009 | Cards have no accessible name | plans/user-license-hub/LIMAS-SUD-1009-ulh-b-cards-no-accessible-name.md | tests/user-license-hub/user-license-hub-selection-accessibility.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1010 | No SR announcement for selection | plans/user-license-hub/LIMAS-SUD-1010-ulh-b-no-sr-announcement.md | tests/user-license-hub/user-license-hub-selection-accessibility.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1011 | Cards are divs not buttons | plans/user-license-hub/LIMAS-SUD-1011-ulh-b-cards-not-buttons.md | tests/user-license-hub/user-license-hub-selection-accessibility.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1012 | No focus management for selection | plans/user-license-hub/LIMAS-SUD-1012-ulh-b-no-focus-management.md | tests/user-license-hub/user-license-hub-selection-accessibility.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1013 | Scroll region not marked for AT | plans/user-license-hub/LIMAS-SUD-1013-ulh-b-scroll-region-not-marked.md | tests/user-license-hub/user-license-hub-selection-accessibility.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1014 | Cards excluded from keyboard tab order | plans/user-license-hub/LIMAS-SUD-1014-ulh-b-cards-keyboard-reachable.md | tests/user-license-hub/user-license-hub-selection-accessibility.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |