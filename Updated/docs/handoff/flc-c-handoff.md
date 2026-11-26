## Floating License Configurations — Configuration Cards and Selection (Batch FLC-C)

### Card Collection, Card Structure, Individual Selection, Multiple Selection, Search/Filter Interaction, Card Menu, Accessibility, Safe Restoration (FLC-C: SUD-1865 to SUD-1888, 24 tests)

**Verified Floating License Configurations card and selection behavior:**

- **Card Collection (3 tests):** Configuration count matches visible card count (LIMAS-SUD-1865), cards are present in a structured grid container (LIMAS-SUD-1866), no duplicate cards by title (LIMAS-SUD-1867).
- **Card Structure (6 tests):** Selection checkbox with accessible name "Select {name}" (LIMAS-SUD-1868), configuration title displayed (LIMAS-SUD-1869), Capacity field with "total · available" format (LIMAS-SUD-1870), Checkout field with status and max duration (LIMAS-SUD-1871), Expiration and Maintenance dates displayed (LIMAS-SUD-1872), three-dot Actions button with accessible name "Actions for {name}" (LIMAS-SUD-1873). Card fields use a 2-column grid layout with `<p>` label + `<p>` value pairs.
- **Individual Selection (4 tests):** Checkbox check shows selection toolbar with count (LIMAS-SUD-1874), exactly one card counted as selected (LIMAS-SUD-1875), deselection clears checkbox state (LIMAS-SUD-1876), Clear button deselects all and hides toolbar (LIMAS-SUD-1877). Selection toolbar shows: "N selected", Select loaded (disabled), Clear, Dates, Capacity, Delete.
- **Multiple Selection (2 tests):** Selection count shows 2 when two cards are checked (LIMAS-SUD-1878) — data-dependent when fewer than 2 cards exist, deselecting one of two reduces count to 1 (LIMAS-SUD-1879).
- **Search and Filter Interaction (2 tests):** Selection persists when search keeps the card visible (LIMAS-SUD-1880), hidden card due to no-match search clears visible selection count to 0 (LIMAS-SUD-1881).
- **Card Menu Structure (3 tests):** Actions button opens a menu with role="menu" (LIMAS-SUD-1882), menu contains "View Details", "Edit", separator, "Delete" items (LIMAS-SUD-1883), Escape key closes the menu (LIMAS-SUD-1884). Edit and Delete are not activated.
- **Accessibility (3 tests):** Card checkbox has role="checkbox" (LIMAS-SUD-1885), Actions button has aria-haspopup="menu" (LIMAS-SUD-1886), field labels (Capacity, Checkout, Expiration, Maintenance) are visually associated with values (LIMAS-SUD-1887).
- **Safe Restoration (1 test):** Selection cleared and returned to clean state with heading and summary visible (LIMAS-SUD-1888).

**Key design decisions:**
- Card selection uses programmatic `.check()`/`.uncheck()` via the checkbox's accessible name "Select {name}".
- Selection toolbar dynamically appears with count and bulk actions when ≥1 card is selected.
- Card menu is a role="menu" with menuitems; only structure is verified — Edit and Delete are never activated.
- Multiple selection tests are gated on card count ≥ 2; marked data-dependent otherwise.
- All card names, field values, and counts are runtime-discovered.

**Blocked cases: 0.** Multiple-selection cases are data-dependent when fewer than 2 cards exist.

- **24 plans, 1 grouped spec, 1 extended Page Object (LIMAS-SUD-1865 to LIMAS-SUD-1888); 0 blocked; not executed**
- **Batch FLC-C status: Complete**

### Test IDs and Descriptions

