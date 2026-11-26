# LIMAS-SUD-2646: Hardware ID field is visible, editable, and pre-filled

**Batch:** SVL-C (Edit Customer Dialog)
**Profile:** SUPER_USER_ADMIN_USER
**Evidence Source:** Live UI observation

## Atomic Behavior
The Hardware ID field is a visible, editable textbox with id="edit-hwid", pre-filled with the customer's current hardware ID.

## Preconditions
- Edit Customer dialog is open on a known customer card (e.g., AATestCustomer with HW ID: testHardwareiD324)

## Steps
1. Open the Edit Customer dialog
2. Locate the Hardware ID field
3. Verify the field is visible and is a textbox
4. Verify the element id is "edit-hwid"
5. Verify the field value matches the hardware ID shown on the card

## Expected
- Textbox has id="edit-hwid"
- Textbox is visible and editable
- Value is pre-filled with the hardware ID (e.g., "testHardwareiD324")

## Observed
- `textbox` with id="edit-hwid" is visible
- Pre-filled with the hardware ID from the card