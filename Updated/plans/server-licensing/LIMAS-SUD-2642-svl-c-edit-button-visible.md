# LIMAS-SUD-2642: Edit Customer button is visible on each customer card

**Batch:** SVL-C (Edit Customer Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
The "Edit Customer" button is visible on every expanded customer card on the Server License Management page.

## Preconditions
- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- At least one customer card is present and expanded

## Steps
1. Navigate to Server License Management
2. Ensure a customer card is expanded (click expand toggle if collapsed)
3. Locate the "Edit Customer" button within the expanded card

## Expected
- Button is visible and has accessible name "Edit Customer"
- Button is present on each expanded customer card

## Observed
- Button present on all cards; label text "Edit Customer"
- Accessible name confirmed via accessible name matching "Edit Customer"