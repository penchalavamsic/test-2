import { expect, test } from '@playwright/test';
import { ProfilesPage } from '../pages/profiles.page';
import { freshNavigationJson } from './fresh-navigation-json';
import { captureEvidence } from './step-evidence';

export async function verifyProfileFeatureOptions(profiles: ProfilesPage, kind: 'version' | 'access') {
  const page = profiles.page;
  const catalog = await freshNavigationJson<any[]>(page, '/api/features', () => page.goto('/features'));
  const data = await freshNavigationJson<any[]>(page, '/api/profiles', () => page.goto('/profiles'));
  const resolveGraph = (data: any[]) => {
    const identities = new Map<string, any>();
    const visit = (value: any): void => { if (!value || typeof value !== 'object') return; if (value['@id']) identities.set(value['@id'], value); Object.values(value).forEach(visit); };
    visit(data);
    return (value: any): any => typeof value === 'string' ? identities.get(value) : value;
  };
  const resolveFeature = resolveGraph(catalog), resolveProfile = resolveGraph(data);
  const features = catalog.map(x => resolveFeature(x.feature)).filter(Boolean);
  let target: { profile: any; feature: any; options: string[] } | undefined;
  for (const envelope of data) {
    const profile = resolveProfile(envelope.productProfile);
    if (!profile?.profileRoles?.length) continue;
    for (const assigned of profile.features || []) {
      const assignment = resolveProfile(assigned);
      const feature = features.find(x => x.id === assignment?.id);
      if (!feature) continue;
      let root = feature;
      const seen = new Set<number>();
      while (resolveFeature(root.parent)?.id && !seen.has(root.id)) { seen.add(root.id); root = features.find(x => x.id === resolveFeature(root.parent).id) || root; }
      const options = kind === 'version' ? (feature.featureVersion || []).map((x: any) => resolveFeature(x)?.featureVersion) : (root.accessLevel || []).map((x: any) => resolveFeature(x)?.accessLevelName);
      if (options.filter(Boolean).length) { target = { profile, feature, options: options.filter(Boolean) }; break; }
    }
    if (target) break;
  }
  test.skip(!target, 'No assigned Feature with a Profile role and runtime ' + kind + ' options exists; reevaluated each run.');
  const chosen = target!;
  await expect(profiles.heading).toBeVisible();
  const card = profiles.profileCards.filter({ has: page.getByRole('heading', { name: chosen.profile.name, exact: true }) });
  await expect(card).toHaveCount(1);
  await profiles.openManageDialog(card, chosen.profile.name);
  await profiles.manageDialogTabFeatures.click();
  const row = profiles.manageFeaturesTable.locator('tbody tr').filter({ has: page.getByText(chosen.feature.name, { exact: true }) });
  await expect(row).toHaveCount(1);
  const combo = kind === 'version' ? profiles.manageFeaturesRowVersion(row) : profiles.manageFeaturesRowAccess(row);
  await combo.click();
  await expect(page.getByRole('option', { name: '-- Select --', exact: true })).toBeVisible();
  const actual = (await page.getByRole('option').allTextContents()).map(x => x.trim()).filter(x => x !== '-- Select --');
  expect([...new Set(actual)].sort(), 'Visible options must match the available server catalog').toEqual([...new Set(chosen.options)].sort());
  await captureEvidence('profile-feature-' + kind + '-runtime-options');
  await page.keyboard.press('Escape');
  await profiles.closeManageDialog();
}
