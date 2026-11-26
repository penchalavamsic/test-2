import {
  AuthenticationData,
  AccessProfileData,
  EFCCombinedRuntimeData,
  ExpiresBeforeRuntimeDates,
  ExpirationExtensionRuntimeData,
  ExpiringListRecord,
  ExpiringSearchRuntimeData,
  ExpiringSpecialCharacterValues,
  ExpiringWhitespaceValues,
  FloatingLicensesRuntimeData,
} from './models';
import fs from 'fs';
import path from 'path';
import { resolveProfileName, getProfile } from '../helpers/auth';

function loadAccessProfilesConfig(): Record<string, AccessProfileData> {
  const profilesPath = path.resolve(__dirname, '..', '..', 'config', 'access-profiles.json');
  const raw = fs.readFileSync(profilesPath, 'utf-8');
  const parsed = JSON.parse(raw);
  const mapped: Record<string, AccessProfileData> = {};
  for (const [key, value] of Object.entries(parsed)) {
    const p = value as { usernameEnv: string; passwordEnv: string; expectedTabs: string[] };
    mapped[key] = {
      profileName: key,
      expectedTabs: p.expectedTabs,
    };
  }
  return mapped;
}

export function getAuthData(profileName?: string): AuthenticationData {
  const name = resolveProfileName(profileName || process.env.LIMAS_ACCESS_PROFILE || process.env.TEST_ACCESS_PROFILE);
  const profiles = loadAccessProfilesConfig();
  const profile = profiles[name];
  if (!profile) {
    throw new Error(`Access profile "${name}" not found`);
  }

  return {
    accessProfile: name,
    usernameEnvVar: getProfile(name).usernameEnv,
    passwordEnvVar: getProfile(name).passwordEnv,
    expectedLandingRoute: '/system-user-dashboard',
    expectedLandingHeading: 'System User Dashboard',
  };
}

const PAST_DATE_OFFSET_DAYS = -30;
const FUTURE_DATE_OFFSET_DAYS = 60;

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

