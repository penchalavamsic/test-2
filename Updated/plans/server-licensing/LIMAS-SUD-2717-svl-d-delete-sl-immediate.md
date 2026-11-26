# Test Plan: LIMAS-SUD-2717 — SVL-D: Delete Standard License — Immediate Removal Without Confirmation

## Metadata

- **Test ID:** LIMAS-SUD-2717
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Clicking "Delete Standard License" immediately removes the license card from the list without any confirmation dialog. This was verified on CLAAS_LMT_DEV where the license was removed instantly.

## Scope

Document the observed behavior that clicking Delete Standard License triggers an immediate, destructive removal of the license with no confirmation step. This test documents behavior only.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Customer has at least one Standard License card

## Test Steps

1. Observe (do not click) the Delete Standard License button on a card
2. Document that there is no confirmation dialog trigger associated with this button
3. Document that on CLAAS_LMT_DEV, clicking Delete removed the license instantly
4. Assert the Delete button exists as documented

## Expected Result

The Delete Standard License button is present and, based on prior observation, deletes the license immediately without any confirmation dialog.

## Test Data

- Use runtime discovery for: button presence
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a Standard License card

## Notes

- **WARNING:** This test documents behavior only — do NOT click Delete in automated tests
- Deletion is immediate and destructive; there is no undo or confirmation
- Observation source: CLAAS_LMT_DEV environment
- This may be a UX defect — destructive actions should have confirmation
