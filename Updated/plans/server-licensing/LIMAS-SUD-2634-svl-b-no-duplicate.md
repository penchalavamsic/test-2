# LIMAS-SUD-2634: Dialog closes after Apply and no duplicate submission is possible

**Batch:** SVL-B (Create Server License Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
After clicking Apply, the dialog closes immediately, preventing duplicate submissions.

## Preconditions
- Dialog is open

## Steps
1. Click Apply
2. Immediately check if the Apply button is still present

## Expected
- Dialog is removed from DOM
- No opportunity to click Apply again

## Observed
- Dialog closes on Apply click
- Apply button no longer in DOM
- Duplicate submission prevented by dialog closure