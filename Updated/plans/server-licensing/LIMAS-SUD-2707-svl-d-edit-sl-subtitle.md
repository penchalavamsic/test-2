# Test Plan: LIMAS-SUD-2707 — SVL-D: Edit Standard License Dialog Subtitle

## Metadata

- **Test ID:** LIMAS-SUD-2707
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Edit Standard License dialog displays a subtitle in the format "LICENSE_NAME · ROLE" (e.g., "APP-FCDS-USER · FULL") identifying which license is being edited.

## Scope

Verify that the dialog subtitle clearly identifies the specific Standard License and profile role being edited. The subtitle format is "LICENSE_NAME · ROLE" separated by a middle dot.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Edit Standard License dialog is open for a specific license

## Test Steps

1. Open the Edit Standard License dialog on a Standard License card
2. Locate the subtitle element within the dialog
3. Assert the subtitle contains the license name as seen on the card
4. Assert the subtitle contains the profile role as seen on the card
5. Assert the format includes a middle dot ("·") separator between name and role
6. Assert the subtitle is visible

## Expected Result

The dialog displays a subtitle "LICENSE_NAME · ROLE" matching the card's license name and profile role.

## Test Data

- Use runtime discovery for: license names, profile roles
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a customer with a Standard License card; note the card's license name and role before opening dialog

## Notes

- Observed example: "APP-FCDS-USER · FULL" — do not assert this exact string
- The subtitle may be an element between the heading and the form fields
