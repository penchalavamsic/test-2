# LIMAS-SUD-2615: Create Server License button is enabled

**Batch:** SVL-B (Create Server License Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
The "Create Server License" button on a customer card is enabled and clickable.

## Preconditions
- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card is expanded

## Steps
1. Expand a customer card
2. Locate the "Create Server License" button
3. Verify the button is enabled

## Expected
- Button is not disabled
- Button responds to click (opens dialog)

## Observed
- Button is enabled and clickable on all expanded customer cards