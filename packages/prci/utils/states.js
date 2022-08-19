var ComponentState;
(function (ComponentState) {
    ComponentState[ComponentState["MENU"] = 0] = "MENU";
    ComponentState[ComponentState["EDIT"] = 1] = "EDIT";
    ComponentState[ComponentState["REVIEW"] = 2] = "REVIEW";
    ComponentState[ComponentState["REQUESTS"] = 3] = "REQUESTS";
    ComponentState[ComponentState["SUBMITTED"] = 4] = "SUBMITTED";
    ComponentState[ComponentState["STATUS"] = 5] = "STATUS";
    ComponentState[ComponentState["AUTH"] = 6] = "AUTH";
})(ComponentState || (ComponentState = {}));
/**
 * States for BldnPrivRequest
 */
var RequestState;
(function (RequestState) {
    RequestState[RequestState["BUILD"] = 0] = "BUILD";
    RequestState[RequestState["REVIEW"] = 1] = "REVIEW";
    RequestState[RequestState["SENT"] = 2] = "SENT";
})(RequestState || (RequestState = {}));
/**
 * States for DemandBuilder + ActionForms
 */
var DemandState;
(function (DemandState) {
    DemandState[DemandState["SELECT_ACTION"] = 0] = "SELECT_ACTION";
    DemandState[DemandState["AUTH"] = 1] = "AUTH";
    DemandState[DemandState["EDIT_OPEN"] = 2] = "EDIT_OPEN";
    DemandState[DemandState["EDIT_COLLAPSED"] = 3] = "EDIT_COLLAPSED";
    DemandState[DemandState["REVIEW"] = 4] = "REVIEW";
})(DemandState || (DemandState = {}));
/**
 * States for action form components
 */
var FormComponentState;
(function (FormComponentState) {
    FormComponentState[FormComponentState["CLOSED"] = 0] = "CLOSED";
    FormComponentState[FormComponentState["PARTIAL"] = 1] = "PARTIAL";
    FormComponentState[FormComponentState["OPEN"] = 2] = "OPEN";
})(FormComponentState || (FormComponentState = {}));

export { ComponentState, DemandState, FormComponentState, RequestState };
//# sourceMappingURL=states.js.map
