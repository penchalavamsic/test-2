# LIMAS-SUD-2668: Clearing the Customer name field enables Apply

**Batch:** SVL-C (Edit Customer Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
Clearing the Customer name field so it is empty is treated as a change from the pre-filled value, enabling the Apply button.

## Preconditions
- Edit Customer dialog is open with Customer name pre-filled
- Apply is initially disabled

## Steps
1. Open the Edit Customer dialog
2. Clear the Customer name field (select all and delete, leaving it empty)
3. Verify the Apply button state

## Expected
- Apply button is enabled
- An empty Customer name is treated as a change from the original value

## Observed
- Apply enabled when Customer name is cleared to empty