# ULH-K Handoff — Edit License

**Batch:** ULH-K  
**Test IDs:** LIMAS-SUD-1249 through LIMAS-SUD-1460 (212 test cases)  
**Spec:** `tests/user-license-hub/user-license-hub-edit-license.spec.ts`  
**Page Object:** `tests/pages/user-license-hub.page.ts` (extended with 18 Edit License methods)

---

## Live MCP Inspection Findings

### Edit License Button
- Located inside license cards as the first button in the `flex items-start justify-between` header
- No text, no aria-label, has SVG icon
- Sibling: "Delete license" button with explicit `aria-label`

### Dialog Structure
- **role:** `dialog`
- **aria-labelledby / aria-describedby:** Radix dialog attributes
- **Heading:** "Edit License" (h2)
- **Description:** "Edit license details"

### Fields
| Field | Type | State | Key Property |
|-------|------|-------|-------------|
| Hardware ID | text input | **disabled** | `disabled=""` (not readonly) |
| Profile | combobox | **disabled** | `disabled=""` |
| Role | combobox | **enabled** | pre-populated |
| Expiration Date | date input | **enabled** | `id="expirationDate"` |
| Maintenance Date | date input | **enabled** | `id="maintenanceDate"` |

### Explanatory Messages
- "Hardware ID cannot be changed for existing licenses"
- "Profile cannot be changed for existing licenses"

### Labels
- Hardware IDs (minimum 1 required) *
- Profile *
- Role *
- Expiration Date *
- Maintenance Date (no asterisk)

### Critical Behaviors

1. **Save is ENABLED immediately** — not validity-driven (consistent with Add License)
2. **Initial focus:** Role combobox
3. **Role options:** Dynamic per Profile. Authoring Suite 2 Floating → ["1.11", "Developer"]
4. **Dismissals:** Cancel, Close (x), Escape, outside click — all work
5. **React cache:** Dialog form values persist between opens in same session (input `fill` values survive Cancel+reopen without page refresh). Page refresh required for truly fresh values.
6. **Backdrop:** Modal overlay with `data-state="open"`

### Hardware ID Read-Only Discovery
- Uses `disabled` attribute (not `readonly`)
- Not in tab order
- Keyboard/mouse editing blocked

### Profile Read-Only Discovery
- Combobox with `disabled` attribute
- Cannot expand dropdown
- Not in tab order

---

## Spec Structure (16 describe groups)

1. **Edit License Action** (15 tests: 1249–1263)
2. **Dialog Shell** (21 tests: 1264–1284)
3. **Prepopulated Values** (7 tests: 1285–1291)
4. **Hardware ID Read-Only** (16 tests: 1292–1307)
5. **Profile Read-Only** (13 tests: 1308–1320)
6. **Role Control** (12 tests: 1321–1332)
7. **Expiration Date** (15 tests: 1333–1347)
8. **Maintenance Date** (15 tests: 1348–1362)
9. **Cross-Date Validation** (8 tests: 1363–1370)
10. **Save and Dirty State** (10 tests: 1371–1380)
11. **Required-Field Validation** (5 tests: 1381–1385)
12. **Cancel and Dismissal** (11 tests: 1386–1396)
13. **Controlled Failures** (13 skipped: 1397–1409)
14. **Accessibility** (27 tests: 1410–1436)
15. **Edit Lifecycle** (16 gated tests: 1437–1452)
16. **API Contract** (8 skipped: 1453–1460)

---

## Page Object Methods Added (18 new)

| Method | Purpose |
|--------|---------|
| `getEditLicenseButtonForRuntimeLicense()` | Locate Edit button on runtime license card |
| `openEditLicenseDialog()` | Click Edit → open dialog |
| `getEditLicenseDialog()` | Return dialog locator |
| `closeEditLicenseDialog()` | Dismiss via Escape |
| `getEditLicenseHardwareIdInput()` | HW ID input |
| `getEditLicenseProfileCombo()` | Profile combobox |
| `getEditLicenseRoleCombo()` | Role combobox |
| `getEditLicenseExpirationInput()` | Expiration Date input |
| `getEditLicenseMaintenanceInput()` | Maintenance Date input |
| `getEditLicenseSaveButton()` | Save button |
| `getEditLicenseRoleOptions()` | Read available Role options |
| `selectEditLicenseRole(role)` | Select Role by name |
| `setEditLicenseExpirationDate(date)` | Set Expiration Date |
| `clearEditLicenseExpirationDate()` | Clear Expiration Date |
| `setEditLicenseMaintenanceDate(date)` | Set Maintenance Date |
| `clearEditLicenseMaintenanceDate()` | Clear Maintenance Date |
| `submitEditLicense()` | Click Save |

---

## Checklist

| Status | Details |
|--------|---------|
| Rows appended | 1280–1491 (212 rows) |
| Plan Status | Reviewed |
| Script Status | Generated (190) / Not Started (22 gated/failure) |
| Execution Status | Not Run |

---

## File Manifest

```
plans/user-license-hub/LIMAS-SUD-1249 through LIMAS-SUD-1460-ulh-k-edit-license-*.md (212 files)
tests/user-license-hub/user-license-hub-edit-license.spec.ts (1 grouped spec, 16 describe groups)
tests/pages/user-license-hub.page.ts (modified — added 18 Edit License methods)
docs/handoff/ulh-k-handoff.md
```

## Verification

- 212 plans ✓
- 212 test blocks ✓ (190 active, 22 gated/skipped)
- 212 checklist rows (1280–1491) ✓
- 1 grouped spec ✓
- Page object extended with 18 methods ✓
- No hardcoded values ✓
- Mutation gated ✓
- Cleanup logic present in lifecycle group ✓
- Browser remains open ✓

## Key Findings Documented

- **React cache issue:** Dialog form values persist across Cancel+reopen without page refresh (SUD-1393 covers this)
- **Save not validity-driven:** Confirmed via clearing Expiration Date — Save remains enabled
- **Disabled fields use `disabled=""`, not `readonly`:** Critical locator distinction
- **Explanatory messages:** Both HW ID and Profile have inline messages inside dialog