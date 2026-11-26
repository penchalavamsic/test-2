# Test Data

Runtime test data comes from CI/CD, environment variables, fixtures, or approved configuration.

## Rules

- URLs, usernames, passwords, emails, request IDs, hardware IDs, dates, user groups, profiles, roles, and local paths must not be hardcoded.
- Use `models.ts` for TypeScript interfaces describing dynamic test data shapes.
- Use `runtime-data.ts` to read and validate environment-provided values at runtime.
- Credential values are never stored in these files.