# Test Plan: LIMAS-SUD-2681 — SVL-D: Delete Customer Warning Text

## Metadata

- **Test ID:** LIMAS-SUD-2681
- **Test Suite:** Server License Management SVL-D
- **Module:** Server License Management SVL-D
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The confirmation dialog contains warning text describing the permanent deletion consequences.

## Scope

Verify that the Delete Customer confirmation dialog includes copy that warns the user about the irreversible nature of the deletion. This text must be visible and accessible.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Delete Customer confirmation dialog is open

## Test Steps

1. Open the Delete Customer confirmation dialog for a customer with zero licenses
2. Locate descriptive text within the dialog body (not heading, not button labels)
3. Assert the text mentions permanent deletion or irreversibility

## Expected Result

Warning text in the dialog body communicates that deletion is permanent and cannot be undone.

## Test Data

- Use runtime discovery for: warning text content
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: any customer with zero Standard and zero Floating licenses

## Notes

- Exact wording is discovered at runtime; the requirement is that a warning exists
