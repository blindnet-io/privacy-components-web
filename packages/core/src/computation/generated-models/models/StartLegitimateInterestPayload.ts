/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DataSubjectPayload } from './DataSubjectPayload.js';

export type StartLegitimateInterestPayload = {
  dataSubject: DataSubjectPayload;
  legitimateInterestId: string;
  date: string;
};
