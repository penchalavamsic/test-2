# Test Plan: LIMAS-SUD-2797 — SVL-E: Create SL No Checkout Fields

## Metadata

- **Test ID:** LIMAS-SUD-2797
- **Test Suite:** Server License Management SVL-E
- **Module:** Server License Management SVL-E
- **Priority:** P1
- **Type:** Read-only
- **Profile:** SUPER_USER_ADMIN_USER
- **Status:** Not Started
- **Atomic Behavior:** The Create Standard License form does not contain Default Checkout, Checkout Times, or Available for Checkout fields. These fields only appear in the Create Floating License form.

## Scope

Verify that checkout-related fields (Default Checkout, Checkout Times, Available for Checkout) are absent from the Create Standard License form. Standard licenses do not support the checkout/workstation-sharing concept that floating licenses do.

## Preconditions

- Authenticated as SUPER_USER_ADMIN_USER
- Navigated to /server-licensing
- Customer card expanded, Standard tab active
- Create Standard License form is open

## Test Steps

1. Open the Create Standard License form
2. Enumerate all labeled fields within the form
3. Assert no field has accessible name containing "Checkout" (e.g., "Default Checkout", "Checkout Times", "Available for Checkout")
4. Assert no spinbutton, textbox, or combobox related to checkout functionality is present

## Expected Result

No checkout-related fields (Default Checkout, Checkout Times, Available for Checkout) are present in the Create Standard License form.

## Test Data

- Use runtime discovery for: field labels, absence of checkout-related fields
- Do not hardcode: ["NO_HARDCODED_VALUES"]
- Required data: Create Standard License form open

## Notes

- Checkout fields exist in Create Floating License but not in Create Standard License
- This reflects the different license models: Standard licenses are seat-based, Floating licenses are pool-based with checkout controls