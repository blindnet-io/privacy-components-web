/* eslint-disable camelcase */
// Schemas for the PrivacyResponsePayload.answer field which we cannot generate

import { LegalBase, Provenance, RetentionPolicy } from './index.js';

export namespace PrivacyResponseAnswer {
  export type TRANSPARENCY_DATA_CATEGORIES = string[];
  export type TRANSPARENCY_DPO = string;
  export type TRANSPARENCY_KNOWN = 'YES' | 'NO';
  export type TRANSPARENCY_LEGAL_BASES = {
    id: string;
    lb_type: LegalBase.lb_type;
    name: string;
    description: string;
    active: boolean;
  }[];
  export type TRANSPARENCY_ORGANIZATION = string;
  export type TRANSPARENCY_POLICY = string;
  export type TRANSPARENCY_PROCESSING_CATEGORIES = string[];
  export type TRANSPARENCY_PROVENANCE = {
    [data_category: string]: Provenance[];
  };
  export type TRANSPARENCY_PURPOSE = string[];
  export type TRANSPARENCY_RETENTION = {
    [data_category: string]: RetentionPolicy[];
  };
  export type TRANSPARENCY_WHERE = string[];
  export type TRANSPARENCY_WHO = string[];
}
