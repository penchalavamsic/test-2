# LIMAS-SUD-1229: Create a license on a disposable Hub user and verify persistence

Create a disposable Hub user, select an available scoped Profile/role, and create a license with a unique Hardware ID and future dates. The deployed Save updates the user through PUT /users. Verify exact owned Hardware ID, Profile, role, dates, and no duplicate after reload. Delete that exact license through its card, verify absence after reload, then delete the owned user.

Only absent live User Group/Profile/role data may skip the test. HTTP errors, persistence mismatches, and cleanup failures remain failures. Record important screenshots, video, and trace. Do not retry failed mutations.
