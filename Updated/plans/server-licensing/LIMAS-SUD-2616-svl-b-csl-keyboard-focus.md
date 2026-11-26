# LIMAS-SUD-2616: Create Server License button is keyboard focusable

**Batch:** SVL-B (Create Server License Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
The "Create Server License" button receives keyboard focus when navigating with Tab.

## Preconditions
- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card is expanded

## Steps
1. Expand the first customer card
2. Tab through the interactive elements on the card (Edit, Delete, Expand toggle)
3. Verify the "Create Server License" button can receive focus

## Expected
- Button receives keyboard focus
- Focus indicator is visible

## Observed
- Button is reachable via Tab navigation
- Focus returns to button when dialog is closed