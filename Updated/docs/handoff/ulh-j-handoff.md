# ULH-J Handoff — Add License

**Batch:** ULH-J  
**Test IDs:** LIMAS-SUD-1203 through LIMAS-SUD-1248 (46 test cases)  
**Spec:** `tests/user-license-hub/user-license-hub-add-license.spec.ts`  
**Page Object:** `tests/pages/user-license-hub.page.ts` (extended with Add License methods)

---

## Live Inspection Findings

### Add License Prerequisite
Same as Download: **specific Profile applied + user explicitly selected**.
Without both, Add License stays disabled.

### Dialog Structure
- **Heading:** "Add License"
- **Description:** "Add a new license for this user"
- **Fields:**
  - Hardware IDs (text input, placeholder "e.g., HW001", required, min 1)
  - Profile (combobox, "Select profile" default, required)
  - Role (combobox, appears after Profile selection, required)
  - Expiration Date (date input, required)
  - Maintenance Date (date input, optional)
- **Buttons:** Cancel, Save, Close

### Critical Behavior
- **Save is ENABLED immediately** — NOT validity-driven (different from Add User dialog)
- **Profile-to-Role dependency:** Role combobox hidden until Profile selected
- **Changing Profile CLEARS Role** — confirmed via inspection
- Profile dropdown: 100+ options
- Role options dynamic per Profile (e.g., "Authoring Suite 2" → Developer/Intern/Low Version; "Autosar 2" → UserRole)

### Dismissal
- Cancel: closes dialog, no save
- Close button: dismisses
- Escape: dismisses
- Outside click: dismisses
- Reopening: all fields reset to clean state

---

## Spec Structure (9 describe groups)

1. **Add License Button** (4 tests: SUD-1203–1206)
2. **Dialog Shell** (17 tests: SUD-1207–1216, 1234–1236)
3. **Hardware IDs** (2 tests: SUD-1217, 1237)
4. **Profile and Role** (7 tests: SUD-1218–1221, 1238–1239)
5. **Date Controls** (3 tests: SUD-1222–1223, 1240)
6. **Cancel and Close** (5 tests: SUD-1224–1228)
7. **Save State** (1 test: SUD-1241)
8. **Create Lifecycle** (5 tests: SUD-1229–1233) — gated
9. **Failures (Planned)** (7 tests: SUD-1242–1248) — skipped

---

## Page Object Methods Added

| Method | Purpose |
|--------|---------|
| `openAddLicenseDialog()` | Click Add License button |
| `getAddLicenseDialog()` | Return dialog locator |
| `closeAddLicenseDialog()` | Dismiss via Escape |
| `getAddLicenseProfileCombo()` | Profile combobox |
| `getAddLicenseRoleCombo()` | Role combobox |
| `selectAddLicenseRuntimeProfile()` | Select first Profile option |
| `selectAddLicenseRuntimeRole()` | Select first Role option |
| `deleteLicenseByHardwareId(hwId)` | Delete license matching HWID |

---

## Checklist

| Status | Details |
|--------|---------|
| Rows appended | 1234–1279 (46 rows) |
| Plan Status | Reviewed |
| Script Status | Generated (39) / Not Started (7 failure plans) |
| Execution Status | Not Run |

---

## File Manifest

```
plans/user-license-hub/LIMAS-SUD-1203 through LIMAS-SUD-1248-ulh-j-add-license.md (46 files)
tests/user-license-hub/user-license-hub-add-license.spec.ts
tests/pages/user-license-hub.page.ts (modified — added 8 add-license methods)
docs/handoff/ulh-j-handoff.md
```

## Verification

- 46 plans ✓
- 46 test blocks ✓ (39 active, 7 skipped failure plans)
- 46 checklist rows (1234–1279) ✓
- 1 grouped spec ✓
- Page object extended with 8 methods ✓
- No hardcoded values ✓
- Mutation gated ✓
- Cleanup logic present ✓
- Browser remains open ✓