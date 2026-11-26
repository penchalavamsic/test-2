## System User Dashboard — Floating Licenses Section Shell and Zero-Data State (Batch FL-A)

### Summary Card, Section Shell, Controls, Network, and Empty State (FL-A: SUD-861 to SUD-887, 27 tests)

**Verified Floating Licenses section behavior:**

- **Summary Card (3 tests):** Card visibility (LIMAS-SUD-861), accessible name derived from text content "0Floating Licenses" (LIMAS-SUD-862), keyboard-focusable with tabIndex=0, enabled, and aria-pressed attribute (LIMAS-SUD-863).
- **Section Shell (3 tests):** h3 heading "Floating Licenses" (LIMAS-SUD-864), description text "Review active floating licenses approaching expiration." (LIMAS-SUD-865), section renders after card click (LIMAS-SUD-866).
- **Date Control Structure (7 tests):** Visibility (LIMAS-SUD-867), label "Expires before" with for="fl-expires-before" (LIMAS-SUD-868), type="date" (LIMAS-SUD-869), accessible name via label association (LIMAS-SUD-870), id="fl-expires-before" (LIMAS-SUD-871), initial value empty (LIMAS-SUD-872), enabled state (LIMAS-SUD-873).
- **Search Control Structure (7 tests):** Visibility (LIMAS-SUD-874), type="search" (LIMAS-SUD-875), placeholder "Search by User ID, Profile, Hardware ID, or Role…" (LIMAS-SUD-876), no id, aria-label, or aria-labelledby — WCAG SC 3.3.2 finding (LIMAS-SUD-877), initial value empty (LIMAS-SUD-878), enabled state (LIMAS-SUD-879), decorative search icon with tabIndex=-1 (LIMAS-SUD-880).
- **Network (4 tests):** Card click triggers GET request (LIMAS-SUD-881), endpoint `/api/flicense/ex/{date}/{userId}?page=0&size=5` (LIMAS-SUD-882), response 200 with Content-Length: 0 (LIMAS-SUD-883), single GET per card selection with no other HTTP methods (LIMAS-SUD-884).
- **Zero State (3 tests):** Counts "0 loaded · 0 total licenses" (LIMAS-SUD-885), empty heading "No floating licenses found" with supporting text (LIMAS-SUD-886), no pagination, Load More, retry, refresh, or license cards in empty state (LIMAS-SUD-887).

**Verified accessibility findings:**
- Search input has no accessible name beyond placeholder (WCAG SC 3.3.2).
- Missing h2 in heading hierarchy (h1→h3).
- Card accessible name merges count+label without space.
- Search icon is decorative (tabIndex=-1).
- No aria-live announcements for counts or empty state.

**Blocked cases: 0.** All 27 cases are deterministic and supported by live UI observation.

- **27 plans, 6 grouped spec files (LIMAS-SUD-861 to LIMAS-SUD-887); 0 blocked; not executed**
- **Batch FL-A status: Complete**

### Test IDs and Descriptions

