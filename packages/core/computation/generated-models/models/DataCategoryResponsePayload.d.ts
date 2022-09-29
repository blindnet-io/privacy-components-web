import type { Provenance } from './Provenance.js';
import type { RetentionPolicy } from './RetentionPolicy.js';
export declare type DataCategoryResponsePayload = {
    data_category: string;
    provenances?: Array<Provenance>;
    retention_policies?: Array<RetentionPolicy>;
};
