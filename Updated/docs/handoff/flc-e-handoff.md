## Floating License Configurations — Create Configuration (Batch FLC-E)

### Form Shell, Fields, Validation, Dismissal, Reset, Safe Restoration (FLC-E: SUD-1917 to SUD-1945, 29 tests)

**Verified Floating License Configurations Create Configuration form behavior:**

- **Form Shell & Layout (5 tests):** Create Configuration button opens an **inline panel** (not a dialog) with heading "Create Floating License Configuration" (LIMAS-SUD-1917). Cancel button is in the header area (LIMAS-SUD-1918). No role="dialog" element exists — form renders in the main content area alongside config cards (LIMAS-SUD-1919). All 8 field labels present: User Group, Product Profile, Profile Role, Number of Licenses, Max Checkout Time, Available for Checkout, Expiration Date, Maintenance Date (LIMAS-SUD-1920). Bottom controls: Reset and Save Configuration buttons (LIMAS-SUD-1921).
- **User Group Field (3 tests):** Combobox prepopulated with the currently selected group (LIMAS-SUD-1922). Combobox is editable with many options populated (LIMAS-SUD-1923). "User Group" label visible (LIMAS-SUD-1924).
- **Product Profile Field (3 tests):** Combobox starts with placeholder "Select a profile…" (LIMAS-SUD-1925). Options list is populated with ~70 profiles (LIMAS-SUD-1926). Required indicator (*) shown on label (LIMAS-SUD-1927).
- **Profile Role Field (4 tests):** Combobox starts with placeholder "Select a role…" (LIMAS-SUD-1928). Options list populated (LIMAS-SUD-1929). Selecting a Product Profile cascades/filters the role options (LIMAS-SUD-1930). Required indicator (*) shown (LIMAS-SUD-1931).
- **Number of Licenses (2 tests):** Spinbutton with role="spinbutton" for numeric-only input (LIMAS-SUD-1932). Required indicator (*) on label (LIMAS-SUD-1933).
- **Max Checkout Time (2 tests):** Spinbutton with role="spinbutton" (LIMAS-SUD-1934). Required indicator (*) on label "Max Checkout Time (hours) *" (LIMAS-SUD-1935).
- **Available for Checkout (2 tests):** Available and Unavailable radio buttons present (LIMAS-SUD-1936). Available checked by default, Unavailable unchecked (LIMAS-SUD-1937).
- **Date Fields (2 tests):** Expiration Date and Maintenance Date textboxes present (LIMAS-SUD-1938). Date fields are NOT marked with required asterisk (LIMAS-SUD-1939).
- **Save State (2 tests):** Save Configuration is disabled when required fields are empty (LIMAS-SUD-1940). Save Configuration becomes enabled after filling Product Profile, Profile Role, Number of Licenses, and Max Checkout Time (LIMAS-SUD-1941). **Save is never clicked; form data is never submitted.**
- **Dismissal (2 tests):** Cancel button closes the form and re-enables Create Configuration button (LIMAS-SUD-1942). Escape key also dismisses the form (LIMAS-SUD-1943).
- **Reset (1 test):** Reset button restores all fields to initial defaults — Product Profile returns to placeholder, Unavailable reverts to Available (LIMAS-SUD-1944).
- **Safe Restoration (1 test):** After closing the form via Cancel, heading and user group summary are visible, Create Configuration button is enabled (LIMAS-SUD-1945).

**Key design decisions:**
- Create form is an **inline panel** (not a modal dialog) — it renders below the toolbar in the main content area, alongside the configuration cards.
- Create Configuration button becomes **disabled** when the form is open.
- **4 required fields**: Product Profile, Profile Role, Number of Licenses, Max Checkout Time — all marked with asterisk (*).
- User Group is prepopulated but editable, Expiration Date and Maintenance Date are optional.
- Profile Role combobox options appear to populate after Product Profile selection (cascading dependency).
- Save Configuration is initially disabled; enables only after required fields are filled.
- Reset restores form to pristine state; Cancel dismisses the form.
- Save Configuration is **never clicked** in tests — only inspection and state behavior are verified.

**Blocked cases: 0.**

**- 29 plans, 1 grouped spec, 1 extended Page Object (LIMAS-SUD-1917 to LIMAS-SUD-1945); 0 blocked; not executed**
**- Batch FLC-E status: Complete**

### Test IDs and Descriptions

