# LIMAS-SUD-2530: Global search by displayed name includes the target user and Clear restores all users

## Approved workflow baseline

The user approved deployed functional behavior on 2026-11-26. Search includes name, username, email, company, role, groups, and profiles. A nonmatching displayed name does not alone indicate an incorrect global-search result.

## Steps and expected result

Choose an existing displayed name and search its prefix. Verify that the target remains present and its name/email identity matches and the filtered count does not exceed the full baseline total. Clear and verify the full count and initial visible names/emails return. Skip only when records/names are absent.

## Audit

Original plan: [preserved baseline](../../docs/execution-records/office-repair/plan-baselines/LIMAS-SUD-2530-search-by-name-finds-matching-users.md).