| Test ID | Atomic Behavior | Plan Path | Script Path | Evidence Source | Profile | Status |
|---------|----------------|-----------|-------------|----------------|---------|--------|
| LIMAS-SUD-1865 | Configuration count matches visible card count | plans/floating-license-configurations/LIMAS-SUD-1865-flc-c-card-count.md | tests/floating-license-configurations/floating-license-configurations-cards.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1866 | Cards present in structured container | plans/floating-license-configurations/LIMAS-SUD-1866-flc-c-card-container.md | tests/floating-license-configurations/floating-license-configurations-cards.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1867 | No duplicate cards | plans/floating-license-configurations/LIMAS-SUD-1867-flc-c-card-uniqueness.md | tests/floating-license-configurations/floating-license-configurations-cards.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1868 | Card checkbox accessible name | plans/floating-license-configurations/LIMAS-SUD-1868-flc-c-card-checkbox-name.md | tests/floating-license-configurations/floating-license-configurations-cards.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1869 | Card title displayed | plans/floating-license-configurations/LIMAS-SUD-1869-flc-c-card-title.md | tests/floating-license-configurations/floating-license-configurations-cards.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1870 | Capacity field with total/available | plans/floating-license-configurations/LIMAS-SUD-1870-flc-c-capacity-field.md | tests/floating-license-configurations/floating-license-configurations-cards.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1871 | Checkout field displayed | plans/floating-license-configurations/LIMAS-SUD-1871-flc-c-checkout-field.md | tests/floating-license-configurations/floating-license-configurations-cards.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1872 | Expiration and Maintenance dates | plans/floating-license-configurations/LIMAS-SUD-1872-flc-c-date-fields.md | tests/floating-license-configurations/floating-license-configurations-cards.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1873 | Actions button accessible name | plans/floating-license-configurations/LIMAS-SUD-1873-flc-c-actions-button.md | tests/floating-license-configurations/floating-license-configurations-cards.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1874 | Checkbox check and selection toolbar | plans/floating-license-configurations/LIMAS-SUD-1874-flc-c-card-select-toolbar.md | tests/floating-license-configurations/floating-license-configurations-cards.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1875 | Selection count of 1 | plans/floating-license-configurations/LIMAS-SUD-1875-flc-c-selection-count.md | tests/floating-license-configurations/floating-license-configurations-cards.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1876 | Checkbox deselection | plans/floating-license-configurations/LIMAS-SUD-1876-flc-c-card-deselection.md | tests/floating-license-configurations/floating-license-configurations-cards.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1877 | Clear button deselects all | plans/floating-license-configurations/LIMAS-SUD-1877-flc-c-clear-button.md | tests/floating-license-configurations/floating-license-configurations-cards.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1878 | Multi-select count of 2 (data-dependent) | plans/floating-license-configurations/LIMAS-SUD-1878-flc-c-multi-select-count.md | tests/floating-license-configurations/floating-license-configurations-cards.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1879 | Partial deselection reduces count | plans/floating-license-configurations/LIMAS-SUD-1879-flc-c-partial-deselection.md | tests/floating-license-configurations/floating-license-configurations-cards.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1880 | Selection persists with matching search | plans/floating-license-configurations/LIMAS-SUD-1880-flc-c-selection-persistence-search.md | tests/floating-license-configurations/floating-license-configurations-cards.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1881 | No-match search clears selection | plans/floating-license-configurations/LIMAS-SUD-1881-flc-c-no-match-selection.md | tests/floating-license-configurations/floating-license-configurations-cards.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1882 | Actions menu role="menu" | plans/floating-license-configurations/LIMAS-SUD-1882-flc-c-actions-menu-open.md | tests/floating-license-configurations/floating-license-configurations-cards.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1883 | Menu items View Details, Edit, Delete | plans/floating-license-configurations/LIMAS-SUD-1883-flc-c-menu-items.md | tests/floating-license-configurations/floating-license-configurations-cards.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1884 | Escape closes menu | plans/floating-license-configurations/LIMAS-SUD-1884-flc-c-escape-menu.md | tests/floating-license-configurations/floating-license-configurations-cards.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1885 | Checkbox role="checkbox" | plans/floating-license-configurations/LIMAS-SUD-1885-flc-c-checkbox-role.md | tests/floating-license-configurations/floating-license-configurations-cards.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1886 | Actions button aria-haspopup="menu" | plans/floating-license-configurations/LIMAS-SUD-1886-flc-c-aria-haspopup.md | tests/floating-license-configurations/floating-license-configurations-cards.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1887 | Field labels associated with values | plans/floating-license-configurations/LIMAS-SUD-1887-flc-c-field-labels.md | tests/floating-license-configurations/floating-license-configurations-cards.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1888 | Safe restoration to clean state | plans/floating-license-configurations/LIMAS-SUD-1888-flc-c-safe-restoration.md | tests/floating-license-configurations/floating-license-configurations-cards.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |