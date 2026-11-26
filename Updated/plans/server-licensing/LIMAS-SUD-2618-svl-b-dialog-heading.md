# LIMAS-SUD-2618: Dialog heading is "Create Server License" (level 2)

**Batch:** SVL-B (Create Server License Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
The opened dialog displays a level-2 heading "Create Server License".

## Preconditions
- Dialog is open after clicking "Create Server License"

## Steps
1. Open the Create Server License dialog
2. Locate the heading inside the dialog region
3. Verify the heading text and level

## Expected
- Heading text is exactly "Create Server License"
- Heading is an h2 element (level 2)

## Observed
- `heading "Create Server License" [level=2]` confirmed