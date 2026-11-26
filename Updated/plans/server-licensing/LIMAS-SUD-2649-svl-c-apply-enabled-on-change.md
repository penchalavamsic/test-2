# LIMAS-SUD-2649: Apply becomes enabled when a field is changed

**Batch:** SVL-C (Edit Customer Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
The Apply button becomes enabled when at least one of customer name, hardware ID, or server type is changed from its initial pre-filled value.

## Preconditions
- Edit Customer dialog is open with Apply disabled

## Steps
1. Open the Edit Customer dialog
2. Change the Customer name field value
3. Verify Apply is now enabled
4. Close and reopen the dialog
5. Change the Hardware ID field value
6. Verify Apply is now enabled
7. Close and reopen the dialog
8. Select a different Server type radio option
9. Verify Apply is now enabled

## Expected
- Changing any one field enables Apply
- Changing two or all three fields also keeps Apply enabled

## Observed
- Apply enables on any single-field change (customer name, hardware ID, or server type)
- Apply remains enabled for multi-field changes