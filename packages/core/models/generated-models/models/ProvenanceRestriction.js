/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
var ProvenanceRestriction;
(function (ProvenanceRestriction) {
    (function (term) {
        term["_"] = "*";
        term["DERIVED"] = "DERIVED";
        term["TRANSFERRED"] = "TRANSFERRED";
        term["USER"] = "USER";
        term["USER_DATA_SUBJECT"] = "USER.DATA-SUBJECT";
    })(ProvenanceRestriction.term || (ProvenanceRestriction.term = {}));
    (function (target) {
        target["_"] = "*";
        target["ORGANIZATION"] = "ORGANIZATION";
        target["SYSTEM"] = "SYSTEM";
        target["PARTNERS"] = "PARTNERS";
        target["PARTNERS_DOWNWARD"] = "PARTNERS.DOWNWARD";
        target["PARTNERS_UPWARD"] = "PARTNERS.UPWARD";
    })(ProvenanceRestriction.target || (ProvenanceRestriction.target = {}));
})(ProvenanceRestriction = ProvenanceRestriction || (ProvenanceRestriction = {}));

export { ProvenanceRestriction };
//# sourceMappingURL=ProvenanceRestriction.js.map
