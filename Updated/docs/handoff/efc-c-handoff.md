## System User Dashboard — Expiring Floating Configurations Filter Switching Tests (Batch EFC-C)

### Filter Radio Selection, Switching, and State Recovery (EFC-C: SUD-716 to SUD-778, 63 tests)

**API contracts verified:**
- Expiration: `GET /limas/api/flconfig/e/{date}/{userId}?page=0&size=5` → 200 JSON `{ content:[], totalElements:0, empty:true }`
- Maintenance: `GET /limas/api/flconfig/m/{date}/{userId}?page=0&size=5` → 200 JSON `{ content:[], totalElements:0, empty:true }`

**Key findings:**
- Filter group is a native `<fieldset>` with `<legend>Filter by</legend>`
- Both radios share `name="floating-expiry-filter-type"` — native mutual exclusion
- No `id` on inputs; label association via implicit `<label>` wrapping
- Clicking/Space on already-selected radio does NOT trigger an API request
- ArrowRight/ArrowLeft navigate between radios and trigger the corresponding API request
- Switching filters triggers exactly 1 GET request to the new filter's endpoint
- Expires Until and Search inputs remain empty across filter switches
- No POST/PUT/PATCH/DELETE requests observed (only GET)
- Count text and empty state wording is identical for both filters
- Both radios: `input[type="radio"]`, enabled, `accent-primary` class

**Zero blocked cases in EFC-C.** All 63 test cases are read-only, atomic inspections verified through live MCP observation.

- **63 plans, 63 scripts (LIMAS-SUD-716 to LIMAS-SUD-778); 0 blocked; not executed**
- **Batch EFC-C status: Complete**