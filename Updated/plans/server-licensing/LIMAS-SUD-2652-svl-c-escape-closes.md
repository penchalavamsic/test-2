# LIMAS-SUD-2652: Escape key closes the dialog without persisting changes

**Batch:** SVL-C (Edit Customer Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
Pressing the Escape key closes the Edit Customer dialog without persisting any modifications.

## Preconditions
- Edit Customer dialog is open with focus inside it

## Steps
1. Open the Edit Customer dialog
2. Modify the Server type radio selection
3. Press Escape
4. Verify the dialog is closed
5. Verify the customer card still shows the original server type

## Expected
- Dialog region is removed
- Customer card displays the original values
- No change is persisted

## Observed
- Escape closes the dialog
- Card values remain unchanged from before the dialog was opened