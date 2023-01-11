/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PrivacyRequestEventDemand } from './PrivacyRequestEventDemand.js';

export type PrivacyRequestEvent = {
  id: string;
  date: string;
  target: PrivacyRequestEvent.target;
  demands?: Array<PrivacyRequestEventDemand>;
};

export namespace PrivacyRequestEvent {
  export enum target {
    _ = '*',
    ORGANIZATION = 'ORGANIZATION',
    SYSTEM = 'SYSTEM',
    PARTNERS = 'PARTNERS',
    PARTNERS_DOWNWARD = 'PARTNERS.DOWNWARD',
    PARTNERS_UPWARD = 'PARTNERS.UPWARD',
  }
}
