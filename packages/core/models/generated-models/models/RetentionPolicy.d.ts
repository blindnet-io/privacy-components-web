export type RetentionPolicy = {
    id: string;
    policy_type: RetentionPolicy.policy_type;
    duration: string;
    after: RetentionPolicy.after;
};
export declare namespace RetentionPolicy {
    enum policy_type {
        NO_LONGER_THAN = "NO-LONGER-THAN",
        NO_LESS_THAN = "NO-LESS-THAN"
    }
    enum after {
        CAPTURE_DATE = "CAPTURE-DATE",
        RELATIONSHIP_START = "RELATIONSHIP-START",
        RELATIONSHIP_END = "RELATIONSHIP-END",
        SERVICE_START = "SERVICE-START",
        SERVICE_END = "SERVICE-END"
    }
}
