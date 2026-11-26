## Floating License Configurations — Edit Configuration (Batch FLC-G)

### Form Shell, Prepopulation, Editable Fields, Validation, Reset & Dismissal, Gated Lifecycle, Safe Restoration (FLC-G: SUD-1968 to SUD-1992, 25 tests)

**Verified Floating License Configurations Edit form behavior:**

- **Form Shell (3 tests):** Edit menu item opens inline form with "Edit Floating License Configuration" heading (LIMAS-SUD-1968). Form is an inline panel, not a dialog (LIMAS-SUD-1969). Cancel, Reset, and Save Configuration controls visible (LIMAS-SUD-1970).
- **Field Prepoulation (7 tests):** All 8 fields are prepopulated from current configuration: Product Profile (LIMAS-SUD-1971), Profile Role (LIMAS-SUD-1972), Number of Licenses (LIMAS-SUD-1973), Max Checkout Time (LIMAS-SUD-1974), Availability radio (LIMAS-SUD-1975), Expiration Date (LIMAS-SUD-1976), Maintenance Date (LIMAS-SUD-1977).
- **Disabled Fields (1 test):** User Group combobox is disabled — it cannot be changed during edit (LIMAS-SUD-1978). Confirmed via live UI inspection: `[disabled]` attribute on the combobox.
- **Editable Fields (5 tests):** Profile Role can be changed (LIMAS-SUD-1979), Number of Licenses accepts new values (LIMAS-SUD-1980), Max Checkout Time accepts new values (LIMAS-SUD-1981), Availability can be toggled (LIMAS-SUD-1982), Expiration Date can be changed (LIMAS-SUD-1983). **No Save clicked.**
- **Numeric Validation (2 tests):** Number of Licenses accepts positive integers like 10 (LIMAS-SUD-1984). Zero is also valid and Save remains not disabled (LIMAS-SUD-1985).
- **Save State (2 tests):** Save is enabled on initial form load (clean form with all required fields prepopulated) (LIMAS-SUD-1986). Save stays enabled after one valid field change (LIMAS-SUD-1987). **Save is never clicked during inspection tests.**
- **Reset & Dismissal (3 tests):** Reset restores original persisted values after editing (LIMAS-SUD-1988). Cancel discards changes and closes the form (LIMAS-SUD-1989). Reopening Edit after Cancel shows persisted values from the database, not the discarded changes (LIMAS-SUD-1990).
- **Gated Lifecycle (1 test):** Full create-edit-delete lifecycle guarded by `TEST_FLC_ALLOW_MUTATION` and `TEST_FLC_ALLOW_DELETE` flags — skipped when flags are absent (LIMAS-SUD-1991).
- **Safe Restoration (1 test):** After closing Edit, config list returns to clean state (LIMAS-SUD-1992).

**Key design decisions:**
- Edit form is structurally identical to Create form but with all fields prepopulated and User Group disabled.
- Product Profile is editable, and changing it cascades / filters the Profile Role options.
- Profile Role options are filtered to the selected product's valid roles (confirmed: DatabaseDesigner shows 8 roles vs. full list in Create).
- Save Configuration is enabled by default (unlike Create where it starts disabled) — form is "clean" on open.
- Reset restores to original persisted values; Cancel discards without saving.
- Date fields use ISO format (e.g., "2099-12-31").
- 189 console errors present during form load (React rendering, non-test-blocking).

**Blocked cases: 0.**

**- 25 plans, 1 grouped spec, 1 extended Page Object (LIMAS-SUD-1968 to LIMAS-SUD-1992); 0 blocked; not executed**
**- Batch FLC-G status: Complete**

### Test IDs and Descriptions

