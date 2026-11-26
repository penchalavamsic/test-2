# LIMAS-SUD-2635: No success feedback is shown after download

**Batch:** SVL-B (Create Server License Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
After a successful Apply and download, no toast, alert, or explicit success message is displayed.

## Steps
1. Apply a valid filename and trigger a download
2. Inspect the page for success notifications

## Expected (based on observation)
- No `[role="alert"]`, `[role="status"]`, toast, or snackbar appears
- UI simply returns to the card's expanded state

## Observed
- No success feedback element detected after download
- Dialog closes and UI returns to card view