export enum ComponentState {
  MENU,
  EDIT,
  REVIEW,
  REQUESTS,
  SUBMITTED,
  STATUS,
  AUTH,
}

/**
 * States for BldnPrivRequest
 */
export enum RequestState {
  BUILD,
  REVIEW,
  SENT,
}

/**
 * States for DemandBuilder + ActionForms
 */
export enum DemandState {
  SELECT_ACTION,
  AUTH,
  EDIT_OPEN,
  EDIT_COLLAPSED,
  REVIEW,
}

/**
 * States for action form components
 */
export enum FormComponentState {
  CLOSED,
  PARTIAL,
  OPEN,
}
