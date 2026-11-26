# Trace2Fix Pattern Adoption

The LIMAS framework adopted the following approved design patterns from the Trace2Fix Playwright test-automation project. All patterns were adapted for TypeScript, ESM modules, and LIMAS-specific requirements.

## Patterns Adopted

### Shared Authenticated Fixture
`tests/fixtures/authenticated-test.ts` extends Playwright's base test with auto-login via the reusable `AuthenticationFlow`. It detects already-authenticated sessions to avoid duplicate logins, supports dynamic access-profile selection via `TEST_ACCESS_PROFILE`, and reads credential variable names from `config/access-profiles.json` rather than hardcoding them.

### Small Page Objects
`tests/pages/` contains focused page-object classes with constructor-level locators and small async action methods. Each page object includes only selectors observed through the live Playwright MCP interface. One-off selectors remain in individual test scripts to prevent oversized objects.

### Reusable Flows
`tests/flows/` contains composite business workflow classes. `AuthenticationFlow` composes `LoginPage` and `SystemUserDashboardPage` to provide a single `ensureAuthenticated()` method with session-reuse detection.

### Dynamic Test-Data Models
`tests/test-data/models.ts` defines TypeScript interfaces for authentication, search, and license-data shapes. `tests/test-data/runtime-data.ts` validates environment-provided values at runtime. No hardcoded business values are stored.

### CI-Aware Playwright Configuration
`playwright.config.ts` supports environment-variable overrides for timeouts, retries, and worker counts (`PLAYWRIGHT_TEST_TIMEOUT`, `PLAYWRIGHT_EXPECT_TIMEOUT`, `PLAYWRIGHT_RETRIES`, `PLAYWRIGHT_WORKERS`). CI gets higher retries and parallel execution; local development uses zero retries and single-worker defaults.

### HTML, JUnit, and JSON Reporters
Three built-in Playwright reporters are configured: HTML (`playwright-report/`), JUnit XML (`test-results/junit-results.xml`), and JSON (`test-results/test-results.json`). A future custom reporter can route HTML reports into timestamped folders. All reporters are documented in `reporters/README.md`.

## Patterns Not Adopted

- **Hardcoded business data** (VINs, fault lists, DTCs) — LIMAS uses environment variables and runtime configuration only.
- **CommonJS JavaScript** — LIMAS uses TypeScript with ESM modules.
- **Jira integration** — Not in the LIMAS test-automation scope.
- **Organization-specific npm registry configuration** — LIMAS uses the standard npm registry.
- **Custom Excel execution reporter** — The Excel checklist serves as the Jira-style planning tracker; CI/CD publishes built-in JUnit+JSON for pipeline integration.