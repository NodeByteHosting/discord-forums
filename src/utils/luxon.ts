import { Settings } from 'luxon';

/**
 * Always fail on invalid dates to avoid silent errors 
 * and the returning types including `null`
 */
Settings.throwOnInvalid = true;

/**
 * Re-export all Luxon modules
 */
export * from 'luxon';

/**
 * Extend the Luxon module to include the `throwOnInvalid` setting
 * @see https://github.com/DefinitelyTyped/DefinitelyTyped/pull/64995
 */
declare module 'luxon' {
  export interface TSSettings {
    throwOnInvalid: true;
  }
}