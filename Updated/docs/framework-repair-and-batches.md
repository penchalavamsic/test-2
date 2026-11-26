# Framework repair and batch execution

Validation is offline. The application URL in `.env` refers to a local setup that is not installed here. No LIMAS or Keycloak requests were made, no credentials or application data were changed, and the workbook was not edited. Compilation and synthetic browser checks do not establish that the functional application tests pass.

## Batch execution

The batch catalog is rebuilt from Playwright test discovery and `inventory/LIMAS_3_Simple_Test_Checklist_AUTH-01_ADDED.xlsx`. It covers every collected case exactly once, grouped by suite, using 20 cases per batch by default. IDs are matched exactly, so selecting `LIMAS-SUD-196` cannot accidentally select `LIMAS-SUD-1960`.

```powershell
# Offline: list all batches and refresh config/execution-batches.json
npm run batches:list

# Offline: inspect the original first batch without launching a browser
node scripts/run-batches.cjs --batch SUD-PL-01-A --dry-run

# When an approved, reachable test application is configured:
node scripts/run-batches.cjs --batch SUD-PL-01-A
node scripts/run-batches.cjs --batch SUD-002
node scripts/run-batches.cjs --suite system-user-dashboard --all
node scripts/run-batches.cjs --suite user-license-hub --all --size 10

# Select one of the profiles already defined in config/access-profiles.json
node scripts/run-batches.cjs --batch SUD-001 --profile SUPER_USER

# Retained PowerShell interface, including optional portable report packaging
.\scripts\run-tests-with-report.ps1 -Suite system-user-dashboard -Batch SUD-PL-01-A -DetailedEvidence -TestReport

npm run report:open
```

Local `--all` stops at the first failed batch. The dedicated `npm run test:ci` entry point continues through subsequent batches and returns a failing overall status if any batch failed. See `docs/handoff/ci-cd-readme.md` for CI setup and artifact publication. Re-running a named batch is explicit. No failed data-changing test is automatically replayed by the runner. Existing mutation gates remain in the specs. Retries default to zero, and execution defaults to one worker. Changing worker count, mutation gates, or retry settings requires considering the test data each case uses.

The old SUD batch/sub-batch names are resolved from `config/sud-batches.json`. Newly generated names use `SUD`, `ULH`, `RPT`, `FLC`, `SLC`, `FTR`, `PRF`, `UGR`, `SYU`, `SVL`, and `AUTH`. The historical Playwright project name `system-user-dashboard` still includes all authenticated functional suites; the runner scopes each invocation to its actual suite directory. The `default` project contains only authentication specs, eliminating duplicate execution of functional cases.

## Evidence and reports

Every normal Playwright invocation writes a unique directory under `test-runs/`. Named batch runs also write `run-metadata.json`, `test-plan.json`, and `run-summary.txt`. HTML, JSON and JUnit reports, traces, videos, final screenshots, and action/assertion screenshots are enabled by default. Each test attaches its matching workbook row and Markdown plan where available. Missing workbook/plan mappings are annotated rather than invented. A test blocked before its body cannot have screenshots for actions that never happened.

Instrumentation wraps the existing operations, preserving their return values and errors. It records click, typing, selection, navigation, keyboard/mouse actions, relevant DOM interactions, assertions and explicit steps. The original first-batch helpers now share the same capture implementation. Screenshot capture is bounded by `PLAYWRIGHT_SCREENSHOT_TIMEOUT_MS`; a closed/crashed page produces an explicit unavailable-evidence attachment. Screenshots add runtime and disk usage. Small batches keep review and recovery manageable, while session renewal handles token lifetime independently of batch size.

`Observed HTTP responses` contains captured methods, paths and statuses, without query strings, request bodies or headers. Previously declared API summaries are clearly labeled as expectations, because hardcoded expected statuses are not proof of observed traffic.

The portable exporter now preserves four-digit and authentication case IDs, uses the final retry result, distinguishes skipped cases from failures, includes file-backed screenshots, recognizes sequenced final screenshots, and prefers the attached workbook case when plans conflict. ZIP generation uses libraries already installed in the repository instead of requiring the restricted PowerShell Archive module. Export failures return a nonzero exit code.

Password and username fields are masked in the shared screenshots. `PLAYWRIGHT_EVIDENCE_MASK_SELECTORS` accepts additional selectors as a JSON array. Trace files, video, existing custom captures and application content may still contain account or business data. Keep raw reports in the corporate restricted location and review them before distributing portable packages. No reports are uploaded or sent by these scripts.

## Authentication and timeout repairs

