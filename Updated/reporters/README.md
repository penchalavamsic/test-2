# Reporters

This directory will hold custom Playwright reporters.

## Current Configuration

Built-in reporters are configured in `playwright.config.ts`:

- HTML → `playwright-report/` (open: never)
- JUnit XML → `test-results/junit-results.xml`
- JSON → `test-results/test-results.json`

## Future Trace2Fix-Inspired Pattern

### Timestamped HTML Report

A future custom reporter can route the HTML report into timestamped folders under `execution-reports/`:

```
execution-reports/YYYY-MM-DD/HH-MM-SS-SSS/index.html
```

This pattern from Trace2Fix keeps every CI/CD run's report separate and traceable. CI/CD should use the pipeline run ID or build number as the timestamp source rather than developer-local clock values.

### CI/CD Integration

CI/CD should:

1. Set `PLAYWRIGHT_HTML_OUTPUT_DIR` to a run-specific path before test execution.
2. Publish the timestamped folder as a pipeline artifact.
3. Set `LIMAS_EXECUTION_REPORT_FOLDER` so downstream tools can locate the report.

### Data Scrubbing

Any custom reporter must scrub sensitive values (credentials, tokens, cookies, authorization codes, query parameters with sensitive data) from report output before writing.