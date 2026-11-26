/**
 * Re-export shim — delegates to the shared System User Dashboard fixture
 * in `tests/fixtures/base.ts`.
 *
 * All System User Dashboard tests must use the single saved-state
 * authentication path. This file exists only so existing specs that
 * import from `../fixtures/authenticated-test` continue to compile
 * without changes.
 *
 * It does NOT call performKeycloakLogin(). SUD functional tests never
 * enter credentials.
 */
export { test, expect, AuthBlockedError } from './base';
