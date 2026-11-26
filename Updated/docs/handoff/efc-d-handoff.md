## System User Dashboard — Expiring Floating Configurations Date Input Tests (Batch EFC-D)

### Expires Until Date Input Structure, Behavior, and Restoration (EFC-D: SUD-779 to SUD-819, 41 tests)

**Verified date input structure:**
- `input[type="date"]`, `id="floating-expires-before"`, accessible name "Expires until"
- Explicit `<label for="floating-expires-before">Expires until</label>` association
- No `min`, `max`, `required`, `step`, `placeholder`, `autocomplete` attributes
- No `aria-required`, `aria-invalid`, `aria-describedby`
- `showPicker()` supported (browser-native calendar picker)
- Calendar picker is native browser chrome — no DOM-based dialog
- No separate calendar icon element (browser-native pseudo-element)
- Escape closes picker, focus returns to input

**Verified date behavior:**
- Valid date change triggers exactly 1 GET request to the active filter's endpoint
- Date format in URL path: `MMMM d, yyyy` URL-encoded (e.g., `November%206%2C%202027`)
- Filling the same date twice does NOT trigger a second request
- Clearing the input triggers a request with the default (current) date
- Invalid text (non-date) is rejected by the native date input; the browser clears the value
- Invalid text triggers a React change event → request with default date
- Date with Expiration filter uses `GET /limas/api/flconfig/e/{date}/{userId}?page=0&size=5`
- Date with Maintenance filter uses `GET /limas/api/flconfig/m/{date}/{userId}?page=0&size=5`
- Zero counts and empty state are rendered identically for any valid date with zero results
- Count wording ("0 loaded · 0 total configurations") unchanged across date changes
- Empty state wording unchanged across date changes
- All requests are GET only — no data-changing methods observed

**Blocked cases: 0.** All 41 cases are deterministic and supported by live observation.

- **41 plans, 41 scripts (LIMAS-SUD-779 to LIMAS-SUD-819); 0 blocked; not executed**
- **Batch EFC-D status: Complete**