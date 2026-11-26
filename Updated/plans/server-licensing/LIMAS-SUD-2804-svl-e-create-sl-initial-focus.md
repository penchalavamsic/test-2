# Test Plan: LIMAS-SUD-2804 — SVL-E: Create SL Initial Focus

## Metadata

- **Test ID:** LIMAS-SUD-2804
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** When the Create Standard License form opens, keyboard focus lands on the first field within the form.

## Scope

Verify that focus management places the user on an interactive element inside the Create Standard License form when it opens, rather than leaving focus on the trigger button or at the top of the page.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Create Standard License form has just been opened

## Test Steps

1. Click the "Create Standard License" button
2. After the form appears, query the active element
3. Assert the active element is within the form region
4. Assert the active element is an interactive control (textbox, spinbutton, or combobox)

## Expected Result

Focus lands on the first field inside the Create Standard License form — typically the Product Profile combobox or Licenses spinbutton.

## Test Data

- Use runtime discovery for: focused element, form structure
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: Create Standard License form open

## Notes

- Discover the actual focused element at runtime — do not assume a specific field id
- Focus should be inside the form, not on the trigger button
- Since there is no Group field, the first field may be Product Profile