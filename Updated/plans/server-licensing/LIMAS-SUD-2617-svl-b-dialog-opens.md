# LIMAS-SUD-2617: Clicking Create Server License opens the dialog

**Batch:** SVL-B (Create Server License Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
Clicking the "Create Server License" button opens a dialog region with heading "Create Server License".

## Preconditions
- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card is expanded, dialog is not already open

## Steps
1. Click "Create Server License" on the first expanded customer card
2. Verify a dialog region appears

## Expected
- A region with accessible name "Create Server License" becomes visible
- Dialog contains a heading, filename field, Cancel, and Apply buttons

## Observed
- `region "Create Server License"` appears below the card
- Dialog is inline (not modal overlay)