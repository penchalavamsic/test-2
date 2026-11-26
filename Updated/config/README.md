# Configuration

## Environment Files

- `.env` contains private local values and must never be shared.
- `.env.example` contains only variable names and is safe to share.

## Access Profiles

`access-profiles.json` maps each access profile to:
- Credential environment-variable names
- Expected visible tabs

### Profile Tab Counts

| Profile | Tabs |
|---|---|
| SUPER_USER | 5 |
| ADMIN | 6 |
| SUPER_USER_ADMIN_USER | 11 |

SUPER_USER_ADMIN_USER combines all Super User and Admin tabs without duplicates.

## Test Data

`test-data.example.json` contains shareable dynamic placeholders. All values are blank. Runtime values are supplied by CI/CD, fixtures, or environment configuration.

## Plan Format

Markdown with YAML front matter is the standard test-plan format. See `plans/PLAN_TEMPLATE.md`.

## Script Generation Rules

- Generated Playwright scripts must read all environment-specific values dynamically.
- Playwright MCP must stop after plan and script generation.
- CI/CD owns test execution.

## Healer

The future Healer may propose only test-level corrections and may not change LIMAS business expectations.