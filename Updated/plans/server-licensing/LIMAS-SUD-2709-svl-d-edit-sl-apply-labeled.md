# Test Plan: LIMAS-SUD-2709 — SVL-D: Edit Standard License Apply Button Labeled

## Metadata

- **Test ID:** LIMAS-SUD-2709
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Edit Standard License dialog contains an Apply button labeled "Apply Standard License changes" with visible text "Apply".

## Scope

Verify that the apply button in the Edit Standard License dialog has the correct accessible name and visible label. The accessible name should describe the action contextually, while the visible text is concise.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Edit Standard License dialog is open

## Test Steps

1. Open the Edit Standard License dialog on a Standard License card
2. Locate the Apply button within the dialog
3. Assert the button's accessible name is "Apply Standard License changes"
4. Assert the button's visible text is "Apply"
5. Assert the button is present and discoverable

## Expected Result

The Apply button has accessible name "Apply Standard License changes" and visible text "Apply".

## Test Data

- Use runtime discovery for: button labels
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: any Standard License card with Edit dialog open

## Notes

- The accessible name provides context for assistive technology users beyond the visible "Apply" text
