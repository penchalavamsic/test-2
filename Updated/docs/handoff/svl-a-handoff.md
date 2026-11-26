## Server License Management — Initial Page Shell (Batch SVL-A)

### Route, Heading, Selector, Filters, Cards, Row Actions, Expand/Collapse, Scrolling, API, Accessibility, Safe Restoration (SVL-A: SUD-2576 to SUD-2612, 37 tests)

**Verified Server License Management initial-page behavior:**

- **Page Shell (6 tests):** Sidebar navigation to `/server-licensing` with aria-current (LIMAS-SUD-2576), h1 heading "Server License Management" (LIMAS-SUD-2577), page description visible (LIMAS-SUD-2578), sidebar highlights active link (LIMAS-SUD-2579), main content region visible (LIMAS-SUD-2580), footer visible (LIMAS-SUD-2581).
- **Server License Selector (3 tests):** Selector visible with label (LIMAS-SUD-2582), runtime options populated (LIMAS-SUD-2583), pre-selected value displayed (LIMAS-SUD-2584).
- **Filters Button (4 tests):** Filters button visible and enabled (LIMAS-SUD-2585), panel initially collapsed (LIMAS-SUD-2586), opens on click (LIMAS-SUD-2587), Escape closes (LIMAS-SUD-2588).
- **Add Customer Button (2 tests):** Button visible (LIMAS-SUD-2589), accessible name present (LIMAS-SUD-2590). No activation performed.
- **Card Collection (3 tests):** Cards visible (LIMAS-SUD-2591), count matches visible cards (LIMAS-SUD-2592), no duplicates (LIMAS-SUD-2593).
- **Card Structure (3 tests):** Each card displays name (LIMAS-SUD-2594), description (LIMAS-SUD-2595), license-status badge (LIMAS-SUD-2596).
- **Row Actions (4 tests):** Create Server License button visible (LIMAS-SUD-2597), Edit button visible (LIMAS-SUD-2598), Delete button visible (LIMAS-SUD-2599), Expand/collapse toggle visible (LIMAS-SUD-2600). No activation performed.
- **Expand/Collapse (4 tests):** Expanding reveals server-license sub-cards and restores (LIMAS-SUD-2601), collapsing hides sub-cards (LIMAS-SUD-2602), Expand All expands all (LIMAS-SUD-2603), Collapse All collapses all (LIMAS-SUD-2604). Data-dependent when <2 cards.
- **Scrolling (2 tests):** Container scrollable on overflow (LIMAS-SUD-2605), scroll-to-bottom changes position (LIMAS-SUD-2606). Data-dependent when <3 cards.
- **Initial API Contract (2 tests):** Read-only GET requests only (LIMAS-SUD-2607), response is valid JSON with 200 (LIMAS-SUD-2608).
- **Keyboard and Accessibility (3 tests):** Tab navigation (LIMAS-SUD-2609), focus indicators visible (LIMAS-SUD-2610), Server License selector accessible name (LIMAS-SUD-2611).
- **Safe Restoration (1 test):** Full end-state restoration — selector restored, filters closed, cards collapsed, scroll reset, no dialog open (LIMAS-SUD-2612).

**Key design decisions:**
- All customer names, server-license names, license types, statuses, counts, card positions, and IDs are runtime-discovered — no hardcoded business values.
- Row actions (Create Server License, Edit, Delete) are verified for visibility and accessibility only — no activation.
- Card actions are located within the dynamically identified card by name, never by nth().
- Expand/collapse tests restore the card to its original state after verification.
- Scrolling tests are gated on having sufficient cards (≥3) to overflow.
- Safe restoration covers selector reset, filters closure, all cards collapsed, scroll to top, no open dialogs.

**Blocked cases: 0.** All 37 cases are deterministic and supported by runtime UI observation. Scroll-related and multi-card tests are data-dependent gated.

- **37 plans, 1 grouped spec, 1 Page Object (LIMAS-SUD-2576 to LIMAS-SUD-2612); 0 blocked; not executed**
- **Batch SVL-A status: Complete**

### Test IDs and Descriptions

