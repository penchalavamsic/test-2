# LIMAS-SUD-2640: No loading indicator is shown during Apply

**Batch:** SVL-B (Create Server License Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
The Apply action does not display a visible loading state — the dialog closes immediately and the download begins.

## Preconditions
- Dialog is open with valid filename

## Steps
1. Click Apply
2. Observe for loading spinners, progress bars, or disabled controls

## Expected (based on observation)
- No loading indicator appears
- Dialog closes immediately on Apply click
- Download event fires asynchronously

## Observed
- No loading spinner, skeleton, or disabled state between click and dialog close
- Dialog simply closes; download handled by browser