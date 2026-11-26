# Test Plan: LIMAS-SUD-2744 — SVL-E: Edit FL Subtitle

## Metadata

- **Test ID:** LIMAS-SUD-2744
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Edit Floating License dialog displays a subtitle with the format "LICENSE_NAME · ROLE" (e.g., "STIHL EOL Tester · manager").

## Scope

Verify that the dialog shows a subtitle line combining the license name and profile role, separated by an interpunct (·). This gives context about which license is being edited.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Edit Floating License dialog is open
- Card values (license name and Profile Role) have been read before opening

## Test Steps

1. Read the license name and Profile Role from a Floating License card
2. Open the Edit Floating License dialog on that card
3. Locate the subtitle element below the h3 heading
4. Assert the subtitle contains the license name
5. Assert the subtitle contains the Profile Role value
6. Assert the format follows "LICENSE_NAME · ROLE" pattern (with interpunct separator)

## Expected Result

The subtitle displays "LICENSE_NAME · ROLE" matching the card's license name and Profile Role.

## Test Data

- Use runtime discovery for: license name, Profile Role value
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: a Floating License card with known name and role

## Notes

- The interpunct (·) character is expected; verify exact separator at runtime