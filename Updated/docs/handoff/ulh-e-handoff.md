## User & License Hub — Add User Dialog (Batch ULH-E)

### Add User Button, Dialog, Fields, Dropdowns, Validation, Save State, Lifecycle, and Accessibility (ULH-E: SUD-1063 to SUD-1085, 22 plans + 1 lifecycle)

**Verified ULH-E behaviors:**

- **Dialog Shell (10 tests):** Add User button opens dialog (LIMAS-SUD-1063), heading "Add User" h2 (LIMAS-SUD-1064), description "Add a new user to the system" (LIMAS-SUD-1065), Close button dismisses (LIMAS-SUD-1066), Cancel discards fields and closes (LIMAS-SUD-1067), Escape dismisses (LIMAS-SUD-1068), outside-click dismisses (LIMAS-SUD-1069), initial focus on First Name (LIMAS-SUD-1070), focus trap (LIMAS-SUD-1071), content area scrollable (LIMAS-SUD-1072).

- **Fields (8 tests):** First Name with label, *, placeholder, empty (LIMAS-SUD-1073), Last Name (LIMAS-SUD-1074), Email (LIMAS-SUD-1075), Company optional (LIMAS-SUD-1076), Contact Person optional (LIMAS-SUD-1077), Delivery Note optional (LIMAS-SUD-1078), GDPR Comments optional (LIMAS-SUD-1079), User Group required combobox with placeholder (LIMAS-SUD-1080).

- **Validation (3 tests):** Save disabled when all fields empty (LIMAS-SUD-1081), Save disabled when only some required fields filled (LIMAS-SUD-1082), Save enabled when all four required fields provided (LIMAS-SUD-1083).

- **Dropdowns (1 test):** Language has options, English selected by default (LIMAS-SUD-1084). GDPR Consent: Pending (default), Accepted, Exempted. User Group: 137 options, dynamically loaded.

- **Create Lifecycle (1 test, gated):** Mutation safety gate — TEST_ULH_ALLOW_USER_MUTATION=true required (LIMAS-SUD-1085). Create, verify, cleanup in finally block.

**Key findings:**
- Four required fields: First Name *, Last Name *, Email *, User Group *. All four must be filled to enable Save.
- Language defaults to "English" (options: English, German)
- GDPR Consent defaults to "Pending" (options: Pending, Accepted, Exempted)
- 137 user groups available; "Autosar" is a known test-safe group (used in ULH-C group filter)
- Cancel/Close/Escape/outside-click all discard fields and re-open clean
- Save is a disabled `<button>` until all required fields are filled
- **No live Save was performed** — mutation safety gate not configured in .env (no TEST_ULH_ALLOW_USER_MUTATION flag)

**Blocked cases: 1 (LIMAS-SUD-1085).** Gated behind TEST_ULH_ALLOW_USER_MUTATION=true; test.skip used when flag absent.

- **22 plans, 1 grouped spec file (LIMAS-SUD-1063 to LIMAS-SUD-1085); 1 gated (1085), 21 deterministic; not executed**
- **Batch ULH-E status: Complete**

### Test IDs and Descriptions

