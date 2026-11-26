# ULH-I Handoff — Download License

**Batch:** ULH-I  
**Test IDs:** LIMAS-SUD-1163 through LIMAS-SUD-1202 (40 test cases)  
**Spec:** `tests/user-license-hub/user-license-hub-download-license.spec.ts`  
**Page Object:** `tests/pages/user-license-hub.page.ts` (extended with download methods)

---

## Live Inspection Findings

### Download Prerequisite
**Both conditions must be met for Download to enable:**
1. A **specific Profile** (not "All Profiles") must be applied via Filters → Select
2. A **user must be explicitly selected** by clicking their card

Without user selection, even with Profile applied, Download stays disabled.
With All Profiles active, Download stays disabled regardless of user selection.

### Toolbar State Transitions

| State | Download | Email | Add License |
|-------|----------|-------|-------------|
| All Profiles, no user selected | Disabled | Disabled | Disabled |
| Specific Profile, no user selected | Disabled | Disabled | Disabled |
| Specific Profile + user selected | **Enabled** | **Enabled** | **Enabled** |
| All Profiles restored | Disabled | Disabled | Disabled |

### Download Contract
- **API:** `GET /limas/api/license/enc/i/{userEmail}` → 200
- **Method:** Server-generated via GET (not client-side)
- **File format:** JSON body with `.xml` extension
- **Structure:** `{"license":"<base64-encoded-blob>"}`
- **Size:** ~597KB (varies per license)
- **Filename pattern:** `license_{userEmail}.xml`

### Duplicate Prevention
- One click = one download event
- Rapid double-click = single download event
- Second click after first download completes = no additional download (session-cached)
- No duplicate request generation

### Network Safety
- All download operations: GET only
- No POST, PUT, PATCH, DELETE during download flow

---

## Spec Structure (6 describe groups)

1. **Download Button** (4 tests: SUD-1163, 1192–1194)
2. **Profile Prerequisite** (10 tests: SUD-1164–1172, 1191)
3. **Baseline Download** (14 tests: SUD-1173–1179, 1183–1188)
4. **Duplicate Protection** (3 tests: SUD-1180–1182)
5. **Download Scope** (2 tests: SUD-1189–1190)
6. **Download Failures (Planned)** (8 tests: SUD-1195–1202) — skipped, requires fixtures

---

## Page Object Methods Added

| Method | Purpose |
|--------|---------|
| `selectFirstVisibleUser()` | Click first user card to select |
| `applyRuntimeProfileForDownload()` | Apply non-All-Profiles filter + select user |
| `applySpecificProfileWithoutUserSelection()` | Apply Profile without clicking user |
| `restoreAllProfilesFilter()` | Reset to All Profiles via Filter dialog |
| `triggerDownloadAndCapture(page, tmpDir)` | Click Download, capture file to temp dir |

---

## Checklist

| Status | Details |
|--------|---------|
| Rows appended | 1194–1233 (40 rows) |
| Plan Status | Reviewed |
| Script Status | Generated (32) / Not Started (8 failure plans) |
| Execution Status | Not Run |

---

## File Manifest

```
plans/user-license-hub/LIMAS-SUD-1163 through LIMAS-SUD-1202-ulh-i-download-license.md (40 files)
tests/user-license-hub/user-license-hub-download-license.spec.ts
tests/pages/user-license-hub.page.ts (modified — added 5 download methods)
docs/handoff/ulh-i-handoff.md
```

## Verification

- 40 plans ✓
- 40 test blocks ✓  (32 active, 8 skipped)
- 40 checklist rows (1194–1233) ✓
- 1 grouped spec ✓
- Page object extended with 5 methods ✓
- No hardcoded values ✓
- No data-changing requests ✓
- File cleanup in finally blocks ✓
- Browser remains open ✓