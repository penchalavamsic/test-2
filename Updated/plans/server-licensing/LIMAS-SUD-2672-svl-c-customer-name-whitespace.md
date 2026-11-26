# LIMAS-SUD-2672: Whitespace-only Customer name enables Apply

**Batch:** SVL-C (Edit Customer Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
Replacing the Customer name with a whitespace-only value (e.g., spaces) is treated as a change from the original value, enabling Apply.

## Preconditions
- Edit Customer dialog is open with Customer name pre-filled
- Apply is initially disabled

## Steps
1. Open the Edit Customer dialog
2. Replace the Customer name value with one or more space characters
3. Verify the Apply button state

## Expected
- Apply button is enabled
- Whitespace-only value is treated as a change (differs from original non-whitespace name)

## Observed
- Apply enabled when Customer name replaced with whitespace-only value