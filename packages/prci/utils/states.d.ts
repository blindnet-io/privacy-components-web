export declare enum ComponentState {
    MENU = 0,
    EDIT = 1,
    REVIEW = 2,
    REQUESTS = 3,
    SUBMITTED = 4,
    STATUS = 5,
    AUTH = 6
}
/**
 * States for BldnPrivRequest
 */
export declare enum RequestState {
    BUILD = 0,
    REVIEW = 1,
    SENT = 2
}
/**
 * States for DemandBuilder + ActionForms
 */
export declare enum DemandState {
    SELECT_ACTION = 0,
    AUTH = 1,
    EDIT_OPEN = 2,
    EDIT_COLLAPSED = 3,
    REVIEW = 4
}
/**
 * States for action form components
 */
export declare enum FormComponentState {
    CLOSED = 0,
    PARTIAL = 1,
    OPEN = 2
}
