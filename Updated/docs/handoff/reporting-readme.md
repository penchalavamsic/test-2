# Playwright Reporting Handoff

CI/CD will execute the generated Playwright tests and produce:

- HTML report for human review
- JUnit XML for pipeline test-result publishing
- JSON report for machine-readable analysis and future Healer input
- Screenshots only for failed tests
- Traces only for failed tests
- Videos only for failed tests

Expected generated locations:

- playwright-report\
- test-results\junit-results.xml
- test-results\test-results.json

HTML report viewing command:

```
npx playwright show-report playwright-report
```

## Future Timestamped Report Pattern

A future custom reporter can route HTML reports into timestamped folders under `execution-reports/` (YYYY-MM-DD/HH-MM-SS-SSS/index.html). This Trace2Fix-inspired pattern keeps every CI/CD run separate and traceable.

## CI-aware Configuration

Playwright configuration supports environment-variable overrides:

- `PLAYWRIGHT_TEST_TIMEOUT` — per-test timeout (default: 120000ms)
- `PLAYWRIGHT_EXPECT_TIMEOUT` — assertion timeout (default: 30000ms)
- `PLAYWRIGHT_RETRIES` — CI retries (default: 2)
- `PLAYWRIGHT_WORKERS` — CI worker count (default: 4)

Refer to `reporters/README.md` for the timestamped HTML reporter pattern.

## Security Rules

- Reports must not contain credentials.
- Reports must not contain tokens, cookies or authorization headers.
- Authentication codes and sensitive query parameters must be sanitized.
- Runtime test data must not contain unnecessary personal information.
- Report artifacts must be retained according to the CI/CD retention policy.
- Reports, screenshots, traces and videos must not be committed to source control.