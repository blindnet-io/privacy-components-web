/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ConsentRestriction } from './ConsentRestriction.js';
import type { DataReferenceRestriction } from './DataReferenceRestriction.js';
import type { DateRangeRestriction } from './DateRangeRestriction.js';
import type { PrivacyScopeRestriction } from './PrivacyScopeRestriction.js';
import type { ProvenanceRestriction } from './ProvenanceRestriction.js';

export type Restrictions = {
  privacy_scope?: Array<PrivacyScopeRestriction>;
  consent?: ConsentRestriction;
  date_range?: DateRangeRestriction;
  provenance?: ProvenanceRestriction;
  data_reference?: DataReferenceRestriction;
};
