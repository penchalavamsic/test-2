# LIMAS-SUD-1085: Create a disposable Hub user, verify persisted fields, and delete it

Category: CRUD / persistence

Use a unique test name and reserved example.invalid email. Select an available User Group from the live scope. Create through Add User and verify fresh email-filtered server results plus reopened Edit fields. Delete only this owned user using the UI. Verify absence after a fresh server search and in the UI.

Skip only if no assignable User Group exists on this run. No existing business user is required. Mutation flags and missing implementations are not skip reasons. API errors, persistence mismatches, and cleanup failures fail the test. Never retry a failed mutation automatically.
