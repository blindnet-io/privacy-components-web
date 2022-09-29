/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApproveDemandPayload } from '../models/ApproveDemandPayload.js';
import type { DenyDemandPayload } from '../models/DenyDemandPayload.js';
import type { PendingDemandDetailsPayload } from '../models/PendingDemandDetailsPayload.js';
import type { PendingDemandPayload } from '../models/PendingDemandPayload.js';

import type { CancelablePromise } from '../core/CancelablePromise.js';
import { OpenAPI } from '../core/OpenAPI.js';
import { request as __request } from '../core/request.js';

export class DataConsumerInterfaceService {
  /**
   * Get the list of pending privacy request demands
   * @returns PendingDemandPayload
   * @throws ApiError
   */
  public static getV0ConsumerInterfacePendingRequests(): CancelablePromise<
    Array<PendingDemandPayload>
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v0/consumer-interface/pending-requests',
    });
  }

  /**
   * Get details of a pending privacy request
   * @param demandId
   * @returns PendingDemandDetailsPayload
   * @throws ApiError
   */
  public static getV0ConsumerInterfacePendingRequestsDemandid(
    demandId: string
  ): CancelablePromise<PendingDemandDetailsPayload> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v0/consumer-interface/pending-requests/{demandId}',
      path: {
        demandId: demandId,
      },
      errors: {
        400: `Invalid value for: path parameter demandId`,
      },
    });
  }

  /**
   * Approve privacy request
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static postV0ConsumerInterfacePendingRequestsApprove(
    requestBody: ApproveDemandPayload
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v0/consumer-interface/pending-requests/approve',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Deny privacy request
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static postV0ConsumerInterfacePendingRequestsDeny(
    requestBody: DenyDemandPayload
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v0/consumer-interface/pending-requests/deny',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
