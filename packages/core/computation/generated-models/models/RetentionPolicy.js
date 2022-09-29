/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
var RetentionPolicy;
(function (RetentionPolicy) {
    (function (policy_type) {
        policy_type["NO_LONGER_THAN"] = "NO-LONGER-THAN";
        policy_type["NO_LESS_THAN"] = "NO-LESS-THAN";
    })(RetentionPolicy.policy_type || (RetentionPolicy.policy_type = {}));
    (function (after) {
        after["CAPTURE_DATE"] = "CAPTURE-DATE";
        after["RELATIONSHIP_START"] = "RELATIONSHIP-START";
        after["RELATIONSHIP_END"] = "RELATIONSHIP-END";
        after["SERVICE_START"] = "SERVICE-START";
        after["SERVICE_END"] = "SERVICE-END";
    })(RetentionPolicy.after || (RetentionPolicy.after = {}));
})(RetentionPolicy || (RetentionPolicy = {}));

export { RetentionPolicy };
//# sourceMappingURL=RetentionPolicy.js.map
