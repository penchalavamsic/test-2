# CI/CD execution guide

The framework has a platform-neutral, headless CI entry point. A CI provider has not been selected or connected, and no live pipeline or application run has been performed. Integration requires a runner that can reach the approved LIMAS and Keycloak environment.

## Pipeline stages

1. Check out this repository and install Node.js 20 or newer.
2. Run `npm ci` using the committed package lock. Do not resolve a different Playwright version independently of the lock.
3. Provision the matching browser. On an approved Linux agent with installation rights, use `npm run ci:install-browser`. This installs Chromium and its OS dependencies using the installed Playwright CLI. On a restricted corporate agent, IT should provision the matching browser/dependencies in the agent image in advance. No installs were performed during this repair.
4. Inject the required variables from the CI secret store. A committed `.env` is neither required nor appropriate.
5. Run `npm run ci:check` to compile, verify evidence coverage and collect the batch inventory without opening browsers.
6. Run `npm run test:ci`. It executes every batch sequentially, headlessly, without interactive prompts. A functional failure or report-packaging failure is recorded, subsequent batches are attempted, and the final exit code remains nonzero if any batch failed. Tests are never automatically replayed by the CI runner.
7. Publish JUnit and artifacts in the provider's unconditional/finally step, even when the test command fails or is cancelled. Preserve the original test-command exit status. Do not use a global ignore-errors setting that turns a failed run green.

```sh
npm ci
npm run ci:install-browser
npm run ci:check
npm run test:ci
```

The installation command belongs only on agents approved for dependency installation. It was not run on this restricted workstation. Test execution defaults to the browser configured in `PLAYWRIGHT_BROWSER_CHANNEL`, or bundled Chromium for CI. Local runs retain Edge as their default.

To select a suite, a batch, or a different batch size without npm argument-forwarding differences between shells, call Node directly:

```sh
node scripts/run-ci.cjs --dry-run --batch SUD-PL-01-A
node scripts/run-ci.cjs --suite system-user-dashboard --size 10
node scripts/run-ci.cjs --batch ULH-001 --portable
```

On Windows PowerShell, `npm.cmd run test:ci -- --suite system-user-dashboard` is another option. The existing `scripts/run-tests-with-report.ps1` interface remains available for local batches, which stop at the first failed batch by default.

## Required variables and secrets

| Variable | Purpose |
|---|---|
| `LIMAS_BASE_URL` | Approved, reachable application URL. Do not reuse the unavailable local URL on a hosted agent. |
| `LIMAS_ACCESS_PROFILE` or `LIMAS_DEFAULT_ACCESS_PROFILE` | One profile from `config/access-profiles.json`. |
| Selected profile's username/password variables | Inject the exact variable names referenced by `config/access-profiles.json` as secrets. |
| `PLAYWRIGHT_BROWSER_CHANNEL` | Defaults to `chromium` in CI. Use `msedge` only on an agent with Edge provisioned. |

For example, the combined role needs `LIMAS_SUPER_USER_ADMIN_USER_USERNAME` and `LIMAS_SUPER_USER_ADMIN_USER_PASSWORD`. Select a role appropriate to each suite; the tests do not bypass application permissions. Actual landing routes and access permissions for all three roles still require validation against the application. Authentication tests that deliberately use invalid credentials should use a dedicated test account according to the application's lockout policy.

Optional timings and artifact masks are documented in `.env.example`. Authentication renewal has a separate setup budget, and renewal occurs before tests when the token approaches expiry. The runner does not change Keycloak policy, replay partially completed operations, or promise recovery from an application outage. A timeout during a test remains a visible failure.

Retries default to zero and workers default to one. Keep data-changing gates disabled until disposable data and reliable cleanup have been validated. Parallel jobs for different roles or suites must use isolated accounts and data; arbitrary parallelism is not assumed safe.

## Artifacts and overall status

Publish these paths from the checkout, with access restricted to the project team:

- `test-runs/**/junit.xml`: test results for the CI test-results publisher.
- `test-runs/**/html-report/**`: reviewable Playwright HTML reports and their assets.
- `test-runs/**/test-results/**`: screenshots, video and traces.
- `test-runs/**/results.json`, `run-metadata.json`, `run-summary.txt`, and `test-plan.json`: raw result and expected-case records for each batch.
- `test-runs/**/sequence-summary.json`: cumulative batch progress, failures, report paths and any unattempted batches.
- With `--portable`, each run also produces individual/suite report ZIPs and `Technical-Evidence.zip`.

A unique sequence summary is written before execution and updated after every completed batch. It remains available if a later batch fails. Missing or invalid JSON results, or a report whose case set differs from the planned batch, produce failure instead of success. If the CI agent terminates the process, already completed batch directories and the last progress summary remain; reports for work interrupted mid-write may be incomplete. Provider-level artifact retention and timeout settings must account for the measured runtime and large video/trace volume.

Raw trace/video files can contain account and business data even though the shared screenshots mask password/username fields. Restrict artifact access and retention. No report publishing or external uploads happen inside the repository scripts; those are explicit CI-provider steps to configure later.

## Verified offline

TypeScript compilation, complete batch discovery, exact ID selection, evidence instrumentation, local/CI stop-and-continue behavior, nonzero final status after failures, and portable ZIP contents have been checked. Synthetic browser tests cover login branches, expiry handling, pre-test renewal and report evidence. These checks do not certify application behavior or a deployed pipeline.

See `docs/framework-repair-and-batches.md` and `config/batch-validation.json` for repairs and outstanding workbook/plan gaps. The repository contains 2,829 scripted cases; the chosen workbook has missing and unmatched cases that remain explicitly recorded. Provider selection, runner/network provisioning, secret-store configuration, artifact publication and a live pilot batch are the remaining integration steps.