| Test ID | Atomic Behavior | Plan Path | Script Path | Evidence Source | Profile | Status |
|---------|----------------|-----------|-------------|----------------|---------|--------|
| LIMAS-SUD-2576 | Sidebar navigation to /server-licensing with aria-current | plans/server-licensing/LIMAS-SUD-2576-svl-a-sidebar-navigation.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2577 | Page heading h1 "Server License Management" | plans/server-licensing/LIMAS-SUD-2577-svl-a-heading-h1.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2578 | Page description text visible | plans/server-licensing/LIMAS-SUD-2578-svl-a-description.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2579 | Sidebar highlights active link | plans/server-licensing/LIMAS-SUD-2579-svl-a-sidebar-selected.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2580 | Main content region visible | plans/server-licensing/LIMAS-SUD-2580-svl-a-main-content.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2581 | Footer visible | plans/server-licensing/LIMAS-SUD-2581-svl-a-footer.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2582 | Server License selector visible with label | plans/server-licensing/LIMAS-SUD-2582-svl-a-selector-visible.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2583 | Selector has runtime options | plans/server-licensing/LIMAS-SUD-2583-svl-a-selector-options.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2584 | Selector shows pre-selected value | plans/server-licensing/LIMAS-SUD-2584-svl-a-selector-value.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2585 | Filters button visible and enabled | plans/server-licensing/LIMAS-SUD-2585-svl-a-filters-button.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2586 | Filters panel initially collapsed | plans/server-licensing/LIMAS-SUD-2586-svl-a-filters-collapsed.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2587 | Filters button opens panel | plans/server-licensing/LIMAS-SUD-2587-svl-a-filters-open.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2588 | Escape closes filters panel | plans/server-licensing/LIMAS-SUD-2588-svl-a-filters-escape.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2589 | Add Customer button visible | plans/server-licensing/LIMAS-SUD-2589-svl-a-add-customer-visible.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2590 | Add Customer button accessible name | plans/server-licensing/LIMAS-SUD-2590-svl-a-add-customer-accessible-name.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2591 | Customer cards visible | plans/server-licensing/LIMAS-SUD-2591-svl-a-cards-visible.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2592 | Count matches visible card count | plans/server-licensing/LIMAS-SUD-2592-svl-a-card-count-match.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2593 | No duplicate cards | plans/server-licensing/LIMAS-SUD-2593-svl-a-no-duplicates.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2594 | Card displays name | plans/server-licensing/LIMAS-SUD-2594-svl-a-card-name.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2595 | Card displays description | plans/server-licensing/LIMAS-SUD-2595-svl-a-card-description.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2596 | Card displays license-status badge | plans/server-licensing/LIMAS-SUD-2596-svl-a-card-license-badge.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2597 | Create Server License button visible | plans/server-licensing/LIMAS-SUD-2597-svl-a-create-server-license-button.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2598 | Edit button visible on card | plans/server-licensing/LIMAS-SUD-2598-svl-a-edit-button.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2599 | Delete button visible on card | plans/server-licensing/LIMAS-SUD-2599-svl-a-delete-button.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2600 | Expand/collapse toggle visible | plans/server-licensing/LIMAS-SUD-2600-svl-a-expand-toggle.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2601 | Expand reveals server-license sub-cards | plans/server-licensing/LIMAS-SUD-2601-svl-a-expand-card.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2602 | Collapse hides sub-cards | plans/server-licensing/LIMAS-SUD-2602-svl-a-collapse-card.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2603 | Expand All expands all cards | plans/server-licensing/LIMAS-SUD-2603-svl-a-expand-all.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2604 | Collapse All collapses all cards | plans/server-licensing/LIMAS-SUD-2604-svl-a-collapse-all.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2605 | Container scrollable on overflow | plans/server-licensing/LIMAS-SUD-2605-svl-a-scrollable.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2606 | Scroll to bottom changes position | plans/server-licensing/LIMAS-SUD-2606-svl-a-scroll-bottom.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2607 | Read-only GET requests only | plans/server-licensing/LIMAS-SUD-2607-svl-a-read-only-api.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2608 | API returns valid JSON 200 | plans/server-licensing/LIMAS-SUD-2608-svl-a-api-json.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2609 | Tab navigation through elements | plans/server-licensing/LIMAS-SUD-2609-svl-a-keyboard-tab.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2610 | Focus indicators visible | plans/server-licensing/LIMAS-SUD-2610-svl-a-focus-indicators.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2611 | Selector has accessible name | plans/server-licensing/LIMAS-SUD-2611-svl-a-selector-accessible-name.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2612 | Safe restoration to clean state | plans/server-licensing/LIMAS-SUD-2612-svl-a-safe-restoration.md | tests/server-licensing/server-licensing-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |

---

## Server License Management — Create Server License Dialog (Batch SVL-B)

### Create Server License Dialog — Button, Dialog, Filename, Download, Controls, Focus, Keyboard, Accessibility (SVL-B: SUD-2613 to SUD-2641, 29 tests)

**Verified Create Server License dialog behavior:**

- **Button Visibility and Accessibility (4 tests):** Button visible on each card (LIMAS-SUD-2613), accessible name "Create Server License" (LIMAS-SUD-2614), enabled (LIMAS-SUD-2615), keyboard focusable (LIMAS-SUD-2616).
- **Dialog Structure (3 tests):** Clicking opens a `region "Create Server License"` (LIMAS-SUD-2617), heading "Create Server License" level 2 (LIMAS-SUD-2618), "File name" textbox visible and editable (LIMAS-SUD-2619).
- **Filename Behavior (6 tests):** Initial value `<CustomerName>_server_license.txt` (LIMAS-SUD-2620), custom filename accepted (LIMAS-SUD-2621), empty disables Apply + invalid (LIMAS-SUD-2622), whitespace-only disables Apply despite HTML5 validity (LIMAS-SUD-2623), special characters accepted (LIMAS-SUD-2624), long filenames no maxLength (LIMAS-SUD-2625).
- **Download Behavior (3 tests):** Downloaded filename always `<input>_server_license.txt` (LIMAS-SUD-2626), `.txt` extension always present (LIMAS-SUD-2627), filename matches accepted value precisely (LIMAS-SUD-2633).
- **Apply/Cancel Controls (8 tests):** Cancel closes without download (LIMAS-SUD-2628), Close button closes without download (LIMAS-SUD-2629), Escape closes safely (LIMAS-SUD-2630), Apply state follows filename rules (LIMAS-SUD-2631), Apply triggers download (LIMAS-SUD-2632), duplicate submission prevented by dialog closure (LIMAS-SUD-2634).
- **Feedback (2 tests):** No success toast/alert after download (LIMAS-SUD-2635), no loading indicator during Apply (LIMAS-SUD-2640).
- **Focus and Keyboard (4 tests):** Initial focus on filename input (LIMAS-SUD-2636), Tab order filename→Cancel→Apply (LIMAS-SUD-2637), focus returns to trigger button (LIMAS-SUD-2638), dialog state resets on reopen (LIMAS-SUD-2639).
- **Accessibility Documentation (1 test):** Close button not in tab order, no focus trap, filename lacks `<label>`, filename lacks `aria-label`; strengths: trigger `aria-label`, semantic h2, named region, focus return (LIMAS-SUD-2641).

