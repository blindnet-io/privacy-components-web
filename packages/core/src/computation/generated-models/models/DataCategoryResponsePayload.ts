/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Provenance } from './Provenance.js';
import type { RetentionPolicy } from './RetentionPolicy.js';

export type DataCategoryResponsePayload = {
  data_category: string;
  provenances?: Array<Provenance>;
  retention_policies?: Array<RetentionPolicy>;
};
