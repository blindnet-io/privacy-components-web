export declare type PrivacyResponsePayload = {
    demand_id: string;
    date: string;
    requested_action: PrivacyResponsePayload.requested_action;
    status: PrivacyResponsePayload.status;
    motive?: PrivacyResponsePayload.motive;
    answer?: any;
    message?: string;
    lang?: string;
    includes?: Array<any>;
    data?: string;
};
export declare namespace PrivacyResponsePayload {
    enum requested_action {
        ACCESS = "ACCESS",
        DELETE = "DELETE",
        MODIFY = "MODIFY",
        OBJECT = "OBJECT",
        PORTABILITY = "PORTABILITY",
        RESTRICT = "RESTRICT",
        REVOKE_CONSENT = "REVOKE-CONSENT",
        TRANSPARENCY = "TRANSPARENCY",
        TRANSPARENCY_DATA_CATEGORIES = "TRANSPARENCY.DATA-CATEGORIES",
        TRANSPARENCY_DPO = "TRANSPARENCY.DPO",
        TRANSPARENCY_KNOWN = "TRANSPARENCY.KNOWN",
        TRANSPARENCY_LEGAL_BASES = "TRANSPARENCY.LEGAL-BASES",
        TRANSPARENCY_ORGANIZATION = "TRANSPARENCY.ORGANIZATION",
        TRANSPARENCY_POLICY = "TRANSPARENCY.POLICY",
        TRANSPARENCY_PROCESSING_CATEGORIES = "TRANSPARENCY.PROCESSING-CATEGORIES",
        TRANSPARENCY_PROVENANCE = "TRANSPARENCY.PROVENANCE",
        TRANSPARENCY_PURPOSE = "TRANSPARENCY.PURPOSE",
        TRANSPARENCY_RETENTION = "TRANSPARENCY.RETENTION",
        TRANSPARENCY_WHERE = "TRANSPARENCY.WHERE",
        TRANSPARENCY_WHO = "TRANSPARENCY.WHO",
        OTHER = "OTHER"
    }
    enum status {
        GRANTED = "GRANTED",
        DENIED = "DENIED",
        PARTIALLY_GRANTED = "PARTIALLY-GRANTED",
        UNDER_REVIEW = "UNDER-REVIEW",
        CANCELED = "CANCELED"
    }
    enum motive {
        IDENTITY_UNCONFIRMED = "IDENTITY-UNCONFIRMED",
        LANGUAGE_UNSUPPORTED = "LANGUAGE-UNSUPPORTED",
        VALID_REASONS = "VALID-REASONS",
        IMPOSSIBLE = "IMPOSSIBLE",
        NO_SUCH_DATA = "NO-SUCH-DATA",
        REQUEST_UNSUPPORTED = "REQUEST-UNSUPPORTED",
        USER_UNKNOWN = "USER-UNKNOWN",
        OTHER_MOTIVE = "OTHER-MOTIVE"
    }
}
