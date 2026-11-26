import { test as base, expect, type Locator, type Page, type TestInfo } from '@playwright/test';

import { captureEvidence } from '../helpers/step-evidence';
export { expect };
export const captureStepScreenshot = (page: Page, info: TestInfo, name: string) => captureEvidence(name, info, page);

export async function verify<T>(page: Page, testInfo: TestInfo, name: string, assertion: () => Promise<T> | T): Promise<T> {
  try {
    const result = await assertion();
    await captureStepScreenshot(page, testInfo, `verify-${name}`);
    return result;
  } catch (error) {
    await captureStepScreenshot(page, testInfo, `verify-${name}-failed`);
    throw error;
  }
}

export async function performAction<T>(page: Page, testInfo: TestInfo, name: string, action: () => Promise<T>): Promise<T> {
  try {
    const result = await action();
    await captureStepScreenshot(page, testInfo, name);
    return result;
  } catch (error) {
    await captureStepScreenshot(page, testInfo, `${name}-failed`);
    throw error;
  }
}

export const clickAndCapture = (locator: Locator, page: Page, testInfo: TestInfo, name: string) =>
  performAction(page, testInfo, `click-${name}`, () => locator.click());

export const pressAndCapture = (page: Page, key: string, testInfo: TestInfo, name = key) =>
  performAction(page, testInfo, `key-${name}`, () => page.keyboard.press(key));

export const navigateAndCapture = (page: Page, url: string, testInfo: TestInfo, name = 'navigation') =>
  performAction(page, testInfo, name, () => page.goto(url));

export const fillAndCapture = (locator: Locator, text: string, page: Page, testInfo: TestInfo, name: string) =>
  performAction(page, testInfo, `fill-${name}`, () => locator.fill(text));

export const reloadAndCapture = (page: Page, testInfo: TestInfo, name = 'reload') =>
  performAction(page, testInfo, name, () => page.reload());

export const test = base;