- Replaced the fixed five-minute safety margin with `LIMAS_AUTH_EXPIRY_MARGIN_MS` (default 30 seconds), evaluated using exact timestamps. A fresh five-minute token is no longer rejected simply because it has less than five minutes remaining.
- Loads saved state at execution time, checks profile and application URL, and restores application session storage only on the application's origin. It does not overwrite refreshed session values on later navigations.
- Uses a per-worker session manager and a single consistent snapshot for cookies/local storage and session storage. A near-expired token is renewed through UI login before the next test. Unknown token expiry causes a fresh login for the next test rather than indefinite reuse. No Keycloak settings or token lifetimes are modified.
- Authentication setup has its own configurable fixture timeout (`LIMAS_AUTH_SETUP_TIMEOUT_MS`). Login waits use `LIMAS_AUTH_TIMEOUT_MS`. The new runner uses inherited child-process output and no separate 90-second process cutoff, removing both the premature kill and the output-buffer deadlock.
- Handles either a credential form or direct SSO to the dashboard. Password controls use their label. Realm navigation no longer hardcodes the realm name.
- A dashboard timeout without a confirmed sign-in redirect remains a loading/navigation error; it is not automatically relabeled as token expiry. Mid-test expiration is still a test failure: the framework does not replay operations or change the application's refresh behavior.

Existing landing expectations remain `/system-user-dashboard`. The three profiles select credentials dynamically, but each profile's actual allowed tabs and landing behavior still require live verification. Run only cases appropriate to the selected role. Access-control expectations were not broadened to make restricted roles pass administrator cases.

## Source repairs and preserved behavior

The initial TypeScript check reported 307 errors. Missing User & License Hub dialog/navigation methods were restored using existing handoff notes and archived MCP snapshots. Invalid property names, duplicate/unused declarations, nullable reads, download filename access and missing request types were repaired. No tests were removed or disabled to make compilation pass.

Pending License Requests compatibility locators now resolve to the existing confirmed DIV grid, and data-row counting no longer subtracts a nonexistent table header. Saved snapshots show actual tables in other tabs, including User Groups and Reports; those were not globally replaced with DIV selectors. Floating License Configurations navigation uses the observed permanent sidebar link instead of waiting for a nonexistent sidebar dialog.

139 response/request wait races were repaired by registering the observer before the triggering action. Profile choice is now environment-driven in 79 previously hardcoded specs. Selected form/search values are generated per run. Product labels, routes, field positions confirmed in saved UI evidence, and deliberately invalid input categories remain explicit test expectations, not environment-specific accounts or record IDs.

Cases 196 and 197 previously stored the return value of an assertion (void) as a result count and allowed either outcome. They now read actual counts and assert the equality required by the workbook. A server-license badge assertion that checked a Promise/Locator object now checks visibility; the accessible-name assertion now requires a nonempty name. Case 156 still preserves the workbook's loaded-row versus card-count expectation. Saved evidence indicates pagination may make that expectation inconsistent with the product; it was not weakened to force a pass.

## Coverage gaps and remaining live work

The updated workbook contains 2,718 case IDs and one blank row. Discovery collects 2,829 unique scripted cases, excluding the two authentication infrastructure tests. At batch size 20, that produces 146 batches across ten functional suites plus authentication. `config/execution-batches.json` records all mappings, expected outcomes and the workbook checksum.

18 workbook cases have no collected script: `LIMAS-AUTH-001` through `008`, and `LIMAS-SUD-670`, `671`, `672`, `684`, `685`, `687`, `690`, `691`, `2658`, `2700`. Another 129 scripted IDs are absent from the selected workbook. These gaps require reconciliation with the case owner; the source workbook and test IDs were not silently rewritten. Missing cases were not replaced with invented passing tests.

15 case IDs in the Profiles suite have multiple conflicting Markdown plans. Their paths are listed in `config/batch-validation.json`; the raw HTML report attaches the candidates and marks the ambiguity. The portable report uses the workbook's expected behavior when that row is available, rather than selecting an arbitrary plan file.

Live validation is still needed for actual selectors and responsive layouts, backend response timing, role permissions, session expiration during long cases, intended failures, and controlled create/edit/delete cleanup. Existing skipped or gated tests remain skipped or gated. Passing compilation is not a claim that all 2,829 cases pass. Static audit findings are recorded per batch in `config/batch-validation.json` so live work can proceed batch by batch.

## Offline verification

```powershell
npm run typecheck
node --test framework-tests/batches.test.cjs
npm run test:offline
npm run evidence:check
npm run validate:sensitive-data
npm run validate:batches
node --test framework-tests/report.test.cjs
```

Offline browser tests block or fulfill page traffic locally and use synthetic credentials. They cover evidence/error preservation, expiry boundaries, origin isolation, session refresh, credential-form and SSO login, DIV-row selection, restored dialog methods, workbook/plan lookup and inherited authenticated fixtures. They are maintained separately from application cases in `framework-tests/`.

Verified on this machine: TypeScript passes; all 146 batches collect and select their intended cases; the evidence audit finds no uncovered recognized operations; 10 offline browser checks, 7 batch/CI orchestration checks, and 1 portable-report archive check pass. The browser checks generated 10 videos, 10 traces and 24 screenshots. The credential-literal scan found no matching configured credential literals in the inspected credential-bearing code. This narrow scan is not a guarantee that historical reports or traces contain no sensitive data.

The pre-change source snapshot is preserved at `temp/framework-audit/source-before.zip`. It excludes `.env`, `.auth`, and browser/session artifacts. Local offline evidence is in `temp/framework-audit/offline-report/` and is labeled as framework verification, not application acceptance evidence.
