/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PrItem = {
  id: string;
  date: string;
  demands: number;
  status: PrItem.status;
};

export namespace PrItem {
  export enum status {
    IN_PROCESSING = 'IN_PROCESSING',
    PARTIALLY_COMPLETED = 'PARTIALLY_COMPLETED',
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED',
  }
}