function toIsoDate(date: Date): string {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

function shiftDays(base: Date, days: number): Date {
  const shifted = new Date(base.getFullYear(), base.getMonth(), base.getDate());
  shifted.setDate(shifted.getDate() + days);
  return shifted;
}

export function getExpiresBeforeRuntimeDates(now: Date = new Date()): ExpiresBeforeRuntimeDates {
  const future = toIsoDate(shiftDays(now, FUTURE_DATE_OFFSET_DAYS));
  const lastOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const year = now.getFullYear();
  return {
    TEST_CURRENT_DATE: toIsoDate(now),
    TEST_PAST_DATE: toIsoDate(shiftDays(now, PAST_DATE_OFFSET_DAYS)),
    TEST_FUTURE_DATE: future,
    TEST_EXPIRES_BEFORE_DATE: future,
    TEST_MONTH_BOUNDARY_DATE: toIsoDate(lastOfMonth),
    TEST_INVALID_MONTH_DATE: `${year}-13-${pad2(now.getDate())}`,
    TEST_INVALID_DAY_DATE: `${year}-${pad2(now.getMonth() + 1)}-45`,
    TEST_UNSUPPORTED_FORMAT_DATE: `${pad2(now.getDate())}/${pad2(now.getMonth() + 1)}/${year}`,
  };
}

const SPECIAL_CHARACTER_SEARCH_VALUE = '.*';

export function getFloatingLicensesRuntimeData(now: Date = new Date()): FloatingLicensesRuntimeData {
  const dates = getExpiresBeforeRuntimeDates(now);
  return {
    TEST_FL_FUTURE_DATE: dates.TEST_FUTURE_DATE,
    TEST_FL_PAST_DATE: dates.TEST_PAST_DATE,
    TEST_FL_CURRENT_DATE: dates.TEST_CURRENT_DATE,
    TEST_FL_MONTH_BOUNDARY_DATE: dates.TEST_MONTH_BOUNDARY_DATE,
    TEST_FL_SECOND_DATE: dates.TEST_EXPIRES_BEFORE_DATE, // aliased from EXPIRES_BEFORE_DATE which equals FUTURE_DATE
    TEST_FL_SEARCH_NO_MATCH: 'TEST-NO-MATCH-999',
  };
}

export function getPartialSearchValue(value: string): string {
  const part = value.trim().slice(1, 4).trim();
  return part.length >= 2 ? part : value.trim();
}

export function getSuffixSearchValue(value: string): string {
  const part = value.trim().slice(-3).trim();
  return part.length >= 2 ? part : value.trim();
}

export function getCaseVariant(value: string): string {
  const upper = value.toUpperCase();
  return upper !== value ? upper : value.toLowerCase();
}

export function getExpiringSearchGeneratedValues(): Pick<
  ExpiringSearchRuntimeData,
  'TEST_NO_MATCH_VALUE' | 'TEST_SPECIAL_CHARACTER_VALUE'
> {
  return {
    TEST_NO_MATCH_VALUE: `zzqx-no-match-${Date.now().toString(36)}`,
    TEST_SPECIAL_CHARACTER_VALUE: SPECIAL_CHARACTER_SEARCH_VALUE,
  };
}

export function buildExpiringSearchRuntimeData(record: ExpiringListRecord): ExpiringSearchRuntimeData {
  const now = new Date();
  const futureExt = shiftDays(now, FUTURE_DATE_OFFSET_DAYS);
  const pastExt = shiftDays(now, PAST_DATE_OFFSET_DAYS);
  const lastOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return {
    TEST_EXPIRING_RECORD_IDENTIFIER: record.email,
    TEST_USER_NAME: record.name,
    TEST_USER_EMAIL: record.email,
    TEST_PROFILE: record.profile,
    TEST_COMPANY: '',
    TEST_HARDWARE_ID: record.hardwareId,
    TEST_PARTIAL_SEARCH_VALUE: getPartialSearchValue(record.name),
    ...getExpiringSearchGeneratedValues(),
    TEST_EXTENSION_CURRENT_DATE: toIsoDate(now),
    TEST_EXTENSION_FUTURE_DATE: toIsoDate(futureExt),
    TEST_EXTENSION_PAST_DATE: toIsoDate(pastExt),
    TEST_EXTENSION_MONTH_BOUNDARY_DATE: toIsoDate(lastOfMonth),
    TEST_EXPIRATION_EXTENSION_DAYS: '365',
    TEST_EXPIRATION_EXTENSION_MIN_DAYS: '1',
    TEST_EXPIRATION_EXTENSION_LARGE_DAYS: '999999',
    TEST_MAINTENANCE_CURRENT_DATE: toIsoDate(now),
    TEST_MAINTENANCE_FUTURE_DATE: toIsoDate(shiftDays(now, FUTURE_DATE_OFFSET_DAYS)),
    TEST_MAINTENANCE_PAST_DATE: toIsoDate(shiftDays(now, PAST_DATE_OFFSET_DAYS)),
    TEST_MAINTENANCE_MONTH_BOUNDARY_DATE: toIsoDate(lastOfMonth),
    TEST_MAINTENANCE_EXTENSION_DAYS: '365',
    TEST_MAINTENANCE_EXTENSION_MIN_DAYS: '1',
    TEST_MAINTENANCE_EXTENSION_LARGE_DAYS: '999999',
  };
}

export function buildExpirationExtensionRuntimeData(record: ExpiringListRecord): ExpirationExtensionRuntimeData {
  const now = new Date();
  const future = shiftDays(now, FUTURE_DATE_OFFSET_DAYS);
  const past = shiftDays(now, PAST_DATE_OFFSET_DAYS);
  const lastOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return {
    TEST_EXPIRING_RECORD_IDENTIFIER: record.email,
    TEST_EXTENSION_CURRENT_DATE: toIsoDate(now),
    TEST_EXTENSION_FUTURE_DATE: toIsoDate(future),
    TEST_EXTENSION_PAST_DATE: toIsoDate(past),
    TEST_EXTENSION_MONTH_BOUNDARY_DATE: toIsoDate(lastOfMonth),
    TEST_EXPIRATION_EXTENSION_DAYS: '365',
    TEST_EXPIRATION_EXTENSION_MIN_DAYS: '1',
    TEST_EXPIRATION_EXTENSION_LARGE_DAYS: '999999',
  };
}

export function recordMatchesValue(record: ExpiringListRecord, value: string): boolean {
  const needle = value.trim().toLowerCase();
  return [record.name, record.email, record.hardwareId, record.profile].some((field) =>
    field.toLowerCase().includes(needle),
  );
}

export function isSameRecord(left: ExpiringListRecord, right: ExpiringListRecord): boolean {
  return left.email === right.email && left.hardwareId === right.hardwareId && left.profile === right.profile;
}

export function getSpecialCharacterSearchValues(): ExpiringSpecialCharacterValues {
  return {
    TEST_SPECIAL_HYPHEN: '-',
    TEST_SPECIAL_UNDERSCORE: '_',
    TEST_SPECIAL_AT_SIGN: '@',
    TEST_SPECIAL_PERIOD: '.',
    TEST_SPECIAL_APOSTROPHE: "'",
  };
}

export function getWhitespaceSearchValues(value: string): ExpiringWhitespaceValues {
  return {
    TEST_LEADING_WHITESPACE_VALUE: ` ${value}`,
    TEST_TRAILING_WHITESPACE_VALUE: `${value} `,
    TEST_PADDED_WHITESPACE_VALUE: ` ${value} `,
    TEST_SPACES_ONLY_VALUE: '   ',
  };
}

export function recordKeys(records: ExpiringListRecord[]): string[] {
  return records.map((r) => [r.email, r.hardwareId, r.profile].join('|'));
}

export function countUniqueRecords(records: ExpiringListRecord[]): number {
  return new Set(records.map((r) => [r.name, r.email, r.hardwareId, r.profile].join('|'))).size;
}

export function getRequiredEnvValue(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Required environment variable "${key}" is not set`);
  }
  return value;
}

export function getEFCCombinedRuntimeData(): EFCCombinedRuntimeData {
  const today = new Date();
  const first = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
  const second = new Date(today.getFullYear() - 1, today.getMonth(), 15);
  return {
    TEST_EFC_COMBINATION_DATE: toIsoDate(first),
    TEST_EFC_COMBINATION_SECOND_DATE: toIsoDate(second),
    TEST_EFC_SEARCH_NO_MATCH: `zzqx-no-match-${Date.now().toString(36)}`,
    TEST_EFC_SEARCH_MIXED_CASE: 'TeStQuErY',
    TEST_EFC_SEARCH_SPACED_VALUE: 'spaced value',
  };
}
