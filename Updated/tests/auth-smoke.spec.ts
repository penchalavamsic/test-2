import { recordEvidence } from './helpers/step-evidence';
import { test, expect } from './fixtures/observed-test';
import fs from 'fs';
import path from 'path';
import { getProfile, resolveProfileName } from './helpers/auth';
import { AuthBlockedError, isExpiring, restoreSession, tokenExpiry } from './helpers/auth-session';
import { applicationUrl } from './helpers/settings';

test('auth preflight: validate saved state and confirm dashboard access', async ({ context, page }) => {
  // Read after auth-setup, not while Playwright is collecting test files.
  const profile = resolveProfileName();
  getProfile(profile);
  const dir = path.resolve(__dirname, '../.auth');
  const meta = JSON.parse(fs.readFileSync(path.join(dir, `${profile}.meta.json`), 'utf8'));
  const baseURL = applicationUrl();
  if (meta.profile !== profile || new URL(meta.baseURL).href !== baseURL.href) {
    throw new AuthBlockedError('saved state belongs to a different profile or application URL');
  }
  const state = JSON.parse(fs.readFileSync(path.join(dir, `${profile}.json`), 'utf8'));
  const session = JSON.parse(fs.readFileSync(path.join(dir, `${profile}.session.json`), 'utf8'));
  const expiresAt = tokenExpiry(session);
  if (isExpiring(expiresAt)) throw new AuthBlockedError('saved token expired or is within LIMAS_AUTH_EXPIRY_MARGIN_MS');
  await restoreSession(context, { state, session, expiresAt, origin: baseURL.origin });
  await recordEvidence('action-auth-smoke-navigation', async () => page.goto('/system-user-dashboard'));
  await recordEvidence('assert-auth-smoke-heading', async () => expect(page.getByRole('heading', { name: 'System User Dashboard', level: 1 })).toBeVisible());
});
