import { test as base, expect } from './observed-test';
import {
  resolveAuthPlan,
  parsePlanFrontmatter,
  extractPlanPurpose,
  extractPlanPreconditions,
  extractPlanExpectedResult,
} from '../helpers/test-plan-resolver';
import {
  buildEvidenceSummary,
  buildActualResult,
  buildApiSummary,
  getSpecRelativePath,
} from '../helpers/evidence';

interface EvidenceFixtures {
  /**
   * Call once at the start of a test to attach the plan, summary, and annotations.
   * Returns metadata for use in the test body.
   */
  attachEvidencePlan: (testId: string) => Promise<{
    accessProfile: string;
    module: string;
    planPath: string;
  }>;
  /**
   * Call at the end of a test to attach the actual result, final screenshot, and API summary.
   */
  attachEvidenceResult: (params: {
    status: 'passed' | 'failed';
    duration: number;
    errorMessage?: string;
    apiSummary?: string;
  }) => Promise<void>;
}

export const test = base.extend<EvidenceFixtures>({
  attachEvidencePlan: async ({ page }, use, testInfo) => {
    const fn = async (testId: string) => {
      const { planPath, content } = resolveAuthPlan(testId);
      const fm = parsePlanFrontmatter(content);
      const accessProfile = process.env.LIMAS_ACCESS_PROFILE || process.env.LIMAS_DEFAULT_ACCESS_PROFILE || fm['access_profile'];
      const module = fm['module'] ?? 'Authentication';

      // Attach the plan file itself
      await testInfo.attach('Atomic Test Plan', {
        path: planPath,
        contentType: 'text/markdown',
      });

      // Annotations
      testInfo.annotations.push({ type: 'module', description: module });
      testInfo.annotations.push({ type: 'accessProfile', description: accessProfile });
      testInfo.annotations.push({ type: 'testId', description: testId });
      testInfo.annotations.push({ type: 'evidenceMode', description: 'detailed' });
      testInfo.annotations.push({ type: 'planPath', description: planPath.replace(/\\/g, '/') });

      // Evidence summary
      const specPath = getSpecRelativePath(testInfo.file);
      const summary = buildEvidenceSummary({
        testId,
        module,
        accessProfile,
        purpose: extractPlanPurpose(content),
        preconditions: extractPlanPreconditions(content),
        expectedResult: extractPlanExpectedResult(content),
        specPath,
        planPath: planPath.replace(/\\/g, '/'),
      });
      await testInfo.attach('Test Summary', {
        body: summary,
        contentType: 'text/markdown',
      });

      return { accessProfile, module, planPath };
    };
    await use(fn);
  },

  attachEvidenceResult: async ({ page }, use, testInfo) => {
    const fn = async (params: {
      status: 'passed' | 'failed';
      duration: number;
      errorMessage?: string;
      apiSummary?: string;
    }) => {
      // Final-state screenshot — independent of test status
      try {
        const finalBuffer = await page.screenshot({ fullPage: false, mask: [page.locator('input[type="password"], input[type="email"], input[name="username"], input[autocomplete="username"]')] });
        await testInfo.attach('final-state.png', { body: finalBuffer, contentType: 'image/png' });
      } catch {
        // Page closed — skip final screenshot
      }

      // Actual result
      const finalRoute = page.url().split('?')[0] ?? '(page closed)';
      const actualResult = buildActualResult({
        status: params.status,
        duration: params.duration,
        finalRoute,
        errorMessage: params.errorMessage,
      });
      await testInfo.attach('Actual Result', {
        body: actualResult,
        contentType: 'text/markdown',
      });

      // API summary if provided
      if (params.apiSummary) {
        await testInfo.attach('Declared API expectations (legacy, not observed traffic)', {
          body: params.apiSummary,
          contentType: 'text/markdown',
        });
      }
      // A failed captured assertion must also fail Playwright and its reporters.
      if (params.status === 'failed') throw new Error(params.errorMessage || 'Authentication assertion failed');
    };
    await use(fn);
  },
});

export { expect };
