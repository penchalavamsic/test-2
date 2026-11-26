# LIMAS 3.0 Test-Automation Framework

## Purpose

The LIMAS test-automation framework enables systematic, shareable, environment-agnostic Playwright testing of the LIMAS license-management application. Tests are planned, reviewed, generated, and tracked through a Planner-to-Generator workflow, with CI/CD owning all test execution.

## Workflow

1. **Planner:** Atomic test behaviors are identified from the live UI using Playwright MCP.
2. **Markdown Plans:** One plan per atomic case, in Markdown with YAML frontmatter, under `plans/<module>/`.
3. **TypeScript Scripts:** One Playwright script per reviewed plan, under `tests/<module>/`.
4. **Excel Checklist:** All test cases are tracked in `inventory/LIMAS_3_Simple_Test_Checklist.xlsx` with status fields.
5. **CI/CD Execution:** Tests are executed by CI/CD only; plans and scripts are never run during generation.

## Excel Checklist

The checklist at `inventory/LIMAS_3_Simple_Test_Checklist.xlsx` is the Jira-style master tracker. It includes columns for Test ID, Module, Title, Preconditions, Steps, Expected Result, Type, Priority, Plan Status, Script Status, Execution Status, and Notes (with plan and script paths).

## Dynamic Plans and Test Scripts

- Every plan references a unique Test ID (`LIMAS-{MODULE}-{NNN}`).
- Plans use environment variables (`${LIMAS_BASE_URL}`, `${LIMAS_SUPER_USER_ADMIN_USER_USERNAME}`) — never hardcoded values.
- Scripts use accessible selectors (`getByRole`, `getByText`, `getByLabel`) with Playwright web-first assertions.

## Access-Profile Configuration

`config/access-profiles.json` maps named profiles (SUPER_USER, ADMIN, SUPER_USER_ADMIN_USER) to credential environment-variable names. Credential values are read from `.env` at runtime. `tests/helpers/auth.ts` provides `getCredentials()` and `performKeycloakLogin()`.

## Page Objects and Flows

- **Page Objects:** `tests/pages/` — small reusable selectors and actions for each page.
- **Flows:** `tests/flows/` — composite business workflows combining multiple page objects.
- **Fixtures:** `tests/fixtures/authenticated-test.ts` — auto-login with already-authenticated detection.

## Dynamic Test Data

`tests/test-data/models.ts` defines TypeScript interfaces. `tests/test-data/runtime-data.ts` reads and validates values from environment variables at runtime. No hardcoded business data is stored in these files.

## Reporting Readiness

Three reporters are configured in `playwright.config.ts`: HTML (`playwright-report/`), JUnit XML (`test-results/junit-results.xml`), and JSON (`test-results/test-results.json`). Screenshots, traces, and videos are captured only on failure. CI/CD publishes reports as pipeline artifacts.

## CI/CD Execution Ownership

CI/CD installs dependencies, injects `.env` values securely, connects to the target LIMAS environment, runs tests, publishes JUnit/HTML/JSON reports, and provides failure artifacts to the future Healer.

## Healer Boundaries

`healing/instructions/HEALER_RULES.md` defines what the Healer may and may not change. The Healer may propose test-only fixes (outdated selectors, missing waits, fixture issues) but must never modify LIMAS production code, weaken assertions, or skip tests without review.