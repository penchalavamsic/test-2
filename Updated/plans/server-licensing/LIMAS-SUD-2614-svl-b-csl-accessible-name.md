# LIMAS-SUD-2614: Create Server License button has accessible name

**Batch:** SVL-B (Create Server License Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
The "Create Server License" button on a customer card has an accessible name matching "Create Server License".

## Preconditions
- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card is expanded

## Steps
1. Expand a customer card
2. Locate the "Create Server License" button
3. Verify the button has an accessible name (aria-label) matching "Create Server License"

## Expected
- Button has `aria-label="Create Server License"`
- Accessible name is non-empty

## Observed
- Button has `aria-label="Create Server License"` confirmed via browser inspection