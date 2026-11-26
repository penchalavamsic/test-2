import { test as base, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { captureEvidence, registerEvidence, unregisterEvidence } from '../helpers/step-evidence';
import { checklistPath, findPlans, loadCaseCatalog } from '../helpers/case-catalog';

export { expect };
export const test = base.extend<{ _casePlan: void; _caseEvidence: void }>({
  _casePlan: [async ({}, use, info) => {
    const id = info.titlePath.join(' ').match(/\bLIMAS-[A-Z]+-\d+\b/)?.[0];
    try {
      if (id) {
        info.annotations.push({ type: 'testId', description: id });
        const row = (await loadCaseCatalog()).get(id);
        await info.attach('Workbook test plan', {
          body: JSON.stringify({ workbook: path.basename(checklistPath), testId: id, case: row ?? null }, null, 2),
          contentType: 'application/json',
        });
        if (!row) info.annotations.push({ type: 'coverage-gap', description: 'Test ID not found in the authoritative workbook' });
        const plans = findPlans(id);
        for (const plan of plans) await info.attach(`Atomic Test Plan - ${path.basename(plan)}`, { path: plan, contentType: 'text/markdown' });
        if (plans.length !== 1) info.annotations.push({ type: 'plan-mapping', description: `${plans.length} matching plan files; inspect Workbook test plan` });
      }
      // Run-scoped, evidence-backed unavailable-data decisions are optional.
      const runGroup = (process.env.PLAYWRIGHT_RUN_ID || '').split(/[\\/]/)[0];
      if (id && runGroup && /^[a-zA-Z0-9_-]+$/.test(runGroup)) {
        const manifest = path.resolve(__dirname, '../../test-runs', runGroup, 'unavailable-data-cases.json');
        if (fs.existsSync(manifest)) {
          const availability = JSON.parse(fs.readFileSync(manifest, 'utf8'));
          const age = Date.now() - Date.parse(availability.observedAt);
          if (age >= 0 && age < 24 * 60 * 60 * 1000 && availability.cases?.[id]) {
            info.skip(true, availability.cases[id]);
          }
        }
      }
      await use();
    } finally {
      await info.attach('Execution summary', {
        body: JSON.stringify({ testId: id, status: info.status, expectedStatus: info.expectedStatus, retry: info.retry,
          profile: process.env.LIMAS_ACCESS_PROFILE || process.env.LIMAS_DEFAULT_ACCESS_PROFILE,
          annotations: info.annotations }, null, 2), contentType: 'application/json',
      });
    }
  }, { auto: true }],
  _caseEvidence: [async ({ _casePlan, page }, use, info) => {
    registerEvidence(page, info);
    const responses: Array<{ method: string; path: string; status: number }> = [];
    const onResponse = (response: import('@playwright/test').Response) => {
      responses.push({ method: response.request().method(), path: new URL(response.url()).pathname, status: response.status() });
    };
    page.on('response', onResponse);
    try { await use(); }
    finally {
      page.off('response', onResponse);
      await info.attach('Observed HTTP responses', { body: JSON.stringify(responses, null, 2), contentType: 'application/json' });
      await captureEvidence('final-state', info, page);
      unregisterEvidence(info);
    }
  }, { auto: true }],
});
