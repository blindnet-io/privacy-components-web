/**
 * States for BldnPrivRequest
 */
export var RequestState;
(function (RequestState) {
    RequestState[RequestState["BUILD"] = 0] = "BUILD";
    RequestState[RequestState["REVIEW"] = 1] = "REVIEW";
    RequestState[RequestState["SENT"] = 2] = "SENT";
})(RequestState || (RequestState = {}));
/**
 * States for DemandBuilder + ActionForms
 */
export var DemandState;
(function (DemandState) {
    DemandState[DemandState["SELECT_ACTION"] = 0] = "SELECT_ACTION";
    DemandState[DemandState["EDIT"] = 1] = "EDIT";
    DemandState[DemandState["REVIEW"] = 2] = "REVIEW";
})(DemandState || (DemandState = {}));
//# sourceMappingURL=states.js.map