**Key design decisions:**
- Filename is derived from customer name: `<CustomerName>_server_license.txt` on open and on reopen.
- Downloaded filename pattern: `<user-input>_server_license.txt` — app UI always appends the suffix.
- Apply disabled for empty AND whitespace-only (app-level check beyond HTML5 validity).
- Dialog closes immediately on Apply — no loading state, no success feedback.
- Download handled via Playwright download event; files cleaned up after metadata validation.
- Dialog is an inline `region`, not a modal overlay.
- Close button has accessible name but is excluded from tab order.

**Blocked cases: 0.** All 29 cases verified via live UI observation. No server-side changes are made — only `.txt` file download.

- **29 plans, 1 grouped spec, 1 Page Object extension (LIMAS-SUD-2613 to LIMAS-SUD-2641); 0 blocked; not executed**
- **Batch SVL-B status: Complete**

### Test IDs and Descriptions

| Test ID | Atomic Behavior | Plan Path | Script Path | Evidence Source | Profile | Status |
|---------|----------------|-----------|-------------|----------------|---------|--------|
| LIMAS-SUD-2613 | Create Server License button visible on each card | plans/server-licensing/LIMAS-SUD-2613-svl-b-csl-button-visible.md | tests/server-licensing/server-licensing-csl-dialog.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2614 | Button has accessible name | plans/server-licensing/LIMAS-SUD-2614-svl-b-csl-accessible-name.md | tests/server-licensing/server-licensing-csl-dialog.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2615 | Button is enabled | plans/server-licensing/LIMAS-SUD-2615-svl-b-csl-enabled.md | tests/server-licensing/server-licensing-csl-dialog.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2616 | Button is keyboard focusable | plans/server-licensing/LIMAS-SUD-2616-svl-b-csl-keyboard-focus.md | tests/server-licensing/server-licensing-csl-dialog.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2617 | Clicking opens dialog region | plans/server-licensing/LIMAS-SUD-2617-svl-b-dialog-opens.md | tests/server-licensing/server-licensing-csl-dialog.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2618 | Dialog heading "Create Server License" level 2 | plans/server-licensing/LIMAS-SUD-2618-svl-b-dialog-heading.md | tests/server-licensing/server-licensing-csl-dialog.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2619 | File name field visible and editable | plans/server-licensing/LIMAS-SUD-2619-svl-b-filename-visible.md | tests/server-licensing/server-licensing-csl-dialog.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2620 | Initial filename from customer name | plans/server-licensing/LIMAS-SUD-2620-svl-b-filename-initial-value.md | tests/server-licensing/server-licensing-csl-dialog.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2621 | Filename can be changed | plans/server-licensing/LIMAS-SUD-2621-svl-b-filename-change.md | tests/server-licensing/server-licensing-csl-dialog.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2622 | Empty filename disables Apply | plans/server-licensing/LIMAS-SUD-2622-svl-b-empty-filename.md | tests/server-licensing/server-licensing-csl-dialog.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2623 | Whitespace-only disables Apply | plans/server-licensing/LIMAS-SUD-2623-svl-b-whitespace-filename.md | tests/server-licensing/server-licensing-csl-dialog.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2624 | Special characters accepted | plans/server-licensing/LIMAS-SUD-2624-svl-b-special-chars.md | tests/server-licensing/server-licensing-csl-dialog.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2625 | Long filenames accepted | plans/server-licensing/LIMAS-SUD-2625-svl-b-long-filename.md | tests/server-licensing/server-licensing-csl-dialog.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2626 | Downloaded filename appends suffix | plans/server-licensing/LIMAS-SUD-2626-svl-b-download-filename.md | tests/server-licensing/server-licensing-csl-dialog.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2627 | Downloaded file has .txt extension | plans/server-licensing/LIMAS-SUD-2627-svl-b-download-ext-txt.md | tests/server-licensing/server-licensing-csl-dialog.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2628 | Cancel closes without download | plans/server-licensing/LIMAS-SUD-2628-svl-b-cancel.md | tests/server-licensing/server-licensing-csl-dialog.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2629 | Close button closes without download | plans/server-licensing/LIMAS-SUD-2629-svl-b-close-button.md | tests/server-licensing/server-licensing-csl-dialog.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2630 | Escape closes safely | plans/server-licensing/LIMAS-SUD-2630-svl-b-escape.md | tests/server-licensing/server-licensing-csl-dialog.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2631 | Apply state follows filename rules | plans/server-licensing/LIMAS-SUD-2631-svl-b-apply-state.md | tests/server-licensing/server-licensing-csl-dialog.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2632 | Apply triggers download | plans/server-licensing/LIMAS-SUD-2632-svl-b-apply-download.md | tests/server-licensing/server-licensing-csl-dialog.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2633 | Downloaded filename matches accepted value | plans/server-licensing/LIMAS-SUD-2633-svl-b-download-name-match.md | tests/server-licensing/server-licensing-csl-dialog.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2634 | No duplicate submission possible | plans/server-licensing/LIMAS-SUD-2634-svl-b-no-duplicate.md | tests/server-licensing/server-licensing-csl-dialog.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2635 | No success feedback shown | plans/server-licensing/LIMAS-SUD-2635-svl-b-no-success-feedback.md | tests/server-licensing/server-licensing-csl-dialog.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2636 | Initial focus on filename input | plans/server-licensing/LIMAS-SUD-2636-svl-b-initial-focus.md | tests/server-licensing/server-licensing-csl-dialog.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2637 | Tab order filename→Cancel→Apply | plans/server-licensing/LIMAS-SUD-2637-svl-b-tab-order.md | tests/server-licensing/server-licensing-csl-dialog.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2638 | Focus returns to trigger button | plans/server-licensing/LIMAS-SUD-2638-svl-b-focus-return.md | tests/server-licensing/server-licensing-csl-dialog.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2639 | Dialog state resets on reopen | plans/server-licensing/LIMAS-SUD-2639-svl-b-state-restored.md | tests/server-licensing/server-licensing-csl-dialog.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2640 | No loading indicator during Apply | plans/server-licensing/LIMAS-SUD-2640-svl-b-no-loading-state.md | tests/server-licensing/server-licensing-csl-dialog.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2641 | Accessibility gaps documented | plans/server-licensing/LIMAS-SUD-2641-svl-b-accessibility-gaps.md | tests/server-licensing/server-licensing-csl-dialog.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |

---

## Server License Management — Edit Customer Dialog (Batch SVL-C)

### Edit Customer Dialog — Button, Fields, Apply State, Dismissal, User Groups, System User, Focus, Accessibility (SVL-C: SUD-2642 to SUD-2673, 32 tests)

**Verified Edit Customer dialog behavior:**

- **Button and Dialog (3 tests):** Button visible with accessible name (LIMAS-SUD-2642), enabled (LIMAS-SUD-2643), click opens `region "Edit Customer"` with h2 heading and Close button (LIMAS-SUD-2644).
- **Form Fields (3 tests):** Customer name textbox `id="edit-cust-name"` pre-filled (LIMAS-SUD-2645), Hardware ID textbox `id="edit-hwid"` pre-filled (LIMAS-SUD-2646), Server type radiogroup with Standard/Full License/Hybrid pre-selected (LIMAS-SUD-2647).
- **Apply State (7 tests):** Apply disabled when no changes (LIMAS-SUD-2648), enables on any field change (LIMAS-SUD-2649), enables on empty customer name (LIMAS-SUD-2668), empty hardware ID (LIMAS-SUD-2669), server type change (LIMAS-SUD-2670), whitespace customer name (LIMAS-SUD-2672).
- **Dismissal (3 tests):** Cancel preserves original values on reopen (LIMAS-SUD-2650), Close button dismisses (LIMAS-SUD-2651), Escape dismisses (LIMAS-SUD-2652).
- **User Groups — Section and Rows (2 tests):** Section with "Add Group" button visible (LIMAS-SUD-2653), group rows with contextual Edit/Delete buttons (LIMAS-SUD-2654).
- **User Groups — Add Group (4 tests):** Inline form New group name + Cancel/Add (LIMAS-SUD-2655), Cancel dismisses (LIMAS-SUD-2656), duplicate shows alert "A user group with this name already exists." (LIMAS-SUD-2657), unique name adds group and enables Apply (LIMAS-SUD-2658).
- **User Groups — Edit and Delete (3 tests):** Edit transforms row to textbox with Cancel/Apply (LIMAS-SUD-2659), Cancel reverts name (LIMAS-SUD-2660), Delete optimistic removal enables Apply, restored on Cancel (LIMAS-SUD-2661).
- **System User (2 tests):** Section visible with Create/Edit/Delete buttons (LIMAS-SUD-2662), Edit/Delete disabled when Not assigned (LIMAS-SUD-2663).
- **Focus and Keyboard (4 tests):** Initial focus on Customer name (LIMAS-SUD-2664), Tab order through fields to buttons (LIMAS-SUD-2665), focus return to trigger button (LIMAS-SUD-2666), state reset on reopen (LIMAS-SUD-2667).
- **Feedback and Accessibility (2 tests):** No success toast (LIMAS-SUD-2671), accessibility gap documentation — form fields lack `<label for>`, User Groups/System User sections lack heading roles, no aria-live announcements (LIMAS-SUD-2673).

**Key design decisions:**
- Apply is change-detected: disabled until at least one field (name, HW ID, server type) differs from initial state.
- Group deletion is optimistic immediate UI removal — group restored if Edit Customer dialog is cancelled.
- Group edit is inline: row transforms to editable textbox.
- Add Group is inline, not a separate dialog.
- Duplicate group name shows inline alert; Add button always enabled (server-side validation).
- All mutation tests (LIMAS-SUD-2658) must use uniquely generated names and NOT Apply the outer dialog.
- Delete/Edit group tests must Cancel the outer dialog to preserve original state.

**Blocked cases: 0.** All 32 cases verified via live UI observation of AATestCustomer card.

- **32 plans, 1 grouped spec, 1 Page Object extension (LIMAS-SUD-2642 to LIMAS-SUD-2673); 0 blocked; not executed**
- **Batch SVL-C status: Complete**

### Test IDs and Descriptions

