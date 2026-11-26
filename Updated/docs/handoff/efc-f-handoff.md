## System User Dashboard — Expiring Floating Configurations Combined Date and Search Tests (Batch EFC-F)

### Combined Date and Search Interaction, State Persistence, and Restoration (EFC-F: SUD-844 to SUD-860, 17 tests)

**Verified combined date and search behavior:**

- **Date → Search order:** Setting a date under Expiration triggers exactly 1 GET to `/flconfig/e/{date}/{userId}?page=0&size=5`; subsequently filling search produces no additional flconfig request.
- **Search → Date order:** Filling search first produces no API request; then setting a date triggers exactly 1 Expiration GET with the date; search value persists after the response.
- **Date change with populated search:** Changing the date triggers exactly 1 additional GET for the new date; search value remains populated and no-match state persists.
- **Clearing search preserves date:** Clearing search alone produces no flconfig API request; date value remains; default empty state returns.
- **Clearing date preserves search:** Clearing date alone triggers 1 default-date Expiration GET; search value remains; no-match state persists.
- **Filter switching preserves both:** Switching from Expiration to Maintenance (and vice versa) preserves both date and search values.
- **Endpoint correctness:** Text → Maint switch uses `/flconfig/m/{date}/{userId}`; Maint → Exp switch uses `/flconfig/e/{date}/{userId}`.
- **Control independence:** Clearing search does not clear date; clearing date does not clear search.
- **Combined no-match state:** With date set and non-matching search, "No matching configurations" heading with "Try adjusting the filters or clearing the search value." text is displayed.
- **Count text:** "0 loaded · 0 total configurations" is unchanged throughout all combined operations.
- **Default state restoration:** After clearing both controls, the default "No expiring floating configurations found" state returns.
- **Tab order:** Expires until → Floating License Configurations button → Search input.

**Verified request patterns:**
- Search input alone produces no API request.
- Search clearing alone produces no API request.
- A changed valid date produces exactly 1 GET.
- Clearing a populated date produces 1 GET using the default date.
- Switching filters produces 1 GET for the selected endpoint.
- Date change under Expiration uses `/flconfig/e/`.
- Date change under Maintenance uses `/flconfig/m/`.
- Search is not added to the endpoint path or query parameters.
- `page=0` and `size=5` are consistent query parameters.
- No duplicate simultaneous GET, POST, PUT, PATCH, or DELETE observed.
- All responses return HTTP 200 with `content: []`, `totalElements: 0`, `empty: true`.

**Blocked cases: 0.** All 17 cases are deterministic and supported by live observation.

- **17 plans, 17 scripts (LIMAS-SUD-844 to LIMAS-SUD-860); 0 blocked; not executed**
- **Batch EFC-F status: Complete**

### Test IDs and Descriptions

| Test ID | Atomic Behavior | Plan Path | Script Path | Evidence Source | Profile | Status |
|---------|----------------|-----------|-------------|----------------|---------|--------|
| LIMAS-SUD-844 | Date triggers expiration GET | plans/system-user-dashboard/LIMAS-SUD-844-efc-f-date-triggers-expiration-get.md | tests/system-user-dashboard/LIMAS-SUD-844-efc-f-date-triggers-expiration-get.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-845 | Search after date produces no request | plans/system-user-dashboard/LIMAS-SUD-845-efc-f-search-after-date-no-request.md | tests/system-user-dashboard/LIMAS-SUD-845-efc-f-search-after-date-no-request.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-846 | Date persists after search | plans/system-user-dashboard/LIMAS-SUD-846-efc-f-date-persists-after-search.md | tests/system-user-dashboard/LIMAS-SUD-846-efc-f-date-persists-after-search.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-847 | Search persists after date request | plans/system-user-dashboard/LIMAS-SUD-847-efc-f-search-persists-after-date-request.md | tests/system-user-dashboard/LIMAS-SUD-847-efc-f-search-persists-after-date-request.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-848 | Date change with populated search | plans/system-user-dashboard/LIMAS-SUD-848-efc-f-date-change-with-populated-search.md | tests/system-user-dashboard/LIMAS-SUD-848-efc-f-date-change-with-populated-search.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-849 | Clear search preserves date | plans/system-user-dashboard/LIMAS-SUD-849-efc-f-clear-search-preserves-date.md | tests/system-user-dashboard/LIMAS-SUD-849-efc-f-clear-search-preserves-date.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-850 | Clear date preserves search | plans/system-user-dashboard/LIMAS-SUD-850-efc-f-clear-date-preserves-search.md | tests/system-user-dashboard/LIMAS-SUD-850-efc-f-clear-date-preserves-search.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-851 | Exp-to-Maint preserves both | plans/system-user-dashboard/LIMAS-SUD-851-efc-f-exp-to-maint-preserves-both.md | tests/system-user-dashboard/LIMAS-SUD-851-efc-f-exp-to-maint-preserves-both.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-852 | Maint-to-Exp preserves both | plans/system-user-dashboard/LIMAS-SUD-852-efc-f-maint-to-exp-preserves-both.md | tests/system-user-dashboard/LIMAS-SUD-852-efc-f-maint-to-exp-preserves-both.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-853 | Clear search independent of date | plans/system-user-dashboard/LIMAS-SUD-853-efc-f-clear-search-independent-of-date.md | tests/system-user-dashboard/LIMAS-SUD-853-efc-f-clear-search-independent-of-date.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-854 | Clear date independent of search | plans/system-user-dashboard/LIMAS-SUD-854-efc-f-clear-date-independent-of-search.md | tests/system-user-dashboard/LIMAS-SUD-854-efc-f-clear-date-independent-of-search.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-855 | Combined no-match state | plans/system-user-dashboard/LIMAS-SUD-855-efc-f-combined-no-match-state.md | tests/system-user-dashboard/LIMAS-SUD-855-efc-f-combined-no-match-state.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-856 | Count unchanged during combined ops | plans/system-user-dashboard/LIMAS-SUD-856-efc-f-count-unchanged-during-combined-ops.md | tests/system-user-dashboard/LIMAS-SUD-856-efc-f-count-unchanged-during-combined-ops.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-857 | Combined default state after clearing both | plans/system-user-dashboard/LIMAS-SUD-857-efc-f-combined-default-state-after-clearing-both.md | tests/system-user-dashboard/LIMAS-SUD-857-efc-f-combined-default-state-after-clearing-both.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-858 | Exp-to-Maint uses /flconfig/m/ endpoint | plans/system-user-dashboard/LIMAS-SUD-858-efc-f-exp-to-maint-uses-flconfig-m-endpoint.md | tests/system-user-dashboard/LIMAS-SUD-858-efc-f-exp-to-maint-uses-flconfig-m-endpoint.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-859 | Maint-to-Exp uses /flconfig/e/ endpoint | plans/system-user-dashboard/LIMAS-SUD-859-efc-f-maint-to-exp-uses-flconfig-e-endpoint.md | tests/system-user-dashboard/LIMAS-SUD-859-efc-f-maint-to-exp-uses-flconfig-e-endpoint.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-860 | Tab order date-button-search | plans/system-user-dashboard/LIMAS-SUD-860-efc-f-tab-order-date-button-search.md | tests/system-user-dashboard/LIMAS-SUD-860-efc-f-tab-order-date-button-search.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |