# LIMAS-SUD-2644: Clicking Edit Customer opens the dialog

**Batch:** SVL-C (Edit Customer Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
Clicking the "Edit Customer" button opens a dialog region with heading "Edit Customer" and Close button "Close Edit Customer".

## Preconditions
- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card is expanded, dialog is not already open

## Steps
1. Click "Edit Customer" on an expanded customer card
2. Verify a dialog region appears

## Expected
- A region with accessible name "Edit Customer" becomes visible
- Dialog contains heading "Edit Customer" (level 2)
- Dialog contains Close button "Close Edit Customer"
- Dialog contains Customer name, Hardware ID, Server type fields

## Observed
- `region "Edit Customer"` appears on the card
- `heading "Edit Customer"` [level=2] confirmed
- Close button has accessible name "Close Edit Customer"