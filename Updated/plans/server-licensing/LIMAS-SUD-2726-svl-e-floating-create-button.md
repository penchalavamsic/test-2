# Test Plan: LIMAS-SUD-2726 — SVL-E: Floating Create Button

## Metadata

- **Test ID:** LIMAS-SUD-2726
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The "Create Floating License" button is visible beside the tabs when the Floating tab is active.

## Scope

Verify that the "Create Floating License" button is visible and positioned near the tab bar when the Floating tab is selected. This button is the entry point for creating new Floating licenses.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded
- Floating tab is active

## Test Steps

1. Expand a customer card
2. Click the Floating tab to activate it
3. Locate the action button area near the tabs
4. Assert a button with label "Create Floating License" is visible
5. Assert the button is not hidden or disabled (visibility check only)

## Expected Result

The "Create Floating License" button is visible near the tab bar when the Floating tab is active.

## Test Data

- Use runtime discovery for: button labels, positioning
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: any expanded customer card with Floating tab active

## Notes

- This is a structural presence test — do not click the button