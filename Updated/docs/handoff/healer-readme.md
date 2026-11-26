# Healer Handoff

CI/CD will execute the generated Playwright tests.

When a test fails, CI/CD should provide:

- Test ID
- Reviewed Markdown plan
- Generated test script
- Sanitized failure message
- Failed step
- Current URL
- Screenshot when safe
- Playwright trace when safe
- Browser console errors
- Failed network requests
- Environment and build information

The Healer may create proposals under:

healing/proposals

No proposal may be applied without human review.

Do not include credentials, tokens, cookies, authorization headers, authentication codes, or sensitive payloads.