| Test ID | Atomic Behavior | Plan Path | Script Path | Evidence Source | Profile | Status |
|---------|----------------|-----------|-------------|----------------|---------|--------|
| LIMAS-SUD-2642 | Edit Customer button visible | plans/server-licensing/LIMAS-SUD-2642-svl-c-edit-button-visible.md | tests/server-licensing/server-licensing-edit-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2643 | Edit Customer button enabled | plans/server-licensing/LIMAS-SUD-2643-svl-c-edit-button-enabled.md | tests/server-licensing/server-licensing-edit-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2644 | Dialog opens with heading | plans/server-licensing/LIMAS-SUD-2644-svl-c-dialog-opens.md | tests/server-licensing/server-licensing-edit-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2645 | Customer name pre-filled | plans/server-licensing/LIMAS-SUD-2645-svl-c-customer-name-field.md | tests/server-licensing/server-licensing-edit-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2646 | Hardware ID pre-filled | plans/server-licensing/LIMAS-SUD-2646-svl-c-hardware-id-field.md | tests/server-licensing/server-licensing-edit-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2647 | Server type radiogroup | plans/server-licensing/LIMAS-SUD-2647-svl-c-server-type-radiogroup.md | tests/server-licensing/server-licensing-edit-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2648 | Apply disabled unchanged | plans/server-licensing/LIMAS-SUD-2648-svl-c-apply-disabled-unchanged.md | tests/server-licensing/server-licensing-edit-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2649 | Apply enables on change | plans/server-licensing/LIMAS-SUD-2649-svl-c-apply-enabled-on-change.md | tests/server-licensing/server-licensing-edit-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2650 | Cancel preserves original | plans/server-licensing/LIMAS-SUD-2650-svl-c-cancel-closes.md | tests/server-licensing/server-licensing-edit-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2651 | Close button dismisses | plans/server-licensing/LIMAS-SUD-2651-svl-c-close-closes.md | tests/server-licensing/server-licensing-edit-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2652 | Escape dismisses | plans/server-licensing/LIMAS-SUD-2652-svl-c-escape-closes.md | tests/server-licensing/server-licensing-edit-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2653 | User Groups section | plans/server-licensing/LIMAS-SUD-2653-svl-c-user-groups-section.md | tests/server-licensing/server-licensing-edit-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2654 | Group rows Edit/Delete | plans/server-licensing/LIMAS-SUD-2654-svl-c-group-rows-visible.md | tests/server-licensing/server-licensing-edit-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2655 | Add Group inline form | plans/server-licensing/LIMAS-SUD-2655-svl-c-add-group-form.md | tests/server-licensing/server-licensing-edit-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2656 | Add Group Cancel | plans/server-licensing/LIMAS-SUD-2656-svl-c-add-group-cancel.md | tests/server-licensing/server-licensing-edit-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2657 | Duplicate group alert | plans/server-licensing/LIMAS-SUD-2657-svl-c-add-group-validation.md | tests/server-licensing/server-licensing-edit-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2658 | Add unique group | plans/server-licensing/LIMAS-SUD-2658-svl-c-add-group-success.md | tests/server-licensing/server-licensing-edit-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2659 | Edit group inline textbox | plans/server-licensing/LIMAS-SUD-2659-svl-c-edit-group-form.md | tests/server-licensing/server-licensing-edit-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2660 | Edit group Cancel revert | plans/server-licensing/LIMAS-SUD-2660-svl-c-edit-group-cancel.md | tests/server-licensing/server-licensing-edit-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2661 | Delete group optimistic | plans/server-licensing/LIMAS-SUD-2661-svl-c-delete-group.md | tests/server-licensing/server-licensing-edit-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2662 | System User section | plans/server-licensing/LIMAS-SUD-2662-svl-c-system-user-section.md | tests/server-licensing/server-licensing-edit-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2663 | SU controls disabled | plans/server-licensing/LIMAS-SUD-2663-svl-c-system-user-controls-disabled.md | tests/server-licensing/server-licensing-edit-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2664 | Initial focus on name | plans/server-licensing/LIMAS-SUD-2664-svl-c-initial-focus.md | tests/server-licensing/server-licensing-edit-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2665 | Tab order | plans/server-licensing/LIMAS-SUD-2665-svl-c-tab-order.md | tests/server-licensing/server-licensing-edit-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2666 | Focus return | plans/server-licensing/LIMAS-SUD-2666-svl-c-focus-return.md | tests/server-licensing/server-licensing-edit-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2667 | State restored on reopen | plans/server-licensing/LIMAS-SUD-2667-svl-c-state-restored.md | tests/server-licensing/server-licensing-edit-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2668 | Empty customer name | plans/server-licensing/LIMAS-SUD-2668-svl-c-empty-customer-name.md | tests/server-licensing/server-licensing-edit-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2669 | Empty hardware ID | plans/server-licensing/LIMAS-SUD-2669-svl-c-empty-hardware-id.md | tests/server-licensing/server-licensing-edit-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2670 | Server type change | plans/server-licensing/LIMAS-SUD-2670-svl-c-server-type-change.md | tests/server-licensing/server-licensing-edit-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2671 | No success feedback | plans/server-licensing/LIMAS-SUD-2671-svl-c-no-success-feedback.md | tests/server-licensing/server-licensing-edit-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2672 | Whitespace customer name | plans/server-licensing/LIMAS-SUD-2672-svl-c-customer-name-whitespace.md | tests/server-licensing/server-licensing-edit-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2673 | Accessibility gaps | plans/server-licensing/LIMAS-SUD-2673-svl-c-accessibility-gaps.md | tests/server-licensing/server-licensing-edit-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |

---

## Server License Management — Delete Customer + Standard Licenses (Batch SVL-D)

### Delete Customer Dependencies, Confirmation Dialog, Focus + Standard Licenses Section/Tabs/Cards + Edit/Delete SL (SVL-D: SUD-2674 to SUD-2719, 46 tests)

**Verified SVL-D behavior (live UI inspection on CLAAS_LMT_DEV, AGCO, and BRP cards):**

