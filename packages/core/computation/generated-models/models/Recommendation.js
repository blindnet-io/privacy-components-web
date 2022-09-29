/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
var Recommendation;
(function (Recommendation) {
    (function (status) {
        status["GRANTED"] = "GRANTED";
        status["DENIED"] = "DENIED";
        status["PARTIALLY_GRANTED"] = "PARTIALLY-GRANTED";
        status["UNDER_REVIEW"] = "UNDER-REVIEW";
        status["CANCELED"] = "CANCELED";
    })(Recommendation.status || (Recommendation.status = {}));
    (function (motive) {
        motive["IDENTITY_UNCONFIRMED"] = "IDENTITY-UNCONFIRMED";
        motive["LANGUAGE_UNSUPPORTED"] = "LANGUAGE-UNSUPPORTED";
        motive["VALID_REASONS"] = "VALID-REASONS";
        motive["IMPOSSIBLE"] = "IMPOSSIBLE";
        motive["NO_SUCH_DATA"] = "NO-SUCH-DATA";
        motive["REQUEST_UNSUPPORTED"] = "REQUEST-UNSUPPORTED";
        motive["USER_UNKNOWN"] = "USER-UNKNOWN";
        motive["OTHER_MOTIVE"] = "OTHER-MOTIVE";
    })(Recommendation.motive || (Recommendation.motive = {}));
    (function (provenance) {
        provenance["_"] = "*";
        provenance["DERIVED"] = "DERIVED";
        provenance["TRANSFERRED"] = "TRANSFERRED";
        provenance["USER"] = "USER";
        provenance["USER_DATA_SUBJECT"] = "USER.DATA-SUBJECT";
    })(Recommendation.provenance || (Recommendation.provenance = {}));
    (function (target) {
        target["_"] = "*";
        target["ORGANIZATION"] = "ORGANIZATION";
        target["SYSTEM"] = "SYSTEM";
        target["PARTNERS"] = "PARTNERS";
        target["PARTNERS_DOWNWARD"] = "PARTNERS.DOWNWARD";
        target["PARTNERS_UPWARD"] = "PARTNERS.UPWARD";
    })(Recommendation.target || (Recommendation.target = {}));
})(Recommendation || (Recommendation = {}));

export { Recommendation };
//# sourceMappingURL=Recommendation.js.map
