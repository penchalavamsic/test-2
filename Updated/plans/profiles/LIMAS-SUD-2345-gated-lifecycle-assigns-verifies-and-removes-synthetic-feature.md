# LIMAS-SUD-2345: Profile feature association lifecycle

Category: CRUD / persistence

1. Create a uniquely named disposable Profile and a role through the UI. Verify both after reload.
2. Select an available root feature from the live catalog. Save the association and verify it after reload.
3. Remove the association, save, and verify it is absent after reload.
4. Delete the owned role and Profile; verify cleanup.

Only skip when the current feature catalog has no assignable root feature. Missing test fixtures and unset mutation flags are not skip reasons. Failed requests and cleanup remain failures. Existing catalog features are not edited or deleted.
