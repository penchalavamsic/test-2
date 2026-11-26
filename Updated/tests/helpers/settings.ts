export function envNumber(name: string, fallback: number, minimum = 0): number {
  const raw = process.env[name];
  if (raw === undefined || raw === '') return fallback;
  const value = Number(raw);
  if (!Number.isFinite(value) || !Number.isInteger(value) || value < minimum) {
    throw new Error(`${name} must be an integer >= ${minimum}`);
  }
  return value;
}

export function applicationUrl(): URL {
  const raw = process.env.LIMAS_BASE_URL;
  if (!raw) throw new Error('LIMAS_BASE_URL is required');
  const url = new URL(raw);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
    throw new Error('LIMAS_BASE_URL must be an HTTP(S) URL without embedded credentials');
  }
  return url;
}
