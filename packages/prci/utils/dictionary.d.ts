/**
 * Mapping of PRIV Actions to corresponding titles.
 */
export declare const ACTION_TITLES: {
    ACCESS: () => string;
    DELETE: () => string;
    MODIFY: () => string;
    OBJECT: () => string;
    PORTABILITY: () => string;
    RESTRICT: () => string;
    'REVOKE-CONSENT': () => string;
    TRANSPARENCY: () => string;
    'TRANSPARENCY.DATA-CATEGORIES': () => string;
    'TRANSPARENCY.DPO': () => string;
    'TRANSPARENCY.KNOWN': () => string;
    'TRANSPARENCY.LEGAL-BASES': () => string;
    'TRANSPARENCY.ORGANIZATION': () => string;
    'TRANSPARENCY.POLICY': () => string;
    'TRANSPARENCY.PROCESSING-CATEGORIES': () => string;
    'TRANSPARENCY.PROVENANCE': () => string;
    'TRANSPARENCY.PURPOSE': () => string;
    'TRANSPARENCY.RETENTION': () => string;
    'TRANSPARENCY.WHERE': () => string;
    'TRANSPARENCY.WHO': () => string;
    OTHER: () => string;
};
/**
 * Mapping of PRIV Actions to corresponding titles.
 */
export declare const ACTION_TITLES_WITH_DEMAND: {
    ACCESS: () => string;
    DELETE: () => string;
    MODIFY: () => string;
    OBJECT: () => string;
    PORTABILITY: () => string;
    RESTRICT: () => string;
    'REVOKE-CONSENT': () => string;
    TRANSPARENCY: () => string;
    'TRANSPARENCY.DATA-CATEGORIES': () => string;
    'TRANSPARENCY.DPO': () => string;
    'TRANSPARENCY.KNOWN': () => string;
    'TRANSPARENCY.LEGAL-BASES': () => string;
    'TRANSPARENCY.ORGANIZATION': () => string;
    'TRANSPARENCY.POLICY': () => string;
    'TRANSPARENCY.PROCESSING-CATEGORIES': () => string;
    'TRANSPARENCY.PROVENANCE': () => string;
    'TRANSPARENCY.PURPOSE': () => string;
    'TRANSPARENCY.RETENTION': () => string;
    'TRANSPARENCY.WHERE': () => string;
    'TRANSPARENCY.WHO': () => string;
    OTHER: () => string;
};
/**
 * Mapping of PRIV Actions to corresponding descriptions.
 */
