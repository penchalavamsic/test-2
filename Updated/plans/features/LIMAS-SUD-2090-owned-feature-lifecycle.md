# LIMAS-SUD-2090: Create a disposable root feature and verify deletion after reload

Create uniquely named disposable records through the UI, using unique Feature IDs. Verify persisted names, descriptions, versions and access levels after reload. Delete only owned features; require a successful response and absence after a fresh server listing and in the UI.

No existing feature is required for the owned lifecycle. Unset flags and missing fixture implementations are not skip reasons. HTTP, persistence, and cleanup errors remain failures. Never repeat a failed delete automatically.
