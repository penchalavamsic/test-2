# LIMAS-SUD-1121: Owned user deletion succeeds and persists

Create a uniquely named disposable user with a reserved example.invalid email and an available live User Group. Verify its fields after reload. Delete only the created user through its scoped card button. Require a successful response for that exact ID, automatic card removal, and a fresh server search with zero matching users plus the correct empty UI. No business user is edited or deleted.

Skip only for no assignable User Group. Do not retry failed mutations. HTTP or cleanup errors remain failures.
