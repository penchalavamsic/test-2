# LIMAS-SUD-2663: Edit and Delete System User buttons are disabled when no System User assigned

**Batch:** SVL-C (Edit Customer Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
The Edit System User and Delete System User buttons are disabled when no System User is assigned, with accessible names reflecting the disabled state.

## Preconditions
- Edit Customer dialog is open on a customer card with no System User assigned

## Steps
1. Open the Edit Customer dialog
2. Locate the System User section
3. Verify Edit System User button is disabled
4. Verify Delete System User button is disabled
5. Verify each button has an accessible name (e.g., "Edit System User", "Delete System User")

## Expected
- Edit System User button: disabled, accessible name "Edit System User"
- Delete System User button: disabled, accessible name "Delete System User"

## Observed
- Both buttons disabled with accessible names reflecting their function