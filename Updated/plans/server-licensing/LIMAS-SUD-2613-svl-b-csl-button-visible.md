# LIMAS-SUD-2613: Create Server License button is visible on each customer card

**Batch:** SVL-B (Create Server License Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
The "Create Server License" button is visible on every expanded customer card on the Server License Management page.

## Preconditions
- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- At least one customer card is present and expanded

## Steps
1. Navigate to Server License Management
2. Ensure the first customer card is expanded (click expand toggle if collapsed)
3. Locate the "Create Server License" button within the expanded card

## Expected
- Button is visible and has accessible name "Create Server License"
- Button is present on each expanded customer card

## Observed
- Button present on all cards; label text "Create Server License"
- Accessible name confirmed via `aria-label="Create Server License"`