| Test ID | Atomic Behavior | Plan Path | Script Path | Evidence Source | Profile | Status |
|---------|----------------|-----------|-------------|----------------|---------|--------|
| LIMAS-SUD-1968 | Edit opens inline form with heading | plans/floating-license-configurations/LIMAS-SUD-1968-flc-g-edit-form-heading.md | tests/floating-license-configurations/floating-license-configurations-edit.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1969 | Edit form is inline, not dialog | plans/floating-license-configurations/LIMAS-SUD-1969-flc-g-edit-inline-not-dialog.md | tests/floating-license-configurations/floating-license-configurations-edit.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1970 | Edit has Cancel, Reset, Save controls | plans/floating-license-configurations/LIMAS-SUD-1970-flc-g-edit-controls.md | tests/floating-license-configurations/floating-license-configurations-edit.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1971 | Product Profile prepopulated | plans/floating-license-configurations/LIMAS-SUD-1971-flc-g-edit-product-profile-prepop.md | tests/floating-license-configurations/floating-license-configurations-edit.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1972 | Profile Role prepopulated | plans/floating-license-configurations/LIMAS-SUD-1972-flc-g-edit-profile-role-prepop.md | tests/floating-license-configurations/floating-license-configurations-edit.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1973 | Number of Licenses prepopulated | plans/floating-license-configurations/LIMAS-SUD-1973-flc-g-edit-licenses-prepop.md | tests/floating-license-configurations/floating-license-configurations-edit.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1974 | Max Checkout Time prepopulated | plans/floating-license-configurations/LIMAS-SUD-1974-flc-g-edit-max-checkout-prepop.md | tests/floating-license-configurations/floating-license-configurations-edit.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1975 | Availability radio prepopulated | plans/floating-license-configurations/LIMAS-SUD-1975-flc-g-edit-availability-prepop.md | tests/floating-license-configurations/floating-license-configurations-edit.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1976 | Expiration Date prepopulated | plans/floating-license-configurations/LIMAS-SUD-1976-flc-g-edit-expiration-prepop.md | tests/floating-license-configurations/floating-license-configurations-edit.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1977 | Maintenance Date prepopulated | plans/floating-license-configurations/LIMAS-SUD-1977-flc-g-edit-maintenance-prepop.md | tests/floating-license-configurations/floating-license-configurations-edit.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1978 | User Group disabled | plans/floating-license-configurations/LIMAS-SUD-1978-flc-g-edit-user-group-disabled.md | tests/floating-license-configurations/floating-license-configurations-edit.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1979 | Profile Role changeable | plans/floating-license-configurations/LIMAS-SUD-1979-flc-g-edit-profile-role-change.md | tests/floating-license-configurations/floating-license-configurations-edit.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1980 | Licenses changeable | plans/floating-license-configurations/LIMAS-SUD-1980-flc-g-edit-licenses-change.md | tests/floating-license-configurations/floating-license-configurations-edit.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1981 | Max Checkout changeable | plans/floating-license-configurations/LIMAS-SUD-1981-flc-g-edit-max-checkout-change.md | tests/floating-license-configurations/floating-license-configurations-edit.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1982 | Availability toggleable | plans/floating-license-configurations/LIMAS-SUD-1982-flc-g-edit-availability-toggle.md | tests/floating-license-configurations/floating-license-configurations-edit.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1983 | Expiration Date changeable | plans/floating-license-configurations/LIMAS-SUD-1983-flc-g-edit-expiration-change.md | tests/floating-license-configurations/floating-license-configurations-edit.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1984 | Licenses accepts positive integer | plans/floating-license-configurations/LIMAS-SUD-1984-flc-g-edit-licenses-positive-int.md | tests/floating-license-configurations/floating-license-configurations-edit.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1985 | Zero licenses valid | plans/floating-license-configurations/LIMAS-SUD-1985-flc-g-edit-licenses-zero-valid.md | tests/floating-license-configurations/floating-license-configurations-edit.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1986 | Save enabled initially | plans/floating-license-configurations/LIMAS-SUD-1986-flc-g-edit-save-enabled-initial.md | tests/floating-license-configurations/floating-license-configurations-edit.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1987 | Save enabled after change | plans/floating-license-configurations/LIMAS-SUD-1987-flc-g-edit-save-after-change.md | tests/floating-license-configurations/floating-license-configurations-edit.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1988 | Reset restores original values | plans/floating-license-configurations/LIMAS-SUD-1988-flc-g-edit-reset-restores.md | tests/floating-license-configurations/floating-license-configurations-edit.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1989 | Cancel discards changes | plans/floating-license-configurations/LIMAS-SUD-1989-flc-g-edit-cancel-discards.md | tests/floating-license-configurations/floating-license-configurations-edit.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1990 | Reopen shows persisted values | plans/floating-license-configurations/LIMAS-SUD-1990-flc-g-edit-reopen-persisted.md | tests/floating-license-configurations/floating-license-configurations-edit.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1991 | Gated create-edit lifecycle | plans/floating-license-configurations/LIMAS-SUD-1991-flc-g-edit-gated-lifecycle.md | tests/floating-license-configurations/floating-license-configurations-edit.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1992 | Safe restoration after Edit | plans/floating-license-configurations/LIMAS-SUD-1992-flc-g-edit-safe-restoration.md | tests/floating-license-configurations/floating-license-configurations-edit.spec.ts | Live UI observation | SUPER_USER_ADMIN_USER | Not Run |