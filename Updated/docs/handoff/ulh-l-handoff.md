# ULH-L Handoff — Delete License

**Batch:** ULH-L  
**Test IDs:** LIMAS-SUD-1461 through LIMAS-SUD-1481 (21 test cases)  
**Spec:** `tests/user-license-hub/user-license-hub-delete-license.spec.ts`  
**Page Object:** `tests/pages/user-license-hub.page.ts` (extended with 5 Delete License methods)

---

## MCP Inspection Findings

### Delete License Button
- Present on every license card with `aria-label="Delete license"`
- Icon-only (SVG inside button, no text content)
- Always visible on license cards regardless of Profile filter state
- Enabled when visible

### Interaction Model: IMMEDIATE DELETION (No Confirmation)
- **No confirmation dialog** — clicking "Delete license" sends a DELETE request directly
- **No native alert/confirm/prompt** dialog
- **No `role="dialog"` or `role="alertdialog"`** for confirmation
- This matches the User Delete pattern discovered in ULH-G
- Delete is gated behind the same prerequisite as other toolbar actions: specific Profile filter + user explicitly selected

### Gating Behavior
- Without a specific Profile filter applied, clicking Delete License does nothing (no dialog, no request)
- This is consistent with Download/Email/Add License toolbar button behavior
- The `deleteLicenseByHardwareId` method in the page object was previously verified working in ULH-J

### No Mutations Performed
- Mutation flags were NOT set during MCP inspection
- All findings are from safe inspection — no existing licenses were deleted

---

## Spec Structure (4 describe groups)

1. **Delete License Action** (5 tests: 1461–1464, 1467)
2. **Interaction Model** (4 tests: 1465, 1466, 1468, 1478)
3. **Delete License Lifecycle** (serial, 10 tests: 1469–1477, 1481) — mutation-gated
4. **Controlled Failures** (2 skipped: 1479–1480)

---

## Page Object Methods (5 added)

| Method | Purpose |
|--------|---------|
| `getDeleteLicenseButtonForRuntimeLicense()` | Find first Delete license button |
| `openDeleteLicenseAction()` | Click Delete (no confirmation) |
| `waitForDeleteLicenseRequest()` | Observe DELETE response |
| `verifyRuntimeLicenseAbsent(hwId)` | Verify license removed |
| `restoreDeleteLicenseCleanState()` | Safe state restoration |

---

## Checklist

| Status | Details |
|--------|---------|
| Rows appended | 1492–1512 (21 rows) |
| Plan Status | Reviewed |
| Script Status | Generated (19 active, 2 gated failure plans) |
| Execution Status | Not Run |

---

## File Manifest

```
plans/user-license-hub/LIMAS-SUD-1461 through LIMAS-SUD-1481-ulh-l-delete-license-*.md (21 files)
tests/user-license-hub/user-license-hub-delete-license.spec.ts (1 grouped spec, 4 describe groups)
tests/pages/user-license-hub.page.ts (modified — added 5 Delete License methods)
docs/handoff/ulh-l-handoff.md
```

## Key Finding

**Delete License has NO confirmation dialog.** Single click sends DELETE immediately when prerequisites are met (specific Profile filter + user selected). This is a destructive UX concern documented in SUD-1478.