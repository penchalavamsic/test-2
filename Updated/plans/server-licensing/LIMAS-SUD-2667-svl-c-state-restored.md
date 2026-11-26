# LIMAS-SUD-2667: Dialog state resets to original values on reopen after Cancel

**Batch:** SVL-C (Edit Customer Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
After modifying fields and cancelling the dialog, reopening it shows the original pre-edit values — not the cancelled modifications.

## Preconditions
- Edit Customer dialog closed via Cancel after modifications

## Steps
1. Open the Edit Customer dialog
2. Change the Customer name to a different value
3. Change the Hardware ID to a different value
4. Change the Server type radio selection
5. Add a new User Group
6. Click Cancel
7. Reopen the Edit Customer dialog
8. Verify all fields show the original values

## Expected
- Customer name shows the original value (not the changed one)
- Hardware ID shows the original value
- Server type shows the original selection
- User Groups list shows the original groups (no added group)
- Any deleted groups are restored

## Observed
- All fields reset to original values on reopen
- Dialog state is fully restored