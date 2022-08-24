/* eslint-disable camelcase */
import {
  DATA_CATEGORY,
  PROCESSING_CATEGORY,
  PROVENANCE,
  PURPOSE,
  TARGET,
} from './priv-terms.js';

interface PrivacyScopeRestriction {
  dc?: Set<DATA_CATEGORY>;
  pc?: Set<PROCESSING_CATEGORY>;
  pp?: Set<PURPOSE>;
}

interface ConsentRestriction {
  id: string;
}

interface DateRangeRestriction {
  from?: Date;
  to?: Date;
}

interface ProvenanceRestriction {
  term: PROVENANCE;
  target?: TARGET;
}

interface DataReferenceRestriction {
  ref: string;
}

export interface Restrictions {
  privacy_scope?: PrivacyScopeRestriction;
  consent?: ConsentRestriction;
  date_range?: DateRangeRestriction;
  provenance?: ProvenanceRestriction;
  data_reference?: DataReferenceRestriction;
}