- **Delete Customer — Button & Dependencies (5):** Button visible with accessible name "Delete Customer" (LIMAS-SUD-2674, 2678). When customer has Standard or Floating licenses, the button becomes `[disabled]` on click and NO confirmation dialog opens (LIMAS-SUD-2676, verified AGCO with Floating:11 and BRP with Std:1/Float:2). Enabled only for zero-license customers (LIMAS-SUD-2675, 2677).
- **Delete Customer — Confirmation (5):** Opens `region` with heading, warning text about permanent deletion, Cancel button, and Escape dismissal (LIMAS-SUD-2679–2683).
- **Delete Customer — Focus (2):** Initial focus on reasonable element, focus return to trigger after dismiss (LIMAS-SUD-2684–2685).
- **Delete Customer Lifecycle (1):** BLOCKED — safe runtime customer creation and cleanup cannot be guaranteed. Add Customer flow not in SVL-D scope (LIMAS-SUD-2686).
- **Standard Licenses — Section (4):** h2 heading "Standard Licenses", description paragraph, count badge ("N license(s)"), renders within expanded card (LIMAS-SUD-2687–2690).
- **Standard Licenses — Tabs (4):** Standard/Floating tab buttons visible with runtime counts, Standard selected by default, switching to Floating shows "Create Floating License" (LIMAS-SUD-2691–2694).
- **Empty States (2):** "No Standard Licenses" when Standard count is 0, "No Floating Licenses" when Floating count is 0 (LIMAS-SUD-2695–2696).
- **SL Cards (4):** Card count matches tab badge, each card has type label "Standard License", h3 heading, Profile Role/Licenses/Maintenance/Expiration fields, Edit/Delete buttons (LIMAS-SUD-2697–2700).
- **SL Card Fields (5):** Heading name, Profile Role value, License quantity, Maintenance date, Expiration date — all runtime-discovered (LIMAS-SUD-2701–2705).
- **Edit SL (10):** `region "Edit Standard License"`, h3 heading, subtitle "NAME · ROLE", fields pre-filled (Maintenance Date textbox, Expiration Date textbox, Number of Days spinbutton, Number of Standard Licenses spinbutton), "Synchronize Maintenance and Expiration dates" checkbox. Apply labeled "Apply Standard License changes", Cancel/Close/Escape dismissal, initial focus on Maintenance Date, focus return, state reset on reopen (LIMAS-SUD-2706–2715).
- **Delete SL (2 + 1 blocked):** Button visible on card. Immediate deletion without confirmation (verified on CLAAS_LMT_DEV — license removed instantly). Lifecycle test BLOCKED (LIMAS-SUD-2716–2718).
- **Accessibility (1):** Documented gaps: card fields lack label associations, edit dialog may lack focus trap, Delete has no confirmation, tabs may not announce state changes (LIMAS-SUD-2719).

**Key design decisions:**
- Delete Customer is restricted: no dialog if any licenses are assigned; button disables.
- Delete Standard License is immediate and destructive — no confirmation dialog at all.
- Edit SL dialog uses date textboxes (not pickers) and a spinbutton for quantity.
- TAB counts are runtime badges on the tab buttons themselves.
- DO NOT click Delete Standard License in automated tests — immediate destruction.

**Blocked cases: 2.** LIMAS-SUD-2686 (Delete Customer lifecycle), LIMAS-SUD-2718 (Delete SL lifecycle).

- **46 plans, 2 grouped specs, 1 Page Object extension (LIMAS-SUD-2674 to LIMAS-SUD-2719); 2 blocked; not executed**
- **Batch SVL-D status: Complete**

### Test IDs and Descriptions

