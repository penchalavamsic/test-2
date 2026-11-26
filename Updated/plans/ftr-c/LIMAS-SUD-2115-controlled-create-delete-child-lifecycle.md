# LIMAS-SUD-2115: Create and delete a child under an owned parent feature

Create uniquely named disposable records through the UI, using unique Feature IDs. Verify persisted names, descriptions, versions and access levels after reload. Create the parent first; attach the child only to that owned parent and verify its persisted parent ID. Delete the child before the parent. Delete only owned features; require a successful response and absence after a fresh server listing and in the UI.

No existing feature is required for the owned lifecycle. Unset flags and missing fixture implementations are not skip reasons. HTTP, persistence, and cleanup errors remain failures. Never repeat a failed delete automatically.
