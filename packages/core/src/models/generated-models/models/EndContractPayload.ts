/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DataSubjectPayload } from './DataSubjectPayload.js';

export type EndContractPayload = {
  dataSubject: DataSubjectPayload;
  contractId: string;
  date: string;
};