| Test ID | Atomic Behavior | Plan Path | Script Path | Evidence Source | Profile | Status |
|---------|----------------|-----------|-------------|----------------|---------|--------|
| LIMAS-SUD-861 | Summary card visibility | plans/system-user-dashboard/LIMAS-SUD-861-fl-a-summary-card-visibility.md | tests/system-user-dashboard/floating-licenses/floating-licenses-summary-card.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-862 | Summary card accessible name | plans/system-user-dashboard/LIMAS-SUD-862-fl-a-summary-card-accessible-name.md | tests/system-user-dashboard/floating-licenses/floating-licenses-summary-card.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-863 | Summary card focus and pressed state | plans/system-user-dashboard/LIMAS-SUD-863-fl-a-summary-card-focus-and-selection.md | tests/system-user-dashboard/floating-licenses/floating-licenses-summary-card.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-864 | Section heading h3 | plans/system-user-dashboard/LIMAS-SUD-864-fl-a-section-heading.md | tests/system-user-dashboard/floating-licenses/floating-licenses-section-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-865 | Section description text | plans/system-user-dashboard/LIMAS-SUD-865-fl-a-section-description.md | tests/system-user-dashboard/floating-licenses/floating-licenses-section-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-866 | Section visible on card selection | plans/system-user-dashboard/LIMAS-SUD-866-fl-a-section-visibility-on-card-selection.md | tests/system-user-dashboard/floating-licenses/floating-licenses-section-shell.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-867 | Date control visibility | plans/system-user-dashboard/LIMAS-SUD-867-fl-a-date-control-visibility.md | tests/system-user-dashboard/floating-licenses/floating-licenses-date-control.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-868 | Date control label association | plans/system-user-dashboard/LIMAS-SUD-868-fl-a-date-control-label.md | tests/system-user-dashboard/floating-licenses/floating-licenses-date-control.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-869 | Date control type date | plans/system-user-dashboard/LIMAS-SUD-869-fl-a-date-control-type.md | tests/system-user-dashboard/floating-licenses/floating-licenses-date-control.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-870 | Date control accessible name | plans/system-user-dashboard/LIMAS-SUD-870-fl-a-date-control-accessible-name.md | tests/system-user-dashboard/floating-licenses/floating-licenses-date-control.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-871 | Date control id fl-expires-before | plans/system-user-dashboard/LIMAS-SUD-871-fl-a-date-control-id.md | tests/system-user-dashboard/floating-licenses/floating-licenses-date-control.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-872 | Date control initial empty value | plans/system-user-dashboard/LIMAS-SUD-872-fl-a-date-control-initial-empty-value.md | tests/system-user-dashboard/floating-licenses/floating-licenses-date-control.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-873 | Date control enabled state | plans/system-user-dashboard/LIMAS-SUD-873-fl-a-date-control-enabled-state.md | tests/system-user-dashboard/floating-licenses/floating-licenses-date-control.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-874 | Search control visibility | plans/system-user-dashboard/LIMAS-SUD-874-fl-a-search-control-visibility.md | tests/system-user-dashboard/floating-licenses/floating-licenses-search-control.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-875 | Search control type search | plans/system-user-dashboard/LIMAS-SUD-875-fl-a-search-control-type.md | tests/system-user-dashboard/floating-licenses/floating-licenses-search-control.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-876 | Search control placeholder | plans/system-user-dashboard/LIMAS-SUD-876-fl-a-search-control-placeholder.md | tests/system-user-dashboard/floating-licenses/floating-licenses-search-control.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-877 | Search control no accessible name (WCAG finding) | plans/system-user-dashboard/LIMAS-SUD-877-fl-a-search-control-accessible-name.md | tests/system-user-dashboard/floating-licenses/floating-licenses-search-control.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-878 | Search control initial empty value | plans/system-user-dashboard/LIMAS-SUD-878-fl-a-search-control-initial-empty-value.md | tests/system-user-dashboard/floating-licenses/floating-licenses-search-control.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-879 | Search control enabled state | plans/system-user-dashboard/LIMAS-SUD-879-fl-a-search-control-enabled-state.md | tests/system-user-dashboard/floating-licenses/floating-licenses-search-control.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-880 | Search icon present and decorative | plans/system-user-dashboard/LIMAS-SUD-880-fl-a-search-icon-decorative.md | tests/system-user-dashboard/floating-licenses/floating-licenses-search-control.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-881 | Card selection triggers GET request | plans/system-user-dashboard/LIMAS-SUD-881-fl-a-card-selection-triggers-get.md | tests/system-user-dashboard/floating-licenses/floating-licenses-network.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-882 | Request uses flicense endpoint | plans/system-user-dashboard/LIMAS-SUD-882-fl-a-request-uses-flicense-endpoint.md | tests/system-user-dashboard/floating-licenses/floating-licenses-network.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-883 | Response 200 with zero content-length | plans/system-user-dashboard/LIMAS-SUD-883-fl-a-response-200-zero-content-length.md | tests/system-user-dashboard/floating-licenses/floating-licenses-network.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-884 | Single request per card selection | plans/system-user-dashboard/LIMAS-SUD-884-fl-a-single-request-per-card-selection.md | tests/system-user-dashboard/floating-licenses/floating-licenses-network.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-885 | Zero counts wording | plans/system-user-dashboard/LIMAS-SUD-885-fl-a-zero-counts-wording.md | tests/system-user-dashboard/floating-licenses/floating-licenses-zero-state.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-886 | Empty state heading and text | plans/system-user-dashboard/LIMAS-SUD-886-fl-a-empty-state-heading-and-text.md | tests/system-user-dashboard/floating-licenses/floating-licenses-zero-state.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-887 | No action controls in empty state | plans/system-user-dashboard/LIMAS-SUD-887-fl-a-no-action-controls-in-empty-state.md | tests/system-user-dashboard/floating-licenses/floating-licenses-zero-state.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |