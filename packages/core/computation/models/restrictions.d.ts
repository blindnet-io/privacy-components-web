import { DATA_CATEGORY, PROCESSING_CATEGORY, PROVENANCE, PURPOSE, TARGET } from './priv-terms.js';
interface PrivacyScopeRestriction {
    dc: DATA_CATEGORY;
    pc: PROCESSING_CATEGORY;
    pp: PURPOSE;
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
    privacy_scope?: PrivacyScopeRestriction[];
    consent?: ConsentRestriction;
    date_range?: DateRangeRestriction;
    provenance?: ProvenanceRestriction;
    data_reference?: DataReferenceRestriction;
}
export {};
