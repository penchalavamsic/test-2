## User & License Hub — Edit User Dialog (Batch ULH-F)

### Edit Button, Dialog, Prepopulation, Fields, Validation, Dropdowns, Save State, Lifecycle, and Accessibility (ULH-F: SUD-1086 to SUD-1111, 26 tests)

**Verified ULH-F behaviors:**

- **Dialog Shell (8 tests):** Edit button opens dialog for correct user (LIMAS-SUD-1086), heading "Edit User" h2, description "Edit user details" (LIMAS-SUD-1087), Close dismisses (LIMAS-SUD-1088), Cancel discards changes (LIMAS-SUD-1089), Escape dismisses (LIMAS-SUD-1090), outside-click dismisses (LIMAS-SUD-1091), initial focus on First Name (LIMAS-SUD-1092), focus trap (LIMAS-SUD-1093).

- **Prepopulation (2 tests):** First Name prepopulated with selected user value (LIMAS-SUD-1094), all fields (FN, LN, Email) match the selected user's runtime data (LIMAS-SUD-1095).

- **Fields (6 tests):** First Name label, required, editable (LIMAS-SUD-1096), Last Name (LIMAS-SUD-1097), Email (LIMAS-SUD-1098), Company optional (LIMAS-SUD-1099), Contact Person optional (LIMAS-SUD-1100), User Group required combobox prepopulated (LIMAS-SUD-1101).

- **Save State (1 test):** Save is ENABLED when Edit dialog opens with valid prepopulated data (LIMAS-SUD-1102).

- **Validation (2 tests):** Clear First Name (LIMAS-SUD-1103), clear each required field triggers validation (LIMAS-SUD-1104).

- **Dropdowns (3 tests):** Language options with current value (LIMAS-SUD-1105), GDPR Consent options with current value (LIMAS-SUD-1106), User Group options with prepopulated value (LIMAS-SUD-1107).

- **Update Lifecycle (1 test, gated):** Mutation safety gate — TEST_ULH_ALLOW_USER_MUTATION=true required (LIMAS-SUD-1108).

- **Accessibility (2 tests):** Edit button has no accessible name (icon-only, LIMAS-SUD-1109), dialog role="dialog" with aria-label "Edit User" (LIMAS-SUD-1110).

- **API Contract (1 test, gated):** Update endpoint verified through source/safe observation (LIMAS-SUD-1111).

**Key findings:**
- Edit button is a bare `<button>` with only an SVG icon — no accessible name (no aria-label, no text, no title)
- Dialog opens with all fields prepopulated from the selected user's data
- Save is ENABLED immediately on open (not disabled like Add User)
- Save is NOT tied to dirty-state detection — it stays enabled even after Cancel/restore
- Cancel discards changes; reopening shows original persisted values
- Same four required fields as Add User: First Name, Last Name, Email, User Group
- Language default: "English" (options: English, German)
- GDPR Consent: "Pending", "Accepted", "Exempted"
- **No live Save was performed** — mutation safety gate not configured

**Blocked/gated cases: 2 (LIMAS-SUD-1108, LIMAS-SUD-1111).** Gated behind TEST_ULH_ALLOW_USER_MUTATION=true.

- **26 plans, 1 grouped spec file (LIMAS-SUD-1086 to LIMAS-SUD-1111); 2 gated, 24 deterministic; not executed**
- **Batch ULH-F status: Complete**

### Test IDs and Descriptions

