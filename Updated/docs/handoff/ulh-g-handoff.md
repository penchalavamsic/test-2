# ULH-G Handoff — Delete User

**Batch:** ULH-G  
**Test IDs:** LIMAS-SUD-1112 through LIMAS-SUD-1121 (10 test cases)  
**Spec:** `tests/user-license-hub/user-license-hub-delete-user.spec.ts`  
**Page object methods added to:** `tests/pages/user-license-hub.page.ts`

---

## Critical Live Finding: No Confirmation Dialog

**Delete User is a single-click destructive action.** When clicking the "Delete user" button, a `DELETE /limas/api/users/{userId}` request is sent immediately — there is NO confirmation dialog, modal, or prompt. This was confirmed via live network inspection.

- Button: `getByRole('button', { name: 'Delete user' })` — has accessible name
- API: `DELETE /limas/api/users/{userId}` → 200
- After deletion: user list auto-refreshes via GET

---

## Checklist Status

| Status |
|--------|
| 10 rows appended (1143–1152) |
| Alternating white/light-green fill |
| Plan Status: Completed |
| Script Status: Completed |

---

## Spec Structure (3 describe groups)

1. **Delete User — UI Presence** (non-gated: 3 tests)
   - SUD-1112: Delete button visible on each card
   - SUD-1113: Accessible name "Delete user"
   - SUD-1119: Every card has a Delete button

2. **Delete User — API Contract** (gated: 3 tests)
   - SUD-1114: Single-click, no confirmation dialog
   - SUD-1115: DELETE targets correct endpoint
   - SUD-1121: DELETE returns 200

3. **Delete User — List Refresh** (gated: 4 tests)
   - SUD-1116: Page auto-refreshes
   - SUD-1117: Deleted user removed from list
   - SUD-1118: Total count decrements
   - SUD-1120: Last user on page stability

---

## Page Object Methods Added

| Method | Purpose |
|--------|---------|
| `getDeleteUserButtons()` | All visible Delete buttons |
| `getDeleteUserButtonForFirstCard()` | First card's Delete button |
| `getFirstVisibleUserName()` | Name from first user card h3 |
| `getAllVisibleUserNames()` | All visible user card names |
| `getFirstVisibleUserId()` | User ID from API response |
| `getTotalUserCount()` | Total from pagination "of Z" |
| `getTotalPages()` | Total pages from "Page X of Y" |
| `goToPage(n)` | Navigate to specific page |

---

## Mutation Safety Gate

All destructive tests are gated behind:
```
TEST_ULH_ALLOW_USER_DELETE=true
```
Set this in `.env` only in a sandbox/test environment with disposable users.

---

## File Manifest

```
plans/user-license-hub/LIMAS-SUD-1112-ulh-g-delete-button-visible.md
plans/user-license-hub/LIMAS-SUD-1113-ulh-g-delete-button-accessible-name.md
plans/user-license-hub/LIMAS-SUD-1114-ulh-g-delete-no-confirmation.md
plans/user-license-hub/LIMAS-SUD-1115-ulh-g-delete-api-endpoint.md
plans/user-license-hub/LIMAS-SUD-1116-ulh-g-delete-page-refresh.md
plans/user-license-hub/LIMAS-SUD-1117-ulh-g-delete-user-removed-from-list.md
plans/user-license-hub/LIMAS-SUD-1118-ulh-g-delete-count-decrements.md
plans/user-license-hub/LIMAS-SUD-1119-ulh-g-delete-button-every-card.md
plans/user-license-hub/LIMAS-SUD-1120-ulh-g-delete-last-user-page-stability.md
plans/user-license-hub/LIMAS-SUD-1121-ulh-g-delete-response-status.md
tests/user-license-hub/user-license-hub-delete-user.spec.ts
tests/pages/user-license-hub.page.ts (modified — added delete methods)
```

## Verification

- 10 plans ✓
- 10 test blocks ✓
- 10 checklist rows (1143–1152) ✓
- Page object extended with 8 delete methods ✓