| Test ID | Atomic Behavior | Plan Path | Script Path | Evidence Source | Profile | Status |
|---------|----------------|-----------|-------------|----------------|---------|--------|
| LIMAS-SUD-1917 | Create Configuration button opens inline form with heading | plans/floating-license-configurations/LIMAS-SUD-1917-flc-e-create-form-heading.md | tests/floating-license-configurations/floating-license-configurations-create.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1918 | Create form has Cancel button in header area | plans/floating-license-configurations/LIMAS-SUD-1918-flc-e-create-form-cancel-button.md | tests/floating-license-configurations/floating-license-configurations-create.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1919 | Create form is inline panel, not modal dialog | plans/floating-license-configurations/LIMAS-SUD-1919-flc-e-create-form-inline-not-dialog.md | tests/floating-license-configurations/floating-license-configurations-create.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1920 | All top-level field labels visible | plans/floating-license-configurations/LIMAS-SUD-1920-flc-e-create-form-field-labels.md | tests/floating-license-configurations/floating-license-configurations-create.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1921 | Reset and Save Configuration buttons present | plans/floating-license-configurations/LIMAS-SUD-1921-flc-e-create-form-bottom-controls.md | tests/floating-license-configurations/floating-license-configurations-create.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1922 | User Group prepopulated with selected group | plans/floating-license-configurations/LIMAS-SUD-1922-flc-e-user-group-prepopulated.md | tests/floating-license-configurations/floating-license-configurations-create.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1923 | User Group combobox editable with options | plans/floating-license-configurations/LIMAS-SUD-1923-flc-e-user-group-editable-options.md | tests/floating-license-configurations/floating-license-configurations-create.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1924 | User Group label visible | plans/floating-license-configurations/LIMAS-SUD-1924-flc-e-user-group-label.md | tests/floating-license-configurations/floating-license-configurations-create.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1925 | Product Profile placeholder "Select a profile…" | plans/floating-license-configurations/LIMAS-SUD-1925-flc-e-product-profile-placeholder.md | tests/floating-license-configurations/floating-license-configurations-create.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1926 | Product Profile options populated | plans/floating-license-configurations/LIMAS-SUD-1926-flc-e-product-profile-options-populated.md | tests/floating-license-configurations/floating-license-configurations-create.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1927 | Product Profile required indicator (*) | plans/floating-license-configurations/LIMAS-SUD-1927-flc-e-product-profile-required.md | tests/floating-license-configurations/floating-license-configurations-create.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1928 | Profile Role placeholder "Select a role…" | plans/floating-license-configurations/LIMAS-SUD-1928-flc-e-profile-role-placeholder.md | tests/floating-license-configurations/floating-license-configurations-create.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1929 | Profile Role options populated | plans/floating-license-configurations/LIMAS-SUD-1929-flc-e-profile-role-options-populated.md | tests/floating-license-configurations/floating-license-configurations-create.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1930 | Profile Role cascades from Product Profile selection | plans/floating-license-configurations/LIMAS-SUD-1930-flc-e-profile-role-cascade.md | tests/floating-license-configurations/floating-license-configurations-create.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1931 | Profile Role required indicator (*) | plans/floating-license-configurations/LIMAS-SUD-1931-flc-e-profile-role-required.md | tests/floating-license-configurations/floating-license-configurations-create.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1932 | Number of Licenses role="spinbutton" | plans/floating-license-configurations/LIMAS-SUD-1932-flc-e-licenses-spinbutton.md | tests/floating-license-configurations/floating-license-configurations-create.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1933 | Number of Licenses required indicator (*) | plans/floating-license-configurations/LIMAS-SUD-1933-flc-e-licenses-required.md | tests/floating-license-configurations/floating-license-configurations-create.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1934 | Max Checkout Time role="spinbutton" | plans/floating-license-configurations/LIMAS-SUD-1934-flc-e-max-checkout-spinbutton.md | tests/floating-license-configurations/floating-license-configurations-create.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1935 | Max Checkout Time required indicator (*) | plans/floating-license-configurations/LIMAS-SUD-1935-flc-e-max-checkout-required.md | tests/floating-license-configurations/floating-license-configurations-create.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1936 | Available/Unavailable radio buttons present | plans/floating-license-configurations/LIMAS-SUD-1936-flc-e-availability-radios.md | tests/floating-license-configurations/floating-license-configurations-create.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1937 | Available checked by default | plans/floating-license-configurations/LIMAS-SUD-1937-flc-e-availability-default-available.md | tests/floating-license-configurations/floating-license-configurations-create.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1938 | Expiration and Maintenance Date textboxes present | plans/floating-license-configurations/LIMAS-SUD-1938-flc-e-date-textboxes.md | tests/floating-license-configurations/floating-license-configurations-create.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1939 | Date fields not marked required | plans/floating-license-configurations/LIMAS-SUD-1939-flc-e-date-fields-not-required.md | tests/floating-license-configurations/floating-license-configurations-create.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1940 | Save disabled when required fields empty | plans/floating-license-configurations/LIMAS-SUD-1940-flc-e-save-disabled-initial.md | tests/floating-license-configurations/floating-license-configurations-create.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1941 | Save enabled after required fields filled | plans/floating-license-configurations/LIMAS-SUD-1941-flc-e-save-enabled-required-filled.md | tests/floating-license-configurations/floating-license-configurations-create.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1942 | Cancel closes form, restores Create button | plans/floating-license-configurations/LIMAS-SUD-1942-flc-e-cancel-closes-form.md | tests/floating-license-configurations/floating-license-configurations-create.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1943 | Escape key dismisses form | plans/floating-license-configurations/LIMAS-SUD-1943-flc-e-escape-closes-form.md | tests/floating-license-configurations/floating-license-configurations-create.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1944 | Reset restores defaults | plans/floating-license-configurations/LIMAS-SUD-1944-flc-e-reset-restores-defaults.md | tests/floating-license-configurations/floating-license-configurations-create.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1945 | Full restore to clean state after form closure | plans/floating-license-configurations/LIMAS-SUD-1945-flc-e-safe-restoration.md | tests/floating-license-configurations/floating-license-configurations-create.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |