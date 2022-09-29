/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DataSubjectPayload } from './DataSubjectPayload.js';

export type GiveConsentPayload = {
  dataSubject: DataSubjectPayload;
  consentId: string;
  date: string;
};
