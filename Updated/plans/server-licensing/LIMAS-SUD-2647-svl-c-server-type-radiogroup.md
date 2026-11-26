# LIMAS-SUD-2647: Server type radiogroup is visible with three options, current selection pre-selected

**Batch:** SVL-C (Edit Customer Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
The Server type radiogroup has accessible name "Server type" with three options — Standard, Full License, Hybrid — and the currently active server type is pre-selected.

## Preconditions
- Edit Customer dialog is open on a customer card with a known server type (e.g., AATestCustomer: Full License)

## Steps
1. Open the Edit Customer dialog
2. Locate the Server type radiogroup
3. Verify the radiogroup accessible name is "Server type"
4. Verify three radio options are present: Standard, Full License, Hybrid
5. Verify the current server type radio is checked

## Expected
- `radiogroup "Server type"` is visible
- Three options: "Standard", "Full License", "Hybrid"
- The option matching the card's server type is checked (e.g., "Full License")

## Observed
- `radiogroup "Server type"` confirmed
- Three radio options visible with the current selection pre-checked