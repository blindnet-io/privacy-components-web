/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
var PrivacyResponsePayload;
(function (PrivacyResponsePayload) {
    (function (requested_action) {
        requested_action["ACCESS"] = "ACCESS";
        requested_action["DELETE"] = "DELETE";
        requested_action["MODIFY"] = "MODIFY";
        requested_action["OBJECT"] = "OBJECT";
        requested_action["PORTABILITY"] = "PORTABILITY";
        requested_action["RESTRICT"] = "RESTRICT";
        requested_action["REVOKE_CONSENT"] = "REVOKE-CONSENT";
        requested_action["TRANSPARENCY"] = "TRANSPARENCY";
        requested_action["TRANSPARENCY_DATA_CATEGORIES"] = "TRANSPARENCY.DATA-CATEGORIES";
        requested_action["TRANSPARENCY_DPO"] = "TRANSPARENCY.DPO";
        requested_action["TRANSPARENCY_KNOWN"] = "TRANSPARENCY.KNOWN";
        requested_action["TRANSPARENCY_LEGAL_BASES"] = "TRANSPARENCY.LEGAL-BASES";
        requested_action["TRANSPARENCY_ORGANIZATION"] = "TRANSPARENCY.ORGANIZATION";
        requested_action["TRANSPARENCY_POLICY"] = "TRANSPARENCY.POLICY";
        requested_action["TRANSPARENCY_PROCESSING_CATEGORIES"] = "TRANSPARENCY.PROCESSING-CATEGORIES";
        requested_action["TRANSPARENCY_PROVENANCE"] = "TRANSPARENCY.PROVENANCE";
        requested_action["TRANSPARENCY_PURPOSE"] = "TRANSPARENCY.PURPOSE";
        requested_action["TRANSPARENCY_RETENTION"] = "TRANSPARENCY.RETENTION";
        requested_action["TRANSPARENCY_WHERE"] = "TRANSPARENCY.WHERE";
        requested_action["TRANSPARENCY_WHO"] = "TRANSPARENCY.WHO";
        requested_action["OTHER"] = "OTHER-DEMAND";
    })(PrivacyResponsePayload.requested_action || (PrivacyResponsePayload.requested_action = {}));
    (function (status) {
        status["GRANTED"] = "GRANTED";
        status["DENIED"] = "DENIED";
        status["PARTIALLY_GRANTED"] = "PARTIALLY-GRANTED";
        status["UNDER_REVIEW"] = "UNDER-REVIEW";
        status["CANCELED"] = "CANCELED";
    })(PrivacyResponsePayload.status || (PrivacyResponsePayload.status = {}));
    (function (motive) {
        motive["IDENTITY_UNCONFIRMED"] = "IDENTITY-UNCONFIRMED";
        motive["LANGUAGE_UNSUPPORTED"] = "LANGUAGE-UNSUPPORTED";
        motive["VALID_REASONS"] = "VALID-REASONS";
        motive["IMPOSSIBLE"] = "IMPOSSIBLE";
        motive["NO_SUCH_DATA"] = "NO-SUCH-DATA";
        motive["REQUEST_UNSUPPORTED"] = "REQUEST-UNSUPPORTED";
        motive["USER_UNKNOWN"] = "USER-UNKNOWN";
        motive["OTHER_MOTIVE"] = "OTHER-MOTIVE";
    })(PrivacyResponsePayload.motive || (PrivacyResponsePayload.motive = {}));
})(PrivacyResponsePayload = PrivacyResponsePayload || (PrivacyResponsePayload = {}));

export { PrivacyResponsePayload };
//# sourceMappingURL=PrivacyResponsePayload.js.map
