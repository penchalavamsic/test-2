# LIMAS-SUD-2645: Customer name field is visible, editable, and pre-filled

**Batch:** SVL-C (Edit Customer Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
The Customer name field is a visible, editable textbox with id="edit-cust-name", pre-filled with the customer's current name.

## Preconditions
- Edit Customer dialog is open on a known customer card (e.g., AATestCustomer)

## Steps
1. Open the Edit Customer dialog
2. Locate the Customer name field
3. Verify the field is visible and is a textbox
4. Verify the element id is "edit-cust-name"
5. Verify the field value matches the customer name shown on the card

## Expected
- Textbox has id="edit-cust-name"
- Textbox is visible and editable
- Value is pre-filled with the customer name (e.g., "AATestCustomer")

## Observed
- `textbox` with id="edit-cust-name" is visible
- Pre-filled with the customer name from the card