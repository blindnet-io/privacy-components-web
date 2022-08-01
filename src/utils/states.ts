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
  EDIT,
  REVIEW,
}

export enum DropdownState {
  CLOSED,
  PARTIAL,
  OPEN,
}
