import type { ScopePayload } from './ScopePayload.js';
export declare type CreateLegalBasePayload = {
    /**
     * type of the legal base
     */
    lb_type: CreateLegalBasePayload.lb_type;
    /**
     * legal base name
     */
    name?: string;
    /**
     * legal base description
     */
    description?: string;
    /**
     * privacy scope of the legal base
     */
    scope?: Array<ScopePayload>;
};
export declare namespace CreateLegalBasePayload {
    /**
     * type of the legal base
     */
    enum lb_type {
        CONTRACT = "CONTRACT",
        CONSENT = "CONSENT",
        LEGITIMATE_INTEREST = "LEGITIMATE-INTEREST",
        NECESSARY = "NECESSARY",
        NECESSARY_LEGAL_OBLIGATION = "NECESSARY.LEGAL-OBLIGATION",
        NECESSARY_PUBLIC_INTEREST = "NECESSARY.PUBLIC-INTEREST",
        NECESSARY_VITAL_INTEREST = "NECESSARY.VITAL-INTEREST",
        OTHER_LEGAL_BASE = "OTHER-LEGAL-BASE"
    }
}