| Test ID | Atomic Behavior | Plan Path | Script Path | Evidence Source | Profile | Status |
|---------|----------------|-----------|-------------|----------------|---------|--------|
| LIMAS-SUD-2674 | Delete Customer button visible | plans/server-licensing/LIMAS-SUD-2674-svl-d-delete-customer-button-visible.md | tests/server-licensing/server-licensing-delete-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2675 | Delete Customer button enabled | plans/server-licensing/LIMAS-SUD-2675-svl-d-delete-customer-button-enabled.md | tests/server-licensing/server-licensing-delete-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2676 | Delete Customer disabled with licenses | plans/server-licensing/LIMAS-SUD-2676-svl-d-delete-customer-disabled-with-licenses.md | tests/server-licensing/server-licensing-delete-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2677 | Delete Customer enabled no dependencies | plans/server-licensing/LIMAS-SUD-2677-svl-d-delete-customer-no-dependencies-enables.md | tests/server-licensing/server-licensing-delete-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2678 | Delete Customer accessible name | plans/server-licensing/LIMAS-SUD-2678-svl-d-delete-customer-accessible-name.md | tests/server-licensing/server-licensing-delete-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2679 | Confirmation dialog opens | plans/server-licensing/LIMAS-SUD-2679-svl-d-delete-customer-confirmation-opens.md | tests/server-licensing/server-licensing-delete-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2680 | Confirmation dialog heading | plans/server-licensing/LIMAS-SUD-2680-svl-d-delete-customer-confirmation-heading.md | tests/server-licensing/server-licensing-delete-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2681 | Confirmation warning text | plans/server-licensing/LIMAS-SUD-2681-svl-d-delete-customer-warning-text.md | tests/server-licensing/server-licensing-delete-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2682 | Cancel closes dialog | plans/server-licensing/LIMAS-SUD-2682-svl-d-delete-customer-cancel-closes.md | tests/server-licensing/server-licensing-delete-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2683 | Escape closes dialog | plans/server-licensing/LIMAS-SUD-2683-svl-d-delete-customer-escape-closes.md | tests/server-licensing/server-licensing-delete-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2684 | Initial focus | plans/server-licensing/LIMAS-SUD-2684-svl-d-delete-customer-initial-focus.md | tests/server-licensing/server-licensing-delete-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2685 | Focus return | plans/server-licensing/LIMAS-SUD-2685-svl-d-delete-customer-focus-return.md | tests/server-licensing/server-licensing-delete-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2686 | Confirmed deletion lifecycle | plans/server-licensing/LIMAS-SUD-2686-svl-d-delete-customer-confirmed-lifecycle.md | tests/server-licensing/server-licensing-delete-customer.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Blocked |
| LIMAS-SUD-2687 | Standard Licenses heading | plans/server-licensing/LIMAS-SUD-2687-svl-d-standard-licenses-heading.md | tests/server-licensing/server-licensing-standard-licenses.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2688 | Standard Licenses description | plans/server-licensing/LIMAS-SUD-2688-svl-d-standard-licenses-description.md | tests/server-licensing/server-licensing-standard-licenses.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2689 | License count badge | plans/server-licensing/LIMAS-SUD-2689-svl-d-standard-licenses-count-badge.md | tests/server-licensing/server-licensing-standard-licenses.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2690 | Section layout | plans/server-licensing/LIMAS-SUD-2690-svl-d-standard-licenses-layout.md | tests/server-licensing/server-licensing-standard-licenses.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2691 | Tabs visible | plans/server-licensing/LIMAS-SUD-2691-svl-d-standard-floating-tabs-visible.md | tests/server-licensing/server-licensing-standard-licenses.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2692 | Tab counts | plans/server-licensing/LIMAS-SUD-2692-svl-d-standard-floating-tab-counts.md | tests/server-licensing/server-licensing-standard-licenses.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2693 | Standard tab default | plans/server-licensing/LIMAS-SUD-2693-svl-d-standard-tab-selected-by-default.md | tests/server-licensing/server-licensing-standard-licenses.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2694 | Floating tab switch | plans/server-licensing/LIMAS-SUD-2694-svl-d-floating-tab-switch.md | tests/server-licensing/server-licensing-standard-licenses.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2695 | Standard empty state | plans/server-licensing/LIMAS-SUD-2695-svl-d-standard-empty-state.md | tests/server-licensing/server-licensing-standard-licenses.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2696 | Floating empty state | plans/server-licensing/LIMAS-SUD-2696-svl-d-floating-empty-state.md | tests/server-licensing/server-licensing-standard-licenses.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2697 | Card count matches badge | plans/server-licensing/LIMAS-SUD-2697-svl-d-standard-license-card-count.md | tests/server-licensing/server-licensing-standard-licenses.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2698 | Card structure | plans/server-licensing/LIMAS-SUD-2698-svl-d-standard-license-card-structure.md | tests/server-licensing/server-licensing-standard-licenses.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2699 | Multiple cards | plans/server-licensing/LIMAS-SUD-2699-svl-d-standard-license-multiple-cards.md | tests/server-licensing/server-licensing-standard-licenses.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2700 | Card scrolling | plans/server-licensing/LIMAS-SUD-2700-svl-d-standard-license-card-scrolling.md | tests/server-licensing/server-licensing-standard-licenses.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2701 | Card heading name | plans/server-licensing/LIMAS-SUD-2701-svl-d-standard-license-card-heading-name.md | tests/server-licensing/server-licensing-standard-licenses.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2702 | Profile Role | plans/server-licensing/LIMAS-SUD-2702-svl-d-standard-license-card-profile-role.md | tests/server-licensing/server-licensing-standard-licenses.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2703 | License quantity | plans/server-licensing/LIMAS-SUD-2703-svl-d-standard-license-card-quantity.md | tests/server-licensing/server-licensing-standard-licenses.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2704 | Maintenance date | plans/server-licensing/LIMAS-SUD-2704-svl-d-standard-license-card-maintenance-date.md | tests/server-licensing/server-licensing-standard-licenses.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2705 | Expiration date | plans/server-licensing/LIMAS-SUD-2705-svl-d-standard-license-card-expiration-date.md | tests/server-licensing/server-licensing-standard-licenses.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2706 | Edit SL dialog opens | plans/server-licensing/LIMAS-SUD-2706-svl-d-edit-sl-dialog-opens.md | tests/server-licensing/server-licensing-standard-licenses.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2707 | Edit SL subtitle | plans/server-licensing/LIMAS-SUD-2707-svl-d-edit-sl-subtitle.md | tests/server-licensing/server-licensing-standard-licenses.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2708 | Edit SL fields prefilled | plans/server-licensing/LIMAS-SUD-2708-svl-d-edit-sl-fields-prefilled.md | tests/server-licensing/server-licensing-standard-licenses.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2709 | Edit SL Apply labeled | plans/server-licensing/LIMAS-SUD-2709-svl-d-edit-sl-apply-labeled.md | tests/server-licensing/server-licensing-standard-licenses.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2710 | Edit SL Cancel closes | plans/server-licensing/LIMAS-SUD-2710-svl-d-edit-sl-cancel-closes.md | tests/server-licensing/server-licensing-standard-licenses.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2711 | Edit SL Close dismisses | plans/server-licensing/LIMAS-SUD-2711-svl-d-edit-sl-close-dismisses.md | tests/server-licensing/server-licensing-standard-licenses.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2712 | Edit SL Escape dismisses | plans/server-licensing/LIMAS-SUD-2712-svl-d-edit-sl-escape-dismisses.md | tests/server-licensing/server-licensing-standard-licenses.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2713 | Edit SL initial focus | plans/server-licensing/LIMAS-SUD-2713-svl-d-edit-sl-initial-focus.md | tests/server-licensing/server-licensing-standard-licenses.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2714 | Edit SL focus return | plans/server-licensing/LIMAS-SUD-2714-svl-d-edit-sl-focus-return.md | tests/server-licensing/server-licensing-standard-licenses.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2715 | Edit SL state resets | plans/server-licensing/LIMAS-SUD-2715-svl-d-edit-sl-state-resets.md | tests/server-licensing/server-licensing-standard-licenses.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2716 | Delete SL button visible | plans/server-licensing/LIMAS-SUD-2716-svl-d-delete-sl-button-visible.md | tests/server-licensing/server-licensing-standard-licenses.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2717 | Delete SL immediate | plans/server-licensing/LIMAS-SUD-2717-svl-d-delete-sl-immediate.md | tests/server-licensing/server-licensing-standard-licenses.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-2718 | Delete SL lifecycle | plans/server-licensing/LIMAS-SUD-2718-svl-d-delete-sl-lifecycle.md | tests/server-licensing/server-licensing-standard-licenses.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Blocked |
| LIMAS-SUD-2719 | Accessibility gaps | plans/server-licensing/LIMAS-SUD-2719-svl-d-accessibility-gaps.md | tests/server-licensing/server-licensing-standard-licenses.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |

