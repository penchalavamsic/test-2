# LIMAS Playwright Healer Rules

The future Healer may propose changes only for confirmed test-level issues:

- Outdated selectors
- Changed accessible names
- Missing waits
- Fixture problems
- Runtime test-data setup problems
- Incorrect test-only assertions when contradicted by the reviewed plan

The future Healer must not:

- Modify LIMAS production code
- Change expected business behavior
- Weaken assertions only to make a test pass
- Hide login, permission, API, frontend, backend, or application failures
- Skip or disable a failing test without review
- Change credentials, security configuration, or access rules
- Apply a proposed correction automatically

Every healing proposal must include:

1. Failed test ID
2. Failed plan path
3. Failure category
4. Proven failure evidence
5. Proposed test-only change
6. Files affected
7. Reason the issue belongs to the test rather than LIMAS
8. Human approval status

Do not run the Healer in the current scope.