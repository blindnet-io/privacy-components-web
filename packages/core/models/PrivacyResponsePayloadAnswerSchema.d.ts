import { LegalBase, Provenance, RetentionPolicy } from './index.js';
export declare namespace PrivacyResponseAnswer {
    type TRANSPARENCY_DATA_CATEGORIES = string[];
    type TRANSPARENCY_DPO = string;
    type TRANSPARENCY_KNOWN = 'YES' | 'NO';
    type TRANSPARENCY_LEGAL_BASES = {
        id: string;
        lb_type: LegalBase.lb_type;
        name: string;
        description: string;
        active: boolean;
    }[];
    type TRANSPARENCY_ORGANIZATION = string;
    type TRANSPARENCY_POLICY = string;
    type TRANSPARENCY_PROCESSING_CATEGORIES = string[];
    type TRANSPARENCY_PROVENANCE = {
        [data_category: string]: Provenance[];
    };
    type TRANSPARENCY_PURPOSE = string[];
    type TRANSPARENCY_RETENTION = {
        [data_category: string]: RetentionPolicy[];
    };
    type TRANSPARENCY_WHERE = string[];
    type TRANSPARENCY_WHO = string[];
}
