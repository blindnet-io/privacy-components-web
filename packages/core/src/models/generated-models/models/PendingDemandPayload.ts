/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DataSubjectPayload } from './DataSubjectPayload.js';

export type PendingDemandPayload = {
  id: string;
  date: string;
  action: PendingDemandPayload.action;
  data_subject?: DataSubjectPayload;
};

export namespace PendingDemandPayload {
  export enum action {
    ACCESS = 'ACCESS',
    DELETE = 'DELETE',
    MODIFY = 'MODIFY',
    OBJECT = 'OBJECT',
    PORTABILITY = 'PORTABILITY',
    RESTRICT = 'RESTRICT',
    REVOKE_CONSENT = 'REVOKE-CONSENT',
    TRANSPARENCY = 'TRANSPARENCY',
    TRANSPARENCY_DATA_CATEGORIES = 'TRANSPARENCY.DATA-CATEGORIES',
    TRANSPARENCY_DPO = 'TRANSPARENCY.DPO',
    TRANSPARENCY_KNOWN = 'TRANSPARENCY.KNOWN',
    TRANSPARENCY_LEGAL_BASES = 'TRANSPARENCY.LEGAL-BASES',
    TRANSPARENCY_ORGANIZATION = 'TRANSPARENCY.ORGANIZATION',
    TRANSPARENCY_POLICY = 'TRANSPARENCY.POLICY',
    TRANSPARENCY_PROCESSING_CATEGORIES = 'TRANSPARENCY.PROCESSING-CATEGORIES',
    TRANSPARENCY_PROVENANCE = 'TRANSPARENCY.PROVENANCE',
    TRANSPARENCY_PURPOSE = 'TRANSPARENCY.PURPOSE',
    TRANSPARENCY_RETENTION = 'TRANSPARENCY.RETENTION',
    TRANSPARENCY_WHERE = 'TRANSPARENCY.WHERE',
    TRANSPARENCY_WHO = 'TRANSPARENCY.WHO',
    OTHER = 'OTHER-DEMAND',
  }
}
