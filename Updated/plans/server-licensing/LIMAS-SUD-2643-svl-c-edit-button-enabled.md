# LIMAS-SUD-2643: Edit Customer button is enabled

**Batch:** SVL-C (Edit Customer Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
The "Edit Customer" button on a customer card is enabled and clickable.

## Preconditions
- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card is expanded

## Steps
1. Expand a customer card (e.g., AATestCustomer)
2. Locate the "Edit Customer" button
3. Verify the button is enabled

## Expected
- Button is not disabled
- Button responds to click (opens dialog)

## Observed
- Button is enabled and clickable