---

## Server License Management — Floating Licenses + Create (Batch SVL-E)

### Floating Licenses Cards/Fields, Edit/Delete FL, Create FL Form, Create SL Form (SVL-E: SUD-2720 to SUD-2806, 87 tests)

**Verified via live UI inspection on BRP QA Server card:**

**Floating License card fields (confirmed):** Floating License type label, h3 heading (e.g. "Authoring Suite 2", "STIHL EOL Tester"), Profile Role (e.g. "2020-R2", "manager"), Group (e.g. "QA Import"), Licenses (e.g. "10"), Max Checkout (e.g. "2h"), Checkout status ("Checkout unavailable"), Maintenance date, Expiration date.

**Edit Floating License dialog:** `region "Edit Floating License"`, h3 heading, subtitle "NAME · ROLE". Fields: Maintenance Date (textbox, YYYY-MM-DD), Expiration Date (textbox), Number of Days (spinbutton, empty), Floating Licenses (spinbutton, prefilled), Max Checkout (hours) (spinbutton, prefilled). Sync checkbox ("Synchronize Maintenance and Expiration dates"). Apply labeled "Apply Floating License changes" (disabled unchanged). Currently-editing banner below.

**Delete Floating License:** Clicking Delete sets button to `[active]` but NO confirmation dialog appears and card is NOT removed. Unlike Delete Standard License (immediate), Delete Floating License requires a separate step or is silently blocked. Lifecycle test BLOCKED.

**Create Floating License form:** `region "Create Floating License"`, h3 heading. Fields: Group (combobox, pre-filled), Product Profile (combobox, "Select a product profile"), Profile Role (combobox, DISABLED until Product Profile selected), Licenses (spinbutton), Default Checkout (h) (spinbutton), Checkout Times (h) (spinbutton with "e.g. 6" placeholder + Add button DISABLED), Available for checkout (checkbox), Maintenance Date (textbox), Expiration Date (textbox). Apply disabled initially.

**Create Standard License form — DIFFERENT from Create FL:** `region "Create Standard License"`, h3 heading. Fields: Product Profile (combobox), Profile Role (DISABLED until Product Profile selected), Number of Licenses (spinbutton), Maintenance Date (textbox), Expiration Date (textbox). NO Group, NO Default Checkout, NO Checkout Times, NO Available for checkout, NO sync checkbox.

**Blocked cases: 3.** LIMAS-SUD-2764 (Delete FL lifecycle), LIMAS-SUD-2785 (Create FL lifecycle), LIMAS-SUD-2806 (Create SL lifecycle). All blocked for same reason: safe runtime creation and cleanup cannot be guaranteed.

- **87 plans, 4 grouped specs, 1 Page Object extension; 3 blocked; not executed**
- **Static validation:** TypeScript zero errors, `npx playwright test --list --grep "SVL-E"` collects exactly 87 tests (2720–2806 continuous, no duplicates).
- **Batch SVL-E status: Complete**

### Spec Files

| Spec File | Cases | Range |
|-----------|-------|-------|
| `tests/server-licensing/server-licensing-floating-cards.spec.ts` | 21 | LIMAS-SUD-2720 to LIMAS-SUD-2740 |
| `tests/server-licensing/server-licensing-edit-delete-floating.spec.ts` | 24 | LIMAS-SUD-2741 to LIMAS-SUD-2764 |
| `tests/server-licensing/server-licensing-create-floating.spec.ts` | 21 | LIMAS-SUD-2765 to LIMAS-SUD-2785 |
| `tests/server-licensing/server-licensing-create-standard.spec.ts` | 21 | LIMAS-SUD-2786 to LIMAS-SUD-2806 |

### Test IDs and Descriptions (summary)

| Range | Count | Category |
|-------|-------|----------|
| LIMAS-SUD-2720 to LIMAS-SUD-2740 | 21 | Floating Tab, Empty State, Card Structure, Card Fields |
| LIMAS-SUD-2741 to LIMAS-SUD-2759 | 19 | Edit Floating License (Dialog, Fields, Apply, Dismissal, Focus) |
| LIMAS-SUD-2760 to LIMAS-SUD-2764 | 5 | Delete Floating License (1 blocked) |
| LIMAS-SUD-2765 to LIMAS-SUD-2785 | 21 | Create Floating License (Form, Dropdowns, Numerics, Dates, Controls, 1 blocked) |
| LIMAS-SUD-2786 to LIMAS-SUD-2806 | 21 | Create Standard License (Form, Dropdowns, Dates, Differences, Controls, 1 blocked) |