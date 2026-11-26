# Test Plan: LIMAS-SUD-2766 — SVL-E: Create FL Heading

## Metadata

- **Test ID:** LIMAS-SUD-2766
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Create Floating License form contains an h3 heading with text "Create Floating License".

## Scope

Verify that the heading within the Create Floating License form region is correctly leveled and labeled. The heading should clearly identify the form's purpose.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Floating tab active
- Create Floating License form is open

## Test Steps

1. Open the Create Floating License form
2. Locate the h3 heading within the form region
3. Assert the heading text is "Create Floating License"
4. Assert the heading level is 3

## Expected Result

The form contains an h3 heading "Create Floating License".

## Test Data

- Use runtime discovery for: heading text, heading level
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: Create Floating License form open

## Notes

- Heading level should be consistent with other SVL form headings (h3)