/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DataSubjectPayload } from './DataSubjectPayload.js';

export type GiveConsentUnsafePayload = {
  consent_id: string;
  app_id: string;
  data_subject: DataSubjectPayload;
};
