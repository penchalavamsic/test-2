## System User Dashboard — Expiring Floating Configurations Search Input Tests (Batch EFC-E)

### Search Input Structure, Client-Side Behavior, and Empty-State Rendering (EFC-E: SUD-820 to SUD-843, 24 tests)

**Verified search input structure:**
- `input[type="search"]`, accessible role "searchbox"
- Accessible name provided solely by `placeholder="Search by User Group or Profile…"`
- No `id`, no `name`, no `aria-label`, no `aria-labelledby`
- No `<label>` association (labels.length is 0)
- No `incremental` or `results` search-specific attributes
- Not inside a `<form>` element
- SVG search icon precedes the input; no clear/close button exists
- `disabled: false`, `tabIndex: 0`

**Verified search behavior:**
- Search is **client-side only** — entering text does NOT trigger any flconfig API request
- With search text present, the empty state changes:
  - Heading: "No matching configurations" (vs. default "No expiring floating configurations found")
  - Text: "Try adjusting the filters or clearing the search value." (vs. default "No floating license configurations match the selected date criteria.")
- Count text ("0 loaded · 0 total configurations") is unchanged by search
- Clearing the search restores the default empty state heading and text
- Search value persists across filter radio switches (Expiration → Maintenance)
- Search value is independent of date input changes
- No data-changing requests observed (search is purely client-side filtering)

**Accessibility findings:**
- No accessible label beyond placeholder — no `aria-label`, no `<label>`, no `aria-labelledby`
- Screen reader users rely entirely on placeholder text for identification

**Blocked cases: 0.** All 24 cases are deterministic and supported by live observation.

- **24 plans, 24 scripts (LIMAS-SUD-820 to LIMAS-SUD-843); 0 blocked; not executed**
- **Batch EFC-E status: Complete**