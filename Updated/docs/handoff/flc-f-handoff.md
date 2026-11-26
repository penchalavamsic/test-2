## Floating License Configurations — View Details (Batch FLC-F)

### Menu Item, Details Panel Structure, Fields, Dismissal, Safe Restoration (FLC-F: SUD-1946 to SUD-1967, 22 tests)

**Verified Floating License Configurations View Details behavior:**

- **Menu Item (3 tests):** View Details menu item is visible in the three-dot actions menu (LIMAS-SUD-1946). The menu item has an accessible aria-label containing "View details for {cardName}" (LIMAS-SUD-1947). Keyboard Enter activation opens the details panel (LIMAS-SUD-1948).
- **Details Panel Shell (4 tests):** Details panel is an **inline region** (role="region"), not a modal dialog (LIMAS-SUD-1949). "Configuration Details" heading text is visible (LIMAS-SUD-1950). Close button has accessible aria-label "Close details for {cardName}" (LIMAS-SUD-1951). Region aria-label is "Details for {cardName}" (LIMAS-SUD-1952).
- **Configuration Identity Fields (3 tests):** Product Profile label and value displayed (LIMAS-SUD-1953). Profile Role label and value displayed (LIMAS-SUD-1954). User Group label and value displayed (LIMAS-SUD-1955).
- **Capacity & Checkout Fields (3 tests):** Total Licenses, Occupied, and Available fields all visible (LIMAS-SUD-1956). Checkout status displayed (Available/Unavailable) (LIMAS-SUD-1957). Max Checkout Time with unit displayed (LIMAS-SUD-1958).
- **Date Fields (2 tests):** Expiration date displayed (LIMAS-SUD-1959). Maintenance date displayed (LIMAS-SUD-1960).
- **Audit Fields (3 tests):** Created date displayed (LIMAS-SUD-1961). Last Modified date displayed (LIMAS-SUD-1962). Created by user displayed (LIMAS-SUD-1963).
- **System ID Fields (1 test):** Configuration ID, Version ID, and System User ID fields visible at panel bottom (LIMAS-SUD-1964).
- **Feature Note (1 test):** "Feature information is not available in this view." note visible (LIMAS-SUD-1965).
- **Dismissal (1 test):** Close button dismisses the details panel (LIMAS-SUD-1966). Confirmed via live UI testing: Escape key does NOT close the details panel (it only closes the parent actions menu when the menu is still open).
- **Safe Restoration (1 test):** After closing details, config list returns to clean state — heading and user group summary visible, no details panel (LIMAS-SUD-1967).

**Key design decisions:**
- Details panel is an **inline region** (role="region") rendered inside the card, not a dialog or separate page.
- The panel appears below the card's existing content, pushing other cards down.
- The Close button is the sole visible dismissal mechanism — Escape dismisses the menu but not the details panel.
- 14 data fields displayed: Product Profile, Profile Role, User Group, Enabled, Checkout, Total Licenses, Occupied, Available, Max Checkout Time, Expiration, Maintenance, Created, Last Modified, Created by.
- Bottom section shows Configuration ID, Version ID, and System User ID.
- Feature section shows a placeholder note when feature data is unavailable.
- All values are read-only — no inputs, toggles, or edit controls.
- Config list remains intact and scrollable with the panel open.

**Blocked cases: 0.**

**- 22 plans, 1 grouped spec, 1 extended Page Object (LIMAS-SUD-1946 to LIMAS-SUD-1967); 0 blocked; not executed**
**- Batch FLC-F status: Complete**

### Test IDs and Descriptions

| Test ID | Atomic Behavior | Plan Path | Script Path | Evidence Source | Profile | Status |
|---------|----------------|-----------|-------------|----------------|---------|--------|
| LIMAS-SUD-1946 | View Details menu item visible in menu | plans/floating-license-configurations/LIMAS-SUD-1946-flc-f-view-details-menu-visible.md | tests/floating-license-configurations/floating-license-configurations-view-details.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1947 | View Details menu item accessible name | plans/floating-license-configurations/LIMAS-SUD-1947-flc-f-view-details-accessible-name.md | tests/floating-license-configurations/floating-license-configurations-view-details.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1948 | View Details keyboard Enter activation | plans/floating-license-configurations/LIMAS-SUD-1948-flc-f-view-details-keyboard-enter.md | tests/floating-license-configurations/floating-license-configurations-view-details.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1949 | Details panel is inline region, not dialog | plans/floating-license-configurations/LIMAS-SUD-1949-flc-f-details-inline-region-not-dialog.md | tests/floating-license-configurations/floating-license-configurations-view-details.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1950 | Configuration Details heading visible | plans/floating-license-configurations/LIMAS-SUD-1950-flc-f-details-heading.md | tests/floating-license-configurations/floating-license-configurations-view-details.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1951 | Close button accessible name | plans/floating-license-configurations/LIMAS-SUD-1951-flc-f-details-close-button-accessible.md | tests/floating-license-configurations/floating-license-configurations-view-details.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1952 | Region accessible name matches card | plans/floating-license-configurations/LIMAS-SUD-1952-flc-f-details-region-accessible-name.md | tests/floating-license-configurations/floating-license-configurations-view-details.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1953 | Product Profile field displayed | plans/floating-license-configurations/LIMAS-SUD-1953-flc-f-details-product-profile.md | tests/floating-license-configurations/floating-license-configurations-view-details.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1954 | Profile Role field displayed | plans/floating-license-configurations/LIMAS-SUD-1954-flc-f-details-profile-role.md | tests/floating-license-configurations/floating-license-configurations-view-details.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1955 | User Group field displayed | plans/floating-license-configurations/LIMAS-SUD-1955-flc-f-details-user-group.md | tests/floating-license-configurations/floating-license-configurations-view-details.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1956 | Total Licenses, Occupied, Available displayed | plans/floating-license-configurations/LIMAS-SUD-1956-flc-f-details-capacity-fields.md | tests/floating-license-configurations/floating-license-configurations-view-details.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1957 | Checkout status displayed | plans/floating-license-configurations/LIMAS-SUD-1957-flc-f-details-checkout-field.md | tests/floating-license-configurations/floating-license-configurations-view-details.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1958 | Max Checkout Time displayed with unit | plans/floating-license-configurations/LIMAS-SUD-1958-flc-f-details-max-checkout.md | tests/floating-license-configurations/floating-license-configurations-view-details.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1959 | Expiration date displayed | plans/floating-license-configurations/LIMAS-SUD-1959-flc-f-details-expiration.md | tests/floating-license-configurations/floating-license-configurations-view-details.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1960 | Maintenance date displayed | plans/floating-license-configurations/LIMAS-SUD-1960-flc-f-details-maintenance.md | tests/floating-license-configurations/floating-license-configurations-view-details.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1961 | Created date displayed | plans/floating-license-configurations/LIMAS-SUD-1961-flc-f-details-created.md | tests/floating-license-configurations/floating-license-configurations-view-details.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1962 | Last Modified date displayed | plans/floating-license-configurations/LIMAS-SUD-1962-flc-f-details-last-modified.md | tests/floating-license-configurations/floating-license-configurations-view-details.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1963 | Created by field displayed | plans/floating-license-configurations/LIMAS-SUD-1963-flc-f-details-created-by.md | tests/floating-license-configurations/floating-license-configurations-view-details.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1964 | Configuration ID, Version ID, System User ID displayed | plans/floating-license-configurations/LIMAS-SUD-1964-flc-f-details-system-ids.md | tests/floating-license-configurations/floating-license-configurations-view-details.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1965 | Feature information note displayed | plans/floating-license-configurations/LIMAS-SUD-1965-flc-f-details-feature-note.md | tests/floating-license-configurations/floating-license-configurations-view-details.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1966 | Close button dismisses panel | plans/floating-license-configurations/LIMAS-SUD-1966-flc-f-details-close-dismisses.md | tests/floating-license-configurations/floating-license-configurations-view-details.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1967 | Safe restoration to clean state | plans/floating-license-configurations/LIMAS-SUD-1967-flc-f-details-safe-restoration.md | tests/floating-license-configurations/floating-license-configurations-view-details.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |