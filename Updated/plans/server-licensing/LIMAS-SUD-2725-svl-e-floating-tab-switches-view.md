# Test Plan: LIMAS-SUD-2725 — SVL-E: Floating Tab Switches View

## Metadata

- **Test ID:** LIMAS-SUD-2725
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Clicking the Floating tab switches the content area to display Floating license content, including a "Create Floating License" button instead of "Create Standard License".

## Scope

Verify that activating the Floating tab replaces the Standard license view with the Floating license view. The action button must change from "Create Standard License" to "Create Floating License".

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card is expanded with Standard tab active

## Test Steps

1. Expand a customer card (Standard tab is active by default)
2. Note the presence of "Create Standard License" button
3. Click the "Floating" tab
4. Assert the Floating tab is now in the selected/active state
5. Assert Floating license content is visible (cards or empty state)
6. Assert the "Create Floating License" button is visible
7. Assert the "Create Standard License" button is no longer visible

## Expected Result

The Floating tab becomes active, Floating license content replaces Standard content, and the create button switches to "Create Floating License".

## Test Data

- Use runtime discovery for: customer names, button labels, Floating count
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: any expanded customer card

## Notes

- Switching back to the Standard tab should restore Standard content and button