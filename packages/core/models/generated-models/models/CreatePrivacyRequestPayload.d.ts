import type { DataSubjectPayload } from './DataSubjectPayload.js';
import type { PrivacyRequestDemand } from './PrivacyRequestDemand.js';
export type CreatePrivacyRequestPayload = {
    target?: CreatePrivacyRequestPayload.target;
    email?: string;
    demands?: Array<PrivacyRequestDemand>;
    data_subject?: Array<DataSubjectPayload>;
};
export declare namespace CreatePrivacyRequestPayload {
    enum target {
        _ = "*",
        ORGANIZATION = "ORGANIZATION",
        SYSTEM = "SYSTEM",
        PARTNERS = "PARTNERS",
        PARTNERS_DOWNWARD = "PARTNERS.DOWNWARD",
        PARTNERS_UPWARD = "PARTNERS.UPWARD"
    }
}
