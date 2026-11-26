# LIMAS-SUD-2651: Close button closes the dialog without persisting changes

**Batch:** SVL-C (Edit Customer Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
Clicking the "Close Edit Customer" button closes the dialog without persisting any modifications.

## Preconditions
- Edit Customer dialog is open with modifications made

## Steps
1. Open the Edit Customer dialog
2. Modify the Hardware ID field to a new value
3. Click the Close button ("Close Edit Customer")
4. Verify the dialog is closed
5. Verify the customer card still shows the original hardware ID

## Expected
- Dialog region is removed
- Customer card displays the original (pre-edit) values
- No change is persisted

## Observed
- Dialog closes on Close button click
- Card values remain unchanged