export declare const ACTION_DESCRIPTIONS: {
    ACCESS: () => string;
    DELETE: () => string;
    MODIFY: () => string;
    OBJECT: () => string;
    PORTABILITY: () => string;
    RESTRICT: () => string;
    'REVOKE-CONSENT': () => string;
    TRANSPARENCY: () => string;
    OTHER: () => string;
    'TRANSPARENCY.DATA-CATEGORIES': () => string;
    'TRANSPARENCY.DPO': () => string;
    'TRANSPARENCY.KNOWN': () => string;
    'TRANSPARENCY.LEGAL-BASES': () => string;
    'TRANSPARENCY.ORGANIZATION': () => string;
    'TRANSPARENCY.POLICY': () => string;
    'TRANSPARENCY.PROCESSING-CATEGORIES': () => string;
    'TRANSPARENCY.PROVENANCE': () => string;
    'TRANSPARENCY.PURPOSE': () => string;
    'TRANSPARENCY.RETENTION': () => string;
    'TRANSPARENCY.WHERE': () => string;
    'TRANSPARENCY.WHO': () => string;
};
export declare const TRANSPARENCY_ACTION_DESCRIPTIONS: {
    TRANSPARENCY: () => import("lit-html").TemplateResult<1 | 2>;
    OTHER: () => string;
    'TRANSPARENCY.DATA-CATEGORIES': () => string;
    'TRANSPARENCY.DPO': () => string;
    'TRANSPARENCY.KNOWN': () => string;
    'TRANSPARENCY.LEGAL-BASES': () => string;
    'TRANSPARENCY.ORGANIZATION': () => string;
    'TRANSPARENCY.POLICY': () => string;
    'TRANSPARENCY.PROCESSING-CATEGORIES': () => string;
    'TRANSPARENCY.PROVENANCE': () => string;
    'TRANSPARENCY.PURPOSE': () => string;
    'TRANSPARENCY.RETENTION': () => string;
    'TRANSPARENCY.WHERE': () => string;
    'TRANSPARENCY.WHO': () => string;
};
export declare const PROVENANCE_TITLES: {
    '*': () => string;
    USER: () => string;
    'USER.DATA-SUBJECT': () => string;
    DERIVED: () => string;
    TRANSFERRED: () => string;
};
export declare const PROVENANCE_DESCRIPTIONS: {
    '*': () => string;
    USER: () => string;
    'USER.DATA-SUBJECT': () => string;
    DERIVED: () => string;
    TRANSFERRED: () => string;
};
export declare const PROVENANCE_DESCRIPTIONS_STATUS_VIEW: {
    '*': () => string;
    USER: () => string;
    'USER.DATA-SUBJECT': () => string;
    DERIVED: () => string;
    TRANSFERRED: () => string;
};
export declare const DATA_CATEGORY_TITLES: {
    '*': () => string;
    AFFILIATION: () => string;
    'AFFILIATION.MEMBERSHIP': () => string;
    'AFFILIATION.MEMBERSHIP.UNION': () => string;
    'AFFILIATION.SCHOOL': () => string;
    'AFFILIATION.WORKPLACE': () => string;
    BEHAVIOR: () => string;
    'BEHAVIOR.ACTIVITY': () => string;
    'BEHAVIOR.CONNECTION': () => string;
    'BEHAVIOR.PREFERENCE': () => string;
    'BEHAVIOR.TELEMETRY': () => string;
    BIOMETRIC: () => string;
    CONTACT: () => string;
    'CONTACT.EMAIL': () => string;
    'CONTACT.ADDRESS': () => string;
    'CONTACT.PHONE': () => string;
    DEMOGRAPHIC: () => string;
    'DEMOGRAPHIC.AGE': () => string;
    'DEMOGRAPHIC.BELIEFS': () => string;
    'DEMOGRAPHIC.GENDER': () => string;
    'DEMOGRAPHIC.ORIGIN': () => string;
    'DEMOGRAPHIC.RACE': () => string;
    'DEMOGRAPHIC.SEXUAL-ORIENTATION': () => string;
    DEVICE: () => string;
    FINANCIAL: () => string;
    'FINANCIAL.BANK-ACCOUNT': () => string;
    GENETIC: () => string;
    HEALTH: () => string;
    IMAGE: () => string;
    LOCATION: () => string;
    NAME: () => string;
    PROFILING: () => string;
    RELATIONSHIPS: () => string;
    UID: () => string;
    'UID.ID': () => string;
    'UID.IP': () => string;
    'UID.USER-ACCOUNT': () => string;
    'UID.SOCIAL-MEDIA': () => string;
    'OTHER-DATA': () => string;
    'OTHER-DATA.PROOF': () => string;
};
export declare const DATA_CATEGORY_TITLES_WITH_DATA: {
    '*': () => string;
    AFFILIATION: () => string;
    'AFFILIATION.MEMBERSHIP': () => string;
    'AFFILIATION.MEMBERSHIP.UNION': () => string;
    'AFFILIATION.SCHOOL': () => string;
    'AFFILIATION.WORKPLACE': () => string;
    BEHAVIOR: () => string;
    'BEHAVIOR.ACTIVITY': () => string;
    'BEHAVIOR.CONNECTION': () => string;
    'BEHAVIOR.PREFERENCE': () => string;
    'BEHAVIOR.TELEMETRY': () => string;
    BIOMETRIC: () => string;
    CONTACT: () => string;
    'CONTACT.EMAIL': () => string;
    'CONTACT.ADDRESS': () => string;
    'CONTACT.PHONE': () => string;
    DEMOGRAPHIC: () => string;
    'DEMOGRAPHIC.AGE': () => string;
    'DEMOGRAPHIC.BELIEFS': () => string;
    'DEMOGRAPHIC.GENDER': () => string;
    'DEMOGRAPHIC.ORIGIN': () => string;
    'DEMOGRAPHIC.RACE': () => string;
    'DEMOGRAPHIC.SEXUAL-ORIENTATION': () => string;
    DEVICE: () => string;
    FINANCIAL: () => string;
    'FINANCIAL.BANK-ACCOUNT': () => string;
    GENETIC: () => string;
    HEALTH: () => string;
    IMAGE: () => string;
    LOCATION: () => string;
    NAME: () => string;
    PROFILING: () => string;
    RELATIONSHIPS: () => string;
    UID: () => string;
    'UID.ID': () => string;
    'UID.IP': () => string;
    'UID.USER-ACCOUNT': () => string;
    'UID.SOCIAL-MEDIA': () => string;
    'OTHER-DATA': () => string;
    'OTHER-DATA.PROOF': () => string;
};
export declare const DATA_CATEGORY_DESCRIPTIONS: {
    '*': () => import("lit-html").TemplateResult<1 | 2>;
    AFFILIATION: () => import("lit-html").TemplateResult<1 | 2>;
    'AFFILIATION.MEMBERSHIP': () => import("lit-html").TemplateResult<1 | 2>;
    'AFFILIATION.MEMBERSHIP.UNION': () => import("lit-html").TemplateResult<1 | 2>;
    'AFFILIATION.SCHOOL': () => import("lit-html").TemplateResult<1 | 2>;
    'AFFILIATION.WORKPLACE': () => import("lit-html").TemplateResult<1 | 2>;
    BEHAVIOR: () => import("lit-html").TemplateResult<1 | 2>;
    'BEHAVIOR.ACTIVITY': () => import("lit-html").TemplateResult<1 | 2>;
    'BEHAVIOR.CONNECTION': () => import("lit-html").TemplateResult<1 | 2>;
    'BEHAVIOR.PREFERENCE': () => import("lit-html").TemplateResult<1 | 2>;
    'BEHAVIOR.TELEMETRY': () => import("lit-html").TemplateResult<1 | 2>;
    BIOMETRIC: () => import("lit-html").TemplateResult<1 | 2>;
    CONTACT: () => import("lit-html").TemplateResult<1 | 2>;
    'CONTACT.EMAIL': () => import("lit-html").TemplateResult<1 | 2>;
    'CONTACT.ADDRESS': () => import("lit-html").TemplateResult<1 | 2>;
    'CONTACT.PHONE': () => import("lit-html").TemplateResult<1 | 2>;
    DEMOGRAPHIC: () => import("lit-html").TemplateResult<1 | 2>;
    'DEMOGRAPHIC.AGE': () => import("lit-html").TemplateResult<1 | 2>;
    'DEMOGRAPHIC.BELIEFS': () => import("lit-html").TemplateResult<1 | 2>;
    'DEMOGRAPHIC.GENDER': () => import("lit-html").TemplateResult<1 | 2>;
    'DEMOGRAPHIC.ORIGIN': () => import("lit-html").TemplateResult<1 | 2>;
    'DEMOGRAPHIC.RACE': () => import("lit-html").TemplateResult<1 | 2>;
    'DEMOGRAPHIC.SEXUAL-ORIENTATION': () => import("lit-html").TemplateResult<1 | 2>;
    DEVICE: () => import("lit-html").TemplateResult<1 | 2>;
    FINANCIAL: () => import("lit-html").TemplateResult<1 | 2>;
    'FINANCIAL.BANK-ACCOUNT': () => import("lit-html").TemplateResult<1 | 2>;
    GENETIC: () => import("lit-html").TemplateResult<1 | 2>;
    HEALTH: () => import("lit-html").TemplateResult<1 | 2>;
    IMAGE: () => import("lit-html").TemplateResult<1 | 2>;
    LOCATION: () => import("lit-html").TemplateResult<1 | 2>;
    NAME: () => import("lit-html").TemplateResult<1 | 2>;
    PROFILING: () => import("lit-html").TemplateResult<1 | 2>;
    RELATIONSHIPS: () => import("lit-html").TemplateResult<1 | 2>;
    UID: () => import("lit-html").TemplateResult<1 | 2>;
    'UID.ID': () => import("lit-html").TemplateResult<1 | 2>;
    'UID.IP': () => import("lit-html").TemplateResult<1 | 2>;
    'UID.USER-ACCOUNT': () => import("lit-html").TemplateResult<1 | 2>;
    'UID.SOCIAL-MEDIA': () => import("lit-html").TemplateResult<1 | 2>;
    'OTHER-DATA': () => import("lit-html").TemplateResult<1 | 2>;
};
export declare const TARGET_DESCRIPTIONS: {
    '*': () => import("lit-html").TemplateResult<1 | 2>;
    SYSTEM: () => import("lit-html").TemplateResult<1 | 2>;
    ORGANIZATION: () => import("lit-html").TemplateResult<1 | 2>;
    PARTNERS: () => import("lit-html").TemplateResult<1 | 2>;
    'PARTNERS.DOWNWARD': () => import("lit-html").TemplateResult<1 | 2>;
    'PARTNERS.UPWARD': () => import("lit-html").TemplateResult<1 | 2>;
};
export declare const STATUS_DESCRIPTIONS: {
    IN_PROCESSING: () => import("lit-html").TemplateResult<1 | 2>;
    PARTIALLY_COMPLETED: () => import("lit-html").TemplateResult<1 | 2>;
    COMPLETED: () => import("lit-html").TemplateResult<1 | 2>;
    CANCELED: () => import("lit-html").TemplateResult<1 | 2>;
};
export declare const DEMAND_STATUS_DESCRIPTIONS: {
    GRANTED: () => string;
    DENIED: () => string;
    'PARTIALLY-GRANTED': () => string;
    'UNDER-REVIEW': () => string;
    CANCELED: () => string;
};
export declare const POLICY_TYPE_TITLES: {
    'NO-LONGER-THAN': () => string;
    'NO-LESS-THAN': () => string;
};
export declare const AFTER_TITLES: {
    'CAPTURE-DATE': () => string;
    'RELATIONSHIP-START': () => string;
    'RELATIONSHIP-END': () => string;
    'SERVICE-START': () => string;
    'SERVICE-END': () => string;
};
export declare const PROCESSING_CATEGORIES: {
    '*': () => string;
    ANONYMIZATION: () => string;
    'AUTOMATED-INFERENCE': () => string;
    'AUTOMATED-DECISION-MAKING': () => string;
    COLLECTION: () => string;
    GENERATING: () => string;
    PUBLISHING: () => string;
    STORING: () => string;
    SHARING: () => string;
    USING: () => string;
    'OTHER-PROCESSING': () => string;
};
export declare const PROCESSING_CATEGORY_DESCRIPTIONS: {
    '*': () => import("lit-html").TemplateResult<1 | 2>;
    ANONYMIZATION: () => string;
    'AUTOMATED-INFERENCE': () => string;
    'AUTOMATED-DECISION-MAKING': () => string;
    COLLECTION: () => string;
    GENERATING: () => string;
    MATCHING: () => string;
    PUBLISHING: () => string;
    STORING: () => string;
    SHARING: () => string;
    USING: () => string;
    'OTHER-PROCESSING': () => string;
};
export declare const PURPOSES: {
    '*': () => string;
    ADVERTISING: () => string;
    COMPLIANCE: () => string;
    EMPLOYMENT: () => string;
    JUSTICE: () => string;
    MARKETING: () => string;
    MEDICAL: () => string;
    PERSONALIZATION: () => string;
    'PUBLIC-INTERESTS': () => string;
    RESEARCH: () => string;
    SALE: () => string;
    SECURITY: () => string;
    SERVICES: () => string;
    'SERVICES.ADDITIONAL-SERVICES': () => string;
    'SERVICES.BASIC-SERVICE': () => string;
    'SOCIAL-PROTECTION': () => string;
    TRACKING: () => string;
    'VITAL-INTERESTS': () => string;
    'OTHER-PURPOSE': () => string;
};
export declare const PURPOSE_DESCRIPTIONS: {
    '*': () => import("lit-html").TemplateResult<1 | 2>;
    ADVERTISING: () => string;
    COMPLIANCE: () => string;
    EMPLOYMENT: () => string;
    JUSTICE: () => string;
    MARKETING: () => string;
    MEDICAL: () => string;
    PERSONALIZATION: () => string;
    'PUBLIC-INTERESTS': () => string;
    RESEARCH: () => string;
    SALE: () => string;
    SECURITY: () => string;
    SERVICES: () => string;
    'SERVICES.ADDITIONAL-SERVICES': () => string;
    'SERVICES.BASIC-SERVICE': () => string;
    'SOCIAL-PROTECTION': () => string;
    TRACKING: () => string;
    'VITAL-INTERESTS': () => string;
    'OTHER-PURPOSE': () => string;
};