| Test ID | Atomic Behavior | Plan Path | Script Path | Evidence Source | Profile | Status |
|---------|----------------|-----------|-------------|----------------|---------|--------|
| LIMAS-SUD-1063 | Add User button opens dialog | plans/user-license-hub/LIMAS-SUD-1063-ulh-e-add-user-dialog-opens.md | tests/user-license-hub/user-license-hub-add-user.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1064 | Dialog heading "Add User" h2 | plans/user-license-hub/LIMAS-SUD-1064-ulh-e-add-user-dialog-heading.md | tests/user-license-hub/user-license-hub-add-user.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1065 | Dialog description "Add a new user to the system" | plans/user-license-hub/LIMAS-SUD-1065-ulh-e-add-user-dialog-description.md | tests/user-license-hub/user-license-hub-add-user.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1066 | Close button dismisses dialog | plans/user-license-hub/LIMAS-SUD-1066-ulh-e-add-user-close-dialog.md | tests/user-license-hub/user-license-hub-add-user.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1067 | Cancel discards fields, closes dialog | plans/user-license-hub/LIMAS-SUD-1067-ulh-e-add-user-cancel-dialog.md | tests/user-license-hub/user-license-hub-add-user.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1068 | Escape dismisses dialog | plans/user-license-hub/LIMAS-SUD-1068-ulh-e-add-user-escape-dismisses.md | tests/user-license-hub/user-license-hub-add-user.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1069 | Outside click dismisses dialog | plans/user-license-hub/LIMAS-SUD-1069-ulh-e-add-user-outside-click-dismisses.md | tests/user-license-hub/user-license-hub-add-user.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1070 | Initial focus on First Name | plans/user-license-hub/LIMAS-SUD-1070-ulh-e-add-user-initial-focus.md | tests/user-license-hub/user-license-hub-add-user.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1071 | Focus trap within dialog | plans/user-license-hub/LIMAS-SUD-1071-ulh-e-add-user-focus-trap.md | tests/user-license-hub/user-license-hub-add-user.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1072 | Dialog content area scrollable | plans/user-license-hub/LIMAS-SUD-1072-ulh-e-add-user-dialog-scrollable.md | tests/user-license-hub/user-license-hub-add-user.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1073 | First Name field structure | plans/user-license-hub/LIMAS-SUD-1073-ulh-e-add-user-first-name-field.md | tests/user-license-hub/user-license-hub-add-user.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1074 | Last Name field structure | plans/user-license-hub/LIMAS-SUD-1074-ulh-e-add-user-last-name-field.md | tests/user-license-hub/user-license-hub-add-user.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1075 | Email field structure | plans/user-license-hub/LIMAS-SUD-1075-ulh-e-add-user-email-field.md | tests/user-license-hub/user-license-hub-add-user.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1076 | Company field optional | plans/user-license-hub/LIMAS-SUD-1076-ulh-e-add-user-company-field.md | tests/user-license-hub/user-license-hub-add-user.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1077 | Contact Person field optional | plans/user-license-hub/LIMAS-SUD-1077-ulh-e-add-user-contact-person-field.md | tests/user-license-hub/user-license-hub-add-user.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1078 | Delivery Note field optional | plans/user-license-hub/LIMAS-SUD-1078-ulh-e-add-user-delivery-note-field.md | tests/user-license-hub/user-license-hub-add-user.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1079 | GDPR Comments field optional | plans/user-license-hub/LIMAS-SUD-1079-ulh-e-add-user-gdpr-comments-field.md | tests/user-license-hub/user-license-hub-add-user.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1080 | User Group required combobox with placeholder | plans/user-license-hub/LIMAS-SUD-1080-ulh-e-add-user-user-group-field.md | tests/user-license-hub/user-license-hub-add-user.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1081 | Save disabled initially | plans/user-license-hub/LIMAS-SUD-1081-ulh-e-add-user-save-disabled-initially.md | tests/user-license-hub/user-license-hub-add-user.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1082 | Save disabled with partial required fields | plans/user-license-hub/LIMAS-SUD-1082-ulh-e-add-user-save-disabled-partial.md | tests/user-license-hub/user-license-hub-add-user.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1083 | Save enabled when all four required fields filled | plans/user-license-hub/LIMAS-SUD-1083-ulh-e-add-user-save-enabled-all-required.md | tests/user-license-hub/user-license-hub-add-user.spec.ts | Live MCP | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1084 | Language dropdown options, English default | plans/user-license-hub/LIMAS-SUD-1084-ulh-e-add-user-language-dropdown.md | tests/user-license-hub/user-license-hub-add-user.spec.ts | Live MCP, DOM | SUPER_USER_ADMIN_USER | Not Run |
| LIMAS-SUD-1085 | Create lifecycle gated behind TEST_ULH_ALLOW_USER_MUTATION | plans/user-license-hub/LIMAS-SUD-1085-ulh-e-add-user-create-lifecycle.md | tests/user-license-hub/user-license-hub-add-user.spec.ts | Source-supported, gated | SUPER_USER_ADMIN_USER | Not Run |