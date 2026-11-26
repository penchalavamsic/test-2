# LIMAS-SUD-2661: Delete group removes the row immediately, restored on Cancel

**Batch:** SVL-C (Edit Customer Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
Clicking "Delete group <name>" immediately removes the group row from the User Groups list (optimistic removal). The main Apply button enables. If the Edit Customer dialog is cancelled, the deleted group is restored.

## Preconditions
- Edit Customer dialog is open with at least one existing group row
- No other field changes have been made

## Steps
1. Open the Edit Customer dialog
2. Click "Delete group <name>" on an existing group
3. Verify the row is immediately removed from the list
4. Verify the main Apply button becomes enabled
5. Click Cancel on the main dialog
6. Reopen the dialog and verify the group is still present

## Expected
- Group row is removed immediately (optimistic UI)
- Apply button is enabled
- On Cancel, the group remains (dialog state is discarded)

## Observed
- Immediate removal on Delete click
- Apply enables
- Group restored after Cancel + reopen