# Test Plan: LIMAS-SUD-2688 — SVL-D: Standard Licenses Description

## Metadata

- **Test ID:** LIMAS-SUD-2688
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** A paragraph "Standard licenses assigned to this server." is visible below the Standard Licenses heading.

## Scope

Verify the descriptive paragraph beneath the Standard Licenses heading. The paragraph must communicate the purpose of the section clearly.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card is expanded

## Test Steps

1. Expand a customer card
2. Locate the paragraph element following the "Standard Licenses" heading
3. Assert the paragraph text is "Standard licenses assigned to this server."
4. Assert the paragraph is visible

## Expected Result

The paragraph "Standard licenses assigned to this server." is visible below the h2 heading.

## Test Data

- Use runtime discovery for: customer names
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: any expanded customer card

## Notes

- The paragraph provides context for the license cards that follow
