# LIMAS-SUD-2664: Initial focus is on the Customer name field when dialog opens

**Batch:** SVL-C (Edit Customer Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
When the Edit Customer dialog opens, keyboard focus is placed on the Customer name field (id="edit-cust-name").

## Preconditions
- Edit Customer button is visible and focused (via prior interaction or programmatic focus)

## Steps
1. Click the Edit Customer button
2. After the dialog appears, verify the active element

## Expected
- The active (focused) element is the Customer name textbox with id="edit-cust-name"

## Observed
- Focus lands on `textbox` id="edit-cust-name" when dialog opens