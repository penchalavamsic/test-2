import type { Page, Request } from '@playwright/test';

/** Ignore responses from the previous document and read fresh bodies before another navigation. */
export async function freshNavigationJson<T>(page: Page, endpoint: string, navigate: () => Promise<unknown>): Promise<T> {
  const fresh = new WeakSet<Request>();
  const started = (request: Request) => fresh.add(request);
  page.on('request', started);
  try {
    const body = page.waitForResponse(response => {
      const request = response.request();
      return fresh.has(request) && request.method() === 'GET' && new URL(response.url()).pathname.endsWith(endpoint);
    }, { timeout: 60000 }).then(async response => {
      if (!response.ok()) throw new Error(endpoint + ': HTTP ' + response.status() + ' while loading required data');
      return await response.json() as T;
    });
    const [data] = await Promise.all([body, navigate()]);
    return data;
  } finally { page.off('request', started); }
}
