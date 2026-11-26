# Test Plan: LIMAS-SUD-2723 — SVL-E: Floating Section Heading

## Metadata

- **Test ID:** LIMAS-SUD-2723
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The h2 heading "Standard Licenses" is visible within the expanded customer card, above the Standard/Floating tabs.

## Scope

Verify that the section heading "Standard Licenses" (h2) is visible and serves as a shared heading for both Standard and Floating license sections. This heading appears above the tab bar and labels the entire license area.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card is expanded

## Test Steps

1. Expand a customer card
2. Locate the heading element with text "Standard Licenses"
3. Assert the heading level is h2 (level 2)
4. Assert the heading is visible and positioned above the Standard/Floating tab bar

## Expected Result

An h2 heading "Standard Licenses" is visible above the tab bar inside the expanded customer card.

## Test Data

- Use runtime discovery for: customer names, heading text
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: any expanded customer card

## Notes

- This heading is shared between Standard and Floating tabs; it does not change when tabs switch