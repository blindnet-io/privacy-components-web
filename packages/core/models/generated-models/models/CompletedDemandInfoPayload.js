/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
var CompletedDemandInfoPayload;
(function (CompletedDemandInfoPayload) {
    (function (action) {
        action["ACCESS"] = "ACCESS";
        action["DELETE"] = "DELETE";
        action["MODIFY"] = "MODIFY";
        action["OBJECT"] = "OBJECT";
        action["PORTABILITY"] = "PORTABILITY";
        action["RESTRICT"] = "RESTRICT";
        action["REVOKE_CONSENT"] = "REVOKE-CONSENT";
        action["TRANSPARENCY"] = "TRANSPARENCY";
        action["TRANSPARENCY_DATA_CATEGORIES"] = "TRANSPARENCY.DATA-CATEGORIES";
        action["TRANSPARENCY_DPO"] = "TRANSPARENCY.DPO";
        action["TRANSPARENCY_KNOWN"] = "TRANSPARENCY.KNOWN";
        action["TRANSPARENCY_LEGAL_BASES"] = "TRANSPARENCY.LEGAL-BASES";
        action["TRANSPARENCY_ORGANIZATION"] = "TRANSPARENCY.ORGANIZATION";
        action["TRANSPARENCY_POLICY"] = "TRANSPARENCY.POLICY";
        action["TRANSPARENCY_PROCESSING_CATEGORIES"] = "TRANSPARENCY.PROCESSING-CATEGORIES";
        action["TRANSPARENCY_PROVENANCE"] = "TRANSPARENCY.PROVENANCE";
        action["TRANSPARENCY_PURPOSE"] = "TRANSPARENCY.PURPOSE";
        action["TRANSPARENCY_RETENTION"] = "TRANSPARENCY.RETENTION";
        action["TRANSPARENCY_WHERE"] = "TRANSPARENCY.WHERE";
        action["TRANSPARENCY_WHO"] = "TRANSPARENCY.WHO";
        action["OTHER"] = "OTHER";
    })(CompletedDemandInfoPayload.action || (CompletedDemandInfoPayload.action = {}));
    (function (status) {
        status["GRANTED"] = "GRANTED";
        status["DENIED"] = "DENIED";
        status["PARTIALLY_GRANTED"] = "PARTIALLY-GRANTED";
        status["UNDER_REVIEW"] = "UNDER-REVIEW";
        status["CANCELED"] = "CANCELED";
    })(CompletedDemandInfoPayload.status || (CompletedDemandInfoPayload.status = {}));
    (function (motive) {
        motive["IDENTITY_UNCONFIRMED"] = "IDENTITY-UNCONFIRMED";
        motive["LANGUAGE_UNSUPPORTED"] = "LANGUAGE-UNSUPPORTED";
        motive["VALID_REASONS"] = "VALID-REASONS";
        motive["IMPOSSIBLE"] = "IMPOSSIBLE";
        motive["NO_SUCH_DATA"] = "NO-SUCH-DATA";
        motive["REQUEST_UNSUPPORTED"] = "REQUEST-UNSUPPORTED";
        motive["USER_UNKNOWN"] = "USER-UNKNOWN";
        motive["OTHER_MOTIVE"] = "OTHER-MOTIVE";
    })(CompletedDemandInfoPayload.motive || (CompletedDemandInfoPayload.motive = {}));
})(CompletedDemandInfoPayload = CompletedDemandInfoPayload || (CompletedDemandInfoPayload = {}));

export { CompletedDemandInfoPayload };
//# sourceMappingURL=CompletedDemandInfoPayload.js.map
