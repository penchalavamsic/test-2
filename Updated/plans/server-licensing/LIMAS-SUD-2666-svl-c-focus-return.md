# LIMAS-SUD-2666: Focus returns to Edit Customer button after dialog closes

**Batch:** SVL-C (Edit Customer Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
After closing the Edit Customer dialog via Escape, Cancel, or Close, focus returns to the Edit Customer button that opened it.

## Preconditions
- Edit Customer dialog is open

## Steps
1. Open the Edit Customer dialog
2. Press Escape
3. Verify the active element is the Edit Customer button
4. Reopen the dialog
5. Click Cancel
6. Verify the active element is the Edit Customer button
7. Reopen the dialog
8. Click the Close button ("Close Edit Customer")
9. Verify the active element is the Edit Customer button

## Expected
- Focus returns to the Edit Customer button after Escape, Cancel, and Close
- The active element is the Edit Customer button on the card

## Observed
- Focus returns to Edit Customer button after all three close methods