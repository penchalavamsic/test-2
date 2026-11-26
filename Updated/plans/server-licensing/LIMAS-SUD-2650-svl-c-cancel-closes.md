# LIMAS-SUD-2650: Cancel closes the dialog without persisting changes

**Batch:** SVL-C (Edit Customer Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
Clicking the Cancel button closes the dialog. The customer card continues to display the original values.

## Preconditions
- Edit Customer dialog is open with modifications made

## Steps
1. Open the Edit Customer dialog
2. Modify the Customer name field to a new value
3. Click Cancel
4. Verify the dialog is closed
5. Verify the customer card still shows the original name

## Expected
- Dialog region is removed
- Customer card displays the original (pre-edit) values
- No change is persisted

## Observed
- Dialog closes on Cancel click
- Card values remain unchanged from before the dialog was opened