/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelDemandPayload } from '../models/CancelDemandPayload.js';
import type { CreatePrivacyRequestPayload } from '../models/CreatePrivacyRequestPayload.js';
import type { PrivacyRequestCreatedPayload } from '../models/PrivacyRequestCreatedPayload.js';
import type { PrivacyResponsePayload } from '../models/PrivacyResponsePayload.js';
import type { RequestHistoryPayload } from '../models/RequestHistoryPayload.js';

import type { CancelablePromise } from '../core/CancelablePromise.js';
import { OpenAPI } from '../core/OpenAPI.js';
import { request as __request } from '../core/request.js';

export class PrivacyRequestsService {
  /**
   * Create a privacy request
   * @param requestBody
   * @returns PrivacyRequestCreatedPayload
   * @throws ApiError
   */
  public static postV0PrivacyRequest(
    requestBody: CreatePrivacyRequestPayload
  ): CancelablePromise<PrivacyRequestCreatedPayload> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v0/privacy-request',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Invalid value for: body`,
      },
    });
  }

  /**
   * Get history of privacy requests
   * @param authorization
   * @returns RequestHistoryPayload
   * @throws ApiError
   */
  public static getV0PrivacyRequestHistory(
    authorization: string
  ): CancelablePromise<RequestHistoryPayload> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v0/privacy-request/history',
      headers: {
        Authorization: authorization,
      },
      errors: {
        400: `Invalid value for: header Authorization`,
      },
    });
  }

  /**
   * Get privacy request status
   * @param requestId
   * @param authorization
   * @returns PrivacyResponsePayload
   * @throws ApiError
   */
  public static getV0PrivacyRequestRequestid(
    requestId: string,
    authorization: string
  ): CancelablePromise<Array<PrivacyResponsePayload>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v0/privacy-request/{requestId}',
      path: {
        requestId: requestId,
      },
      headers: {
        Authorization: authorization,
      },
      errors: {
        400: `Invalid value for: path parameter requestId, Invalid value for: header Authorization`,
      },
    });
  }

  /**
   * Cancel a pending demand
   * @param authorization
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static postV0PrivacyRequestCancel(
    authorization: string,
    requestBody: CancelDemandPayload
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v0/privacy-request/cancel',
      headers: {
        Authorization: authorization,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Invalid value for: header Authorization, Invalid value for: body`,
      },
    });
  }
}
