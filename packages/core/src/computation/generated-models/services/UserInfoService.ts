/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GivenConsentsPayload } from '../models/GivenConsentsPayload.js';

import type { CancelablePromise } from '../core/CancelablePromise.js';
import { OpenAPI } from '../core/OpenAPI.js';
import { request as __request } from '../core/request.js';

export class UserInfoService {
  /**
   * Get a list of consents user has given
   * @param authorization
   * @returns GivenConsentsPayload
   * @throws ApiError
   */
  public static getV0UserConsents(
    authorization: string
  ): CancelablePromise<Array<GivenConsentsPayload>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v0/user/consents',
      headers: {
        Authorization: authorization,
      },
      errors: {
        400: `Invalid value for: header Authorization`,
      },
    });
  }
}
