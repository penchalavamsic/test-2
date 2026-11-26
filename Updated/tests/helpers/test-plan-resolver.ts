import fs from 'fs';
import path from 'path';

const PLANS_ROOT = path.resolve(__dirname, '..', '..', 'plans', 'authentication');

export function resolveAuthPlan(testId: string): { planPath: string; content: string } {
  const files = fs.readdirSync(PLANS_ROOT);
  const matches = files.filter((f) => (f.startsWith(`${testId}-`) || f === `${testId}.md`) && f.endsWith('.md'));

  if (matches.length === 0) {
    throw new Error(`No plan found for ${testId} in ${PLANS_ROOT}`);
  }
  if (matches.length > 1) {
    throw new Error(`Multiple plans match ${testId}: ${matches.join(', ')}`);
  }

  const planPath = path.join(PLANS_ROOT, matches[0]);
  const content = fs.readFileSync(planPath, 'utf-8');
  return { planPath, content };
}

export function parsePlanFrontmatter(content: string): Record<string, string> {
  content = content.replace(/\r\n/g, '\n');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const frontmatter: Record<string, string> = {};
  const lines = match[1].split('\n');
  for (const line of lines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();
    value = value.replace(/^["']|["']$/g, '');
    if (value) frontmatter[key] = value;
  }
  return frontmatter;
}

export function extractPlanPurpose(content: string): string {
  const purposeMatch = content.match(/# Purpose\n\n([\s\S]*?)(?=\n# )/);
  return purposeMatch ? purposeMatch[1].trim() : 'No purpose section found.';
}

export function extractPlanPreconditions(content: string): string {
  const preMatch = content.match(/# Preconditions\n\n([\s\S]*?)(?=\n# )/);
  return preMatch ? preMatch[1].trim() : 'No preconditions section found.';
}

export function extractPlanExpectedResult(content: string): string {
  const erMatch = content.match(/# Expected Final Result\n\n([\s\S]*?)(?=\n# |$)/);
  return erMatch ? erMatch[1].trim() : 'No expected result section found.';
}
