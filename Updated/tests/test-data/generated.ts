import { randomUUID } from 'crypto';

const runToken = randomUUID().replaceAll('-', '');
/** Stable within one worker, unique across runs. Never selects an existing record. */
export function generatedInput(label: string): string {
  return `${label.replace(/[^a-zA-Z0-9-]/g, '-')}-${runToken}`;
}
export function generatedEmail(label: string): string {
  return `${generatedInput(label)}@${process.env.LIMAS_TEST_EMAIL_DOMAIN || 'example.invalid'}`;
}
