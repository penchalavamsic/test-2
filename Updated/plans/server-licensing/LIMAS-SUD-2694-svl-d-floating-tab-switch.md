# Test Plan: LIMAS-SUD-2694 — SVL-D: Floating Tab Switch

## Metadata

- **Test ID:** LIMAS-SUD-2694
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** Clicking the Floating tab switches the view to Floating license content, showing a "Create Floating License" button instead of "Create Standard License".

## Scope

Verify tab switching behavior: activating the Floating tab replaces the Standard license view with the Floating license view, and the action button changes from "Create Standard License" to "Create Floating License".

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card is expanded with Standard tab active

## Test Steps

1. Expand a customer card (Standard tab is active by default)
2. Note the presence of "Create Standard License" button
3. Click the "Floating" tab
4. Assert the Floating tab is now in the selected/active state
5. Assert Floating license content is visible (heading, cards, or empty state)
6. Assert the action button now shows "Create Floating License" instead of "Create Standard License"

## Expected Result

The Floating tab becomes active, Floating license content replaces Standard content, and the create button switches to "Create Floating License".

## Test Data

- Use runtime discovery for: customer names, Floating count, button labels
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: any expanded customer card

## Notes

- Switching back to Standard tab should restore Standard content and button