| Test ID | Atomic Behavior | Plan Path | Script Path | Evidence Source | Profile | Status |
|---------|----------------|-----------|-------------|----------------|---------|--------|
| LIMAS-SUD-1086 | Edit button opens dialog for correct user | plans/user-license-hub/LIMAS-SUD-1086-ulh-f-edit-button-opens-dialog.md | tests/user-license-hub/user-license-hub-edit-user.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1087 | Dialog heading "Edit User" and description | plans/user-license-hub/LIMAS-SUD-1087-ulh-f-edit-dialog-heading-description.md | tests/user-license-hub/user-license-hub-edit-user.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1088 | Close button dismisses dialog | plans/user-license-hub/LIMAS-SUD-1088-ulh-f-edit-close-dismisses.md | tests/user-license-hub/user-license-hub-edit-user.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1089 | Cancel discards changes, original values persist | plans/user-license-hub/LIMAS-SUD-1089-ulh-f-edit-cancel-discards.md | tests/user-license-hub/user-license-hub-edit-user.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1090 | Escape dismisses dialog | plans/user-license-hub/LIMAS-SUD-1090-ulh-f-edit-escape-dismisses.md | tests/user-license-hub/user-license-hub-edit-user.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1091 | Outside click dismisses dialog | plans/user-license-hub/LIMAS-SUD-1091-ulh-f-edit-outside-click-dismisses.md | tests/user-license-hub/user-license-hub-edit-user.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1092 | Initial focus on First Name | plans/user-license-hub/LIMAS-SUD-1092-ulh-f-edit-initial-focus.md | tests/user-license-hub/user-license-hub-edit-user.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1093 | Focus trap within dialog | plans/user-license-hub/LIMAS-SUD-1093-ulh-f-edit-focus-trap.md | tests/user-license-hub/user-license-hub-edit-user.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1094 | First Name prepopulated with selected user value | plans/user-license-hub/LIMAS-SUD-1094-ulh-f-edit-prepopulated-first-name.md | tests/user-license-hub/user-license-hub-edit-user.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1095 | All fields prepopulated matching selected user | plans/user-license-hub/LIMAS-SUD-1095-ulh-f-edit-prepopulated-all-fields.md | tests/user-license-hub/user-license-hub-edit-user.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1096 | First Name field structure | plans/user-license-hub/LIMAS-SUD-1096-ulh-f-edit-first-name-field.md | tests/user-license-hub/user-license-hub-edit-user.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1097 | Last Name field structure | plans/user-license-hub/LIMAS-SUD-1097-ulh-f-edit-last-name-field.md | tests/user-license-hub/user-license-hub-edit-user.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1098 | Email field structure | plans/user-license-hub/LIMAS-SUD-1098-ulh-f-edit-email-field.md | tests/user-license-hub/user-license-hub-edit-user.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1099 | Company field optional | plans/user-license-hub/LIMAS-SUD-1099-ulh-f-edit-company-field.md | tests/user-license-hub/user-license-hub-edit-user.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1100 | Contact Person field optional | plans/user-license-hub/LIMAS-SUD-1100-ulh-f-edit-contact-person-field.md | tests/user-license-hub/user-license-hub-edit-user.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1101 | User Group required combobox prepopulated | plans/user-license-hub/LIMAS-SUD-1101-ulh-f-edit-user-group-field.md | tests/user-license-hub/user-license-hub-edit-user.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1102 | Save initially enabled on open | plans/user-license-hub/LIMAS-SUD-1102-ulh-f-edit-save-initially-enabled.md | tests/user-license-hub/user-license-hub-edit-user.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1103 | Clear First Name validation | plans/user-license-hub/LIMAS-SUD-1103-ulh-f-edit-clear-first-name-validation.md | tests/user-license-hub/user-license-hub-edit-user.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1104 | Clear each required field validation | plans/user-license-hub/LIMAS-SUD-1104-ulh-f-edit-required-field-clear-all.md | tests/user-license-hub/user-license-hub-edit-user.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1105 | Language dropdown options and current value | plans/user-license-hub/LIMAS-SUD-1105-ulh-f-edit-language-dropdown.md | tests/user-license-hub/user-license-hub-edit-user.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1106 | GDPR Consent dropdown options and current value | plans/user-license-hub/LIMAS-SUD-1106-ulh-f-edit-gdpr-dropdown.md | tests/user-license-hub/user-license-hub-edit-user.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1107 | User Group dropdown options and prepopulated value | plans/user-license-hub/LIMAS-SUD-1107-ulh-f-edit-user-group-dropdown.md | tests/user-license-hub/user-license-hub-edit-user.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1108 | Update lifecycle gated behind TEST_ULH_ALLOW_USER_MUTATION | plans/user-license-hub/LIMAS-SUD-1108-ulh-f-edit-update-lifecycle.md | tests/user-license-hub/user-license-hub-edit-user.spec.ts | Source-supported, gated | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1109 | Edit button has no accessible name (icon-only) | plans/user-license-hub/LIMAS-SUD-1109-ulh-f-edit-button-accessible-name.md | tests/user-license-hub/user-license-hub-edit-user.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1110 | Dialog role, accessible name, description | plans/user-license-hub/LIMAS-SUD-1110-ulh-f-edit-dialog-a11y.md | tests/user-license-hub/user-license-hub-edit-user.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1111 | Update API contract — source-verified, gated | plans/user-license-hub/LIMAS-SUD-1111-ulh-f-edit-api-contract.md | tests/user-license-hub/user-license-hub-edit-user.spec.ts | Source-supported, gated | SUPER_USER_ADMIN_USER | Not Run |