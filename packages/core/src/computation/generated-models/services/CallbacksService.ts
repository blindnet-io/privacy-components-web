/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DataCallbackPayload } from '../models/DataCallbackPayload.js';

import type { CancelablePromise } from '../core/CancelablePromise.js';
import { OpenAPI } from '../core/OpenAPI.js';
import { request as __request } from '../core/request.js';

export class CallbacksService {
  /**
   * Link to access data in the storage created
   * @param callbackId
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static postV0CallbackCallbackid(
    callbackId: string,
    requestBody: DataCallbackPayload
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v0/callback/{callbackId}',
      path: {
        callbackId: callbackId,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Invalid value for: path parameter callbackId, Invalid value for: body`,
      },
    });
  }
}
