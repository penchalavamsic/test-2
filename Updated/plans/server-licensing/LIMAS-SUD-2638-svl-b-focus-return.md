# LIMAS-SUD-2638: Focus returns to Create Server License button after closing

**Batch:** SVL-B (Create Server License Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
After closing the dialog via Escape, Cancel, or Close, keyboard focus returns to the "Create Server License" button that triggered it.

## Preconditions
- Dialog is open

## Steps
1. Close the dialog using Escape
2. Verify the active element

## Expected
- Active element is the Create Server License button
- Button has `aria-label="Create Server License"`

## Observed
- Confirmed after Escape, Cancel, and Close — focus returns to "Create Server License" button every time