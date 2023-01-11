/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PrivacyScope } from './PrivacyScope.js';

export type LegalBaseEvent = {
  id: string;
  date: string;
  event: LegalBaseEvent.event;
  type: LegalBaseEvent.type;
  name?: string;
  scope: PrivacyScope;
};

export namespace LegalBaseEvent {
  export enum event {
    CAPTURE_DATE = 'CAPTURE-DATE',
    RELATIONSHIP_START = 'RELATIONSHIP-START',
    RELATIONSHIP_END = 'RELATIONSHIP-END',
    SERVICE_START = 'SERVICE-START',
    SERVICE_END = 'SERVICE-END',
  }

  export enum type {
    CONTRACT = 'CONTRACT',
    CONSENT = 'CONSENT',
    LEGITIMATE_INTEREST = 'LEGITIMATE-INTEREST',
    NECESSARY = 'NECESSARY',
    NECESSARY_LEGAL_OBLIGATION = 'NECESSARY.LEGAL-OBLIGATION',
    NECESSARY_PUBLIC_INTEREST = 'NECESSARY.PUBLIC-INTEREST',
    NECESSARY_VITAL_INTEREST = 'NECESSARY.VITAL-INTEREST',
    OTHER_LEGAL_BASE = 'OTHER-LEGAL-BASE',
  }
}
